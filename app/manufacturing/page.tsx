import { CenterHeader } from "@/components/knowledge";
import { CenterIndexGrid } from "@/components/topic-center";
import { CBC_SCENARIOS } from "@/data/centers/cbc";

export default function Page() {
  return (
    <div>
      <CenterHeader eyebrow="CBC Manufacturing Center" title="מרכז תרחישי CBC" sub={`תרחישי ייצור אמיתיים — משקה, תרכיז, אצוות, CIP, אריזה, מחזורי פקודה · ${CBC_SCENARIOS.length} פריטים`} accent="#d62027" />
      <CenterIndexGrid items={CBC_SCENARIOS} base="/cbc/" />
    </div>
  );
}
