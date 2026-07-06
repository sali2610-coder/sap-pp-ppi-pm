import { CenterHeader } from "@/components/knowledge";
import { CenterIndexGrid } from "@/components/topic-center";
import { MFG_SCENARIOS } from "@/data/centers/manufacturing";

export default function Page() {
  return (
    <div>
      <CenterHeader eyebrow="Manufacturing Center" title="מרכז תרחישי ייצור" sub={`תרחישי ייצור אמיתיים — משקה, תרכיז, אצוות, CIP, אריזה, מחזורי פקודה · ${MFG_SCENARIOS.length} פריטים`} accent="#d62027" />
      <CenterIndexGrid items={MFG_SCENARIOS} base="/manufacturing/" />
    </div>
  );
}
