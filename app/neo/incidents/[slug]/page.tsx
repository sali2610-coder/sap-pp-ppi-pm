// Project NEO · /neo/incidents/<slug>/ — one page per catalogued incident.
import "@/app/neo/ui.css";
import "@/app/neo/learn.css";
import { notFound } from "next/navigation";
import { IncidentView } from "@/components/neo-shell/learn/incident-view";
import { incidentDetail, incidentSlugs } from "@/components/neo-shell/learn/incidents-data";

// Static export: every catalogued incident becomes a real file, and
// `dynamicParams = false` makes anything outside that list a build-time 404.
// The directory can only link at slugs this list generated, so
// scripts/crawl-dead-links.mjs cannot find a row that opens nothing.
export const dynamicParams = false;

export function generateStaticParams() {
  return incidentSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const r = incidentDetail(slug);
  if (!r) return { title: "תקלה · Project NEO", robots: { index: false, follow: false } };
  return {
    // Assembled from record fields only. Nothing is written here that is not
    // already on the page.
    title: `${r.he} · ${r.module} · Project NEO`,
    description: [r.he, r.module, r.symptom].filter(Boolean).join(" · ").slice(0, 180),
    robots: { index: false, follow: false },
  };
}

export default async function NeoIncident({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const r = incidentDetail(slug);
  if (!r) notFound();
  return <IncidentView r={r} />;
}
