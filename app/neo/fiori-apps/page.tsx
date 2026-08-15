// Project NEO · /neo/fiori-apps/ — the Fiori application directory.
//
// A REAL route that coexists with app/neo/[hub]/page.tsx the same way
// /neo/tables/ and /neo/transactions/ do. nav-data.ts is untouched.
import "@/app/neo/ui.css";
import "@/app/neo/data.css";
import "@/app/neo/reference.css";
import { RefSurface } from "@/components/neo-shell/reference/ref-surface";
import { fioriDir } from "@/components/neo-shell/reference/fiori-data";

export const metadata = {
  title: "אפליקציות Fiori · Project NEO",
  description:
    "האפליקציות שהפרויקט תיעד במלואן — מזהה, תפקיד עסקי, קטלוג, OData ו-CDS, ואיזו טרנזקציית SAP GUI כל אחת מחליפה.",
  robots: { index: false, follow: false },
};

export default function NeoFioriDirectory() {
  return <RefSurface dir={fioriDir()} />;
}
