// Project NEO · /neo/solutions/ — the family index, at its legacy address under /neo/.
import "@/app/neo/ui.css";
import "@/app/neo/centers.css";
import "@/app/neo/records.css";
import { RecordIndex } from "@/components/neo-shell/records/kit";
import { solutionsIndex } from "@/components/neo-shell/records/solutions";

export const metadata = {
  title: "מאתר הפתרונות · Project NEO",
  description: "פתרונות SAP סטנדרטיים לפי דרישה עסקית: תהליך, T-Code, חלופת S/4HANA, Fiori, טבלאות, CDS, APIs, BAPIs, הרחבות, תקלות ומורכבות.",
  robots: { index: false, follow: false },
};

export default function Page() {
  const x = solutionsIndex();
  return <RecordIndex head={x.head} groups={x.groups} />;
}
