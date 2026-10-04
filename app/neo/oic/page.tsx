// Project NEO · /neo/oic/ — the family index, at its legacy address under /neo/.
import "@/app/neo/ui.css";
import "@/app/neo/centers.css";
import "@/app/neo/records.css";
import { RecordIndex } from "@/components/neo-shell/records/kit";
import { oicIndex } from "@/components/neo-shell/records/oic";

export const metadata = {
  title: "מרכז תבונת אובייקטים · Project NEO",
  description: "אובייקטי הליבה של PM, PP-PI ו-QM וכל מה שמקושר אליהם: טבלאות, טרנזקציות, BAPIs, הרחבות, CDS, תקלות, SAP Notes ותרחישים.",
  robots: { index: false, follow: false },
};

export default function Page() {
  const x = oicIndex();
  return <RecordIndex head={x.head} groups={x.groups} />;
}
