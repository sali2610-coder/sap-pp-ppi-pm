import Link from "next/link";
import { INCIDENTS, incidentBySlug } from "@/data/troubleshooting";
import { OIC_OBJECTS } from "@/lib/cross-links";
import { SAP_NOTES } from "@/data/sap-notes";
import { Crumb, CenterHeader, Block, Bullets } from "@/components/knowledge";
import { SapTip } from "@/components/sap-tip";

export function generateStaticParams() { return INCIDENTS.map((i) => ({ slug: i.slug })); }
export const dynamicParams = false;
const MOD: Record<string, string> = { PM: "#f97316", PP: "#2563eb", "PP-PI": "#6d28d9", QM: "#0d9488", Cross: "#475569" };

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const i = incidentBySlug(decodeURIComponent(slug));
  if (!i) return <div className="py-20 text-center text-sm text-slate-500" dir="rtl">נתיב לא נמצא.</div>;
  const c = MOD[i.module] || "#475569";
  const objs = OIC_OBJECTS.filter((o) => i.tables.includes(o.table));
  const notes = SAP_NOTES.filter((n) => (n.relatedIncidents || []).includes(i.slug));
  const STAGES: { he: string; tone: string; items: string[] }[] = [
    { he: "1 · Detect — זיהוי", tone: "#0e7490", items: [i.symptom, ...(i.error && i.error !== "—" ? [`קוד שגיאה: ${i.error}`] : [])] },
    { he: "2 · Isolate — בידוד", tone: "#0891b2", items: [`T-Codes לאבחון: ${i.analyzeTcodes.join(", ")}`, `טבלאות לבדיקה: ${i.tables.join(", ")}`] },
    { he: "3 · Diagnose — אבחון שורש", tone: "#d97706", items: [...i.rootCauses, ...i.debugEntry.map((d) => `Debug: ${d}`)] },
    { he: "4 · Resolve — תיקון", tone: "#16a34a", items: i.fix },
    { he: "5 · Prevent — מניעה", tone: "#7c3aed", items: i.prevention && i.prevention.length ? i.prevention : ["הוסף ניטור/ולידציה/Job מתוזמן למניעת הישנות"] },
  ];
  return (
    <div dir="rtl">
      <Crumb trail={[{ href: "/knowledge/", label: "מרכז הידע" }, { href: "/resolution/", label: "מנוע נתיב פתרון" }, { label: i.he }]} />
      <CenterHeader eyebrow={`נתיב פתרון · ${i.module}`} title={i.he} sub={i.impact ? `השפעה עסקית: ${i.impact}` : i.symptom} accent={c} />
      <div className="relative space-y-3 border-r-2 pr-5" style={{ borderColor: c + "33" }}>
        {STAGES.map((s, idx) => (
          <div key={idx} className="relative">
            <span className="absolute -right-[27px] top-1.5 size-3 rounded-full ring-4 ring-white" style={{ background: s.tone }} />
            <Block title={s.he} accent={s.tone}><Bullets items={s.items} /></Block>
          </div>
        ))}
      </div>
      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <Block title="אובייקטים מושפעים" accent="#4338ca">{objs.length ? <div className="flex flex-wrap gap-1.5">{objs.map((o) => <Link key={o.slug} href={`/oic/${o.slug}/`} className="tech rounded-lg border border-indigo-200 bg-indigo-50 px-2.5 py-1 text-xs font-bold text-indigo-700 hover:bg-indigo-100">{o.he}</Link>)}</div> : <span className="text-slate-400">—</span>}</Block>
        <Block title="SAP Notes קשורים" accent="#b45309">{notes.length ? <div className="flex flex-wrap gap-1.5">{notes.map((n) => <Link key={n.slug} href={`/sap-notes/${n.slug}/`} className="tech rounded-lg border border-amber-200 bg-amber-50 px-2.5 py-1 text-xs font-bold text-amber-700 hover:bg-amber-100">{n.component}</Link>)}</div> : <span className="text-slate-400">—</span>}</Block>
      </div>
      <div className="mt-3"><Block title="Exits / BAdIs ל-Debug" accent="#7c3aed"><div className="flex flex-wrap gap-1.5">{i.exits.filter((e) => e !== "—").map((e) => <SapTip key={e} name={e}><span className="tech rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-bold text-slate-600" dir="ltr">{e}</span></SapTip>)}</div></Block></div>
      <Link href="/resolution/" className="mt-6 inline-flex items-center gap-1.5 text-sm font-bold text-brand hover:underline">→ חזרה למנוע נתיב הפתרון</Link>
    </div>
  );
}
