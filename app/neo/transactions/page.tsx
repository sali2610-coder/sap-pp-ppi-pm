// ui.css is imported per route, not by the layout, so a route that omits it
// ships without the interaction system and its controls fall back to bare
// buttons. Imported first so each route's own CSS still overrides it.
import "@/app/neo/ui.css";
import "@/app/neo/data.css";
import { TransactionsSurface } from "@/components/neo-shell/data/transactions-surface";

export const metadata = {
  title: "טרנזקציות · Project NEO",
  description: "הרישום הקנוני של טרנזקציות SAP במעטפת NEO: מודול, נושא, אובייקט עסקי, יורש Fiori ועומק תיעוד.",
  robots: { index: false, follow: false },
};

// The surface is a CLIENT component that imports lib/tx-registry directly, the
// way components/transaction-workspace.tsx already does. That is deliberate: the
// registry holds ~2k codes, and serialising it into this page's RSC payload
// would inline it into the HTML of the page instead of sharing the one chunk
// both transaction centres already load.
export default function NeoTransactions() {
  return <TransactionsSurface />;
}
