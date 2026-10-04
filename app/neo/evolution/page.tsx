// Project NEO · /neo/evolution/ — the T-Code evolution table, at its old address.
import "@/app/neo/ui.css";
import "@/app/neo/centers.css";
import "@/app/neo/tools.css";
import { EvolutionView } from "@/components/neo-shell/tools/evolution-view";

export async function generateMetadata() {
  return {
    title: "מרכז אבולוציית טרנזקציות · Project NEO",
    description: "טרנזקציות שהוסרו או הפכו ללא-אסטרטגיות ב-S/4HANA: סטטוס, חלופה, יישום Fiori, השפעה והערות מיגרציה.",
    robots: { index: false, follow: false },
  };
}

export default function Page() {
  return <EvolutionView />;
}
