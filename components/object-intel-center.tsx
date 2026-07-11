import Link from "next/link";
import { Database, Terminal, Boxes, Cable, FileCode2, ShieldAlert, BookText, Bug, Factory, GitBranch, ArrowRight } from "lucide-react";
import type { ObjectGraph, LinkRef } from "@/lib/cross-links";
import type { OICObject } from "@/lib/cross-links";
import { EccS4Block } from "@/components/ecc-s4-block";
import { DepGraph } from "@/components/dep-graph";
import { TrustBadge } from "@/components/trust-badge";
import { trustTable, trustDomain } from "@/lib/trust";

function Facet({ title, icon, tone, refs }: { title: string; icon: React.ReactNode; tone: string; refs: LinkRef[] }) {
  return (
    <section className="rounded-2xl border border-hairline bg-surface p-4 shadow-sm" dir="rtl">
      <h2 className="mb-2.5 flex items-center gap-2 text-sm font-extrabold tracking-tight text-ink-1">{icon}{title}<span className="ms-auto text-[11px] font-bold text-ink-3">{refs.length}</span></h2>
      {refs.length ? (
        <div className="flex flex-wrap gap-1.5">
          {refs.map((r) => r.href
            ? <Link key={r.id} href={r.href} title={r.sub} className="tech tap rounded-lg border px-2.5 py-1 text-xs font-bold transition hover:border-brand hover:text-brand" style={{ borderColor: tone + "44", color: tone }} dir="ltr">{r.label}</Link>
            : <span key={r.id} title={r.sub} className="tech rounded-lg border border-dashed border-hairline bg-surface px-2.5 py-1 text-xs font-bold text-ink-3" dir="ltr">{r.label}</span>)}
        </div>
      ) : <p className="text-xs text-ink-3">אין פריטים מקושרים.</p>}
    </section>
  );
}

export function ObjectIntelView({ obj, graph }: { obj: OICObject; graph: ObjectGraph }) {
  const c = obj.module === "PM" ? "#f97316" : obj.module === "QM" ? "#0d9488" : "#6d28d9";
  return (
    <div dir="rtl">
      <nav className="no-print mb-5 flex flex-wrap items-center gap-2 text-xs font-semibold text-ink-3">
        <Link href="/" className="hover:text-ink-2">ראשי</Link><ArrowRight className="size-3 rotate-180" />
        <Link href="/knowledge/" className="hover:text-ink-2">מרכז הידע</Link><ArrowRight className="size-3 rotate-180" />
        <Link href="/oic/" className="hover:text-ink-2">Object Intelligence</Link><ArrowRight className="size-3 rotate-180" />
        <span className="text-ink-2">{obj.he}</span>
      </nav>
      <header className="relative mb-5 overflow-hidden rounded-3xl border border-hairline bg-surface p-7 shadow-sm">
        <span className="absolute inset-y-0 end-0 w-1.5" style={{ background: c }} />
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full px-2.5 py-0.5 text-[11px] font-bold text-white" style={{ background: c }}>{obj.module}</span>
          <h1 className="text-2xl font-extrabold tracking-tight text-ink-1">{obj.he} · <span className="tech" dir="ltr">{obj.title}</span></h1>
          {graph.exists
            ? <Link href={`/object/${encodeURIComponent(graph.name)}/`} className="ms-auto tech rounded-lg bg-surface-2 px-2.5 py-1 text-xs font-bold text-brand hover:bg-hairline" dir="ltr">{graph.name} ↗</Link>
            : <span className="ms-auto tech rounded-lg bg-surface-2 px-2.5 py-1 text-xs font-bold text-ink-3" dir="ltr">{graph.name}</span>}
        </div>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-ink-3">{obj.description}</p>
        <div className="mt-3"><TrustBadge trust={graph.exists ? trustTable() : trustDomain()} /></div>
      </header>

      <div className="mb-4">
        <h2 className="mb-2 flex items-center gap-2 text-sm font-extrabold tracking-tight text-ink-1"><GitBranch className="size-4 text-indigo-600" />גרף תלויות חזותי <span className="text-[11px] font-bold text-ink-3">(לחיצה על צומת = ניווט)</span></h2>
        <DepGraph graph={graph} />
      </div>

      <div className="grid gap-3 lg:grid-cols-2">
        <Facet title="טבלאות קשורות" icon={<Database className="size-4 text-cyan-600" />} tone="#0891b2" refs={graph.relatedTables} />
        <Facet title="טרנזקציות" icon={<Terminal className="size-4 text-teal-600" />} tone="#0f766e" refs={graph.tcodes} />
        <Facet title="BAPIs" icon={<Boxes className="size-4 text-blue-600" />} tone="#2563eb" refs={graph.bapis} />
        <Facet title="Function Modules" icon={<Boxes className="size-4 text-teal-600" />} tone="#0d9488" refs={graph.fms} />
        <Facet title="BAdIs / User Exits" icon={<Cable className="size-4 text-violet-600" />} tone="#7c3aed" refs={graph.badis} />
        <Facet title="CDS Views" icon={<FileCode2 className="size-4 text-green-600" />} tone="#16a34a" refs={graph.cds} />
        <Facet title="תקלות קשורות" icon={<ShieldAlert className="size-4 text-red-500" />} tone="#dc2626" refs={graph.incidents} />
        <Facet title="SAP Notes" icon={<BookText className="size-4 text-amber-600" />} tone="#b45309" refs={graph.notes} />
        <Facet title="נקודות Debug" icon={<Bug className="size-4 text-pink-600" />} tone="#be185d" refs={graph.debug} />
        <Facet title="תרחישי ייצור" icon={<Factory className="size-4 text-brand" />} tone="#d62027" refs={graph.scenario} />
      </div>

      <div className="mt-4 rounded-2xl border border-hairline bg-surface p-4 shadow-sm">
        <h2 className="mb-1.5 flex items-center gap-2 text-sm font-extrabold tracking-tight text-ink-1"><Factory className="size-4 text-brand" />דוגמת הארגון</h2>
        <p className="text-[13px] leading-relaxed text-ink-2">{obj.scenario}</p>
      </div>

      <div className="mt-4"><EccS4Block data={{ unchanged: `מבנה ${graph.name} נשמר ב-S/4HANA.`, changed: graph.s4Note, migration: `QA: ודא ${graph.name} + קשרים + CDS לאחר המרה.` }} title={`ECC6 → S/4HANA · ${obj.he}`} /></div>

      <Link href="/oic/" className="mt-6 inline-flex items-center gap-1.5 text-sm font-bold text-brand hover:underline"><GitBranch className="size-4" />→ חזרה ל-Object Intelligence</Link>
    </div>
  );
}
