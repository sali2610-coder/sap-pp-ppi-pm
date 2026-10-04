// Project NEO · /neo/academy/<courseId>/textbook/ — the course's academy textbook.
import "@/app/neo/ui.css";
import "@/app/neo/learn.css";
import { notFound } from "next/navigation";
import { TextbookHomeView } from "@/components/neo-shell/academy-ref/textbook-home";
import { sortedChapters, textbookCourseIds, textbookMeta, textbookOfCourse } from "@/components/neo-shell/academy-ref/textbook-data";

export const dynamicParams = false;

export function generateStaticParams() {
  return textbookCourseIds().map((courseId) => ({ courseId }));
}

export async function generateMetadata({ params }: { params: Promise<{ courseId: string }> }) {
  const { courseId } = await params;
  const b = textbookOfCourse(courseId);
  return {
    title: b ? `${b.titleHe} · ספר לימוד · Project NEO` : "ספר לימוד · Project NEO",
    description: b ? `${b.titleHe} (${b.titleEn}): פרקי ספר הלימוד, אינדקס ודוח איכות.` : undefined,
    robots: { index: false, follow: false },
  };
}

export default async function NeoTextbook({ params }: { params: Promise<{ courseId: string }> }) {
  const { courseId } = await params;
  const b = textbookOfCourse(courseId);
  if (!b) notFound();
  return <TextbookHomeView book={textbookMeta(b)} chapters={sortedChapters(b)} />;
}
