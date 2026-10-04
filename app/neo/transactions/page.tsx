// ui.css is imported per route, not by the layout, so a route that omits it
// ships without the interaction system and its controls fall back to bare
// buttons. Imported first so each route's own CSS still overrides it.
import "@/app/neo/ui.css";
import "@/app/neo/data.css";
import { TransactionsSurface } from "@/components/neo-shell/data/transactions-surface";
import { txStatusMap } from "@/components/neo-shell/data/tx-detail";
import { blueprintOnlyCodes } from "@/components/neo-shell/data/tx/codes";
import { tcodeIntel } from "@/lib/object-intel";

export const metadata = {
  title: "טרנזקציות · Project NEO",
  description: "קטלוג הטרנזקציות של Project NEO: מודול, נושא, אובייקט עסקי, יישום Fiori קשור ועומק התיעוד.",
  robots: { index: false, follow: false },
};

// The surface is a CLIENT component that imports lib/tx-registry directly, the
// way components/transaction-workspace.tsx already does. That is deliberate: the
// registry holds ~2k codes, and serialising it into this page's RSC payload
// would inline it into the HTML of the page instead of sharing the one chunk
// both transaction centres already load.
// The ONE thing that does cross the boundary is the canonical S/4HANA status
// of each code (design audit S5-2 / ACC-3): a code → key map computed here by
// the same resolver the detail page uses, so the list pill and the page pill
// are the same word. ~1,800 short strings, on this page only.
export default function NeoTransactions() {
  // The codes the blueprint lists on a table but the verified registry does
  // not carry: each has its own page (rollout 2026-10), listed apart.
  const extra = blueprintOnlyCodes().map((code) => ({
    code,
    // tcodeIntel returns one entry per module row: a table both blueprints
    // list came twice ("JSTO · TJ30T · TJ30 · JSTO" on BS02).
    tables: [...new Set((tcodeIntel(code)?.tables || []).map((t) => t.name))],
  }));
  return <TransactionsSurface status={txStatusMap()} extra={extra} />;
}
