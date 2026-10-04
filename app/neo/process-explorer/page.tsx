// Project NEO · /neo/process-explorer/ — the family index, at its legacy address under /neo/.
import "@/app/neo/ui.css";
import "@/app/neo/centers.css";
import "@/app/neo/records.css";
import { RecordIndex } from "@/components/neo-shell/records/kit";
import { processMapsIndex } from "@/components/neo-shell/records/process-explorer";

export const metadata = {
  title: "מפות תהליך מקצה-לקצה · Project NEO",
  description: "תהליכי E2E: רכש, מכירה, תכנון לייצור, איכות ואחזקה, שלב אחר שלב עם T-Codes, טבלאות, Fiori, ממשקים ותקלות.",
  robots: { index: false, follow: false },
};

export default function Page() {
  const x = processMapsIndex();
  return <RecordIndex head={x.head} groups={x.groups} blocks={x.blocks} />;
}
