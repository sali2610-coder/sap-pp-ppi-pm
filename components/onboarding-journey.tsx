"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Sparkles, Compass, Database, Workflow, BrainCircuit, Award, BadgeCheck, Lock, Check, ArrowLeft, Clock, Trophy, Flame, GraduationCap, Star, RotateCcw, Target, Network, MessageSquare, Zap } from "lucide-react";
import { useJourney, markStage, resetJourney } from "@/lib/onboard-store";
import { useCertState, masteryPct } from "@/lib/cert/store";
import { getRecentObjects } from "@/lib/prefs";

type Stage = { id: string; n: number; icon: typeof Compass; title: string; desc: string; action: string; href?: string; mentor?: boolean; final?: boolean; mins: number };
const STAGES: Stage[] = [
  { id: "welcome", n: 1, icon: Sparkles, title: "ברוך הבא ל-NEO", desc: "סיור מהיר: מודל נתונים, אקדמיה, מנטור, תקלות והסמכה — הכל במקום אחד.", action: "התחל את המסע", mins: 5 },
  { id: "track", n: 2, icon: Compass, title: "בחירת התמחות", desc: "PM (אחזקת מפעל) או PP-PI (ייצור תהליכי) — בחר את מסלול הליבה שלך.", action: "בחר מסלול", href: "/learn/", mins: 10 },
  { id: "model", n: 3, icon: Database, title: "היכרות עם מודל הנתונים", desc: "טבלאות, מפתחות, קשרים והשפעת S/4 — בגרף אינטראקטיבי.", action: "פתח מודל נתונים", href: "/sap-infrastructure/", mins: 20 },
  { id: "process", n: 4, icon: Workflow, title: "הבנת התהליך העסקי", desc: "סיור מודרך בתהליך אחזקה/ייצור מקצה לקצה, בהקשר ייצור.", action: "פתח סיור מודרך", href: "/story/", mins: 25 },
  { id: "mentor", n: 5, icon: BrainCircuit, title: "עבודה עם המנטור", desc: "שאל על כל אובייקט, תסמין או תהליך — תשובות מבוססות מאגר בלבד.", action: "שאל את המנטור", mentor: true, mins: 10 },
  { id: "exam", n: 6, icon: Award, title: "מבחן הסמכה", desc: "מבחן ידע טכני אקראי — 20 שאלות, ציון מעבר 80.", action: "גש למבחן", href: "/certification/", mins: 30 },
  { id: "badge", n: 7, icon: BadgeCheck, title: "קבלת תג יועץ", desc: "סיימת את המסע — קבל את תג היועץ המוסמך של NEO.", action: "קבל תג", final: true, mins: 2 },
];
const TOTAL = STAGES.length;

function Confetti() {
  const pieces = useMemo(() => Array.from({ length: 80 }, (_, i) => ({ left: (i * 41) % 100, delay: (i % 10) * 0.1, dur: 2.3 + (i % 6) * 0.25, c: ["#d62027", "#f97316", "#6d28d9", "#16a34a", "#0891b2", "#eab308"][i % 6], rot: (i * 53) % 360, w: 6 + (i % 4) * 2 })), []);
  return <div className="pointer-events-none fixed inset-0 z-[80] overflow-hidden" aria-hidden>{pieces.map((p, i) => <span key={i} className="absolute top-[-5%] rounded-[2px]" style={{ left: `${p.left}%`, width: p.w, height: p.w * 1.6, background: p.c, transform: `rotate(${p.rot}deg)`, animation: `confettiFall ${p.dur}s cubic-bezier(.2,.6,.4,1) ${p.delay}s forwards` }} />)}</div>;
}

const RED = "#d62027", GREEN = "#16a34a", GRAY = "#94a3b8";

export function OnboardingJourney() {
  const done = useJourney();
  const cert = useCertState();
  const [recent, setRecent] = useState(0);
  const [mentorAsked, setMentorAsked] = useState(false);
  const [celebrate, setCelebrate] = useState(false);

  useEffect(() => {
    setRecent(getRecentObjects().length);
    try { const r = JSON.parse(localStorage.getItem("neo:mentor:recent") || "[]"); setMentorAsked(Array.isArray(r) && r.length > 0); } catch { /* noop */ }
  }, [done]);

  // auto-complete the exam stage once the consultant actually sat a certification exam
  useEffect(() => {
    const attempted = Object.values(cert.mods).some((m) => m.attempts > 0);
    if (attempted && !done.includes("exam")) markStage("exam");
  }, [cert, done]);

  const doneSet = new Set(done);
  const doneCount = STAGES.filter((s) => doneSet.has(s.id)).length;
  const pct = Math.round((doneCount / TOTAL) * 100);
  const currentIdx = STAGES.findIndex((s) => !doneSet.has(s.id));
  const current = currentIdx === -1 ? TOTAL - 1 : currentIdx;
  const complete = doneCount === TOTAL;
  const unlocked = (i: number) => i === 0 || STAGES.slice(0, i).every((s) => doneSet.has(s.id));
  const totalMins = STAGES.reduce((n, s) => n + s.mins, 0);
  const remainMins = STAGES.filter((s) => !doneSet.has(s.id)).reduce((n, s) => n + s.mins, 0);
  const certPassed = Object.values(cert.mods).some((m) => m.passed);
  const certAttempts = Object.values(cert.mods).some((m) => m.attempts > 0);
  const score = Math.max(0, ...Object.values(cert.mods).map((m) => m.best), ...Object.values(cert.mods).map((m) => masteryPct(m)));
  const tier = complete ? "יועץ SAP מוסמך" : pct >= 60 ? "יועץ בהכשרה" : "יועץ זוטר · בתחילת הדרך";

  const go = (s: Stage) => { markStage(s.id); if (s.final && doneCount + 1 >= TOTAL) { setCelebrate(true); setTimeout(() => setCelebrate(false), 4000); } };

  const ACH = [
    { id: "login", he: "כניסה ראשונה", icon: Zap, earned: true },
    { id: "model", he: "מודל נתונים ראשון", icon: Network, earned: doneSet.has("model") || recent > 0 },
    { id: "process", he: "ניתוח תהליך ראשון", icon: Workflow, earned: doneSet.has("process") },
    { id: "mentor", he: "שאלת מנטור ראשונה", icon: MessageSquare, earned: doneSet.has("mentor") || mentorAsked },
    { id: "quiz", he: "מבחן ראשון", icon: Trophy, earned: doneSet.has("exam") || certAttempts },
    { id: "cert", he: "יועץ מוסמך", icon: BadgeCheck, earned: complete || certPassed },
  ];
  const earnedN = ACH.filter((a) => a.earned).length;

  return (
    <div className="mx-auto max-w-[1600px] space-y-7" dir="rtl">
      {celebrate && <Confetti />}

      {/* hero */}
      <header className="relative overflow-hidden rounded-[1.75rem] bg-gradient-to-l from-slate-900 via-slate-800 to-slate-900 p-6 text-white shadow-xl sm:p-8">
        <div className="pointer-events-none absolute -left-20 -top-20 size-72 rounded-full bg-brand/25 blur-3xl" />
        <div className="relative flex flex-wrap items-center justify-between gap-6">
          <div className="min-w-0">
            <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.22em] text-white/60"><Compass className="size-4" />Consultant Onboarding</div>
            <h1 className="mt-1 text-3xl font-extrabold sm:text-4xl">המסע שלך להיות יועץ SAP</h1>
            <div className="mt-2 flex flex-wrap items-center gap-2 text-sm">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-2.5 py-0.5 font-bold ring-1 ring-white/25"><Award className="size-3.5" />{tier}</span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-2.5 py-0.5 text-white/80"><Target className="size-3.5" />מסלול: PP-PI · PM</span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-2.5 py-0.5 text-white/80"><Clock className="size-3.5" />~{Math.round(remainMins / 60 * 10) / 10 || 0} שעות נותרו</span>
            </div>
            {/* big progress bar */}
            <div className="mt-4 max-w-xl">
              <div className="mb-1 flex items-center justify-between text-[12px] font-bold text-white/70"><span>שלב {Math.min(current + 1, TOTAL)} מתוך {TOTAL}</span><span className="tabular-nums">{pct}%</span></div>
              <div className="h-3.5 overflow-hidden rounded-full bg-white/15"><span className="block h-full rounded-full transition-all duration-700" style={{ width: `${pct}%`, background: complete ? GREEN : `linear-gradient(90deg,${RED},#f97316)` }} /></div>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2 text-center">
            {[["שלבים", `${doneCount}/${TOTAL}`], ["הישגים", `${earnedN}/${ACH.length}`], ["ציון", score || "—"]].map(([l, v]) => (
              <div key={l} className="rounded-2xl border border-white/15 bg-white/10 px-4 py-3 backdrop-blur-sm"><div className="text-2xl font-extrabold tabular-nums">{v}</div><div className="text-[10px] font-bold uppercase tracking-wide text-white/60">{l}</div></div>
            ))}
          </div>
        </div>
      </header>

      {/* timeline rail */}
      <div className="overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="flex min-w-max items-center gap-1 px-1 py-2">
          {STAGES.map((s, i) => {
            const isDone = doneSet.has(s.id); const isCur = i === current && !complete; const lock = !unlocked(i) && !isDone;
            const col = isDone ? GREEN : isCur ? RED : GRAY;
            return (
              <div key={s.id} className="flex items-center">
                <div className="flex flex-col items-center gap-1">
                  <span className={`grid size-11 place-items-center rounded-full border-2 text-sm font-extrabold transition-all ${isCur ? "scale-110" : ""}`} style={{ borderColor: col, background: isDone ? GREEN : "#fff", color: isDone ? "#fff" : col, boxShadow: isCur ? `0 0 0 6px ${RED}22` : undefined }}>
                    {isDone ? <Check className="size-5" /> : lock ? <Lock className="size-4" /> : s.n}
                  </span>
                  <span className="max-w-[88px] text-center text-[10px] font-bold leading-tight" style={{ color: isCur ? RED : "#64748b" }}>{s.title}</span>
                </div>
                {i < TOTAL - 1 && <span className="mx-1 h-0.5 w-8 rounded-full sm:w-14" style={{ background: doneSet.has(s.id) ? GREEN : "#e2e8f0" }} />}
              </div>
            );
          })}
        </div>
      </div>

      {/* milestone cards */}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {STAGES.map((s, i) => {
          const isDone = doneSet.has(s.id); const isCur = i === current && !complete; const lock = !unlocked(i) && !isDone;
          const Icon = s.icon; const col = isDone ? GREEN : isCur ? RED : GRAY;
          return (
            <div key={s.id} className={`relative overflow-hidden rounded-3xl border bg-white p-5 shadow-sm transition-all duration-300 ${lock ? "opacity-60" : "hover:-translate-y-1 hover:shadow-lg"} ${isCur ? "ring-2" : "border-slate-200"}`}
              style={isCur ? ({ ["--tw-ring-color"]: RED, boxShadow: `0 0 0 4px ${RED}14, 0 10px 30px -12px ${RED}55` } as React.CSSProperties) : undefined}>
              <span className="absolute inset-x-0 top-0 h-1.5" style={{ background: col }} />
              <div className="flex items-start justify-between">
                <span className="grid size-12 place-items-center rounded-2xl text-white shadow-sm transition" style={{ background: col }}>{lock ? <Lock className="size-5" /> : <Icon className="size-6" />}</span>
                <span className={`rounded-full px-2 py-0.5 text-[10px] font-extrabold ${isDone ? "bg-emerald-100 text-emerald-700" : isCur ? "text-white" : "bg-slate-100 text-slate-400"}`} style={isCur ? { background: RED } : undefined}>
                  {isDone ? "הושלם ✓" : isCur ? "השלב הנוכחי" : lock ? "נעול" : "זמין"}
                </span>
              </div>
              <div className="mt-3 flex items-center gap-2"><span className="text-[11px] font-bold text-slate-400">שלב {s.n}</span></div>
              <h3 className="text-lg font-extrabold text-slate-900">{s.title}</h3>
              <p className="mt-1 min-h-[2.5em] text-[13px] leading-relaxed text-slate-500">{s.desc}</p>
              <div className="mt-3 flex items-center justify-between">
                <span className="flex items-center gap-1 text-[11px] font-bold text-slate-400"><Clock className="size-3.5" />~{s.mins} דק'</span>
                {lock ? <span className="text-[11px] font-bold text-slate-400">השלם שלבים קודמים</span>
                  : s.href ? <Link href={s.href} onClick={() => go(s)} className="tap inline-flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-extrabold text-white shadow-sm transition active:scale-95" style={{ background: col }}>{s.action}<ArrowLeft className="size-3.5" /></Link>
                  : <button onClick={() => go(s)} className="tap inline-flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-extrabold text-white shadow-sm transition active:scale-95" style={{ background: col }}>{isDone ? "סומן ✓" : s.action}</button>}
              </div>
            </div>
          );
        })}
      </div>

      {/* achievements */}
      <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="flex items-center gap-2 text-lg font-extrabold text-slate-900"><Star className="size-5 text-amber-500" />הישגים</h2>
          <span className="text-sm font-bold text-slate-400">{earnedN}/{ACH.length}</span>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {ACH.map((a) => { const Icon = a.icon; return (
            <div key={a.id} className={`flex flex-col items-center gap-2 rounded-2xl border p-3 text-center transition ${a.earned ? "border-amber-200 bg-amber-50" : "border-slate-200 bg-slate-50 opacity-60"}`}>
              <span className={`grid size-12 place-items-center rounded-full ${a.earned ? "bg-amber-400 text-amber-950" : "bg-slate-200 text-slate-400"}`}>{a.earned ? <Icon className="size-6" /> : <Lock className="size-5" />}</span>
              <span className="text-[11px] font-bold leading-tight text-slate-700">{a.he}</span>
            </div>
          ); })}
        </div>
      </section>

      {/* certificate (on completion) */}
      {complete && (
        <section className="overflow-hidden rounded-3xl border-2 border-emerald-300 bg-gradient-to-l from-emerald-50 to-white shadow-lg" style={{ animation: "fadeUp .3s ease both" }}>
          <div className="flex flex-wrap items-center justify-between gap-4 p-6">
            <div className="flex items-center gap-4">
              <span className="grid size-16 place-items-center rounded-2xl bg-emerald-500 text-white shadow-md"><BadgeCheck className="size-9" /></span>
              <div>
                <div className="text-[11px] font-bold uppercase tracking-wide text-emerald-600">NEO Certified</div>
                <h2 className="text-2xl font-extrabold text-slate-900">תג יועץ SAP מוסמך 🎓</h2>
                <p className="text-sm text-slate-500">השלמת את מסע הקליטה · ציון הסמכה: <span className="font-extrabold text-slate-700">{score || "—"}</span> · {earnedN}/{ACH.length} הישגים</p>
              </div>
            </div>
            <Link href="/learn/pm-fundamentals/" className="tap inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-extrabold text-white shadow-sm transition active:scale-95"><GraduationCap className="size-4" />המסלול המומלץ הבא<ArrowLeft className="size-4" /></Link>
          </div>
        </section>
      )}

      {doneCount > 0 && <div className="text-center"><button onClick={resetJourney} className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-400 transition hover:text-brand"><RotateCcw className="size-3.5" />אפס מסע</button></div>}
    </div>
  );
}
