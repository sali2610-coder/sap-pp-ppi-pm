"use client";

import Link from "next/link";
import { ArrowRight, ArrowLeft, Database, Terminal, Boxes, Workflow, GraduationCap, AlertTriangle, Presentation, Network, Target, ShieldAlert, ClipboardCheck, Factory, LayoutGrid, Cable } from "lucide-react";
import type { Domain } from "@/data/domains";
import { domainDetail } from "@/data/domain-detail";
import { EccS4Block } from "@/components/ecc-s4-block";
import { tableByName } from "@/lib/knowledge-graph";
import { listTcodes, listFuncs, cleanFunc, funcHref } from "@/lib/object-intel";

const RED = "#d62027";
const accentFor = (m: string) => (m === "PM" ? "#f97316" : "#6d28d9");
const TC = new Set(listTcodes());
const FN = new Set(listFuncs());

function Chip({ text, href, tone }: { text: string; href?: string; tone: string }) {
  const cls = `tech tap rounded-lg px-2.5 py-1 text-xs font-bold transition`;
  return href
    ? <Link href={href} className={`${cls} border border-hairline bg-surface text-ink-2 hover:border-brand hover:text-brand`} dir="ltr">{text}</Link>
    : <span className={`${cls} bg-surface-2 text-ink-3`} dir="ltr" style={{ color: tone }}>{text}</span>;
}

function Card({ title, icon, children }: { title: string; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <section className="card-premium p-5">
      <h3 className="mb-3 flex items-center gap-2 text-sm font-extrabold uppercase tracking-wide text-ink-3">{icon}{title}</h3>
      {children}
    </section>
  );
}

export function DomainView({ d }: { d: Domain }) {
  const c = accentFor(d.module);
  const det = domainDetail(d.slug);
  return (
    <div className="space-y-5">
      <div className="no-print flex items-center gap-1.5 text-xs text-ink-3">
        <Link href="/" className="hover:text-ink-2">בית</Link><ArrowRight className="size-3 rotate-180" />
        <Link href={`/${d.module === "PM" ? "pm" : "pp-pi"}/`} className="hover:text-ink-2">{d.module}</Link><ArrowRight className="size-3 rotate-180" />
        <span className="font-bold text-ink-2">{d.he}</span>
      </div>

      {/* header */}
      <header className="relative overflow-hidden rounded-3xl p-6 text-white shadow-xl slide-print" style={{ background: `linear-gradient(135deg, ${RED}, #8f1318)` }}>
        <span className="absolute inset-x-0 top-0 h-1.5" style={{ background: c }} />
        <div className="pointer-events-none absolute -right-16 -top-16 size-56 rounded-full bg-surface/10 blur-3xl" />
        <div className="relative">
          <span className="eyebrow text-white/70">SAP {d.module} Domain</span>
          <h1 className="mt-1 text-3xl font-extrabold tracking-tight">{d.he}</h1>
          <p className="mt-0.5 text-sm font-semibold text-white/80" dir="ltr">{d.title}</p>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-white/90">{d.summary}</p>
          <button onClick={() => window.print()} className="no-print tap mt-4 inline-flex items-center gap-1.5 rounded-xl bg-surface/15 px-3.5 py-2 text-xs font-bold backdrop-blur-sm transition hover:bg-surface/25"><Presentation className="size-4" /> מצגת / ייצוא</button>
        </div>
      </header>

      {/* business flow */}
      <Card title="זרימה עסקית" icon={<Workflow className="size-4" />}>
        <div className="flex flex-wrap items-stretch gap-2">
          {d.flow.map((s, i) => (
            <div key={i} className="neo-rise flex items-stretch gap-2" style={{ "--neo-i": Math.min(i, 10), "--neo-y": "10px" } as React.CSSProperties}>
              <div className="flex w-40 flex-col rounded-xl border p-3" style={{ borderColor: c + "55" }}>
                <span className="font-mono text-lg font-extrabold text-slate-200">{String(i + 1).padStart(2, "0")}</span>
                <span className="mt-0.5 text-sm font-bold text-ink-1">{s.he}</span>
                <span className="text-[11px] text-ink-3" dir="ltr">{s.step}</span>
              </div>
              {i < d.flow.length - 1 && <ArrowLeft className="size-5 shrink-0 self-center rotate-180 text-ink-3" />}
            </div>
          ))}
        </div>
      </Card>

      <div className="grid gap-5 lg:grid-cols-2">
        <Card title={`טבלאות · ${d.tables.length}`} icon={<Database className="size-4" />}>
          <div className="flex flex-wrap gap-1.5">{d.tables.map((t) => <Chip key={t} text={t} href={tableByName(t) ? `/object/${encodeURIComponent(t)}` : undefined} tone={c} />)}</div>
        </Card>
        <Card title={`טרנזקציות · ${d.tcodes.length}`} icon={<Terminal className="size-4" />}>
          <div className="flex flex-wrap gap-1.5">{d.tcodes.map((tc) => <Chip key={tc} text={tc} href={TC.has(tc.toUpperCase()) ? `/tcode/${encodeURIComponent(tc.toUpperCase())}` : undefined} tone={c} />)}</div>
        </Card>
        <Card title={`BAPIs / Functions · ${d.bapis.length}`} icon={<Boxes className="size-4" />}>
          <div className="flex flex-wrap gap-1.5">{d.bapis.map((b) => <Chip key={b} text={b} href={FN.has(cleanFunc(b)) ? funcHref(b) : undefined} tone={c} />)}</div>
        </Card>
        <Card title="למידה · נקודות מפתח" icon={<GraduationCap className="size-4" />}>
          <ul className="space-y-1.5">{d.learning.map((l, i) => <li key={i} className="flex gap-2 text-sm text-ink-2"><span className="mt-0.5 size-1.5 shrink-0 rounded-full" style={{ background: c }} />{l}</li>)}</ul>
        </Card>
      </div>

      <Card title="פתרון תקלות · Troubleshooting" icon={<AlertTriangle className="size-4 text-amber-500" />}>
        <ul className="space-y-2.5">{d.trouble.map((t, i) => (
          <li key={i} className="rounded-xl border border-amber-100 bg-amber-50/50 p-3 text-sm">
            <span className="font-bold text-ink-1">⚠ {t.issue}</span>
            <span className="mt-1 block text-ink-2">↳ {t.fix}</span>
          </li>))}</ul>
      </Card>

      {det && (
        <>
          <Card title="מטרה עסקית" icon={<Target className="size-4" />}><p className="text-sm leading-relaxed text-ink-2">{det.purpose}</p></Card>

          <Card title="תרשים תהליך · End-to-End" icon={<Workflow className="size-4" />}>
            <div className="flex flex-wrap items-center gap-2">
              {det.diagram.map((s, i) => (
                <span key={i} className="flex items-center gap-2">
                  <span className="rounded-xl border px-3 py-2 text-xs font-bold text-ink-2" style={{ borderColor: c + "55" }}>{s}</span>
                  {i < det.diagram.length - 1 && <ArrowLeft className="size-4 shrink-0 rotate-180 text-ink-3" />}
                </span>
              ))}
            </div>
          </Card>

          <div className="grid gap-5 lg:grid-cols-2">
            <Card title="נתוני אב (Master Data)" icon={<Database className="size-4" />}><div className="flex flex-wrap gap-1.5">{det.masterData.map((m) => <Chip key={m} text={m} tone={c} />)}</div></Card>
            <Card title="אובייקטים עסקיים" icon={<LayoutGrid className="size-4" />}><div className="flex flex-wrap gap-1.5">{det.objects.map((o) => <Chip key={o} text={o} tone={c} />)}</div></Card>
            <Card title="BAPIs / Function Modules" icon={<Boxes className="size-4" />}><div className="flex flex-wrap gap-1.5">{det.funcs.map((f) => <Chip key={f} text={f} href={FN.has(cleanFunc(f)) ? funcHref(f) : undefined} tone={c} />)}</div></Card>
            <Card title="User Exits / BAdIs" icon={<Cable className="size-4" />}><div className="space-y-2"><div><p className="eyebrow mb-1 text-ink-3">User Exits</p><div className="flex flex-wrap gap-1.5">{det.exits.map((e) => <Chip key={e} text={e} tone={c} />)}</div></div><div><p className="eyebrow mb-1 text-ink-3">BAdIs</p><div className="flex flex-wrap gap-1.5">{det.badis.map((b) => <Chip key={b} text={b} tone={c} />)}</div>{det.badis.length > 0 && <p className="mt-1.5 text-[10.5px] leading-relaxed text-ink-3">שמות ה-BAdI אומתו מול SAP Help / SAP Community — זמינות לפי release נבדקת ב-SE18 במערכת היעד.</p>}</div></div></Card>
          </div>

          <div className="grid gap-5 lg:grid-cols-2">
            <Card title="QA · תרחישי בדיקה" icon={<ClipboardCheck className="size-4 text-fuchsia-600" />}>
              <ul className="space-y-1.5">{det.qa.map((q, i) => <li key={i} className="flex gap-2 text-sm text-ink-2"><span className="mt-0.5 size-1.5 shrink-0 rounded-full bg-fuchsia-500" />{q}</li>)}</ul>
            </Card>
            <Card title="תקלות נפוצות · Incidents" icon={<ShieldAlert className="size-4 text-red-500" />}>
              <ul className="space-y-1.5">{det.incidents.map((q, i) => <li key={i} className="flex gap-2 text-sm text-ink-2"><span className="mt-0.5 size-1.5 shrink-0 rounded-full bg-red-500" />{q}</li>)}</ul>
            </Card>
          </div>

          <Card title="דוגמת ייצור — הארגון" icon={<Factory className="size-4 text-brand" />}><p className="text-sm leading-relaxed text-ink-2">{det.scenario}</p></Card>

          {det.fiori.length > 0 && <Card title="אפליקציות Fiori" icon={<LayoutGrid className="size-4 text-violet-600" />}><div className="flex flex-wrap gap-1.5">{det.fiori.map((f) => <Chip key={f} text={f} tone={c} />)}</div></Card>}

          <EccS4Block data={det.eccS4} title={`ECC6 → S/4HANA · ${d.he}`} />
        </>
      )}

      <Link href="/sap-infrastructure/" className="no-print inline-flex items-center gap-1.5 text-sm font-bold text-brand hover:underline"><Network className="size-4" /> חקור קשרים באקספלורר</Link>
    </div>
  );
}
