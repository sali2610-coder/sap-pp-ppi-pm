// Project NEO · /neo/cds/ — the CDS view directory.
//
// A REAL route that coexists with app/neo/[hub]/page.tsx the same way
// /neo/tables/ and /neo/transactions/ do: `cds` stays an id in NEO_HUBS, the
// rail keeps pointing here, and the static segment wins over the dynamic one
// for this path. components/neo-shell/nav-data.ts is untouched.
import "@/app/neo/ui.css";
import "@/app/neo/data.css";
import "@/app/neo/reference.css";
import { RefSurface } from "@/components/neo-shell/reference/ref-surface";
import { cdsDir } from "@/components/neo-shell/reference/cds-data";

export const metadata = {
  title: "CDS Views · Project NEO",
  description:
    "תצוגות CDS של S/4HANA ב-Project NEO: הטבלאות הקלאסיות שכל תצוגה מכסה, שכבת ה-Consumption, יישום ה-Fiori ומעמד הטבלה במעבר ל-S/4HANA.",
  robots: { index: false, follow: false },
};

export default function NeoCdsDirectory() {
  return <RefSurface dir={cdsDir()} />;
}
