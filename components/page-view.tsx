"use client";

/**
 * Page-turn reader — MEASURED BLOCK pagination engine (P0, spec Option B).
 * The CSS-multicol approach produced blank pages (a figure/grid/framer wrapper it
 * couldn't fragment left empty columns). This engine instead renders the active
 * chapter as ONE natural single-column flow, MEASURES the real rendered leaf
 * blocks (paragraphs, headings, figures, tables), and computes page breaks that
 * NEVER split a block. A "page" is a fixed-height window translated to that
 * break's offset — so every page starts on real content and is never blank.
 * Chapter-scoped (one chapter at a time); at a boundary, advance chapter.
 * Inputs: buttons · keyboard ←/→ (RTL) · swipe. Progress is page-based.
 */
import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, BookMarked, Volume2, VolumeX } from "lucide-react";
import { useReaderSound } from "@/lib/reader-sound";
import { onWindowResize } from "@/lib/raf-resize";

const BLOCKS = "p, h1, h2, h3, h4, figure, .reader-figure, table, pre, blockquote, li, .neo-diagram";

export function PageView({ chapters, active, onChapter, accent, children }: { chapters: { n: number; title: string }[]; active: number; onChapter: (n: number, landOnLast?: boolean) => void; accent: string; children: React.ReactNode }) {
  const winRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const [breaks, setBreaks] = useState<number[]>([0]);
  const [page, setPage] = useState(0);
  const [busy, setBusy] = useState(true);
  const [pageH, setPageH] = useState(600);
  const [turn, setTurn] = useState<{ n: number; dir: 1 | -1 }>({ n: 0, dir: 1 });
  const landLast = useRef(false);
  const drag = useRef<{ x: number } | null>(null);
  const reduce = useReducedMotion();
  const sound = useReaderSound();

  const idx = chapters.findIndex((c) => c.n === active);
  const prevCh = idx > 0 ? chapters[idx - 1] : null;
  const nextCh = idx >= 0 && idx < chapters.length - 1 ? chapters[idx + 1] : null;
  const pages = breaks.length;

  const measure = useCallback(() => {
    const win = winRef.current, inner = innerRef.current; if (!win || !inner) return;
    const ph = win.clientHeight || 600; setPageH(ph);
    const innerTop = inner.getBoundingClientRect().top;
    // collect visible leaf blocks in document order
    const els = Array.from(inner.querySelectorAll<HTMLElement>(BLOCKS)).filter((el) => {
      // skip blocks nested inside another collected block (avoid double counting)
      if (el.closest("figure") && el.tagName !== "FIGURE" && !el.classList.contains("reader-figure")) return false;
      const r = el.getBoundingClientRect();
      return r.height > 4 && (el.textContent || "").trim().length > 0 || el.querySelector("img,svg");
    });
    const items = els.map((el) => { const r = el.getBoundingClientRect(); return { top: r.top - innerTop, bottom: r.bottom - innerTop }; })
      .sort((a, b) => a.top - b.top);
    const brs = [0]; let top = 0;
    for (const it of items) {
      if (it.bottom - top > ph && it.top > top + 4) { top = it.top; brs.push(top); }
    }
    setBreaks(brs);
    setPage((p) => { const np = landLast.current ? brs.length - 1 : Math.min(p, brs.length - 1); return np; });
    landLast.current = false;
    setBusy(false);
  }, []);

  // remeasure on chapter change / resize / image load / fonts
  useEffect(() => {
    setBusy(true);
    const inner = innerRef.current; if (!inner) return;
    const t1 = window.setTimeout(measure, 50);
    const t2 = window.setTimeout(measure, 400);
    const ro = new ResizeObserver(() => measure()); if (winRef.current) ro.observe(winRef.current);
    const imgs = Array.from(inner.querySelectorAll("img"));
    const onImg = () => measure(); imgs.forEach((i) => i.addEventListener("load", onImg));
    const offResize = onWindowResize(measure);
    return () => { window.clearTimeout(t1); window.clearTimeout(t2); ro.disconnect(); imgs.forEach((i) => i.removeEventListener("load", onImg)); offResize(); };
  }, [active, measure]);

  // page-turn feedback: bump the turn counter (drives the sweep overlay) + play
  // the optional paper sound. dir 1 = forward (RTL leftward), -1 = backward.
  const flip = useCallback((dir: 1 | -1) => { setTurn((t) => ({ n: t.n + 1, dir })); sound.play(dir === 1); }, [sound]);
  const next = useCallback(() => {
    if (page < pages - 1) { flip(1); setPage(page + 1); return; }
    if (nextCh) { landLast.current = false; flip(1); onChapter(nextCh.n, false); }
  }, [page, pages, nextCh, onChapter, flip]);
  const prev = useCallback(() => {
    if (page > 0) { flip(-1); setPage(page - 1); return; }
    if (prevCh) { landLast.current = true; flip(-1); onChapter(prevCh.n, true); }
  }, [page, prevCh, onChapter, flip]);

  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      const el = e.target as HTMLElement | null;
      if (el && (el.tagName === "INPUT" || el.tagName === "TEXTAREA" || el.isContentEditable)) return;
      if (e.key === "ArrowLeft") { e.preventDefault(); next(); }        // RTL forward
      else if (e.key === "ArrowRight") { e.preventDefault(); prev(); }
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [next, prev]);

  // swipe / drag
  const onDown = (e: React.PointerEvent) => { drag.current = { x: e.clientX }; };
  const onUp = (e: React.PointerEvent) => { const d = drag.current; drag.current = null; if (!d) return; const dx = e.clientX - d.x; if (Math.abs(dx) < 45) return; if (dx < 0) next(); else prev(); };

  const pagerBtn = "grid size-9 place-items-center rounded-xl border border-hairline bg-surface text-ink-2 transition enabled:hover:border-brand enabled:hover:text-brand disabled:opacity-35";
  const atBookStart = idx <= 0 && page === 0;
  const atBookEnd = !nextCh && page >= pages - 1;
  const offset = breaks[Math.min(page, breaks.length - 1)] || 0;

  return (
    <div>
      <div className="sticky top-[3.5rem] z-30 mb-3 flex flex-wrap items-center gap-2 rounded-2xl border border-hairline bg-surface/90 px-3 py-2 shadow-sm backdrop-blur-md">
        <span className="flex items-center gap-1.5 text-xs font-extrabold text-ink-2"><BookMarked className="size-3.5" style={{ color: accent }} /> מצב עמודים</span>
        <select value={active} onChange={(e) => onChapter(Number(e.target.value), false)} aria-label="קפוץ לפרק" className="max-w-[12rem] rounded-xl border border-hairline bg-surface px-2 py-1.5 text-xs font-bold text-ink-2 outline-none focus:border-brand/40">
          {chapters.map((ch) => <option key={ch.n} value={ch.n}>{ch.n}. {ch.title}</option>)}
        </select>
        <div className="ms-auto flex items-center gap-2">
          <button onClick={sound.toggle} aria-label={sound.on ? "כבה צליל דפדוף" : "הפעל צליל דפדוף"} aria-pressed={sound.on} title={sound.on ? "צליל דפדוף פעיל" : "צליל דפדוף כבוי"} className={`${pagerBtn} ${sound.on ? "border-brand text-brand" : ""}`}>{sound.on ? <Volume2 className="size-[18px]" /> : <VolumeX className="size-[18px]" />}</button>
          <button onClick={prev} disabled={atBookStart} aria-label="עמוד קודם" className={pagerBtn}><ChevronRight className="size-[18px]" /></button>
          <span className="min-w-[6.5rem] text-center font-mono text-xs font-bold tabular-nums text-ink-2">פרק {idx + 1} · {page + 1}/{pages}</span>
          <button onClick={next} disabled={atBookEnd} aria-label="עמוד הבא" className={pagerBtn}><ChevronLeft className="size-[18px]" /></button>
        </div>
      </div>

      {/* fixed-height window; inner content is translated to the current page break.
          A subtle book-open animation plays on mount; each turn sweeps a soft page
          shadow across in the reading direction (RTL: forward = leftward). */}
      <motion.div
        initial={reduce ? false : { opacity: 0, scale: 0.975, rotateY: -7 }}
        animate={{ opacity: 1, scale: 1, rotateY: 0 }}
        transition={reduce ? { duration: 0 } : { duration: 0.5, ease: [0.2, 0.7, 0.2, 1] }}
        onAnimationComplete={() => measure()}
        style={{ transformOrigin: "right center", perspective: 1400 }}
      >
        <div ref={winRef} onPointerDown={onDown} onPointerUp={onUp} className="neo-pagewin relative overflow-hidden rounded-2xl border border-hairline bg-surface" style={{ height: "calc(100dvh - 13rem)", touchAction: "pan-y" }}>
          <div ref={innerRef} className="neo-pagewin-inner px-4 sm:px-8" style={{ transform: `translateY(${-offset}px)`, transition: "transform 320ms cubic-bezier(0.2,0.7,0.2,1)", willChange: "transform" }}>
            {children}
          </div>
          {/* page-turn sweep — a soft shadow gradient crossing the window on each turn */}
          {!reduce && turn.n > 0 && (
            <motion.div key={turn.n} aria-hidden className="pointer-events-none absolute inset-0 z-10 overflow-hidden">
              <motion.div
                className="absolute inset-y-0 w-2/5"
                style={{ background: turn.dir === 1 ? "linear-gradient(90deg, transparent, rgba(15,23,42,0.13) 60%, rgba(15,23,42,0.05))" : "linear-gradient(270deg, transparent, rgba(15,23,42,0.13) 60%, rgba(15,23,42,0.05))" }}
                initial={{ x: turn.dir === 1 ? "260%" : "-260%", opacity: 0.9 }}
                animate={{ x: turn.dir === 1 ? "-120%" : "120%", opacity: 0 }}
                transition={{ duration: 0.36, ease: [0.3, 0, 0.2, 1] }}
              />
            </motion.div>
          )}
          {busy && <div className="pointer-events-none absolute inset-x-0 top-2 mx-auto w-max rounded-full bg-ink-1/80 px-3 py-1 text-[11px] font-bold text-surface">מתאים את העמודים…</div>}
        </div>
      </motion.div>

      <div className="mt-2 h-1 overflow-hidden rounded-full bg-surface-2">
        <div className="h-full rounded-full transition-all duration-300" style={{ width: `${pages > 1 ? ((page + 1) / pages) * 100 : 100}%`, background: accent }} />
      </div>
      <p className="mt-1.5 text-center text-[11px] text-ink-3">מקשי חצים ↔ · החלקה · או הכפתורים · בסוף הפרק ממשיכים לפרק הבא</p>
    </div>
  );
}
