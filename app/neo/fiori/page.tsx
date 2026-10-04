// Project NEO · /neo/fiori/ — the Fiori and UX course, at its old address.
// /fiori/<slug>/ topics stay at /neo/centers/fiori/<slug>/.
import "@/app/neo/ui.css";
import "@/app/neo/centers.css";
import "@/app/neo/tools.css";
import { FioriView } from "@/components/neo-shell/tools/courses";

export async function generateMetadata() {
  return {
    title: "מרכז Fiori ו-UX · Project NEO",
    description: "שכבת ה-UX של SAP כמסלול: ארכיטקטורת Fiori, סוגי אפליקציות, OData, UI5, RAP ואבחון תקלות.",
    robots: { index: false, follow: false },
  };
}

export default function Page() {
  return <FioriView />;
}
