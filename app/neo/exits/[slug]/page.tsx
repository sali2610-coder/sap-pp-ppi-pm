// Project NEO · /neo/exits/<slug>/ — one named exit or BAdI, at its legacy address.
import "@/app/neo/ui.css";
import "@/app/neo/centers.css";
import "@/app/neo/records.css";
import { notFound } from "next/navigation";
import { RecordPage } from "@/components/neo-shell/records/kit";
import { exitParams, exitRecord } from "@/components/neo-shell/records/exits";

export const dynamicParams = false;
export function generateStaticParams() {
  return exitParams().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const r = exitRecord(decodeURIComponent(slug));
  return {
    title: r ? `${r.title} · Project NEO` : "הרחבה · Project NEO",
    description: r?.description,
    robots: { index: false, follow: false },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const r = exitRecord(decodeURIComponent(slug));
  if (!r) notFound();
  return <RecordPage head={r.head} blocks={r.blocks} foot={r.foot} />;
}
