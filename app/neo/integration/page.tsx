// Project NEO · /neo/integration/ — the SAP integration course, at its old address.
import "@/app/neo/ui.css";
import "@/app/neo/centers.css";
import "@/app/neo/tools.css";
import { IntegrationView } from "@/components/neo-shell/tools/courses";

export async function generateMetadata() {
  return {
    title: "מרכז אינטגרציה SAP · Project NEO",
    description: "אינטגרציית SAP כמסלול: IDoc, ALE ו-RFC, דרך PI/PO ו-CPI, ועד OData, APIs ו-Event Mesh, עם ניטור ואבחון.",
    robots: { index: false, follow: false },
  };
}

export default function Page() {
  return <IntegrationView />;
}
