"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Compass, ClipboardList, Search, Hammer, Rocket, RefreshCw, FlaskConical, Bug, Users, FileText, ArrowLeft, AlertTriangle, Lightbulb, Target, Boxes } from "lucide-react";
import { PHASES, TEST_LEVELS, TEST_TOOLS, DEFECT_SEVERITY, DEFECT_FLOW, WORKSHOP_TYPES, WORKSHOP_PREP, BLUEPRINT, PD_META, type Phase } from "@/data/project-delivery";
import { CUTOVER } from "@/data/s4-transformation";

const PHASE_ICON: Record<string, typeof Compass> = { discover: Compass, prepare: ClipboardList, explore: Search, realize: Hammer, deploy: Rocket, run: RefreshCw };
const SECTIONS = [
  { id: "activate", he: "SAP Activate", icon: Target }, { id: "cutover", he: "Cutover Center", icon: Rocket },
  { id: "test", he: "Test Management", icon: FlaskConical }, { id: "defect", he: "Defect Management", icon: Bug },
  { id: "workshop", he: "Workshop Center", icon: Users }, { id: "blueprint", he: "Blueprint Center", icon: FileText },
] as const;

export function ProjectDelivery() {
  const [active, setActive] = useState("activate");
  const [sel, setSel] = useState<string>("explore");
  const scrollRef = useRef<HTMLDivElement>(null);
  const secRef = useRef<Record<string, HTMLElement | null>>({});
  useEffect(() => {
    const root = scrollRef.current; if (!root) return;
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) setActive((e.target as HTMLElement).id); }), { root, rootMargin: "-15% 0px -75% 0px" });
    SECTIONS.forEach((s) => { const el = secRef.current[s.id]; if (el) io.observe(el); });
    return () => io.disconnect();
  }, []);
  const go = (id: string) => secRef.current[id]?.scrollIntoView({ behavior: "smooth", block: "start" });
  const p = PHASES.find((x) => x.id === sel) || PHASES[0];

  const Card = ({ id, title, icon, sub, accent, children: ch }: { id: string; title: string; icon: React.ReactNode; sub?: string; accent?: string; children: React.ReactNode }) => (
    <section id={id} ref={(el) => { secRef.current[id] = el; }} className="scroll-mt-4 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="mb-4 flex items-center gap-2.5"><span className="grid size-9 shrink-0 place-items-center rounded-xl text-white shadow-sm" style={{ background: accent || "#0f172a" }}>{icon}</span><div><h2 className="text-lg font-extrabold text-slate-900">{title}</h2>{sub && <p className="text-xs font-medium text-slate-400">{sub}</p>}</div></div>
      {ch}
    </section>
  );
  const List = ({ title, items, c, icon }: { title: string; items: string[]; c: string; icon?: React.ReactNode }) => (
    <div><div className="mb-1 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wide" style={{ color: c }}>{icon}{title}</div><ul className="space-y-1">{items.map((x, i) => <li key={i} className="flex gap-1.5 text-[12px] leading-relaxed text-slate-600"><span className="mt-1.5 size-1.5 shrink-0 rounded-full" style={{ background: c }} />{x}</li>)}</ul></div>
  );

  return (
    <div className="mx-auto max-w-[1700px]" dir="rtl">
      <header className="relative overflow-hidden rounded-[1.75rem] bg-gradient-to-l from-slate-900 via-slate-800 to-[#3730a3] p-6 text-white shadow-xl sm:p-8">
        <div className="pointer-events-none absolute -left-24 -top-24 size-72 rounded-full bg-indigo-500/25 blur-3xl" />
        <div className="relative">
          <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.22em] text-white/60"><Target className="size-4" />SAP Project Delivery · Activate</div>
          <h1 className="mt-1 text-3xl font-extrabold sm:text-4xl">מרכז ניהול פרויקט SAP</h1>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-white/85">איך פרויקט S/4HANA נמסר בפועל — מתודולוגיית SAP Activate (6 שלבים) + Fit-to-Standard, Cutover, בדיקות, ניהול פגמים, סדנאות ו-Blueprint. מבוסס SAP Best Practices / Cloud ALM. trust: curated.</p>
          <div className="mt-3 flex flex-wrap gap-2 text-[12px] font-bold text-white/80">{PHASES.map((ph) => <span key={ph.id} className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-2.5 py-0.5"><span className="size-2 rounded-full" style={{ background: ph.color }} />{ph.n}.{ph.he}</span>)}</div>
        </div>
      </header>

      <div className="mt-4 grid gap-5 lg:grid-cols-[200px_minmax(0,1fr)]">
        <aside className="hidden lg:block"><nav className="sticky top-4 space-y-1">
          {SECTIONS.map((s) => { const Ic = s.icon; const on = active === s.id; return <button key={s.id} onClick={() => go(s.id)} className={`flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-right text-sm font-bold transition ${on ? "bg-white text-slate-900 shadow-sm ring-1 ring-slate-200" : "text-slate-500 hover:bg-white/70 hover:text-slate-900"}`}><Ic className="size-4 shrink-0" style={on ? { color: "#4f46e5" } : undefined} />{s.he}</button>; })}
          <div className="!mt-3 space-y-1 border-t border-slate-200 pt-3">{[["אינטגרציה", "/integration/"], ["אבטחה", "/security/"], ["ALM", "/alm/"], ["Fiori / UX", "/fiori/"], ["מרכז S/4", "/s4hana/"], ["Migration", "/migration-cockpit/"]].map(([l, h]) => <Link key={h} href={h} className="flex items-center gap-2 rounded-xl px-3 py-1.5 text-[13px] font-bold text-slate-500 transition hover:text-brand"><ArrowLeft className="size-3.5" />{l}</Link>)}</div>
        </nav></aside>

        <div ref={scrollRef} className="min-w-0 max-h-[calc(100vh-2rem)] space-y-5 overflow-y-auto lg:pe-1">
          {/* Activate — timeline + selected phase */}
          <Card id="activate" title="SAP Activate · 6 שלבים" icon={<Target className="size-4" />} sub="לחץ שלב לפרטים מלאים — יעדים, תוצרים, תפקידים, פגישות, תבניות, סיכונים, טעויות" accent="#4f46e5">
            <div className="mb-4 flex flex-wrap items-center gap-1.5">{PHASES.map((ph, i) => { const Ic = PHASE_ICON[ph.id]; const on = ph.id === sel; return (
              <span key={ph.id} className="flex items-center gap-1.5">
                <button onClick={() => setSel(ph.id)} className={`flex items-center gap-2 rounded-2xl border-2 px-3 py-2 transition ${on ? "" : "border-slate-200 bg-white hover:border-slate-300"}`} style={on ? { borderColor: ph.color, background: ph.color + "0d" } : undefined}>
                  <span className="grid size-7 place-items-center rounded-lg text-white" style={{ background: ph.color }}><Ic className="size-4" /></span>
                  <span className="text-right"><span className="block text-[13px] font-extrabold text-slate-800">{ph.n}. {ph.he}</span><span className="block font-mono text-[9px] text-slate-400">{ph.en}</span></span>
                </button>{i < PHASES.length - 1 && <ArrowLeft className="size-4 shrink-0 text-slate-300" />}
              </span>); })}</div>
            <div className="overflow-hidden rounded-2xl border border-slate-200" key={p.id} style={{ animation: "fadeUp .2s ease both" }}>
              <div className="px-5 py-3 text-white" style={{ background: `linear-gradient(135deg,${p.color},${p.color}cc)` }}>
                <div className="text-lg font-extrabold">{p.n}. {p.he} · <span className="font-mono text-sm opacity-80">{p.en}</span></div>
                <p className="text-sm text-white/85">{p.goal}</p>
              </div>
              <div className="grid gap-4 p-5 md:grid-cols-2 xl:grid-cols-3">
                <List title="יעדים" items={p.objectives} c="#4f46e5" icon={<Target className="size-3.5" />} />
                <List title="תוצרים" items={p.deliverables} c="#16a34a" icon={<Boxes className="size-3.5" />} />
                <List title="תפקידים" items={p.roles} c="#0891b2" icon={<Users className="size-3.5" />} />
                <List title="פגישות" items={p.meetings} c="#7c3aed" />
                <List title="תבניות" items={p.templates} c="#0ea5e9" icon={<FileText className="size-3.5" />} />
                <List title="סיכונים" items={p.risks} c="#d97706" icon={<AlertTriangle className="size-3.5" />} />
                <div className="md:col-span-2 xl:col-span-3"><List title="טעויות נפוצות" items={p.mistakes} c="#dc2626" icon={<AlertTriangle className="size-3.5" />} /></div>
                <div className="rounded-xl bg-slate-50 p-3 md:col-span-2 xl:col-span-2"><div className="mb-1 flex items-center gap-1.5 text-[11px] font-bold uppercase text-slate-400"><Lightbulb className="size-3.5" />דוגמה</div><p className="text-[12px] leading-relaxed text-slate-700">{p.example}</p></div>
                {p.cbc && <div className="rounded-xl bg-emerald-50 p-3"><div className="mb-1 text-[11px] font-bold uppercase text-emerald-600">CBC</div><p className="text-[12px] leading-relaxed text-emerald-900">{p.cbc}</p></div>}
              </div>
              {p.links && <div className="flex flex-wrap gap-1.5 border-t border-slate-100 px-5 py-3">{p.links.map((l) => l.href.includes("#") ? <button key={l.label} onClick={() => go(l.href.split("#")[1])} className="rounded-lg bg-slate-100 px-2.5 py-1 text-[11px] font-bold text-slate-600 hover:bg-slate-200">{l.label}</button> : <Link key={l.label} href={l.href} className="rounded-lg bg-slate-100 px-2.5 py-1 text-[11px] font-bold text-slate-600 hover:bg-slate-200">{l.label}</Link>)}</div>}
            </div>
          </Card>

          {/* Cutover */}
          <Card id="cutover" title="Cutover Center" icon={<Rocket className="size-4" />} sub="לפני Go-Live · Go-Live · Hypercare" accent="#dc2626">
            <div className="grid gap-3 lg:grid-cols-3">{CUTOVER.map((ph) => (
              <div key={ph.phase} className="rounded-2xl border-2 p-4" style={{ borderColor: ph.c + "55" }}>
                <div className="mb-2 text-sm font-extrabold" style={{ color: ph.c }}>{ph.phase}</div>
                <ul className="space-y-1.5">{ph.items.map((it, i) => <li key={i} className="flex gap-2 text-[12px] leading-relaxed text-slate-600"><span className="mt-1.5 size-1.5 shrink-0 rounded-full" style={{ background: ph.c }} />{it}</li>)}</ul>
              </div>
            ))}</div>
            <p className="mt-2 text-[11px] text-slate-400">רצף הגירה מפורט: <Link href="/migration-cockpit/" className="font-bold text-blue-600">Migration Cockpit</Link>.</p>
          </Card>

          {/* Test */}
          <Card id="test" title="Test Management Center" icon={<FlaskConical className="size-4" />} sub="רמות בדיקה · Entry/Exit · כלים" accent="#16a34a">
            <div className="overflow-hidden rounded-xl border border-slate-200"><table className="w-full text-right text-[13px]"><thead className="bg-slate-50 text-[11px] font-bold uppercase text-slate-400"><tr><th className="px-3 py-2">רמה</th><th className="px-3 py-2">מה נבדק</th><th className="px-3 py-2">Entry</th><th className="px-3 py-2">Exit</th></tr></thead>
              <tbody>{TEST_LEVELS.map((l) => <tr key={l.he} className="border-t border-slate-100"><td className="px-3 py-2 font-bold text-slate-800">{l.he}</td><td className="px-3 py-2 text-slate-500">{l.sub}</td><td className="px-3 py-2 text-slate-500">{l.entry}</td><td className="px-3 py-2 text-slate-500">{l.exit}</td></tr>)}</tbody></table></div>
            <div className="mt-3 flex flex-wrap gap-1.5">{TEST_TOOLS.map((t) => <span key={t} className="rounded-lg bg-emerald-50 px-2.5 py-1 text-[11px] font-bold text-emerald-700">{t}</span>)}</div>
          </Card>

          {/* Defect */}
          <Card id="defect" title="Defect Management Center" icon={<Bug className="size-4" />} sub="חומרה · SLA · מחזור חיים" accent="#f97316">
            <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-4">{DEFECT_SEVERITY.map((d) => (
              <div key={d.sev} className="rounded-2xl border-2 p-3" style={{ borderColor: d.c + "55" }}><div className="flex items-center justify-between"><span className="font-mono text-lg font-extrabold" style={{ color: d.c }}>{d.sev}</span></div><div className="text-[13px] font-bold text-slate-800">{d.he}</div><div className="mt-1 text-[11px] font-bold text-slate-500">SLA: {d.sla}</div></div>
            ))}</div>
            <div className="mt-3 flex flex-wrap items-center gap-1.5">{DEFECT_FLOW.map((s, i, a) => <span key={s} className="flex items-center gap-1.5"><span className="rounded-lg bg-slate-100 px-2.5 py-1 text-[12px] font-bold text-slate-700">{s}</span>{i < a.length - 1 && <ArrowLeft className="size-3.5 text-slate-300" />}</span>)}</div>
          </Card>

          {/* Workshop */}
          <Card id="workshop" title="Workshop Center · Fit-to-Standard" icon={<Users className="size-4" />} sub="סוגי סדנאות + הכנה" accent="#7c3aed">
            <div className="grid gap-3 lg:grid-cols-2">
              <div className="space-y-2">{WORKSHOP_TYPES.map((w) => <div key={w.he} className="rounded-xl border border-slate-100 bg-slate-50/60 p-3"><div className="text-[13px] font-extrabold text-slate-800">{w.he}</div><p className="text-[12px] text-slate-500">{w.sub}</p></div>)}</div>
              <div className="rounded-2xl border border-violet-200 bg-violet-50/50 p-4"><div className="mb-1.5 text-[11px] font-bold uppercase text-violet-700">הכנה לסדנה</div><ul className="space-y-1.5">{WORKSHOP_PREP.map((x, i) => <li key={i} className="flex gap-2 text-[12px] text-slate-600"><span className="text-violet-500">✓</span>{x}</li>)}</ul></div>
            </div>
          </Card>

          {/* Blueprint */}
          <Card id="blueprint" title="Blueprint Center" icon={<FileText className="size-4" />} sub="Fit-to-Standard מחליף Business Blueprint קלאסי" accent="#0891b2">
            <p className="mb-3 rounded-xl bg-cyan-50 px-3 py-2 text-[13px] leading-relaxed text-cyan-900">{BLUEPRINT.approachHe}</p>
            <div className="grid gap-2.5 sm:grid-cols-2">{BLUEPRINT.items.map((b) => <div key={b.he} className="rounded-xl border border-slate-100 bg-slate-50/60 p-3"><div className="text-[13px] font-extrabold text-slate-800">{b.he}</div><p className="text-[12px] text-slate-500">{b.sub}</p></div>)}</div>
            <div className="mt-3 flex flex-wrap gap-1.5 border-t border-slate-100 pt-3">{[["מודל נתונים", "/sap-infrastructure/"], ["Object Explorer", "/s4hana/"], ["מרכז תקלות", "/incidents/"]].map(([l, h]) => <Link key={l} href={h} className="rounded-lg bg-slate-100 px-2.5 py-1 text-[11px] font-bold text-slate-600 hover:bg-slate-200">{l}</Link>)}</div>
          </Card>
          <p className="pb-4 text-center text-[11px] text-slate-400">מבוסס SAP Activate · SAP Best Practices · Fit-to-Standard · Cloud ALM. trust: curated — מתודולוגיה סטנדרטית, לא המצאה.</p>
        </div>
      </div>
    </div>
  );
}
