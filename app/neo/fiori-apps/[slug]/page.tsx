// Project NEO · /neo/fiori-apps/<SLUG>/ — one page per documented Fiori app.
import "@/app/neo/ui.css";
import "@/app/neo/data.css";
import "@/app/neo/reference.css";
import { notFound } from "next/navigation";
import { RefDetailView } from "@/components/neo-shell/reference/ref-detail-view";
import { fioriDetail, fioriSlugs } from "@/components/neo-shell/reference/fiori-data";

export const dynamicParams = false;

export function generateStaticParams() {
  return fioriSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const d = fioriDetail(decodeURIComponent(slug));
  if (!d) return { title: "יישום Fiori · Project NEO", robots: { index: false, follow: false } };
  return {
    title: `${d.code} · ${d.he || "יישום Fiori"} · Project NEO`,
    description: [d.code, d.he, d.en, d.mod, d.s4.headline].filter(Boolean).join(" · "),
    robots: { index: false, follow: false },
  };
}

export default async function NeoFioriRecord({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const d = fioriDetail(decodeURIComponent(slug));
  if (!d) notFound();
  return <RefDetailView d={d} />;
}
