import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { PROCESS_GUIDES, guideBySlug } from "@/data/process-guides";
import { Crumb, CenterHeader, Block, Bullets } from "@/components/knowledge";
import { EccS4Block } from "@/components/ecc-s4-block";
import { SapTip } from "@/components/sap-tip";

export function generateStaticParams() { return PROCESS_GUIDES.map((g) => ({ slug: g.slug })); }
export const dynamicParams = false;

const MOD_COLOR: Record<string, string> = { PM: "#f97316", PP: "#2563eb", "PP-PI": "#6d28d9" };

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const g = guideBySlug(decodeURIComponent(slug));
  if (!g) return <div className="py-20 text-center text-sm text-slate-500" dir="rtl">המדריך לא נמצא.</div>;
  const c = MOD_COLOR[g.module];
  return (
    <div dir="rtl">
      <Crumb trail={[{ href: "/knowledge/", label: "מרכז הידע" }, { href: "/guides/", label: "מדריכי תהליך" }, { label: g.he }]} />
      <CenterHeader eyebrow={`מדריך תהליך · ${g.module}`} title={g.he} sub={g.summary} accent={c} />

      {/* end-to-end flow */}
      <section className="mb-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="mb-3 text-sm font-extrabold tracking-tight text-slate-900">זרימה עסקית מקצה-לקצה</h2>
        <div className="flex flex-wrap items-center gap-2">
          {g.flow.map((s, i) => (
            <span key={i} className="flex items-center gap-2">
              <span className="rounded-xl border px-3 py-2 text-xs font-bold text-slate-700" style={{ borderColor: c + "55" }}>{s}</span>
              {i < g.flow.length - 1 && <ArrowLeft className="size-4 shrink-0 rotate-180 text-slate-300" />}
            </span>
          ))}
        </div>
      </section>

      {/* step-by-step */}
      <section className="mb-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="mb-3 text-sm font-extrabold tracking-tight text-slate-900">ביצוע שלב-אחר-שלב ב-SAP</h2>
        <ol className="space-y-3">
          {g.steps.map((s, i) => (
            <li key={i} className="flex gap-3">
              <span className="grid size-7 shrink-0 place-items-center rounded-lg text-xs font-extrabold text-white" style={{ background: c }}>{i + 1}</span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-slate-800">{s.action}</p>
                <div className="mt-1 flex flex-wrap items-center gap-1.5">
                  {s.tcode && <SapTip name={s.tcode}><span className="tech rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-bold text-brand" dir="ltr">{s.tcode}</span></SapTip>}
                  {s.tables?.map((t) => <SapTip key={t} name={t}><span className="tech rounded-md bg-slate-50 px-1.5 py-0.5 text-[10px] font-bold text-slate-500" dir="ltr">{t}</span></SapTip>)}
                </div>
                {s.mistake && <p className="mt-1 text-[11px] font-semibold text-amber-700">⚠ טעות נפוצה: {s.mistake}</p>}
              </div>
            </li>
          ))}
        </ol>
      </section>

      <div className="grid gap-4 lg:grid-cols-2">
        <Block title="טעויות נפוצות" accent="#dc2626"><Bullets items={g.mistakes} /></Block>
        <Block title="זרימת אבחון (Troubleshooting)" accent="#d97706"><Bullets items={g.troubleshootFlow} /></Block>
        <Block title="נתיב Debug" accent="#be185d"><Bullets items={g.debugPath} /></Block>
        <Block title="User Exits / BAdIs" accent="#7c3aed"><div className="flex flex-wrap gap-1.5">{g.exits.map((e) => <span key={e} className="tech rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-bold text-slate-600" dir="ltr">{e}</span>)}</div></Block>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <Block title="אפליקציות Fiori" accent="#7c3aed"><div className="flex flex-wrap gap-1.5">{g.fiori.map((f) => <span key={f} className="tech rounded-lg border border-violet-200 bg-violet-50 px-2.5 py-1 text-xs font-bold text-violet-700">{f}</span>)}</div></Block>
        <Block title="דוגמת ייצור — CBC" accent="#d62027">{g.cbc}</Block>
      </div>

      <div className="mt-4"><EccS4Block data={g.eccS4} title={`ECC6 → S/4HANA · ${g.he}`} /></div>
      <Link href="/guides/" className="mt-6 inline-flex items-center gap-1.5 text-sm font-bold text-brand hover:underline">→ חזרה למדריכי תהליך</Link>
    </div>
  );
}
