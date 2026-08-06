import Link from "next/link";
import {
  LayoutGrid, Workflow, Boxes, Terminal, Table, Plug, Sigma, AppWindow, Settings,
  Cable, AlertTriangle, GitBranch, ArrowLeft, Compass, Search, GraduationCap,
} from "lucide-react";
import type { SAPModuleData } from "@/lib/types";
import { NAV_SECTIONS, overviewStats, sectionCount, processSteps, moduleAccent } from "@/lib/module-portal";
import { moduleIdOf } from "@/lib/academy/model";
import { onTint } from "@/lib/contrast";

const ICONS: Record<string, typeof LayoutGrid> = {
  LayoutGrid, Workflow, Boxes, Terminal, Table, Plug, Sigma, AppWindow, Settings, Cable, AlertTriangle, GitBranch,
};
const fmt = (n: number) => n.toLocaleString("en-US");

export function ModulePortal({ module, slug }: { module: SAPModuleData; slug: string }) {
  const st = overviewStats(module);
  const accent = moduleAccent(module);
  const flow = processSteps(module).slice(0, 9);
  const metrics: [number, string][] = [
    [st.tables, "טבלאות"], [st.fields, "שדות"], [st.topics, "נושאים"], [st.transactions, "טרנזקציות"],
    [st.bapis, "BAPIs/FMs"], [st.cds, "CDS"], [st.fiori, "Fiori"],
  ];
  return (
    <div dir="rtl" className="space-y-10">
      {/* breadcrumb */}
      <nav aria-label="נתיב" className="flex items-center gap-1.5 text-xs text-ink-3">
        <Link href="/" className="hover:text-ink-1">בית</Link><ArrowLeft className="size-3" />
        <span className="font-bold text-ink-2">SAP {module.module}</span>
      </nav>

      {/* doc header */}
      <header className="rounded-2xl border border-hairline bg-surface p-6 sm:p-8">
        <span className="eyebrow-2">SAP {module.module} · Documentation</span>
        <div className="mt-2 flex flex-wrap items-center gap-3">
          <h1 className="text-3xl font-black tracking-tight text-ink-1 sm:text-4xl">{module.title}</h1>
          <span className="rounded-md px-2 py-0.5 text-[12px] font-bold" style={{ background: accent + "14", color: onTint(accent, 0x14 / 255) }}>{module.module}</span>
        </div>
        <p className="mt-3 max-w-3xl text-[15px] leading-relaxed text-ink-2">
          פורטל התיעוד ל-SAP {module.module}: ארכיטקטורה, תהליך עסקי מקצה לקצה, נתוני אב, טבלאות, טרנזקציות, ממשקים, תצורה ותקלות — הכל מקושר. ECC6 → S/4HANA.
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[12.5px] font-medium text-ink-3">
          {metrics.map(([n, l]) => (
            <span key={l} className="inline-flex items-center gap-1.5"><b className="font-mono font-bold text-ink-2 [unicode-bidi:isolate]" dir="ltr">{fmt(n)}</b>{l}</span>
          ))}
        </div>
        <div className="mt-5 flex flex-wrap gap-2">
          {/* Learn is now the lead action — a newcomer landing on the reference hub
              gets an explicit door into the structured course. Studio + Knowledge stay
              one click away as secondary (outline) actions. */}
          <Link href={`/academy/path/${moduleIdOf(module.module)}/`} className="tap inline-flex items-center gap-1.5 rounded-lg bg-brand px-3.5 py-2 text-[13px] font-bold text-white shadow-sm transition hover:bg-brand-dark active:scale-95"><GraduationCap className="size-4" />למד בקורס · SAP Academy</Link>
          <Link href="/studio/" className="tap inline-flex items-center gap-1.5 rounded-lg border border-hairline bg-surface px-3.5 py-2 text-[13px] font-bold text-ink-2 transition hover:border-brand/40 hover:text-brand active:scale-95"><Compass className="size-4" />Architecture Studio</Link>
          <Link href="/knowledge/" className="tap inline-flex items-center gap-1.5 rounded-lg border border-hairline bg-surface px-3.5 py-2 text-[13px] font-bold text-ink-2 transition hover:border-brand/40 hover:text-brand active:scale-95"><Search className="size-4" />מרכז ידע</Link>
        </div>
      </header>

      {/* business process at a glance */}
      {flow.length > 0 && (
        <section className="space-y-3">
          <div><span className="eyebrow-2">תהליך עסקי · Business Process</span><h2 className="mt-1 text-xl font-extrabold tracking-tight text-ink-1">הזרימה במבט מהיר</h2></div>
          <div className="flex flex-wrap items-center gap-1.5 rounded-2xl border border-hairline bg-surface p-3">
            {flow.map((s, i) => (
              <span key={s.code} className="flex items-center gap-1.5">
                {s.exists
                  ? <Link href={`/object/${encodeURIComponent(s.code)}/`} className="tech inline-flex items-center gap-1.5 rounded-lg border border-hairline bg-surface px-2.5 py-1 font-mono text-[12px] font-bold text-ink-2 transition hover:border-brand/40 hover:text-brand" dir="ltr"><span className="tech" dir="rtl">{s.label}</span><span className="text-ink-3">{s.code}</span></Link>
                  : <span className="rounded-lg bg-surface-2 px-2.5 py-1 text-[12px] font-bold text-ink-3">{s.label}</span>}
                {i < flow.length - 1 && <ArrowLeft className="size-3.5 text-ink-3/50" />}
              </span>
            ))}
            <Link href={`/${slug}/business-process/`} className="ms-auto inline-flex items-center gap-1 text-[12.5px] font-bold text-brand">כל התהליך<ArrowLeft className="size-3.5" /></Link>
          </div>
        </section>
      )}

      {/* section directory */}
      <section className="space-y-4">
        <div><span className="eyebrow-2">תוכן · Contents</span><h2 className="mt-1 text-xl font-extrabold tracking-tight text-ink-1">חלקי הפורטל</h2></div>
        <div className="grid-adaptive">
          {NAV_SECTIONS.map((s) => {
            const Ic = ICONS[s.icon] || GitBranch;
            const n = sectionCount(module, s.slug);
            return (
              <Link key={s.slug} href={`/${slug}/${s.slug}/`} className="card-interactive group flex flex-col gap-2.5 p-5">
                <div className="flex items-center gap-3">
                  <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-surface-2 text-ink-2 transition group-hover:bg-brand/10 group-hover:text-brand"><Ic className="size-[20px]" /></span>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2"><span className="text-[14.5px] font-extrabold text-ink-1">{s.he}</span>{n > 0 && <span className="rounded-md bg-surface-2 px-1.5 py-0.5 font-mono text-[10.5px] font-bold text-ink-3">{fmt(n)}</span>}</div>
                    <div className="text-[11px] font-medium uppercase tracking-wide text-ink-3">{s.en}</div>
                  </div>
                </div>
                <p className="text-[12.5px] leading-relaxed text-ink-2">{s.desc}</p>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
