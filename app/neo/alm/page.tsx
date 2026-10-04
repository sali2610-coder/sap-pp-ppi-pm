// Project NEO · /neo/alm/ — the SAP ALM course (Solution Manager 7.2, Focused Build, Cloud ALM), at its old address.
import "@/app/neo/ui.css";
import "@/app/neo/centers.css";
import "@/app/neo/tools.css";
import { AlmView } from "@/components/neo-shell/tools/courses";

export async function generateMetadata() {
  return {
    title: "מרכז ALM של SAP · Project NEO",
    description: "ניהול מחזור חיים כמסלול: Solution Manager 7.2, Focused Build ו-Cloud ALM, ותחומי ALM: מחזור חיים, טרנספורטים, שינויים, בדיקות וניטור.",
    robots: { index: false, follow: false },
  };
}

export default function Page() {
  return <AlmView />;
}
