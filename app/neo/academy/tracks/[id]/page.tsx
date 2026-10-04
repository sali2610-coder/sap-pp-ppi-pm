// Project NEO · /neo/academy/tracks/<id>/ — one learning track, every unit in order.
import "@/app/neo/ui.css";
import "@/app/neo/learn.css";
import { notFound } from "next/navigation";
import { TrackView } from "@/components/neo-shell/academy-ref/tracks-view";
import { trackIds, trackPage } from "@/components/neo-shell/academy-ref/tracks-data";

export const dynamicParams = false;

export function generateStaticParams() {
  return trackIds().map((id) => ({ id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const t = trackPage(id);
  return {
    title: t ? `${t.he} · מסלולי למידה · Project NEO` : "מסלול למידה · Project NEO",
    description: t ? `${t.he}: ${t.sub}. ${t.units} יחידות.` : undefined,
    robots: { index: false, follow: false },
  };
}

export default async function NeoTrack({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const t = trackPage(id);
  if (!t) notFound();
  return <TrackView t={t} />;
}
