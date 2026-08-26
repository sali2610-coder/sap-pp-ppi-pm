"use client";

/* ============================================================================
   PROJECT NEO · CHAT — resolving a Scope into words a reader can check.
   ----------------------------------------------------------------------------
   A Scope is three opaque values: `bookId`, `chapter`, `section`. "book1", 3,
   "3.2" tells nobody what the AI is about to read. This module turns those into
   the book's title, the chapter's title and the subchapter's title — and it
   does it from the SAME data the scope sheet and the backend use:
   lib/ai/tree.BOOKS (data/ai-tree/index.json) and that book's own tree.

   TRUTHFULNESS RULES
     - Nothing is invented. A title appears only once the tree that carries it
       has loaded; until then the level is reported with its id and `pending`,
       and the UI shows the id rather than a plausible-looking name.
     - A tree that fails to load resolves to titles of `null`, not to a guess.
     - The cache in lib/ai/tree is shared, so a book already expanded in the
       scope sheet resolves on the first render with no second fetch.
   ========================================================================== */

import { useEffect, useState } from "react";
import { BOOKS, cachedTree, loadTree } from "@/lib/ai/tree";
import type { BookSummary, BookTree, Scope, TreeSection } from "@/lib/ai/types";

/** One addressed level of the scope. `title` is null when it is not known. */
export interface ScopeLevel {
  /** "ספר" / "פרק" / "סעיף" — what kind of level this is. */
  kind: string;
  /** The technical address: a book id, a chapter number, a dotted section id. */
  id: string;
  /** The authored title, or null when the tree carrying it has not loaded. */
  title: string | null;
}

export interface ScopeContext {
  /** The whole library — no book chosen. Everything else is then empty. */
  whole: boolean;
  book: BookSummary | null;
  levels: ScopeLevel[];
  /** True while the tree that would name the chapter/section is still loading. */
  pending: boolean;
}

/** Depth-first search for a dotted section id, across the flat and nested views. */
function findSection(list: TreeSection[] | undefined, id: string): TreeSection | null {
  for (const s of list ?? []) {
    if (s.id === id) return s;
    const hit = findSection(s.children, id);
    if (hit) return hit;
  }
  return null;
}

/** Builds the levels from a book summary plus, when it is available, its tree. */
function levelsOf(book: BookSummary, scope: Scope, tree: BookTree | null): ScopeLevel[] {
  const out: ScopeLevel[] = [{ kind: "ספר", id: book.id, title: book.title }];
  if (scope.chapter == null) return out;

  const ch = tree?.chapters.find((c) => c.n === scope.chapter) ?? null;
  out.push({ kind: "פרק", id: String(scope.chapter), title: ch?.t ?? null });
  if (!scope.section) return out;

  // The flat `sections` list is what scope addresses by; `nodes` is the nested
  // view of the same records, searched as a fallback for a deep sub-section.
  const sec = ch ? findSection(ch.sections, scope.section) ?? findSection(ch.nodes, scope.section) : null;
  out.push({ kind: "סעיף", id: scope.section, title: sec?.t ?? null });
  return out;
}

/**
 * The current scope, resolved to titles.
 *
 * The tree is fetched only when the scope actually names a chapter or a
 * section — choosing a whole book needs no tree, because the book's own title
 * is already in the static index.
 */
export function useScopeContext(scope: Scope): ScopeContext {
  const book = BOOKS.find((b) => b.id === scope.bookId) ?? null;
  const needsTree = Boolean(book && scope.chapter != null);

  // The fetch result only. The already-cached case is NOT mirrored into state:
  // doing that meant calling setState synchronously inside the effect, which
  // costs a cascading render on every scope change for a value that is already
  // in hand. It is read during render instead, below.
  const [fetched, setFetched] = useState<BookTree | null>(null);
  const bookId = book?.id;

  useEffect(() => {
    if (!bookId || !needsTree) return;
    let live = true;
    // loadTree resolves from its own cache when it can, so this is one branch
    // for both paths and the only setState is in an async callback.
    void loadTree(bookId).then((t) => { if (live) setFetched(t); });
    return () => { live = false; };
  }, [bookId, needsTree]);

  if (!book) return { whole: true, book: null, levels: [], pending: false };

  // Prefer what this hook fetched; fall back to the module cache, which a scope
  // sheet expansion may already have filled. Reading it during render is what
  // makes an already-loaded book resolve with no flash of a bare id.
  const mine =
    fetched && fetched.id === book.id ? fetched : cachedTree(book.id);
  return {
    whole: false,
    book,
    levels: levelsOf(book, scope, mine),
    pending: needsTree && !mine,
  };
}
