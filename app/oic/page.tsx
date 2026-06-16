import { CenterHeader, CardGrid, IndexCard } from "@/components/knowledge";
import { OIC_OBJECTS } from "@/lib/cross-links";

const MOD: Record<string, string> = { PM: "#f97316", "PP-PI": "#6d28d9", QM: "#0d9488" };
export default function Page() {
  return (
    <div>
      <CenterHeader eyebrow="Phase 2 · Object Intelligence Center" title="מרכז תבונת אובייקטים" sub={`${OIC_OBJECTS.length} אובייקטי ליבה — תצוגה מאוחדת המקשרת כל אובייקט לטבלאות, T-Codes, BAPIs/FMs, BAdIs/Exits, CDS, תקלות, SAP Notes, נקודות Debug ותרחישי CBC.`} accent="#4338ca" />
      <CardGrid>
        {OIC_OBJECTS.map((o) => <IndexCard key={o.slug} href={`/oic/${o.slug}/`} he={o.he} title={o.title} desc={o.description} tag={o.module} tagColor={MOD[o.module] || "#64748b"} />)}
      </CardGrid>
    </div>
  );
}
