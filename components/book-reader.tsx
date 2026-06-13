"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Search, Bookmark, Check, BookOpen, GraduationCap, ChevronUp, ChevronDown, ListTree, X, PlayCircle, StickyNote } from "lucide-react";
import { useReader } from "@/lib/reader-store";
import { playTick } from "@/lib/sound";

export interface ReaderChapter { n: number; title: string; he?: string }

function jump(n: number) {
  const el = document.querySelector<HTMLElement>(`[data-chapter="${n}"]`);
  if (el) { history.replaceState(null, "", `#ch-${n}`); el.scrollIntoView({ behavior: "smooth", block: "start" }); }
}

export function BookReader({ bookId, title, subtitle, chapters, children }: { bookId: string; title: string; subtitle?: string; chapters: ReaderChapter[]; children: React.ReactNode }) {
  const { read, bm, last, markRead, toggleBm } = useReader(bookId);
  const [active, setActive] = useState<number>(chapters[0]?.n ?? 1);
  const [q, setQ] = useState("");
  const [showContinue, setShowContinue] = useState(false);
  const [notes, setNotes] = useState("");
  const [notesOpen, setNotesOpen] = useState(false);
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => { try { setNotes(localStorage.getItem(`neo:reader:notes:${bookId}`) || ""); } catch { /* noop */ } }, [bookId]);

  const total = chapters.length || 1;
  const score = Math.round((read.length / total) * 100);

  // offer "continue reading" once, if a last chapter exists beyond the first
  useEffect(() => { if (last && last > 1) setShowContinue(true); }, [last]);

  // scroll-spy: track active chapter + mark read when sufficiently visible
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
    return s ? chapters.filter((c) => `${c.n} ${c.title} ${c.he || ""}`.toLowerCase().includes(s)) : chapters;
  }, [q, chapters]);

  const idx = chapters.findIndex((c) => c.n === active);
  const prev = idx > 0 ? chapters[idx - 1] : null;
  const next = idx >= 0 && idx < chapters.length - 1 ? chapters[idx + 1] : null;

  return (
    <div className="grid gap-6 lg:grid-cols-[270px_1fr]">
      {/* ===== sticky chapter tree ===== */}
      <aside className="lg:sticky lg:top-[5rem] lg:h-[calc(100vh-6rem)]">
        <div className="card-premium flex h-full flex-col overflow-hidden p-0">
          {/* header + progress + score */}
          <div className="border-b border-slate-100 p-4">
            <div className="flex items-center gap-2">
              <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-brand to-brand-dark text-white shadow-md"><BookOpen className="size-4.5" /></span>
              <div className="min-w-0"><h2 className="truncate text-sm font-extrabold text-slate-900">{title}</h2>{subtitle && <p className="truncate text-[11px] text-slate-400">{subtitle}</p>}</div>
            </div>
            <div className="mt-3 flex items-center justify-between text-[11px] font-bold">
              <span className="flex items-center gap-1 text-slate-500"><GraduationCap className="size-3.5 text-brand" /> ציון ידע</span>
              <span className="font-mono text-brand">{score}%</span>
            </div>
            <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-slate-100">
              <div className="h-full rounded-full bg-gradient-to-l from-brand to-brand-dark transition-all duration-700" style={{ width: `${score}%` }} />
            </div>
            <p className="mt-1 text-[10px] text-slate-400">{read.length}/{total} פרקים נקראו · {bm.length} סימניות</p>
          </div>
          {/* in-book search */}
          <div className="relative border-b border-slate-100 p-2.5">
            <Search className="pointer-events-none absolute end-4 top-1/2 size-3.5 -translate-y-1/2 text-slate-400" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="חיפוש בתוך הספר…" className="w-full rounded-lg border border-slate-200 bg-white py-1.5 pe-3 ps-8 text-xs outline-none focus:border-brand/40 focus:ring-2 focus:ring-brand/15" />
            {q && <button onClick={() => setQ("")} className="absolute start-4 top-1/2 -translate-y-1/2"><X className="size-3.5 text-slate-400" /></button>}
          </div>
          {/* tree */}
          <nav className="min-h-0 flex-1 overflow-y-auto p-2">
            <div className="eyebrow mb-1 flex items-center gap-1 px-2 text-slate-400"><ListTree className="size-3" /> פרקים</div>
            {filtered.map((c) => {
              const isRead = read.includes(c.n); const isBm = bm.includes(c.n); const isActive = active === c.n;
              return (
                <div key={c.n} className={`group flex items-center gap-1.5 rounded-lg px-2 py-1.5 transition ${isActive ? "bg-brand/10" : "hover:bg-slate-50"}`}>
                  <button onClick={() => { playTick(); jump(c.n); }} className="flex min-w-0 flex-1 items-center gap-2 text-start">
                    <span className={`grid size-5 shrink-0 place-items-center rounded-md text-[10px] font-bold ${isRead ? "bg-emerald-100 text-emerald-600" : isActive ? "bg-brand text-white" : "bg-slate-100 text-slate-400"}`}>{isRead ? <Check className="size-3" /> : c.n}</span>
                    <span className={`truncate text-xs ${isActive ? "font-bold text-slate-900" : "font-medium text-slate-600"}`}>{c.title}</span>
                  </button>
                  <button onClick={() => toggleBm(c.n)} aria-label="סימנייה" className="shrink-0 opacity-0 transition group-hover:opacity-100" style={{ opacity: isBm ? 1 : undefined }}>
                    <Bookmark className={`size-3.5 ${isBm ? "fill-amber-400 text-amber-400" : "text-slate-300"}`} />
                  </button>
                </div>
              );
            })}
            {filtered.length === 0 && <p className="px-2 py-4 text-center text-xs text-slate-400">אין פרק תואם</p>}
          </nav>
          {/* notes */}
          <div className="border-t border-slate-100 p-2.5">
            <button onClick={() => setNotesOpen((v) => !v)} className="flex w-full items-center justify-between rounded-lg px-2 py-1.5 text-xs font-bold text-slate-600 hover:bg-slate-50">
              <span className="flex items-center gap-1.5"><StickyNote className="size-3.5 text-brand" /> הערות הספר</span>
              <ChevronDown className={`size-3.5 transition-transform ${notesOpen ? "rotate-180" : ""}`} />
            </button>
            {notesOpen && (
              <textarea value={notes} onChange={(e) => { setNotes(e.target.value); try { localStorage.setItem(`neo:reader:notes:${bookId}`, e.target.value); } catch { /* noop */ } }}
                placeholder="הערות אישיות על הספר — נשמר בדפדפן…" className="mt-1.5 h-28 w-full resize-none rounded-lg border border-slate-200 bg-white p-2 text-xs outline-none focus:border-brand/40 focus:ring-2 focus:ring-brand/15" />
            )}
          </div>
        </div>
      </aside>

      {/* ===== reading pane ===== */}
      <div ref={mainRef} className="min-w-0">
        {/* continue reading banner */}
        {showContinue && (
          <div className="mb-4 flex items-center justify-between gap-3 rounded-2xl border border-brand/30 bg-brand-soft/50 p-3">
            <span className="flex items-center gap-2 text-sm font-bold text-slate-700"><PlayCircle className="size-5 text-brand" /> המשך קריאה — פרק {last}</span>
            <div className="flex gap-2">
              <button onClick={() => { jump(last); setShowContinue(false); }} className="tap rounded-xl bg-brand px-3.5 py-2 text-xs font-bold text-white shadow-sm hover:bg-brand-dark">המשך</button>
              <button onClick={() => setShowContinue(false)} className="tap rounded-xl px-2 py-2 text-slate-400 hover:bg-slate-100"><X className="size-4" /></button>
            </div>
          </div>
        )}
        {children}
        {/* next / prev */}
        <div className="mt-6 flex items-center justify-between gap-3">
          <button disabled={!prev} onClick={() => prev && jump(prev.n)} className="tap inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-700 shadow-sm transition enabled:hover:border-brand enabled:hover:text-brand disabled:opacity-40">
            <ChevronUp className="size-4" /> {prev ? `פרק ${prev.n}` : "התחלה"}
          </button>
          <span className="text-xs font-bold text-slate-400">פרק {active} / {total}</span>
          <button disabled={!next} onClick={() => next && jump(next.n)} className="tap inline-flex items-center gap-2 rounded-xl bg-brand px-4 py-2.5 text-sm font-bold text-white shadow-sm transition enabled:hover:bg-brand-dark disabled:opacity-40">
            {next ? `פרק ${next.n}` : "סוף"} <ChevronDown className="size-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
