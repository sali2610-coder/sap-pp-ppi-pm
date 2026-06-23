"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { LayoutDashboard, Layers, AppWindow, Plug, Code2, Boxes, AlertTriangle, Workflow, GitCompare, GraduationCap, ArrowLeft, Bug } from "lucide-react";
import { FIORI_ARCH, APP_TYPES, ODATA_PARTS, ODATA_TCODES, ODATA_VERSIONS, UI5_PARTS, UI5_NOTE, RAP_PARTS, RAP_NOTE, FIORI_INCIDENTS, FIORI_DEBUG, FIORI_EVOLUTION, FIORI_INTERVIEW, CROSS_LINKS, FIORI_META } from "@/data/fiori";

const SECTIONS = [
  { id: "arch", he: "ארכיטקטורת Fiori", icon: Layers },
  { id: "apptypes", he: "סוגי אפליקציות", icon: AppWindow },
  { id: "odata", he: "מרכז OData", icon: Plug },
  { id: "ui5", he: "מרכז UI5", icon: Code2 },
  { id: "rap", he: "RAP", icon: Boxes },
  { id: "incidents", he: "תקלות נפוצות", icon: AlertTriangle },
  { id: "debug", he: "זרימת Debug", icon: Workflow },
  { id: "evolution", he: "ECC ↔ S/4", icon: GitCompare },
  { id: "interview", he: "שאלות ראיון", icon: GraduationCap },
] as const;

export function FioriCenter() {
  const [active, setActive] = useState("arch");
  const [qOpen, setQOpen] = useState<number | null>(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const secRef = useRef<Record<string, HTMLElement | null>>({});
  useEffect(() => {
    const root = scrollRef.current; if (!root) return;
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) setActive((e.target as HTMLElement).id); }), { root, rootMargin: "-15% 0px -75% 0px" });
    SECTIONS.forEach((s) => { const el = secRef.current[s.id]; if (el) io.observe(el); });
    return () => io.disconnect();
  }, []);
  const go = (id: string) => secRef.current[id]?.scrollIntoView({ behavior: "smooth", block: "start" });

  const Card = ({ id, title, icon, sub, accent, children: ch }: { id: string; title: string; icon: React.ReactNode; sub?: string; accent?: string; children: React.ReactNode }) => (
    <section id={id} ref={(el) => { secRef.current[id] = el; }} className="scroll-mt-4 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="mb-4 flex items-center gap-2.5"><span className="grid size-9 shrink-0 place-items-center rounded-xl text-white shadow-sm" style={{ background: accent || "#0f172a" }}>{icon}</span><div><h2 className="text-lg font-extrabold text-slate-900">{title}</h2>{sub && <p className="text-xs font-medium text-slate-400">{sub}</p>}</div></div>
      {ch}
    </section>
  );
  const Parts = ({ items, c }: { items: { he: string; en: string; desc: string }[]; c: string }) => (
    <div className="grid gap-2.5 sm:grid-cols-2 xl:grid-cols-3">{items.map((x) => (
      <div key={x.en} className="rounded-xl border border-slate-100 bg-slate-50/60 p-3"><div className="flex items-baseline gap-1.5"><span className="text-[13px] font-extrabold text-slate-800">{x.he}</span><span className="font-mono text-[9px]" style={{ color: c }} dir="ltr">{x.en}</span></div><p className="mt-0.5 text-[11.5px] leading-relaxed text-slate-500">{x.desc}</p></div>
    ))}</div>
  );

  return (
    <div className="mx-auto max-w-[1700px]" dir="rtl">
      <header className="relative overflow-hidden rounded-[1.75rem] bg-gradient-to-l from-slate-900 via-slate-800 to-[#0e7490] p-6 text-white shadow-xl sm:p-8">
        <div className="pointer-events-none absolute -left-24 -top-24 size-72 rounded-full bg-cyan-500/25 blur-3xl" />
        <div className="relative">
          <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.22em] text-white/60"><LayoutDashboard className="size-4" />SAP Fiori · UI5 · OData · RAP</div>
          <h1 className="mt-1 text-3xl font-extrabold sm:text-4xl">{FIORI_META.he}</h1>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-white/85">{FIORI_META.sub}</p>
          <div className="mt-3 flex flex-wrap gap-2 text-[12px] font-bold text-white/80">{["Fiori Architecture", "OData", "UI5 / MVC", "RAP", "Fiori Elements"].map((s) => <span key={s} className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-2.5 py-0.5">{s}</span>)}</div>
        </div>
      </header>

      <div className="mt-4 grid gap-5 lg:grid-cols-[200px_minmax(0,1fr)]">
        <aside className="hidden lg:block"><nav className="sticky top-4 space-y-1">
          {SECTIONS.map((s) => { const Ic = s.icon; const on = active === s.id; return <button key={s.id} onClick={() => go(s.id)} className={`flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-right text-sm font-bold transition ${on ? "bg-white text-slate-900 shadow-sm ring-1 ring-slate-200" : "text-slate-500 hover:bg-white/70 hover:text-slate-900"}`}><Ic className="size-4 shrink-0" style={on ? { color: "#0891b2" } : undefined} />{s.he}</button>; })}
          <div className="!mt-3 space-y-1 border-t border-slate-200 pt-3">{CROSS_LINKS.map((l) => <Link key={l.href + l.label} href={l.href} className="flex items-center gap-2 rounded-xl px-3 py-1.5 text-[13px] font-bold text-slate-500 transition hover:text-brand"><ArrowLeft className="size-3.5" />{l.label}</Link>)}</div>
        </nav></aside>

        <div ref={scrollRef} className="min-w-0 max-h-[calc(100vh-2rem)] space-y-5 overflow-y-auto lg:pe-1">
          {/* 1. Architecture */}
          <Card id="arch" title="ארכיטקטורת Fiori — שכבות" icon={<Layers className="size-4" />} sub="מ-Launchpad ועד ה-Backend — כיצד בקשה זורמת" accent="#0891b2">
            <div className="flex flex-wrap items-stretch gap-1.5">{FIORI_ARCH.map((l, i, arr) => (
              <span key={l.en} className="flex items-center gap-1.5">
                <div className="flex min-w-[10rem] max-w-[13rem] flex-col rounded-xl px-3 py-2 text-white shadow-sm" style={{ background: `linear-gradient(135deg,${l.c},${l.c}cc)` }}>
                  <span className="text-[12.5px] font-extrabold leading-tight">{l.he}</span>
                  <span className="font-mono text-[9px] text-white/70">{l.en}</span>
                  <span className="mt-0.5 text-[11px] leading-tight text-white/90">{l.desc}</span>
                </div>
                {i < arr.length - 1 && <ArrowLeft className="size-4 shrink-0 text-slate-300" />}
              </span>
            ))}</div>
          </Card>

          {/* 2. App types */}
          <Card id="apptypes" title="סוגי אפליקציות Fiori" icon={<AppWindow className="size-4" />} sub="Transactional · Analytical · Fact Sheet" accent="#2563eb">
            <div className="grid gap-2.5 md:grid-cols-3">{APP_TYPES.map((a) => (
              <div key={a.en} className="rounded-2xl border-2 p-4" style={{ borderColor: a.c + "55" }}>
                <div className="flex items-baseline gap-1.5"><span className="text-[14px] font-extrabold" style={{ color: a.c }}>{a.he}</span></div>
                <p className="mt-1 text-[12px] leading-relaxed text-slate-600">{a.desc}</p>
                <div className="mt-2 flex flex-wrap gap-1.5">{a.tech.map((t) => <span key={t} className="rounded-lg bg-slate-100 px-2 py-0.5 text-[10.5px] font-bold text-slate-600" dir="ltr">{t}</span>)}</div>
              </div>
            ))}</div>
          </Card>

          {/* 3. OData */}
          <Card id="odata" title="מרכז OData" icon={<Plug className="size-4" />} sub="SEGW · Gateway · IWFND · IWBEP · Registration · Metadata · Entity Sets" accent="#d97706">
            <Parts items={ODATA_PARTS} c="#d97706" />
            <div className="mt-3 flex flex-wrap gap-1.5">{ODATA_TCODES.map((t) => <span key={t} className="tech rounded-lg border border-amber-200 bg-amber-50 px-2.5 py-1 text-[11px] font-bold text-amber-700" dir="ltr">{t}</span>)}</div>
            <p className="mt-3 rounded-xl bg-amber-50 px-3 py-2 text-[12px] leading-relaxed text-amber-900">{ODATA_VERSIONS}</p>
            <p className="mt-2 text-[11px] text-slate-400">פרטי OData בהקשר אינטגרציה: <Link href="/integration/#odata" className="font-bold text-amber-600">מרכז אינטגרציה</Link>.</p>
          </Card>

          {/* 4. UI5 */}
          <Card id="ui5" title="מרכז UI5" icon={<Code2 className="size-4" />} sub="MVC · Component · Views · Controllers · Routing · Fragments" accent="#7c3aed">
            <Parts items={UI5_PARTS} c="#7c3aed" />
            <p className="mt-3 rounded-xl bg-violet-50 px-3 py-2 text-[12px] leading-relaxed text-violet-900">{UI5_NOTE}</p>
          </Card>

          {/* 5. RAP */}
          <Card id="rap" title="RAP — ABAP RESTful" icon={<Boxes className="size-4" />} sub="CDS · Behavior Definition · Service Bindings" accent="#0d9488">
            <Parts items={RAP_PARTS} c="#0d9488" />
            <p className="mt-3 rounded-xl bg-teal-50 px-3 py-2 text-[12px] leading-relaxed text-teal-900">{RAP_NOTE}</p>
            <div className="mt-2 flex flex-wrap gap-1.5">{[["CDS Views", "/s4hana/"], ["מודל נתונים", "/sap-infrastructure/"]].map(([l, h]) => <Link key={h} href={h} className="rounded-lg bg-teal-50 px-2.5 py-1 text-[11px] font-bold text-teal-700 hover:bg-teal-100">{l}</Link>)}</div>
          </Card>

          {/* 6. Incidents */}
          <Card id="incidents" title="תקלות Fiori נפוצות" icon={<AlertTriangle className="size-4" />} sub="App not found · Catalog missing · Authorization · OData failure · Metadata cache · Gateway" accent="#dc2626">
            <div className="grid gap-2.5 lg:grid-cols-2">{FIORI_INCIDENTS.map((inc) => (
              <div key={inc.he} className="rounded-2xl border border-slate-200 p-3.5">
                <div className="mb-1 text-[13px] font-extrabold text-rose-700">{inc.he}</div>
                <p className="text-[12px] leading-relaxed text-slate-600"><span className="font-bold text-slate-500">סימפטום:</span> {inc.symptom}</p>
                <p className="text-[12px] leading-relaxed text-slate-600"><span className="font-bold text-slate-500">גורם:</span> {inc.cause}</p>
                <p className="text-[12px] leading-relaxed text-slate-700"><span className="font-bold text-emerald-600">תיקון:</span> {inc.fix}</p>
                <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
                  {inc.tcodes.map((t) => <span key={t} className="tech rounded-lg border border-slate-200 bg-slate-50 px-2 py-0.5 text-[10.5px] font-bold text-slate-600" dir="ltr">{t}</span>)}
                  {inc.slug && <Link href={`/troubleshooting/${inc.slug}/`} className="rounded-lg bg-rose-50 px-2 py-0.5 text-[10.5px] font-bold text-rose-700 ring-1 ring-rose-200 hover:bg-rose-100">תקלה מתועדת ←</Link>}
                </div>
              </div>
            ))}</div>
            <p className="mt-3 text-[11px] text-slate-400">עוד תקלות: <Link href="/incidents/" className="font-bold text-rose-600">מרכז תקלות</Link> · הרשאות: <Link href="/security/#fiori" className="font-bold text-rose-600">מרכז אבטחה</Link>.</p>
          </Card>

          {/* 7. Debug flow */}
          <Card id="debug" title="זרימת Debug ל-Fiori" icon={<Bug className="size-4" />} sub="מהדפדפן ועד ה-backend" accent="#be185d">
            <div className="flex flex-wrap items-stretch gap-1.5">{FIORI_DEBUG.map((s, i, arr) => (
              <span key={s.step} className="flex items-center gap-1.5">
                <div className="flex min-w-[9.5rem] max-w-[12rem] flex-col rounded-xl border-2 border-slate-200 bg-white p-2.5">
                  <span className="text-[12px] font-extrabold text-slate-800">{s.step}</span>
                  <span className="my-0.5 inline-block w-fit rounded bg-slate-900 px-1.5 py-0.5 font-mono text-[10px] font-bold text-white" dir="ltr">{s.t}</span>
                  <span className="text-[11px] leading-tight text-slate-500">{s.do}</span>
                </div>
                {i < arr.length - 1 && <ArrowLeft className="size-4 shrink-0 text-slate-300" />}
              </span>
            ))}</div>
          </Card>

          {/* 8. Evolution */}
          <Card id="evolution" title="אבולוציית Fiori — ECC ↔ S/4HANA" icon={<GitCompare className="size-4" />} sub="כיצד השתנתה שכבת ה-UX והפיתוח" accent="#475569">
            <div className="overflow-hidden rounded-xl border border-slate-200"><table className="w-full text-right text-[12.5px]"><thead className="bg-slate-50 text-[11px] font-bold uppercase text-slate-400"><tr><th className="px-3 py-2">נושא</th><th className="px-3 py-2">ECC</th><th className="px-3 py-2">S/4HANA</th></tr></thead>
              <tbody>{FIORI_EVOLUTION.map((e) => <tr key={e.topic} className="border-t border-slate-100 align-top"><td className="px-3 py-2 font-bold text-slate-800">{e.topic}</td><td className="px-3 py-2 text-slate-500">{e.ecc}</td><td className="px-3 py-2 text-blue-900">{e.s4}</td></tr>)}</tbody></table></div>
          </Card>

          {/* 9. Interview */}
          <Card id="interview" title="שאלות ראיון — קונסולטנט Fiori/UI5" icon={<GraduationCap className="size-4" />} sub="לחץ שאלה לחשיפת התשובה" accent="#7c3aed">
            <div className="space-y-2">{FIORI_INTERVIEW.map((qa, i) => { const open = qOpen === i; return (
              <div key={i} className="overflow-hidden rounded-xl border border-slate-200">
                <button onClick={() => setQOpen(open ? null : i)} className="flex w-full items-center justify-between gap-2 px-4 py-2.5 text-right text-[13px] font-bold text-slate-800 hover:bg-slate-50">
                  <span>{qa.q}</span><span className="shrink-0 font-mono text-slate-400">{open ? "−" : "+"}</span>
                </button>
                {open && <p className="border-t border-slate-100 bg-slate-50/60 px-4 py-2.5 text-[12.5px] leading-relaxed text-slate-600">{qa.a}</p>}
              </div>
            ); })}</div>
            <p className="mt-3 text-[11px] text-slate-400">מבוסס ידע Fiori/UI5/OData/RAP סטנדרטי של SAP. trust: curated — לא המצאה.</p>
          </Card>
        </div>
      </div>
    </div>
  );
}
