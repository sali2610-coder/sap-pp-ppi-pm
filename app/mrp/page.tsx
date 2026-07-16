import Link from "next/link";
import { CenterHeader } from "@/components/knowledge";
import { EccS4Block } from "@/components/ecc-s4-block";
import { MRP_SECTIONS, PLANNING_STRATEGIES, MRP_TCODES } from "@/data/mrp-center";
import { tcodeByCode } from "@/data/transactions";

const ACC = "#1d4ed8";

function TcodeChip({ code }: { code: string }) {
  const has = !!tcodeByCode(code);
  return has
    ? <Link href={`/tcode/${encodeURIComponent(code.toUpperCase())}/`} className="tech tap rounded-lg border border-blue-200 bg-blue-50 px-2.5 py-1 text-xs font-bold text-blue-700 hover:bg-blue-100" dir="ltr">{code}</Link>
    : <span className="tech rounded-lg border border-dashed border-hairline bg-surface px-2.5 py-1 text-xs font-bold text-ink-3" dir="ltr">{code}</span>;
}

export default function Page() {
  return (
    <div dir="rtl">
      <CenterHeader eyebrow="מרכז הידע · MRP / MPS Center" title="מרכז תכנון — MRP / MPS" sub="מדריך תכנון מעמיק: יסודות MRP, MRP Live מול קלאסי, MPS, PIR ותחזית, אסטרטגיות תכנון (10/11/20/40/50/70), Net-Change/Regenerative, MRP Areas, Lot-Sizing/מלאי בטחון, וגרסת ייצור — עם בלוקי ECC↔S/4." accent={ACC} />

      <div className="mb-4 flex flex-wrap gap-1.5">
        {MRP_TCODES.map((t) => <TcodeChip key={t} code={t} />)}
      </div>

      <div className="space-y-4">
        {MRP_SECTIONS.map((s) => (
          <section key={s.id} className="rounded-2xl border border-hairline bg-surface p-5 shadow-sm">
            <h2 className="mb-2 flex items-center gap-2 text-base font-extrabold tracking-tight text-ink-1"><span className="size-2.5 rounded-full" style={{ background: ACC }} />{s.he}</h2>
            <p className="text-sm leading-relaxed text-ink-2">{s.body}</p>
            <ul className="mt-3 space-y-1.5">
              {s.points.map((p, i) => <li key={i} className="flex gap-2 text-[13px] text-ink-2"><span className="mt-1.5 size-1.5 shrink-0 rounded-full" style={{ background: ACC }} />{p}</li>)}
            </ul>
            {(s.tcodes?.length || s.tables?.length) && (
              <div className="mt-3 flex flex-wrap items-center gap-3 border-t border-hairline pt-3">
                {s.tcodes?.length ? <div className="flex flex-wrap items-center gap-1.5"><span className="text-[11px] font-bold text-ink-3">T-Codes:</span>{s.tcodes.map((t) => <TcodeChip key={t} code={t} />)}</div> : null}
                {s.tables?.length ? <div className="flex flex-wrap items-center gap-1.5"><span className="text-[11px] font-bold text-ink-3">טבלאות:</span>{s.tables.map((t) => <span key={t} className="tech rounded bg-surface-2 px-2 py-0.5 text-[11px] font-bold text-ink-3" dir="ltr">{t}</span>)}</div> : null}
              </div>
            )}
            {s.eccS4 && <div className="mt-4"><EccS4Block data={s.eccS4} title={`ECC6 → S/4HANA · ${s.he}`} /></div>}
          </section>
        ))}
      </div>

      {/* planning strategies table */}
      <h2 className="mb-3 mt-7 text-lg font-extrabold tracking-tight text-ink-1">אסטרטגיות תכנון — טבלת עזר</h2>
      <div className="overflow-x-auto rounded-2xl border border-hairline bg-surface shadow-sm">
        <table className="w-full min-w-[720px] text-sm">
          <thead className="bg-surface-2 text-xs font-bold text-ink-3">
            <tr><th className="p-3 text-center">אסטרטגיה</th><th className="p-3 text-start">שם</th><th className="p-3 text-start">תיאור</th><th className="p-3 text-center">Req. Type</th><th className="p-3 text-start">צריכה</th></tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {PLANNING_STRATEGIES.map((s) => (
              <tr key={s.key}>
                <td className="p-3 text-center"><span className="tech rounded-full bg-blue-600 px-2.5 py-1 text-xs font-extrabold text-white">{s.key}</span></td>
                <td className="p-3 font-bold text-ink-1">{s.he}</td>
                <td className="p-3 text-[12px] leading-snug text-ink-2">{s.desc}</td>
                <td className="p-3 text-center"><span className="tech text-xs font-bold text-ink-3" dir="ltr">{s.reqType}</span></td>
                <td className="p-3 text-[12px] leading-snug text-ink-3">{s.consumption}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <Link href="/domain/pppi-mrp/" className="text-sm font-bold text-brand hover:underline">→ דומיין MRP</Link>
        <Link href="/domain/pppi-mps/" className="text-sm font-bold text-brand hover:underline">→ דומיין MPS</Link>
        <Link href="/domain/pppi-planning-strategies/" className="text-sm font-bold text-brand hover:underline">→ אסטרטגיות תכנון</Link>
      </div>
    </div>
  );
}
