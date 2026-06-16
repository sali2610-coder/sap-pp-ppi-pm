import { CenterHeader } from "@/components/knowledge";
import { CenterIndexGrid } from "@/components/topic-center";
import { BLUEPRINTS } from "@/data/centers/blueprints";

export default function Page() {
  return (
    <div>
      <CenterHeader eyebrow="Business Blueprint Center" title="מרכז הבלופרינטים" sub={`בלופרינטים עסקיים PM/PP-PI — היקף, גורמים, קלט/פלט, תלויות, אינטגרציה, נתוני אב, תרשים E2E, ECC↔S/4 · ${BLUEPRINTS.length} פריטים`} accent="#0369a1" />
      <CenterIndexGrid items={BLUEPRINTS} base="/blueprints/" />
    </div>
  );
}
