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

  return (
    <div className="nxq-sheet-wrap" role="dialog" aria-modal="true" aria-labelledby="nxq-sheet-h">
      <div className="nxq-sheet-veil" onClick={onClose} aria-hidden="true" />
      <div className="nxq-sheet" ref={ref} tabIndex={-1}>
        <header className="nxq-sheet-head">
          {book ? (
            <button type="button" className="nu-ghost nxq-sheet-back" onClick={() => setBookId(undefined)}>
              <ChevronLeft size={15} strokeWidth={2} aria-hidden="true" className="nxq-back-a" />
              כל הספרים
            </button>
          ) : null}
          <h2 id="nxq-sheet-h" className="nxq-sheet-t">{book ? book.title : "היקף התשובה"}</h2>
          <button type="button" className="nu-ghost nxq-sheet-x" onClick={onClose} aria-label="סגור">
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
                      onClick={() => setBookId(b.id)}
                    />
                  </li>
                ))}
              </ul>
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
                        onClick={() => { onScope({ bookId: book.id, chapter: c.n }); onClose(); }}
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

function Row({ on, title, sub, onClick }: {
  on: boolean; title: string; sub: string; onClick: () => void;
}) {
  return (
    <button type="button" className="nu-card nxq-row" data-on={on ? "1" : "0"} onClick={onClick}>
      <span className="nxq-row-t">{title}</span>
      <span className="nxq-row-s">{sub}</span>
      {on ? <Check size={15} strokeWidth={2.4} aria-hidden="true" className="nxq-row-c" /> : null}
    </button>
  );
}
