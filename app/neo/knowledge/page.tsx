// Project NEO · /neo/knowledge — the concept reference.
//
// A STATIC route inside a namespace that also has app/neo/[hub]/page.tsx. That
// is the same arrangement /neo/tables and /neo/transactions already use: a
// literal segment wins over a dynamic sibling, so this page serves the route and
// the Stage-1 hub frame no longer does. components/neo-shell/nav-data.ts is
// untouched — "knowledge" stays in NEO_HUBS, the rail keeps its real count, and
// nothing else in the navigation has to know this page exists.
//
// ui.css is imported per route, not by the layout, so a route that omits it
// ships without the interaction system and its controls fall back to bare
// buttons. Imported FIRST so learn.css's placement rules still win.
import "@/app/neo/ui.css";
import "@/app/neo/learn.css";
import { knowledgeData } from "@/components/neo-shell/learn/knowledge-data";
import { KnowledgeSurface } from "@/components/neo-shell/learn/knowledge-surface";

// noindex, like every other page in the namespace: scripts/gen-sitemap.mjs
// derives the sitemap from out/ and its only exclusion mechanism is a page
// declaring content="noindex" itself, and scripts/check-sitemap.mjs then
// hard-fails on any indexable page missing from the sitemap.
export const metadata = {
  title: "מרכז הידע · Project NEO",
  description: "מרכז הידע של Project NEO: מושגי SAP עם הסבר עסקי, הסבר טכני והשוואה בין ECC ל-S/4HANA, ונושאי עבודה לפי מרכז.",
  robots: { index: false, follow: false },
};

// Server component. knowledgeData() reads data/concepts.ts at BUILD time and
// hands the client surface one small plain object — the same boundary
// app/neo/layout.tsx keeps for the rail.
export default function NeoKnowledge() {
  return <KnowledgeSurface data={knowledgeData()} />;
}
