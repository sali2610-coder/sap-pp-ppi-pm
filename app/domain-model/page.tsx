import Link from "next/link";
import { CenterHeader } from "@/components/knowledge";
import { MFG_AREAS, MODULE_COLOR } from "@/data/domain-model";
export default function Page() {
  return (
    <div dir="rtl">
      <CenterHeader eyebrow="Domain Knowledge Model" title="מודל תחום" sub={`${MFG_AREAS.length} אזורי מפעל (קו ייצור, חדר תרכיז, CIP, אצוות, אריזה, איכות, מחסן) מחוברים למודולי SAP (PP/PP-PI/QM/PM/MM) + אובייקטים, מפות תהליך ותקלות.`} accent="#d62027" />
      <div className="space-y-4">
        {MFG_AREAS.map((a) => (
          <section key={a.slug} className="rounded-2xl border border-hairline bg-surface p-5 shadow-sm">
            <div className="mb-2 flex flex-wrap items-center gap-2">
              <h2 className="text-base font-extrabold tracking-tight text-ink-1">{a.he} · <span className="tech" dir="ltr">{a.title}</span></h2>
              <div className="ms-auto flex gap-1">{a.modules.map((m) => <span key={m} className="rounded-full px-2 py-0.5 text-[10px] font-bold text-white" style={{ background: MODULE_COLOR[m] || "#64748b" }}>{m}</span>)}</div>
            </div>
            <p className="text-[13px] leading-relaxed text-ink-2">{a.description}</p>
            <div className="mt-3 flex flex-wrap items-center gap-1.5">
              {a.flow.map((s, i) => <span key={i} className="flex items-center gap-1.5"><span className="rounded-lg border border-hairline px-2.5 py-1 text-[11px] font-bold text-ink-2">{s}</span>{i < a.flow.length - 1 && <span className="text-ink-3">←</span>}</span>)}
            </div>
            <div className="mt-3 grid-adaptive-sm">
              <div><p className="eyebrow mb-1 text-ink-3">אובייקטי SAP</p><div className="flex flex-wrap gap-1.5">{a.objects.map((o) => <Link key={o.href + o.label} href={o.href} className="rounded-lg border border-indigo-200 bg-indigo-50 px-2 py-0.5 text-[11px] font-bold text-indigo-700 hover:bg-indigo-100">{o.label}</Link>)}</div></div>
              <div><p className="eyebrow mb-1 text-ink-3">מפות תהליך</p><div className="flex flex-wrap gap-1.5">{a.processes.map((o) => <Link key={o.href + o.label} href={o.href} className="rounded-lg border border-blue-200 bg-blue-50 px-2 py-0.5 text-[11px] font-bold text-blue-700 hover:bg-blue-100">{o.label}</Link>)}</div></div>
              <div><p className="eyebrow mb-1 text-ink-3">תקלות</p><div className="flex flex-wrap gap-1.5">{a.incidents.map((o) => <Link key={o.href + o.label} href={o.href} className="rounded-lg border border-red-200 bg-red-50 px-2 py-0.5 text-[11px] font-bold text-red-600 hover:bg-red-100">{o.label}</Link>)}</div></div>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
