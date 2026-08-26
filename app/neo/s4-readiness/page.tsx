// Project NEO · /neo/s4-readiness/ — where each module actually stands.
//
// The legacy page fetched /sap-infrastructure/dataset.json in the browser and
// rendered zeros until it arrived. This one reads the SAME file at build time
// with the same computeReadiness(), so the page is complete in the HTML and
// needs no network — which is also what "100% offline" requires.
import "@/app/neo/ui.css";
import "@/app/neo/s4.css";
import { S4ReadinessCenter } from "@/components/neo-shell/s4/s4-view";
import { s4TopicTotals } from "@/components/neo-shell/s4/s4-data";

export function generateMetadata() {
  const t = s4TopicTotals();
  return {
    title: "מוכנות למעבר · Project NEO",
    description: `ציון מוכנות לכל מודול ו-${t.total} נושאי שינוי ECC→S/4HANA, עם סטטוס, Fiori, CDS והשפעת מיגרציה.`,
    robots: { index: false, follow: false },
  };
}

export default function Page() {
  return <S4ReadinessCenter />;
}
