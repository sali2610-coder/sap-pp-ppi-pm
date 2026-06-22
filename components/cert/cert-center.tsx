"use client";

import { useMemo, useState } from "react";
import { GraduationCap, Wrench, Factory, FlaskConical, Flame, Trophy, Play, Calendar, CheckCircle2, Star, Zap } from "lucide-react";
import { Exam } from "@/components/cert/exam";
import { pickExam, buildBank, LEVEL_HE, type CertModule, type Level } from "@/lib/cert/generate";
import { useCertState, masteryPct, dailyFresh } from "@/lib/cert/store";

const MODS: { id: CertModule; he: string; sub: string; accent: string; icon: typeof Wrench }[] = [
  { id: "PM", he: "תחזוקת מפעל", sub: "אובייקטים טכניים · צו אחזקה · סטטוס", accent: "#f97316", icon: Wrench },
  { id: "PP-PI", he: "ייצור תהליכי", sub: "אב חומר · מתכון · פקודת תהליך · אצווה", accent: "#6d28d9", icon: FlaskConical },
  { id: "PP", he: "תכנון ייצור", sub: "ליבת ייצור · BOM · Routing · מרכז עבודה", accent: "#7c3aed", icon: Factory },
];
const LEVELS: Level[] = [1, 2, 3, 4];

export function CertCenter() {
  const st = useCertState();
  const [run, setRun] = useState<{ module: CertModule; level: Level; mode: "exam" | "daily"; qs: ReturnType<typeof pickExam> } | null>(null);
  const [level, setLevel] = useState<Level>(2);
  const bankSizes = useMemo(() => ({ PM: buildBank("PM").length, "PP-PI": buildBank("PP-PI").length, PP: buildBank("PP").length }) as Record<CertModule, number>, []);

  const startExam = (module: CertModule) => setRun({ module, level, mode: "exam", qs: pickExam(module, level, 20) });
  const startDaily = () => {
    // 5 random questions across all modules, level ≤ current
    const all = [...pickExam("PM", level, 2), ...pickExam("PP-PI", level, 2), ...pickExam("PP", level, 1)];
    setRun({ module: "PP-PI", level, mode: "daily", qs: all.slice(0, 5) });
  };

  if (run) return <div className="py-2"><Exam questions={run.qs} module={run.module} level={run.level} mode={run.mode} onExit={() => setRun(null)} /></div>;

  const daily = st.daily;
  const canDaily = dailyFresh(daily);

  return (
    <div className="mx-auto max-w-5xl space-y-6" dir="rtl">
      {/* hero */}
      <header className="relative overflow-hidden rounded-3xl bg-gradient-to-l from-slate-900 via-slate-800 to-slate-900 p-7 text-white shadow-lg">
        <div className="pointer-events-none absolute -left-16 -top-16 size-56 rounded-full bg-brand/20 blur-3xl" />
        <div className="relative">
          <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-white/60"><GraduationCap className="size-4" />NEO Certification Center</div>
          <h1 className="mt-1 text-3xl font-extrabold sm:text-4xl">🎓 מרכז ההסמכה של NEO</h1>
          <p className="mt-1.5 max-w-2xl text-sm text-white/85">הסמכת ידע טכני ברמת יועץ SAP — מבחנים אקראיים מבוססי מאגר אמיתי (טבלאות, מפתחות, קשרים, S/4 ותקלות CBC). כל מבחן שונה. ציון מעבר: 80.</p>
          <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5 text-[13px] font-bold text-white/80">
            <span>{bankSizes.PM + bankSizes["PP-PI"] + bankSizes.PP}+ שאלות במאגר</span>
            <span>· 4 רמות קושי</span>
            <span>· 20 שאלות למבחן</span>
          </div>
        </div>
      </header>

      {/* daily challenge */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-amber-200 bg-gradient-to-l from-amber-50 to-white p-5 shadow-sm">
        <div className="flex items-center gap-4">
          <span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-amber-400 text-amber-950 shadow-sm"><Calendar className="size-7" /></span>
          <div>
            <div className="flex items-center gap-2 text-lg font-extrabold text-slate-900">אתגר יומי {daily.streak > 0 && <span className="inline-flex items-center gap-0.5 rounded-full bg-orange-100 px-2 py-0.5 text-[12px] font-extrabold text-orange-600"><Flame className="size-3.5" />{daily.streak}</span>}</div>
            <p className="text-sm text-slate-500">5 שאלות אקראיות · {canDaily ? "זמין היום" : "הושלם היום — חזור מחר"}{daily.bestStreak > 0 ? ` · שיא רצף: ${daily.bestStreak}` : ""}</p>
          </div>
        </div>
        <button onClick={startDaily} disabled={!canDaily} className="tap inline-flex items-center gap-1.5 rounded-xl bg-amber-500 px-5 py-2.5 text-sm font-extrabold text-white shadow-sm transition active:scale-95 disabled:opacity-50">
          {canDaily ? <><Zap className="size-4" />התחל אתגר</> : <><CheckCircle2 className="size-4" />הושלם</>}
        </button>
      </div>

      {/* difficulty */}
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="mb-2 text-[11px] font-bold uppercase tracking-wide text-slate-400">רמת קושי</div>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {LEVELS.map((l) => <button key={l} onClick={() => setLevel(l)} className={`rounded-xl border-2 px-3 py-2.5 text-center transition active:scale-95 ${level === l ? "border-brand bg-brand/5" : "border-slate-200 hover:border-slate-300"}`}>
            <div className={`text-lg font-extrabold ${level === l ? "text-brand" : "text-slate-700"}`}>{l}</div>
            <div className="text-[11px] font-bold text-slate-500">{LEVEL_HE[l]}</div>
          </button>)}
        </div>
      </div>

      {/* module cards */}
      <div className="grid gap-4 sm:grid-cols-3">
        {MODS.map((m) => {
          const s = st.mods[m.id]; const pct = masteryPct(s); const Icon = m.icon;
          return (
            <div key={m.id} className="group flex flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
              <div className="relative p-5 text-white" style={{ background: `linear-gradient(135deg, ${m.accent}, ${m.accent}cc)` }}>
                <div className="flex items-start justify-between">
                  <Icon className="size-8 opacity-90" />
                  {s?.passed && <span className="inline-flex items-center gap-1 rounded-full bg-white/25 px-2 py-0.5 text-[10px] font-extrabold ring-1 ring-white/30"><Trophy className="size-3" />מוסמך</span>}
                </div>
                <div className="mt-2 font-mono text-2xl font-extrabold">{m.id}</div>
                <div className="text-sm font-bold opacity-90">{m.he}</div>
              </div>
              <div className="flex flex-1 flex-col p-4">
                <p className="text-[12px] leading-snug text-slate-500">{m.sub}</p>
                <div className="mt-3">
                  <div className="mb-1 flex items-center justify-between text-[11px] font-bold text-slate-400"><span className="flex items-center gap-1"><Star className="size-3" />שליטה</span><span className="tabular-nums">{pct}%</span></div>
                  <div className="h-2 overflow-hidden rounded-full bg-slate-100"><span className="block h-full rounded-full transition-all" style={{ width: `${pct}%`, background: m.accent }} /></div>
                </div>
                <div className="mt-1.5 flex items-center justify-between text-[10px] font-bold text-slate-400">
                  <span>{bankSizes[m.id]} שאלות</span>
                  {s ? <span>שיא: {s.best} · {s.attempts} ניסיונות</span> : <span>טרם נבחנת</span>}
                </div>
                <button onClick={() => startExam(m.id)} className="tap mt-4 inline-flex items-center justify-center gap-1.5 rounded-xl py-2.5 text-sm font-extrabold text-white shadow-sm transition active:scale-95" style={{ background: m.accent }}><Play className="size-4" />התחל מבחן · {LEVEL_HE[level]}</button>
              </div>
            </div>
          );
        })}
      </div>
      <p className="text-center text-[11px] text-slate-400">כל השאלות נגזרות ממאגר ה-NEO המאומת (DDIC · ER · S/4 Simplification · תקלות CBC). אין שאלות גנריות.</p>
    </div>
  );
}
