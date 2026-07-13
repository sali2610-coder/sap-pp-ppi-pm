"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Search, Bookmark, Check, BookOpen, GraduationCap, ChevronUp, ChevronDown, ListTree, X, PlayCircle, StickyNote, Clock, FileText, Languages, Layers3, ArrowLeft, Sparkles, CheckCircle2, Maximize2, Minimize2, Home, Library, AlignLeft, Settings2, StretchHorizontal, RotateCcw, HelpCircle, AlertTriangle } from "lucide-react";
import { useReader } from "@/lib/reader-store";
import { LIBRARY } from "@/data/library";
import { writeContinuity, readContinuity, resolveReaderView, saveReaderView, clearContinuityFor, type ReaderView } from "@/lib/continuity-store";
import { ReaderViewContext } from "@/lib/reader-view";
import { BookCover } from "@/components/book-cover";
import { playTick } from "@/lib/sound";

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
function jump(n: number) {
  const el = document.querySelector<HTMLElement>(`[data-chapter="${n}"]`);
  if (el) { history.replaceState(null, "", `#ch-${n}`); el.scrollIntoView({ behavior: "smooth", block: "start" }); flash(el); }
}
function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (el) { el.scrollIntoView({ behavior: "smooth", block: "start" }); flash(el); }
}

type RTheme = "original" | "sepia" | "night";
type RSize = "sm" | "md" | "lg";

/* Reader display settings — theme / type-size / measure. Scoped to the reading
   pane only (never a global dark mode). Reused in the landing CTA + focus bar. */
function ReaderSettings({ view, setView, theme, setTheme, size, setSize, wide, toggleWide, accent, onReset }: { view: ReaderView; setView: (v: ReaderView) => void; theme: RTheme; setTheme: (t: RTheme) => void; size: RSize; setSize: (s: RSize) => void; wide: boolean; toggleWide: () => void; accent: string; onReset: () => void }) {
  const [open, setOpen] = useState(false);
  const themes: [RTheme, string, string, string][] = [["original", "מקור", "#ffffff", "#0b0c0e"], ["sepia", "ספיה", "#f6efe1", "#2b2620"], ["night", "לילה", "#14181f", "#e8ecf1"]];
  const sizes: [RSize, number][] = [["sm", 12], ["md", 15], ["lg", 19]];
  const views: [ReaderView, string, string][] = [["hebrew", "עברית", "טור קריאה יחיד"], ["bilingual", "דו-לשוני", "אנגלית ‖ עברית"]];
  return (
    <div className="relative">
      <button onClick={() => setOpen((o) => !o)} aria-expanded={open} className="inline-flex items-center gap-2 rounded-2xl border border-hairline bg-surface px-4 py-2.5 text-sm font-bold text-ink-2 shadow-sm transition hover:border-brand/40 active:scale-95"><Settings2 className="size-4" /> תצוגת קריאה</button>
      {open && (
        <>
          <button className="fixed inset-0 z-40 cursor-default" aria-label="סגור" onClick={() => setOpen(false)} />
          <div className="absolute end-0 z-50 mt-2 w-64 rounded-2xl border border-hairline bg-surface p-3 text-ink-1 shadow-xl">
            <div className="eyebrow mb-1.5 text-ink-3">מצב קריאה</div>
            <div className="grid grid-cols-2 gap-1.5">
              {views.map(([k, label, sub]) => (
                <button key={k} onClick={() => setView(k)} className="rounded-xl border-2 px-2 py-1.5 text-start transition" style={{ borderColor: view === k ? accent : "var(--hairline)" }}>
                  <span className="block text-[12px] font-extrabold text-ink-1">{label}</span>
                  <span className="block text-[9.5px] font-semibold text-ink-3">{sub}</span>
                </button>
              ))}
            </div>
            <div className="eyebrow mb-1.5 mt-3 text-ink-3">ערכת נושא</div>
            <div className="grid grid-cols-3 gap-1.5">
              {themes.map(([k, label, bg, fg]) => (
                <button key={k} onClick={() => setTheme(k)} className="flex flex-col items-center gap-1 rounded-xl border-2 p-1.5 text-[11px] font-bold transition" style={{ borderColor: theme === k ? accent : "var(--hairline)" }}>
                  <span className="grid h-7 w-full place-items-center rounded-md text-[11px] font-black" style={{ background: bg, color: fg }}>Aa</span>
                  {label}
                </button>
              ))}
            </div>
            <div className="eyebrow mb-1.5 mt-3 text-ink-3">גודל טקסט</div>
            <div className="flex items-stretch gap-1.5">
              {sizes.map(([k, fs]) => (
                <button key={k} onClick={() => setSize(k)} className="flex-1 rounded-xl border py-1.5 font-black leading-none transition" style={{ borderColor: size === k ? accent : "var(--hairline)", color: size === k ? accent : "var(--ink-2)", fontSize: `${fs}px` }}>A</button>
              ))}
            </div>
            <button onClick={toggleWide} role="switch" aria-checked={wide} aria-label="רוחב קריאה מלא" title="הרחב את טור הקריאה לטבלאות ותרשימים גדולים" className="mt-3 flex w-full items-center justify-between rounded-xl border border-hairline px-3 py-2 text-xs font-bold text-ink-2 transition hover:border-brand/40">
              <span className="flex items-center gap-1.5"><StretchHorizontal className="size-3.5" /> רוחב מלא</span>
              <span className="relative h-4 w-7 rounded-full transition-colors" style={{ background: wide ? accent : "var(--surface-2)" }}><span className="absolute top-0.5 size-3 rounded-full bg-white shadow transition-all" style={{ insetInlineStart: wide ? "0.125rem" : "auto", insetInlineEnd: wide ? "auto" : "0.125rem" }} /></span>
            </button>
            {/* reset — deliberately quiet, at the foot of the menu */}
            <button onClick={() => { setOpen(false); onReset(); }} title="נקה פרק, מיקום וגלילה עבור ספר זה" className="mt-3 flex w-full items-center gap-1.5 rounded-xl px-3 py-2 text-[11px] font-bold text-ink-3 transition hover:bg-surface-2 hover:text-brand">
              <RotateCcw className="size-3.5" /> אפס התקדמות קריאה
            </button>
          </div>
        </>
      )}
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
  const [focus, setFocus] = useState(false);
  const [prog, setProg] = useState(0);
  const mainRef = useRef<HTMLDivElement>(null);
  // "בעמוד זה" scroll-spy — section anchors discovered from the rendered book DOM
  const [secs, setSecs] = useState<{ id: string; title: string; chapter: number }[]>([]);
  const [activeSec, setActiveSec] = useState<string>("");
  const activeRef = useRef(active);
  const activeSecRef = useRef(activeSec);
  useEffect(() => { activeRef.current = active; }, [active]);
  useEffect(() => { activeSecRef.current = activeSec; }, [activeSec]);

  // reader display prefs (theme / type-size / measure) — scoped to the pane
  const [rtheme, setRtheme] = useState<RTheme>("original");
  const [rsize, setRsize] = useState<RSize>("md");
  const [rwide, setRwide] = useState(false);
  useEffect(() => {
    try {
      const t = localStorage.getItem("neo:reader:theme"); if (t === "sepia" || t === "night" || t === "original") setRtheme(t);
      const s = localStorage.getItem("neo:reader:size"); if (s === "sm" || s === "lg" || s === "md") setRsize(s);
      setRwide(localStorage.getItem("neo:reader:wide") === "1");
    } catch { /* noop */ }
  }, []);
  const saveTheme = useCallback((t: RTheme) => { setRtheme(t); try { localStorage.setItem("neo:reader:theme", t); } catch { /* noop */ } }, []);
  const saveSize = useCallback((s: RSize) => { setRsize(s); try { localStorage.setItem("neo:reader:size", s); } catch { /* noop */ } }, []);
  const toggleWide = useCallback(() => setRwide((v) => { const n = !v; try { localStorage.setItem("neo:reader:wide", n ? "1" : "0"); } catch { /* noop */ } return n; }), []);
  // reading view — device-adaptive default (desktop→bilingual, mobile→hebrew), remembered
  const [rview, setRview] = useState<ReaderView>("bilingual");
  useEffect(() => { setRview(resolveReaderView()); }, []);
  const saveView = useCallback((v: ReaderView) => { setRview(v); saveReaderView(v); }, []);

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
    <div className="space-y-6 sm:space-y-8">
      {/* fixed linear reading-progress rail (module-colored) */}
      <div className="pointer-events-none fixed inset-x-0 top-0 z-[55] h-[3px] bg-transparent" aria-hidden>
        <div className="h-full origin-right transition-transform duration-150 ease-out" style={{ transform: `scaleX(${prog / 100})`, background: `linear-gradient(90deg, ${c}, ${c}aa)` }} />
      </div>

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
      <motion.section initial={reduce ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: [0.2, 0.7, 0.2, 1] }}
        className={`relative overflow-hidden rounded-[1.75rem] border border-hairline bg-surface shadow-[0_18px_48px_-26px_rgba(15,23,42,0.45)] ${focus ? "hidden" : ""}`}>
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
            {derivedMod && <span className="rounded-md px-2 py-0.5 text-[10px] font-extrabold text-white" style={{ background: c }}>{derivedMod}</span>}
            {meta?.publisher && meta.publisher !== bookType(meta.publisher) && <span className="text-[11.5px] font-semibold text-ink-3">{meta.publisher}</span>}
          </div>
          <h1 className="mt-3 max-w-3xl font-display text-2xl leading-tight tracking-tight text-ink-1 sm:text-[2rem]">{meta ? meta.titleHe : title}</h1>
          {subtitle && !meta && <p className="mt-1 text-sm text-ink-3">{subtitle}</p>}
          {(meta?.summaryHe || note) && <p className="mt-2 max-w-2xl text-[13.5px] leading-relaxed text-ink-2 sm:text-sm">{meta?.summaryHe || note}</p>}

          <div className="mt-4 flex flex-wrap items-center gap-2">
            {meta?.pages && <MetaChip icon={<FileText className="size-3.5 text-ink-3" />}>{meta.pages} עמ׳</MetaChip>}
            <MetaChip icon={<Layers3 className="size-3.5 text-ink-3" />}>{total} פרקים</MetaChip>
            {readMin && <MetaChip icon={<Clock className="size-3.5 text-ink-3" />}>≈ {readMin} ש׳ קריאה</MetaChip>}
            <MetaChip icon={<Languages className="size-3.5 text-ink-3" />}>EN · HE</MetaChip>
            <MetaChip icon={<GraduationCap className="size-3.5" style={{ color: c }} />}>{score}% נקרא</MetaChip>
            {bm.length > 0 && <MetaChip icon={<Bookmark className="size-3.5 fill-amber-400 text-amber-400" />}>{bm.length} סימניות</MetaChip>}
            {stats?.map((s, i) => <MetaChip key={i} icon={<Check className="size-3.5 text-ink-3" />}>{s.value} {s.label}</MetaChip>)}
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
                <button onClick={resumeExact} aria-label={`המשך קריאה מהמקום האחרון${last ? `, פרק ${last}` : ""}`} title="חזרה למקום המדויק שבו הפסקת" className="group inline-flex items-center gap-2 rounded-2xl px-5 py-2.5 text-sm font-extrabold text-white shadow-sm transition hover:brightness-110 active:scale-95" style={{ background: c }}>
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
            <button onClick={() => scrollToId("book-contents")} aria-label="עיין בתוכן העניינים של הספר" title="קפוץ לתוכן העניינים (מקש C)" className="inline-flex items-center gap-2 rounded-2xl border border-hairline bg-surface px-4 py-2.5 text-sm font-bold text-ink-2 shadow-sm transition hover:border-brand/40 active:scale-95"><ListTree className="size-4" /> עיין בתוכן</button>
            <button onClick={toggleFocus} aria-pressed={focus} aria-label="מצב קריאה מרוכז" title="הסתר הכל מלבד הטקסט (מקש F · Esc ליציאה)" className="inline-flex items-center gap-2 rounded-2xl border border-hairline bg-surface px-4 py-2.5 text-sm font-bold text-ink-2 shadow-sm transition hover:border-brand/40 active:scale-95"><Maximize2 className="size-4" /> מצב מיקוד</button>
            <ReaderSettings view={rview} setView={saveView} theme={rtheme} setTheme={saveTheme} size={rsize} setSize={saveSize} wide={rwide} toggleWide={toggleWide} accent={c} onReset={() => setConfirmReset(true)} />
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
      </motion.section>

      {/* ===================== PREMIUM CHAPTER CARDS (Table of Contents) ===================== */}
      <section id="book-contents" className={`scroll-mt-24 space-y-3 ${focus ? "hidden" : ""}`}>
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
      <div className={focus ? "block" : "grid gap-6 lg:grid-cols-[248px_minmax(0,1fr)] xl:grid-cols-[248px_minmax(0,1fr)_236px]"}>
        {/* ===== sticky chapter tree ===== */}
        <aside className={`lg:sticky lg:top-[5rem] lg:h-[calc(100vh-6rem)] ${focus ? "hidden" : ""}`}>
          <div className="card-premium flex h-full flex-col overflow-hidden p-0">
            {/* header + progress + score */}
            <div className="border-b border-hairline p-4">
              <div className="flex items-center gap-2">
                <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-brand to-brand-dark text-white shadow-md"><BookOpen className="size-4.5" /></span>
                <div className="min-w-0"><h2 className="truncate text-sm font-extrabold text-ink-1">{title}</h2>{subtitle && <p className="truncate text-[11px] text-ink-3">{subtitle}</p>}</div>
              </div>
              <div className="mt-3 flex items-center justify-between text-[11px] font-bold">
                <span className="flex items-center gap-1 text-ink-3"><GraduationCap className="size-3.5 text-brand" /> ציון ידע</span>
                <span className="font-mono text-brand">{score}%</span>
              </div>
              <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-surface-2">
                <div className="h-full rounded-full bg-gradient-to-l from-brand to-brand-dark transition-all duration-700" style={{ width: `${score}%` }} />
              </div>
              <p className="mt-1 text-[10px] text-ink-3">{read.length}/{total} פרקים נקראו · {bm.length} סימניות</p>
            </div>
            {/* in-book search */}
            <div className="relative border-b border-hairline p-2.5">
              <Search className="pointer-events-none absolute end-4 top-1/2 size-3.5 -translate-y-1/2 text-ink-3" />
              <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="חיפוש בתוך הספר…" className="w-full rounded-lg border border-hairline bg-surface py-1.5 pe-3 ps-8 text-xs outline-none focus:border-brand/40 focus:ring-2 focus:ring-brand/15" />
              {q && <button onClick={() => setQ("")} className="absolute start-4 top-1/2 -translate-y-1/2"><X className="size-3.5 text-ink-3" /></button>}
            </div>
            {/* tree */}
            <nav className="min-h-0 flex-1 overflow-y-auto p-2">
              <div className="eyebrow mb-1 flex items-center gap-1 px-2 text-ink-3"><ListTree className="size-3" /> פרקים</div>
              {filtered.map((ch) => {
                const isRead = read.includes(ch.n); const isBm = bm.includes(ch.n); const isActive = active === ch.n;
                return (
                  <div key={ch.n} className={`group flex items-center gap-1.5 rounded-lg px-2 py-1.5 transition ${isActive ? "bg-brand/10" : "hover:bg-surface-2"}`}>
                    <button onClick={() => { playTick(); jump(ch.n); }} className="flex min-w-0 flex-1 items-center gap-2 text-start">
                      <span className={`grid size-5 shrink-0 place-items-center rounded-md text-[10px] font-bold ${isRead ? "bg-emerald-100 text-emerald-600" : isActive ? "bg-brand text-white" : "bg-surface-2 text-ink-3"}`}>{isRead ? <Check className="size-3" /> : ch.n}</span>
                      <span className={`truncate text-xs ${isActive ? "font-bold text-ink-1" : "font-medium text-ink-2"}`}>{ch.title}</span>
                    </button>
                    <button onClick={() => toggleBm(ch.n)} aria-label="סימנייה" className="shrink-0 opacity-0 transition group-hover:opacity-100" style={{ opacity: isBm ? 1 : undefined }}>
                      <Bookmark className={`size-3.5 ${isBm ? "fill-amber-400 text-amber-400" : "text-ink-3"}`} />
                    </button>
                  </div>
                );
              })}
              {filtered.length === 0 && <p className="px-2 py-4 text-center text-xs text-ink-3">אין פרק תואם</p>}
            </nav>
            {/* notes */}
            <div className="border-t border-hairline p-2.5">
              <button onClick={() => setNotesOpen((v) => !v)} className="flex w-full items-center justify-between rounded-lg px-2 py-1.5 text-xs font-bold text-ink-2 hover:bg-surface-2">
                <span className="flex items-center gap-1.5"><StickyNote className="size-3.5 text-brand" /> הערות הספר</span>
                <ChevronDown className={`size-3.5 transition-transform ${notesOpen ? "rotate-180" : ""}`} />
              </button>
              {notesOpen && (
                <textarea value={notes} onChange={(e) => { setNotes(e.target.value); try { localStorage.setItem(`neo:reader:notes:${bookId}`, e.target.value); } catch { /* noop */ } }}
                  placeholder="הערות אישיות על הספר — נשמר בדפדפן…" className="mt-1.5 h-28 w-full resize-none rounded-lg border border-hairline bg-surface p-2 text-xs outline-none focus:border-brand/40 focus:ring-2 focus:ring-brand/15" />
              )}
            </div>
          </div>
        </aside>

        {/* ===== reading pane ===== */}
        <div ref={mainRef} data-theme={rtheme} data-size={rsize} data-wide={rwide ? "1" : "0"} data-view={rview} className={`neo-reader neo-pane reader-enter min-w-0 ${focus ? "mx-auto max-w-3xl" : "mx-auto w-full"}`}>
          {children}
          {/* next / prev */}
          <div className="mt-6 flex items-center justify-between gap-3">
            <button disabled={!prev} onClick={() => prev && jump(prev.n)} className="tap inline-flex items-center gap-2 rounded-xl border border-hairline bg-surface px-4 py-2.5 text-sm font-bold text-ink-2 shadow-sm transition enabled:hover:border-brand enabled:hover:text-brand disabled:opacity-40">
              <ChevronUp className="size-4" /> {prev ? `פרק ${prev.n}` : "התחלה"}
            </button>
            <span className="text-xs font-bold text-ink-3">פרק {active} / {total}</span>
            <button disabled={!next} onClick={() => next && jump(next.n)} className="tap inline-flex items-center gap-2 rounded-xl bg-brand px-4 py-2.5 text-sm font-bold text-white shadow-sm transition enabled:hover:bg-brand-dark disabled:opacity-40">
              {next ? `פרק ${next.n}` : "סוף"} <ChevronDown className="size-4" />
            </button>
          </div>
        </div>

        {/* ===== "בעמוד זה" — on-this-page scroll-spy rail (xl+, docs-grade) ===== */}
        {!focus && (
          <aside className="hidden xl:block">
            <div className="sticky top-[5rem] max-h-[calc(100vh-6rem)] overflow-y-auto pb-4">
              <div className="mb-2.5 flex items-center justify-between pe-1">
                <span className="flex items-center gap-1.5 text-[10.5px] font-extrabold uppercase tracking-[0.16em] text-ink-3"><AlignLeft className="size-3.5" /> בעמוד זה</span>
                <span className="font-mono text-[11px] font-bold tabular-nums" style={{ color: c }}>{Math.round(prog)}%</span>
              </div>
              <nav className="relative border-s border-hairline" aria-label="בעמוד זה">
                {chapters.map((ch) => {
                  const on = active === ch.n;
                  const chSecs = secs.filter((s) => s.chapter === ch.n);
                  return (
                    <div key={ch.n}>
                      <button onClick={() => { playTick(); jump(ch.n); }} className="group relative -ms-px flex w-full items-center border-s-2 py-[5px] ps-3 text-start transition-colors" style={{ borderColor: on ? c : "transparent" }}>
                        <span className={`truncate text-[12px] leading-snug transition-colors ${on ? "font-extrabold text-ink-1" : "font-medium text-ink-3 group-hover:text-ink-1"}`}>{ch.n}. {ch.title}</span>
                      </button>
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
              <button onClick={() => doReset(resetNotesToo)} className="tap rounded-xl bg-brand px-4 py-2 text-sm font-bold text-white hover:bg-brand-dark">אפס התקדמות</button>
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
    </ReaderViewContext.Provider>
  );
}
