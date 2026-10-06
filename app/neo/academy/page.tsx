// Project NEO · /neo/academy — the academy, one tab: the learning paths, their
// journey and the source folder's way in (2026-10).
//
// A STATIC route inside a namespace that also has app/neo/[hub]/page.tsx — the
// same arrangement /neo/tables and /neo/transactions already use. A literal
// segment wins over a dynamic sibling, so this page serves the route and the
// Stage-1 hub frame no longer does. nav-data.ts is untouched.
//
// ui.css is imported per route, not by the layout. Imported FIRST so learn.css's
// own placement rules still win.
import "@/app/neo/ui.css";
import "@/app/neo/learn.css";
import "@/app/neo/learn-extensions.css";
// the catalogs' kit (hero, ledger, Sig, foot), then the academy's own sheet last
import "@/app/neo/data.css";
import "@/app/neo/academy-experience.css";
import { academyData } from "@/components/neo-shell/learn/academy-data";
import { AcademySurface } from "@/components/neo-shell/learn/academy-surface";
import { sourceIndex } from "@/components/neo-shell/learn/source-data";

export const metadata = {
  title: "SAP Academy · Project NEO",
  description: "מסלולי הלמידה של SAP Academy: קורסים, פרקים ושיעורים לפי מודול, עם רמה ואורך מוצהרים.",
  robots: { index: false, follow: false },
};

// Server component: the course tree is resolved at BUILD time and handed to the
// client surface as one plain object. Progress is NOT part of it — that is the
// reader's own state and is read on the client from the product's own store.
export default function NeoAcademy() {
  const data = academyData();
  // The source folder's counts only: the hub links into the folder, it does
  // not carry its 2,000-odd topics into the page.
  const materials = data.courses.map((c) => {
    const ch = sourceIndex(c.id);
    return { id: c.id, title: c.title, module: c.module, chapters: ch.length, topics: ch.reduce((a, x) => a + x.rows.length, 0) };
  });
  return <AcademySurface data={data} materials={materials} />;
}
