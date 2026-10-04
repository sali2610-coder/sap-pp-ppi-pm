// Project NEO · /neo/ecc-s4/<slug>/ — one record, at its legacy address under /neo/.
import "@/app/neo/ui.css";
import "@/app/neo/centers.css";
import "@/app/neo/records.css";
import { notFound } from "next/navigation";
import { RecordPage } from "@/components/neo-shell/records/kit";
import { eccS4Params, eccS4Record } from "@/components/neo-shell/records/ecc-s4";

export const dynamicParams = false;
export function generateStaticParams() {
  return eccS4Params().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const r = eccS4Record(decodeURIComponent(slug));
  return {
    title: r ? `${r.title} · Project NEO` : "השוואת ECC מול S/4HANA · Project NEO",
    description: r?.description,
    robots: { index: false, follow: false },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const r = eccS4Record(decodeURIComponent(slug));
  if (!r) notFound();
  return <RecordPage head={r.head} blocks={r.blocks} foot={r.foot} />;
}
