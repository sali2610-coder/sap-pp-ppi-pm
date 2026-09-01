// Project NEO · /neo/best-practices/ — the best-practice catalog.
//
// A STATIC route inside a namespace that also has app/neo/[hub]/page.tsx. The
// rail seed for this section carries an href, so "best-practices" is excluded
// from NEO_HUBS and the two cannot collide — the same arrangement /neo/erd/
// and /neo/books/ already use.
import "@/app/neo/ui.css";
import "@/app/neo/data.css";
import "@/app/neo/reference.css";
import "@/app/neo/best-practices.css";
import { BpCatalog } from "@/components/neo-shell/best-practices/bp-view";
import { bpList } from "@/components/neo-shell/best-practices/bp-data";

// noindex, like every other page in the namespace: scripts/gen-sitemap.mjs
// derives the sitemap from out/ and its only exclusion mechanism is a page
// declaring content="noindex" itself.
export const metadata = {
  title: "שיטות עבודה מומלצות ל-SAP S/4HANA · Project NEO",
  description:
    "שיטות עבודה מומלצות ל-SAP S/4HANA בקטלוג Project NEO: צעדי עבודה, דפוסים שגויים, בדיקות ומקורות מאומתים לכל שיטה.",
  robots: { index: false, follow: false },
};

// Server component. bpList() reads data/best-practices at BUILD time and hands
// the server view one small plain object.
export default function NeoBestPractices() {
  return <BpCatalog rows={bpList()} />;
}
