import { CenterHeader, CardGrid, IndexCard } from "@/components/knowledge";
import { INCIDENTS } from "@/data/troubleshooting";

const MOD: Record<string, string> = { PM: "#f97316", PP: "#2563eb", "PP-PI": "#6d28d9", QM: "#0d9488", Cross: "#475569" };
export default function Page() {
  return (
    <div>
      <CenterHeader eyebrow="Phase 2 · Resolution Path Engine" title="מנוע נתיב פתרון" sub={`${INCIDENTS.length} נתיבי פתרון מובנים — Detect → Isolate → Diagnose → Resolve → Prevent, עם קישור צולב לאובייקטים, SAP Notes ונקודות Debug.`} accent="#0e7490" />
      <CardGrid>
        {INCIDENTS.map((i) => <IndexCard key={i.slug} href={`/resolution/${i.slug}/`} he={i.he} title={i.slug} desc={i.symptom} tag={i.module} tagColor={MOD[i.module] || "#64748b"} />)}
      </CardGrid>
    </div>
  );
}
