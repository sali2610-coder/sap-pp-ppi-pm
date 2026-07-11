import Link from "next/link";
import { CenterHeader } from "@/components/knowledge";
import { SAP_NOTES } from "@/data/sap-notes";
import { INCIDENTS } from "@/data/troubleshooting";
import { OIC_OBJECTS } from "@/lib/cross-links";

const MOD: Record<string, string> = { PM: "#f97316", PP: "#2563eb", "PP-PI": "#6d28d9", QM: "#0d9488", Cross: "#475569" };

export default function Page() {
  const incBySlug = new Map(INCIDENTS.map((i) => [i.slug, i]));
  return (
    <div dir="rtl">
      <CenterHeader eyebrow="Phase 2 · SAP Notes Graph" title="גרף SAP Notes" sub={`${SAP_NOTES.length} נושאי Note (לפי Application Component) — כל צומת מקשר ל-תקלות, אובייקטים מושפעים ונתיבי פתרון. ללא מספרי Note מומצאים; חיפוש לפי רכיב + מילות מפתח.`} accent="#b45309" />
      <div className="space-y-3">
        {SAP_NOTES.map((n) => {
          const incs = (n.relatedIncidents || []).map((s) => incBySlug.get(s)).filter(Boolean) as typeof INCIDENTS;
          const objs = OIC_OBJECTS.filter((o) => incs.some((i) => i!.tables.includes(o.table)));
          const col = MOD[n.module] || "#475569";
          return (
            <section key={n.slug} className="rounded-2xl border border-hairline bg-surface p-5 shadow-sm">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full px-2.5 py-0.5 text-[11px] font-bold text-white" style={{ background: col }}>{n.module}</span>
                <span className="tech rounded-md bg-amber-50 px-2 py-0.5 text-[11px] font-bold text-amber-700" dir="ltr">{n.component}</span>
                <Link href={`/sap-notes/${n.slug}/`} className="text-sm font-extrabold text-ink-1 hover:text-brand">{n.he}</Link>
              </div>
              <div className="mt-3 grid-adaptive-sm">
                <div><p className="eyebrow mb-1 text-ink-3">↔ תקלות</p><div className="flex flex-wrap gap-1.5">{incs.length ? incs.map((i) => <Link key={i!.slug} href={`/resolution/${i!.slug}/`} className="rounded-lg border border-red-200 bg-red-50 px-2 py-0.5 text-[11px] font-bold text-red-600 hover:bg-red-100">{i!.he}</Link>) : <span className="text-[11px] text-ink-3">—</span>}</div></div>
                <div><p className="eyebrow mb-1 text-ink-3">↔ אובייקטים</p><div className="flex flex-wrap gap-1.5">{objs.length ? objs.map((o) => <Link key={o.slug} href={`/oic/${o.slug}/`} className="rounded-lg border border-indigo-200 bg-indigo-50 px-2 py-0.5 text-[11px] font-bold text-indigo-700 hover:bg-indigo-100">{o.he}</Link>) : <span className="text-[11px] text-ink-3">—</span>}</div></div>
                <div><p className="eyebrow mb-1 text-ink-3">↔ מילות חיפוש OSS</p><div className="flex flex-wrap gap-1.5">{n.keywords.slice(0, 5).map((k) => <span key={k} className="tech rounded border border-hairline bg-surface-2 px-1.5 py-0.5 text-[10px] font-semibold text-ink-3" dir="ltr">{k}</span>)}</div></div>
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
