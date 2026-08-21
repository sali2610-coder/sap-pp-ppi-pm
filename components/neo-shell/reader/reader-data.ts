/* ============================================================================
   PROJECT NEO · READER — the build-time spine.
   ----------------------------------------------------------------------------
   Runs on the SERVER, from app/neo/read/[bookId]/page.tsx. It authors nothing.

   TWO DOORS, BOTH ALREADY OPEN
     lib/library/registry.ts   getBook() — the same accessor the production
                               reader route (app/library/v2/[bookId]) uses. It
                               yields the real chapters, the real subchapter ids
                               and their real page numbers.
     books/books-data.ts       bookHubData() — the shelf's own identity for this
                               book: Hebrew module name, module hue, structure,
                               publisher, page count. Read rather than
                               re-derived, so the shelf, the hub and this reader
                               can never disagree about what a book is called or
                               what colour it wears.

   PROSE IS NOT HERE. It lives in per-chapter shards under
   /books/<id>/ch<n>.json and is fetched by the client when a chapter opens,
   exactly as lib/library/book.ts#loadChapterBodies already does for the
   production reader. This module therefore carries the SPINE only, which is why
   book7 (1,689 subchapters) is a page and not a download.
   ========================================================================== */

import { existsSync, readdirSync } from "node:fs";
import path from "node:path";
import { getBook } from "@/lib/library/registry";
import { chapterTitle, sectionTitle } from "@/lib/library/book";
import { bookHubData, bookIds } from "@/components/neo-shell/books/books-data";
import type { NRBook, NRChapter, NRSection } from "./types";

/** Ids for generateStaticParams — the registry's own list, unfiltered. */
export function readerBookIds(): string[] {
  return bookIds();
}

/**
 * Which chapters of this book actually have a page-scan file.
 *
 * Read from public/books/<id>/fig<n>.json, which is the same path the reader
 * would fetch. Knowing at build time means the browser never issues a request
 * for a file that is not there — a 404 per chapter is not an error, but it is
 * noise in the console and a round trip that answers nothing.
 */
function figureChapters(id: string): number[] {
  const dir = path.join(process.cwd(), "public", "books", id);
  if (!existsSync(dir)) return [];
  try {
    return readdirSync(dir)
      .map((f) => /^fig(\d+)\.json$/.exec(f))
      .filter((m): m is RegExpExecArray => m !== null)
      .map((m) => Number(m[1]))
      .sort((a, b) => a - b);
  } catch {
    return [];
  }
}

/**
 * The payload for /neo/read/<id>/.
 *
 * @returns null when the id is not a book on disk — the route then 404s rather
 *          than rendering an empty reader.
 */
export function readerData(id: string): NRBook | null {
  const raw = getBook(id);
  const hub = bookHubData(id);
  if (!raw || !hub) return null;

  const card = hub.book;

  let before = 0;
  const chapters: NRChapter[] = raw.chapters.map((c) => {
    const sections: NRSection[] = c.sections.map((s) => ({
      id: s.id,
      title: sectionTitle(s),
      page: typeof s.page === "number" ? s.page : null,
    }));
    const row: NRChapter = {
      n: c.n,
      title: chapterTitle(c),
      intro: c.intro ?? null,
      startPage: typeof c.startPage === "number" ? c.startPage : null,
      sections,
      before,
    };
    before += sections.length;
    return row;
  });

  return {
    id: raw.id,
    titleEn: card.titleEn,
    titleHe: card.titleHe,
    module: card.module,
    moduleHe: card.moduleHe,
    mod: card.mod,
    structureHe: card.structureHe,
    publisher: card.publisher,
    pages: card.pages,
    chapters,
    totalSections: before,
    figChapters: figureChapters(raw.id),
    hubHref: card.hubHref,
    shelfHref: "/neo/books/",
    libraryHref: card.href,
  };
}
