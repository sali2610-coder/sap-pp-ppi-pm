// Project NEO · /neo/workbench/ — the consultant workbenches index, at its old address.
import "@/app/neo/ui.css";
import "@/app/neo/centers.css";
import "@/app/neo/tools.css";
import { WorkbenchIndex } from "@/components/neo-shell/tools/workbench-view";

export async function generateMetadata() {
  return {
    title: "שולחנות עבודה ליועץ · Project NEO",
    description: "ארבעה שולחנות עבודה ליועץ: Debugging, QM, PM מתקדם ו-PP-PI מתקדם, כל אחד ב-12 מקטעים.",
    robots: { index: false, follow: false },
  };
}

export default function Page() {
  return <WorkbenchIndex />;
}
