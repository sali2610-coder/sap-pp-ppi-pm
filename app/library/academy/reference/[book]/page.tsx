import { notFound } from "next/navigation";
import { BOOKS, bookById } from "@/data/library/academy-index";
import { AcademyReference } from "@/components/academy-reference";

export const dynamicParams = false;
export function generateStaticParams() {
  return BOOKS.map((b) => ({ book: b.id }));
}
export async function generateMetadata({ params }: { params: Promise<{ book: string }> }) {
  const { book } = await params;
  const b = bookById(book);
  return { title: b ? `${b.module} Reference Index · NEO Academy` : "Reference" };
}
export default async function ReferencePage({ params }: { params: Promise<{ book: string }> }) {
  const { book } = await params;
  if (!bookById(book)) notFound();
  return <AcademyReference bookId={book} />;
}
