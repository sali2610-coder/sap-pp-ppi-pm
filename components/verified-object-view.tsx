"use client";

import { SmartLink as Link } from "@/components/smart-link";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRightLeft, Terminal, GitBranch, ShieldCheck, Tag, Layers, CircleAlert, FlaskConical, Lightbulb, Network } from "lucide-react";
import { hasApp } from "@/lib/apps-intel";
import { verifiedObject, dataDomain, type VerifiedObject } from "@/data/verified-objects";

const MOD_C: Record<string, string> = { "LO-HU": "#0e7490", "LE-HU": "#0e7490", LE: "#0e7490", WM: "#7c3aed", EWM: "#7c3aed", SD: "#0891b2", MM: "#2563eb", "MM-IM": "#2563eb", FI: "#16a34a", CO: "#d97706", PP: "#6d28d9", "PP-PI": "#6d28d9", PM: "#f97316", QM: "#0d9488" };
const mc = (m: string) => MOD_C[m] || "#475569";
const STATUS_HE: Record<string, string> = { verified: "מאומת", "needs-review": "בבדיקה", "cross-module": "חוצה-מודולים", "s4-only": "S/4 בלבד", "ecc-only": "ECC בלבד" };
const STATUS_C: Record<string, string> = { verified: "#16a34a", "needs-review": "#d97706", "cross-module": "#0891b2", "s4-only": "#7c3aed", "ecc-only": "#64748b" };

function Section({ icon, title, accent, children }: { icon: React.ReactNode; title: string; accent: string; children: React.ReactNode }) {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-[var(--elev-1)] sm:p-6">
      <div className="mb-3 flex items-center gap-2.5"><span className="grid size-9 place-items-center rounded-xl text-white shadow-sm" style={{ background: accent }}>{icon}</span><h2 className="text-lg font-extrabold tracking-tight text-slate-900">{title}</h2></div>
      {children}
    </section>
  );
}

export function VerifiedObjectView({ o }: { o: VerifiedObject }) {
  const c = mc(o.primary);
  const secondary = o.modules.filter((m) => m !== o.primary);
  const domain = dataDomain(o.domain);
  const tcodeChip = (code: string) => hasApp(code)
    ? <Link key={code} href={`/apps/${encodeURIComponent(code)}/`} className="tech rounded-md bg-slate-100 px-1.5 py-0.5 font-mono text-[11px] font-bold text-slate-600 transition hover:bg-brand/10 hover:text-brand" dir="ltr">{code}</Link>
    : <Link key={code} href={`/tcode/${encodeURIComponent(code)}/`} className="tech rounded-md bg-slate-100 px-1.5 py-0.5 font-mono text-[11px] font-bold text-slate-600 transition hover:bg-brand/10 hover:text-brand" dir="ltr">{code}</Link>;

  return (
    <div dir="rtl" className="mx-auto max-w-[1200px] space-y-4 pb-10">
      <div className="flex items-center gap-2 text-xs text-slate-400"><Link href="/apps/" className="hover:text-brand">מרכז אובייקטים</Link><ArrowLeft className="size-3" /><span className="font-bold text-slate-700">{o.name}</span></div>

      {/* hero */}
      <section className="relative overflow-hidden rounded-[2rem] p-6 text-white shadow-[0_30px_60px_-24px_rgba(15,23,42,0.5)] sm:p-8" style={{ background: `linear-gradient(135deg, ${c}, ${c}cc 60%, #0f172a)` }}>
        <div className="pointer-events-none absolute -left-16 -top-16 size-64 rounded-full bg-white/10 blur-3xl" />
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="relative">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-bold text-white" style={{ background: STATUS_C[o.status] }}><ShieldCheck className="size-3" />{STATUS_HE[o.status] || o.status}</span>
            <span className="rounded-full bg-white/20 px-2.5 py-1 text-[11px] font-bold backdrop-blur">{o.area}</span>
          </div>
          <h1 className="tech mt-3 text-5xl font-extrabold tracking-tight sm:text-6xl" dir="ltr">{o.name}</h1>
          <p className="mt-1 text-lg font-semibold text-white/90" dir="ltr">{o.en}</p>
          <p className="mt-2 max-w-3xl text-[14px] leading-relaxed text-white/90">{o.he}</p>
          {/* module membership */}
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-bold text-white/70">מודול ראשי:</span>
            <span className="rounded-lg bg-white/25 px-2.5 py-1 text-[12px] font-extrabold backdrop-blur">{o.primary}</span>
            {secondary.length > 0 && <><span className="text-[11px] font-bold text-white/70">· משני:</span>{secondary.map((m) => <span key={m} className="rounded-lg bg-white/12 px-2 py-0.5 text-[11px] font-bold text-white/85">{m}</span>)}</>}
          </div>
        </motion.div>
      </section>

      {/* Connection to PP-PI production/process flow (emphasized) */}
      {o.ppPi && (
        <Section icon={<FlaskConical className="size-5" />} title="חיבור לזרימת PP-PI (ייצור תהליכי)" accent="#6d28d9">
          <p className="text-[13.5px] leading-relaxed text-slate-700">{o.ppPi}</p>
          <div className="mt-3 flex flex-wrap items-center gap-2 text-[12px]">
            <Link href="/pp-pi/" className="inline-flex items-center gap-1 rounded-lg bg-[#6d28d9]/10 px-2.5 py-1 font-bold text-[#6d28d9] transition hover:bg-[#6d28d9]/15">מרכז PP-PI<ArrowLeft className="size-3.5" /></Link>
            <Link href="/studio/" className="inline-flex items-center gap-1 rounded-lg bg-slate-100 px-2.5 py-1 font-bold text-slate-600 transition hover:text-brand">מפת הקשרים · Studio<ArrowLeft className="size-3.5" /></Link>
          </div>
        </Section>
      )}

      {/* Integrated logistics domain (LO-HU) — cross-module, not a PP-PI table group */}
      {domain && (
        <Section icon={<Network className="size-5" />} title={`שכבת לוגיסטיקה משולבת · ${domain.he} (${domain.id})`} accent="#0e7490">
          <p className="text-[13px] leading-relaxed text-slate-600">{domain.summary}</p>
          <p className="mt-1.5 text-[11px] font-bold text-slate-400">רכיב SAP: {domain.component}</p>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            {domain.connections.map((cn) => (
              <div key={cn.module} className="rounded-2xl border border-slate-200 bg-slate-50/60 p-3">
                <div className="mb-0.5 inline-flex items-center gap-1.5"><span className="rounded-md px-1.5 py-0.5 text-[10px] font-extrabold text-white" style={{ background: mc(cn.module) }}>{cn.module}</span></div>
                <p className="text-[12px] leading-relaxed text-slate-600">{cn.he}</p>
              </div>
            ))}
          </div>
          <p className="mt-3 text-[11px] text-slate-400">LO-HU שייך ל-Logistics General — מוצג כשכבה משולבת, לא כטבלת PP-PI מזויפת.</p>
        </Section>
      )}

      {/* Consultant use cases */}
      {o.useCases && o.useCases.length > 0 && (
        <Section icon={<Lightbulb className="size-5" />} title="שימושי יועץ נפוצים" accent="#d97706">
          <ul className="space-y-1.5">{o.useCases.map((u, i) => <li key={i} className="flex gap-2 text-[13px] leading-relaxed text-slate-700"><span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-amber-500" />{u}</li>)}</ul>
        </Section>
      )}

      {/* ECC ↔ S/4 */}
      <Section icon={<ArrowRightLeft className="size-5" />} title="ECC ↔ S/4HANA" accent="#2563eb">
        <div className="grid gap-3 md:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-slate-50/60 p-4"><div className="text-[10px] font-bold uppercase text-slate-400">ECC</div><p className="mt-1 text-[13px] leading-relaxed text-slate-700">{o.ecc}</p></div>
          <div className="rounded-2xl border border-slate-200 bg-slate-50/60 p-4"><div className="text-[10px] font-bold uppercase text-green-600">S/4HANA</div><p className="mt-1 text-[13px] leading-relaxed text-slate-700">{o.s4}</p></div>
        </div>
      </Section>

      {/* related + tcodes */}
      <div className="grid gap-4 lg:grid-cols-2">
        {o.related.length > 0 && (
          <Section icon={<GitBranch className="size-5" />} title="אובייקטים קשורים" accent={c}>
            <div className="flex flex-wrap gap-1.5">{o.related.map((r) => { const rv = verifiedObject(r); return <Link key={r} href={`/object/${encodeURIComponent(r)}/`} className="tech rounded-md bg-slate-100 px-2 py-0.5 font-mono text-[12px] font-bold text-slate-700 transition hover:bg-brand/10 hover:text-brand" dir="ltr" title={rv?.en}>{r}</Link>; })}</div>
          </Section>
        )}
        {o.tcodes && o.tcodes.length > 0 && (
          <Section icon={<Terminal className="size-5" />} title="טרנזקציות נפוצות" accent="#475569">
            <div className="flex flex-wrap gap-1.5">{o.tcodes.map(tcodeChip)}</div>
          </Section>
        )}
      </div>

      {/* search aliases (governance: show what it's findable by) */}
      <Section icon={<Tag className="size-5" />} title="שמות וכינויים לחיפוש" accent="#0891b2">
        <div className="flex flex-wrap gap-1.5">
          {[o.name, o.en, ...o.aliases].map((a, i) => <span key={i} className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[11.5px] font-bold text-slate-600">{a}</span>)}
        </div>
      </Section>

      {/* honesty / source footer */}
      <div className="flex flex-wrap items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50/60 p-4 text-[12px] text-slate-500">
        <Layers className="size-4 text-slate-400" />
        <span>מקור: <b className="text-slate-700">רפרנס SAP מאומת</b> · אובייקט תקני מחוץ לבלוּפרינט PM/PP-PI (לוגיסטיקה/מלאי/מכירות/פיננסי).</span>
        <span className="inline-flex items-center gap-1 text-slate-400"><CircleAlert className="size-3.5" />שדות שאינם מאומתים אינם מוצגים — ללא המצאה.</span>
      </div>
    </div>
  );
}
