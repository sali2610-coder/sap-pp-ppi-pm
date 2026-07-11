"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Check, GraduationCap, MapPin, BookOpen, Workflow, RotateCcw, CheckCircle2, Lightbulb, Briefcase, Boxes, MessageSquare, ArrowRightLeft, Network, Flame, Clock, Layers, Target, Menu, X, Sparkles } from "lucide-react";
import { LEARN_PATHS, type LearnStep } from "@/data/learn/paths";
import { IMPORTANCE_HE, IMPORTANCE_COLOR, knowledgeFor } from "@/lib/knowledge";
import { interviewFor } from "@/data/knowledge/interview";
import { INCIDENTS } from "@/data/troubleshooting";
import { objectIntel } from "@/lib/data";
import { s4For, RISK_HE, RISK_COLOR } from "@/lib/s4";
import { useDoneSet, markDone, resetPath, pathState, bumpStreak } from "@/lib/learn-store";

const STORY: Record<string, string> = { pm: "/story/pm-maintenance/", "pp-pi": "/story/pppi-process-order/" };
const audienceOf = (id: string): string =>
  id.startsWith("pm") ? "תחזוקה · יועץ PM · Support" :
  id.startsWith("pp") ? "ייצור · יועץ PP-PI · מתכנן" :
  id.startsWith("qa") ? "QA · בודק · יועץ הטמעה" :
  "יועץ חדש · כל התפקידים";

/* color-coded interactive learning block */
function Block({ icon, label, color, children, dir: d }: { icon: React.ReactNode; label: string; color: string; children: React.ReactNode; dir?: string }) {
  return (
    <section className="overflow-hidden rounded-2xl border border-hairline bg-surface shadow-sm" style={{ borderInlineStartColor: color, borderInlineStartWidth: 4 }} dir={d}>
      <div className="flex items-center gap-2 px-4 pt-3.5">
        <span className="grid size-6 place-items-center rounded-lg text-white" style={{ background: color }}>{icon}</span>
        <h3 className="text-[12px] font-extrabold uppercase tracking-wide" style={{ color }}>{label}</h3>
      </div>
      <div className="px-4 pb-4 pt-2 text-[14px] leading-relaxed text-ink-2">{children}</div>
    </section>
  );
}

function Lesson({ s, total, accent, isDone, onToggle, onPrev, onNext, hasPrev, hasNext }: {
  s: LearnStep; total: number; accent: string; isDone: boolean;
  onToggle: () => void; onPrev: () => void; onNext: () => void; hasPrev: boolean; hasNext: boolean;
}) {
  const intel = s.object ? objectIntel(s.object) : null;
  const k = s.object ? knowledgeFor(s.object) : undefined;
  const iqs = s.object ? interviewFor(s.object) : [];
  const inc = s.object ? INCIDENTS.filter((i) => i.tables.includes(s.object!)) : [];
  const scen = inc.find((i) => i.scenario)?.scenario;
  const s4 = s.object && intel ? s4For(s.object, intel.table.s4Note, intel.table.s4AltTable) : null;
  const related = (intel?.related || []).slice(0, 10);
  const ic = IMPORTANCE_COLOR[s.importance];
  const iq = iqs[0];

  return (
    <article className="space-y-4" style={{ animation: "fadeUp .25s ease both" }}>
      {/* lesson header */}
      <header className="rounded-3xl border border-hairline bg-surface p-5 shadow-sm sm:p-7">
        <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.15em] text-ink-3">
          <Sparkles className="size-3.5" style={{ color: accent }} />יחידה {s.n} מתוך {total}
        </div>
        <div className="mt-1.5 flex flex-wrap items-start justify-between gap-3">
          <div className="min-w-0">
            <h1 className="text-2xl font-extrabold leading-tight text-ink-1 sm:text-3xl">{s.titleHe}</h1>
            <div className="mt-2 flex flex-wrap items-center gap-2">
              {s.object && <span className="tech rounded-md bg-slate-900 px-2 py-0.5 font-mono text-[12px] font-bold text-white" dir="ltr">{s.object}</span>}
              <span className="rounded-full px-2 py-0.5 text-[10px] font-bold" style={{ background: ic + "1a", color: ic }}>{IMPORTANCE_HE[s.importance]}</span>
              {intel && <span className="rounded-md px-2 py-0.5 text-[10px] font-bold text-white" style={{ background: accent }}>{intel.table.module}</span>}
            </div>
          </div>
          <button onClick={onToggle} className={`tap inline-flex shrink-0 items-center gap-1.5 rounded-xl px-4 py-2.5 text-sm font-bold shadow-sm transition active:scale-95 ${isDone ? "text-white" : "border border-hairline bg-surface text-ink-2 hover:border-brand/40 hover:text-brand"}`} style={isDone ? { background: accent } : undefined}>
            {isDone ? <><Check className="size-4" />הושלם</> : <>סמן כהושלם</>}
          </button>
        </div>
      </header>

      {/* interactive blocks */}
      <div className="grid gap-4 lg:grid-cols-2">
        <Block icon={<Lightbulb className="size-3.5" />} label="עיקר היחידה" color="#d97706">{s.whyHe}</Block>
        {k && <Block icon={<Briefcase className="size-3.5" />} label="הערת יועץ — מה לזכור" color="#0f172a">
          <p>{k.role}</p>{k.whenUsed && <p className="mt-1.5 text-ink-3"><span className="font-bold text-ink-2">מתי: </span>{k.whenUsed}</p>}
        </Block>}
        {scen && <Block icon={<Boxes className="size-3.5" />} label="המציאות בארגון" color="#16a34a">{scen}</Block>}
        {iq && <Block icon={<MessageSquare className="size-3.5" />} label="שאלת ראיון נפוצה" color="#7c3aed">
          <p className="font-bold text-ink-1">{iq.q}</p>{iq.aHe && <p className="mt-1.5 text-ink-2">{iq.aHe}</p>}
        </Block>}
        {s4 && (s4.impact || s4.impacted) && <Block icon={<ArrowRightLeft className="size-3.5" />} label="ECC מול S/4HANA" color="#ea580c">
          <div className="mb-1 inline-flex items-center gap-1.5"><span className="rounded-full px-1.5 py-0.5 text-[9px] font-bold text-white" style={{ background: RISK_COLOR[s4.risk] }}>{RISK_HE[s4.risk]}</span></div>
          <p>{k?.s4 || s4.impact?.changed || "אין שינוי מהותי ידוע — נדרש אימות מול Simplification List."}</p>
        </Block>}
      </div>

      {/* related objects */}
      {related.length > 0 && (
        <Block icon={<Network className="size-3.5" />} label="אובייקטים קשורים · לחיצה לפתיחה" color="#2563eb" dir="rtl">
          <div className="flex flex-wrap gap-1.5" dir="ltr">
            {related.map((r) => <Link key={r} href={`/object/${encodeURIComponent(r)}/`} className="tech rounded-lg border border-hairline bg-surface-2 px-2 py-1 font-mono text-[12px] font-bold text-ink-2 transition hover:border-brand/50 hover:bg-surface hover:text-brand">{r}</Link>)}
          </div>
        </Block>
      )}

      {/* primary action / feature link */}
      <div className="flex flex-wrap gap-2">
        {s.object && <Link href={`/object/${encodeURIComponent(s.object)}/`} className="tap inline-flex items-center gap-1.5 rounded-xl border border-hairline bg-surface px-4 py-2.5 text-sm font-bold text-ink-2 transition hover:border-brand/40 hover:text-brand"><BookOpen className="size-4" />דף הידע המלא של {s.object}<ArrowLeft className="size-3.5" /></Link>}
        {s.href && <Link href={s.href} className="tap inline-flex items-center gap-1.5 rounded-xl px-4 py-2.5 text-sm font-bold text-white shadow-sm transition active:scale-95" style={{ background: accent }}><Workflow className="size-4" />{s.linkLabel || "פתח"}<ArrowLeft className="size-3.5" /></Link>}
      </div>

      {/* lesson flow nav */}
      <nav className="flex items-center justify-between gap-2 border-t border-hairline pt-4">
        <button onClick={onPrev} disabled={!hasPrev} className="tap inline-flex items-center gap-1.5 rounded-xl border border-hairline bg-surface px-4 py-2.5 text-sm font-bold text-ink-2 transition enabled:hover:border-brand/40 enabled:hover:text-brand disabled:opacity-40"><ArrowRight className="size-4" />היחידה הקודמת</button>
        {hasNext
          ? <button onClick={() => { if (!isDone) onToggle(); onNext(); }} className="tap inline-flex items-center gap-1.5 rounded-xl px-5 py-2.5 text-sm font-extrabold text-white shadow-sm transition active:scale-95" style={{ background: accent }}>סמן והמשך<ArrowLeft className="size-4" /></button>
          : <button onClick={() => { if (!isDone) onToggle(); }} className="tap inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-extrabold text-white shadow-sm transition active:scale-95"><CheckCircle2 className="size-4" />סיים מסלול</button>}
      </nav>
    </article>
  );
}

export function LearnPathView({ module }: { module: string }) {
  const p = LEARN_PATHS[module];
  const done = useDoneSet(module);
  const [sel, setSel] = useState(0);
  const [mapOpen, setMapOpen] = useState(false);
  const [streak, setStreak] = useState(0);
  const celebrated = useRef(false);
  const initSel = useRef(false);

  const ids = useMemo(() => (p ? p.steps.map((s) => s.id) : []), [p]);
  const st = pathState(done, ids);

  useEffect(() => { setStreak(bumpStreak()); }, []);
  // open at you-are-here on first load
  useEffect(() => { if (p && !initSel.current) { initSel.current = true; setSel(st.complete ? 0 : st.current); } }, [p, st.complete, st.current]);
  useEffect(() => {
    const pp = LEARN_PATHS[module]; if (!pp) return;
    const s = pathState(done, pp.steps.map((x) => x.id));
    if (s.complete && s.total > 0 && !celebrated.current) { celebrated.current = true; window.dispatchEvent(new CustomEvent("neo:wow", { detail: { title: "סיימת מסלול! 🎓", sub: pp.he } })); }
    if (!s.complete) celebrated.current = false;
  }, [done, module]);

  if (!p) return <p className="p-8 text-center text-ink-3">מסלול לא נמצא.</p>;
  const accent = p.accent;
  const storyHref = STORY[module] || null;
  const objCount = p.steps.filter((s) => s.object).length;
  const cur = p.steps[Math.min(sel, p.steps.length - 1)];
  const remaining = st.total - st.doneCount;
  const go = (i: number) => { setSel(Math.max(0, Math.min(p.steps.length - 1, i))); setMapOpen(false); if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" }); };

  /* ── course map (left) ── */
  const CourseMap = (
    <div className="space-y-1">
      <Link href="/learn/" className="mb-2 inline-flex items-center gap-1.5 text-[13px] font-bold text-ink-3 transition hover:text-brand"><ArrowRight className="size-4" />כל המסלולים</Link>
      <div className="px-1 pb-1 text-[11px] font-bold uppercase tracking-wide text-ink-3">תוכן הקורס · {st.total} יחידות</div>
      {p.steps.map((s, i) => {
        const d = done.has(s.id); const on = i === sel; const here = i === st.current && !st.complete;
        return (
          <button key={s.id} onClick={() => go(i)} className={`flex w-full items-center gap-2.5 rounded-xl px-2.5 py-2 text-right transition ${on ? "bg-surface shadow-sm ring-1 ring-hairline" : "hover:bg-surface/70"}`}>
            <span className={`grid size-7 shrink-0 place-items-center rounded-full border-2 text-[12px] font-extrabold transition ${d ? "text-white" : "text-ink-3"}`} style={{ background: d ? accent : "#fff", borderColor: d ? accent : "#cbd5e1" }}>{d ? <Check className="size-3.5" /> : s.n}</span>
            <span className="min-w-0 flex-1">
              <span className={`block truncate text-[13px] font-bold ${on ? "text-ink-1" : "text-ink-2"}`}>{s.titleHe}</span>
              {s.object && <span className="tech block font-mono text-[10px] text-ink-3" dir="ltr">{s.object}</span>}
            </span>
            {here && <MapPin className="size-3.5 shrink-0" style={{ color: accent }} />}
          </button>
        );
      })}
    </div>
  );

  /* ── dashboard (right) ── */
  const Stat = ({ icon, label, value, c }: { icon: React.ReactNode; label: string; value: React.ReactNode; c?: string }) => (
    <div className="flex items-center gap-2.5 rounded-xl border border-hairline bg-surface px-3 py-2">
      <span className="grid size-8 shrink-0 place-items-center rounded-lg text-white" style={{ background: c || accent }}>{icon}</span>
      <div className="min-w-0"><div className="text-[10px] font-bold uppercase tracking-wide text-ink-3">{label}</div><div className="text-sm font-extrabold text-ink-1">{value}</div></div>
    </div>
  );
  const Dashboard = (
    <div className="space-y-2.5">
      <div className="rounded-2xl border border-hairline bg-surface p-4 text-center shadow-sm">
        <div className="text-[11px] font-bold uppercase tracking-wide text-ink-3">השלמת הקורס</div>
        <div className="my-1 text-4xl font-extrabold tabular-nums" style={{ color: accent }}>{st.pct}%</div>
        <div className="h-2 overflow-hidden rounded-full bg-surface-2"><span className="block h-full rounded-full transition-all duration-500" style={{ width: `${st.pct}%`, background: accent }} /></div>
        {!st.complete && <button onClick={() => go(st.current)} className="tap mt-3 inline-flex w-full items-center justify-center gap-1.5 rounded-xl px-3 py-2 text-sm font-bold text-white shadow-sm" style={{ background: accent }}><MapPin className="size-4" />המשך — יחידה {st.current + 1}</button>}
      </div>
      <Stat icon={<CheckCircle2 className="size-4" />} label="הושלמו" value={`${st.doneCount} יחידות`} c="#16a34a" />
      <Stat icon={<Target className="size-4" />} label="נותרו" value={`${remaining} יחידות`} c="#64748b" />
      <Stat icon={<Clock className="size-4" />} label="זמן משוער" value={p.durationHe || "—"} />
      <Stat icon={<Flame className="size-4" />} label="רצף למידה" value={`${streak || 1} ${streak === 1 ? "יום" : "ימים"}`} c="#ea580c" />
      {storyHref && <Link href={storyHref} className="tap flex items-center justify-center gap-1.5 rounded-xl border border-hairline bg-surface px-3 py-2.5 text-sm font-bold text-ink-2 transition hover:border-brand/40 hover:text-brand"><Workflow className="size-4" />סיור מודרך בתהליך</Link>}
      {st.doneCount > 0 && <button onClick={() => resetPath(module)} className="flex w-full items-center justify-center gap-1.5 py-1 text-xs font-bold text-ink-3 transition hover:text-brand"><RotateCcw className="size-3.5" />אפס התקדמות</button>}
    </div>
  );

  return (
    <div className="mx-auto" dir="rtl">
      {/* course hero */}
      <header className="relative overflow-hidden rounded-3xl border p-6 shadow-sm sm:p-8" style={{ borderColor: accent + "33", background: `linear-gradient(135deg, ${accent}14, #fff 60%)` }}>
        <div className="pointer-events-none absolute -left-12 -top-12 size-48 rounded-full opacity-10 blur-3xl" style={{ background: accent }} />
        <div className="relative flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-ink-3"><GraduationCap className="size-4" style={{ color: accent }} />NEO Academy</div>
            <h1 className="mt-1 text-3xl font-extrabold text-ink-1 sm:text-4xl">{p.he}</h1>
            <p className="mt-1 max-w-xl text-sm text-ink-3">{p.sub}</p>
            <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-1.5 text-[13px] font-bold text-ink-2">
              <span className="flex items-center gap-1.5"><Layers className="size-4 text-ink-3" />{st.total} יחידות לימוד</span>
              <span className="flex items-center gap-1.5"><Boxes className="size-4 text-ink-3" />{objCount} אובייקטים</span>
              <span className="flex items-center gap-1.5"><Clock className="size-4 text-ink-3" />{p.durationHe}</span>
              {p.level && <span className="rounded-full px-2.5 py-0.5 text-[11px] font-extrabold text-white" style={{ background: accent }}>{p.level}</span>}
            </div>
            <div className="mt-2 flex items-center gap-1.5 text-[12px] text-ink-3"><Target className="size-3.5" /><span className="font-bold">מתאים ל:</span> {audienceOf(module)}</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-extrabold tabular-nums" style={{ color: accent }}>{st.pct}%</div>
            <div className="text-[10px] font-bold uppercase tracking-wide text-ink-3">{st.doneCount}/{st.total} הושלמו</div>
          </div>
        </div>
        {p.note && <p className="relative mt-3 inline-block rounded-lg bg-amber-50 px-2.5 py-1 text-[11px] font-bold text-amber-800">{p.note}</p>}
      </header>

      {/* mobile control strip */}
      <div className="mt-3 flex items-center gap-2 lg:hidden">
        <button onClick={() => setMapOpen(true)} className="tap inline-flex items-center gap-1.5 rounded-xl border border-hairline bg-surface px-3 py-2 text-sm font-bold text-ink-2"><Menu className="size-4" />תוכן הקורס</button>
        <div className="flex flex-1 items-center gap-2 rounded-xl border border-hairline bg-surface px-3 py-2">
          <div className="h-2 flex-1 overflow-hidden rounded-full bg-surface-2"><span className="block h-full rounded-full" style={{ width: `${st.pct}%`, background: accent }} /></div>
          <span className="text-xs font-extrabold tabular-nums" style={{ color: accent }}>{st.pct}%</span>
          <span className="flex items-center gap-0.5 text-xs font-bold text-orange-500"><Flame className="size-3.5" />{streak || 1}</span>
        </div>
      </div>

      {/* 3-column academy */}
      <div className="mt-4 grid gap-5 lg:grid-cols-[252px_minmax(0,1fr)_288px]">
        <aside className="hidden lg:block"><div className="sticky top-4 max-h-[calc(100vh-2rem)] overflow-y-auto rounded-2xl border border-hairline bg-surface-2/60 p-2.5">{CourseMap}</div></aside>
        <main className="min-w-0">
          <Lesson s={cur} total={st.total} accent={accent} isDone={done.has(cur.id)}
            onToggle={() => markDone(module, cur.id, !done.has(cur.id))} onPrev={() => go(sel - 1)} onNext={() => go(sel + 1)}
            hasPrev={sel > 0} hasNext={sel < p.steps.length - 1} />
        </main>
        <aside className="hidden lg:block"><div className="sticky top-4">{Dashboard}</div></aside>
      </div>

      {/* mobile course-map drawer */}
      {mapOpen && (
        <div className="fixed inset-0 z-[60] lg:hidden" dir="rtl">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setMapOpen(false)} style={{ animation: "fadeIn .2s ease both" }} />
          <div className="absolute inset-y-0 end-0 flex w-[86%] max-w-sm flex-col bg-surface shadow-2xl" style={{ animation: "drawerIn .3s cubic-bezier(.32,.72,0,1) both" }}>
            <div className="flex items-center justify-between border-b border-hairline px-4 py-3">
              <span className="font-extrabold text-ink-1">תוכן הקורס</span>
              <button onClick={() => setMapOpen(false)} className="tap grid size-8 place-items-center rounded-lg text-ink-3 hover:bg-surface-2"><X className="size-5" /></button>
            </div>
            <div className="min-h-0 flex-1 overflow-y-auto p-3">{CourseMap}</div>
            <div className="border-t border-hairline p-3">{Dashboard}</div>
          </div>
        </div>
      )}
    </div>
  );
}
