// Project NEO · /neo/ecc-s4/ — the family index, at its legacy address under /neo/.
import "@/app/neo/ui.css";
import "@/app/neo/centers.css";
import "@/app/neo/records.css";
import { RecordIndex } from "@/components/neo-shell/records/kit";
import { eccS4Index } from "@/components/neo-shell/records/ecc-s4";

export const metadata = {
  title: "ECC מול S/4HANA · Project NEO",
  description: "מה השתנה במעבר ל-S/4HANA, נושא אחר נושא: סטטוס, ECC, S/4HANA, חלופת Fiori/CDS, פריט פישוט והשפעת מיגרציה.",
  robots: { index: false, follow: false },
};

export default function Page() {
  const x = eccS4Index();
  return <RecordIndex head={x.head} groups={x.groups} intro={x.intro} />;
}
