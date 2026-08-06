/**
 * The Library Platform reader route — phase 4 of docs/LIBRARY-PLATFORM.md.
 *
 * One dynamic route replaces eleven hand-maintained page files. Nothing links
 * here yet: the existing /library/bookN routes are untouched, so this can be
 * compared against them (phase 5) before anything is swapped (phase 6).
 */
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BookOpen, FileText, Layers } from "lucide-react";
import { allBookIds, getBook } from "@/lib/library/registry";
import { chapterTitle } from "@/lib/library/book";
import { BookView } from "@/components/library/book-view";
import { PageHeader, Reveal } from "@/components/neo";
import { AskAI } from "@/components/ask-ai";
import { KIND_LABEL, identityOf } from "@/lib/book-identity";

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

  const identity = identityOf(book.id);
  const sections = book.chapters.reduce((n, c) => n + c.sections.length, 0);
  const title = book.meta.title.he?.trim() || book.meta.title.en;

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6">
      <Reveal>
        <PageHeader
          icon={<BookOpen className="size-5" />}
          eyebrow="הספרייה הדיגיטלית"
          title={title}
          tint={identity?.accent}
        >
          {book.meta.title.he && (
            <p className="text-[0.8125rem] text-ink-3">{book.meta.title.en}</p>
          )}
        </PageHeader>
      </Reveal>

      <Reveal delay={60}>
        <div className="mb-6 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[0.75rem] text-ink-3">
          <span className="inline-flex items-center gap-1.5">
            <span className="size-2 rounded-full" style={{ background: identity?.accent }} aria-hidden />
            {book.meta.module}
          </span>
          <span className="inline-flex items-center gap-1.5">
            {book.meta.structure === "catalogue" ? <Layers className="size-3.5" /> : <BookOpen className="size-3.5" />}
            {book.chapters.length} פרקים
          </span>
          <span className="inline-flex items-center gap-1.5"><FileText className="size-3.5" />{sections.toLocaleString("he-IL")} סעיפים</span>
          {book.meta.pages != null && <span>{book.meta.pages} עמודים</span>}
          {identity && <span>{KIND_LABEL[identity.kind]}</span>}
          {book.meta.publisher && <span>{book.meta.publisher}</span>}
        </div>
      </Reveal>

      <Reveal delay={120}>
        <BookView book={book} />
      </Reveal>

      {/* Every book surface carries Ask AI, scoped to the book being read. */}
      <AskAI bookId={book.id} />
    </main>
  );
}
