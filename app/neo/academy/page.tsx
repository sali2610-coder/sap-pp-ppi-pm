// Project NEO · /neo/academy — the course directory.
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
import { academyData } from "@/components/neo-shell/learn/academy-data";
import { AcademySurface } from "@/components/neo-shell/learn/academy-surface";

export const metadata = {
  title: "האקדמיה · Project NEO",
  description: "מסלולי הלמידה הכתובים של האקדמיה: פרקים, שיעורים, רמה ואורך מוצהר.",
  robots: { index: false, follow: false },
};

// Server component: the course tree is resolved at BUILD time and handed to the
// client surface as one plain object. Progress is NOT part of it — that is the
// reader's own state and is read on the client from the product's own store.
export default function NeoAcademy() {
  return <AcademySurface data={academyData()} />;
}
