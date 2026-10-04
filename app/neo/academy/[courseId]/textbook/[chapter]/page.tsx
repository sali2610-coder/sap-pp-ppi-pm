// Project NEO · /neo/academy/<courseId>/textbook/chapter-NN/ — one textbook chapter.
import "@/app/neo/ui.css";
import "@/app/neo/learn.css";
import { notFound } from "next/navigation";
import { TextbookChapterView } from "@/components/neo-shell/academy-ref/textbook-chapter";
import { chapterPage, chapterParams } from "@/components/neo-shell/academy-ref/textbook-data";

export const dynamicParams = false;

export function generateStaticParams() {
  return chapterParams();
}

export async function generateMetadata({ params }: { params: Promise<{ courseId: string; chapter: string }> }) {
  const { courseId, chapter } = await params;
  const d = chapterPage(courseId, chapter);
  return {
    title: d ? `${d.chapter.titleHe} · ${d.book.titleHe} · Project NEO` : "פרק · ספר לימוד · Project NEO",
    description: d ? `פרק ${d.chapter.n}: ${d.chapter.titleHe} (${d.chapter.titleEn}).` : undefined,
    robots: { index: false, follow: false },
  };
}

export default async function NeoTextbookChapter({ params }: { params: Promise<{ courseId: string; chapter: string }> }) {
  const { courseId, chapter } = await params;
  const d = chapterPage(courseId, chapter);
  if (!d) notFound();
  return <TextbookChapterView d={d} />;
}
