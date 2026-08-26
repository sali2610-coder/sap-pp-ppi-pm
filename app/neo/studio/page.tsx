// Project NEO · /neo/studio — Architecture Studio.
//
// The sidebar's "studio" item previously fell through to app/neo/[hub], the
// Stage-1 placeholder. lib/studio-graph.ts — the heterogeneous graph, the
// swimlane layout, the eight zones, the nine view modes and the S/4 verdict
// colours — is reused whole; this route is the NEO workspace around it.
import "@/app/neo/ui.css";
import "@/app/neo/studio.css";
import { StudioView } from "@/components/neo-shell/studio/studio-view";

export const metadata = {
  title: "Architecture Studio · Project NEO",
  description: "חקירה ויזואלית של ארכיטקטורת SAP: טבלאות, טרנזקציות, BAPIs, IDocs, CDS ו-Fiori, והקשרים ביניהם.",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <StudioView />;
}
