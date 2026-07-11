"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { Trophy, CheckCircle2, XCircle, Clock, ArrowLeft, RotateCcw, Target, BookOpen, AlertTriangle, Award, X, Lightbulb, Network, Terminal, Home } from "lucide-react";
import { QTYPE_HE, LEVEL_HE, type Question, type CertModule, type Level } from "@/lib/cert/generate";
import { recordExam, recordDaily } from "@/lib/cert/store";

const ACCENT: Record<CertModule, string> = { PM: "#f97316", "PP-PI": "#6d28d9", PP: "#7c3aed" };
const LEARN_TRACK: Record<CertModule, string> = { PM: "pm-fundamentals", "PP-PI": "pp-pi", PP: "pp" };

function Confetti() {
  const pieces = useMemo(() => Array.from({ length: 90 }, (_, i) => ({
    left: (i * 37) % 100, delay: (i % 12) * 0.09, dur: 2.4 + (i % 7) * 0.22,
    c: ["#d62027", "#f97316", "#6d28d9", "#16a34a", "#0891b2", "#eab308"][i % 6], rot: (i * 47) % 360, w: 6 + (i % 4) * 2,
  })), []);
  return (
    <div className="pointer-events-none fixed inset-0 z-[80] overflow-hidden" aria-hidden>
      {pieces.map((p, i) => <span key={i} className="absolute top-[-5%] rounded-[2px]" style={{ left: `${p.left}%`, width: p.w, height: p.w * 1.6, background: p.c, transform: `rotate(${p.rot}deg)`, animation: `confettiFall ${p.dur}s cubic-bezier(.2,.6,.4,1) ${p.delay}s forwards` }} />)}
    </div>
  );
}

export function Exam({ questions, module, level, mode, onExit }: { questions: Question[]; module: CertModule; level: Level; mode: "exam" | "daily"; onExit: () => void }) {
  const accent = ACCENT[module];
  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState<(number | null)[]>(() => questions.map(() => null));
  const [revealed, setRevealed] = useState(false);
  const [done, setDone] = useState(false);
  const [useTimer, setUseTimer] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const recorded = useRef(false);

  useEffect(() => { if (!useTimer || done) return; const id = setInterval(() => setElapsed((e) => e + 1), 1000); return () => clearInterval(id); }, [useTimer, done]);

  const q = questions[idx];
  const correctCount = picked.reduce<number>((n, p, i) => n + (p === questions[i].answer ? 1 : 0), 0);
  const score = Math.round((correctCount / questions.length) * 100);
  const pass = score >= 80;

  const choose = (ci: number) => { if (revealed) return; setPicked((a) => { const n = [...a]; n[idx] = ci; return n; }); setRevealed(true); };
  const next = () => { if (idx + 1 >= questions.length) finish(); else { setIdx(idx + 1); setRevealed(picked[idx + 1] !== null); } };

  function finish() {
    setDone(true);
    if (!recorded.current) {
      recorded.current = true;
      if (mode === "exam") recordExam(module, score, questions.length, correctCount);
      else recordDaily(correctCount === questions.length);
    }
  }

  // ── result screen ──
  if (done) {
    const grade = score >= 90 ? { he: "מצטיין", c: "#16a34a" } : score >= 80 ? { he: "עובר", c: "#16a34a" } : score >= 65 ? { he: "כמעט", c: "#d97706" } : { he: "נכשל", c: "#dc2626" };
    const wrongQs = questions.filter((x, i) => picked[i] !== x.answer);
    const byType: Record<string, { ok: number; tot: number }> = {};
    questions.forEach((x, i) => { const s = (byType[x.type] ||= { ok: 0, tot: 0 }); s.tot++; if (picked[i] === x.answer) s.ok++; });
    const strengths = Object.entries(byType).filter(([, s]) => s.ok === s.tot && s.tot > 0).map(([t]) => QTYPE_HE[t as keyof typeof QTYPE_HE]);
    const weaknesses = Object.entries(byType).filter(([, s]) => s.ok < s.tot).sort((a, b) => (a[1].ok / a[1].tot) - (b[1].ok / b[1].tot)).map(([t]) => QTYPE_HE[t as keyof typeof QTYPE_HE]);
    const reviewTables = [...new Set(wrongQs.map((x) => x.table))].slice(0, 12);

    return (
      <div className="mx-auto max-w-3xl" dir="rtl">
        {pass && <Confetti />}
        <div className="overflow-hidden rounded-3xl border border-hairline bg-surface shadow-lg" style={{ animation: "fadeUp .3s ease both" }}>
          <div className="relative px-6 py-8 text-center text-white" style={{ background: `linear-gradient(135deg, ${grade.c}, ${grade.c}cc)` }}>
            <Award className="mx-auto size-12 opacity-90" />
            <div className="mt-2 text-6xl font-extrabold tabular-nums">{score}</div>
            <div className="text-sm font-bold uppercase tracking-[0.2em] opacity-90">{mode === "daily" ? "אתגר יומי" : `${module} · ${LEVEL_HE[level]}`}</div>
            <div className="mt-2 inline-block rounded-full bg-surface/20 px-4 py-1 text-lg font-extrabold ring-1 ring-white/30">{grade.he} · {pass ? "עברת ✓" : "לא עברת (נדרש 80)"}</div>
            <div className="mt-1 text-xs opacity-80">{correctCount}/{questions.length} תשובות נכונות</div>
          </div>
          <div className="space-y-4 p-6">
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4"><div className="mb-1 flex items-center gap-1.5 text-[11px] font-extrabold uppercase tracking-wide text-emerald-700"><CheckCircle2 className="size-3.5" />חוזקות</div>{strengths.length ? <div className="flex flex-wrap gap-1.5">{strengths.map((s) => <span key={s} className="rounded-lg bg-surface px-2 py-0.5 text-[12px] font-bold text-emerald-700 ring-1 ring-emerald-200">{s}</span>)}</div> : <p className="text-sm text-ink-3">המשך להתאמן.</p>}</div>
              <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4"><div className="mb-1 flex items-center gap-1.5 text-[11px] font-extrabold uppercase tracking-wide text-amber-700"><AlertTriangle className="size-3.5" />לחיזוק</div>{weaknesses.length ? <div className="flex flex-wrap gap-1.5">{weaknesses.map((s) => <span key={s} className="rounded-lg bg-surface px-2 py-0.5 text-[12px] font-bold text-amber-700 ring-1 ring-amber-200">{s}</span>)}</div> : <p className="text-sm text-ink-3">כל הסוגים נענו נכון! 🎉</p>}</div>
            </div>
            {reviewTables.length > 0 && (
              <div><div className="mb-1.5 flex items-center gap-1.5 text-[11px] font-extrabold uppercase tracking-wide text-ink-3"><BookOpen className="size-3.5" />טבלאות לחזרה</div>
                <div className="flex flex-wrap gap-1.5" dir="ltr">{reviewTables.map((t) => <Link key={t} href={`/object/${encodeURIComponent(t)}/`} className="tech rounded-lg border border-hairline bg-surface-2 px-2 py-1 font-mono text-[12px] font-bold text-ink-2 transition hover:border-brand/50 hover:text-brand">{t}</Link>)}</div></div>
            )}
            <div className="rounded-2xl bg-surface-2 p-4">
              <div className="mb-1 flex items-center gap-1.5 text-[11px] font-extrabold uppercase tracking-wide text-ink-3"><Target className="size-3.5" />מסלול למידה מומלץ</div>
              <Link href={`/learn/${LEARN_TRACK[module]}/`} className="tap inline-flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-sm font-bold text-white shadow-sm" style={{ background: accent }}><BookOpen className="size-4" />{pass ? "העמק עוד במסלול" : "חזור על יסודות המודול"}<ArrowLeft className="size-4" /></Link>
            </div>
            <div className="flex flex-wrap gap-2 border-t border-hairline pt-4">
              <button onClick={onExit} className="tap inline-flex items-center gap-1.5 rounded-xl px-4 py-2.5 text-sm font-extrabold text-white shadow-sm" style={{ background: accent }}><RotateCcw className="size-4" />מבחן חדש</button>
              <Link href="/certification/" onClick={onExit} className="tap inline-flex items-center gap-1.5 rounded-xl border border-hairline bg-surface px-4 py-2.5 text-sm font-bold text-ink-2 transition hover:border-brand/40"><Home className="size-4" />מרכז ההסמכה</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── question screen ──
  const correctIdx = q.answer;
  return (
    <div className="mx-auto max-w-3xl" dir="rtl">
      {/* top bar */}
      <div className="mb-3 flex items-center gap-3">
        <button onClick={onExit} className="tap grid size-9 shrink-0 place-items-center rounded-xl border border-hairline bg-surface text-ink-3 transition hover:text-brand"><X className="size-5" /></button>
        <div className="flex-1">
          <div className="mb-1 flex items-center justify-between text-[11px] font-bold text-ink-3">
            <span>שאלה {idx + 1} מתוך {questions.length}</span>
            <span className="flex items-center gap-2">
              <button onClick={() => setUseTimer((v) => !v)} className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 transition ${useTimer ? "bg-slate-900 text-white" : "ring-1 ring-hairline hover:bg-surface-2"}`}><Clock className="size-3" />{useTimer ? `${Math.floor(elapsed / 60)}:${String(elapsed % 60).padStart(2, "0")}` : "טיימר"}</button>
              <span className="tabular-nums">{score}%</span>
            </span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-surface-2"><span className="block h-full rounded-full transition-all duration-300" style={{ width: `${(idx / questions.length) * 100}%`, background: accent }} /></div>
        </div>
      </div>

      <div className="rounded-3xl border border-hairline bg-surface p-5 shadow-sm sm:p-7" style={{ animation: "fadeUp .2s ease both" }}>
        <div className="flex items-center gap-2">
          <span className="rounded-full px-2.5 py-0.5 text-[10px] font-extrabold text-white" style={{ background: accent }}>{QTYPE_HE[q.type]}</span>
          <span className="rounded-full bg-surface-2 px-2 py-0.5 text-[10px] font-bold text-ink-3">{LEVEL_HE[q.level]}</span>
        </div>
        <h2 className="mt-3 text-xl font-extrabold leading-snug text-ink-1 sm:text-2xl">{q.stem}</h2>
        {q.code && <pre className="mt-3 overflow-x-auto rounded-xl bg-slate-900 px-4 py-3 font-mono text-[12px] leading-relaxed text-emerald-300" dir="ltr">{q.code}</pre>}

        <div className="mt-4 space-y-2">
          {q.choices.map((ch, ci) => {
            const isPicked = picked[idx] === ci; const isCorrect = ci === correctIdx;
            const state = !revealed ? "idle" : isCorrect ? "correct" : isPicked ? "wrong" : "muted";
            const cls = { idle: "border-hairline bg-surface hover:border-brand/40 hover:bg-surface-2", correct: "border-emerald-400 bg-emerald-50", wrong: "border-red-400 bg-red-50", muted: "border-hairline bg-surface opacity-60" }[state];
            return (
              <button key={ci} onClick={() => choose(ci)} disabled={revealed} className={`tap flex w-full items-center gap-3 rounded-2xl border-2 px-4 py-3 text-right transition active:scale-[.99] ${cls}`}>
                <span className={`grid size-7 shrink-0 place-items-center rounded-full text-xs font-extrabold ${state === "correct" ? "bg-emerald-500 text-white" : state === "wrong" ? "bg-red-500 text-white" : "bg-surface-2 text-ink-3"}`}>{revealed && isCorrect ? <CheckCircle2 className="size-4" /> : revealed && isPicked ? <XCircle className="size-4" /> : String.fromCharCode(65 + ci)}</span>
                <span className="tech flex-1 text-[15px] font-bold text-ink-1" dir="auto">{ch}</span>
              </button>
            );
          })}
        </div>

        {/* feedback */}
        {revealed && (
          <div className="mt-4 space-y-3 rounded-2xl border border-hairline bg-surface-2/70 p-4" style={{ animation: "fadeUp .2s ease both" }}>
            <div className={`flex items-center gap-1.5 text-sm font-extrabold ${picked[idx] === correctIdx ? "text-emerald-600" : "text-red-600"}`}>
              {picked[idx] === correctIdx ? <><CheckCircle2 className="size-4" />תשובה נכונה</> : <><XCircle className="size-4" />תשובה שגויה — הנכונה: {q.choices[correctIdx]}</>}
            </div>
            <div className="flex gap-2 text-[13px] leading-relaxed text-ink-2"><Lightbulb className="mt-0.5 size-4 shrink-0 text-amber-500" /><p><span className="font-bold">למה: </span>{q.why}</p></div>
            {q.wrongNote && <p className="text-[12px] text-ink-3">{q.wrongNote}</p>}
            {q.context && <p className="rounded-lg bg-surface px-3 py-2 text-[12px] leading-relaxed text-ink-2 ring-1 ring-hairline"><span className="font-bold text-ink-2">הקשר עסקי: </span>{q.context}</p>}
            {(q.related?.length || q.tcodes?.length) ? (
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5">
                {q.related?.length ? <span className="flex flex-wrap items-center gap-1.5"><Network className="size-3.5 text-blue-500" /><span className="text-[11px] font-bold text-ink-3">טבלאות:</span>{q.related.map((r) => <Link key={r} href={`/object/${encodeURIComponent(r)}/`} className="tech rounded-md border border-hairline bg-surface px-1.5 py-0.5 font-mono text-[11px] font-bold text-ink-2 transition hover:border-brand/40 hover:text-brand">{r}</Link>)}</span> : null}
                {q.tcodes?.length ? <span className="flex flex-wrap items-center gap-1.5" dir="ltr"><Terminal className="size-3.5 text-ink-3" />{q.tcodes.map((tc) => <span key={tc} className="tech rounded-md bg-surface-2 px-1.5 py-0.5 font-mono text-[11px] font-bold text-ink-2">{tc}</span>)}</span> : null}
              </div>
            ) : null}
            <button onClick={next} className="tap inline-flex items-center gap-1.5 rounded-xl px-5 py-2.5 text-sm font-extrabold text-white shadow-sm active:scale-95" style={{ background: accent }}>{idx + 1 >= questions.length ? <><Trophy className="size-4" />סיים וקבל ציון</> : <>השאלה הבאה<ArrowLeft className="size-4" /></>}</button>
          </div>
        )}
      </div>
    </div>
  );
}
