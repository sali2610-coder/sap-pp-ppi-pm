// Project NEO · /neo/academy/<courseId>/ — one page per authored course.
import "@/app/neo/ui.css";
import "@/app/neo/learn.css";
import "@/app/neo/learn-extensions.css";
// the catalogs' kit and the record language, then the academy's own sheet last
import "@/app/neo/data.css";
import "@/app/neo/record.css";
import "@/app/neo/academy-experience.css";
import { notFound } from "next/navigation";
import { SourceIndex } from "@/components/neo-shell/learn/source-index";
import { lessonSource, sourceBook, sourceIndex } from "@/components/neo-shell/learn/source-data";
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
    description: `${c.title}: ${c.totals.chapters} פרקים, ${c.totals.lessons} שיעורים.`,
    robots: { index: false, follow: false },
  };
}

export default async function NeoCourse({ params }: { params: Promise<{ courseId: string }> }) {
  const { courseId } = await params;
  const c = academyCourse(courseId);
  if (!c) notFound();
  const chapters = sourceIndex(courseId);
  // Each lesson's source topic, only where source-data pairs one exactly.
  const sources: Record<string, { title: string; href: string }> = {};
  for (const l of c.chapters.flatMap((ch) => ch.lessons)) {
    const s = lessonSource(courseId, l.slug);
    if (s) sources[l.slug] = { title: s.title, href: s.href };
  }
  return (
    <CourseView
      c={c}
      sources={sources}
      materials={{ chapters: chapters.length, topics: chapters.reduce((a, ch) => a + ch.rows.length, 0) }}
      source={<SourceIndex title={sourceBook(courseId)?.titleHe ?? c.title} chapters={chapters} />}
    />
  );
}
