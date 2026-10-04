// Project NEO · /neo/studio — Architecture Studio.
//
// The sidebar's "studio" item previously fell through to app/neo/[hub], the
// Stage-1 placeholder. lib/studio-graph.ts — the heterogeneous graph, the
// swimlane layout, the eight zones, the nine view modes and the S/4 verdict
// colours — is reused whole; this route is the NEO workspace around it.
import "@/app/neo/ui.css";
import "@/app/neo/studio.css";
import { StudioView } from "@/components/neo-shell/studio/studio-view";
import { tablesData } from "@/components/neo-shell/data/tables-data";
import type { S4Status } from "@/lib/evidence/types";

export const metadata = {
  title: "Architecture Studio · Project NEO",
  description: "תצוגה גרפית של ארכיטקטורת SAP: טבלאות, טרנזקציות, BAPI, IDoc, תצוגות CDS ויישומי Fiori, והקשרים ביניהם.",
  robots: { index: false, follow: false },
};

export default function Page() {
  // The S/4HANA verdict per table, resolved here at build time (spec P1 §10).
  const verdicts = Object.fromEntries(tablesData().rows.map((r) => [r.name, r.status.key as S4Status]));
  return <StudioView verdicts={verdicts} />;
}
