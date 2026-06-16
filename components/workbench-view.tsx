import Link from "next/link";
import type { Workbench } from "@/data/workbenches";
import { incidentBySlug } from "@/data/troubleshooting";
import { Crumb, CenterHeader, Block } from "@/components/knowledge";
import { SapTip } from "@/components/sap-tip";

function Chips({ items }: { items: string[] }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {items.filter((t) => t && t !== "—").map((t) => (
        <SapTip key={t} name={t}>
          <span className="tech rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-bold text-slate-600" dir="ltr">{t}</span>
        </SapTip>
      ))}
    </div>
  );
}

const TAG_COLOR: Record<string, string> = {
  "READ-ONLY": "border-emerald-200 bg-emerald-50 text-emerald-700",
  "UPDATE-RISKY": "border-red-200 bg-red-50 text-red-700",
  "verify SE18": "border-amber-200 bg-amber-50 text-amber-700",
  "verify SE37": "border-amber-200 bg-amber-50 text-amber-700",
};

function Items({ items }: { items: { name: string; tag?: string; desc: string }[] }) {
  return (
    <ul className="space-y-2.5">
      {items.map((it) => (
        <li key={it.name} className="flex flex-col gap-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="tech text-sm font-bold text-slate-800" dir="ltr">{it.name}</span>
            {it.tag && <span className={`rounded-md border px-1.5 py-0.5 text-[10px] font-bold ${TAG_COLOR[it.tag] ?? "border-slate-200 bg-slate-50 text-slate-500"}`} dir="ltr">{it.tag}</span>}
          </div>
          <span className="text-sm leading-relaxed text-slate-600">{it.desc}</span>
        </li>
      ))}
    </ul>
  );
}

export function WorkbenchView({ w }: { w: Workbench }) {
  return (
    <div dir="rtl">
      <Crumb trail={[{ href: "/knowledge/", label: "מרכז הידע" }, { href: "/workbench/", label: "שולחנות עבודה" }, { label: w.he }]} />
      <CenterHeader eyebrow={`שולחן עבודה · ${w.module}`} title={w.title} sub={w.intro} accent={w.accent} />

      <div className="grid gap-4 lg:grid-cols-2">
        <Block title="מושגים (Concepts)" accent={w.accent}>
          <ul className="space-y-2.5">
            {w.concepts.map((c) => (
              <li key={c.term} className="flex flex-col gap-0.5">
                <span><span className="tech font-bold text-slate-800" dir="ltr">{c.term}</span> <span className="text-xs text-slate-400">· {c.he}</span></span>
                <span className="text-sm leading-relaxed text-slate-600">{c.desc}</span>
              </li>
            ))}
          </ul>
        </Block>

        <Block title="ארכיטקטורה (Architecture)" accent={w.accent}>
          <ul className="space-y-2 text-sm leading-relaxed text-slate-600">{w.architecture.map((a, idx) => <li key={idx} className="flex gap-2"><span className="text-slate-300">▸</span><span>{a}</span></li>)}</ul>
        </Block>
      </div>

      <div className="mt-4">
        <Block title="זרימת תהליך (Process Flow)" accent={w.accent}>
          <ol className="space-y-2">
            {w.processFlow.map((f, idx) => (
              <li key={idx} className="flex gap-3">
                <span className="tech mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white" style={{ background: w.accent }}>{idx + 1}</span>
                <span className="text-sm leading-relaxed text-slate-600"><b className="text-slate-800">{f.step}</b> — {f.detail}</span>
              </li>
            ))}
          </ol>
        </Block>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <Block title="טבלאות (Tables)" accent="#0891b2">
          <ul className="space-y-2">
            {w.tables.map((t) => (
              <li key={t.name} className="flex flex-col gap-0.5">
                <span className="tech text-sm font-bold text-slate-800" dir="ltr">{t.name}</span>
                <span className="text-sm leading-relaxed text-slate-600">{t.desc}</span>
              </li>
            ))}
          </ul>
        </Block>
        <Block title="טרנזקציות (Transactions)" accent="#0891b2"><Chips items={w.transactions} /></Block>
        <Block title="Function Modules / BAPIs" accent="#7c3aed"><Items items={w.functionModules} /></Block>
        <Block title="BAdIs" accent="#7c3aed"><Items items={w.badis} /></Block>
        <Block title="User Exits" accent="#7c3aed"><Items items={w.userExits} /></Block>
        <Block title="נקודות Debug (Debug Entry Points)" accent="#be185d">
          <ul className="space-y-2 text-sm leading-relaxed text-slate-600">{w.debugEntry.map((d, idx) => <li key={idx} className="flex gap-2"><span className="text-slate-300">▸</span><span>{d}</span></li>)}</ul>
        </Block>
      </div>

      <div className="mt-4">
        <Block title="ECC מול S/4HANA" accent="#2563eb">
          <div className="space-y-3">
            {w.eccS4.map((d, idx) => (
              <div key={idx} className="grid gap-2 sm:grid-cols-2">
                <div className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm leading-relaxed text-slate-600"><b className="tech text-xs text-slate-400">ECC</b><br />{d.ecc}</div>
                <div className="rounded-lg border border-blue-200 bg-blue-50 px-3 py-2 text-sm leading-relaxed text-slate-700"><b className="tech text-xs text-blue-400">S/4HANA</b><br />{d.s4}</div>
              </div>
            ))}
          </div>
        </Block>
      </div>

      {w.incidents.filter((s) => incidentBySlug(s)).length > 0 && (
        <div className="mt-4">
          <Block title="תקלות נפוצות קשורות (Common Incidents)" accent="#dc2626">
            <div className="flex flex-wrap gap-2">
              {w.incidents.filter((s) => incidentBySlug(s)).map((s) => {
                const inc = incidentBySlug(s)!;
                return <Link key={s} href={`/troubleshooting/${s}/`} className="lift rounded-lg border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-bold text-red-700 hover:bg-red-100">{inc.he} →</Link>;
              })}
            </div>
          </Block>
        </div>
      )}

      <div className="mt-4">
        <Block title="דוגמאות CBC (CBC Examples)" accent="#d62027">
          <ul className="space-y-2 text-sm leading-relaxed text-slate-600">{w.cbc.map((c, idx) => <li key={idx} className="flex gap-2"><span className="text-brand">●</span><span>{c}</span></li>)}</ul>
        </Block>
      </div>

      <Link href="/workbench/" className="mt-6 inline-flex items-center gap-1.5 text-sm font-bold text-brand hover:underline">→ חזרה לשולחנות העבודה</Link>
    </div>
  );
}
