// Project NEO · /neo/academy/<courseId>/ — one page per authored course.
import "@/app/neo/ui.css";
import "@/app/neo/learn.css";
import { notFound } from "next/navigation";
import { CourseView } from "@/components/neo-shell/learn/course-view";
import { academyCourse, academyCourseIds } from "@/components/neo-shell/learn/academy-data";

// Static export: every authored course becomes a real file, and
// `dynamicParams = false` makes anything outside that list a build-time 404.
// The directory can only link at ids this list generated, so
// scripts/crawl-dead-links.mjs cannot find a card that opens nothing.
export const dynamicParams = false;

export function generateStaticParams() {
  return academyCourseIds().map((courseId) => ({ courseId }));
}

export async function generateMetadata({ params }: { params: Promise<{ courseId: string }> }) {
  const { courseId } = await params;
  const c = academyCourse(courseId);
  if (!c) return { title: "קורס · Project NEO", robots: { index: false, follow: false } };
  return {
    title: `${c.title} · ${c.module} · Project NEO`,
    description: `${c.title} — ${c.totals.chapters} פרקים, ${c.totals.lessons} שיעורים.`,
    robots: { index: false, follow: false },
  };
}

export default async function NeoCourse({ params }: { params: Promise<{ courseId: string }> }) {
  const { courseId } = await params;
  const c = academyCourse(courseId);
  if (!c) notFound();
  return <CourseView c={c} />;
}
