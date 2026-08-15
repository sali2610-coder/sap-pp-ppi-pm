// Project NEO · /neo/bapi/ — the BAPI / Function Module directory.
//
// A REAL route that coexists with app/neo/[hub]/page.tsx exactly the way
// /neo/tables/ and /neo/transactions/ already do: `bapi` is still an id in
// NEO_HUBS, so the rail keeps pointing here and the hub route keeps generating
// its param list unchanged — a static segment simply wins over the dynamic one
// for this path. Nothing in components/neo-shell/nav-data.ts had to move.
//
// ui.css is imported per route, not by the layout, so a route that omits it
// ships without the interaction system and its controls fall back to bare
// buttons. Imported FIRST so data.css and reference.css still override it.
import "@/app/neo/ui.css";
import "@/app/neo/data.css";
import "@/app/neo/reference.css";
import { RefSurface } from "@/components/neo-shell/reference/ref-surface";
import { bapiDir } from "@/components/neo-shell/reference/bapi-data";

// noindex, like every other page in the namespace: scripts/gen-sitemap.mjs
// derives the sitemap from out/ and its only exclusion mechanism is a page
// declaring content="noindex" itself.
export const metadata = {
  title: "BAPIs ו-Function Modules · Project NEO",
  description:
    "הרישום הקנוני של אובייקטי הפונקציה במעטפת NEO — מודול, משמעות, טבלאות וטרנזקציות מקושרות ומעמד ב-S/4HANA.",
  robots: { index: false, follow: false },
};

// Server component. bapiDir() resolves the registry at BUILD time and hands the
// client surface one small plain object, so no SAP dataset crosses the boundary.
export default function NeoBapiDirectory() {
  return <RefSurface dir={bapiDir()} />;
}
