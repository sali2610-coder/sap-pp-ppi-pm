"use client";

import { useMemo, useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Layers, GitCompare, Database, Boxes, Plug, ShieldCheck, LayoutGrid, FileSearch, Rocket, FlaskConical, ClipboardCheck, Lightbulb, ArrowLeft, Search, BrainCircuit, TrendingUp, AlertTriangle, Code2, ArrowRightLeft } from "lucide-react";
import { ECC_S4_TOPICS, STATUS_HE, STATUS_COLOR, type ChangeStatus } from "@/data/ecc-s4";
import { S4_IMPACT } from "@/data/s4-impact";
import { TRANSACTIONS } from "@/data/transactions";
import { CUSTOM_CODE, CUSTOM_CODE_NOTE, INTEGRATION, TESTING, CUTOVER, LESSONS, EXEC_NARRATIVE } from "@/data/s4-transformation";
import { ARCH, ARCH_STATUS } from "@/data/s4-architecture";
import { S4STATUS_META } from "@/data/s4-objects";
import { searchCatalog, catalogByName, catalogStats } from "@/lib/s4-catalog";
import { BookOpen } from "lucide-react";

const RISK_C = { high: "#dc2626", medium: "#d97706", low: "#16a34a" } as const;
const RISK_HE = { high: "סיכון גבוה", medium: "בינוני", low: "נמוך" } as const;
const AREA_HE: Record<string, string> = { Data: "מודל נתונים", PP: "ייצור (PP/PP-PI)", PM: "אחזקה (PM)", Platform: "פלטפורמה" };

const SECTIONS = [
  { id: "exec", he: "סקירת הנהלה", icon: TrendingUp },
  { id: "arch", he: "מפות ארכיטקטורה", icon: GitCompare },
  { id: "explorer", he: "S/4 Object Explorer", icon: BookOpen },
  { id: "modules", he: "השפעה לפי מודול", icon: LayoutGrid },
  { id: "data", he: "טרנספורמציית מודל נתונים", icon: Database },
  { id: "simpl", he: "Simplification Items", icon: FileSearch },
  { id: "fiori", he: "GUI ← Fiori", icon: Boxes },
  { id: "code", he: "השפעה על קוד מותאם", icon: Code2 },
  { id: "integration", he: "אינטגרציות", icon: Plug },
  { id: "testing", he: "בדיקות", icon: FlaskConical },
  { id: "cutover", he: "Cutover & Go-Live", icon: Rocket },
  { id: "lessons", he: "לקחים", icon: Lightbulb },
] as const;

export function S4Transformation() {
  const [active, setActive] = useState("exec");
  const [archSel, setArchSel] = useState(ARCH[0].id);
  const [expQ, setExpQ] = useState("");
  const [expSel, setExpSel] = useState("MSEG");
  const [q, setQ] = useState("");
  const [areaFilter, setAreaFilter] = useState<string>("all");
  const scrollRef = useRef<HTMLDivElement>(null);
  const secRef = useRef<Record<string, HTMLElement | null>>({});

  const kpi = useMemo(() => {
    const by = (s: ChangeStatus) => ECC_S4_TOPICS.filter((t) => t.status === s).length;
    const fioriTx = TRANSACTIONS.filter((t) => t.fiori).length;
    const simpl = ECC_S4_TOPICS.filter((t) => t.simplification).length;
    const areas = [...new Set(ECC_S4_TOPICS.map((t) => t.area))];
    return { topics: ECC_S4_TOPICS.length, replaced: by("Replaced"), changed: by("Changed"), deprecated: by("Deprecated"), unchanged: by("Unchanged"), impactTables: Object.keys(S4_IMPACT).length, fioriTx, simpl, areas: areas.length };
  }, []);

  useEffect(() => {
    const root = scrollRef.current; if (!root) return;
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) setActive((e.target as HTMLElement).id); }), { root, rootMargin: "-15% 0px -70% 0px" });
    SECTIONS.forEach((s) => { const el = secRef.current[s.id]; if (el) io.observe(el); });
    return () => io.disconnect();
  }, []);
  const go = (id: string) => secRef.current[id]?.scrollIntoView({ behavior: "smooth", block: "start" });

  const dataTopics = ECC_S4_TOPICS.filter((t) => t.status === "Replaced" || t.status === "Changed");
  const simplTopics = ECC_S4_TOPICS.filter((t) => t.simplification && (areaFilter === "all" || t.area === areaFilter) && (!q.trim() || `${t.title} ${t.he} ${t.simplification}`.toLowerCase().includes(q.toLowerCase())));
  const fioriByMod = useMemo(() => { const g: Record<string, typeof TRANSACTIONS> = {}; TRANSACTIONS.filter((t) => t.fiori).forEach((t) => (g[t.module] ||= []).push(t)); return g; }, []);
  const areaCounts = useMemo(() => { const g: Record<string, { tot: number; risk: number }> = {}; ECC_S4_TOPICS.forEach((t) => { const a = (g[t.area] ||= { tot: 0, risk: 0 }); a.tot++; if (t.status === "Replaced" || t.status === "Deprecated") a.risk++; }); return g; }, []);

  const Card = ({ id, title, icon, sub, accent, children: ch }: { id: string; title: string; icon: React.ReactNode; sub?: string; accent?: string; children: React.ReactNode }) => (
    <section id={id} ref={(el) => { secRef.current[id] = el; }} className="scroll-mt-4 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="mb-4 flex items-center gap-2.5">
        <span className="grid size-9 shrink-0 place-items-center rounded-xl text-white shadow-sm" style={{ background: accent || "#0f172a" }}>{icon}</span>
        <div><h2 className="text-lg font-extrabold text-slate-900">{title}</h2>{sub && <p className="text-xs font-medium text-slate-400">{sub}</p>}</div>
      </div>
      {ch}
    </section>
  );

  return (
    <div className="mx-auto max-w-[1700px]" dir="rtl">
      {/* hero */}
      <header className="relative overflow-hidden rounded-[1.75rem] bg-gradient-to-l from-slate-900 via-slate-800 to-[#1e3a8a] p-6 text-white shadow-xl sm:p-8">
        <div className="pointer-events-none absolute -left-24 -top-24 size-72 rounded-full bg-blue-500/25 blur-3xl" />
        <div className="relative">
          <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.22em] text-white/60"><ArrowRightLeft className="size-4" />S/4HANA Transformation Center</div>
          <h1 className="mt-1 text-3xl font-extrabold sm:text-4xl">מרכז טרנספורמציה · ECC → S/4HANA</h1>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-white/85">{EXEC_NARRATIVE}</p>
          <div className="mt-4 grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-6">
            {([["נושאי שינוי", kpi.topics, "#0ea5e9"], ["הוחלפו", kpi.replaced, "#2563eb"], ["שונו", kpi.changed, "#d97706"], ["הוסרו", kpi.deprecated, "#dc2626"], ["טבלאות מושפעות", kpi.impactTables, "#7c3aed"], ["Simplification", kpi.simpl, "#16a34a"]] as const).map(([l, n, c]) => (
              <div key={l} className="rounded-2xl border border-white/15 bg-white/10 px-4 py-3 backdrop-blur-sm"><div className="text-2xl font-extrabold tabular-nums" style={{ color: "#fff" }}>{n}</div><div className="text-[10px] font-bold uppercase tracking-wide text-white/60">{l}</div></div>
            ))}
          </div>
        </div>
      </header>

      <div className="mt-4 grid gap-5 lg:grid-cols-[220px_minmax(0,1fr)]">
        {/* rail */}
        <aside className="hidden lg:block"><nav className="sticky top-4 space-y-1">
          {SECTIONS.map((s) => { const Ic = s.icon; const on = active === s.id; return (
            <button key={s.id} onClick={() => go(s.id)} className={`flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-right text-sm font-bold transition ${on ? "bg-white text-slate-900 shadow-sm ring-1 ring-slate-200" : "text-slate-500 hover:bg-white/70 hover:text-slate-900"}`}>
              <Ic className="size-4 shrink-0" style={on ? { color: "#2563eb" } : undefined} />{s.he}
            </button>
          ); })}
          <Link href="/migration-cockpit/" className="mt-2 flex items-center gap-2 rounded-xl bg-slate-900 px-3 py-2 text-sm font-bold text-white"><Database className="size-4" />Migration Cockpit</Link>
          <button onClick={() => window.dispatchEvent(new Event("neo:open-mentor"))} className="flex w-full items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-right text-sm font-bold text-slate-600 transition hover:border-brand/40 hover:text-brand"><BrainCircuit className="size-4" />שאל מנטור S/4</button>
        </nav></aside>

        {/* content */}
        <div ref={scrollRef} className="min-w-0 max-h-[calc(100vh-2rem)] space-y-5 overflow-y-auto lg:pe-1">
          <Card id="exec" title="סקירת הנהלה" icon={<TrendingUp className="size-4" />} sub="ECC6 → S/4HANA במבט-על" accent="#2563eb">
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {([["DB", "Any DB", "SAP HANA (in-memory)"], ["UI", "SAP GUI", "SAP Fiori (+ GUI)"], ["מודל נתונים", "טבלאות סיכום/אינדקס", "טבלאות ליבה רזות (MATDOC/ACDOCA)"], ["דיווח", "BW נפרד + Extractors", "Embedded Analytics + Datasphere/SAC"], ["אינטגרציה", "PI/PO · RFC/IDoc", "Integration Suite · OData/CPI"], ["נתוני אב", "ידני / MDM", "MDG מוטמע"]] as const).map(([k, a, b]) => (
                <div key={k} className="rounded-2xl border border-slate-200 bg-slate-50/60 p-3">
                  <div className="text-[11px] font-bold uppercase tracking-wide text-slate-400">{k}</div>
                  <div className="mt-1 flex items-center gap-2 text-[13px]"><span className="rounded-md bg-slate-200 px-2 py-0.5 font-bold text-slate-600">ECC</span><span className="truncate text-slate-500">{a}</span></div>
                  <div className="mt-1 flex items-center gap-2 text-[13px]"><span className="rounded-md bg-blue-600 px-2 py-0.5 font-bold text-white">S/4</span><span className="truncate font-bold text-slate-800">{b}</span></div>
                </div>
              ))}
            </div>
          </Card>

          <Card id="arch" title="מפות ארכיטקטורה · ECC מול S/4HANA" icon={<GitCompare className="size-4" />} sub="Landscape לפני / אחרי · לחיצה על רכיב פותחת מה השתנה" accent="#2563eb">
            {(() => { const sel = ARCH.find((a) => a.id === archSel) || ARCH[0]; return (
              <div className="grid gap-4 lg:grid-cols-[1fr_360px]">
                {/* interactive landscape map: ECC (right) → S/4 (left) */}
                <div className="space-y-1.5">
                  <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2 px-1 pb-1 text-[11px] font-extrabold uppercase tracking-wide">
                    <span className="text-center text-slate-500">ECC 6</span><span /><span className="text-center text-blue-600">S/4HANA</span>
                  </div>
                  {ARCH.map((a) => { const on = a.id === archSel; const sc = ARCH_STATUS[a.status]; return (
                    <button key={a.id} onClick={() => setArchSel(a.id)} className={`grid w-full grid-cols-[1fr_auto_1fr] items-stretch gap-2 rounded-2xl border p-1.5 text-right transition ${on ? "border-blue-400 bg-blue-50/40 ring-1 ring-blue-300" : "border-slate-200 bg-white hover:border-slate-300"}`}>
                      <span className="rounded-xl bg-slate-100 px-3 py-2"><span className="block text-[9px] font-bold uppercase text-slate-400">{a.layerHe}</span><span className="block text-[13px] font-extrabold text-slate-700" dir="ltr">{a.ecc}</span></span>
                      <span className="flex flex-col items-center justify-center px-0.5"><ArrowLeft className="size-4" style={{ color: sc.c }} /><span className="rounded-full px-1 text-[8px] font-bold text-white" style={{ background: sc.c }}>{sc.he}</span></span>
                      <span className="rounded-xl px-3 py-2 text-white" style={{ background: a.status === "New" ? "#16a34a" : "#1e3a8a" }}><span className="block text-[9px] font-bold uppercase text-white/60">{a.layerHe}</span><span className="block text-[13px] font-extrabold" dir="ltr">{a.s4}</span></span>
                    </button>
                  ); })}
                </div>
                {/* detail panel for selected component */}
                <div className="lg:sticky lg:top-2 lg:self-start">
                  <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm" style={{ animation: "fadeUp .2s ease both" }} key={sel.id}>
                    <div className="px-4 py-3 text-white" style={{ background: "linear-gradient(135deg,#1e3a8a,#2563eb)" }}>
                      <div className="flex items-center justify-between gap-2"><span className="text-[11px] font-bold uppercase tracking-wide text-white/70">{sel.layerHe}</span><span className="rounded-full px-2 py-0.5 text-[10px] font-bold" style={{ background: "rgba(255,255,255,.92)", color: ARCH_STATUS[sel.status].c }}>{ARCH_STATUS[sel.status].he}</span></div>
                      <div className="mt-1 flex items-center gap-2 text-sm font-extrabold" dir="ltr"><span className="text-white/70">{sel.ecc}</span><ArrowLeft className="size-3.5 shrink-0" /><span>{sel.s4}</span></div>
                    </div>
                    <div className="space-y-2.5 p-4 text-[12px] leading-relaxed">
                      <div><div className="text-[10px] font-bold uppercase text-slate-400">ב-ECC</div><p className="text-slate-600">{sel.eccDesc}</p></div>
                      <div><div className="text-[10px] font-bold uppercase text-blue-600">ב-S/4HANA</div><p className="font-medium text-slate-700">{sel.s4Desc}</p></div>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="rounded-lg bg-emerald-50 p-2"><div className="text-[10px] font-bold text-emerald-700">מה נשאר</div><p className="text-[11px] text-emerald-900">{sel.stays}</p></div>
                        <div className="rounded-lg bg-rose-50 p-2"><div className="text-[10px] font-bold text-rose-700">מה נעלם</div><p className="text-[11px] text-rose-900">{sel.gone}</p></div>
                      </div>
                      <div className="flex items-center justify-between rounded-lg bg-amber-50 px-2.5 py-1.5"><span className="text-[11px] font-bold text-amber-800">סיכון מיגרציה</span><span className="rounded-full px-2 py-0.5 text-[10px] font-bold text-white" style={{ background: RISK_C[sel.risk] }}>{RISK_HE[sel.risk]}</span></div>
                      <div className="flex flex-wrap gap-1.5 pt-0.5">{sel.links.map((l) => l.href.startsWith("/s4hana#") || l.href.includes("#") ? <button key={l.label} onClick={() => go(l.href.split("#")[1])} className="rounded-lg bg-slate-100 px-2.5 py-1 text-[11px] font-bold text-slate-600 transition hover:bg-slate-200">{l.label}</button> : <Link key={l.label} href={l.href} className="rounded-lg bg-slate-100 px-2.5 py-1 text-[11px] font-bold text-slate-600 transition hover:bg-slate-200">{l.label}</Link>)}</div>
                    </div>
                  </div>
                </div>
              </div>
            ); })()}
          </Card>

          <Card id="explorer" title="S/4 Object Explorer" icon={<BookOpen className="size-4" />} sub={`${catalogStats().total}+ אובייקטים — חפש כל אובייקט ECC וקבל מה קרה לו ב-S/4`} accent="#7c3aed">
            {(() => {
              const results = searchCatalog(expQ, 30);
              const o = catalogByName(expSel) || results[0];
              const st = o ? S4STATUS_META[o.status] : null;
              return (
                <div className="grid gap-4 lg:grid-cols-[300px_minmax(0,1fr)]">
                  {/* search + result list */}
                  <div className="flex max-h-[460px] flex-col">
                    <div className="relative mb-2"><Search className="pointer-events-none absolute start-3 top-1/2 size-4 -translate-y-1/2 text-slate-300" /><input value={expQ} onChange={(e) => setExpQ(e.target.value)} placeholder="MSEG · MATDOC · MATNR · AFKO · BAPI…" className="w-full rounded-xl border border-slate-200 bg-white py-2 pe-3 ps-9 text-sm outline-none focus:border-violet-400" dir="ltr" /></div>
                    <div className="min-h-0 flex-1 space-y-1 overflow-y-auto pe-1">{results.map((r) => { const rs = S4STATUS_META[r.status]; const on = o && r.name === o.name; return (
                      <button key={r.name + r.kind} onClick={() => setExpSel(r.name)} className={`flex w-full items-center gap-2 rounded-lg border px-2.5 py-1.5 text-right transition ${on ? "border-violet-300 bg-violet-50" : "border-slate-100 bg-white hover:border-slate-300"}`}>
                        <span className="size-2 shrink-0 rounded-full" style={{ background: rs.c }} />
                        <span className="tech min-w-0 flex-1 truncate font-mono text-[12px] font-bold text-slate-800" dir="ltr">{r.name}</span>
                        <span className="shrink-0 rounded bg-slate-100 px-1 py-0.5 text-[8px] font-bold text-slate-500">{r.kind}</span>
                      </button>
                    ); })}{results.length === 0 && <p className="py-6 text-center text-sm text-slate-400">לא נמצא.</p>}</div>
                  </div>
                  {/* object detail — Wikipedia card */}
                  {o && st && (
                    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm" key={o.name} style={{ animation: "fadeUp .2s ease both" }}>
                      <div className="px-5 py-3.5 text-white" style={{ background: `linear-gradient(135deg,${st.c},${st.c}cc)` }}>
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="tech font-mono text-2xl font-extrabold" dir="ltr">{o.name}</span>
                          <span className="rounded-md bg-white/20 px-2 py-0.5 text-[10px] font-bold ring-1 ring-white/25">{o.kind}</span>
                          <span className="rounded-full bg-white px-2 py-0.5 text-[10px] font-extrabold" style={{ color: st.c }}>{st.he}</span>
                          {o.trust === "needs-verification" && <span className="rounded-md bg-amber-300 px-2 py-0.5 text-[9px] font-bold text-amber-950">needs verification</span>}
                          {o.release && <span className="rounded-md bg-white/15 px-2 py-0.5 text-[10px] font-bold">{o.release}</span>}
                        </div>
                        <p className="mt-0.5 text-sm font-medium text-white/85">{o.he}</p>
                      </div>
                      <div className="space-y-3 p-5">
                        {/* before / after */}
                        <div className="grid items-stretch gap-2 sm:grid-cols-[1fr_auto_1fr]">
                          <div className="rounded-xl bg-slate-100 p-3"><div className="text-[10px] font-bold uppercase text-slate-400">ECC</div><p className="text-[13px] text-slate-600">{o.ecc || "—"}</p></div>
                          <div className="flex items-center justify-center"><ArrowLeft className="size-5" style={{ color: st.c }} /></div>
                          <div className="rounded-xl p-3 text-white" style={{ background: "#1e3a8a" }}><div className="text-[10px] font-bold uppercase text-white/60">S/4HANA</div><p className="text-[13px] font-medium">{o.s4}</p></div>
                        </div>
                        {o.replaces?.length ? <div className="rounded-lg bg-blue-50 px-3 py-1.5 text-[12px] text-blue-900"><b>מאחד/מחליף:</b> <span className="tech font-mono" dir="ltr">{o.replaces.join(", ")}</span></div> : null}
                        {o.why && <p className="text-[13px] leading-relaxed text-slate-600"><b className="text-slate-800">למה: </b>{o.why}</p>}

                        <div className="grid gap-3 sm:grid-cols-2">
                          <div><div className="mb-1 text-[10px] font-bold uppercase text-slate-400">מודולים מושפעים</div><div className="flex flex-wrap gap-1">{o.modules.map((m) => <span key={m} className="rounded-md bg-slate-100 px-1.5 py-0.5 text-[11px] font-bold text-slate-600">{m}</span>)}</div></div>
                          <div><div className="mb-1 text-[10px] font-bold uppercase text-slate-400">סיכון מיגרציה</div><span className="rounded-full px-2.5 py-0.5 text-[11px] font-bold text-white" style={{ background: RISK_C[o.risk] }}>{RISK_HE[o.risk]}</span></div>
                        </div>

                        {o.related.length > 0 && <div><div className="mb-1 text-[10px] font-bold uppercase text-slate-400">אובייקטים קשורים</div><div className="flex flex-wrap gap-1.5" dir="ltr">{o.related.map((r) => catalogByName(r) ? <button key={r} onClick={() => setExpSel(r)} className="tech rounded-md border border-slate-200 bg-slate-50 px-1.5 py-0.5 font-mono text-[11px] font-bold text-slate-700 transition hover:border-violet-400 hover:text-violet-700">{r}</button> : <span key={r} className="tech rounded-md bg-slate-100 px-1.5 py-0.5 font-mono text-[11px] font-bold text-slate-500">{r}</span>)}</div></div>}

                        {o.abap?.length ? <div><div className="mb-1 flex items-center gap-1.5 text-[10px] font-bold uppercase text-violet-600"><Code2 className="size-3.5" />השפעת ABAP</div><div className="space-y-1.5">{o.abap.map((a, i) => <div key={i} className="rounded-lg border border-slate-100 bg-slate-50/60 p-2"><div className="text-[12px]"><span className="rounded bg-violet-100 px-1.5 py-0.5 text-[10px] font-bold text-violet-700">{a.k}</span> <span className="text-slate-600">{a.note}</span></div>{a.code && <pre className="mt-1 overflow-x-auto rounded bg-slate-900 px-2 py-1 font-mono text-[10.5px] text-emerald-300" dir="ltr">{a.code}</pre>}</div>)}</div></div> : null}

                        {o.checklist?.length ? <div><div className="mb-1 flex items-center gap-1.5 text-[10px] font-bold uppercase text-slate-400"><ClipboardCheck className="size-3.5" />Checklist לפרויקט</div><ul className="space-y-0.5">{o.checklist.map((c, i) => <li key={i} className="flex gap-1.5 text-[12px] text-slate-600"><span className="text-emerald-500">✔</span>{c}</li>)}</ul></div> : null}

                        <div className="flex flex-wrap gap-1.5 border-t border-slate-100 pt-3">
                          {o.kind === "Table" && <Link href={`/impact/${encodeURIComponent(o.name)}/`} className="rounded-lg bg-slate-100 px-2.5 py-1 text-[11px] font-bold text-slate-600 transition hover:bg-slate-200">ניתוח השפעה</Link>}
                          {o.kind === "Tcode" && <Link href={`/tcode/${encodeURIComponent(o.name)}/`} className="rounded-lg bg-slate-100 px-2.5 py-1 text-[11px] font-bold text-slate-600 transition hover:bg-slate-200">פרטי טרנזקציה</Link>}
                          <button onClick={() => go("arch")} className="rounded-lg bg-slate-100 px-2.5 py-1 text-[11px] font-bold text-slate-600 transition hover:bg-slate-200">מפת ארכיטקטורה</button>
                          <Link href="/sap-infrastructure/" className="rounded-lg bg-slate-100 px-2.5 py-1 text-[11px] font-bold text-slate-600 transition hover:bg-slate-200">מודל נתונים</Link>
                          <button onClick={() => window.dispatchEvent(new Event("neo:open-mentor"))} className="rounded-lg bg-slate-100 px-2.5 py-1 text-[11px] font-bold text-slate-600 transition hover:bg-slate-200">שאל מנטור</button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })()}
          </Card>

          <Card id="modules" title="השפעה לפי מודול / תחום" icon={<LayoutGrid className="size-4" />} sub="היקף השינוי לכל תחום (מתוך נושאי ה-ECC↔S/4 המאומתים)">
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {Object.entries(areaCounts).map(([area, c]) => (
                <Link key={area} href="/ecc-s4/" className="group rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                  <div className="text-base font-extrabold text-slate-900">{AREA_HE[area] || area}</div>
                  <div className="mt-2 flex items-center gap-3 text-[12px] font-bold text-slate-500"><span>{c.tot} נושאים</span>{c.risk > 0 && <span className="flex items-center gap-1 text-rose-500"><AlertTriangle className="size-3.5" />{c.risk} סיכון</span>}</div>
                  <div className="mt-2 inline-flex items-center gap-1 text-[12px] font-bold text-blue-600 group-hover:gap-2">פתח <ArrowLeft className="size-3.5" /></div>
                </Link>
              ))}
            </div>
            <p className="mt-3 text-[11px] text-slate-400">השפעה ברמת אובייקט לכל מודול: ראה לשונית <b>מודל נתונים</b> (badge S/4 צהוב) ומרכז <Link href="/impact/" className="font-bold text-blue-600">ניתוח השפעה</Link>.</p>
          </Card>

          <Card id="data" title="טרנספורמציית מודל הנתונים" icon={<Database className="size-4" />} sub="ECC → S/4 · לפני / אחרי · לחיצה לפרטים מלאים" accent="#2563eb">
            <div className="grid gap-3 lg:grid-cols-2">
              {dataTopics.map((t) => (
                <Link key={t.slug} href={`/ecc-s4/${t.slug}/`} className="group rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-md">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-extrabold text-slate-900">{t.he} · <span className="font-mono text-[13px] text-slate-500" dir="ltr">{t.title}</span></span>
                    <span className="shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold text-white" style={{ background: STATUS_COLOR[t.status] }}>{STATUS_HE[t.status]}</span>
                  </div>
                  <div className="mt-2 grid gap-1.5 text-[12px]">
                    <div className="flex gap-2"><span className="shrink-0 rounded bg-slate-200 px-1.5 font-bold text-slate-600">ECC</span><span className="text-slate-500">{t.ecc}</span></div>
                    <div className="flex gap-2"><span className="shrink-0 rounded bg-blue-600 px-1.5 font-bold text-white">S/4</span><span className="font-medium text-slate-700">{t.s4}</span></div>
                  </div>
                  {t.impact && <p className="mt-2 rounded-lg bg-amber-50 px-2 py-1 text-[11px] font-bold text-amber-800">⚠ {t.impact}</p>}
                </Link>
              ))}
            </div>
          </Card>

          <Card id="simpl" title="Simplification Item Explorer" icon={<FileSearch className="size-4" />} sub={`${ECC_S4_TOPICS.filter((t) => t.simplification).length} פריטי Simplification מאומתים · חיפוש חופשי`}>
            <div className="mb-3 flex flex-wrap items-center gap-2">
              <div className="relative flex-1"><Search className="pointer-events-none absolute start-3 top-1/2 size-4 -translate-y-1/2 text-slate-300" /><input value={q} onChange={(e) => setQ(e.target.value)} placeholder="חפש Simplification Item…" className="w-full rounded-xl border border-slate-200 bg-white py-2 pe-3 ps-9 text-sm outline-none focus:border-blue-400" /></div>
              <div className="flex gap-1">{["all", "Data", "PP", "PM", "Platform"].map((a) => <button key={a} onClick={() => setAreaFilter(a)} className={`rounded-full px-2.5 py-1 text-[11px] font-bold transition ${areaFilter === a ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-500 hover:bg-slate-200"}`}>{a === "all" ? "הכל" : AREA_HE[a]}</button>)}</div>
            </div>
            <div className="space-y-2">{simplTopics.map((t) => (
              <Link key={t.slug} href={`/ecc-s4/${t.slug}/`} className="block rounded-xl border border-slate-100 bg-slate-50/60 px-3 py-2.5 transition hover:border-blue-300 hover:bg-white">
                <div className="flex items-center justify-between gap-2"><span className="text-[13px] font-extrabold text-slate-800">{t.simplification}</span><span className="shrink-0 rounded-full px-1.5 py-0.5 text-[9px] font-bold text-white" style={{ background: STATUS_COLOR[t.status] }}>{STATUS_HE[t.status]}</span></div>
                <p className="mt-0.5 text-[12px] text-slate-500">{t.he} — {t.impact}</p>
              </Link>
            ))}{simplTopics.length === 0 && <p className="py-6 text-center text-sm text-slate-400">לא נמצאו פריטים.</p>}</div>
          </Card>

          <Card id="fiori" title="GUI ← Fiori" icon={<Boxes className="size-4" />} sub={`${kpi.fioriTx} טרנזקציות עם אפליקציית Fiori מקבילה`} accent="#0ea5e9">
            <div className="grid gap-4 lg:grid-cols-3">{Object.entries(fioriByMod).map(([mod, txs]) => (
              <div key={mod}><div className="mb-1.5 text-[11px] font-bold uppercase tracking-wide text-slate-400">{mod} · {txs.length}</div>
                <div className="space-y-1.5">{txs.slice(0, 10).map((t) => (
                  <div key={t.code} className="flex items-center gap-2 rounded-lg border border-slate-100 bg-slate-50/60 px-2.5 py-1.5">
                    <Link href={`/tcode/${encodeURIComponent(t.code)}/`} className="tech shrink-0 rounded bg-slate-200 px-1.5 py-0.5 font-mono text-[11px] font-bold text-slate-700 transition hover:bg-slate-300" dir="ltr">{t.code}</Link>
                    <ArrowLeft className="size-3 shrink-0 text-slate-300" />
                    <span className="truncate text-[12px] font-medium text-blue-700">{t.fiori}</span>
                  </div>
                ))}</div>
              </div>
            ))}</div>
          </Card>

          <Card id="code" title="השפעה על קוד מותאם · ABAP Readiness" icon={<Code2 className="size-4" />} sub="מה משתנה לכל סוג אובייקט פיתוח" accent="#7c3aed">
            <div className="overflow-hidden rounded-xl border border-slate-200"><table className="w-full text-right text-[13px]"><thead className="bg-slate-50 text-[11px] font-bold uppercase text-slate-400"><tr><th className="px-3 py-2">אובייקט</th><th className="px-3 py-2">ECC</th><th className="px-3 py-2">S/4HANA</th><th className="px-3 py-2">סיכון</th></tr></thead>
              <tbody>{CUSTOM_CODE.map((r, i) => (<tr key={i} className="border-t border-slate-100 align-top"><td className="px-3 py-2 font-bold text-slate-800">{r.he}</td><td className="px-3 py-2 text-slate-500">{r.ecc}</td><td className="px-3 py-2 font-medium text-slate-700">{r.s4}</td><td className="px-3 py-2">{r.risk && <span className="rounded-full px-2 py-0.5 text-[10px] font-bold text-white" style={{ background: RISK_C[r.risk] }}>{RISK_HE[r.risk]}</span>}</td></tr>))}</tbody></table></div>
            <p className="mt-2 text-[11px] font-bold text-slate-400">{CUSTOM_CODE_NOTE}</p>
          </Card>

          <Card id="integration" title="מרכז אינטגרציות" icon={<Plug className="size-4" />} sub="המומלץ ב-ECC מול S/4HANA">
            <div className="grid gap-3 lg:grid-cols-2">{INTEGRATION.map((r, i) => (
              <div key={i} className="rounded-2xl border border-slate-200 bg-slate-50/60 p-3">
                <div className="font-extrabold text-slate-900">{r.he}</div>
                <div className="mt-1.5 flex gap-2 text-[12px]"><span className="shrink-0 rounded bg-slate-200 px-1.5 font-bold text-slate-600">ECC</span><span className="text-slate-500">{r.ecc}</span></div>
                <div className="mt-1 flex gap-2 text-[12px]"><span className="shrink-0 rounded bg-blue-600 px-1.5 font-bold text-white">S/4</span><span className="font-medium text-slate-700">{r.s4}</span></div>
              </div>
            ))}</div>
          </Card>

          <Card id="testing" title="מרכז בדיקות" icon={<FlaskConical className="size-4" />} sub="מה לבדוק בפרויקט המרה ל-S/4" accent="#16a34a">
            <div className="grid gap-2.5 sm:grid-cols-2">{TESTING.map((r, i) => (
              <div key={i} className="flex items-start gap-3 rounded-xl border border-slate-100 bg-slate-50/60 p-3"><span className="grid size-7 shrink-0 place-items-center rounded-lg bg-emerald-100 text-[12px] font-extrabold text-emerald-700">{i + 1}</span><div><div className="text-[13px] font-extrabold text-slate-800">{r.he}</div><div className="text-[12px] text-slate-500">{r.sub}</div></div></div>
            ))}</div>
          </Card>

          <Card id="cutover" title="Cutover & Go-Live" icon={<Rocket className="size-4" />} sub="Checklist מלא — לפני / במהלך / Hypercare" accent="#dc2626">
            <div className="grid gap-3 lg:grid-cols-3">{CUTOVER.map((ph) => (
              <div key={ph.phase} className="rounded-2xl border-2 p-4" style={{ borderColor: ph.c + "55" }}>
                <div className="mb-2 flex items-center gap-1.5 text-sm font-extrabold" style={{ color: ph.c }}><ClipboardCheck className="size-4" />{ph.phase}</div>
                <ul className="space-y-1.5">{ph.items.map((it, i) => <li key={i} className="flex gap-2 text-[12px] leading-relaxed text-slate-600"><span className="mt-1.5 size-1.5 shrink-0 rounded-full" style={{ background: ph.c }} />{it}</li>)}</ul>
              </div>
            ))}</div>
          </Card>

          <Card id="lessons" title="לקחים מהשטח" icon={<Lightbulb className="size-4" />} sub="מלכודות נפוצות בפרויקטי המרה (trust: curated)" accent="#d97706">
            <div className="grid gap-2.5 lg:grid-cols-2">{LESSONS.map((l, i) => (
              <div key={i} className="rounded-xl border border-slate-100 bg-slate-50/60 p-3" style={{ borderInlineStartColor: RISK_C[l.risk], borderInlineStartWidth: 3 }}>
                <div className="flex items-center justify-between gap-2"><span className="text-[13px] font-extrabold text-slate-800">{l.he}</span><span className="shrink-0 rounded-full px-1.5 py-0.5 text-[9px] font-bold text-white" style={{ background: RISK_C[l.risk] }}>{RISK_HE[l.risk]}</span></div>
                <p className="mt-0.5 text-[12px] text-slate-500">{l.sub}</p>
              </div>
            ))}</div>
          </Card>
          <p className="pb-4 text-center text-[11px] text-slate-400">נתוני ECC↔S/4 נגזרים מנושאים מאומתים · מתודולוגיה (קוד/אינטגרציה/בדיקות/Cutover) = ידע SAP סטנדרטי, מסומן curated. לא להמציא — אמת מול גרסת היעד וה-Readiness Check.</p>
        </div>
      </div>
    </div>
  );
}
