"use client";

import { useCallback, useEffect, useState } from "react";
import type { Book } from "@/lib/library/book";
import { chapterTitle } from "@/lib/library/book";
import { BookReader } from "@/components/book-reader";
import { BookView } from "@/components/library/book-view";
import { KIND_LABEL, identityOf } from "@/lib/book-identity";

/**
 * The Library reading experience.
 *
 * ============================================================================
 * BOUNDARY — DO NOT REPLACE THIS WITH A GENERIC RENDERER
 * ============================================================================
 *
 * The bespoke reader is intentional product design, not incidental scaffolding.
 * It carries the hero, Start Reading, the table of contents, focus mode, the
 * reading view, display controls, search, bookmarks, the progress rail and
 * scroll-spy — roughly 830 lines of behaviour in components/book-reader.tsx.
 *
 * It has already been lost once. Retiring the eleven hand-maintained book pages
 * moved every book onto a data-driven route, which was the right call for the
 * URLs and the data, but it left BookReader orphaned: still in the tree, still
 * compiling, rendered by nothing. What shipped in its place was a heading, a
 * metadata strip and a chapter list. Measured against the live component at the
 * time, every one of Start Reading, Table of Contents, Focus Mode, Reading View,
 * search and progress was present in the orphaned reader and absent from the
 * page that replaced it.
 *
 * If a future refactor makes this file look redundant, that is the same
 * reasoning that produced the regression. Replacing it needs explicit product
 * approval, and test/library-reader.test.ts encodes the contract in the
 * meantime.
 *
 * ----------------------------------------------------------------------------
 * WHY THIS WRAPPER EXISTS AT ALL
 *
 * BookReader is a client component and the route is a server component, so the
 * two need a boundary. More importantly, both BookReader and BookView used to
 * own an "active chapter" state, each with its own picker. Composing them
 * naively puts two chapter selectors on one screen and leaves the table of
 * contents inert. BookReader is the single owner here; BookView is controlled.
 */
export function ReadingExperience({ book }: { book: Book }) {
  const [active, setActive] = useState<number>(book.chapters[0]?.n ?? 1);

  /**
   * Chapter changes travel on `neo:reader:goto`, BookReader's own public
   * contract for explicit navigation — its table of contents, the "בעמוד זה"
   * rail, resume and previous/next all route through that one event so the
   * reader can expand the target, set it active and suppress scroll-spy during
   * the smooth scroll.
   *
   * Subscribing here is what keeps the body in step with the shell. Holding a
   * second, private piece of state and hoping the two agreed is exactly the
   * failure this restoration exists to undo: verified in a browser before this
   * listener existed, clicking a chapter in the table of contents left
   * `data-chapter` on 1 — the shell moved and the body did not.
   */
  useEffect(() => {
    const onGoto = (e: Event) => {
      const n = Number((e as CustomEvent<number>).detail);
      if (Number.isFinite(n) && n > 0) setActive(n);
    };
    window.addEventListener("neo:reader:goto", onGoto);
    return () => window.removeEventListener("neo:reader:goto", onGoto);
  }, []);

  /**
   * Navigation originating in the body (a deep link resolving to a section in
   * another chapter) is announced on the same event rather than set directly,
   * so the shell's active chapter, progress rail and scroll-spy update too.
   */
  const requestChapter = useCallback((n: number) => {
    window.dispatchEvent(new CustomEvent("neo:reader:goto", { detail: n }));
  }, []);

  const identity = identityOf(book.id);
  const title = book.meta.title.he?.trim() || book.meta.title.en;
  const sections = book.chapters.reduce((n, c) => n + c.sections.length, 0);

  // The subtitle carries the identity line the bespoke pages showed: module,
  // and page count where the book declares one.
  const subtitle = [book.meta.module, book.meta.pages != null ? `${book.meta.pages} עמודים` : null]
    .filter(Boolean)
    .join(" · ");

  const stats = [
    { label: "פרקים", value: book.chapters.length },
    { label: "סעיפים", value: sections.toLocaleString("he-IL") },
    ...(book.meta.publisher ? [{ label: "הוצאה", value: book.meta.publisher }] : []),
    ...(identity ? [{ label: "סוג", value: KIND_LABEL[identity.kind] }] : []),
  ];

  return (
    <BookReader
      bookId={book.id}
      title={title}
      subtitle={subtitle}
      chapters={book.chapters.map((c) => ({
        n: c.n,
        title: c.title.he?.trim() || c.title.en || chapterTitle(c),
      }))}
      stats={stats}
    >
      <BookView book={book} active={active} onActiveChange={requestChapter} />
    </BookReader>
  );
}
