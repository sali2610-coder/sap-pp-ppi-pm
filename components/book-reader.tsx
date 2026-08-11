"use client";

import { forWhiteText } from "@/lib/contrast";
import { Children, isValidElement, useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Search, Bookmark, Check, BookOpen, GraduationCap, ChevronUp, ChevronDown, ListTree, X, PlayCircle, StickyNote, Clock, FileText, Languages, Layers3, ArrowLeft, Sparkles, CheckCircle2, Maximize2, Minimize2, Home, Library, AlignLeft, Settings2, RotateCcw, HelpCircle, AlertTriangle } from "lucide-react";
import { useReader } from "@/lib/reader-store";
import { LIBRARY } from "@/data/library";
import { writeContinuity, readContinuity, resolveReaderView, saveReaderView, clearContinuityFor, type ReaderView } from "@/lib/continuity-store";
import { ReaderViewContext, PageModeContext } from "@/lib/reader-view";
import { BookCover } from "@/components/book-cover";
import { afterScrollSettles, bringIntoView, chapterOf, expandSection, markQuote, readDeepLink, sectionElementId } from "@/lib/library/deep-link";
import { findQuote } from "@/lib/library/highlight";
import { PageView } from "@/components/page-view";
import { playTick } from "@/lib/sound";
import { onWindowResize } from "@/lib/raf-resize";

export interface ReaderChapter { n: number; title: string; he?: string }
export interface ReaderStat { label: string; value: React.ReactNode }

/* module identity palette (matches the Library) — gives each book its own accent */
const MOD_COLOR: Record<string, string> = { PP: "#d62027", PM: "#f97316", "PP-PI": "#6d28d9", QM: "#059669", MM: "#d97706", WM: "#7c3aed", IBP: "#0891b2", Fiori: "#db2777", Foundation: "#475569" };
const mc = (m?: string) => (m && MOD_COLOR[m]) || "#64748b";
/* reader route (book1..11) → LIBRARY id, so the landing can pull real metadata */
const LIB_BY_BOOK: Record<string, string> = { book1: "config-pm", book2: "production-planning", book3: "sourcing-procurement", book4: "pp-ds", book5: "quality-management", book6: "warehouse-management", book7: "fiori-apps", book9: "pm-business-user", book10: "ibp-sop", book11: "s4-foundation" };
const bookType = (pub?: string) => (pub === "SAP PRESS" ? "SAP PRESS" : pub === "ZaranTech" ? "ZaranTech" : "Reference Guide");

// brief destination highlight after a jump — aids orientation (CSS-gated for reduced-motion)
function flash(el: HTMLElement | null | undefined) {
  if (!el) return;
  el.classList.remove("neo-flash");
  void el.offsetWidth; // restart the animation
  el.classList.add("neo-flash");
  window.setTimeout(() => el.classList.remove("neo-flash"), 1400);
}
// Explicit chapter navigation (selector / "בעמוד זה" / resume). Routed through a
// single event so the reader can (a) expand the target chapter, (b) set it active,
// (c) suppress scroll-spy briefly so the smooth-scroll doesn't leave the highlight
// on an intermediate chapter — the root of the "select 5 → shows 6" bug (§6).
function jump(n: number) {
  if (!n) return;
  window.dispatchEvent(new CustomEvent("neo:reader:goto", { detail: n }));
}
// Page mode paginates ONE chapter. Book pages may wrap the ChapterReaders in a
// container div, so flatten one level and pick the active chapter's element.
function pageChild(children: React.ReactNode, active: number): React.ReactNode {
  const hasChN = (el: unknown): el is { props: { ch: { n: number } } } => isValidElement(el) && (el.props as { ch?: { n?: number } })?.ch?.n != null;
  const flat: React.ReactNode[] = [];
  for (const el of Children.toArray(children)) {
    if (hasChN(el)) flat.push(el);
    else if (isValidElement(el)) for (const inner of Children.toArray((el.props as { children?: React.ReactNode }).children)) if (hasChN(inner)) flat.push(inner);
  }
  const match = flat.find((el) => hasChN(el) && el.props.ch.n === active);
  return match ?? children;
}
function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (el) { el.scrollIntoView({ behavior: "smooth", block: "start" }); flash(el); }
}

type RTheme = "original" | "sepia" | "night";
type RSize = "sm" | "md" | "lg" | "xl";
type RMeasure = "narrow" | "normal" | "wide";

/* Reader display settings — theme / type-size / measure. Scoped to the reading
   pane only (never a global dark mode). Reused in the landing CTA + focus bar. */
function RsOpt({ on, onClick, title, sub, accent }: { on: boolean; onClick: () => void; title: string; sub?: string; accent: string }) {
  return (
    <button onClick={onClick} role="radio" aria-checked={on} className="tap min-h-[44px] rounded-xl border-2 px-2.5 py-2 text-start transition" style={{ borderColor: on ? accent : "var(--hairline)", background: on ? accent + "0f" : "transparent" }}>
      <span className="flex items-center justify-between gap-1"><span className="text-[12.5px] font-extrabold text-ink-1">{title}</span>{on && <Check className="size-3.5 shrink-0" style={{ color: accent }} />}</span>
      {sub && <span className="mt-0.5 block text-[10px] font-semibold leading-snug text-ink-3">{sub}</span>}
    </button>
  );
}
function RsGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return <div className="mt-3.5 first:mt-0"><div className="eyebrow-2 mb-1.5 text-ink-3">{label}</div>{children}</div>;
}
function ReaderSettings({ view, setView, mode, setMode, theme, setTheme, size, setSize, measure, setMeasure, accent, onReset }: { view: ReaderView; setView: (v: ReaderView) => void; mode: "scroll" | "page"; setMode: (m: "scroll" | "page") => void; theme: RTheme; setTheme: (t: RTheme) => void; size: RSize; setSize: (s: RSize) => void; measure: RMeasure; setMeasure: (m: RMeasure) => void; accent: string; onReset: () => void }) {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  // a11y — Esc closes, lock background scroll, focus the panel. Rendered FIXED (not
  // absolute) so it can never be clipped by sticky headers / sidebars / overflow
  // containers / Focus-Mode layers (§9): bottom sheet on mobile, side panel on desktop.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panelRef.current?.focus();
    const h = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", h);
    return () => { document.body.style.overflow = prev; window.removeEventListener("keydown", h); };
  }, [open]);
  const themes: [RTheme, string, string, string, string][] = [["original", "בהיר", "#ffffff", "#0b0c0e", "מקור לבן"], ["sepia", "ספיה", "#f6efe1", "#2b2620", "נייר חם"], ["night", "לילה", "#14181f", "#e8ecf1", "רקע כהה"]];
  const sizes: [RSize, string, number][] = [["sm", "קטן", 12], ["md", "רגיל", 15], ["lg", "גדול", 18], ["xl", "גדול מאוד", 22]];
  const measures: [RMeasure, string, string][] = [["narrow", "צר", "טור צר וממוקד"], ["normal", "נוח", "מידה מומלצת"], ["wide", "רחב", "לטבלאות ותרשימים"]];
  const views: [ReaderView, string, string][] = [["hebrew", "עברית בלבד", "קריאה נוחה בטור אחד"], ["bilingual", "עברית ואנגלית", "מקור ותרגום זה לצד זה"]];
  const modes: ["scroll" | "page", string, string][] = [["scroll", "גלילה רציפה", "טקסט אחד ארוך"], ["page", "דפדוף בספר", "מעבר בין עמודים במקום גלילה"]];
  return (
    <>
      <button onClick={() => setOpen((o) => !o)} aria-expanded={open} aria-haspopup="dialog" title="בחר שפה, מצב דפדוף, ערכת צבעים וגודל טקסט" className="inline-flex items-center gap-2 rounded-2xl border border-hairline bg-surface px-4 py-2.5 text-sm font-bold text-ink-2 shadow-sm transition hover:border-brand/40 active:scale-95"><Settings2 className="size-4" /> תצוגת קריאה</button>
      <AnimatePresence>
        {open && (
          <>
            <motion.button className="fixed inset-0 z-[70] cursor-default bg-slate-900/40 backdrop-blur-sm" aria-label="סגור" onClick={() => setOpen(false)} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />
            <motion.div ref={panelRef} tabIndex={-1} role="dialog" aria-modal="true" aria-label="תצוגת קריאה" dir="rtl"
              className="fixed inset-x-0 bottom-0 z-[71] flex max-h-[88dvh] flex-col rounded-t-[1.5rem] border-t border-hairline bg-surface text-ink-1 shadow-2xl outline-none sm:inset-y-0 sm:bottom-auto sm:end-0 sm:start-auto sm:max-h-none sm:w-[22rem] sm:max-w-[92vw] sm:rounded-none sm:border-s sm:border-t-0"
              initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }} transition={{ type: "spring", stiffness: 360, damping: 38 }}>
              <div className="flex shrink-0 items-center justify-between border-b border-hairline px-4 py-3">
                <div className="mx-auto mt-1 h-1.5 w-11 rounded-full bg-hairline sm:hidden" />
                <span className="hidden text-[15px] font-extrabold text-ink-1 sm:block">תצוגת קריאה</span>
                <button onClick={() => setOpen(false)} aria-label="סגור" className="tap hidden size-8 place-items-center rounded-lg text-ink-3 hover:bg-surface-2 sm:grid"><X className="size-4.5" /></button>
              </div>
              <div className="min-h-0 flex-1 overflow-y-auto p-4 pb-[max(env(safe-area-inset-bottom),1rem)]">
                <RsGroup label="שפת קריאה"><div className="grid grid-cols-2 gap-1.5" role="radiogroup">{views.map(([k, t, s]) => <RsOpt key={k} on={view === k} onClick={() => setView(k)} title={t} sub={s} accent={accent} />)}</div></RsGroup>
                <RsGroup label="אופן מעבר"><div className="grid grid-cols-2 gap-1.5" role="radiogroup">{modes.map(([k, t, s]) => <RsOpt key={k} on={mode === k} onClick={() => setMode(k)} title={t} sub={s} accent={accent} />)}</div></RsGroup>
                <RsGroup label="ערכת נושא">
                  <div className="grid grid-cols-3 gap-1.5" role="radiogroup">
                    {themes.map(([k, label, bg, fg, sub]) => (
                      <button key={k} onClick={() => setTheme(k)} role="radio" aria-checked={theme === k} title={sub} className="tap flex flex-col items-center gap-1 rounded-xl border-2 p-1.5 text-[11px] font-bold transition" style={{ borderColor: theme === k ? accent : "var(--hairline)" }}>
                        <span className="grid h-8 w-full place-items-center rounded-md text-[12px] font-black" style={{ background: bg, color: fg }}>Aa</span>{label}
                      </button>
                    ))}
                  </div>
                </RsGroup>
                <RsGroup label="גודל טקסט">
                  <div className="grid grid-cols-4 gap-1.5" role="radiogroup">
                    {sizes.map(([k, label, fs]) => (
                      <button key={k} onClick={() => setSize(k)} role="radio" aria-checked={size === k} title={label} className="tap flex flex-col items-center justify-end gap-0.5 rounded-xl border-2 py-1.5 transition" style={{ borderColor: size === k ? accent : "var(--hairline)", color: size === k ? accent : "var(--ink-2)" }}>
                        <span className="font-black leading-none" style={{ fontSize: `${fs}px` }}>A</span>
                        <span className="text-[8.5px] font-bold text-ink-3">{label}</span>
                      </button>
                    ))}
                  </div>
                </RsGroup>
                <RsGroup label="רוחב עמוד"><div className="grid grid-cols-3 gap-1.5" role="radiogroup">{measures.map(([k, t, s]) => <RsOpt key={k} on={measure === k} onClick={() => setMeasure(k)} title={t} sub={s} accent={accent} />)}</div></RsGroup>
                <button onClick={() => { setOpen(false); onReset(); }} title="נקה פרק, מיקום וגלילה עבור ספר זה" className="tap mt-5 flex w-full items-center justify-center gap-1.5 rounded-xl border border-hairline px-3 py-2.5 text-[12px] font-bold text-ink-3 transition hover:border-brand/40 hover:text-brand">
                  <RotateCcw className="size-3.5" /> אפס התקדמות קריאה
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

/* §5 Digital Progress Rail — a premium reading scrubber docked to the RTL leading
   (right) gutter on wide screens. Shows book %, chapter boundaries, the current
   chapter segment, saved bookmarks, a draggable thumb, hover chapter labels, and
   estimated reading time remaining. Native scroll/keyboard untouched. */
function DigitalProgressRail({ accent, hidden, chapters, bm, active, activeSec, secs, totalMin }: { accent: string; hidden: boolean; chapters: ReaderChapter[]; bm: number[]; active: number; activeSec: string; secs: { id: string; title: string; chapter: number }[]; totalMin: number | null }) {
  const [prog, setProg] = useState(0);
  const [thumb, setThumb] = useState(0.12);
  const [marks, setMarks] = useState<{ n: number; pos: number; title: string }[]>([]);
  const [hoverY, setHoverY] = useState<number | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  useEffect(() => {
    const upd = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      setProg(max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0);
      setThumb(Math.min(1, window.innerHeight / Math.max(1, doc.scrollHeight)));
      const total = doc.scrollHeight || 1;
      setMarks(Array.from(document.querySelectorAll<HTMLElement>("[data-chapter]")).map((el) => {
        const n = Number(el.dataset.chapter); const ch = chapters.find((c) => c.n === n);
        return { n, pos: Math.min(1, el.offsetTop / total), title: ch?.title || `פרק ${n}` };
      }));
    };
    upd();
    window.addEventListener("scroll", upd, { passive: true });
    const offResize = onWindowResize(upd);
    const t = window.setTimeout(upd, 600);
    return () => { window.removeEventListener("scroll", upd); offResize(); window.clearTimeout(t); };
  }, [chapters]);
  const seek = useCallback((clientY: number) => {
    const t = trackRef.current; if (!t) return;
    const r = t.getBoundingClientRect();
    const ratio = Math.min(1, Math.max(0, (clientY - r.top) / r.height));
    const max = document.documentElement.scrollHeight - window.innerHeight;
    window.scrollTo({ top: ratio * max });
  }, []);
  const onDown = (e: React.PointerEvent) => { dragging.current = true; (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId); seek(e.clientY); };
  const onMove = (e: React.PointerEvent) => { const t = trackRef.current; if (t) { const r = t.getBoundingClientRect(); setHoverY(Math.min(1, Math.max(0, (e.clientY - r.top) / r.height))); } if (dragging.current) seek(e.clientY); };
  const onUp = () => { dragging.current = false; };
  if (hidden) return null;
  const curCh = chapters.find((c) => c.n === active);
  const curIdx = chapters.findIndex((c) => c.n === active);
  const curSec = secs.find((s) => s.id === activeSec);
  const minsLeft = totalMin ? Math.max(1, Math.round(totalMin * (1 - prog))) : null;
  const pct = Math.round(prog * 100);
  // chapter title at the hovered position
  const hoverCh = hoverY == null ? null : [...marks].reverse().find((m) => m.pos <= hoverY + 0.001) || marks[0];
  return (
    <div className="fixed inset-y-0 z-40 hidden lg:block" style={{ insetInlineEnd: 6 }}>
      <div ref={trackRef} onPointerDown={onDown} onPointerMove={onMove} onPointerUp={onUp} onPointerCancel={onUp} onPointerLeave={() => setHoverY(null)}
        className="group relative my-24 h-[calc(100%-12rem)] w-4 cursor-pointer touch-none"
        role="slider" aria-label="מיקום קריאה בספר" aria-valuemin={0} aria-valuemax={100} aria-valuenow={pct} aria-valuetext={`${pct}% · ${curCh ? `${curCh.n}. ${curCh.title}` : ""}${minsLeft ? ` · כ-${minsLeft} דקות נותרו` : ""}`} tabIndex={0}
        onKeyDown={(e) => { const max = document.documentElement.scrollHeight - window.innerHeight; if (e.key === "ArrowDown" || e.key === "PageDown") { e.preventDefault(); window.scrollBy({ top: e.key === "PageDown" ? window.innerHeight * 0.9 : max * 0.02 }); } else if (e.key === "ArrowUp" || e.key === "PageUp") { e.preventDefault(); window.scrollBy({ top: -(e.key === "PageUp" ? window.innerHeight * 0.9 : max * 0.02) }); } }}>
        {/* track */}
        <div className="absolute inset-y-0 start-1/2 w-1 -translate-x-1/2 rounded-full bg-hairline transition-all group-hover:w-1.5 rtl:translate-x-1/2">
          {/* fill to current position */}
          <div className="absolute inset-x-0 top-0 rounded-full" style={{ height: `${prog * 100}%`, background: `${accent}b3` }} />
          {/* chapter boundary ticks */}
          {marks.map((m) => (
            <span key={m.n} className="absolute -inset-x-1 h-[2px] rounded-full" style={{ top: `${m.pos * 100}%`, background: m.n === active ? accent : "var(--ink-3)", opacity: m.n === active ? 1 : 0.4 }} />
          ))}
          {/* bookmark flags */}
          {bm.map((n) => { const m = marks.find((x) => x.n === n); if (!m) return null; return <Bookmark key={"bm" + n} className="absolute size-2.5 -translate-y-1/2 fill-amber-400 text-amber-500" style={{ top: `${m.pos * 100}%`, insetInlineStart: "-0.55rem" }} />; })}
          {/* draggable thumb */}
          <div className="absolute size-3 -translate-x-1/2 rounded-full border-2 border-white shadow-md rtl:translate-x-1/2" style={{ top: `${prog * 100}%`, insetInlineStart: "50%", marginTop: "-6px", background: accent }} />
        </div>
        {/* hover chapter label */}
        {hoverCh && (
          <div className="pointer-events-none absolute whitespace-nowrap rounded-lg bg-ink-1 px-2 py-1 text-[10.5px] font-bold text-surface shadow-lg" style={{ top: `${(hoverY || 0) * 100}%`, insetInlineEnd: "1.4rem", transform: "translateY(-50%)" }}>
            {hoverCh.n}. {hoverCh.title}
          </div>
        )}
        {/* persistent position card near the thumb (on hover) */}
        <div className="pointer-events-none absolute opacity-0 transition-opacity group-hover:opacity-100" style={{ top: `${prog * 100}%`, insetInlineEnd: "1.4rem", transform: "translateY(-50%)" }}>
          <div className="rounded-xl border border-hairline bg-surface px-3 py-2 shadow-xl">
            <div className="font-mono text-sm font-black" style={{ color: accent }}>{pct}%</div>
            {curCh && <div className="mt-0.5 whitespace-nowrap text-[11px] font-bold text-ink-1">פרק {curIdx + 1} מתוך {chapters.length}</div>}
            {curSec && <div className="max-w-[13rem] truncate text-[10.5px] font-semibold text-ink-3">{curSec.title}</div>}
            {minsLeft && <div className="mt-0.5 flex items-center gap-1 text-[10.5px] font-bold text-ink-3"><Clock className="size-3" />כ-{minsLeft} דקות נותרו</div>}
          </div>
        </div>
      </div>
    </div>
  );
}

export function BookReader({ bookId, title, subtitle, chapters, note, stats, children }: { bookId: string; title: string; subtitle?: string; chapters: ReaderChapter[]; note?: string; stats?: ReaderStat[]; children: React.ReactNode }) {
  const { read, bm, last, markRead, toggleBm, reset } = useReader(bookId);
  const reduce = useReducedMotion();
  const [active, setActive] = useState<number>(chapters[0]?.n ?? 1);
  const [q, setQ] = useState("");
  const [confirmReset, setConfirmReset] = useState(false);
  const [resetNotesToo, setResetNotesToo] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);
  const [hintSeen, setHintSeen] = useState(true);
  const [notes, setNotes] = useState("");
  const [notesOpen, setNotesOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  // --- Ask-the-Library deep link -------------------------------------------
  // Behaviour only. A citation arrives as ?s=<section>&q=<verified sentence>;
  // this lands on that section using the reader's OWN scrollToId/flash and the
  // accordion's own controls, then marks the sentence. An ordinary visit has no
  // such query and nothing here runs, so a book opened normally behaves exactly
  // as it always has.
  useEffect(() => {
    const link = readDeepLink(window.location.search);
    if (!link) return;
    const id = sectionElementId(link.section);
    const ch = chapterOf(link.section);
    let tries = 0, expanded = false, cancelled = false;
    let timer: ReturnType<typeof setTimeout>;
    let stopWatch: (() => void) | undefined;

    const finish = (el: HTMLElement) => {
      scrollToId(id);
      if (!link.quote) return;
      // Mark once, then bring the SENTENCE into view — on a long section the
      // cited line can sit several screens below its heading.
      const place = () => {
        const hit = markQuote(el, link.quote!, document, findQuote);
        if (!hit) return;
        // Re-assert, bounded. The reader restores its own last reading position,
        // and on the largest book that restore lands AFTER this one — leaving a
        // correctly created highlight sitting off-screen. Rather than race it
        // with a longer delay, check whether the mark is actually visible once
        // the page is still, and nudge it back at most twice.
        let attempts = 0;
        const ensureVisible = () => {
          bringIntoView(hit, window);
          stopWatch = afterScrollSettles(window, () => {
            if (cancelled || ++attempts >= 3) return;
            const r = hit.getBoundingClientRect();
            if (r.top < 0 || r.top > window.innerHeight) ensureVisible();
          });
        };
        ensureVisible();
      };
      // Wait for the jump to settle rather than guessing a delay: the largest
      // book scrolls a very long way and a fixed timeout is either wrong or slow.
      stopWatch = afterScrollSettles(window, () => { if (!cancelled) place(); });
    };

    const attempt = () => {
      if (cancelled) return;
      const el = document.getElementById(id);
      if (el) {
        // The section exists but its body may still be collapsed, in which case
        // there is nothing to highlight yet. Press its own header once.
        if (!expanded && link.quote && !findQuote(el.innerText || "", link.quote)) {
          expanded = expandSection(el);
          if (expanded) { timer = setTimeout(attempt, 260); return; }
        }
        finish(el);
        return;
      }
      // Not rendered yet. Books that collapse whole chapters listen for
      // #ch-<n>, so ask for the chapter the same way the reader's own
      // navigation does, once, then keep waiting.
      if (ch && tries === 4) window.location.hash = `#ch-${ch}`;
      if (++tries < 40) timer = setTimeout(attempt, 150);
    };
    attempt();
    return () => { cancelled = true; clearTimeout(timer); stopWatch?.(); };
  }, []);
  const [focus, setFocus] = useState(false);
  const [prog, setProg] = useState(0);
  const mainRef = useRef<HTMLDivElement>(null);
  // "בעמוד זה" scroll-spy — section anchors discovered from the rendered book DOM
  const [secs, setSecs] = useState<{ id: string; title: string; chapter: number }[]>([]);
  const [activeSec, setActiveSec] = useState<string>("");
  const activeRef = useRef(active);
  const activeSecRef = useRef(activeSec);
  const spySuppressRef = useRef(0); // timestamp until which chapter scroll-spy is suppressed after an explicit jump
  useEffect(() => { activeRef.current = active; }, [active]);
  useEffect(() => { activeSecRef.current = activeSec; }, [activeSec]);

  // handle explicit chapter jumps (§6 fix): set active immediately, expand target
  // (ChapterReader also listens), suppress scroll-spy, then smooth-scroll to it.
  useEffect(() => {
    const onGoto = (e: Event) => {
      const n = Number((e as CustomEvent).detail);
      if (!n) return;
      setActive(n);
      spySuppressRef.current = Date.now() + 1000;
      history.replaceState(null, "", `#ch-${n}`);
      window.setTimeout(() => {
        const el = document.querySelector<HTMLElement>(`[data-chapter="${n}"]`);
        if (el) { el.scrollIntoView({ behavior: "smooth", block: "start" }); flash(el); }
      }, 90);
    };
    window.addEventListener("neo:reader:goto", onGoto);
    return () => window.removeEventListener("neo:reader:goto", onGoto);
  }, []);

  // reader display prefs (theme / type-size / measure) — scoped to the pane
  const [rtheme, setRtheme] = useState<RTheme>("original");
  const [rsize, setRsize] = useState<RSize>("md");
  const [rmeasure, setRmeasure] = useState<RMeasure>("normal");
  useEffect(() => {
    try {
      const t = localStorage.getItem("neo:reader:theme"); if (t === "sepia" || t === "night" || t === "original") setRtheme(t);
      const s = localStorage.getItem("neo:reader:size"); if (s === "sm" || s === "lg" || s === "md" || s === "xl") setRsize(s);
      const m = localStorage.getItem("neo:reader:measure"); if (m === "narrow" || m === "normal" || m === "wide") setRmeasure(m);
      else if (localStorage.getItem("neo:reader:wide") === "1") setRmeasure("wide"); // migrate old boolean
    } catch { /* noop */ }
  }, []);
  const saveTheme = useCallback((t: RTheme) => { setRtheme(t); try { localStorage.setItem("neo:reader:theme", t); } catch { /* noop */ } }, []);
  const saveSize = useCallback((s: RSize) => { setRsize(s); try { localStorage.setItem("neo:reader:size", s); } catch { /* noop */ } }, []);
  const saveMeasure = useCallback((m: RMeasure) => { setRmeasure(m); try { localStorage.setItem("neo:reader:measure", m); } catch { /* noop */ } }, []);
  // reading view — device-adaptive default (desktop→bilingual, mobile→hebrew), remembered
  const [rview, setRview] = useState<ReaderView>("bilingual");
  useEffect(() => { setRview(resolveReaderView()); }, []);
  const saveView = useCallback((v: ReaderView) => { setRview(v); saveReaderView(v); }, []);
  // reading mode — continuous scroll (default) vs paginated Page View, remembered
  const [rmode, setRmode] = useState<"scroll" | "page">("scroll");
  useEffect(() => { try { const m = localStorage.getItem("neo:reader:mode"); if (m === "page" || m === "scroll") setRmode(m); } catch { /* noop */ } }, []);
  const saveMode = useCallback((m: "scroll" | "page") => { setRmode(m); try { localStorage.setItem("neo:reader:mode", m); } catch { /* noop */ } }, []);
  const pageMode = rmode === "page";
  // §3 — preserve reading location across a reading-mode switch (scroll ⇄ page).
  const prevModeRef = useRef<"scroll" | "page">(rmode);
  useEffect(() => {
    if (prevModeRef.current === rmode) return;
    prevModeRef.current = rmode;
    const id = activeSecRef.current;
    if (!id) return;
    window.setTimeout(() => {
      if (rmode === "page") window.dispatchEvent(new CustomEvent("neo:reader:restore-section", { detail: id }));
      else { const el = document.getElementById(id); if (el) el.scrollIntoView({ block: "start" }); }
    }, 640);
  }, [rmode]);

  useEffect(() => { try { setNotes(localStorage.getItem(`neo:reader:notes:${bookId}`) || ""); } catch { /* noop */ } }, [bookId]);
  useEffect(() => { try { setFocus(localStorage.getItem("neo:reader:focus") === "1"); } catch { /* noop */ } }, []);
  const toggleFocus = useCallback(() => setFocus((v) => { const n = !v; try { localStorage.setItem("neo:reader:focus", n ? "1" : "0"); } catch { /* noop */ } return n; }), []);

  // linear reading-progress (scroll fraction of the document) — cheap, rAF-throttled
  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const h = document.documentElement.scrollHeight - window.innerHeight;
        setProg(h > 0 ? Math.min(100, Math.max(0, (window.scrollY / h) * 100)) : 0);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); if (raf) cancelAnimationFrame(raf); };
  }, []);

  // first-use hint (one line, dismissible, remembered)
  useEffect(() => { try { setHintSeen(localStorage.getItem("neo:reader:helpseen") === "1"); } catch { /* noop */ } }, []);
  const dismissHint = useCallback(() => { setHintSeen(true); try { localStorage.setItem("neo:reader:helpseen", "1"); } catch { /* noop */ } }, []);

  // overlay a11y — Esc closes the help / reset dialogs + lock background scroll
  useEffect(() => {
    if (!helpOpen && !confirmReset && !searchOpen && !notesOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const h = (e: KeyboardEvent) => { if (e.key === "Escape") { setHelpOpen(false); setConfirmReset(false); setSearchOpen(false); setNotesOpen(false); } };
    window.addEventListener("keydown", h);
    return () => { document.body.style.overflow = prev; window.removeEventListener("keydown", h); };
  }, [helpOpen, confirmReset, searchOpen, notesOpen]);

  // keyboard shortcuts — F focus · C contents · ? help (ignored while typing)
  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      const el = e.target as HTMLElement | null;
      if (el && (el.tagName === "INPUT" || el.tagName === "TEXTAREA" || el.isContentEditable)) return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (e.key === "f" || e.key === "F") { e.preventDefault(); toggleFocus(); }
      else if (e.key === "c" || e.key === "C") { scrollToId("book-contents"); }
      else if (e.key === "?") { setHelpOpen(true); }
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [toggleFocus]);

  // Esc exits focus mode
  useEffect(() => {
    if (!focus) return;
    const h = (e: KeyboardEvent) => { if (e.key === "Escape") toggleFocus(); };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [focus, toggleFocus]);

  const total = chapters.length || 1;
  const score = Math.round((read.length / total) * 100);

  // real metadata from the Library (publisher / module / pages / summary) when available
  const meta = useMemo(() => LIBRARY.find((b) => b.id === LIB_BY_BOOK[bookId]), [bookId]);
  // books outside LIBRARY (e.g. the Academy guide) still get an identity color +
  // module chip, derived from their subtitle ("PM · …") so no book looks generic.
  const derivedMod = useMemo(() => {
    if (meta?.module) return meta.module;
    const tok = subtitle?.split(/[·|/]/)[0]?.trim().split(/\s+/)[0];
    return tok && MOD_COLOR[tok] ? tok : undefined;
  }, [meta, subtitle]);
  const c = mc(derivedMod);
  const readMin = meta?.pages ? Math.max(1, Math.round((meta.pages * 2) / 60)) : null; // UI estimate: ~2 min/page
  const started = last > 0 || read.length > 0;
  const first = chapters[0]?.n ?? 1;

  // open the owning chapter (via hash) then land on the exact section anchor
  const goSection = useCallback((id: string, chapter: number) => {
    if (document.getElementById(id)) { scrollToId(id); return; }
    if (chapter) jump(chapter); // triggers the page's hash-listener to expand it
    window.setTimeout(() => { const el = document.getElementById(id); if (el) { el.scrollIntoView({ behavior: "smooth", block: "start" }); flash(el); } }, 360);
  }, []);

  // exact resume — land on the last section / scroll spot, not just chapter-top
  const resumeExact = useCallback(() => {
    const cont = readContinuity();
    if (cont && cont.bookId === bookId) {
      if (cont.sectionId) { goSection(cont.sectionId, cont.chapter || 0); return; }
      if (cont.chapter && cont.chapter > 1) { jump(cont.chapter); return; }
      if (cont.scrollRatio && cont.scrollRatio > 0.01) {
        const h = document.documentElement.scrollHeight - window.innerHeight;
        window.scrollTo({ top: h * cont.scrollRatio, behavior: "smooth" });
        return;
      }
    }
    jump(last || first);
  }, [bookId, last, first, goSection]);

  // reset reading progress for this book (chapter/section/scroll/figure position)
  const doReset = useCallback((withNotes: boolean) => {
    reset({ notes: withNotes });
    clearContinuityFor(bookId);
    setActive(chapters[0]?.n ?? 1);
    setConfirmReset(false); setResetNotesToo(false);
    try { window.scrollTo({ top: 0 }); } catch { /* noop */ }
  }, [reset, bookId, chapters]);

  // continuity — remember this book + live chapter for the global "המשך לקרוא"
  useEffect(() => {
    if (typeof window === "undefined") return;
    writeContinuity({ bookId, title: meta?.titleHe || title, module: derivedMod || "", href: window.location.pathname, chapter: active });
  }, [bookId, active, meta, title, derivedMod]);

  // discover section anchors ([data-section]) from the rendered book — powers the
  // "בעמוד זה" rail + exact resume. Re-scans on DOM change (chapters open/close),
  // so books without anchors simply fall back to a chapter-level rail.
  useEffect(() => {
    let raf = 0;
    const scan = () => {
      raf = 0;
      const els = Array.from(document.querySelectorAll<HTMLElement>("[data-section]"));
      const found = els.map((el) => ({
        id: el.id || el.dataset.section || "",
        title: el.dataset.sectionTitle || (el.textContent || "").trim().slice(0, 70),
        chapter: Number(el.closest<HTMLElement>("[data-chapter]")?.dataset.chapter || 0),
      })).filter((s) => s.id);
      setSecs((prev) => (prev.length === found.length && prev.every((p, i) => p.id === found[i].id) ? prev : found));
    };
    scan();
    const mo = new MutationObserver(() => { if (!raf) raf = requestAnimationFrame(scan); });
    mo.observe(document.body, { childList: true, subtree: true });
    return () => { mo.disconnect(); if (raf) cancelAnimationFrame(raf); };
  }, []);

  // active section (scroll-spy) — highlights the passage currently being read
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-section]"));
    if (!els.length) return;
    const io = new IntersectionObserver((entries) => {
      const vis = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (vis) setActiveSec((vis.target as HTMLElement).id);
    }, { rootMargin: "-18% 0px -68% 0px", threshold: [0, 0.25, 0.75] });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [secs.length]);

  // exact-resume writer — trailing-edge debounce so the section scroll-spy has
  // settled before we snapshot scroll ratio + last visible section anchor
  useEffect(() => {
    if (typeof window === "undefined") return;
    let t = 0;
    const write = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      const ratio = h > 0 ? Math.min(1, Math.max(0, window.scrollY / h)) : 0;
      writeContinuity({ bookId, title: meta?.titleHe || title, module: derivedMod || "", href: window.location.pathname, chapter: activeRef.current, sectionId: activeSecRef.current || undefined, scrollRatio: ratio });
    };
    const onScroll = () => { window.clearTimeout(t); t = window.setTimeout(write, 500); };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("pagehide", write);
    return () => { window.clearTimeout(t); window.removeEventListener("scroll", onScroll); window.removeEventListener("pagehide", write); };
  }, [bookId, meta, title, derivedMod]);

  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-chapter]"));
    if (!els.length) return;
    const io = new IntersectionObserver((entries) => {
      if (Date.now() < spySuppressRef.current) return; // an explicit jump is in progress — don't override the highlight
      const vis = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (vis) {
        const n = Number((vis.target as HTMLElement).dataset.chapter);
        setActive(n);
        if (vis.intersectionRatio > 0.35) markRead(n);
      }
    }, { rootMargin: "-15% 0px -55% 0px", threshold: [0.1, 0.35, 0.6] });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [markRead]);

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    return s ? chapters.filter((ch) => `${ch.n} ${ch.title} ${ch.he || ""}`.toLowerCase().includes(s)) : chapters;
  }, [q, chapters]);

  const idx = chapters.findIndex((ch) => ch.n === active);
  const prev = idx > 0 ? chapters[idx - 1] : null;
  const next = idx >= 0 && idx < chapters.length - 1 ? chapters[idx + 1] : null;

  const MetaChip = ({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) => (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-hairline bg-surface px-2.5 py-1 text-[11.5px] font-bold text-ink-2">{icon}{children}</span>
  );

  return (
    <ReaderViewContext.Provider value={rview}>
    <PageModeContext.Provider value={pageMode}>
    <div className="space-y-6 sm:space-y-8">
      {/* fixed linear reading-progress rail (module-colored) */}
      <div className="pointer-events-none fixed inset-x-0 top-0 z-[55] h-[3px] bg-transparent" aria-hidden>
        <div className="h-full origin-right transition-transform duration-150 ease-out" style={{ transform: `scaleX(${prog / 100})`, background: `linear-gradient(90deg, ${c}, ${c}aa)` }} />
      </div>
      {/* draggable position rail (large screens) — the top bar is the mobile indicator */}
      {/* §5+§12 — the rich digital rail lives in Focus Mode, where the reader's
          side panels are hidden so it has a clean, uncrowded home. */}
      <DigitalProgressRail accent={c} hidden={!focus || pageMode} chapters={chapters} bm={bm} active={active} activeSec={activeSec} secs={secs} totalMin={meta?.pages ? meta.pages * 2 : null} />

      {/* ===================== BREADCRUMBS ===================== */}
      {!focus && (
        <nav aria-label="breadcrumb" className="flex items-center gap-1.5 text-[12px] font-semibold text-ink-3">
          <Link href="/library/" className="inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 transition hover:bg-surface-2 hover:text-brand"><Home className="size-3.5" /> ספרייה</Link>
          {derivedMod && <><span className="text-ink-3/50">/</span><span className="rounded-md px-1.5 py-0.5" style={{ color: c }}>{derivedMod}</span></>}
          <span className="text-ink-3/50">/</span>
          <span className="truncate text-ink-2">{meta ? meta.titleHe : title}</span>
        </nav>
      )}

      {/* ===================== PREMIUM BOOK LANDING (Phase 12.2) ===================== */}
      {/* Was a framer `motion.section` with initial opacity:0 — serialised into the
          static export as inline opacity:0, so the book landing shipped invisible
          until framer-motion hydrated. Same 0.5s rise, now pure CSS. */}
      <section
        className={`neo-rise relative overflow-hidden rounded-[1.75rem] border border-hairline bg-surface shadow-[0_18px_48px_-26px_rgba(15,23,42,0.45)] ${focus || pageMode ? "hidden" : ""}`}
        style={{ "--neo-y": "12px", "--neo-dur": "0.5s" } as React.CSSProperties}>
        {/* top identity accent (module color) */}
        <span className="absolute inset-x-0 top-0 h-1.5" style={{ background: `linear-gradient(90deg, ${c}, ${c}88)` }} />
        <span className="pointer-events-none absolute -left-20 -top-16 size-52 rounded-full opacity-[0.12] blur-3xl" style={{ background: c }} />
        <div className="relative grid gap-5 p-6 sm:grid-cols-[132px_minmax(0,1fr)] sm:gap-7 sm:p-8">
          {/* the closed book you opened — real cover, module identity */}
          <div className="mx-auto w-24 sm:mx-0 sm:w-full">
            <BookCover book={{ title: meta?.titleHe || title, titleEn: meta?.title, module: derivedMod || "", publisher: meta?.publisher, pages: meta?.pages, chapters: total }} size="md" />
          </div>
          <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1 rounded-full bg-brand-soft px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-brand"><Sparkles className="size-3" /> {bookType(meta?.publisher)}</span>
            {derivedMod && <span className="rounded-md px-2 py-0.5 text-[10px] font-extrabold text-white" style={{ background: forWhiteText(c)}}>{derivedMod}</span>}
            {meta?.publisher && meta.publisher !== bookType(meta.publisher) && <span className="text-[11.5px] font-semibold text-ink-3">{meta.publisher}</span>}
          </div>
          <h1 className="mt-3 max-w-3xl font-display text-2xl leading-tight tracking-tight text-ink-1 sm:text-[2rem]">{meta ? meta.titleHe : title}</h1>
          {subtitle && !meta && <p className="mt-1 text-sm text-ink-3">{subtitle}</p>}
          {(meta?.summaryHe || note) && <p className="mt-2 max-w-2xl text-[13.5px] leading-relaxed text-ink-2 sm:text-sm">{meta?.summaryHe || note}</p>}

          <div className="mt-4 flex flex-wrap items-center gap-2">
            {meta?.pages && <MetaChip icon={<FileText className="size-3.5 text-ink-3" />}>{meta.pages} עמ׳</MetaChip>}
            <MetaChip icon={<Layers3 className="size-3.5 text-ink-3" />}>{total} פרקים</MetaChip>
            {readMin && <span className="hidden sm:contents"><MetaChip icon={<Clock className="size-3.5 text-ink-3" />}>≈ {readMin} ש׳ קריאה</MetaChip></span>}
            <MetaChip icon={<Languages className="size-3.5 text-ink-3" />}>EN · HE</MetaChip>
            <MetaChip icon={<GraduationCap className="size-3.5" style={{ color: c }} />}>{score}% נקרא</MetaChip>
            {bm.length > 0 && <span className="hidden sm:contents"><MetaChip icon={<Bookmark className="size-3.5 fill-amber-400 text-amber-400" />}>{bm.length} סימניות</MetaChip></span>}
            {stats?.map((s, i) => <span key={i} className="hidden sm:contents"><MetaChip icon={<Check className="size-3.5 text-ink-3" />}>{s.value} {s.label}</MetaChip></span>)}
          </div>

          {/* progress */}
          <div className="mt-4 max-w-md">
            <div className="mb-1 flex items-center justify-between text-[11px] font-bold text-ink-3">
              <span>התקדמות · {read.length}/{total} פרקים</span>
              <span style={{ color: c }}>{score}%</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-surface-2">
              <div className="h-full rounded-full transition-all duration-700" style={{ width: `${score}%`, background: `linear-gradient(90deg, ${c}, ${c}aa)` }} />
            </div>
          </div>

          {/* premium reading CTAs */}
          <div className="mt-5 flex flex-wrap gap-2.5">
            {started ? (
              <>
                <button onClick={resumeExact} aria-label={`המשך קריאה מהמקום האחרון${last ? `, פרק ${last}` : ""}`} title="חזרה למקום המדויק שבו הפסקת" className="group inline-flex items-center gap-2 rounded-2xl px-5 py-2.5 text-sm font-extrabold text-white shadow-sm transition hover:brightness-110 active:scale-95" style={{ background: forWhiteText(c)}}>
                  <PlayCircle className="size-4.5" /> המשך קריאה{last ? ` · פרק ${last}` : ""}
                  <span className="grid size-6 place-items-center rounded-full bg-white/20 transition group-hover:translate-x-0.5"><ArrowLeft className="size-3.5" /></span>
                </button>
                <button onClick={() => jump(first)} aria-label="התחל את הספר מהפרק הראשון" title="קפוץ לתחילת הספר" className="inline-flex items-center gap-2 rounded-2xl border border-hairline bg-surface px-4 py-2.5 text-sm font-bold text-ink-2 shadow-sm transition hover:border-brand/40 active:scale-95"><BookOpen className="size-4" /> התחל מהתחלה</button>
              </>
            ) : (
              <button onClick={() => jump(first)} aria-label="התחל לקרוא מהפרק הראשון" title="פתח את הפרק הראשון" className="group inline-flex items-center gap-2 rounded-2xl px-5 py-2.5 text-sm font-extrabold text-white shadow-sm transition hover:brightness-110 active:scale-95" style={{ background: c }}>
                <BookOpen className="size-4.5" /> התחל לקרוא
                <span className="grid size-6 place-items-center rounded-full bg-white/20 transition group-hover:translate-x-0.5"><ArrowLeft className="size-3.5" /></span>
              </button>
            )}
            <button onClick={() => scrollToId("book-contents")} aria-label="עיין בתוכן העניינים של הספר" title="פתח את פרקי הספר וקפוץ לפרק או סעיף (מקש C)" className="inline-flex items-center gap-2 rounded-2xl border border-hairline bg-surface px-4 py-2.5 text-sm font-bold text-ink-2 shadow-sm transition hover:border-brand/40 active:scale-95"><ListTree className="size-4" /> עיין בתוכן</button>
            <button onClick={toggleFocus} aria-pressed={focus} aria-label="מצב קריאה מרוכז" title="הסתר הכל מלבד הטקסט (מקש F · Esc ליציאה)" className="inline-flex items-center gap-2 rounded-2xl border border-hairline bg-surface px-4 py-2.5 text-sm font-bold text-ink-2 shadow-sm transition hover:border-brand/40 active:scale-95"><Maximize2 className="size-4" /> מצב מיקוד</button>
            <ReaderSettings view={rview} setView={saveView} mode={rmode} setMode={saveMode} theme={rtheme} setTheme={saveTheme} size={rsize} setSize={saveSize} measure={rmeasure} setMeasure={saveMeasure} accent={c} onReset={() => setConfirmReset(true)} />
            <button onClick={() => setSearchOpen(true)} aria-label="חיפוש בתוך הספר" title="חיפוש פרק בתוך הספר" className="tap inline-flex items-center gap-2 rounded-2xl border border-hairline bg-surface px-3 py-2.5 text-sm font-bold text-ink-3 shadow-sm transition hover:border-brand/40 hover:text-brand active:scale-95"><Search className="size-4" /></button>
            <button onClick={() => setNotesOpen(true)} aria-label="הערות הספר" title="הערות אישיות על הספר" className="tap inline-flex items-center gap-2 rounded-2xl border border-hairline bg-surface px-3 py-2.5 text-sm font-bold text-ink-3 shadow-sm transition hover:border-brand/40 hover:text-brand active:scale-95"><StickyNote className="size-4" />{notes.trim() && <span className="size-1.5 rounded-full" style={{ background: c }} />}</button>
            <button onClick={() => setHelpOpen(true)} aria-label="עזרה — איך משתמשים בקורא" title="עזרה ומקשי קיצור" className="inline-flex items-center gap-2 rounded-2xl border border-hairline bg-surface px-3 py-2.5 text-sm font-bold text-ink-3 shadow-sm transition hover:border-brand/40 hover:text-brand active:scale-95"><HelpCircle className="size-4" /></button>
          </div>
          {!hintSeen && (
            <div className="mt-3 flex items-center gap-2 rounded-xl border border-brand/20 bg-brand-soft/40 px-3 py-2 text-[12px] font-semibold text-ink-2">
              <HelpCircle className="size-3.5 shrink-0 text-brand" /> טיפ: רחף מעל כל כפתור לקבלת הסבר · לחצו <b>?</b> לעזרה מלאה ומקשי קיצור.
              <button onClick={dismissHint} aria-label="הבנתי, אל תציג שוב" className="tap ms-auto shrink-0 rounded-md px-1.5 py-0.5 text-ink-3 hover:bg-surface-2"><X className="size-3.5" /></button>
            </div>
          )}
          </div>
        </div>
      </section>

      {/* ===================== PREMIUM CHAPTER CARDS (Table of Contents) ===================== */}
      <section id="book-contents" className={`scroll-mt-24 space-y-3 ${focus || pageMode ? "hidden" : ""}`}>
        <h2 className="flex items-center gap-2 font-display text-lg text-ink-1"><ListTree className="size-5 text-brand" /> תוכן העניינים <span className="text-sm font-semibold text-ink-3">· {total} פרקים</span></h2>
        <div className="grid-adaptive-sm">
          {chapters.map((ch) => {
            const isRead = read.includes(ch.n); const isBm = bm.includes(ch.n); const isLast = last === ch.n;
            return (
              <button key={ch.n} onClick={() => { playTick(); jump(ch.n); }}
                className="card-interactive group flex items-start gap-3 p-3.5 text-start" style={isLast ? { borderColor: `${c}66` } : undefined}>
                <span className={`grid size-8 shrink-0 place-items-center rounded-xl text-xs font-extrabold transition ${isRead ? "bg-emerald-100 text-emerald-600" : "text-white"}`} style={!isRead ? { background: c } : undefined}>
                  {isRead ? <CheckCircle2 className="size-4" /> : ch.n}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[13px] font-bold text-ink-1">{ch.title}</span>
                  <span className="mt-0.5 flex items-center gap-1.5 text-[10.5px] font-semibold text-ink-3">
                    {isRead ? <>נקרא</> : isLast ? <span style={{ color: c }}>ממשיך כאן</span> : <>פרק {ch.n}</>}
                    {isBm && <Bookmark className="size-3 fill-amber-400 text-amber-400" />}
                  </span>
                </span>
                <ArrowLeft className="size-4 shrink-0 text-ink-3 opacity-0 transition group-hover:translate-x-0.5 group-hover:opacity-100" />
              </button>
            );
          })}
        </div>
      </section>

      {/* ===================== FOCUS-MODE CONTROL BAR ===================== */}
      {focus && (
        <div className="sticky top-[3.5rem] z-40 -mx-2 mb-2 flex items-center gap-2 rounded-2xl border border-hairline bg-surface/90 px-3 py-2 shadow-sm backdrop-blur-md sm:mx-0">
          <button onClick={toggleFocus} className="tap inline-flex items-center gap-1.5 rounded-xl border border-hairline bg-surface px-2.5 py-1.5 text-xs font-bold text-ink-2 hover:border-brand/40" title="יציאה ממצב מיקוד (Esc)"><Minimize2 className="size-3.5" /> יציאה</button>
          <Link href="/library/" className="tap hidden shrink-0 items-center gap-1 rounded-xl border border-hairline bg-surface px-2.5 py-1.5 text-xs font-bold text-ink-2 hover:border-brand/40 sm:inline-flex"><Library className="size-3.5" /> ספרייה</Link>
          <div className="min-w-0 flex-1 text-center">
            <span className="block truncate text-xs font-extrabold text-ink-1">{meta ? meta.titleHe : title}</span>
            <div className="mx-auto mt-1 h-1 max-w-xs overflow-hidden rounded-full bg-surface-2">
              <div className="h-full rounded-full" style={{ width: `${prog}%`, background: c }} />
            </div>
          </div>
          <select value={active} onChange={(e) => jump(Number(e.target.value))} aria-label="קפוץ לפרק" className="tap max-w-[9rem] shrink-0 rounded-xl border border-hairline bg-surface px-2 py-1.5 text-xs font-bold text-ink-2 outline-none focus:border-brand/40">
            {chapters.map((ch) => <option key={ch.n} value={ch.n}>{ch.n}. {ch.title}</option>)}
          </select>
        </div>
      )}

      {/* ===================== READER (existing engine — unchanged) ===================== */}
      {pageMode ? (
        <div data-theme={rtheme} data-size={rsize} data-measure={rmeasure} data-view={rview} className="neo-reader neo-pane reader-enter mx-auto w-full min-w-0">
          {/* page-mode control bar — the hero/TOC are hidden here, so settings + focus
              + library must stay reachable (else the reader is a one-way trap). */}
          {!focus && (
            <div className="mb-3 flex flex-wrap items-center gap-2">
              <Link href="/library/" className="tap inline-flex items-center gap-1.5 rounded-xl border border-hairline bg-surface px-2.5 py-2 text-xs font-bold text-ink-2 hover:border-brand/40"><Library className="size-3.5" /> ספרייה</Link>
              <span className="min-w-0 flex-1 truncate text-[13px] font-extrabold text-ink-1">{meta ? meta.titleHe : title}</span>
              <button onClick={toggleFocus} title="מצב מיקוד (F)" className="tap inline-flex items-center gap-1.5 rounded-xl border border-hairline bg-surface px-2.5 py-2 text-xs font-bold text-ink-2 hover:border-brand/40"><Maximize2 className="size-3.5" /> מיקוד</button>
              <ReaderSettings view={rview} setView={saveView} mode={rmode} setMode={saveMode} theme={rtheme} setTheme={saveTheme} size={rsize} setSize={saveSize} measure={rmeasure} setMeasure={saveMeasure} accent={c} onReset={() => setConfirmReset(true)} />
            </div>
          )}
          {/* chapter-scoped pagination: render ONLY the active chapter so the frame
              paginates a small, measurable amount of content (no 900-page multicol). */}
          <PageView chapters={chapters} active={active} accent={c}
            onChapter={(n) => { setActive(n); try { history.replaceState(null, "", `#ch-${n}`); } catch { /* noop */ } }}>
            {pageChild(children, active)}
          </PageView>
        </div>
      ) : (
      <div className={focus ? "block" : "block xl:grid xl:gap-6 xl:grid-cols-[minmax(0,1fr)_248px] 2xl:gap-8 2xl:grid-cols-[minmax(0,1fr)_300px] min-[2560px]:grid-cols-[minmax(0,1fr)_360px]"}>
        {/* §8 — the old left knowledge panel (chapter tree + score + search + notes)
            was removed: it duplicated the contents grid + the "בעמוד זה" rail and ate
            reading width. Its functions moved to the toolbar (search + notes popovers)
            and the "בעמוד זה" rail (chapter nav + read/bookmark states + score summary). */}
        {/* ===== reading pane ===== */}
        <div ref={mainRef} data-theme={rtheme} data-size={rsize} data-measure={rmeasure} data-view={rview} className={`neo-reader neo-pane reader-enter min-w-0 ${focus ? "mx-auto max-w-3xl" : "mx-auto w-full"}`}>
          {children}
          {/* next / prev */}
          <div className="mt-6 flex items-center justify-between gap-3">
            <button disabled={!prev} onClick={() => prev && jump(prev.n)} className="tap inline-flex items-center gap-2 rounded-xl border border-hairline bg-surface px-4 py-2.5 text-sm font-bold text-ink-2 shadow-sm transition enabled:hover:border-brand enabled:hover:text-brand disabled:opacity-40">
              <ChevronUp className="size-4" /> {prev ? `פרק ${prev.n}` : "התחלה"}
            </button>
            <span className="text-xs font-bold text-ink-3">פרק {active} / {total}</span>
            <button disabled={!next} onClick={() => next && jump(next.n)} className="tap inline-flex items-center gap-2 rounded-xl bg-brand px-4 py-2.5 text-sm font-bold text-brand-foreground shadow-sm transition enabled:hover:bg-brand-dark disabled:opacity-40">
              {next ? `פרק ${next.n}` : "סוף"} <ChevronDown className="size-4" />
            </button>
          </div>
        </div>

        {/* ===== "בעמוד זה" — on-this-page scroll-spy rail (xl+, docs-grade) ===== */}
        {!focus && (
          <aside className="hidden xl:block">
            <div className="sticky top-[5rem] max-h-[calc(100vh-6rem)] overflow-y-auto pb-4">
              <div className="mb-2 flex items-center justify-between pe-1">
                <span className="flex items-center gap-1.5 text-[10.5px] font-extrabold uppercase tracking-[0.16em] text-ink-3"><AlignLeft className="size-3.5" /> בעמוד זה</span>
                <span className="font-mono text-[11px] font-bold tabular-nums" style={{ color: c }}>{Math.round(prog)}%</span>
              </div>
              {/* progress summary (relocated from the removed left panel) */}
              <div className="mb-3 rounded-xl border border-hairline bg-surface-2/40 p-2.5">
                <div className="flex items-center justify-between text-[11px] font-bold"><span className="flex items-center gap-1 text-ink-3"><GraduationCap className="size-3.5 text-brand" /> ציון ידע</span><span className="font-mono" style={{ color: c }}>{score}%</span></div>
                <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-surface-2"><div className="h-full rounded-full transition-all duration-700" style={{ width: `${score}%`, background: c }} /></div>
                <p className="mt-1 text-[10px] text-ink-3">{read.length}/{total} פרקים נקראו · {bm.length} סימניות</p>
              </div>
              <nav className="relative border-s border-hairline" aria-label="בעמוד זה">
                {chapters.map((ch) => {
                  const on = active === ch.n;
                  const isRead = read.includes(ch.n); const isBm = bm.includes(ch.n);
                  const chSecs = secs.filter((s) => s.chapter === ch.n);
                  return (
                    <div key={ch.n}>
                      <div className="group/ch flex items-center">
                        <button onClick={() => { playTick(); jump(ch.n); }} className="group relative -ms-px flex min-w-0 flex-1 items-center gap-1.5 border-s-2 py-[5px] ps-3 text-start transition-colors" style={{ borderColor: on ? c : "transparent" }}>
                          {isRead && <Check className="size-3 shrink-0 text-emerald-500" />}
                          <span className={`truncate text-[12px] leading-snug transition-colors ${on ? "font-extrabold text-ink-1" : "font-medium text-ink-3 group-hover:text-ink-1"}`}>{ch.n}. {ch.title}</span>
                        </button>
                        <button onClick={() => toggleBm(ch.n)} aria-label={isBm ? "הסר סימנייה" : "סמן פרק"} className="tap shrink-0 px-1 opacity-0 transition group-hover/ch:opacity-100" style={{ opacity: isBm ? 1 : undefined }}>
                          <Bookmark className={`size-3.5 ${isBm ? "fill-amber-400 text-amber-400" : "text-ink-3"}`} />
                        </button>
                      </div>
                      {on && chSecs.length > 0 && (
                        <div className="mb-0.5">
                          {chSecs.map((s) => {
                            const sa = activeSec === s.id;
                            return (
                              <button key={s.id} onClick={() => goSection(s.id, ch.n)} className="group relative -ms-px flex w-full items-center border-s-2 py-[3px] ps-5 text-start transition-colors" style={{ borderColor: sa ? c : "transparent" }}>
                                <span className={`truncate text-[11px] leading-snug transition-colors ${sa ? "font-bold text-ink-1" : "font-normal text-ink-3 group-hover:text-ink-2"}`}>{s.title}</span>
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </nav>
            </div>
          </aside>
        )}
      </div>
      )}

      {/* §8 — in-book search (relocated from the removed panel) */}
      {searchOpen && (
        <div role="dialog" aria-modal="true" aria-label="חיפוש בספר" className="fixed inset-0 z-[80] flex items-start justify-center bg-slate-950/50 p-4 pt-[12vh] backdrop-blur-sm" onClick={() => { setSearchOpen(false); setQ(""); }}>
          <div onClick={(e) => e.stopPropagation()} dir="rtl" className="w-full max-w-md overflow-hidden rounded-2xl border border-hairline bg-surface shadow-2xl">
            <div className="flex items-center gap-2 border-b border-hairline px-4">
              <Search className="size-4 shrink-0 text-brand" />
              {/* eslint-disable-next-line jsx-a11y/no-autofocus */}
              <input autoFocus value={q} onChange={(e) => setQ(e.target.value)} placeholder="חיפוש פרק בתוך הספר…" className="h-12 w-full bg-transparent text-sm outline-none placeholder:text-ink-3" />
              <button onClick={() => { setSearchOpen(false); setQ(""); }} aria-label="סגור" className="tap grid size-8 place-items-center rounded-lg text-ink-3 hover:bg-surface-2"><X className="size-4" /></button>
            </div>
            <div className="max-h-[50vh] overflow-y-auto p-2">
              {filtered.map((ch) => {
                const isRead = read.includes(ch.n); const isBm = bm.includes(ch.n);
                return (
                  <button key={ch.n} onClick={() => { setSearchOpen(false); setQ(""); jump(ch.n); }} className="tap flex w-full items-center gap-2 rounded-lg px-3 py-2 text-start transition hover:bg-surface-2">
                    <span className="grid size-5 shrink-0 place-items-center rounded-md bg-surface-2 text-[10px] font-bold text-ink-3">{ch.n}</span>
                    <span className="min-w-0 flex-1 truncate text-[13px] font-semibold text-ink-1">{ch.title}</span>
                    {isRead && <Check className="size-3.5 shrink-0 text-emerald-500" />}
                    {isBm && <Bookmark className="size-3.5 shrink-0 fill-amber-400 text-amber-400" />}
                  </button>
                );
              })}
              {filtered.length === 0 && <p className="px-3 py-8 text-center text-[13px] text-ink-3">אין פרק תואם ל־<b className="text-ink-2">{q}</b></p>}
            </div>
          </div>
        </div>
      )}

      {/* §8 — book notes (relocated from the removed panel) */}
      {notesOpen && (
        <div role="dialog" aria-modal="true" aria-label="הערות הספר" className="fixed inset-0 z-[80] flex items-end justify-center bg-slate-950/50 p-0 backdrop-blur-sm sm:items-center sm:p-4" onClick={() => setNotesOpen(false)}>
          <div onClick={(e) => e.stopPropagation()} dir="rtl" className="w-full max-w-md rounded-t-2xl border border-hairline bg-surface p-5 shadow-2xl sm:rounded-2xl">
            <div className="mx-auto mb-3 h-1.5 w-11 rounded-full bg-hairline sm:hidden" />
            <div className="flex items-center justify-between">
              <h3 className="flex items-center gap-2 font-display text-lg text-ink-1"><StickyNote className="size-5 text-brand" /> הערות הספר</h3>
              <button onClick={() => setNotesOpen(false)} aria-label="סגור" className="tap grid size-8 place-items-center rounded-lg text-ink-3 hover:bg-surface-2"><X className="size-4" /></button>
            </div>
            <textarea value={notes} onChange={(e) => { setNotes(e.target.value); try { localStorage.setItem(`neo:reader:notes:${bookId}`, e.target.value); } catch { /* noop */ } }}
              placeholder="הערות אישיות על הספר — נשמר בדפדפן, פרטי…" className="mt-3 h-44 w-full resize-none rounded-xl border border-hairline bg-surface-2/40 p-3 text-[13px] leading-relaxed outline-none focus:border-brand/40 focus:ring-2 focus:ring-brand/15" />
            <p className="mt-1.5 text-[10.5px] text-ink-3">נשמר מקומית בדפדפן · פרטי</p>
          </div>
        </div>
      )}

      {/* confirm reset progress — safe, per-book, bookmarks always kept */}
      {confirmReset && (
        <div role="dialog" aria-modal="true" aria-label="אישור איפוס התקדמות" className="fixed inset-0 z-[80] flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm" onClick={() => { setConfirmReset(false); setResetNotesToo(false); }}>
          <div onClick={(e) => e.stopPropagation()} className="w-full max-w-sm rounded-2xl border border-hairline bg-surface p-5 shadow-2xl">
            <div className="flex items-center gap-2.5 text-ink-1"><span className="grid size-9 place-items-center rounded-xl bg-brand-soft text-brand"><AlertTriangle className="size-5" /></span><h3 className="font-display text-lg">איפוס התקדמות קריאה</h3></div>
            <p className="mt-2.5 text-[13px] leading-relaxed text-ink-2">ננקה את הפרק, המיקום והגלילה עבור <b>{meta?.titleHe || title}</b> בלבד. ספרים אחרים לא יושפעו.</p>
            <label className="mt-3 flex items-center gap-2 text-xs font-semibold text-ink-2"><input type="checkbox" checked={resetNotesToo} onChange={(e) => setResetNotesToo(e.target.checked)} className="size-4 accent-brand" /> מחק גם את ההערות של הספר</label>
            <p className="mt-1 text-[11px] text-ink-3">הסימניות נשמרות תמיד.</p>
            <div className="mt-4 flex justify-end gap-2">
              <button onClick={() => { setConfirmReset(false); setResetNotesToo(false); }} className="tap rounded-xl border border-hairline bg-surface px-4 py-2 text-sm font-bold text-ink-2 hover:bg-surface-2">ביטול</button>
              <button onClick={() => doReset(resetNotesToo)} className="tap rounded-xl bg-brand px-4 py-2 text-sm font-bold text-brand-foreground hover:bg-brand-dark">אפס התקדמות</button>
            </div>
          </div>
        </div>
      )}

      {/* reader help — controls + keyboard shortcuts (no forced onboarding) */}
      {helpOpen && (
        <div role="dialog" aria-modal="true" aria-label="עזרה לקורא" className="fixed inset-0 z-[80] flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm" onClick={() => setHelpOpen(false)}>
          <div onClick={(e) => e.stopPropagation()} className="w-full max-w-md rounded-2xl border border-hairline bg-surface p-5 shadow-2xl">
            <div className="flex items-center justify-between">
              <h3 className="flex items-center gap-2 font-display text-lg text-ink-1"><HelpCircle className="size-5 text-brand" /> איך קוראים כאן</h3>
              <button onClick={() => setHelpOpen(false)} aria-label="סגור" className="tap rounded-lg p-1 text-ink-3 hover:bg-surface-2"><X className="size-4" /></button>
            </div>
            <ul className="mt-3 space-y-1.5 text-[13px] leading-relaxed text-ink-2">
              <li><b className="text-ink-1">המשך קריאה</b> — חזרה למקום המדויק שבו הפסקת.</li>
              <li><b className="text-ink-1">עיין בתוכן</b> — קפיצה לתוכן העניינים; הפרק הנוכחי מודגש.</li>
              <li><b className="text-ink-1">מצב מיקוד</b> — הסתרת הכל מלבד הטקסט.</li>
              <li><b className="text-ink-1">תצוגת קריאה</b> — עברית/דו-לשוני · ערכת נושא · גודל · רוחב.</li>
              <li><b className="text-ink-1">סרגל &quot;בעמוד זה&quot;</b> — המיקום בפרק; לחיצה מנווטת.</li>
            </ul>
            <div className="mt-4 rounded-xl bg-surface-2 p-3">
              <div className="eyebrow mb-2 text-ink-3">מקשי קיצור</div>
              <div className="grid grid-cols-2 gap-2 text-xs text-ink-2">
                <span className="flex items-center gap-1.5"><kbd className="rounded border border-hairline bg-surface px-1.5 py-0.5 font-mono text-[10px]">F</kbd> מצב מיקוד</span>
                <span className="flex items-center gap-1.5"><kbd className="rounded border border-hairline bg-surface px-1.5 py-0.5 font-mono text-[10px]">C</kbd> תוכן העניינים</span>
                <span className="flex items-center gap-1.5"><kbd className="rounded border border-hairline bg-surface px-1.5 py-0.5 font-mono text-[10px]">Esc</kbd> יציאה ממיקוד</span>
                <span className="flex items-center gap-1.5"><kbd className="rounded border border-hairline bg-surface px-1.5 py-0.5 font-mono text-[10px]">?</kbd> חלון עזרה זה</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
    </PageModeContext.Provider>
    </ReaderViewContext.Provider>
  );
}
