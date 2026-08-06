import { LearningPathView } from "@/components/academy/learning-path";
// PM/PP/QM come straight from the React-free source, NOT via the client
// component that re-exports them. `learning-path.tsx` is "use client", so
// Next replaces it with a client-reference proxy when a server function
// imports through it — `generateMetadata` and the JSON-LD builder then read
// `undefined` off the proxy. That shipped `<title>מסלול undefined</title>`
// and a Course schema with 0 chapters on /academy/path/{pm,pp-pi,qm}, while
// the other five modules (imported directly from data/) were correct.
import { PM_PATH, PP_PATH, QM_PATH, type LearningPath } from "@/lib/academy/paths";
import { PMU_PATH } from "@/data/academy/lessons/pmu-generated";
import { MM_PATH } from "@/data/academy/lessons/mm-generated";
import { WM_PATH } from "@/data/academy/lessons/wm-generated";
import { PPDS_PATH } from "@/data/academy/lessons/ppds-generated";
import { SOP_PATH } from "@/data/academy/lessons/sop-generated";
import { jsonLdScript } from "@/lib/json-ld";

const PATHS: Record<string, LearningPath> = { pm: PM_PATH, "pp-pi": PP_PATH, qm: QM_PATH, "pm-user": PMU_PATH, mm: MM_PATH, wm: WM_PATH, "pp-ds": PPDS_PATH, sop: SOP_PATH };
const SITE = "https://sapbysali.app";

export function generateStaticParams() { return Object.keys(PATHS).map((module) => ({ module })); }
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ module: string }> }): Promise<import("next").Metadata> {
  const { module } = await params;
  const p = PATHS[module];
  return {
    title: p ? `מסלול ${p.title} · SAP Academy` : "SAP Academy",
    description: p ? `מסלול למידה מובנה ל-${p.title} (${p.module}) — ${(p.chapters || []).length} פרקים, ${(p.chapters || []).reduce((s, c) => s + (c.lessons || []).length, 0)} שיעורים ב-SAP Academy.` : undefined,
    alternates: { canonical: `/academy/path/${module}/` },
  };
}

/** Course + BreadcrumbList structured data (Rich Results). */
function pathJsonLd(module: string, p: LearningPath) {
  const chapters = p.chapters || [];
  const lessons = chapters.reduce((s, c) => s + (c.lessons || []).length, 0);
  const course = {
    "@context": "https://schema.org", "@type": "Course",
    name: p.title, url: `${SITE}/academy/path/${module}/`, inLanguage: "he",
    description: `מסלול למידה ל-${p.title} (${p.module}) — ${chapters.length} פרקים · ${lessons} שיעורים.`,
    provider: { "@type": "Organization", name: "SAP by Sali", url: SITE },
    educationalLevel: "Professional", isAccessibleForFree: true,
    numberOfCredits: lessons,
    hasCourseInstance: { "@type": "CourseInstance", courseMode: "online", courseWorkload: `PT${lessons * 10}M` },
    syllabusSections: chapters.map((c, i) => ({ "@type": "Syllabus", name: `פרק ${i + 1}: ${c.title}`, timeRequired: `PT${(c.lessons || []).reduce((s, l) => s + (l.minutes || 0), 0)}M` })),
  };
  const breadcrumb = {
    "@context": "https://schema.org", "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "SAP Academy", item: `${SITE}/academy/` },
      { "@type": "ListItem", position: 2, name: p.title, item: `${SITE}/academy/path/${module}/` },
    ],
  };
  return [course, breadcrumb];
}

export default async function PathPage({ params }: { params: Promise<{ module: string }> }) {
  const { module } = await params;
  const path = PATHS[module];
  if (!path) return <div className="py-20 text-center text-sm text-ink-3" dir="rtl">המסלול לא נמצא.</div>;
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(pathJsonLd(module, path)) }} />
      <LearningPathView path={path} />
    </>
  );
}
