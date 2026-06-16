import { CenterHeader, CardGrid, IndexCard } from "@/components/knowledge";
import { PROCESS_MAPS } from "@/data/processes";
const DC: Record<string,string> = { MM:"#0891b2", SD:"#db2777", "PP-PI":"#6d28d9", QM:"#0d9488", PM:"#f97316" };
export default function Page() {
  return (
    <div>
      <CenterHeader eyebrow="Phase 7 · Process Explorer" title="מפות תהליך מקצה-לקצה" sub={`${PROCESS_MAPS.length} תהליכי E2E — P2P, O2C, Plan-to-Produce, QM, אחזקה. כל שלב לחיץ וחושף T-Codes, טבלאות, תוכניות, Fiori, ממשקים, תקלות ומקרי בדיקה.`} accent="#4338ca" />
      <CardGrid>
        {PROCESS_MAPS.map((p) => <IndexCard key={p.slug} href={`/process-explorer/${p.slug}/`} he={p.he} title={p.title} desc={p.summary} tag={p.domain} tagColor={DC[p.domain]||"#64748b"} />)}
      </CardGrid>
    </div>
  );
}
