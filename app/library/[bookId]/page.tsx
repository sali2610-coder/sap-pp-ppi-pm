/**
 * The Library Platform reader. One dynamic route serving every book.
 *
 * This REPLACED eleven hand-maintained page files, at the same URLs. Keeping
 * /library/bookN was not cosmetic: 3,889 internal references point at those
 * paths, so a move plus redirects would have been strictly worse than a route
 * that simply answers where the old ones did.
 *
 * Sibling static routes under /library (academy, the quality reports, the
 * per-module academies) still win over this dynamic segment, and
 * generateStaticParams emits only the eleven book ids.
 */
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { allBookIds, getBook } from "@/lib/library/registry";
import { ReadingExperience } from "@/components/library/reading-experience";
import { AskAI } from "@/components/ask-ai";

// No `dynamicParams = false`: under output:"export" only the params returned by
// generateStaticParams are ever emitted, so the flag is redundant here.

export function generateStaticParams() {
  return allBookIds().map((bookId) => ({ bookId }));
}

export async function generateMetadata({ params }: { params: Promise<{ bookId: string }> }): Promise<Metadata> {
  const { bookId } = await params;
  const book = getBook(bookId);
  if (!book) return { title: "ספר לא נמצא" };
  const t = book.meta.title.he?.trim() || book.meta.title.en;
  return { title: `${t} · הספרייה הדיגיטלית`, description: `${book.chapters.length} פרקים · ${book.meta.module}` };
}

export default async function BookPage({ params }: { params: Promise<{ bookId: string }> }) {
  const { bookId } = await params;
  const book = getBook(bookId);
  if (!book) notFound();

  /**
   * The hero, metadata, table of contents, progress and reading controls all
   * belong to the reader itself — see components/library/reading-experience.tsx
   * for why that shell must not be flattened back into a heading and a list.
   */
  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6">
      <ReadingExperience book={book} />

      {/* Every book surface carries Ask AI, scoped to the book being read. */}
      <AskAI bookId={book.id} />
    </main>
  );
}
