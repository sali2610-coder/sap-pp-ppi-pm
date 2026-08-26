import { notFound } from "next/navigation";
import "@/app/neo/ui.css";
import "../../books.css";
import { bookHubData, bookIds } from "@/components/neo-shell/books/books-data";
import { BookHub } from "@/components/neo-shell/books/book-hub";

// THE BOOK HUB ROUTE.
//
// One statically exported page per book, generated from the registry's own id
// list — the same list the shelf is built from, so a card can never link to a
// page that was not generated (scripts/crawl-dead-links.mjs exits 1 on the
// first internal href in out/ with nothing behind it).
//
// Per-book on purpose. The eleven books hold 4,314 subchapters between them and
// book7 alone is 1,689; a single page carrying all of them would put every other
// book's table of contents into the one you asked for.
export const dynamicParams = false;

export function generateStaticParams() {
  return bookIds().map((bookId) => ({ bookId }));
}

export async function generateMetadata({ params }: { params: Promise<{ bookId: string }> }) {
  const { bookId } = await params;
  const d = bookHubData(bookId);
  return {
    title: d ? `${d.book.titleHe || d.book.titleEn} · מרכז הספר · Project NEO` : "מרכז הספר · Project NEO",
    description: d
      ? `${d.book.chapters} פרקים ו-${d.book.sections} תת-פרקים, והדרך אל הקורא הקיים של Project NEO.`
      : undefined,
    robots: { index: false, follow: false },
  };
}

export default async function NeoBookHub({ params }: { params: Promise<{ bookId: string }> }) {
  const { bookId } = await params;
  const d = bookHubData(bookId);
  if (!d) notFound();
  return <BookHub d={d} />;
}
