// Project NEO · /neo/process/ — the family index, at its legacy address under /neo/.
import "@/app/neo/ui.css";
import "@/app/neo/centers.css";
import "@/app/neo/records.css";
import { RecordIndex } from "@/components/neo-shell/records/kit";
import { processesIndex } from "@/components/neo-shell/records/process";

export const metadata = {
  title: "תהליכי המודולים · Project NEO",
  description: "נושאי המודולים PM ו-PP-PI כתהליכים: הטבלאות, הטרנזקציות וה-BAPI/FM של כל אחד, מתוך המאגר.",
  robots: { index: false, follow: false },
};

export default function Page() {
  const x = processesIndex();
  return <RecordIndex head={x.head} groups={x.groups} />;
}
