// Project NEO · /neo/cds/<VIEW>/ — one page per mapped CDS view.
import "@/app/neo/ui.css";
import "@/app/neo/data.css";
import "@/app/neo/reference.css";
import { notFound } from "next/navigation";
import { RefDetailView } from "@/components/neo-shell/reference/ref-detail-view";
import { cdsDetail, cdsNames } from "@/components/neo-shell/reference/cds-data";

export const dynamicParams = false;

export function generateStaticParams() {
  return cdsNames().map((view) => ({ view }));
}

export async function generateMetadata({ params }: { params: Promise<{ view: string }> }) {
  const { view } = await params;
  const d = cdsDetail(decodeURIComponent(view));
  if (!d) return { title: "תצוגת CDS · Project NEO", robots: { index: false, follow: false } };
  return {
    title: `${d.code} · ${d.he || "תצוגת CDS"} · Project NEO`,
    description: [d.code, d.he, d.mod, d.s4.headline].filter(Boolean).join(" · "),
    robots: { index: false, follow: false },
  };
}

export default async function NeoCdsRecord({ params }: { params: Promise<{ view: string }> }) {
  const { view } = await params;
  const d = cdsDetail(decodeURIComponent(view));
  if (!d) notFound();
  return <RefDetailView d={d} />;
}
