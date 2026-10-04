// Project NEO · /neo/workbench/<slug>/ — one consultant workbench, at its old address.
import "@/app/neo/ui.css";
import "@/app/neo/centers.css";
import "@/app/neo/tools.css";
import { notFound } from "next/navigation";
import { WORKBENCHES, workbenchBySlug } from "@/data/workbenches";
import { WorkbenchDetail } from "@/components/neo-shell/tools/workbench-view";

export const dynamicParams = false;
export function generateStaticParams() {
  return WORKBENCHES.map((w) => ({ slug: w.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const w = workbenchBySlug(slug);
  return {
    title: w ? `${w.he} · Project NEO` : "שולחן עבודה · Project NEO",
    description: w?.intro.slice(0, 180),
    robots: { index: false, follow: false },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const w = workbenchBySlug(slug);
  if (!w) notFound();
  return <WorkbenchDetail w={w} />;
}
