// Project NEO · /neo/academy/<courseId>/textbook/reference/ — a textbook's reference index.
import "@/app/neo/ui.css";
import "@/app/neo/learn.css";
import { notFound } from "next/navigation";
import { TextbookReferenceView } from "@/components/neo-shell/academy-ref/textbook-reference";
import { referencePage, textbookCourseIds, textbookOfCourse } from "@/components/neo-shell/academy-ref/textbook-data";

export const dynamicParams = false;

export function generateStaticParams() {
  return textbookCourseIds().map((courseId) => ({ courseId }));
}

export async function generateMetadata({ params }: { params: Promise<{ courseId: string }> }) {
  const { courseId } = await params;
  const b = textbookOfCourse(courseId);
  return {
    title: b ? `${b.module} · אינדקס מקצועי · Project NEO` : "אינדקס מקצועי · Project NEO",
    robots: { index: false, follow: false },
  };
}

export default async function NeoTextbookReference({ params }: { params: Promise<{ courseId: string }> }) {
  const { courseId } = await params;
  const d = referencePage(courseId);
  if (!d) notFound();
  return <TextbookReferenceView d={d} />;
}
