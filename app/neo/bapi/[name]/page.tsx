// Project NEO · /neo/bapi/<NAME>/ — one page per canonical function object.
import "@/app/neo/ui.css";
import "@/app/neo/data.css";
import "@/app/neo/reference.css";
import { notFound } from "next/navigation";
import { RefDetailView } from "@/components/neo-shell/reference/ref-detail-view";
import { bapiDetail, bapiIds } from "@/components/neo-shell/reference/bapi-data";

// Static export: every id in the canonical registry becomes a real file, and
// `dynamicParams = false` makes anything outside it a build-time 404 rather than
// a runtime one. It is also what keeps the directory honest — the surface can
// only link at ids this list generated, so scripts/crawl-dead-links.mjs cannot
// find a row that opens nothing.
export const dynamicParams = false;

export function generateStaticParams() {
  return bapiIds().map((name) => ({ name }));
}

export async function generateMetadata({ params }: { params: Promise<{ name: string }> }) {
  const { name } = await params;
  const d = bapiDetail(decodeURIComponent(name));
  if (!d) return { title: "אובייקט פונקציה · Project NEO", robots: { index: false, follow: false } };
  return {
    // Assembled from record fields only. Nothing is written here that is not
    // already on the page.
    title: `${d.code} · ${d.he || "אובייקט פונקציה"} · Project NEO`,
    description: [d.code, d.he, d.en, d.mod, d.s4.headline].filter(Boolean).join(" · "),
    robots: { index: false, follow: false },
  };
}

export default async function NeoBapiRecord({ params }: { params: Promise<{ name: string }> }) {
  const { name } = await params;
  const d = bapiDetail(decodeURIComponent(name));
  if (!d) notFound();
  return <RefDetailView d={d} />;
}
