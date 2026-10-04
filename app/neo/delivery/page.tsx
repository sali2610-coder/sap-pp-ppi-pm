// Project NEO · /neo/delivery/ — the SAP Activate delivery course, at its old address.
import "@/app/neo/ui.css";
import "@/app/neo/centers.css";
import "@/app/neo/tools.css";
import { DeliveryView } from "@/components/neo-shell/tools/courses";

export async function generateMetadata() {
  return {
    title: "מרכז ניהול פרויקט SAP · Project NEO",
    description: "מסירת פרויקט S/4HANA לפי SAP Activate: ששת השלבים מ-Discover עד Run, ותחומי Cutover, בדיקות, פגמים, סדנאות Fit-to-Standard ו-Blueprint.",
    robots: { index: false, follow: false },
  };
}

export default function Page() {
  return <DeliveryView />;
}
