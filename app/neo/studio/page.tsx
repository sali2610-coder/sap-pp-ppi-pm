// Project NEO · /neo/studio — Architecture Studio.
//
// The studio's two graphs (PM, PP-PI) are assembled here at build time from
// lib/studio-graph.ts (components/neo-shell/studio/studio-data.ts) and handed
// to the workspace as plain data: the browser receives the nodes, relations
// and words it draws, never the blueprints' source.
import "@/app/neo/ui.css";
import "@/app/neo/studio.css";
import { StudioView } from "@/components/neo-shell/studio/studio-view";
import { studioPayload } from "@/components/neo-shell/studio/studio-data";

export const metadata = {
  title: "Architecture Studio · Project NEO",
  description: "תצוגה גרפית של ארכיטקטורת SAP: טבלאות, טרנזקציות, BAPIs, IDocs, CDS Views ויישומי Fiori, והקשרים ביניהם.",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <StudioView data={studioPayload()} />;
}
