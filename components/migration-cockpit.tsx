"use client";

import { useMemo, useRef, useState, useEffect } from "react";
import Link from "next/link";
import { Database, Boxes, Network, Gauge, ShieldCheck, AlertTriangle, Play, ArrowLeft, Search, Layers, CheckCircle2, ListChecks, FileStack, GitCompare } from "lucide-react";
import { APPROACHES, MIG_OBJECTS, MIG_ERRORS, QUALITY_DIMS, READINESS, MIG_CHECKLIST, MIG_LOAD_LAYERS, MIG_META, type MigObj, type MigCat } from "@/data/migration-cockpit";
import { RelatedCenters } from "@/components/related-centers";

const RISK_C = { high: "#dc2626", medium: "#d97706", low: "#16a34a" } as const;
const RISK_HE = { high: "סיכון גבוה", medium: "בינוני", low: "נמוך" } as const;
const byId = Object.fromEntries(MIG_OBJECTS.map((o) => [o.id, o]));
const depth = (o: MigObj): number => (o.dependsOn.length === 0 ? 0 : 1 + Math.max(...o.dependsOn.map((d) => (byId[d] ? depth(byId[d]) : 0))));

const SECTIONS = [
  { id: "explorer", he: "Cockpit Explorer", icon: Database },
  { id: "library", he: "ספריית אובייקטים", icon: Boxes },
  { id: "deps", he: "מפת תלויות ורצף", icon: Network },
  { id: "sim", he: "סימולטור הגירה", icon: Play },
  { id: "readiness", he: "Readiness Score", icon: Gauge },
  { id: "quality", he: "מרכז איכות נתונים", icon: ShieldCheck },
  { id: "errors", he: "תקלות נפוצות", icon: AlertTriangle },
  { id: "mapping", he: "ECC → אובייקט הגירה", icon: GitCompare },
  { id: "checklist", he: "Checklist", icon: ListChecks },
] as const;

const CAT_HE: Record<MigCat, string> = { Foundation: "בסיס", Master: "נתוני אב", Transactional: "תנועות / יתרות", HR: "HR" };

export function MigrationCockpit() {
  const [active, setActive] = useState("explorer");
  const [libQ, setLibQ] = useState("");
  const [libCat, setLibCat] = useState<string>("all");
  const [sel, setSel] = useState<string | null>("bp");
  const [errQ, setErrQ] = useState("");
  const [picked, setPicked] = useState<Set<string>>(new Set(["bp", "customer", "material", "bom"]));
  const [ready, setReady] = useState<Set<number>>(new Set());
  const [done, setDone] = useState<Set<number>>(new Set());
  const scrollRef = useRef<HTMLDivElement>(null);
  const secRef = useRef<Record<string, HTMLElement | null>>({});

  useEffect(() => {
    const root = scrollRef.current; if (!root) return;
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) setActive((e.target as HTMLElement).id); }), { root, rootMargin: "-15% 0px -75% 0px" });
    SECTIONS.forEach((s) => { const el = secRef.current[s.id]; if (el) io.observe(el); });
    return () => io.disconnect();
  }, []);
  const go = (id: string) => secRef.current[id]?.scrollIntoView({ behavior: "smooth", block: "start" });

  const lib = MIG_OBJECTS.filter((o) => (libCat === "all" || o.cat === libCat) && (!libQ.trim() || `${o.name} ${o.he} ${o.ecc.join(" ")}`.toLowerCase().includes(libQ.toLowerCase())));
  const o = sel ? byId[sel] : null;
  const errs = MIG_ERRORS.filter((e) => !errQ.trim() || `${e.he} ${e.symptom} ${e.cause}`.toLowerCase().includes(errQ.toLowerCase()));
  const readyScore = READINESS.reduce((n, r, i) => n + (ready.has(i) ? r.w : 0), 0);

  const plan = useMemo(() => {
    const ids = [...picked];
    const sorted = ids.map((id) => byId[id]).filter(Boolean).sort((a, b) => depth(a) - depth(b) || a.cat.localeCompare(b.cat));
    const missing = new Set<string>();
    ids.forEach((id) => byId[id]?.dependsOn.forEach((d) => { if (!picked.has(d)) missing.add(d); }));
    return { sorted, missing: [...missing] };
  }, [picked]);
  const toggleP = (id: string) => { const n = new Set(picked); n.has(id) ? n.delete(id) : n.add(id); setPicked(n); };

  const Card = ({ id, title, icon, sub, accent, children: ch }: { id: string; title: string; icon: React.ReactNode; sub?: string; accent?: string; children: React.ReactNode }) => (
    <section id={id} ref={(el) => { secRef.current[id] = el; }} className="scroll-mt-4 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="mb-4 flex items-center gap-2.5"><span className="grid size-9 shrink-0 place-items-center rounded-xl text-white shadow-sm" style={{ background: accent || "#0f172a" }}>{icon}</span><div><h2 className="text-lg font-extrabold text-slate-900">{title}</h2>{sub && <p className="text-xs font-medium text-slate-400">{sub}</p>}</div></div>
      {ch}
    </section>
  );

  return (
    <div className="mx-auto max-w-[1700px]" dir="rtl">
      <header className="relative overflow-hidden rounded-[1.75rem] bg-gradient-to-l from-slate-900 via-slate-800 to-[#0e7490] p-6 text-white shadow-xl sm:p-8">
        <div className="pointer-events-none absolute -left-24 -top-24 size-72 rounded-full bg-cyan-500/25 blur-3xl" />
        <div className="relative">
          <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.22em] text-white/60"><Database className="size-4" />S/4HANA Migration Cockpit</div>
          <h1 className="mt-1 text-3xl font-extrabold sm:text-4xl">מרכז הגירת נתונים · LTMC</h1>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-white/85">ספריית אובייקטי הגירה, רצף טעינה לפי תלויות, איכות נתונים, סימולטור והכנה לפרויקט — מבוסס תוכן ה-Migration Cockpit הסטנדרטי של SAP. trust: curated · פריטים לא ודאיים מסומנים needs-verification.</p>
          <div className="mt-4 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
            {([["אובייקטי הגירה", MIG_META.objects], ["גישות העברה", MIG_META.approaches], ["תקלות נפוצות", MIG_META.errors], ["שכבות טעינה", MIG_LOAD_LAYERS.length]] as const).map(([l, n]) => (
              <div key={l} className="rounded-2xl border border-white/15 bg-white/10 px-4 py-3 backdrop-blur-sm"><div className="text-2xl font-extrabold tabular-nums">{n}</div><div className="text-[10px] font-bold uppercase tracking-wide text-white/60">{l}</div></div>
            ))}
          </div>
        </div>
      </header>

      <div className="mt-4 grid gap-5 lg:grid-cols-[210px_minmax(0,1fr)]">
        <aside className="hidden lg:block"><nav className="sticky top-4 space-y-1">
          {SECTIONS.map((s) => { const Ic = s.icon; const on = active === s.id; return (
            <button key={s.id} onClick={() => go(s.id)} className={`flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-right text-sm font-bold transition ${on ? "bg-white text-slate-900 shadow-sm ring-1 ring-slate-200" : "text-slate-500 hover:bg-white/70 hover:text-slate-900"}`}><Ic className="size-4 shrink-0" style={on ? { color: "#0e7490" } : undefined} />{s.he}</button>
          ); })}
          <div className="!mt-3 space-y-1 border-t border-slate-200 pt-3">
            {[["מרכז S/4", "/s4hana/"], ["מודל נתונים", "/sap-infrastructure/"], ["ניתוח השפעה", "/impact/"]].map(([l, h]) => <Link key={h} href={h} className="flex items-center gap-2 rounded-xl px-3 py-1.5 text-[13px] font-bold text-slate-500 transition hover:text-brand"><ArrowLeft className="size-3.5" />{l}</Link>)}
          </div>
        </nav></aside>

        <div ref={scrollRef} className="min-w-0 max-h-[calc(100vh-2rem)] space-y-5 overflow-y-auto lg:pe-1">
          <Card id="explorer" title="Cockpit Explorer · גישות העברה" icon={<Database className="size-4" />} sub="LTMC · Staging · File · Migration Object Modeler · Direct Transfer" accent="#0e7490">
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{APPROACHES.map((a) => (
              <div key={a.id} className="rounded-2xl border border-slate-200 bg-slate-50/60 p-4">
                <div className="flex items-center justify-between gap-2"><span className="font-extrabold text-slate-900">{a.he}</span>{a.trust === "needs-verification" && <span className="rounded bg-amber-200 px-1.5 py-0.5 text-[8px] font-bold text-amber-950">verify</span>}</div>
                <div className="font-mono text-[11px] text-cyan-700" dir="ltr">{a.en}</div>
                <p className="mt-1.5 text-[12px] leading-relaxed text-slate-600">{a.desc}</p>
                <p className="mt-1 text-[11px] font-bold text-slate-500">מתי: {a.when}</p>
                {a.note && <p className="mt-1 rounded bg-white px-2 py-1 text-[11px] text-slate-500 ring-1 ring-slate-100">{a.note}</p>}
              </div>
            ))}</div>
          </Card>

          <Card id="library" title="ספריית אובייקטי הגירה" icon={<Boxes className="size-4" />} sub={`${MIG_OBJECTS.length} אובייקטים · לחיצה לפרטים`} accent="#7c3aed">
            <div className="mb-3 flex flex-wrap items-center gap-2">
              <div className="relative flex-1"><Search className="pointer-events-none absolute start-3 top-1/2 size-4 -translate-y-1/2 text-slate-300" /><input value={libQ} onChange={(e) => setLibQ(e.target.value)} placeholder="חפש אובייקט…" className="w-full rounded-xl border border-slate-200 bg-white py-2 pe-3 ps-9 text-sm outline-none focus:border-violet-400" /></div>
              <div className="flex flex-wrap gap-1">{["all", "Foundation", "Master", "Transactional", "HR"].map((c) => <button key={c} onClick={() => setLibCat(c)} className={`rounded-full px-2.5 py-1 text-[11px] font-bold transition ${libCat === c ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-500 hover:bg-slate-200"}`}>{c === "all" ? "הכל" : CAT_HE[c as MigCat]}</button>)}</div>
            </div>
            <div className="grid gap-3 lg:grid-cols-[1fr_320px]">
              <div className="grid gap-2 sm:grid-cols-2">{lib.map((m) => { const on = sel === m.id; return (
                <button key={m.id} onClick={() => setSel(m.id)} className={`rounded-2xl border p-3 text-right transition ${on ? "border-violet-300 bg-violet-50" : "border-slate-200 bg-white hover:border-slate-300"}`}>
                  <div className="flex items-center justify-between gap-2"><span className="font-extrabold text-slate-900">{m.he}</span><span className="rounded-full px-2 py-0.5 text-[9px] font-bold text-white" style={{ background: RISK_C[m.risk] }}>{RISK_HE[m.risk]}</span></div>
                  <div className="font-mono text-[11px] text-slate-400" dir="ltr">{m.name}</div>
                  <div className="mt-1 flex flex-wrap items-center gap-1 text-[10px] font-bold text-slate-400"><span className="rounded bg-slate-100 px-1.5 py-0.5">{m.module}</span><span className="rounded bg-slate-100 px-1.5 py-0.5">{CAT_HE[m.cat]}</span></div>
                </button>
              ); })}</div>
              {o && <div className="lg:sticky lg:top-2 lg:self-start"><div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm" key={o.id}>
                <div className="px-4 py-3 text-white" style={{ background: "linear-gradient(135deg,#6d28d9,#7c3aed)" }}><div className="flex items-center justify-between"><span className="font-extrabold" dir="ltr">{o.name}</span><span className="rounded-full px-2 py-0.5 text-[10px] font-bold text-white ring-1 ring-white/30" style={{ background: RISK_C[o.risk] }}>{RISK_HE[o.risk]}</span></div><p className="text-sm text-white/85">{o.he} · {o.module}{o.trust === "needs-verification" ? " · needs verification" : ""}</p></div>
                <div className="space-y-2 p-4 text-[12px]">
                  <div><span className="font-bold text-slate-700">מפתח: </span><span className="font-mono text-slate-600" dir="ltr">{o.keys}</span></div>
                  <div><div className="text-[10px] font-bold uppercase text-slate-400">תלוי ב (load first)</div>{o.dependsOn.length ? <div className="flex flex-wrap gap-1">{o.dependsOn.map((d) => <button key={d} onClick={() => setSel(d)} className="rounded-md border border-slate-200 bg-slate-50 px-1.5 py-0.5 text-[11px] font-bold text-slate-700 transition hover:border-violet-400">{byId[d]?.he || d}</button>)}</div> : <span className="text-slate-400">— ראשון בטעינה</span>}</div>
                  <div><div className="text-[10px] font-bold uppercase text-slate-400">מקור ECC</div><div className="flex flex-wrap gap-1" dir="ltr">{o.ecc.length ? o.ecc.map((t) => <Link key={t} href={`/object/${encodeURIComponent(t)}/`} className="tech rounded-md bg-slate-100 px-1.5 py-0.5 font-mono text-[11px] font-bold text-slate-600 transition hover:text-brand">{t}</Link>) : <span className="text-slate-400">—</span>}</div></div>
                  <p className="rounded-lg bg-slate-50 px-2.5 py-1.5 text-[12px] leading-relaxed text-slate-600">{o.note}</p>
                </div>
              </div></div>}
            </div>
          </Card>

          <Card id="deps" title="מפת תלויות ורצף טעינה" icon={<Network className="size-4" />} sub="טען תמיד: בסיס → נתוני אב → תנועות. דוגמה: Business Partner → Customer → Sales Order" accent="#2563eb">
            <div className="grid gap-3 lg:grid-cols-4">{MIG_LOAD_LAYERS.map((layer) => (
              <div key={layer.cat} className="rounded-2xl border-2 p-3" style={{ borderColor: layer.c + "44" }}>
                <div className="mb-2 flex items-center gap-1.5 text-sm font-extrabold" style={{ color: layer.c }}><Layers className="size-4" />{layer.he}</div>
                <div className="space-y-1.5">{MIG_OBJECTS.filter((m) => m.cat === layer.cat).map((m) => (
                  <button key={m.id} onClick={() => { setSel(m.id); go("library"); }} className="block w-full rounded-lg border border-slate-100 bg-white px-2.5 py-1.5 text-right transition hover:border-slate-300">
                    <span className="block text-[12px] font-extrabold text-slate-800">{m.he}</span>
                    {m.dependsOn.length > 0 && <span className="block text-[9px] text-slate-400">↳ {m.dependsOn.map((d) => byId[d]?.he || d).join(" · ")}</span>}
                  </button>
                ))}</div>
              </div>
            ))}</div>
          </Card>

          <Card id="sim" title="סימולטור הגירה (Mock)" icon={<Play className="size-4" />} sub="בחר אובייקטים → קבל תוכנית טעינה מסודרת ואזהרות תלות" accent="#16a34a">
            <div className="grid gap-3 lg:grid-cols-[1fr_360px]">
              <div className="flex flex-wrap gap-1.5">{MIG_OBJECTS.map((m) => { const on = picked.has(m.id); return <button key={m.id} onClick={() => toggleP(m.id)} className={`rounded-lg border px-2 py-1 text-[11px] font-bold transition ${on ? "border-emerald-400 bg-emerald-50 text-emerald-800" : "border-slate-200 bg-white text-slate-500 hover:border-slate-300"}`}>{on ? "✓ " : ""}{m.he}</button>; })}</div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50/60 p-3">
                <div className="mb-1.5 flex items-center gap-1.5 text-[12px] font-extrabold text-slate-700"><FileStack className="size-4 text-emerald-600" />תוכנית טעינה · {plan.sorted.length} אובייקטים</div>
                {plan.missing.length > 0 && <div className="mb-2 rounded-lg bg-amber-50 px-2.5 py-1.5 text-[11px] font-bold text-amber-800"><AlertTriangle className="mb-0.5 inline size-3.5" /> חסרות תלויות: {plan.missing.map((d) => byId[d]?.he || d).join(", ")} — הוסף לפני טעינה.</div>}
                <ol className="space-y-1">{plan.sorted.map((m, i) => <li key={m.id} className="flex items-center gap-2 rounded-lg bg-white px-2.5 py-1.5 text-[12px] ring-1 ring-slate-100"><span className="grid size-5 shrink-0 place-items-center rounded-full bg-slate-900 text-[10px] font-bold text-white">{i + 1}</span><span className="flex-1 font-bold text-slate-700">{m.he}</span><span className="rounded px-1.5 py-0.5 text-[9px] font-bold text-white" style={{ background: RISK_C[m.risk] }}>{RISK_HE[m.risk]}</span></li>)}</ol>
                {plan.sorted.length === 0 && <p className="py-4 text-center text-sm text-slate-400">בחר אובייקטים.</p>}
              </div>
            </div>
          </Card>

          <Card id="readiness" title="Migration Readiness Score" icon={<Gauge className="size-4" />} sub="סמן מה הושלם — הציון מתעדכן בזמן אמת" accent="#0ea5e9">
            <div className="grid gap-4 lg:grid-cols-[180px_1fr] lg:items-center">
              <div className="text-center"><div className="text-5xl font-extrabold tabular-nums" style={{ color: readyScore >= 80 ? "#16a34a" : readyScore >= 50 ? "#d97706" : "#dc2626" }}>{readyScore}</div><div className="text-[11px] font-bold uppercase text-slate-400">{readyScore >= 80 ? "מוכן" : readyScore >= 50 ? "בתהליך" : "ראשוני"}</div><div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100"><span className="block h-full rounded-full transition-all" style={{ width: `${readyScore}%`, background: readyScore >= 80 ? "#16a34a" : "#0ea5e9" }} /></div></div>
              <div className="space-y-1.5">{READINESS.map((r, i) => { const on = ready.has(i); return (
                <button key={i} onClick={() => { const n = new Set(ready); n.has(i) ? n.delete(i) : n.add(i); setReady(n); }} className={`flex w-full items-center gap-2.5 rounded-xl border px-3 py-2 text-right transition ${on ? "border-emerald-300 bg-emerald-50" : "border-slate-200 bg-white hover:border-slate-300"}`}>
                  <span className={`grid size-5 shrink-0 place-items-center rounded-md border-2 ${on ? "border-emerald-500 bg-emerald-500 text-white" : "border-slate-300"}`}>{on && <CheckCircle2 className="size-3.5" />}</span>
                  <span className="flex-1 text-[13px] font-bold text-slate-700">{r.he}</span><span className="text-[11px] font-bold text-slate-400">{r.w}%</span>
                </button>
              ); })}</div>
            </div>
          </Card>

          <Card id="quality" title="מרכז איכות נתונים" icon={<ShieldCheck className="size-4" />} sub="ממדי איכות שיש לאמת לפני טעינה">
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{QUALITY_DIMS.map((d) => (
              <div key={d.he} className="rounded-2xl border border-slate-100 bg-slate-50/60 p-3"><div className="text-[13px] font-extrabold text-slate-800">{d.he}</div><p className="text-[12px] text-slate-500">{d.sub}</p></div>
            ))}</div>
          </Card>

          <Card id="errors" title="ספריית תקלות נפוצות" icon={<AlertTriangle className="size-4" />} sub={`${MIG_ERRORS.length} תקלות LTMC נפוצות + פתרון`} accent="#dc2626">
            <div className="relative mb-3"><Search className="pointer-events-none absolute start-3 top-1/2 size-4 -translate-y-1/2 text-slate-300" /><input value={errQ} onChange={(e) => setErrQ(e.target.value)} placeholder="חפש תקלה…" className="w-full rounded-xl border border-slate-200 bg-white py-2 pe-3 ps-9 text-sm outline-none focus:border-rose-400" /></div>
            <div className="space-y-2">{errs.map((e, i) => (
              <details key={i} className="group rounded-xl border border-slate-200 bg-white [&_summary]:list-none">
                <summary className="flex cursor-pointer items-center gap-2 p-3"><AlertTriangle className="size-4 shrink-0 text-rose-500" /><span className="flex-1 text-[13px] font-extrabold text-slate-800">{e.he}</span></summary>
                <div className="space-y-1.5 border-t border-slate-100 px-3 py-2 text-[12px]"><p><b>סימפטום:</b> {e.symptom}</p><p><b>סיבה:</b> {e.cause}</p><p className="rounded bg-emerald-50 px-2 py-1 text-emerald-900"><b>פתרון:</b> {e.fix}</p></div>
              </details>
            ))}{errs.length === 0 && <p className="py-6 text-center text-sm text-slate-400">לא נמצא.</p>}</div>
          </Card>

          <Card id="mapping" title="ECC → אובייקט הגירה" icon={<GitCompare className="size-4" />} sub="מאיזה טבלאות ECC כל אובייקט הגירה נטען">
            <div className="overflow-hidden rounded-xl border border-slate-200"><table className="w-full text-right text-[13px]"><thead className="bg-slate-50 text-[11px] font-bold uppercase text-slate-400"><tr><th className="px-3 py-2">אובייקט הגירה</th><th className="px-3 py-2">מודול</th><th className="px-3 py-2">טבלאות ECC</th></tr></thead>
              <tbody>{MIG_OBJECTS.filter((m) => m.ecc.length).map((m) => (<tr key={m.id} className="border-t border-slate-100"><td className="px-3 py-2 font-bold text-slate-800">{m.he} <span className="font-mono text-[11px] text-slate-400" dir="ltr">{m.name}</span></td><td className="px-3 py-2 text-slate-500">{m.module}</td><td className="px-3 py-2"><span className="flex flex-wrap gap-1" dir="ltr">{m.ecc.map((t) => <Link key={t} href={`/object/${encodeURIComponent(t)}/`} className="tech rounded bg-slate-100 px-1.5 py-0.5 font-mono text-[11px] font-bold text-slate-600 transition hover:text-brand">{t}</Link>)}</span></td></tr>))}</tbody></table></div>
          </Card>

          <Card id="checklist" title="S/4 Migration Checklist" icon={<ListChecks className="size-4" />} sub="תהליך ההגירה מקצה לקצה" accent="#16a34a">
            <div className="mb-2 flex items-center gap-2"><div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-100"><span className="block h-full rounded-full bg-emerald-500 transition-all" style={{ width: `${Math.round((done.size / MIG_CHECKLIST.length) * 100)}%` }} /></div><span className="text-xs font-extrabold tabular-nums text-emerald-600">{done.size}/{MIG_CHECKLIST.length}</span></div>
            <div className="space-y-1.5">{MIG_CHECKLIST.map((c, i) => { const on = done.has(i); return (
              <button key={i} onClick={() => { const n = new Set(done); n.has(i) ? n.delete(i) : n.add(i); setDone(n); }} className={`flex w-full items-center gap-2.5 rounded-xl border px-3 py-2 text-right transition ${on ? "border-emerald-300 bg-emerald-50" : "border-slate-200 bg-white hover:border-slate-300"}`}>
                <span className={`grid size-5 shrink-0 place-items-center rounded-md border-2 ${on ? "border-emerald-500 bg-emerald-500 text-white" : "border-slate-300"}`}>{on && <CheckCircle2 className="size-3.5" />}</span>
                <span className={`flex-1 text-[13px] font-bold ${on ? "text-slate-400 line-through" : "text-slate-700"}`}>{i + 1}. {c}</span>
              </button>
            ); })}</div>
            <div className="mt-3 flex flex-wrap gap-1.5 border-t border-slate-100 pt-3">{[["מרכז S/4", "/s4hana/"], ["מודל נתונים", "/sap-infrastructure/"], ["ניתוח השפעה", "/impact/"]].map(([l, h]) => <Link key={l} href={h} className="rounded-lg bg-slate-100 px-2.5 py-1 text-[11px] font-bold text-slate-600 transition hover:bg-slate-200">{l}</Link>)}</div>
          </Card>
          <RelatedCenters />
          <p className="pb-4 text-center text-[11px] text-slate-400">תוכן מבוסס SAP S/4HANA Migration Cockpit (LTMC/LTMOM) · trust: curated · פריטים לא ודאיים: needs-verification · לא להמציא — אמת מול גרסת היעד ו-SAP Notes.</p>
        </div>
      </div>
    </div>
  );
}
