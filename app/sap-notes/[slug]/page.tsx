import Link from "next/link";
import { SAP_NOTES, noteBySlug } from "@/data/sap-notes";
import { INCIDENTS } from "@/data/troubleshooting";
import { OIC_OBJECTS } from "@/lib/cross-links";
import { Crumb, CenterHeader, Block, Bullets } from "@/components/knowledge";
import { TrustBadge } from "@/components/trust-badge";
import { trustNote } from "@/lib/trust";
import { pageMeta } from "@/lib/seo";

export function generateStaticParams() { return SAP_NOTES.map((n) => ({ slug: n.slug })); }
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const x = noteBySlug(decodeURIComponent(slug));
  if (!x) return {};
  return pageMeta({ he: x.he, title: x.title, module: x.module, blurb: x.symptom, path: `/sap-notes/${slug}/` });
}

const MOD: Record<string, string> = { PM: "#f97316", PP: "#2563eb", "PP-PI": "#6d28d9", QM: "#0d9488", Cross: "#475569" };

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const n = noteBySlug(decodeURIComponent(slug));
  if (!n) return <div className="py-20 text-center text-sm text-ink-3" dir="rtl">נושא Note לא נמצא.</div>;
  const c = MOD[n.module] || "#b45309";
  const incs = INCIDENTS.filter((i) => (n.relatedIncidents || []).includes(i.slug));
  const objs = OIC_OBJECTS.filter((o) => incs.some((i) => i.tables.includes(o.table)));
  return (
    <div dir="rtl">
      <Crumb trail={[{ href: "/knowledge/", label: "מרכז הידע" }, { href: "/sap-notes/", label: "SAP Notes" }, { label: n.he }]} />
      <CenterHeader eyebrow={`SAP Note · ${n.component}`} title={n.he} sub={n.title} accent={c} />
      <div className="mb-4"><TrustBadge trust={trustNote(!!n.noteRef)} /></div>
      {n.noteRef && <div className="mb-4 tech rounded-xl border border-amber-200 bg-amber-50 px-4 py-2 text-sm font-bold text-amber-700" dir="ltr">SAP Note: {n.noteRef}</div>}
      <div className="grid gap-4 lg:grid-cols-2">
        <Block title="מתי חל (Symptom)" accent={c}>{n.symptom}</Block>
        <Block title="גורם שורש (Cause)" accent="#dc2626">{n.cause}</Block>
        <Block title="רזולוציה" accent="#16a34a"><Bullets items={n.resolution} /></Block>
        <Block title="רלוונטיות ECC / S/4" accent="#2563eb">{n.relevance}</Block>
        <Block title="מילות חיפוש OSS (לא מספרים)" accent="#b45309"><div className="flex flex-wrap gap-1.5">{n.keywords.map((k) => <span key={k} className="tech rounded-lg border border-amber-200 bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-700" dir="ltr">{k}</span>)}</div></Block>
        <Block title="קישורים צולבים" accent="#4338ca">
          <div className="space-y-2">
            <div><p className="eyebrow mb-1 text-ink-3">תקלות</p><div className="flex flex-wrap gap-1.5">{incs.length ? incs.map((i) => <Link key={i.slug} href={`/resolution/${i.slug}/`} className="rounded-lg border border-red-200 bg-brand-soft px-2 py-0.5 text-[11px] font-bold text-brand hover:bg-red-100">{i.he}</Link>) : <span className="text-[11px] text-ink-3">—</span>}</div></div>
            <div><p className="eyebrow mb-1 text-ink-3">אובייקטים</p><div className="flex flex-wrap gap-1.5">{objs.length ? objs.map((o) => <Link key={o.slug} href={`/oic/${o.slug}/`} className="rounded-lg border border-indigo-200 bg-indigo-50 px-2 py-0.5 text-[11px] font-bold text-indigo-700 hover:bg-indigo-100">{o.he}</Link>) : <span className="text-[11px] text-ink-3">—</span>}</div></div>
          </div>
        </Block>
      </div>
      <Link href="/sap-notes/" className="mt-6 inline-flex items-center gap-1.5 text-sm font-bold text-brand hover:underline">→ חזרה ל-SAP Notes</Link>
    </div>
  );
}
