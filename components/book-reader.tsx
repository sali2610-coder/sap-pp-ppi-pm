"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Search, Bookmark, Check, BookOpen, GraduationCap, ChevronUp, ChevronDown, ListTree, X, PlayCircle, StickyNote, Clock, FileText, Languages, Layers3, ArrowLeft, Sparkles, CheckCircle2, Maximize2, Minimize2, Home, Library } from "lucide-react";
import { useReader } from "@/lib/reader-store";
import { LIBRARY } from "@/data/library";
import { playTick } from "@/lib/sound";

export interface ReaderChapter { n: number; title: string; he?: string }
export interface ReaderStat { label: string; value: React.ReactNode }

/* module identity palette (matches the Library) — gives each book its own accent */
const MOD_COLOR: Record<string, string> = { PP: "#d62027", PM: "#f97316", "PP-PI": "#6d28d9", QM: "#059669", MM: "#d97706", WM: "#7c3aed", IBP: "#0891b2", Fiori: "#db2777", Foundation: "#475569" };
const mc = (m?: string) => (m && MOD_COLOR[m]) || "#64748b";
/* reader route (book1..11) → LIBRARY id, so the landing can pull real metadata */
const LIB_BY_BOOK: Record<string, string> = { book1: "config-pm", book2: "production-planning", book3: "sourcing-procurement", book4: "pp-ds", book5: "quality-management", book6: "warehouse-management", book7: "fiori-apps", book9: "pm-business-user", book10: "ibp-sop", book11: "s4-foundation" };
const bookType = (pub?: string) => (pub === "SAP PRESS" ? "SAP PRESS" : pub === "ZaranTech" ? "ZaranTech" : "Reference Guide");

function jump(n: number) {
  const el = document.querySelector<HTMLElement>(`[data-chapter="${n}"]`);
  if (el) { history.replaceState(null, "", `#ch-${n}`); el.scrollIntoView({ behavior: "smooth", block: "start" }); }
}
function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function BookReader({ bookId, title, subtitle, chapters, note, stats, children }: { bookId: string; title: string; subtitle?: string; chapters: ReaderChapter[]; note?: string; stats?: ReaderStat[]; children: React.ReactNode }) {
  const { read, bm, last, markRead, toggleBm } = useReader(bookId);
  const reduce = useReducedMotion();
  const [active, setActive] = useState<number>(chapters[0]?.n ?? 1);
  const [q, setQ] = useState("");
  const [showContinue, setShowContinue] = useState(false);
  const [notes, setNotes] = useState("");
  const [notesOpen, setNotesOpen] = useState(false);
  const [focus, setFocus] = useState(false);
  const [prog, setProg] = useState(0);
  const mainRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => { if (last && last > 1) setShowContinue(true); }, [last]);

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
        <div className="relative p-6 sm:p-8">
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
                <button onClick={() => jump(last || first)} className="group inline-flex items-center gap-2 rounded-2xl px-5 py-2.5 text-sm font-extrabold text-white shadow-sm transition hover:brightness-110 active:scale-95" style={{ background: c }}>
                  <PlayCircle className="size-4.5" /> המשך קריאה{last ? ` · פרק ${last}` : ""}
                  <span className="grid size-6 place-items-center rounded-full bg-white/20 transition group-hover:translate-x-0.5"><ArrowLeft className="size-3.5" /></span>
                </button>
                <button onClick={() => jump(first)} className="inline-flex items-center gap-2 rounded-2xl border border-hairline bg-surface px-4 py-2.5 text-sm font-bold text-ink-2 shadow-sm transition hover:border-brand/40 active:scale-95"><BookOpen className="size-4" /> התחל מהתחלה</button>
              </>
            ) : (
              <button onClick={() => jump(first)} className="group inline-flex items-center gap-2 rounded-2xl px-5 py-2.5 text-sm font-extrabold text-white shadow-sm transition hover:brightness-110 active:scale-95" style={{ background: c }}>
                <BookOpen className="size-4.5" /> התחל לקרוא
                <span className="grid size-6 place-items-center rounded-full bg-white/20 transition group-hover:translate-x-0.5"><ArrowLeft className="size-3.5" /></span>
              </button>
            )}
            <button onClick={() => scrollToId("book-contents")} className="inline-flex items-center gap-2 rounded-2xl border border-hairline bg-surface px-4 py-2.5 text-sm font-bold text-ink-2 shadow-sm transition hover:border-brand/40 active:scale-95"><ListTree className="size-4" /> עיין בתוכן</button>
            <button onClick={toggleFocus} className="inline-flex items-center gap-2 rounded-2xl border border-hairline bg-surface px-4 py-2.5 text-sm font-bold text-ink-2 shadow-sm transition hover:border-brand/40 active:scale-95" title="מצב קריאה מרוכז (Esc ליציאה)"><Maximize2 className="size-4" /> מצב מיקוד</button>
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
      <div className={focus ? "block" : "grid gap-6 lg:grid-cols-[270px_1fr]"}>
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
        <div ref={mainRef} className={`neo-reader min-w-0 ${focus ? "mx-auto max-w-3xl" : ""}`}>
          {/* continue reading banner */}
          {showContinue && (
            <div className="mb-4 flex items-center justify-between gap-3 rounded-2xl border border-brand/30 bg-brand-soft/50 p-3">
              <span className="flex items-center gap-2 text-sm font-bold text-ink-2"><PlayCircle className="size-5 text-brand" /> המשך קריאה — פרק {last}</span>
              <div className="flex gap-2">
                <button onClick={() => { jump(last); setShowContinue(false); }} className="tap rounded-xl bg-brand px-3.5 py-2 text-xs font-bold text-white shadow-sm hover:bg-brand-dark">המשך</button>
                <button onClick={() => setShowContinue(false)} className="tap rounded-xl px-2 py-2 text-ink-3 hover:bg-surface-2"><X className="size-4" /></button>
              </div>
            </div>
          )}
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
      </div>
    </div>
  );
}
