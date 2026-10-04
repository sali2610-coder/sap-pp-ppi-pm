// Project NEO · /neo/guides/ — the family index, at its legacy address under /neo/.
import "@/app/neo/ui.css";
import "@/app/neo/centers.css";
import "@/app/neo/records.css";
import { RecordIndex } from "@/components/neo-shell/records/kit";
import { guidesIndex } from "@/components/neo-shell/records/guides";

export const metadata = {
  title: "מדריכי תהליך מעמיקים · Project NEO",
  description: "תהליכי PM, PP ו-PP-PI מקצה לקצה: זרימה עסקית, ביצוע שלב אחר שלב, טעויות, אבחון, Debug, הרחבות, Fiori ו-ECC מול S/4HANA.",
  robots: { index: false, follow: false },
};

export default function Page() {
  const x = guidesIndex();
  return <RecordIndex head={x.head} groups={x.groups} />;
}
