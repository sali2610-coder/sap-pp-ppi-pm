// Project NEO · /neo/enhancements/ — the enhancement-technique directory.
//
// A REAL route that coexists with app/neo/[hub]/page.tsx the same way
// /neo/tables/ and /neo/transactions/ do. nav-data.ts is untouched.
import "@/app/neo/ui.css";
import "@/app/neo/data.css";
import "@/app/neo/reference.css";
import { RefSurface } from "@/components/neo-shell/reference/ref-surface";
import { enhDir } from "@/components/neo-shell/reference/enh-data";

export const metadata = {
  title: "טכניקות הרחבה · Project NEO",
  description:
    "טכניקות ההרחבה של SAP ב-Project NEO: מעמד כל טכניקה ב-ECC וב-S/4HANA, וההרחבות בשם מקטלוג הפרויקט המשויכות אליה.",
  robots: { index: false, follow: false },
};

export default function NeoEnhancementsDirectory() {
  return <RefSurface dir={enhDir()} />;
}
