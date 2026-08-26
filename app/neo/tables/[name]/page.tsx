// Project NEO · /neo/tables/<NAME>/ — one page per dictionary table.
//
// ui.css is imported per route, not by the layout, so a route that omits it
// ships without the interaction system and its controls fall back to bare
// buttons. Imported FIRST so data.css's own placement rules still win.
import "@/app/neo/ui.css";
import "@/app/neo/data.css";
import { notFound } from "next/navigation";
import { TableDetailView } from "@/components/neo-shell/data/tables-detail-view";
import { tableDetail, tableDetailNames } from "@/components/neo-shell/data/tables-detail";

// ROUTE SHAPE. `/neo/tables/` is a static segment, so it wins over the
// one-segment `app/neo/[hub]/` catch-all that also lists "tables" in NEO_HUBS —
// exactly as it does today. This route adds a SECOND segment underneath it, and
// `[hub]` has no children, so nothing here changes which file answers
// `/neo/tables/`. The directory still renders TablesSurface.
//
// Static export only — no server runtime. `dynamicParams = false` makes any
// name outside the list a build-time 404 rather than a runtime one, and the
// list is the dictionary's own table list, which is also what every /neo/tables
// href on the site is gated against (see the LINK RULE in tables-detail.ts).
// scripts/crawl-dead-links.mjs exits 1 on the first internal href in out/ with
// no page behind it, so a link can never outrun a page here.
export const dynamicParams = false;

export function generateStaticParams() {
  return tableDetailNames().map((name) => ({ name }));
}

export async function generateMetadata({ params }: { params: Promise<{ name: string }> }) {
  const { name } = await params;
  const t = tableDetail(decodeURIComponent(name));
  if (!t) return { title: "טבלת SAP · Project NEO", robots: { index: false, follow: false } };
  return {
    // Assembled from dataset fields only — nothing is written here that is not
    // already on the page.
    title: `${t.name} · ${t.he || "טבלת SAP"} · Project NEO`,
    description: [t.name, t.he, t.en, t.mods.join(" · "), t.zoneHe].filter(Boolean).join(" · "),
    robots: { index: false, follow: false },
  };
}

export default async function NeoTableDetail({ params }: { params: Promise<{ name: string }> }) {
  const { name } = await params;
  const t = tableDetail(decodeURIComponent(name));
  if (!t) notFound();
  return <TableDetailView t={t} />;
}
