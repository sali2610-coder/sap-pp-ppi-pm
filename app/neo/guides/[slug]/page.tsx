// Project NEO · /neo/guides/<slug>/ — one record, at its legacy address under /neo/.
import "@/app/neo/ui.css";
import "@/app/neo/centers.css";
import "@/app/neo/records.css";
import { notFound } from "next/navigation";
import { RecordPage } from "@/components/neo-shell/records/kit";
import { guideParams, guideRecord } from "@/components/neo-shell/records/guides";

export const dynamicParams = false;
export function generateStaticParams() {
  return guideParams().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const r = guideRecord(decodeURIComponent(slug));
  return {
    title: r ? `${r.title} · Project NEO` : "מדריך תהליך · Project NEO",
    description: r?.description,
    robots: { index: false, follow: false },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const r = guideRecord(decodeURIComponent(slug));
  if (!r) notFound();
  return <RecordPage head={r.head} blocks={r.blocks} foot={r.foot} />;
}
