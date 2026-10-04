// Project NEO · /neo/connector/ — the live SAP connector (architecture), at its old address.
import "@/app/neo/ui.css";
import "@/app/neo/centers.css";
import "@/app/neo/tools.css";
import { ConnectorView } from "@/components/neo-shell/tools/connector-view";

export async function generateMetadata() {
  return {
    title: "הכנת מחבר SAP חי · Project NEO",
    description: "ארכיטקטורת מחבר SAP לקריאה בלבד: אילו אובייקטי מאגר SAP (TSTC, DD02L, DD03L, TADIR ועוד) יזינו אילו נתוני NEO.",
    robots: { index: false, follow: false },
  };
}

export default function Page() {
  return <ConnectorView />;
}
