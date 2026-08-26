// Project NEO · /neo/idoc/<NAME>/ — one page per documented IDoc message type.
import "@/app/neo/ui.css";
import "@/app/neo/data.css";
import "@/app/neo/reference.css";
import { notFound } from "next/navigation";
import { RefDetailView } from "@/components/neo-shell/reference/ref-detail-view";
import { idocDetail, idocNames } from "@/components/neo-shell/reference/idoc-data";

export const dynamicParams = false;

export function generateStaticParams() {
  return idocNames().map((name) => ({ name }));
}

export async function generateMetadata({ params }: { params: Promise<{ name: string }> }) {
  const { name } = await params;
  const d = idocDetail(decodeURIComponent(name));
  if (!d) return { title: "IDoc · Project NEO", robots: { index: false, follow: false } };
  return {
    title: `${d.code} · ${d.he || "סוג הודעת IDoc"} · Project NEO`,
    description: [d.code, d.he, d.mod, d.s4.headline].filter(Boolean).join(" · "),
    robots: { index: false, follow: false },
  };
}

export default async function NeoIdocRecord({ params }: { params: Promise<{ name: string }> }) {
  const { name } = await params;
  const d = idocDetail(decodeURIComponent(name));
  if (!d) notFound();
  return <RefDetailView d={d} />;
}
