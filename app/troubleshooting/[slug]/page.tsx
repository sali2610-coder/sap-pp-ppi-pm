import Link from "next/link";
import { INCIDENTS, incidentBySlug } from "@/data/troubleshooting";
import { Crumb, CenterHeader, Block, Bullets } from "@/components/knowledge";
import { SapTip } from "@/components/sap-tip";

export function generateStaticParams() { return INCIDENTS.map((i) => ({ slug: i.slug })); }
export const dynamicParams = false;

const MOD_COLOR: Record<string, string> = { PM: "#f97316", PP: "#2563eb", "PP-PI": "#6d28d9", Cross: "#475569" };

function Chips({ items }: { items: string[] }) {
  return <div className="flex flex-wrap gap-1.5">{items.map((t) => <SapTip key={t} name={t}><span className="tech rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-bold text-slate-600" dir="ltr">{t}</span></SapTip>)}</div>;
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const i = incidentBySlug(decodeURIComponent(slug));
  if (!i) return <div className="py-20 text-center text-sm text-slate-500" dir="rtl">התקלה לא נמצאה.</div>;
  const c = MOD_COLOR[i.module];
  return (
    <div dir="rtl">
      <Crumb trail={[{ href: "/knowledge/", label: "מרכז הידע" }, { href: "/troubleshooting/", label: "פתרון תקלות" }, { label: i.he }]} />
      <CenterHeader eyebrow={`תקלה · ${i.module}`} title={i.he} sub={i.symptom} accent={c} />
      {i.error && i.error !== "—" && <div className="mb-4 tech rounded-xl border border-red-200 bg-red-50 px-4 py-2 text-sm font-bold text-red-700" dir="ltr">{i.error}</div>}
      <div className="grid gap-4 lg:grid-cols-2">
        <Block title="גורמי שורש אפשריים" accent="#dc2626"><Bullets items={i.rootCauses} /></Block>
        <Block title="שלבי תיקון" accent="#16a34a"><Bullets items={i.fix} /></Block>
        <Block title="T-Codes לאבחון" accent="#0891b2"><Chips items={i.analyzeTcodes} /></Block>
        <Block title="טבלאות לבדיקה" accent="#0891b2"><Chips items={i.tables} /></Block>
        <Block title="נקודות Debug" accent="#be185d"><Bullets items={i.debugEntry} /></Block>
        <Block title="Exits / BAdIs קשורים" accent="#7c3aed"><div className="flex flex-wrap gap-1.5">{i.exits.filter((e) => e !== "—").map((e) => <span key={e} className="tech rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-bold text-slate-600" dir="ltr">{e}</span>)}</div></Block>
      </div>
      {i.cbc && <div className="mt-4"><Block title="דוגמה — CBC" accent="#d62027">{i.cbc}</Block></div>}
      <Link href="/troubleshooting/" className="mt-6 inline-flex items-center gap-1.5 text-sm font-bold text-brand hover:underline">→ חזרה למרכז פתרון תקלות</Link>
    </div>
  );
}
