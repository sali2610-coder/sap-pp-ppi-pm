import { LearningPathView, PM_PATH, PP_PATH, type LearningPath } from "@/components/academy/learning-path";

const PATHS: Record<string, LearningPath> = { pm: PM_PATH, "pp-pi": PP_PATH };

export function generateStaticParams() { return Object.keys(PATHS).map((module) => ({ module })); }
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ module: string }> }): Promise<import("next").Metadata> {
  const { module } = await params;
  const p = PATHS[module];
  return { title: p ? `מסלול ${p.title} · SAP Academy` : "SAP Academy" };
}

export default async function PathPage({ params }: { params: Promise<{ module: string }> }) {
  const { module } = await params;
  const path = PATHS[module];
  if (!path) return <div className="py-20 text-center text-sm text-ink-3" dir="rtl">המסלול לא נמצא.</div>;
  return <LearningPathView path={path} />;
}
