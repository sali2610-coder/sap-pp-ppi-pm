// Project NEO · /neo/best-practices/<slug>/ — one page per practice.
import "@/app/neo/ui.css";
import "@/app/neo/data.css";
import "@/app/neo/reference.css";
import "@/app/neo/best-practices.css";
import { notFound } from "next/navigation";
import { BpDetailView } from "@/components/neo-shell/best-practices/bp-view";
import { bpDetail, bpSlugs } from "@/components/neo-shell/best-practices/bp-data";

// Static export: every practice in the registry becomes a real file, and
// `dynamicParams = false` makes anything outside that list a build-time 404.
// The surface can only link at slugs this list generated, so
// scripts/crawl-dead-links.mjs cannot find a row that opens nothing.
export const dynamicParams = false;

export function generateStaticParams() {
  return bpSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const d = bpDetail(decodeURIComponent(slug));
  if (!d) return { title: "שיטת עבודה · Project NEO", robots: { index: false, follow: false } };
  return {
    // Assembled from record fields only. Nothing is written here that is not
    // already on the page.
    title: `${d.he} · שיטות עבודה מומלצות · Project NEO`,
    description: [d.he, d.en, d.summary].filter(Boolean).join(" · ").slice(0, 180),
    robots: { index: false, follow: false },
  };
}

export default async function NeoBestPractice({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const d = bpDetail(decodeURIComponent(slug));
  if (!d) notFound();
  return <BpDetailView d={d} />;
}
