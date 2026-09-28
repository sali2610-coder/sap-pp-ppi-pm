"use client";

/* ============================================================================
   PROJECT NEO · CHAT — choosing what the library may read.
   ----------------------------------------------------------------------------
   Every row here is real data: BOOKS is data/ai-tree/index.json, the chapter
   list is that book's own tree, fetched on demand by lib/ai/tree.loadTree. No
   book, chapter or count on this sheet is written by hand, and a book whose
   tree fails to load offers no chapters rather than a plausible-looking list.

   Narrower scope is not merely a filter — it is what the backend retrieves
   from, so the sheet says what each choice means instead of implying that
   "whole library" and "one section" are the same request with a badge.
   ========================================================================== */

import { useEffect, useState } from "react";
import { Check, ChevronLeft, X } from "lucide-react";
import { useDialog } from "@/lib/use-dialog";
import { BOOKS, loadTree } from "@/lib/ai/tree";
import type { BookTree, Scope } from "@/lib/ai/types";

export function ScopeSheet({ scope, onScope, onClose }: {
  scope: Scope;
  onScope: (s: Scope) => void;
  onClose: () => void;
}) {
  const ref = useDialog<HTMLDivElement>(true, onClose);
  const [bookId, setBookId] = useState<string | undefined>(scope.bookId);
  /* The third level. A chapter is opened to reveal its own subchapters, which
     are what `Scope.section` addresses and what the backend's "section" scope
     mode retrieves from — the sheet used to stop at the chapter, so the
     narrowest scope the engine supports was unreachable from the UI. */
  const [chapter, setChapter] = useState<number | undefined>(scope.chapter);
  /* Keyed by the book it belongs to. Holding the id alongside the tree is what
     lets "loading" be derived rather than set — the effect then only writes
     state from the fetch callback, never synchronously on the way in, so
     switching books cannot flash the previous book's chapters. */
  const [loaded, setLoaded] = useState<{ id: string; tree: BookTree | null } | null>(null);

  useEffect(() => {
    if (!bookId) return;
    let live = true;
    void loadTree(bookId).then((tree) => {
      if (live) setLoaded({ id: bookId, tree });
    });
    return () => { live = false; };
  }, [bookId]);

  const book = BOOKS.find((b) => b.id === bookId) ?? null;
  const fresh = bookId && loaded?.id === bookId ? loaded : null;
  const loading = Boolean(bookId) && !fresh;
  const tree = fresh?.tree ?? null;
  // Only a chapter whose record actually loaded can be drilled into; otherwise
  // the sheet stays at the chapter list rather than opening an empty level.
  const openCh = chapter != null ? tree?.chapters.find((c) => c.n === chapter) ?? null : null;

  return (
    <div className="nxq-sheet-wrap" role="dialog" aria-modal="true" aria-labelledby="nxq-sheet-h">
      <div className="nxq-sheet-veil" onClick={onClose} aria-hidden="true" />
      <div className="nxq-sheet" ref={ref} tabIndex={-1}>
        <header className="nxq-sheet-head">
          {book ? (
            <button
              type="button"
              className="nu-ghost nxq-sheet-back"
              onClick={() => (openCh ? setChapter(undefined) : (setBookId(undefined), setChapter(undefined)))}
            >
              <ChevronLeft size={15} strokeWidth={2} aria-hidden="true" className="nxq-back-a" />
              {openCh ? "כל הפרקים" : "כל הספרים"}
            </button>
          ) : null}
          <h2 id="nxq-sheet-h" className="nxq-sheet-t">
            {openCh ? `פרק ${openCh.n} · ${openCh.t}` : book ? book.title : "היקף התשובה"}
          </h2>
          <button type="button" className="nu-ghost nxq-sheet-x" onClick={onClose} aria-label="סגירה">
            <X size={16} strokeWidth={2} aria-hidden="true" />
          </button>
        </header>

        <div className="nxq-sheet-body">
          {!book ? (
            <>
              <Row
                on={!scope.bookId}
                title="כל הספרייה"
                sub={`${BOOKS.length} ספרים · חיפוש רחב, תשובה כללית יותר`}
                onClick={() => { onScope({}); onClose(); }}
              />
              <ul className="nxq-sheet-list">
                {BOOKS.map((b) => (
                  <li key={b.id}>
                    <Row
                      on={scope.bookId === b.id}
                      title={b.title}
                      sub={`${b.module} · ${b.chapters} פרקים · ${b.sections} סעיפים`}
                      more
                      // Chapter is cleared explicitly: a chapter number carried
                      // over from another book addresses a different chapter.
                      onClick={() => { setBookId(b.id); setChapter(undefined); }}
                    />
                  </li>
                ))}
              </ul>
            </>
          ) : openCh ? (
            <>
              <Row
                on={scope.bookId === book.id && scope.chapter === openCh.n && !scope.section}
                title="הפרק כולו"
                sub={`${openCh.sections.length} סעיפים`}
                onClick={() => { onScope({ bookId: book.id, chapter: openCh.n }); onClose(); }}
              />
              {openCh.sections.length ? (
                <ul className="nxq-sheet-list">
                  {openCh.sections.map((s) => (
                    <li key={s.id}>
                      <Row
                        on={scope.bookId === book.id && scope.section === s.id}
                        title={s.t}
                        /* Only what the record carries: its dotted id, and the
                           printed page when the source has one. A section with
                           no page shows no page. */
                        sub={s.p ? `${s.id} · עמוד ${s.p}` : s.id}
                        onClick={() => { onScope({ bookId: book.id, chapter: openCh.n, section: s.id }); onClose(); }}
                      />
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="nxq-sheet-note">לפרק הזה אין סעיפים במאגר. אפשר לבחור את הפרק כולו.</p>
              )}
            </>
          ) : (
            <>
              <Row
                on={scope.bookId === book.id && scope.chapter == null}
                title="הספר כולו"
                sub={`${book.chapters} פרקים`}
                onClick={() => { onScope({ bookId: book.id }); onClose(); }}
              />
              {loading ? (
                <p className="nxq-sheet-note">טוען את הפרקים…</p>
              ) : tree ? (
                <ul className="nxq-sheet-list">
                  {tree.chapters.map((c) => (
                    <li key={c.n}>
                      <Row
                        on={scope.bookId === book.id && scope.chapter === c.n && !scope.section}
                        title={`פרק ${c.n} · ${c.t}`}
                        sub={`${c.sections.length} סעיפים`}
                        /* A chapter with subchapters DRILLS; one without is
                           itself the narrowest scope, so it is selected. The
                           row says which it will do rather than looking
                           identical in both cases. */
                        more={c.sections.length > 0}
                        onClick={() =>
                          c.sections.length
                            ? setChapter(c.n)
                            : (onScope({ bookId: book.id, chapter: c.n }), onClose())
                        }
                      />
                    </li>
                  ))}
                </ul>
              ) : (
                // Honest failure: the tree did not load, so there are no
                // chapters to offer. The book itself is still selectable.
                <p className="nxq-sheet-note">רשימת הפרקים לא נטענה. אפשר לבחור את הספר כולו.</p>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function Row({ on, title, sub, more, onClick }: {
  on: boolean; title: string; sub: string;
  /** True when the row opens a deeper level instead of choosing this one. */
  more?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      className="nu-card nxq-row"
      data-on={on ? "1" : "0"}
      onClick={onClick}
      aria-expanded={more ? false : undefined}
    >
      <span className="nxq-row-t">{title}</span>
      <span className="nxq-row-s">{sub}</span>
      {on ? (
        <Check size={15} strokeWidth={2.4} aria-hidden="true" className="nxq-row-c" />
      ) : more ? (
        <ChevronLeft size={15} strokeWidth={2.2} aria-hidden="true" className="nxq-row-c nxq-row-m" />
      ) : null}
    </button>
  );
}
