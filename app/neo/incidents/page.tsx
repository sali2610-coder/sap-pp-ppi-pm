// Project NEO · /neo/incidents — the incident catalogue.
//
// A STATIC route inside a namespace that also has app/neo/[hub]/page.tsx — the
// same arrangement /neo/tables and /neo/transactions already use. A literal
// segment wins over a dynamic sibling, so this page serves the route and the
// Stage-1 hub frame no longer does. nav-data.ts is untouched.
//
// ui.css is imported per route, not by the layout, so a route that omits it
// ships without the interaction system. Imported FIRST so learn.css's own
// placement rules still win.
import "@/app/neo/ui.css";
import "@/app/neo/learn.css";
import { incidentsData } from "@/components/neo-shell/learn/incidents-data";
import { IncidentsSurface } from "@/components/neo-shell/learn/incidents-surface";

export const metadata = {
  title: "קטלוג התקלות · Project NEO",
  description: "תקלות SAP מתועדות ב-PM / PP / PP-PI / QM — סימפטום, סיבות שורש, אבחון, תיקון ומניעה.",
  robots: { index: false, follow: false },
};

// Server component. incidentsData() reads the catalogue at BUILD time and hands
// the client surface one small plain object.
export default function NeoIncidents() {
  return <IncidentsSurface data={incidentsData()} />;
}
