// ui.css is imported per route, not by the layout, so a route that omits it
// ships without the interaction system and its controls fall back to bare
// buttons. Imported first so each route's own CSS still overrides it.
import "@/app/neo/ui.css";
import "@/app/neo/data.css";
import { tablesData } from "@/components/neo-shell/data/tables-data";
import { TablesSurface } from "@/components/neo-shell/data/tables-surface";

// noindex, like every other page in the namespace: scripts/gen-sitemap.mjs
// derives the sitemap from out/ and its only exclusion mechanism is a page
// declaring content="noindex" itself, and scripts/check-sitemap.mjs then
// hard-fails on any indexable page missing from the sitemap.
export const metadata = {
  title: "טבלאות SAP · Project NEO",
  description: "קטלוג טבלאות SAP של PM ו-PP-PI: שדות, מפתחות, קשרי ER, טרנזקציות והמעבר מ-ECC ל-S/4HANA.",
  robots: { index: false, follow: false },
};

// Server component. tablesData() reads the two blueprints at BUILD time and
// hands the client surface one small plain object — the same boundary
// app/neo/layout.tsx keeps for the rail.
export default function NeoTables() {
  return <TablesSurface data={tablesData()} />;
}
