import { ALL_LESSONS } from "@/data/academy/lessons";
import { LessonView } from "@/components/academy/lesson-view";

export function generateStaticParams() { return Object.keys(ALL_LESSONS).map((slug) => ({ slug })); }
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<import("next").Metadata> {
  const { slug } = await params;
  const l = ALL_LESSONS[slug];
  const title = l ? `${l.title} — SAP Academy` : "SAP Academy";
  return { title, description: l ? `${l.title} · ${l.course} · ${l.module} — שיעור מובנה במנוע הבלוקים של SAP Academy.` : undefined };
}

export default async function LessonPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const lesson = ALL_LESSONS[slug];
  if (!lesson) return <div className="py-20 text-center text-sm text-ink-3" dir="rtl">השיעור לא נמצא.</div>;
  return <LessonView lesson={lesson} />;
}
