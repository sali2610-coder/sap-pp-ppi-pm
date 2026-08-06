/**
 * Build-time access to the book spine. Server-only.
 *
 * Books are read from disk rather than imported, so a page carries only the
 * book it renders. `import book7 from "data/books/book7.json"` in a shared
 * module would put all eleven spines in every chunk that touches any of them —
 * which is the mistake the current per-book pages make with prose.
 */
import { readFileSync, readdirSync, existsSync } from "node:fs";
import path from "node:path";
import type { Book } from "./book";

const DIR = path.join(process.cwd(), "data", "books");

/** Book ids present on disk, ordered numerically (book2 before book10). */
export function allBookIds(): string[] {
  if (!existsSync(DIR)) return [];
  return readdirSync(DIR)
    .filter((f) => f.endsWith(".json"))
    .map((f) => f.replace(/\.json$/, ""))
    .sort((a, b) => (parseInt(a.replace(/\D/g, ""), 10) || 0) - (parseInt(b.replace(/\D/g, ""), 10) || 0));
}

/** @returns the book, or null when the id is unknown — the caller renders 404. */
export function getBook(bookId: string): Book | null {
  // The id reaches this from a route segment. Anchor it to the expected shape
  // so a crafted param cannot walk out of the data directory at build time.
  if (!/^[a-z0-9-]+$/i.test(bookId)) return null;
  const file = path.join(DIR, `${bookId}.json`);
  if (!existsSync(file)) return null;
  try { return JSON.parse(readFileSync(file, "utf8")) as Book; }
  catch { return null; }
}
