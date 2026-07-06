import { CenterHeader, CardGrid, IndexCard } from "@/components/knowledge";
import { PROCESS_GUIDES } from "@/data/process-guides";

const MOD_COLOR: Record<string, string> = { PM: "#f97316", PP: "#2563eb", "PP-PI": "#6d28d9" };

export default function Page() {
  return (
    <div>
      <CenterHeader eyebrow="מרכז הידע · Deep Process Guides" title="מדריכי תהליך מעמיקים" sub={`${PROCESS_GUIDES.length} תהליכי PM/PP/PP-PI מקצה-לקצה — זרימה עסקית, ביצוע שלב-אחר-שלב ב-SAP, טעולות נפוצות, זרימת אבחון, נתיב Debug, Exits/BAdIs, ECC↔S/4, Fiori ודוגמת הארגון.`} accent="#0369a1" />
      <CardGrid>
        {PROCESS_GUIDES.map((g) => <IndexCard key={g.slug} href={`/guides/${g.slug}/`} he={g.he} title={g.title} desc={g.summary} tag={g.module} tagColor={MOD_COLOR[g.module]} />)}
      </CardGrid>
    </div>
  );
}
