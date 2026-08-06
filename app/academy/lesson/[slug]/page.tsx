import { ALL_LESSONS } from "@/data/academy/lessons";
import { LessonView } from "@/components/academy/lesson-view";
import { getLesson } from "@/lib/academy/model";
import type { Lesson } from "@/lib/academy/lesson-types";
import { jsonLdScript } from "@/lib/json-ld";

const SITE = "https://sapbysali.app";

export function generateStaticParams() { return Object.keys(ALL_LESSONS).map((slug) => ({ slug })); }
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<import("next").Metadata> {
  const { slug } = await params;
  const l = ALL_LESSONS[slug];
  const title = l ? `${l.title} — SAP Academy` : "SAP Academy";
  return {
    title,
    description: l ? `${l.title} · ${l.course} · ${l.module} — שיעור מובנה במנוע הבלוקים של SAP Academy.` : undefined,
    alternates: { canonical: `/academy/lesson/${slug}/` },
  };
}

/** LearningResource + BreadcrumbList structured data (Rich Results). */
function lessonJsonLd(slug: string, l: Lesson) {
  const m = getLesson(slug);
  const url = `${SITE}/academy/lesson/${slug}/`;
  const learningResource = {
    "@context": "https://schema.org", "@type": "LearningResource",
    name: l.title, url, inLanguage: "he",
    learningResourceType: "Lesson",
    educationalLevel: l.level,
    timeRequired: `PT${l.minutes || 10}M`,
    teaches: l.course,
    isPartOf: { "@type": "Course", name: l.course, provider: { "@type": "Organization", name: "SAP by Sali", url: SITE } },
    provider: { "@type": "Organization", name: "SAP by Sali", url: SITE },
    isAccessibleForFree: true,
  };
  const crumbs = m
    ? [
        { "@type": "ListItem", position: 1, name: "SAP Academy", item: `${SITE}/academy/` },
        { "@type": "ListItem", position: 2, name: m.module, item: `${SITE}/academy/path/${m.moduleId}/` },
        { "@type": "ListItem", position: 3, name: m.chapterTitle },
        { "@type": "ListItem", position: 4, name: l.title, item: url },
      ]
    : [
        { "@type": "ListItem", position: 1, name: "SAP Academy", item: `${SITE}/academy/` },
        { "@type": "ListItem", position: 2, name: l.title, item: url },
      ];
  const breadcrumb = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: crumbs };
  return [learningResource, breadcrumb];
}

export default async function LessonPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const lesson = ALL_LESSONS[slug];
  if (!lesson) return <div className="py-20 text-center text-sm text-ink-3" dir="rtl">השיעור לא נמצא.</div>;
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(lessonJsonLd(slug, lesson)) }} />
      <LessonView lesson={lesson} />
    </>
  );
}
