// Scope-tree access.
//
// The book list is tiny and always needed, so it is a static import. Each book's
// chapters/sections are 20-160 KB and are only needed once that book is
// expanded, so they are fetched on demand and cached. Expanding all 11 books
// eagerly would ship ~400 KB to render a sidebar.
import type { BookSummary, BookTree, Scope } from "./types";
import indexJson from "@/data/ai-tree/index.json";

export const BOOKS: BookSummary[] = (indexJson as { books: BookSummary[] }).books;

const cache = new Map<string, BookTree>();
const inflight = new Map<string, Promise<BookTree | null>>();

export function cachedTree(bookId: string): BookTree | null {
  return cache.get(bookId) ?? null;
}

/** Loads one book's chapters. Concurrent calls share a single request. */
export async function loadTree(bookId: string): Promise<BookTree | null> {
  const hit = cache.get(bookId);
  if (hit) return hit;
  const running = inflight.get(bookId);
  if (running) return running;

  const p = import(`@/data/ai-tree/${bookId}.json`)
    .then((m) => {
      const tree = (m.default ?? m) as BookTree;
      cache.set(bookId, tree);
      return tree;
    })
    .catch(() => null)
    .finally(() => inflight.delete(bookId));

  inflight.set(bookId, p);
  return p;
}

export const bookById = (id?: string) => BOOKS.find((b) => b.id === id) ?? null;

/** Human label for the current scope, in Hebrew, for the composer and header. */
export function scopeLabel(scope: Scope): string {
  const b = bookById(scope.bookId);
  if (!b) return "כל הספרייה";
  if (scope.section) return `${b.module} · פרק ${scope.chapter} · ${scope.section}`;
  if (scope.chapter != null) return `${b.module} · פרק ${scope.chapter}`;
  return `${b.module} · הספר כולו`;
}

/** How much of the corpus the AI may read — drives the scope meter. */
export function scopeBreadth(scope: Scope): { label: string; pct: number } {
  if (!scope.bookId) return { label: "רחב", pct: 100 };
  if (scope.section) return { label: "ממוקד", pct: 8 };
  if (scope.chapter != null) return { label: "בינוני", pct: 34 };
  return { label: "ספר שלם", pct: 68 };
}

/** Deep link into the existing reader, so a citation lands on the real text. */
export function sectionHref(bookId: string, chapter: number, section?: string) {
  const base = `/library/${bookId}/`;
  return section ? `${base}#s-${section}` : `${base}#ch-${chapter}`;
}
