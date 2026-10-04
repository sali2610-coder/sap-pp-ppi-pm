// Project NEO · /neo/sap-notes/ — the family index, at its legacy address under /neo/.
import "@/app/neo/ui.css";
import "@/app/neo/centers.css";
import "@/app/neo/records.css";
import { RecordIndex } from "@/components/neo-shell/records/kit";
import { notesIndex } from "@/components/neo-shell/records/sap-notes";

export const metadata = {
  title: "מרכז SAP Notes — נתיבי פתרון · Project NEO",
  description: "נושאי פתרון ל-PM, PP ו-PP-PI לפי רכיב SAP ומילות חיפוש ל-OSS: תסמין, שורש, רלוונטיות ECC מול S/4HANA ושלבי פתרון.",
  robots: { index: false, follow: false },
};

export default function Page() {
  const x = notesIndex();
  return <RecordIndex head={x.head} groups={x.groups} intro={x.intro} blocks={x.blocks} />;
}
