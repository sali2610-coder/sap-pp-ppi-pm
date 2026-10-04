// Project NEO · /neo/security/ — the family index, at its legacy address under /neo/.
import "@/app/neo/ui.css";
import "@/app/neo/centers.css";
import "@/app/neo/records.css";
import { RecordIndex } from "@/components/neo-shell/records/kit";
import { securityIndex } from "@/components/neo-shell/records/security";

export const metadata = {
  title: "מרכז אבטחה והרשאות SAP · Project NEO",
  description: "אבטחת SAP: טרנזקציות ומושגי הרשאה, כשלים נפוצים ואבחון, וקורס מלא מ-SU01/PFCG ועד Fiori/IAM.",
  robots: { index: false, follow: false },
};

export default function Page() {
  const x = securityIndex();
  return <RecordIndex head={x.head} groups={x.groups} blocks={x.blocks} foot={x.foot} />;
}
