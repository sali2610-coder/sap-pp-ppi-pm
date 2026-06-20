import { LearnPathView } from "@/components/learn-path";
import { LEARN_PATHS } from "@/data/learn/paths";

export function generateStaticParams() {
  return Object.keys(LEARN_PATHS).map((module) => ({ module }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ module: string }> }) {
  const { module } = await params;
  const p = LEARN_PATHS[module];
  return { title: p ? `${p.he} · למידה · NEO` : "למידה · NEO" };
}

export default async function LearnModulePage({ params }: { params: Promise<{ module: string }> }) {
  const { module } = await params;
  return <LearnPathView module={module} />;
}
