import { notFound } from "next/navigation";
import "@/app/neo/ui.css";
import "@/app/neo/domain.css";
import { domainSlugs, domainView } from "@/components/neo-shell/domain/domain-data";
import { DomainDetailView } from "@/components/neo-shell/domain/domain-view";

// One page per entry in data/domains.ts — the same list the legacy
// app/domain/[slug] generates from, so nothing is selected, sampled or ranked
// on the way in. 39 in, 39 out.
export const dynamicParams = false;

export function generateStaticParams() {
  return domainSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const v = domainView(slug);
  return {
    title: v ? `${v.he} · תחום ${v.module} · Project NEO` : "תחום עסקי · Project NEO",
    description: v?.summary || undefined,
    robots: { index: false, follow: false },
  };
}

export default async function NeoDomain({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const v = domainView(slug);
  if (!v) notFound();
  return <DomainDetailView v={v} />;
}
