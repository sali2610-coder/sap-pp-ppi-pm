// Project NEO · /neo/knowledge/<slug>/ — one page per authored concept.
import "@/app/neo/ui.css";
import "@/app/neo/learn.css";
import { notFound } from "next/navigation";
import { ConceptView } from "@/components/neo-shell/learn/concept-view";
import { conceptDetail, conceptSlugs } from "@/components/neo-shell/learn/knowledge-data";

// Static export: every concept in the source becomes a real file, and
// `dynamicParams = false` makes anything outside that list a build-time 404
// rather than a runtime one. It is also what keeps the directory honest — the
// surface can only link at slugs this list generated, so
// scripts/crawl-dead-links.mjs cannot find a card that opens nothing.
export const dynamicParams = false;

export function generateStaticParams() {
  return conceptSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = conceptDetail(slug);
  if (!c) return { title: "מושג · Project NEO", robots: { index: false, follow: false } };
  return {
    // Assembled from source fields only. Nothing is written here that is not
    // already on the page.
    title: `${c.he} · ${c.title} · Project NEO`,
    description: [c.he, c.title, c.groupHe, c.biz].filter(Boolean).join(" · ").slice(0, 180),
    robots: { index: false, follow: false },
  };
}

export default async function NeoConcept({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = conceptDetail(slug);
  if (!c) notFound();
  return <ConceptView c={c} />;
}
