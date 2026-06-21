import { ImpactCenter } from "@/components/impact-center";
import { allImpactNames } from "@/lib/impact";

export function generateStaticParams() {
  return allImpactNames().map((name) => ({ name }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ name: string }> }) {
  const { name } = await params;
  return { title: `${decodeURIComponent(name)} · ניתוח השפעה · NEO` };
}

export default async function ImpactObjectPage({ params }: { params: Promise<{ name: string }> }) {
  const { name } = await params;
  return <ImpactCenter name={decodeURIComponent(name)} />;
}
