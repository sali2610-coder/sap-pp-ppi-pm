// Project NEO · /neo/certification — an honest assessment surface.
//
// A STATIC route inside a namespace that also has app/neo/[hub]/page.tsx — the
// same arrangement /neo/tables and /neo/transactions already use. nav-data.ts is
// untouched: "certification" stays in NEO_HUBS with `count: null`, which is
// still the right answer for the rail — there is no single number that honestly
// describes this destination.
//
// ui.css is imported per route, not by the layout. Imported FIRST so learn.css's
// own placement rules still win.
import "@/app/neo/ui.css";
import "@/app/neo/learn.css";
import { certData } from "@/components/neo-shell/learn/cert-data";
import { CertSurface } from "@/components/neo-shell/learn/cert-surface";

export const metadata = {
  title: "הסמכה · Project NEO",
  description: "מנגנון ההערכה העצמית של הפרויקט: מה נמדד, מה לא, ומה הוא אינו מתיימר להיות.",
  robots: { index: false, follow: false },
};

// Server component: the banks are counted at BUILD time and only the counts
// cross into the client. No question text is server-rendered.
export default function NeoCertification() {
  return <CertSurface data={certData()} />;
}
