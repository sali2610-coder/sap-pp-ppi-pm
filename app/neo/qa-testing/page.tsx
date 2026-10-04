// Project NEO · /neo/qa-testing/ — the family index, at its legacy address under /neo/.
import "@/app/neo/ui.css";
import "@/app/neo/centers.css";
import "@/app/neo/records.css";
import { RecordIndex } from "@/components/neo-shell/records/kit";
import { qaIndex } from "@/components/neo-shell/records/qa-testing";

export const metadata = {
  title: "מרכז בדיקות QA · Project NEO",
  description: "חבילות בדיקה ל-PM, PP ו-PP-PI: תרחישי ולידציה, חיובי, שלילי, אינטגרציה ורגרסיה, עם הטרנזקציות והטבלאות.",
  robots: { index: false, follow: false },
};

export default function Page() {
  const x = qaIndex();
  return <RecordIndex head={x.head} groups={x.groups} />;
}
