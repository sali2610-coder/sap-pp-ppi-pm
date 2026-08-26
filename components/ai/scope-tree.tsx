"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { badgesFor, readingTime, metricsSummary } from "@/lib/ai/node-badges";
import { BookOpen, ChevronLeft, Loader2, Search, X } from "lucide-react";
import { BOOKS, cachedTree, loadTree } from "@/lib/ai/tree";
import type { BookTree, Scope, TreeSection } from "@/lib/ai/types";

/**
 * Book -> chapter -> section navigator.
 *
 * Selecting a node narrows what the AI may read. The tree is the scope control,
 * not decoration, so the current selection stays visible at every depth.
 *
 * Chapters load only when a book is expanded (book7 alone is 1,689 sections),
 * and long section lists are windowed rather than rendered whole.
 */
/**
 * Expanded state survives a reload. Navigation you have to rebuild every visit
 * is navigation you stop using — the same reason an editor remembers its tree.
 * Ids only, capped, and nothing about content.
 */
const OPEN_KEY = "neo:tree-open";
const MAX_OPEN = 120;

function loadOpen(): Set<string> {
  if (typeof window === "undefined") return new Set();
  try {
    const raw = window.localStorage.getItem(OPEN_KEY);
    const arr = raw ? JSON.parse(raw) : [];
    return new Set(Array.isArray(arr) ? arr.filter((x) => typeof x === "string") : []);
  } catch { return new Set(); }
}

function saveOpen(set: Set<string>) {
  if (typeof window === "undefined") return;
  try { window.localStorage.setItem(OPEN_KEY, JSON.stringify([...set].slice(0, MAX_OPEN))); }
  catch { /* full or blocked; expansion is a convenience, not state we owe */ }
}

/** Every ancestor id of a section: 1.2.3 -> ["1", "1.2"]. */
function ancestorsOf(sectionId: string): string[] {
  const parts = String(sectionId).split(".");
  return parts.slice(0, -1).map((_, i) => parts.slice(0, i + 1).join("."));
}

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
  const [open, setOpenSet] = useState<Set<string>>(() => new Set());
  const listRef = useRef<HTMLDivElement>(null);

  // Restore on mount only. Reading storage during render would differ between
  // server and client and break hydration.
  useEffect(() => { setOpenSet(loadOpen()); }, []);

  const isOpen = useCallback((id: string) => open.has(id), [open]);
  const toggleNode = useCallback((id: string) => {
    setOpenSet((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      saveOpen(next);
      return next;
    });
  }, []);

  // The path to the current section is always expanded, so a scope set from a
  // citation or a restored session is visible rather than buried.
  useEffect(() => {
    if (!scope.section) return;
    setOpenSet((prev) => {
      const next = new Set(prev);
      let changed = false;
      for (const a of ancestorsOf(scope.section!)) if (!next.has(a)) { next.add(a); changed = true; }
      if (changed) saveOpen(next);
      return changed ? next : prev;
    });
  }, [scope.section]);

  /**
   * Arrow-key navigation across the visible rows, the way a file tree behaves.
   * Only rows that are actually rendered participate, so collapsed subtrees are
   * skipped without bookkeeping.
   */
  const onKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (!["ArrowDown", "ArrowUp", "Home", "End"].includes(e.key)) return;
    const items = Array.from(listRef.current?.querySelectorAll<HTMLElement>("[data-tree-item]") ?? []);
    if (!items.length) return;
    const at = items.indexOf(document.activeElement as HTMLElement);
    e.preventDefault();
    const next = e.key === "ArrowDown" ? Math.min(items.length - 1, at + 1)
      : e.key === "ArrowUp" ? Math.max(0, at - 1)
      : e.key === "Home" ? 0 : items.length - 1;
    items[next]?.focus();
    items[next]?.scrollIntoView({ block: "nearest" });
  }, []);

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
    <div className="flex max-h-[calc(100vh-9rem)] flex-col">
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

      <div ref={listRef} onKeyDown={onKeyDown} className="min-h-0 flex-1 overflow-y-auto p-2">
        <button
          onClick={() => { setOpenBook(null); setOpenChapter(null); onScope({}); }}
          aria-current={!scope.bookId ? "true" : undefined}
          className={`mb-1 flex w-full items-center gap-2 rounded-xl px-2.5 py-2 text-[12.5px] font-semibold transition ${
            !scope.bookId ? "bg-brand-soft text-brand" : "text-ink-2 hover:bg-surface-2"}`}>
          <BookOpen className="size-3.5" />
          כל הספרייה
          <span className="ms-auto text-[10.5px] font-normal text-ink-3">{BOOKS.length} ספרים</span>
        </button>

        {books.map((b) => {
          const open = openBook === b.id;
          const active = scope.bookId === b.id && scope.chapter == null;
          return (
            <div key={b.id} className="mb-0.5">
              <button
                onClick={() => toggleBook(b.id)}
                aria-expanded={open}
                aria-current={active ? "true" : undefined}
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
                          aria-current={cActive ? "true" : undefined}
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
                            nodes={c.nodes}
                            sections={c.sections}
                            activeId={scope.chapter === c.n ? scope.section : undefined}
                            onPick={(id) => chooseSection(c.n, id)}
                            isOpen={isOpen}
                            onToggle={toggleNode}
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

/** Badges a node advertises. Hidden from assistive tech — the label carries it. */
function Badges({ m }: { m?: TreeSection["m"] }) {
  const list = badgesFor(m);
  if (!list.length) return null;
  return (
    <span className="ms-1 inline-flex shrink-0 items-center gap-[3px]" aria-hidden>
      {list.slice(0, 5).map((b) => (
        <span key={b.key} title={b.count ? `${b.label}: ${b.count}` : b.label}
          className="text-[9.5px] leading-none opacity-70">
          {b.icon}{b.count && b.count > 1 ? <span className="tech ms-px">{b.count}</span> : null}
        </span>
      ))}
    </span>
  );
}

/**
 * One node and its children. Recursive, because the books nest to three levels
 * and the ids already encode it.
 *
 * Expansion is remembered per node id, so returning to a book restores the shape
 * you left it in.
 */
function Node({ node, depth, activeId, isOpen, onToggle, onPick }: {
  node: TreeSection;
  depth: number;
  activeId?: string;
  isOpen: (id: string) => boolean;
  onToggle: (id: string) => void;
  onPick: (id: string) => void;
}) {
  const kids = node.children ?? [];
  const has = kids.length > 0;
  const open = has && isOpen(node.id);
  const active = activeId === node.id;
  const ref = useRef<HTMLButtonElement>(null);

  // Bring the selection into view when it changes from elsewhere — picking a
  // citation, or restoring a scope on load.
  useEffect(() => {
    if (active) ref.current?.scrollIntoView({ block: "nearest", behavior: "smooth" });
  }, [active]);

  const time = readingTime(node.m);

  return (
    <div>
      <div
        className={`group flex items-baseline gap-1 rounded-lg pe-1 transition ${
          active ? "bg-brand-soft ring-1 ring-brand/20" : "hover:bg-surface-2"}`}
        style={{ paddingInlineStart: `${depth * 10}px` }}
      >
        {has ? (
          <button
            onClick={(e) => { e.stopPropagation(); onToggle(node.id); }}
            aria-label={open ? `כווץ ${node.t}` : `הרחב ${node.t}`}
            aria-expanded={open}
            className="shrink-0 rounded p-0.5 text-ink-3 transition hover:text-ink-1"
          >
            <ChevronLeft className={`size-3 transition-transform duration-200 ${open ? "-rotate-90" : ""}`} />
          </button>
        ) : (
          <span className="w-[18px] shrink-0" aria-hidden />
        )}

        <button
          ref={ref}
          data-tree-item
          onClick={() => onPick(node.id)}
          aria-current={active ? "true" : undefined}
          title={metricsSummary(node.m) || undefined}
          className="flex min-w-0 flex-1 items-baseline gap-1.5 py-1 text-start"
        >
          <span className={`tech shrink-0 text-[10px] ${active ? "text-brand/70" : "text-ink-3"}`}>{node.id}</span>
          <span dir="auto" className={`truncate text-[11.5px] ${active ? "font-semibold text-brand" : "text-ink-2"}`}>
            {node.t}
          </span>
          <Badges m={node.m} />
          {time && <span className="ms-auto shrink-0 text-[9.5px] text-ink-3">{time}</span>}
        </button>
      </div>

      {/* grid-rows trick: animates height without measuring, and collapses to
          zero cleanly so a long chapter does not jump. */}
      {has && (
        <div className={`grid transition-[grid-template-rows] duration-200 ease-out ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
          <div className="overflow-hidden">
            <div className="ms-2 border-s border-hairline ps-1">
              {kids.map((k) => (
                <Node key={k.id} node={k} depth={depth + 1} activeId={activeId}
                  isOpen={isOpen} onToggle={onToggle} onPick={onPick} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * Windowed root list. Book 7 has chapters with hundreds of entries; render a
 * slice and grow it on demand rather than mounting them all.
 */
function SectionList({ nodes, sections, activeId, isOpen, onToggle, onPick }: {
  nodes?: TreeSection[];
  sections: TreeSection[];
  activeId?: string;
  isOpen: (id: string) => boolean;
  onToggle: (id: string) => void;
  onPick: (id: string) => void;
}) {
  const STEP = 40;
  const [limit, setLimit] = useState(STEP);
  // Nested when the ids encode a hierarchy; flat for a catalogue, which is
  // correct for it rather than a fallback.
  const roots = nodes?.length ? nodes : sections;
  useEffect(() => { setLimit(STEP); }, [roots]);

  const shown = roots.slice(0, limit);
  return (
    <div className="ms-3 border-s border-hairline ps-1">
      {shown.map((n) => (
        <Node key={n.id} node={n} depth={0} activeId={activeId}
          isOpen={isOpen} onToggle={onToggle} onPick={onPick} />
      ))}
      {roots.length > limit && (
        <button onClick={() => setLimit((l) => l + STEP * 3)}
          className="mt-0.5 w-full rounded-lg px-2 py-1.5 text-[11px] font-semibold text-brand transition hover:bg-brand-soft">
          עוד {Math.min(STEP * 3, roots.length - limit)} סעיפים ({roots.length - limit} נותרו)
        </button>
      )}
    </div>
  );
}
