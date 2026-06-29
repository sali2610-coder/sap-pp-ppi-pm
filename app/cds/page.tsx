import { CenterHeader } from "@/components/knowledge";
import { CdsExplorer } from "@/components/cds-explorer";
import { CDS_VIEWS } from "@/data/cds-map";

export const metadata = { title: "CDS Explorer · NEO" };

export default function Page() {
  return (
    <div>
      <CenterHeader
        eyebrow="S/4HANA · CDS Explorer"
        title="חוקר תצוגות CDS"
        sub={`מודל הנתונים הווירטואלי של S/4HANA — ${CDS_VIEWS.length} תצוגות CDS לאורך השרשרת טבלת ECC → Interface (I_) → Consumption (C_) → Fiori. מבוסס ידע SAP מאומת.`}
        accent="#16a34a"
      />
      <CdsExplorer />
    </div>
  );
}
