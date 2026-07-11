"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { GraduationCap, Wrench, Factory, FlaskConical, ShieldCheck, Flame, Trophy, Play, Calendar, CheckCircle2, Star, Zap, Crown, BarChart3, Activity, Target, TrendingUp, AlertTriangle, Award, ArrowLeft, Medal } from "lucide-react";
import { Exam } from "@/components/cert/exam";
import { pickExam, buildBank, LEVEL_HE, type CertModule, type Level } from "@/lib/cert/generate";
import { useCertState, masteryPct, dailyFresh } from "@/lib/cert/store";

const MODS: { id: CertModule; he: string; sub: string; accent: string; icon: typeof Wrench }[] = [
  { id: "PM", he: "תחזוקת מפעל", sub: "אובייקטים טכניים · צו אחזקה · סטטוס", accent: "#f97316", icon: Wrench },
  { id: "PP-PI", he: "ייצור תהליכי", sub: "אב חומר · מתכון · פקודת תהליך · אצווה", accent: "#6d28d9", icon: FlaskConical },
  { id: "PP", he: "תכנון ייצור", sub: "ליבת ייצור · BOM · Routing · מרכז עבודה", accent: "#7c3aed", icon: Factory },
];
const LEVELS: Level[] = [1, 2, 3, 4];
const RANKS = [[0, "מתלמד"], [400, "יועץ זוטר"], [1000, "יועץ פונקציונלי"], [2000, "יועץ בכיר"], [3500, "ארכיטקט פתרון"]] as const;

export function CertCenter() {
  const st = useCertState();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const [run, setRun] = useState<{ module: CertModule; level: Level; mode: "exam" | "daily"; qs: ReturnType<typeof pickExam> } | null>(null);
  const [level, setLevel] = useState<Level>(2);
  const bankSizes = useMemo(() => ({ PM: buildBank("PM").length, "PP-PI": buildBank("PP-PI").length, PP: buildBank("PP").length }) as Record<CertModule, number>, []);

  const startExam = (module: CertModule) => setRun({ module, level, mode: "exam", qs: pickExam(module, level, 20) });
  const startDaily = () => setRun({ module: "PP-PI", level, mode: "daily", qs: [...pickExam("PM", level, 2), ...pickExam("PP-PI", level, 2), ...pickExam("PP", level, 1)].slice(0, 5) });

  if (run) return <div className="py-2"><Exam questions={run.qs} module={run.module} level={run.level} mode={run.mode} onExit={() => setRun(null)} /></div>;
  // first paint = static SSR; defer the localStorage-driven dashboard one tick to avoid hydration text mismatch
  if (!mounted) return <div className="mx-auto space-y-6" dir="rtl"><div className="h-48 animate-pulse rounded-[1.75rem] bg-surface-2" /><div className="grid-adaptive">{[0, 1, 2, 3].map((i) => <div key={i} className="h-64 animate-pulse rounded-3xl bg-surface-2" />)}</div></div>;

  // ── analytics from real store ──
  const mods = MODS.map((m) => ({ ...m, s: st.mods[m.id], mastery: masteryPct(st.mods[m.id]) }));
  const attempted = mods.filter((m) => m.s?.attempts);
  const totalQ = bankSizes.PM + bankSizes["PP-PI"] + bankSizes.PP;
  const certs = mods.filter((m) => m.s?.passed).length;
  const attempts = mods.reduce((n, m) => n + (m.s?.attempts || 0), 0);
  const avgScore = attempted.length ? Math.round(attempted.reduce((n, m) => n + (m.s?.best || 0), 0) / attempted.length) : 0;
  const overallMastery = Math.round(mods.reduce((n, m) => n + m.mastery, 0) / mods.length);
  const passRate = attempted.length ? Math.round((certs / attempted.length) * 100) : 0;
  const xp = mods.reduce((n, m) => n + (m.s?.correct || 0) * 10, 0) + certs * 200 + attempts * 20;
  const rank = [...RANKS].reverse().find(([x]) => xp >= x)![1];
  const nextRank = RANKS.find(([x]) => xp < x);
  const level1 = Math.floor(xp / 500) + 1;
  const weak = [...attempted].sort((a, b) => a.mastery - b.mastery).slice(0, 3);
  const daily = st.daily; const canDaily = dailyFresh(daily);
  const fmtAt = (at: number) => { const d = new Date(at); return `${String(d.getDate()).padStart(2, "0")}/${String(d.getMonth() + 1).padStart(2, "0")} ${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`; };

  const Tile = (icon: React.ReactNode, label: string, value: React.ReactNode, c: string) => (
    <div className="flex items-center gap-3 rounded-2xl border border-white/15 bg-surface/10 px-4 py-3 backdrop-blur-sm">
      <span className="grid size-10 shrink-0 place-items-center rounded-xl" style={{ background: c }}>{icon}</span>
      <div className="min-w-0"><div className="text-[10px] font-bold uppercase tracking-wide text-white/60">{label}</div><div className="text-xl font-extrabold tabular-nums leading-tight">{value}</div></div>
    </div>
  );

  return (
    <div className="mx-auto space-y-6" dir="rtl">
      {/* SECTION 1 — full-width hero */}
      <header className="relative overflow-hidden rounded-[1.75rem] bg-gradient-to-l from-slate-900 via-slate-800 to-slate-900 p-6 text-white shadow-xl sm:p-8">
        <div className="pointer-events-none absolute -left-24 -top-24 size-72 rounded-full bg-brand/25 blur-3xl" />
        <div className="relative flex flex-wrap items-start justify-between gap-6">
          <div className="min-w-0">
            <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.22em] text-white/60"><GraduationCap className="size-4" />NEO Certification Center</div>
            <h1 className="mt-1 text-3xl font-extrabold sm:text-4xl">🎓 מרכז ההסמכה</h1>
            <p className="mt-1.5 flex flex-wrap items-center gap-2 text-sm text-white/85">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-surface/15 px-2.5 py-0.5 font-extrabold ring-1 ring-white/25"><Crown className="size-3.5 text-amber-300" />{rank}</span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-surface/10 px-2.5 py-0.5"><Zap className="size-3.5" />Level {level1} · {xp} XP</span>
            </p>
          </div>
          <button onClick={startDaily} disabled={!canDaily} className="tap inline-flex items-center gap-2 rounded-2xl bg-amber-500 px-5 py-3 text-sm font-extrabold text-white shadow-lg transition active:scale-95 disabled:opacity-50">
            <Calendar className="size-5" />{canDaily ? "אתגר יומי" : "אתגר הושלם"}{daily.streak > 0 && <span className="inline-flex items-center gap-0.5 rounded-full bg-surface/25 px-1.5 text-[12px]"><Flame className="size-3.5" />{daily.streak}</span>}
          </button>
        </div>
        <div className="relative mt-5 grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-5">
          {Tile(<Target className="size-5" />, "סך שאלות", `${totalQ}`, "#0ea5e9")}
          {Tile(<Award className="size-5" />, "תעודות", `${certs}/${MODS.length}`, "#d97706")}
          {Tile(<Crown className="size-5" />, "דירוג", rank.split(" ").pop(), "#7c3aed")}
          {Tile(<Star className="size-5" />, "ציון ממוצע", avgScore || "—", "#16a34a")}
          {Tile(<TrendingUp className="size-5" />, "התקדמות", `${overallMastery}%`, "#d62027")}
        </div>
        {nextRank && <div className="relative mt-4"><div className="mb-1 flex justify-between text-[11px] font-bold text-white/60"><span>התקדמות לדרגה: {nextRank[1]}</span><span className="tabular-nums">{xp}/{nextRank[0]} XP</span></div><div className="h-2 overflow-hidden rounded-full bg-surface/15"><span className="block h-full rounded-full bg-gradient-to-l from-amber-400 to-amber-300 transition-all duration-700" style={{ width: `${Math.min(100, (xp / nextRank[0]) * 100)}%` }} /></div></div>}
      </header>

      {/* difficulty */}
      <div className="flex flex-wrap items-center gap-2 rounded-2xl border border-hairline bg-surface p-3 shadow-sm">
        <span className="px-1 text-[11px] font-bold uppercase tracking-wide text-ink-3">רמת קושי</span>
        {LEVELS.map((l) => <button key={l} onClick={() => setLevel(l)} className={`rounded-xl border-2 px-3 py-1.5 text-sm font-bold transition active:scale-95 ${level === l ? "border-brand bg-brand/5 text-brand" : "border-hairline text-ink-3 hover:border-hairline"}`}>{l} · {LEVEL_HE[l]}</button>)}
      </div>

      {/* SECTION 2 — certification grid (4 equal cards) */}
      <div className="grid-adaptive">
        {mods.map((m) => { const Icon = m.icon;
          return (
            <div key={m.id} className="group flex flex-col overflow-hidden rounded-3xl border border-hairline bg-surface shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
              <div className="relative p-5 text-white" style={{ background: `linear-gradient(135deg, ${m.accent}, ${m.accent}cc)` }}>
                <div className="flex items-start justify-between"><Icon className="size-8 opacity-90" />{m.s?.passed && <span className="inline-flex items-center gap-1 rounded-full bg-surface/25 px-2 py-0.5 text-[10px] font-extrabold ring-1 ring-white/30"><Trophy className="size-3" />מוסמך</span>}</div>
                <div className="mt-2 font-mono text-2xl font-extrabold">{m.id}</div><div className="text-sm font-bold opacity-90">{m.he}</div>
              </div>
              <div className="flex flex-1 flex-col p-4">
                <p className="min-h-[2.5em] text-[12px] leading-snug text-ink-3">{m.sub}</p>
                <div className="mt-3"><div className="mb-1 flex items-center justify-between text-[11px] font-bold text-ink-3"><span className="flex items-center gap-1"><Star className="size-3" />שליטה</span><span className="tabular-nums">{m.mastery}%</span></div><div className="h-2 overflow-hidden rounded-full bg-surface-2"><span className="block h-full rounded-full transition-all" style={{ width: `${m.mastery}%`, background: m.accent }} /></div></div>
                <div className="mt-1.5 flex items-center justify-between text-[10px] font-bold text-ink-3"><span>{bankSizes[m.id]} שאלות</span>{m.s ? <span>שיא {m.s.best} · {m.s.attempts} ניס'</span> : <span>טרם נבחנת</span>}</div>
                <button onClick={() => startExam(m.id)} className="tap mt-4 inline-flex items-center justify-center gap-1.5 rounded-xl py-2.5 text-sm font-extrabold text-white shadow-sm transition active:scale-95" style={{ background: m.accent }}><Play className="size-4" />התחל מבחן</button>
              </div>
            </div>
          );
        })}
        {/* QA — learning track (no table-derived bank yet; honest) */}
        <div className="flex flex-col overflow-hidden rounded-3xl border border-hairline bg-surface shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
          <div className="relative p-5 text-white" style={{ background: "linear-gradient(135deg,#0891b2,#0891b2cc)" }}>
            <div className="flex items-start justify-between"><ShieldCheck className="size-8 opacity-90" /><span className="rounded-full bg-surface/25 px-2 py-0.5 text-[10px] font-extrabold ring-1 ring-white/30">מסלול</span></div>
            <div className="mt-2 font-mono text-2xl font-extrabold">QA</div><div className="text-sm font-bold opacity-90">בקרת איכות ובדיקות</div>
          </div>
          <div className="flex flex-1 flex-col p-4">
            <p className="min-h-[2.5em] text-[12px] leading-snug text-ink-3">יסודות בדיקה · UAT · אינטגרציה · ניהול ליקויים. ערכת מבחן QA בפיתוח.</p>
            <div className="mt-3 rounded-xl bg-cyan-50 px-3 py-2 text-[12px] font-bold text-cyan-700">מבוסס מסלולי למידה (לא נגזר מטבלאות)</div>
            <Link href="/learn/qa-fundamentals/" className="tap mt-4 inline-flex items-center justify-center gap-1.5 rounded-xl bg-cyan-600 py-2.5 text-sm font-extrabold text-white shadow-sm transition active:scale-95"><GraduationCap className="size-4" />מסלול QA<ArrowLeft className="size-4" /></Link>
          </div>
        </div>
      </div>

      {/* SECTION 3 — analytics */}
      <section className="grid-adaptive">
        <div className="rounded-3xl border border-hairline bg-surface p-5 shadow-sm">
          <h3 className="mb-3 flex items-center gap-2 text-base font-extrabold text-ink-1"><BarChart3 className="size-4 text-brand" />מדדי ביצוע</h3>
          <div className="space-y-3">
            {[["שיעור הצלחה", `${passRate}%`, "#16a34a"], ["ניסיונות מבחן", attempts, "#0ea5e9"], ["ציון ממוצע", avgScore || "—", "#d97706"]].map(([l, v, c]) => (
              <div key={l as string} className="flex items-center justify-between rounded-xl bg-surface-2 px-3 py-2"><span className="text-[13px] font-bold text-ink-2">{l}</span><span className="text-lg font-extrabold tabular-nums" style={{ color: c as string }}>{v}</span></div>
            ))}
          </div>
        </div>
        <div className="rounded-3xl border border-hairline bg-surface p-5 shadow-sm">
          <h3 className="mb-3 flex items-center gap-2 text-base font-extrabold text-ink-1"><Activity className="size-4 text-brand" />מפת ידע</h3>
          <div className="space-y-2.5">
            {mods.map((m) => <div key={m.id} className="flex items-center gap-2"><span className="w-14 shrink-0 font-mono text-[12px] font-bold text-ink-2">{m.id}</span><div className="h-3 flex-1 overflow-hidden rounded-full bg-surface-2"><span className="block h-full rounded-full transition-all" style={{ width: `${m.mastery}%`, background: m.mastery >= 80 ? "#16a34a" : m.mastery >= 40 ? "#d97706" : "#dc2626" }} /></div><span className="w-9 shrink-0 text-left text-[12px] font-extrabold tabular-nums text-ink-3">{m.mastery}%</span></div>)}
          </div>
          <div className="mt-3 border-t border-hairline pt-3"><div className="mb-1.5 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wide text-amber-600"><AlertTriangle className="size-3.5" />תחומים חלשים</div>{weak.length ? <div className="flex flex-wrap gap-1.5">{weak.map((m) => <span key={m.id} className="rounded-lg bg-amber-50 px-2 py-0.5 text-[12px] font-bold text-amber-700 ring-1 ring-amber-200">{m.id} · {m.mastery}%</span>)}</div> : <p className="text-[12px] text-ink-3">גש למבחן כדי לזהות תחומים לחיזוק.</p>}</div>
        </div>
        <div className="rounded-3xl border border-hairline bg-surface p-5 shadow-sm">
          <h3 className="mb-3 flex items-center gap-2 text-base font-extrabold text-ink-1"><Trophy className="size-4 text-brand" />שיאים אישיים</h3>
          <div className="space-y-2.5">
            {mods.map((m) => <div key={m.id} className="flex items-center justify-between rounded-xl bg-surface-2 px-3 py-2"><span className="flex items-center gap-2 text-[13px] font-bold text-ink-2"><span className="size-2.5 rounded-full" style={{ background: m.accent }} />{m.id}</span><span className="flex items-center gap-1 text-lg font-extrabold tabular-nums" style={{ color: m.accent }}>{m.s?.best || 0}{m.s?.passed && <Medal className="size-4 text-amber-500" />}</span></div>)}
          </div>
        </div>
      </section>

      {/* SECTION 4 — recent activity */}
      <section className="rounded-3xl border border-hairline bg-surface p-5 shadow-sm">
        <h3 className="mb-3 flex items-center gap-2 text-base font-extrabold text-ink-1"><Activity className="size-4 text-brand" />פעילות אחרונה</h3>
        {st.log.length ? (
          <div className="grid gap-2 md:grid-cols-2">
            {st.log.map((e, i) => (
              <div key={i} className="flex items-center gap-3 rounded-xl border border-hairline bg-surface-2/70 px-3 py-2">
                <span className={`grid size-9 shrink-0 place-items-center rounded-lg text-white ${e.pass ? "bg-emerald-500" : "bg-slate-400"}`}>{e.pass ? <CheckCircle2 className="size-5" /> : <Trophy className="size-5" />}</span>
                <div className="min-w-0 flex-1"><div className="text-[13px] font-extrabold text-ink-1">{e.mode === "daily" ? "אתגר יומי" : `מבחן ${e.m}`} · {e.score}</div><div className="text-[11px] font-bold text-ink-3">{e.pass ? "עבר ✓" : "לא עבר"} · {fmtAt(e.at)}</div></div>
              </div>
            ))}
          </div>
        ) : <p className="rounded-xl bg-surface-2 px-4 py-8 text-center text-sm text-ink-3">עדיין אין פעילות — התחל מבחן כדי לראות היסטוריה, הישגים ותגים.</p>}
      </section>
      <p className="text-center text-[11px] text-ink-3">כל השאלות נגזרות ממאגר NEO המאומת (DDIC · ER · S/4 · תקלות הארגון). אין שאלות גנריות.</p>
    </div>
  );
}
