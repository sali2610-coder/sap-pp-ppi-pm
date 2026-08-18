// Project NEO · /neo/ai/ — "שאל את הספרייה".
//
// ROUTE PRECEDENCE. `ai` is one of the ids in NEO_HUBS, so app/neo/[hub] also
// generates this path. That is not a conflict: a static segment wins over a
// dynamic one, which is exactly how /neo/tables/ and /neo/transactions/ already
// coexist with the hub route — out/neo/tables/ carries the static route's
// __PAGE__ marker while out/neo/ai/ carried the dynamic one. Adding this file
// moves /neo/ai/ from the Stage-1 placeholder to the real surface without
// touching components/neo-shell/nav-data.ts, so the rail link, the route
// manifest and scripts/crawl-dead-links.mjs all keep pointing at a real page.
//
// ui.css is imported FIRST so the control language lands before this route's
// own rules and the layout-only overrides in chat.css apply after it.
import "@/app/neo/ui.css";
import "@/app/neo/chat.css";
import { LibraryChat } from "@/components/neo-shell/chat/library-chat";

// noindex, like every page in the namespace: scripts/gen-sitemap.mjs derives
// the sitemap from out/ and its only exclusion mechanism is a page declaring
// noindex itself, and scripts/check-sitemap.mjs then hard-fails on any
// indexable page missing from the sitemap.
export const metadata = {
  title: "שאל את הספרייה · Project NEO",
  description: "שיחה עם הספרייה הדיגיטלית של NEO. תשובות מבוססות על הספרים בלבד, עם הפניה לפרק ולסעיף.",
  robots: { index: false, follow: false },
};

export default function NeoAskLibrary() {
  return <LibraryChat />;
}
