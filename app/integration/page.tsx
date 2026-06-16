import { CenterHeader } from "@/components/knowledge";
import { CenterIndexGrid } from "@/components/topic-center";
import { INTEGRATIONS } from "@/data/centers/integration";

export default function Page() {
  return (
    <div>
      <CenterHeader eyebrow="Integration Center" title="מרכז אינטגרציה" sub={`IDoc/ALE/RFC/BAPI/OData/CPI — זרימת הודעה, קודי סטטוס, כשלים, ניטור · ${INTEGRATIONS.length} פריטים`} accent="#0891b2" />
      <CenterIndexGrid items={INTEGRATIONS} base="/integration/" />
    </div>
  );
}
