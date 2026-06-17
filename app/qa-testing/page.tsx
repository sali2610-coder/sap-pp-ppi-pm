import { CenterHeader, CardGrid, IndexCard } from "@/components/knowledge";
import { QA_PACKS } from "@/data/qa-center";

const MOD_COLOR: Record<string, string> = { PM: "#f97316", PP: "#2563eb", "PP-PI": "#6d28d9", Cross: "#475569" };

export default function Page() {
  return (
    <div>
      <CenterHeader eyebrow="מרכז הידע · QA Testing Center" title="מרכז בדיקות QA" sub={`${QA_PACKS.length} חבילות בדיקה ל-PM/PP/PP-PI — תרחישי Positive/Negative/Regression/Integration + ולידציית נתוני אב, מחזור חיי פקודה, אצוות, MRP והתחשבנות. מותאם ליועצי QA.`} accent="#be185d" />
      <CardGrid>
        {QA_PACKS.map((p) => <IndexCard key={p.slug} href={`/qa-testing/${p.slug}/`} he={p.he} title={p.area} desc={p.intro} tag={p.module} tagColor={MOD_COLOR[p.module]} />)}
      </CardGrid>
    </div>
  );
}
