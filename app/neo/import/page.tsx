// Project NEO · /neo/import/ — the SAP import engine (architecture), at its old address.
import "@/app/neo/ui.css";
import "@/app/neo/centers.css";
import "@/app/neo/tools.css";
import { ImportView } from "@/components/neo-shell/tools/import-view";

export async function generateMetadata() {
  return {
    title: "מנוע ייבוא SAP · Project NEO",
    description: "חבילת החילוץ ממערכת SAP: טבלת מקור, טרנזקציית חילוץ, סינון, שדות ויעד ב-NEO, וזרימת הייבוא והאימות.",
    robots: { index: false, follow: false },
  };
}

export default function Page() {
  return <ImportView />;
}
