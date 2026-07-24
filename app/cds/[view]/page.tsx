import { listCdsViews, cdsByView } from "@/data/cds-map";
import { tableByName } from "@/lib/knowledge-graph";
import { RelatedView } from "@/components/related-view";
import { getCdsEnrichment } from "@/data/cds-enrichment";
import type { Module } from "@/lib/types";

export function generateStaticParams() { return listCdsViews().map((view) => ({ view })); }
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ view: string }> }): Promise<import("next").Metadata> {
  const { view } = await params;
  const v = decodeURIComponent(view);
  const title = `${v} — SAP CDS View`;
  const description = `${v} — SAP S/4HANA CDS view: underlying tables, fields and analytics mapping on SAP by Sali · Project NEO.`;
  return { title, description, openGraph: { title: `SAP by Sali | ${title}`, description } };
}

export default async function Page({ params }: { params: Promise<{ view: string }> }) {
  const { view } = await params;
  const v = cdsByView(decodeURIComponent(view));
  if (!v) return <div className="py-20 text-center text-sm text-ink-3" dir="rtl">CDS View לא נמצא.</div>;
  const accent = v.module === "PM" ? "#f97316" : "#6d28d9";
  const tables = v.tables.map((n) => { const t = tableByName(n); return { name: n, module: (t?.module || v.module) as Module, he: t?.descriptionHe || "" }; });
  const enr = getCdsEnrichment(v.view);
  return (
    <>
      <RelatedView kind="CDS" code={v.view} accent={accent} tables={tables} />
      {/* Phase 14 · verified CDS enrichment — renders only when present */}
      {enr && (
        <section dir="rtl" className="container-app mt-5 rounded-2xl border border-hairline bg-surface p-5 shadow-sm">
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <h2 className="text-sm font-extrabold text-ink-1">פירוט Enterprise · CDS</h2>
            {enr.viewType && <span className="rounded-md px-2 py-0.5 text-[11px] font-bold" style={{ background: accent + "14", color: accent }}>{enr.viewType}</span>}
            {enr.verified === "verified" && <span className="inline-flex items-center gap-1 rounded-md bg-emerald-50 px-2 py-0.5 text-[11px] font-bold text-emerald-700">מאומת</span>}
          </div>
          {enr.purposeDeep && <p className="text-[14px] leading-relaxed text-ink-2">{enr.purposeDeep}</p>}
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            {enr.keyField && <div><div className="eyebrow mb-1 text-amber-600">Representative Key</div><p className="tech text-[12.5px] text-ink-2" dir="ltr">{enr.keyField}</p></div>}
            {enr.associations?.length ? <div><div className="eyebrow mb-1 text-blue-600">Associations</div><div className="flex flex-wrap gap-1.5">{enr.associations.map((a) => <span key={a} className="tech rounded bg-surface-2 px-1.5 py-0.5 text-[11px] font-bold text-ink-2" dir="ltr">{a}</span>)}</div></div> : null}
            {enr.annotations?.length ? <div><div className="eyebrow mb-1 text-ink-3">Annotations</div><ul className="space-y-0.5 text-[12.5px] text-ink-2">{enr.annotations.map((a, i) => <li key={i}>{a}</li>)}</ul></div> : null}
            {enr.perfNotes?.length ? <div><div className="eyebrow mb-1 text-cyan-600">ביצועים</div><ul className="space-y-0.5 text-[12.5px] text-ink-2">{enr.perfNotes.map((p, i) => <li key={i}>{p}</li>)}</ul></div> : null}
          </div>
          {enr.abapConsumption && <div className="mt-3"><div className="eyebrow mb-1 text-ink-3">ABAP Consumption</div><pre className="tech overflow-auto rounded-lg bg-ink-1/95 p-3 text-[11.5px] leading-relaxed text-emerald-50" dir="ltr">{enr.abapConsumption}</pre></div>}
          {enr.eccAlternative && <p className="mt-2 text-[12.5px] text-ink-3"><span className="font-bold text-ink-2">חלופת ECC: </span>{enr.eccAlternative}</p>}
          {enr.sources?.length ? <p className="mt-3 text-[11px] text-ink-3">מקורות: {enr.sources.join(" · ")}</p> : null}
        </section>
      )}
    </>
  );
}
