/* ============================================================================
   PROJECT NEO · /neo/academy/<courseId>/<slug>/ — one lesson, read inside NEO.
   ----------------------------------------------------------------------------
   §4. The academy's block engine keeps its own route, because it IS its own
   thing: 23 typed block kinds and a completion rule of its own, which is not
   what NEO's book reader reads. What changes is that the route now exists
   INSIDE Project NEO — same shell, same rail, same return, same controls — so
   opening a lesson from /neo/academy/ no longer drops the reader out of the
   product.

   NOTHING IS FORKED. The lesson body comes from data/academy/lessons through
   the same registry, the order from lib/academy/lesson-types#orderedBlocks, the
   position from lib/academy/model, the progress from lib/academy/store. The
   pre-existing route app/academy/lesson/[slug]/ is untouched, still generated,
   still linked from /academy/, and still holds the features that belong to it
   (celebrations, the academy dashboard, the reset dialog).

   Statically exported over the model's own (course, lesson) pairs, gated on the
   lesson genuinely being authored — the same gate the course screen puts on its
   own links, so scripts/crawl-dead-links.mjs cannot find a row that opens
   nothing.
   ========================================================================== */

import { notFound } from "next/navigation";
import "@/app/neo/ui.css";
import "@/app/neo/learn.css";
import { neoLessonData, neoLessonParams } from "@/components/neo-shell/learn/lesson-data";
import { NeoLessonView } from "@/components/neo-shell/learn/lesson-view";

export const dynamicParams = false;

export function generateStaticParams() {
  return neoLessonParams();
}

export async function generateMetadata({ params }: { params: Promise<{ courseId: string; slug: string }> }) {
  const { courseId, slug } = await params;
  const d = neoLessonData(courseId, slug);
  if (!d) return { title: "שיעור · Project NEO", robots: { index: false, follow: false } };
  return {
    title: `${d.lesson.title} · ${d.course.title} · Project NEO`,
    description: `${d.lesson.title}: פרק ${d.place.chapterIndex}, ${d.place.chapterTitle}.`,
    robots: { index: false, follow: false },
  };
}

export default async function NeoLesson({ params }: { params: Promise<{ courseId: string; slug: string }> }) {
  const { courseId, slug } = await params;
  const d = neoLessonData(courseId, slug);
  if (!d) notFound();
  return <NeoLessonView d={d} />;
}
