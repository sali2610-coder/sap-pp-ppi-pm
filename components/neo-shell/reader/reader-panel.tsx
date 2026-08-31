"use client";

/* ============================================================================
   PROJECT NEO · READER — the navigator.
   ----------------------------------------------------------------------------
   One panel, two jobs, because they answer the same question from two sides:

     תוכן   the real table of contents. Every chapter and every subchapter that
            exists in data/books/<id>.json, in the book's own order, searchable
            by title and by subchapter id. Nothing is grouped, renamed or
            summarised, and no row is shown that the book does not have.
     מפה    the position overview: where the reader is on all three scales, the
            chapters the canonical reader recorded as read, and every bookmark
            this reader has placed — each one a way back to the place it marks.

   The search runs over TITLES ONLY and says so. Prose lives in per-chapter
   shards the reader fetches one at a time; this panel has none of it, so it
   would be a lie to offer full-text search here.
   ========================================================================== */

import { useEffect, useId, useMemo, useRef, useState } from "react";
import { Bookmark, BookmarkX, Check, ListTree, Map as MapIcon, Search, X } from "lucide-react";
import { bookmarkedChapters, type NeoBookmark } from "@/components/neo-shell/books/reading-state";
import type { NRBook, NRChapter } from "./types";
import { n, pct, positionLine, type NRProgress } from "./progress";

type Tab = "toc" | "map";

const MAX_ROWS = 120;

export function ReaderPanel({
  book,
  chapter,
  progress,
  activeSection,
  read,
  bookmarks,
  tab,
  onTab,
  onClose,
  onGo,
  onUnmark,
}: {
  book: NRBook;
  chapter: NRChapter;
  progress: NRProgress;
  activeSection: string | null;
  read: number[];
  /** Subchapter bookmarks placed in this reader, newest first. */
  bookmarks: NeoBookmark[];
  tab: Tab;
  onTab: (t: Tab) => void;
  onClose: () => void;
  onGo: (chapter: number, sectionId: string | null) => void;
  onUnmark: (chapter: number, sectionId: string | null) => void;
}) {
  const [q, setQ] = useState("");
  // Seeded from the chapter that is open. The panel is mounted only while it is
  // on screen and closes on every navigation, so there is nothing to sync back:
  // the next opening starts from the chapter the reader is actually in.
  const [openCh, setOpenCh] = useState<number>(chapter.n);
  const ref = useRef<HTMLDivElement>(null);
  const titleId = useId();

  useEffect(() => {
    ref.current?.focus();
    /* Same dialog contract as the shelf's quick-view: Escape closes and Tab is
       wrapped inside the panel — a modal that lets Tab walk out into the reader
       behind the scrim is a modal in name only. */
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { e.stopPropagation(); onClose(); return; }
      if (e.key !== "Tab") return;
      const root = ref.current;
      if (!root) return;
      const items = [...root.querySelectorAll<HTMLElement>("a[href], button:not([disabled]), input:not([disabled])")]
        .filter((el) => el.tabIndex !== -1 && el.offsetParent !== null);
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      const at = document.activeElement;
      if (!e.shiftKey && at === last) { e.preventDefault(); first.focus(); }
      else if (e.shiftKey && (at === first || !root.contains(at))) { e.preventDefault(); last.focus(); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const needle = q.trim().toLowerCase();
  const hits = useMemo(() => {
    if (!needle) return null;
    const rows: { chapter: NRChapter; id: string | null; title: string }[] = [];
    for (const c of book.chapters) {
      if (c.title.toLowerCase().includes(needle) || String(c.n) === needle) {
        rows.push({ chapter: c, id: null, title: c.title });
      }
      for (const s of c.sections) {
        if (s.title.toLowerCase().includes(needle) || s.id.toLowerCase().includes(needle)) {
          rows.push({ chapter: c, id: s.id, title: s.title });
        }
      }
    }
    return rows;
  }, [book.chapters, needle]);

  const marked = useMemo(() => bookmarkedChapters(bookmarks), [bookmarks]);

  /* Bookmarks resolved against the book as it is NOW. A mark whose chapter or
     subchapter is no longer in the data is dropped rather than rendered as a
     row that cannot be opened — the same rule the opening resolver follows. */
  const marks = useMemo(
    () =>
      bookmarks.flatMap((m) => {
        const c = book.chapters.find((x) => x.n === m.chapter);
        if (!c) return [];
        const s = m.section ? c.sections.find((x) => x.id === m.section) : undefined;
        if (m.section && !s) return [];
        return [{ mark: m, chapter: c, title: s ? s.title : c.title, id: s ? s.id : null }];
      }),
    [bookmarks, book.chapters],
  );

  return (
    <div className="nr-panel-wrap">
      <button type="button" className="nr-scrim" aria-label="סגור" onClick={onClose} />
      <div
        className="nr-panel"
        ref={ref}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
      >
        <div className="nr-panel-top">
          <span className="nr-grab" aria-hidden="true" />
          <h2 className="nr-panel-t" id={titleId}>{book.titleHe || book.titleEn}</h2>
          <button type="button" className="nu-ghost nr-x" onClick={onClose} aria-label="סגור">
            <X size={16} strokeWidth={1.9} aria-hidden="true" />
          </button>
        </div>

        <div className="nr-panel-tabs" role="tablist" aria-label="מצב הפאנל">
          <button
            type="button"
            role="tab"
            className="nu-tab"
            aria-selected={tab === "toc"}
            onClick={() => onTab("toc")}
          >
            <ListTree size={14} strokeWidth={1.9} aria-hidden="true" />
            תוכן העניינים
          </button>
          <button
            type="button"
            role="tab"
            className="nu-tab"
            aria-selected={tab === "map"}
            onClick={() => onTab("map")}
          >
            <MapIcon size={14} strokeWidth={1.9} aria-hidden="true" />
            מפת ההתקדמות
          </button>
        </div>

        {tab === "toc" ? (
          <div className="nr-panel-body">
            <label className="nr-find">
              <Search size={14} strokeWidth={1.9} aria-hidden="true" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="חפש פרק, תת-פרק או מזהה"
                aria-label="חיפוש בתוכן העניינים"
                type="search"
              />
            </label>
            <p className="nr-note">
              החיפוש עובר על כותרות ומזהים בלבד: גוף הטקסט נטען פרק-פרק ואינו נמצא כאן.
            </p>

            {hits ? (
              <>
                <p className="nr-note nr-note-hits">
                  {hits.length === 0
                    ? "אין התאמה בכותרות של הספר הזה."
                    : `${n(hits.length)} התאמות${hits.length > MAX_ROWS ? ` · מוצגות ${n(MAX_ROWS)} הראשונות` : ""}`}
                </p>
                <ul className="nr-toc">
                  {hits.slice(0, MAX_ROWS).map((h, i) => (
                    <li key={`${h.chapter.n}-${h.id ?? "c"}-${i}`}>
                      <button
                        type="button"
                        className="nr-toc-row"
                        data-kind={h.id ? "sec" : "ch"}
                        data-on={h.id ? h.id === activeSection ? "1" : undefined : h.chapter.n === chapter.n ? "1" : undefined}
                        onClick={() => { onGo(h.chapter.n, h.id); onClose(); }}
                      >
                        <span className="nr-toc-id">{h.id ?? `פרק ${h.chapter.n}`}</span>
                        <span className="nr-toc-t">{h.title}</span>
                        {h.id && <span className="nr-toc-in">פרק {h.chapter.n}</span>}
                      </button>
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <ul className="nr-toc">
                {book.chapters.map((c) => {
                  const open = c.n === openCh;
                  return (
                    <li key={c.n}>
                      <button
                        type="button"
                        className="nr-toc-row"
                        data-kind="ch"
                        data-on={c.n === chapter.n ? "1" : undefined}
                        aria-expanded={open}
                        onClick={() => {
                          if (open) { onGo(c.n, null); onClose(); }
                          else setOpenCh(c.n);
                        }}
                      >
                        <span className="nr-toc-id">{c.n}</span>
                        <span className="nr-toc-t">{c.title}</span>
                        {marked.has(c.n) && (
                          <span className="nr-toc-mark" title="בפרק הזה מונחת סימנייה">
                            <Bookmark size={12} strokeWidth={2.4} aria-hidden="true" />
                          </span>
                        )}
                        {read.includes(c.n) && (
                          <span className="nr-toc-read" title="סומן כנקרא בקורא של הפרויקט">
                            <Check size={12} strokeWidth={2.4} aria-hidden="true" />
                          </span>
                        )}
                        <span className="nr-toc-n">{c.sections.length}</span>
                      </button>
                      {open && (
                        c.sections.length ? (
                          <ul className="nr-toc-sub">
                            {c.sections.map((s) => (
                              <li key={s.id}>
                                <button
                                  type="button"
                                  className="nr-toc-row nr-toc-row--sub"
                                  data-kind="sec"
                                  data-on={s.id === activeSection && c.n === chapter.n ? "1" : undefined}
                                  onClick={() => { onGo(c.n, s.id); onClose(); }}
                                >
                                  <span className="nr-toc-id">{s.id}</span>
                                  <span className="nr-toc-t">{s.title}</span>
                                  {s.page !== null && <span className="nr-toc-n">עמ׳ {s.page}</span>}
                                </button>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p className="nr-note nr-note-sub">לפרק זה אין תת-פרקים בנתוני הספר.</p>
                        )
                      )}
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        ) : (
          <div className="nr-panel-body">
            <dl className="nr-map">
              <div>
                <dt>הספר</dt>
                <dd>
                  <b>{pct(progress.book)}%</b>
                  <span>
                    {book.totalSections
                      ? `תת-פרק ${n(progress.ordinal)} מתוך ${n(book.totalSections)}`
                      : "הספר אינו מחזיק תת-פרקים"}
                  </span>
                </dd>
              </div>
              <div>
                <dt>הפרק</dt>
                <dd>
                  <b>{pct(progress.chapter)}%</b>
                  <span>{`פרק ${n(progress.chapterOrdinal)} מתוך ${n(book.chapters.length)} · ${chapter.title}`}</span>
                </dd>
              </div>
              <div>
                <dt>תת-הפרק</dt>
                <dd>
                  <b>{pct(progress.section)}%</b>
                  <span>{activeSection ? `מזהה ${activeSection}` : "אין תת-פרק פתוח"}</span>
                </dd>
              </div>
              <div>
                <dt>סימניות</dt>
                <dd>
                  <b>{n(marks.length)}</b>
                  <span className="nu-status" style={{ "--s": marks.length ? "var(--status-tested)" : "var(--status-not-started)" } as React.CSSProperties}>
                    {marks.length
                      ? `${n(marks.length)} מיקומים מסומנים בקורא של NEO`
                      : "לא הונחה סימנייה בספר הזה"}
                  </span>
                </dd>
              </div>
              <div>
                <dt>סומנו כנקראו</dt>
                <dd>
                  <b>{n(read.length)}</b>
                  <span className="nu-status" style={{ "--s": read.length ? "var(--status-done)" : "var(--status-not-started)" } as React.CSSProperties}>
                    {read.length
                      ? `${n(read.length)} מתוך ${n(book.chapters.length)} פרקים: נרשם בקורא הקנוני`
                      : "עדיין לא סומן פרק כנקרא"}
                  </span>
                </dd>
              </div>
            </dl>
            {marks.length > 0 && (
              <>
                <h3 className="nr-panel-h">הסימניות שלי בספר הזה</h3>
                <ul className="nr-bml">
                  {marks.map((m) => (
                    <li key={`${m.mark.chapter}|${m.mark.section ?? ""}`}>
                      <button
                        type="button"
                        className="nr-bm"
                        onClick={() => { onGo(m.chapter.n, m.id); onClose(); }}
                      >
                        <Bookmark size={13} strokeWidth={2} aria-hidden="true" />
                        <span className="nr-bm-id">{m.id ?? `פרק ${m.chapter.n}`}</span>
                        <span className="nr-bm-t">{m.title}</span>
                        <span className="nr-bm-in">פרק {m.chapter.n}</span>
                      </button>
                      <button
                        type="button"
                        className="nu-ghost nr-bm-x"
                        onClick={() => onUnmark(m.mark.chapter, m.mark.section)}
                        aria-label={`הסר את הסימנייה מ${m.title}`}
                        title="הסר סימנייה"
                      >
                        <BookmarkX size={14} strokeWidth={1.9} aria-hidden="true" />
                      </button>
                    </li>
                  ))}
                </ul>
              </>
            )}

            <p className="nr-note">{positionLine(book, progress, chapter)}</p>
            <p className="nr-note">
              המדידה נשענת על ספירת תת-הפרקים האמיתית של הספר. אין בנתונים זמן קריאה משוער או ספירת מילים,
              ולכן אין כאן הערכת זמן.
            </p>

            <ul className="nr-chmap">
              {book.chapters.map((c) => (
                <li key={c.n}>
                  <button
                    type="button"
                    className="nr-chmap-row"
                    data-on={c.n === chapter.n ? "1" : undefined}
                    data-read={read.includes(c.n) ? "1" : undefined}
                    data-mark={marked.has(c.n) ? "1" : undefined}
                    onClick={() => { onGo(c.n, null); onClose(); }}
                  >
                    <span className="nr-chmap-n">{c.n}</span>
                    <span className="nr-chmap-t">{c.title}</span>
                    <span className="nr-chmap-b" aria-hidden="true">
                      <i style={{ "--v": book.totalSections ? c.sections.length / book.totalSections : 0 } as React.CSSProperties} />
                    </span>
                    <span className="nr-chmap-c">{c.sections.length}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
