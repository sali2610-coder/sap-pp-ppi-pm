// Project NEO · /neo/academy/<courseId>/textbook/quality/ — a textbook's quality report.
import "@/app/neo/ui.css";
import "@/app/neo/learn.css";
import { notFound } from "next/navigation";
import { TextbookQualityView } from "@/components/neo-shell/academy-ref/textbook-quality";
import { structuralOf, textbookCourseIds, textbookMeta, textbookOfCourse } from "@/components/neo-shell/academy-ref/textbook-data";

export const dynamicParams = false;

export function generateStaticParams() {
  return textbookCourseIds().map((courseId) => ({ courseId }));
}

export async function generateMetadata({ params }: { params: Promise<{ courseId: string }> }) {
  const { courseId } = await params;
  const b = textbookOfCourse(courseId);
  return {
    title: b ? `${b.module} · דוח איכות · Project NEO` : "דוח איכות · Project NEO",
    robots: { index: false, follow: false },
  };
}

export default async function NeoTextbookQuality({ params }: { params: Promise<{ courseId: string }> }) {
  const { courseId } = await params;
  const b = textbookOfCourse(courseId);
  if (!b) notFound();
  return <TextbookQualityView book={textbookMeta(b)} structural={structuralOf(courseId)} />;
}
