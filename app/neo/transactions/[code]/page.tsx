// Project NEO · /neo/transactions/<CODE>/ — one page per verified T-Code.
//
// ui.css is imported per route, not by the layout, so a route that omits it
// ships without the interaction system and its controls fall back to bare
// buttons. Imported first so data.css's own placement rules still win.
import "@/app/neo/ui.css";
import "@/app/neo/data.css";
import { notFound } from "next/navigation";
import { TxDetailView } from "@/components/neo-shell/data/tx-detail-view";
import { txDetail, txDetailCodes } from "@/components/neo-shell/data/tx-detail";

// Static export: every code in the canonical registry becomes a real file, and
// `dynamicParams = false` makes anything outside it a build-time 404 rather
// than a runtime one. This is also what keeps the list honest — the surface can
// only link at codes this list generated, so scripts/crawl-dead-links.mjs
// cannot find a row that opens nothing.
export const dynamicParams = false;

export function generateStaticParams() {
  return txDetailCodes().map((code) => ({ code }));
}

export async function generateMetadata({ params }: { params: Promise<{ code: string }> }) {
  const { code } = await params;
  const t = txDetail(decodeURIComponent(code));
  if (!t) return { title: "טרנזקציה · Project NEO", robots: { index: false, follow: false } };
  return {
    // The description is assembled from dataset fields only. Nothing is written
    // here that is not already on the page.
    title: `${t.code} · ${t.he || "טרנזקציה"} · Project NEO`,
    description: [t.code, t.he, t.en, t.module, t.s4.he].filter(Boolean).join(" · "),
    robots: { index: false, follow: false },
  };
}

export default async function NeoTransactionDetail({ params }: { params: Promise<{ code: string }> }) {
  const { code } = await params;
  const t = txDetail(decodeURIComponent(code));
  if (!t) notFound();
  return <TxDetailView t={t} />;
}
