"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Orbit, LayoutGrid, GitBranch, RefreshCw, FlaskConical, Activity, GraduationCap, ArrowLeft, Boxes, Lightbulb, FileText, Wrench, Workflow, Server } from "lucide-react";
import { PLATFORMS, PLATFORM_NOTE, LIFECYCLE, TRANSPORT_FLOW, TRANSPORT_CONCEPTS, TRANSPORT_TCODES, CHANGE_TYPES, CHANGE_FLOW, ITSM_NOTE, TEST_CAPS, MONITOR_TYPES, ALM_INTERVIEW, ALM_META } from "@/data/alm";

const SECTIONS = [
  { id: "platforms", he: "פלטפורמות ALM", icon: LayoutGrid },
  { id: "lifecycle", he: "מחזור חיים E2E", icon: RefreshCw },
  { id: "transport", he: "ניהול טרנספורטים", icon: GitBranch },
  { id: "change", he: "שינויים ותקלות", icon: Workflow },
  { id: "test", he: "ניהול בדיקות", icon: FlaskConical },
  { id: "monitor", he: "ניטור", icon: Activity },
  { id: "interview", he: "שאלות ראיון", icon: GraduationCap },
] as const;

export function AlmCenter() {
  const [active, setActive] = useState("platforms");
  const [sel, setSel] = useState<string>("solman");
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
  const p = PLATFORMS.find((x) => x.id === sel) || PLATFORMS[0];

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
      <header className="relative overflow-hidden rounded-[1.75rem] bg-gradient-to-l from-slate-900 via-slate-800 to-[#1e3a8a] p-6 text-white shadow-xl sm:p-8">
        <div className="pointer-events-none absolute -left-24 -top-24 size-72 rounded-full bg-blue-500/25 blur-3xl" />
        <div className="relative">
          <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.22em] text-white/60"><Orbit className="size-4" />SAP ALM · SolMan · Focused Build · Cloud ALM</div>
          <h1 className="mt-1 text-3xl font-extrabold sm:text-4xl">{ALM_META.he}</h1>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-white/85">{ALM_META.sub}</p>
          <div className="mt-3 flex flex-wrap gap-2 text-[12px] font-bold text-white/80">{PLATFORMS.map((pl) => <button key={pl.id} onClick={() => { setSel(pl.id); go("platforms"); }} className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-2.5 py-0.5 hover:bg-white/20"><span className="size-2 rounded-full" style={{ background: pl.color }} />{pl.he}</button>)}</div>
        </div>
      </header>

      <div className="mt-4 grid gap-5 lg:grid-cols-[200px_minmax(0,1fr)]">
        <aside className="hidden lg:block"><nav className="sticky top-4 space-y-1">
          {SECTIONS.map((s) => { const Ic = s.icon; const on = active === s.id; return <button key={s.id} onClick={() => go(s.id)} className={`flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-right text-sm font-bold transition ${on ? "bg-white text-slate-900 shadow-sm ring-1 ring-slate-200" : "text-slate-500 hover:bg-white/70 hover:text-slate-900"}`}><Ic className="size-4 shrink-0" style={on ? { color: "#2563eb" } : undefined} />{s.he}</button>; })}
          <div className="!mt-3 space-y-1 border-t border-slate-200 pt-3">{[["מסירה", "/delivery/"], ["אבטחה", "/security/"], ["אינטגרציה", "/integration/"], ["Fiori / UX", "/fiori/"], ["Migration", "/migration-cockpit/"], ["מרכז S/4", "/s4hana/"]].map(([l, h]) => <Link key={h} href={h} className="flex items-center gap-2 rounded-xl px-3 py-1.5 text-[13px] font-bold text-slate-500 transition hover:text-brand"><ArrowLeft className="size-3.5" />{l}</Link>)}</div>
        </nav></aside>

        <div ref={scrollRef} className="min-w-0 max-h-[calc(100vh-2rem)] space-y-5 overflow-y-auto lg:pe-1">
          {/* 1-3. Platforms explorer */}
          <Card id="platforms" title="פלטפורמות ALM" icon={<LayoutGrid className="size-4" />} sub="Solution Manager · Focused Build · Cloud ALM — לחץ פלטפורמה ליכולות מלאות" accent="#2563eb">
            <div className="mb-3 flex flex-wrap gap-1.5">{PLATFORMS.map((pl) => { const on = pl.id === sel; return (
              <button key={pl.id} onClick={() => setSel(pl.id)} className={`rounded-xl border-2 px-3 py-1.5 text-[13px] font-bold transition ${on ? "text-white" : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"}`} style={on ? { background: pl.color, borderColor: pl.color } : undefined}>{pl.he}</button>
            ); })}</div>
            <div key={p.id} className="overflow-hidden rounded-2xl border border-slate-200" style={{ animation: "fadeUp .2s ease both" }}>
              <div className="px-5 py-3 text-white" style={{ background: `linear-gradient(135deg,${p.color},${p.color}cc)` }}>
                <div className="text-lg font-extrabold">{p.he} · <span className="font-mono text-sm opacity-80">{p.en}</span></div>
                <p className="text-sm text-white/85">{p.tagline}</p>
              </div>
              <div className="space-y-4 p-5">
                <div className="grid gap-4 md:grid-cols-2">
                  <div><div className="mb-1 text-[11px] font-bold uppercase tracking-wide" style={{ color: p.color }}>מה זה</div><p className="text-[13px] leading-relaxed text-slate-600">{p.what}</p></div>
                  <div><div className="mb-1 text-[11px] font-bold uppercase tracking-wide" style={{ color: p.color }}>מתי משתמשים</div><p className="text-[13px] leading-relaxed text-slate-600">{p.when}</p></div>
                </div>
                <div><div className="mb-1.5 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wide" style={{ color: p.color }}><Boxes className="size-3.5" />יכולות</div>
                  <div className="grid gap-2.5 sm:grid-cols-2 xl:grid-cols-3">{p.capabilities.map((c) => (
                    <div key={c.en} className="rounded-xl border border-slate-100 bg-slate-50/60 p-3"><div className="flex items-baseline gap-1.5"><span className="text-[13px] font-extrabold text-slate-800">{c.he}</span><span className="font-mono text-[9px] text-slate-400">{c.en}</span></div><p className="mt-0.5 text-[11.5px] leading-relaxed text-slate-500">{c.desc}</p></div>
                  ))}</div>
                </div>
                <div><div className="mb-1.5 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wide" style={{ color: p.color }}><Wrench className="size-3.5" />כלים / אפליקציות</div>
                  <div className="flex flex-wrap gap-1.5">{p.tools.map((t) => <span key={t} className="tech rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-[11px] font-bold text-slate-600" dir="ltr">{t}</span>)}</div>
                </div>
                <div className="grid gap-3 md:grid-cols-2">
                  <div className="rounded-xl bg-slate-50 p-3"><div className="mb-1 text-[11px] font-bold uppercase text-slate-500">ECC</div><p className="text-[12px] leading-relaxed text-slate-600">{p.ecc}</p></div>
                  <div className="rounded-xl bg-blue-50 p-3"><div className="mb-1 text-[11px] font-bold uppercase text-blue-600">S/4HANA</div><p className="text-[12px] leading-relaxed text-blue-900">{p.s4}</p></div>
                </div>
                <List title="טיפים" items={p.tips} c="#0d9488" icon={<Lightbulb className="size-3.5" />} />
                <div><div className="mb-1.5 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wide text-amber-600"><FileText className="size-3.5" />SAP Notes — מילות חיפוש + רכיב</div>
                  <div className="flex flex-wrap gap-1.5">{p.notes.map((n) => <span key={n} className="rounded-lg border border-amber-200 bg-amber-50 px-2.5 py-1 text-[11px] font-semibold text-amber-700" dir="ltr">{n}</span>)}</div>
                </div>
                <div className="rounded-xl border border-emerald-200 bg-emerald-50/60 p-3"><div className="mb-1 flex items-center gap-1.5 text-[11px] font-bold uppercase text-emerald-600"><Lightbulb className="size-3.5" />דוגמה — CBC</div><p className="text-[12px] leading-relaxed text-emerald-900">{p.cbc}</p></div>
              </div>
              <div className="flex flex-wrap gap-1.5 border-t border-slate-100 px-5 py-3">{p.links.map((l) => l.href.includes("/alm/#") ? <button key={l.label} onClick={() => go(l.href.split("#")[1])} className="rounded-lg bg-slate-100 px-2.5 py-1 text-[11px] font-bold text-slate-600 hover:bg-slate-200">{l.label}</button> : <Link key={l.label} href={l.href} className="rounded-lg bg-slate-100 px-2.5 py-1 text-[11px] font-bold text-slate-600 hover:bg-slate-200">{l.label}</Link>)}</div>
            </div>
            <p className="mt-3 text-[11px] leading-relaxed text-slate-400">{PLATFORM_NOTE}</p>
          </Card>

          {/* 4. Lifecycle */}
          <Card id="lifecycle" title="מחזור חיים End-to-End" icon={<RefreshCw className="size-4" />} sub="Discover → Design → Build → Test → Deploy → Operate" accent="#6366f1">
            <div className="flex flex-wrap items-stretch gap-1.5">{LIFECYCLE.map((l, i, arr) => (
              <span key={l.phase} className="flex items-center gap-1.5">
                <div className="flex min-w-[10rem] max-w-[13rem] flex-col rounded-xl border-2 p-3" style={{ borderColor: l.color + "55" }}>
                  <div className="flex items-center gap-1.5"><span className="size-2.5 rounded-full" style={{ background: l.color }} /><span className="text-[13px] font-extrabold text-slate-800">{l.phase}</span></div>
                  <span className="mb-1 font-mono text-[10px] text-slate-400">{l.tool}</span>
                  <ul className="space-y-0.5">{l.activities.map((a, j) => <li key={j} className="text-[11px] leading-tight text-slate-500">• {a}</li>)}</ul>
                </div>
                {i < arr.length - 1 && <ArrowLeft className="size-4 shrink-0 text-slate-300" />}
              </span>
            ))}</div>
          </Card>

          {/* 5. Transport management */}
          <Card id="transport" title="ניהול טרנספורטים" icon={<GitBranch className="size-4" />} sub="DEV → QA → PRD · STMS · CTS+ · Retrofit" accent="#0891b2">
            <div className="mb-4 flex flex-wrap items-center gap-1.5">{TRANSPORT_FLOW.map((s, i, arr) => <span key={s} className="flex items-center gap-1.5"><span className="rounded-lg px-2.5 py-1.5 text-[12px] font-bold text-white shadow-sm" style={{ background: i >= 4 ? "#dc2626" : i >= 2 ? "#d97706" : "#0891b2" }}>{s}</span>{i < arr.length - 1 && <ArrowLeft className="size-4 shrink-0 text-slate-300" />}</span>)}</div>
            <div className="grid gap-2.5 sm:grid-cols-2 xl:grid-cols-3">{TRANSPORT_CONCEPTS.map((c) => (
              <div key={c.en} className="rounded-xl border border-slate-100 bg-slate-50/60 p-3"><div className="flex items-baseline gap-1.5"><span className="text-[13px] font-extrabold text-slate-800">{c.he}</span><span className="font-mono text-[9px] text-slate-400">{c.en}</span></div><p className="mt-0.5 text-[11.5px] leading-relaxed text-slate-500">{c.desc}</p></div>
            ))}</div>
            <div className="mt-3 flex flex-wrap gap-1.5">{TRANSPORT_TCODES.map((t) => <span key={t} className="tech rounded-lg border border-cyan-200 bg-cyan-50 px-2.5 py-1 text-[11px] font-bold text-cyan-700" dir="ltr">{t}</span>)}</div>
          </Card>

          {/* 6. Change & incident */}
          <Card id="change" title="ניהול שינויים ותקלות" icon={<Workflow className="size-4" />} sub="ChaRM · ITSM · סוגי שינוי · מחזור חיים" accent="#7c3aed">
            <div className="grid gap-2.5 sm:grid-cols-2 xl:grid-cols-4">{CHANGE_TYPES.map((c) => (
              <div key={c.en} className="rounded-2xl border-2 p-3" style={{ borderColor: c.c + "55" }}><div className="text-[13px] font-extrabold" style={{ color: c.c }}>{c.he}</div><div className="font-mono text-[9px] text-slate-400">{c.en}</div><p className="mt-1 text-[11.5px] leading-relaxed text-slate-500">{c.desc}</p></div>
            ))}</div>
            <div className="mt-3 flex flex-wrap items-center gap-1.5">{CHANGE_FLOW.map((s, i, arr) => <span key={s} className="flex items-center gap-1.5"><span className="rounded-lg bg-slate-100 px-2.5 py-1 text-[12px] font-bold text-slate-700">{s}</span>{i < arr.length - 1 && <ArrowLeft className="size-3.5 text-slate-300" />}</span>)}</div>
            <p className="mt-3 rounded-xl bg-violet-50 px-3 py-2 text-[12px] leading-relaxed text-violet-900">{ITSM_NOTE}</p>
          </Card>

          {/* 7. Test management */}
          <Card id="test" title="מרכז ניהול בדיקות" icon={<FlaskConical className="size-4" />} sub="Test Suite · TBOM · BPCA · CBTA · Cloud ALM Test" accent="#16a34a">
            <div className="grid gap-2.5 sm:grid-cols-2 xl:grid-cols-3">{TEST_CAPS.map((c) => (
              <div key={c.en} className="rounded-xl border border-slate-100 bg-slate-50/60 p-3"><div className="flex items-baseline gap-1.5"><span className="text-[13px] font-extrabold text-slate-800">{c.he}</span><span className="font-mono text-[9px] text-slate-400">{c.en}</span></div><p className="mt-0.5 text-[11.5px] leading-relaxed text-slate-500">{c.desc}</p></div>
            ))}</div>
            <p className="mt-3 text-[11px] text-slate-400">רמות בדיקה + Entry/Exit מפורטים ב-<Link href="/delivery/" className="font-bold text-emerald-600">Test Management Center (Delivery)</Link>.</p>
          </Card>

          {/* 8. Monitoring */}
          <Card id="monitor" title="מרכז ניטור" icon={<Activity className="size-4" />} sub="System/Health · BPMon · Integration · Job · RCA · EWA" accent="#0ea5e9">
            <div className="grid gap-2.5 sm:grid-cols-2 xl:grid-cols-3">{MONITOR_TYPES.map((mt) => (
              <div key={mt.en} className="rounded-2xl border-2 p-3" style={{ borderColor: mt.c + "55" }}>
                <div className="flex items-center gap-1.5"><Server className="size-3.5" style={{ color: mt.c }} /><span className="text-[13px] font-extrabold text-slate-800">{mt.he}</span></div>
                <div className="font-mono text-[9px] text-slate-400">{mt.tool}</div>
                <p className="mt-1 text-[11.5px] leading-relaxed text-slate-500">{mt.desc}</p>
              </div>
            ))}</div>
            <div className="mt-3 flex flex-wrap gap-1.5">{[["אינטגרציה — ניטור", "/integration/"], ["מרכז תקלות", "/incidents/"]].map(([l, h]) => <Link key={h} href={h} className="rounded-lg bg-sky-50 px-2.5 py-1 text-[11px] font-bold text-sky-700 hover:bg-sky-100">{l}</Link>)}</div>
          </Card>

          {/* 9. Interview */}
          <Card id="interview" title="שאלות ראיון — קונסולטנט ALM" icon={<GraduationCap className="size-4" />} sub="לחץ שאלה לחשיפת התשובה" accent="#7c3aed">
            <div className="space-y-2">{ALM_INTERVIEW.map((qa, i) => { const open = qOpen === i; return (
              <div key={i} className="overflow-hidden rounded-xl border border-slate-200">
                <button onClick={() => setQOpen(open ? null : i)} className="flex w-full items-center justify-between gap-2 px-4 py-2.5 text-right text-[13px] font-bold text-slate-800 hover:bg-slate-50">
                  <span>{qa.q}</span><span className="shrink-0 font-mono text-slate-400">{open ? "−" : "+"}</span>
                </button>
                {open && <p className="border-t border-slate-100 bg-slate-50/60 px-4 py-2.5 text-[12.5px] leading-relaxed text-slate-600">{qa.a}</p>}
              </div>
            ); })}</div>
            <p className="mt-3 text-[11px] text-slate-400">מבוסס ידע ALM סטנדרטי של SAP — Solution Manager 7.2, Focused Build, Cloud ALM, CTS/STMS. trust: curated — לא המצאה.</p>
          </Card>
        </div>
      </div>
    </div>
  );
}
