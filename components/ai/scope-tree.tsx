"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { BookOpen, ChevronLeft, Loader2, Search, X } from "lucide-react";
import { BOOKS, cachedTree, loadTree } from "@/lib/ai/tree";
import type { BookTree, Scope } from "@/lib/ai/types";

/**
 * Book -> chapter -> section navigator.
 *
 * Selecting a node narrows what the AI may read. The tree is the scope control,
 * not decoration, so the current selection stays visible at every depth.
 *
 * Chapters load only when a book is expanded (book7 alone is 1,689 sections),
 * and long section lists are windowed rather than rendered whole.
 */
export function ScopeTree({ scope, onScope, onNavigate }: {
  scope: Scope;
  onScope: (s: Scope) => void;
  onNavigate?: () => void;
}) {
  const [openBook, setOpenBook] = useState<string | null>(scope.bookId ?? null);
  const [openChapter, setOpenChapter] = useState<number | null>(scope.chapter ?? null);
  const [tree, setTree] = useState<BookTree | null>(null);
  const [loading, setLoading] = useState(false);
  const [q, setQ] = useState("");

  useEffect(() => {
    if (!openBook) { setTree(null); return; }
    const hit = cachedTree(openBook);
    if (hit) { setTree(hit); return; }
    setLoading(true);
    let alive = true;
    loadTree(openBook).then((t) => { if (alive) { setTree(t); setLoading(false); } });
    return () => { alive = false; };
  }, [openBook]);

  function toggleBook(id: string) {
    const next = openBook === id ? null : id;
    setOpenBook(next);
    setOpenChapter(null);
    onScope(next ? { bookId: next } : {});
  }

  function toggleChapter(n: number) {
    const next = openChapter === n ? null : n;
    setOpenChapter(next);
    onScope(next == null ? { bookId: openBook! } : { bookId: openBook!, chapter: n });
  }

  function chooseSection(n: number, id: string) {
    const same = scope.section === id && scope.chapter === n;
    onScope(same ? { bookId: openBook!, chapter: n } : { bookId: openBook!, chapter: n, section: id });
    onNavigate?.();
  }

  // Filtering searches the open book's sections; with no book open it filters
  // the book list, so one field serves both levels without a mode switch.
  const needle = q.trim().toLowerCase();
  const books = useMemo(
    () => (needle && !openBook ? BOOKS.filter((b) => `${b.title} ${b.module}`.toLowerCase().includes(needle)) : BOOKS),
    [needle, openBook],
  );
  const chapters = useMemo(() => {
    if (!tree) return [];
    if (!needle) return tree.chapters;
    return tree.chapters
      .map((c) => ({ ...c, sections: c.sections.filter((s) => `${s.t} ${s.en} ${s.id}`.toLowerCase().includes(needle)) }))
      .filter((c) => c.sections.length > 0);
  }, [tree, needle]);

  return (
    <div className="flex h-full flex-col">
      <div className="border-b border-hairline p-3">
        <div className="relative">
          <Search className="pointer-events-none absolute start-2.5 top-1/2 size-3.5 -translate-y-1/2 text-ink-3" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={openBook ? "חיפוש בפרקים…" : "חיפוש ספר…"}
            className="w-full rounded-xl border border-hairline bg-surface-2 py-2 pe-8 ps-8 text-[12.5px] text-ink-1 outline-none transition placeholder:text-ink-3 focus:border-brand/40 focus:bg-surface"
          />
          {q && (
            <button onClick={() => setQ("")} aria-label="נקה חיפוש"
              className="absolute end-2 top-1/2 -translate-y-1/2 text-ink-3 hover:text-ink-1">
              <X className="size-3.5" />
            </button>
          )}
        </div>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto p-2">
        <button
          onClick={() => { setOpenBook(null); setOpenChapter(null); onScope({}); }}
          className={`mb-1 flex w-full items-center gap-2 rounded-xl px-2.5 py-2 text-[12.5px] font-semibold transition ${
            !scope.bookId ? "bg-brand-soft text-brand" : "text-ink-2 hover:bg-surface-2"}`}>
          <BookOpen className="size-3.5" />
          כל הספרייה
          <span className="ms-auto text-[10.5px] font-normal text-ink-3">11 ספרים</span>
        </button>

        {books.map((b) => {
          const open = openBook === b.id;
          const active = scope.bookId === b.id && scope.chapter == null;
          return (
            <div key={b.id} className="mb-0.5">
              <button
                onClick={() => toggleBook(b.id)}
                aria-expanded={open}
                className={`flex w-full items-start gap-2 rounded-xl px-2.5 py-2 text-start transition ${
                  active ? "bg-brand-soft" : "hover:bg-surface-2"}`}>
                <ChevronLeft className={`mt-0.5 size-3.5 shrink-0 text-ink-3 transition-transform duration-200 ${open ? "-rotate-90" : ""}`} />
                <span className="min-w-0 flex-1">
                  <span dir="auto" className={`block truncate text-[12.5px] font-semibold ${active ? "text-brand" : "text-ink-1"}`}>{b.title}</span>
                  <span className="mt-0.5 block text-[10.5px] text-ink-3">{b.module} · {b.chapters} פרקים · {b.sections} סעיפים</span>
                </span>
              </button>

              {open && (
                <div className="ms-3 mt-0.5 border-s border-hairline ps-2">
                  {loading && (
                    <div className="flex items-center gap-2 px-2 py-2 text-[11.5px] text-ink-3">
                      <Loader2 className="size-3.5 animate-spin" /> טוען פרקים…
                    </div>
                  )}
                  {!loading && chapters.length === 0 && (
                    <div className="px-2 py-2 text-[11.5px] text-ink-3">לא נמצאו תוצאות</div>
                  )}
                  {chapters.map((c) => {
                    const cOpen = openChapter === c.n;
                    const cActive = scope.chapter === c.n && !scope.section;
                    return (
                      <div key={c.n}>
                        <button
                          onClick={() => toggleChapter(c.n)}
                          aria-expanded={cOpen}
                          className={`flex w-full items-start gap-1.5 rounded-lg px-2 py-1.5 text-start transition ${
                            cActive ? "bg-brand-soft" : "hover:bg-surface-2"}`}>
                          <ChevronLeft className={`mt-0.5 size-3 shrink-0 text-ink-3 transition-transform duration-200 ${cOpen ? "-rotate-90" : ""}`} />
                          <span className="min-w-0 flex-1">
                            <span dir="auto" className={`block truncate text-[12px] ${cActive ? "font-semibold text-brand" : "text-ink-2"}`}>
                              פרק {c.n} · {c.t}
                            </span>
                          </span>
                        </button>

                        {cOpen && (
                          <SectionList
                            sections={c.sections}
                            activeId={scope.chapter === c.n ? scope.section : undefined}
                            onPick={(id) => chooseSection(c.n, id)}
                          />
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/**
 * Windowed section list. Book 7 has chapters with hundreds of sections; render
 * a slice and grow it on demand rather than mounting them all.
 */
function SectionList({ sections, activeId, onPick }: {
  sections: { id: string; t: string }[];
  activeId?: string;
  onPick: (id: string) => void;
}) {
  const STEP = 40;
  const [limit, setLimit] = useState(STEP);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => { setLimit(STEP); }, [sections]);

  const shown = sections.slice(0, limit);
  return (
    <div ref={ref} className="ms-3 border-s border-hairline ps-2">
      {shown.map((s) => {
        const active = activeId === s.id;
        return (
          <button
            key={s.id}
            onClick={() => onPick(s.id)}
            className={`flex w-full items-baseline gap-1.5 rounded-lg px-2 py-1 text-start transition ${
              active ? "bg-brand text-white" : "hover:bg-surface-2"}`}>
            <span className={`shrink-0 font-mono text-[10px] ${active ? "text-white/80" : "text-ink-3"}`}>{s.id}</span>
            <span dir="auto" className={`truncate text-[11.5px] ${active ? "text-white" : "text-ink-2"}`}>{s.t}</span>
          </button>
        );
      })}
      {sections.length > limit && (
        <button onClick={() => setLimit((l) => l + STEP * 3)}
          className="mt-0.5 w-full rounded-lg px-2 py-1.5 text-[11px] font-semibold text-brand transition hover:bg-brand-soft">
          עוד {Math.min(STEP * 3, sections.length - limit)} סעיפים ({sections.length - limit} נותרו)
        </button>
      )}
    </div>
  );
}
