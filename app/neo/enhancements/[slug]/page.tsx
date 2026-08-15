// Project NEO · /neo/enhancements/<SLUG>/ — one page per enhancement technique.
import "@/app/neo/ui.css";
import "@/app/neo/data.css";
import "@/app/neo/reference.css";
import { notFound } from "next/navigation";
import { RefDetailView } from "@/components/neo-shell/reference/ref-detail-view";
import { enhDetail, enhSlugs } from "@/components/neo-shell/reference/enh-data";

export const dynamicParams = false;

export function generateStaticParams() {
  return enhSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const d = enhDetail(decodeURIComponent(slug));
  if (!d) return { title: "טכניקת הרחבה · Project NEO", robots: { index: false, follow: false } };
  return {
    title: `${d.code} · ${d.he || "טכניקת הרחבה"} · Project NEO`,
    description: [d.code, d.he, d.s4.headline].filter(Boolean).join(" · "),
    robots: { index: false, follow: false },
  };
}

export default async function NeoEnhancementRecord({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const d = enhDetail(decodeURIComponent(slug));
  if (!d) notFound();
  return <RefDetailView d={d} />;
}
