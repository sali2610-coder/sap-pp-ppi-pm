"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ArrowLeft, Database, Terminal, Boxes, Workflow, GraduationCap, AlertTriangle, Presentation, Network } from "lucide-react";
import type { Domain } from "@/data/domains";
import { tableByName } from "@/lib/knowledge-graph";
import { listTcodes, listFuncs, cleanFunc, funcHref } from "@/lib/object-intel";

const RED = "#d62027";
const accentFor = (m: string) => (m === "PM" ? "#f97316" : "#6d28d9");
const TC = new Set(listTcodes());
const FN = new Set(listFuncs());

function Chip({ text, href, tone }: { text: string; href?: string; tone: string }) {
  const cls = `tech tap rounded-lg px-2.5 py-1 text-xs font-bold transition`;
  return href
    ? <Link href={href} className={`${cls} border border-slate-200 bg-white text-slate-700 hover:border-brand hover:text-brand`} dir="ltr">{text}</Link>
    : <span className={`${cls} bg-slate-100 text-slate-500`} dir="ltr" style={{ color: tone }}>{text}</span>;
}

function Card({ title, icon, children }: { title: string; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <section className="card-premium p-5">
      <h3 className="mb-3 flex items-center gap-2 text-sm font-extrabold uppercase tracking-wide text-slate-500">{icon}{title}</h3>
      {children}
    </section>
  );
}

export function DomainView({ d }: { d: Domain }) {
  const c = accentFor(d.module);
  return (
    <div className="space-y-5">
      <div className="no-print flex items-center gap-1.5 text-xs text-slate-400">
        <Link href="/" className="hover:text-slate-700">בית</Link><ArrowRight className="size-3 rotate-180" />
        <Link href={`/${d.module === "PM" ? "pm" : "pp-pi"}/`} className="hover:text-slate-700">{d.module}</Link><ArrowRight className="size-3 rotate-180" />
        <span className="font-bold text-slate-700">{d.he}</span>
      </div>

      {/* header */}
      <header className="relative overflow-hidden rounded-3xl p-6 text-white shadow-xl slide-print" style={{ background: `linear-gradient(135deg, ${RED}, #8f1318)` }}>
        <span className="absolute inset-x-0 top-0 h-1.5" style={{ background: c }} />
        <div className="pointer-events-none absolute -right-16 -top-16 size-56 rounded-full bg-white/10 blur-3xl" />
        <div className="relative">
          <span className="eyebrow text-white/70">SAP {d.module} Domain</span>
          <h1 className="mt-1 text-3xl font-extrabold tracking-tight">{d.he}</h1>
          <p className="mt-0.5 text-sm font-semibold text-white/80" dir="ltr">{d.title}</p>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-white/90">{d.summary}</p>
          <button onClick={() => window.print()} className="no-print tap mt-4 inline-flex items-center gap-1.5 rounded-xl bg-white/15 px-3.5 py-2 text-xs font-bold backdrop-blur-sm transition hover:bg-white/25"><Presentation className="size-4" /> מצגת / ייצוא</button>
        </div>
      </header>

      {/* business flow */}
      <Card title="זרימה עסקית" icon={<Workflow className="size-4" />}>
        <div className="flex flex-wrap items-stretch gap-2">
          {d.flow.map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="flex items-stretch gap-2">
              <div className="flex w-40 flex-col rounded-xl border p-3" style={{ borderColor: c + "55" }}>
                <span className="font-mono text-lg font-extrabold text-slate-200">{String(i + 1).padStart(2, "0")}</span>
                <span className="mt-0.5 text-sm font-bold text-slate-900">{s.he}</span>
                <span className="text-[11px] text-slate-400" dir="ltr">{s.step}</span>
              </div>
              {i < d.flow.length - 1 && <ArrowLeft className="size-5 shrink-0 self-center rotate-180 text-slate-300" />}
            </motion.div>
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
          <ul className="space-y-1.5">{d.learning.map((l, i) => <li key={i} className="flex gap-2 text-sm text-slate-700"><span className="mt-0.5 size-1.5 shrink-0 rounded-full" style={{ background: c }} />{l}</li>)}</ul>
        </Card>
      </div>

      <Card title="פתרון תקלות · Troubleshooting" icon={<AlertTriangle className="size-4 text-amber-500" />}>
        <ul className="space-y-2.5">{d.trouble.map((t, i) => (
          <li key={i} className="rounded-xl border border-amber-100 bg-amber-50/50 p-3 text-sm">
            <span className="font-bold text-slate-800">⚠ {t.issue}</span>
            <span className="mt-1 block text-slate-600">↳ {t.fix}</span>
          </li>))}</ul>
      </Card>

      <Link href="/sap-infrastructure/" className="no-print inline-flex items-center gap-1.5 text-sm font-bold text-brand hover:underline"><Network className="size-4" /> חקור קשרים באקספלורר</Link>
    </div>
  );
}
