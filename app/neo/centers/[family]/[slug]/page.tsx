import "@/app/neo/ui.css";
import "@/app/neo/centers.css";
import { notFound } from "next/navigation";
import { allCenterParams, centerItem } from "@/components/neo-shell/centers/centers-data";
import { CenterDetailView } from "@/components/neo-shell/centers/centers-view";

export const dynamicParams = false;
export function generateStaticParams() {
  return allCenterParams();
}

export async function generateMetadata({ params }: { params: Promise<{ family: string; slug: string }> }) {
  const { family, slug } = await params;
  const hit = centerItem(family, slug);
  return {
    title: hit ? `${hit.item.he} · ${hit.fam.he} · Project NEO` : "נושא · מרכזי ידע · Project NEO",
    description: hit?.item.sub,
    robots: { index: false, follow: false },
  };
}

export default async function Page({ params }: { params: Promise<{ family: string; slug: string }> }) {
  const { family, slug } = await params;
  const hit = centerItem(family, slug);
  if (!hit) notFound();
  return <CenterDetailView fam={hit.fam} item={hit.item} />;
}
