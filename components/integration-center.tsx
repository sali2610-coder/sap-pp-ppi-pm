"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Network, Workflow, GitBranch, Boxes, Radio, Plug, Cable, Cloud, Webhook, ArrowLeft, AlertTriangle, Bug, Activity, Search, Wrench, FileText, Lightbulb, Zap, ServerCog } from "lucide-react";
import { MODULES, CAT_META, INTG_META, INTG_USAGE } from "@/data/integration";

const ICON: Record<string, typeof Network> = {
  idoc: FileText, ale: GitBranch, rfc: Cable, trfc: Cable, qrfc: Workflow,
  pipo: ServerCog, cpi: Cloud, suite: Boxes, odata: Plug, api: Webhook, eventmesh: Radio,
};

const SECTIONS = [
  { id: "landscape", he: "מפת אינטגרציה", icon: Network },
  { id: "explorer", he: "חוקר מודולים", icon: Search },
  { id: "matrix", he: "מטריצת שימוש", icon: GitBranch },
] as const;

const AREA_HREF: Record<string, string> = {
  PM: "/pm/", PP: "/pp-pi/", "PP-PI": "/pp-pi/", SD: "/sap-infrastructure/", MM: "/sap-infrastructure/",
  FI: "/sap-infrastructure/", Migration: "/migration-cockpit/", "B2B/EDI": "/integration/#suite",
  CIF: "/integration/#qrfc", "ALE/IDoc": "/integration/#ale", Fiori: "/s4hana/", Mobile: "/s4hana/", "Cross-system": "/integration/#eventmesh",
};

export function IntegrationCenter() {
  const [active, setActive] = useState("landscape");
  const [sel, setSel] = useState<string>("idoc");
  const scrollRef = useRef<HTMLDivElement>(null);
  const secRef = useRef<Record<string, HTMLElement | null>>({});
  useEffect(() => {
    const root = scrollRef.current; if (!root) return;
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) setActive((e.target as HTMLElement).id); }), { root, rootMargin: "-15% 0px -75% 0px" });
    SECTIONS.forEach((s) => { const el = secRef.current[s.id]; if (el) io.observe(el); });
    return () => io.disconnect();
  }, []);
  const go = (id: string) => secRef.current[id]?.scrollIntoView({ behavior: "smooth", block: "start" });
  const m = MODULES.find((x) => x.id === sel) || MODULES[0];
  const pick = (id: string) => { setSel(id); go("explorer"); };

  const cats = (["classic", "middleware", "modern", "event"] as const).map((cat) => ({ ...CAT_META[cat], items: MODULES.filter((x) => x.cat === cat) }));

  const Card = ({ id, title, icon, sub, accent, children: ch }: { id: string; title: string; icon: React.ReactNode; sub?: string; accent?: string; children: React.ReactNode }) => (
    <section id={id} ref={(el) => { secRef.current[id] = el; }} className="scroll-mt-4 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="mb-4 flex items-center gap-2.5"><span className="grid size-9 shrink-0 place-items-center rounded-xl text-white shadow-sm" style={{ background: accent || "#0f172a" }}>{icon}</span><div><h2 className="text-lg font-extrabold text-slate-900">{title}</h2>{sub && <p className="text-xs font-medium text-slate-400">{sub}</p>}</div></div>
      {ch}
    </section>
  );
  const List = ({ title, items, c, icon }: { title: string; items: string[]; c: string; icon?: React.ReactNode }) => (
    <div><div className="mb-1 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wide" style={{ color: c }}>{icon}{title}</div><ul className="space-y-1">{items.map((x, i) => <li key={i} className="flex gap-1.5 text-[12px] leading-relaxed text-slate-600"><span className="mt-1.5 size-1.5 shrink-0 rounded-full" style={{ background: c }} />{x}</li>)}</ul></div>
  );

  // visual data-flow diagram — chained nodes in module color (RTL)
  const FlowDiagram = ({ steps, color }: { steps: string[]; color: string }) => (
    <div className="flex flex-wrap items-stretch gap-1.5 rounded-2xl border border-slate-200 bg-slate-50/70 p-3">
      {steps.map((s, i) => (
        <span key={i} className="flex items-center gap-1.5">
          <span className="flex min-h-[2.75rem] max-w-[10rem] items-center rounded-xl px-3 py-1.5 text-[11.5px] font-bold leading-tight text-white shadow-sm" style={{ background: `linear-gradient(135deg,${color},${color}cc)` }}>{s}</span>
          {i < steps.length - 1 && <ArrowLeft className="size-4 shrink-0" style={{ color }} />}
        </span>
      ))}
    </div>
  );

  return (
    <div className="mx-auto max-w-[1700px]" dir="rtl">
      <header className="relative overflow-hidden rounded-[1.75rem] bg-gradient-to-l from-slate-900 via-slate-800 to-[#1e3a8a] p-6 text-white shadow-xl sm:p-8">
        <div className="pointer-events-none absolute -left-24 -top-24 size-72 rounded-full bg-blue-500/25 blur-3xl" />
        <div className="relative">
          <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.22em] text-white/60"><Network className="size-4" />SAP Integration · Classic → Cloud</div>
          <h1 className="mt-1 text-3xl font-extrabold sm:text-4xl">{INTG_META.he}</h1>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-white/85">{INTG_META.sub}</p>
          <div className="mt-3 flex flex-wrap gap-2 text-[12px] font-bold text-white/80">{cats.map((g) => <span key={g.c} className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-2.5 py-0.5"><span className="size-2 rounded-full" style={{ background: g.c }} />{g.he} · {g.items.length}</span>)}</div>
        </div>
      </header>

      <div className="mt-4 grid gap-5 lg:grid-cols-[200px_minmax(0,1fr)]">
        <aside className="hidden lg:block"><nav className="sticky top-4 space-y-1">
          {SECTIONS.map((s) => { const Ic = s.icon; const on = active === s.id; return <button key={s.id} onClick={() => go(s.id)} className={`flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-right text-sm font-bold transition ${on ? "bg-white text-slate-900 shadow-sm ring-1 ring-slate-200" : "text-slate-500 hover:bg-white/70 hover:text-slate-900"}`}><Ic className="size-4 shrink-0" style={on ? { color: "#2563eb" } : undefined} />{s.he}</button>; })}
          <div className="!mt-3 space-y-1 border-t border-slate-200 pt-3">{[["מרכז תקלות", "/incidents/"], ["Migration", "/migration-cockpit/"], ["מרכז S/4", "/s4hana/"]].map(([l, h]) => <Link key={h} href={h} className="flex items-center gap-2 rounded-xl px-3 py-1.5 text-[13px] font-bold text-slate-500 transition hover:text-brand"><ArrowLeft className="size-3.5" />{l}</Link>)}</div>
        </nav></aside>

        <div ref={scrollRef} className="min-w-0 max-h-[calc(100vh-2rem)] space-y-5 overflow-y-auto lg:pe-1">
          {/* Landscape — modules grouped by category */}
          <Card id="landscape" title="מפת נוף האינטגרציה" icon={<Network className="size-4" />} sub="11 טכנולוגיות לפי קטגוריה — לחץ מודול לחוקר המלא" accent="#2563eb">
            <div className="space-y-4">
              {cats.map((g) => (
                <div key={g.c}>
                  <div className="mb-2 flex items-center gap-2 text-[12px] font-extrabold" style={{ color: g.c }}><span className="size-2.5 rounded-full" style={{ background: g.c }} />{g.he}</div>
                  <div className="grid gap-2.5 sm:grid-cols-2 xl:grid-cols-3">
                    {g.items.map((mod) => { const Ic = ICON[mod.id]; const on = mod.id === sel; return (
                      <button key={mod.id} onClick={() => pick(mod.id)} className={`group rounded-2xl border-2 p-3 text-right transition hover:-translate-y-0.5 hover:shadow-md ${on ? "" : "border-slate-200 bg-white"}`} style={on ? { borderColor: mod.color, background: mod.color + "0a" } : undefined}>
                        <div className="flex items-center gap-2.5">
                          <span className="grid size-9 shrink-0 place-items-center rounded-xl text-white shadow-sm" style={{ background: mod.color }}><Ic className="size-5" /></span>
                          <div className="min-w-0"><div className="flex items-center gap-1.5"><span className="text-[14px] font-extrabold text-slate-900">{mod.he}</span><span className="font-mono text-[9px] text-slate-400">{mod.abbr}</span></div><div className="truncate font-mono text-[9px] text-slate-400">{mod.en}</div></div>
                        </div>
                        <p className="mt-1.5 text-[11.5px] leading-relaxed text-slate-500">{mod.tagline}</p>
                      </button>
                    ); })}
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Explorer — selected module deep detail */}
          <Card id="explorer" title="חוקר מודולים" icon={<Search className="size-4" />} sub="ארכיטקטורה · דיאגרמת זרימה · ניטור · תקלות · Root Cause · Debug · SAP Notes" accent={m.color}>
            <div className="mb-3 flex flex-wrap gap-1.5">{MODULES.map((mod) => { const on = mod.id === sel; return (
              <button key={mod.id} onClick={() => setSel(mod.id)} className={`rounded-xl border-2 px-2.5 py-1 text-[12px] font-bold transition ${on ? "text-white" : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"}`} style={on ? { background: mod.color, borderColor: mod.color } : undefined}>{mod.he}</button>
            ); })}</div>

            <div key={m.id} className="overflow-hidden rounded-2xl border border-slate-200" style={{ animation: "fadeUp .2s ease both" }}>
              <div className="px-5 py-3 text-white" style={{ background: `linear-gradient(135deg,${m.color},${m.color}cc)` }}>
                <div className="text-lg font-extrabold">{m.he} · <span className="font-mono text-sm opacity-80">{m.en}</span></div>
                <p className="text-sm text-white/85">{m.tagline}</p>
              </div>
              <div className="space-y-4 p-5">
                {/* architecture */}
                <div><div className="mb-1 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wide" style={{ color: m.color }}><Boxes className="size-3.5" />ארכיטקטורה</div><p className="text-[13px] leading-relaxed text-slate-600">{m.architecture}</p></div>
                {/* flow diagram */}
                <div><div className="mb-1.5 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wide" style={{ color: m.color }}><Zap className="size-3.5" />דיאגרמת זרימת נתונים</div><FlowDiagram steps={m.flow} color={m.color} /></div>
                {/* monitoring */}
                <div><div className="mb-1.5 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wide" style={{ color: m.color }}><Activity className="size-3.5" />ניטור</div>
                  <div className="overflow-hidden rounded-xl border border-slate-200"><table className="w-full text-right text-[12.5px]"><tbody>{m.monitoring.map((mo, i) => <tr key={i} className="border-t border-slate-100 first:border-t-0"><td className="w-40 px-3 py-1.5 font-mono text-[11px] font-bold text-slate-800" dir="ltr">{mo.t}</td><td className="px-3 py-1.5 text-slate-500">{mo.what}</td></tr>)}</tbody></table></div>
                </div>
                {/* transactions */}
                <div><div className="mb-1.5 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wide" style={{ color: m.color }}><Wrench className="size-3.5" />טרנזקציות / כלים</div>
                  <div className="flex flex-wrap gap-1.5">{m.transactions.map((t) => <span key={t} className="tech rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-[11px] font-bold text-slate-600" dir="ltr">{t}</span>)}</div>
                </div>
                {/* trouble / root / debug */}
                <div className="grid gap-4 md:grid-cols-3">
                  <List title="תקלות נפוצות" items={m.troubleshooting} c="#dc2626" icon={<AlertTriangle className="size-3.5" />} />
                  <List title="גורמי שורש" items={m.rootCauses} c="#d97706" icon={<Search className="size-3.5" />} />
                  <List title="Debugging" items={m.debug} c="#7c3aed" icon={<Bug className="size-3.5" />} />
                </div>
                {/* notes */}
                <div><div className="mb-1.5 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wide text-amber-600"><FileText className="size-3.5" />SAP Notes — מילות חיפוש + רכיב</div>
                  <div className="flex flex-wrap gap-1.5">{m.notes.map((n) => <span key={n} className="rounded-lg border border-amber-200 bg-amber-50 px-2.5 py-1 text-[11px] font-semibold text-amber-700" dir="ltr">{n}</span>)}</div>
                </div>
                {/* incidents + cbc */}
                <div className="grid gap-3 lg:grid-cols-2">
                  {m.incidents.length > 0 && <div className="rounded-xl border border-rose-200 bg-rose-50/60 p-3"><div className="mb-1.5 text-[11px] font-bold uppercase text-rose-600">תקלות מתועדות</div><div className="flex flex-wrap gap-1.5">{m.incidents.map((inc) => <Link key={inc.slug} href={`/troubleshooting/${inc.slug}/`} className="rounded-lg bg-white px-2.5 py-1 text-[11.5px] font-bold text-rose-700 ring-1 ring-rose-200 transition hover:bg-rose-100">{inc.label} ←</Link>)}</div></div>}
                  <div className="rounded-xl border border-emerald-200 bg-emerald-50/60 p-3"><div className="mb-1 flex items-center gap-1.5 text-[11px] font-bold uppercase text-emerald-600"><Lightbulb className="size-3.5" />דוגמה — CBC</div><p className="text-[12px] leading-relaxed text-emerald-900">{m.cbc}</p></div>
                </div>
              </div>
              {/* cross-links */}
              <div className="flex flex-wrap gap-1.5 border-t border-slate-100 px-5 py-3">{m.links.map((l) => l.href.includes("/integration/#") ? <button key={l.label} onClick={() => pick(l.href.split("#")[1])} className="rounded-lg bg-slate-100 px-2.5 py-1 text-[11px] font-bold text-slate-600 hover:bg-slate-200">{l.label}</button> : <Link key={l.label} href={l.href} className="rounded-lg bg-slate-100 px-2.5 py-1 text-[11px] font-bold text-slate-600 hover:bg-slate-200">{l.label}</Link>)}</div>
            </div>
          </Card>

          {/* Matrix — usage across functional areas */}
          <Card id="matrix" title="מטריצת שימוש — אינטגרציה ↔ מודולים" icon={<GitBranch className="size-4" />} sub="איזו טכנולוגיית אינטגרציה משרתת אילו תחומים פונקציונליים" accent="#0891b2">
            <div className="grid gap-2.5 sm:grid-cols-2">{INTG_USAGE.map((u) => (
              <div key={u.tech} className="rounded-2xl border border-slate-200 bg-slate-50/60 p-3">
                <div className="mb-1.5 text-[13px] font-extrabold text-slate-800">{u.tech}</div>
                <div className="flex flex-wrap gap-1.5">{u.areas.map((a) => { const href = AREA_HREF[a]; return href.includes("/integration/#") ? <button key={a} onClick={() => pick(href.split("#")[1])} className="rounded-lg bg-white px-2.5 py-1 text-[11px] font-bold text-slate-600 ring-1 ring-slate-200 hover:ring-blue-300">{a}</button> : <Link key={a} href={href} className="rounded-lg bg-white px-2.5 py-1 text-[11px] font-bold text-slate-600 ring-1 ring-slate-200 transition hover:ring-blue-300">{a}</Link>; })}</div>
              </div>
            ))}</div>
            <p className="mt-3 text-[11px] text-slate-400">מבוסס ארכיטקטורת אינטגרציה סטנדרטית של SAP — IDoc/ALE/RFC, PI/PO→Integration Suite, OData/RAP, Enterprise Eventing. trust: curated — לא המצאה.</p>
          </Card>
        </div>
      </div>
    </div>
  );
}
