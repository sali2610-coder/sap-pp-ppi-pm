"use client";

/* ============================================================================
   PROJECT NEO · THE ASSESSMENT RUNNER
   ----------------------------------------------------------------------------
   WHAT ALREADY EXISTED, AND WHAT DID NOT

     lib/cert/generate.ts already builds every question from the project's own
     verified dictionary — table purposes, primary keys, foreign keys, ER joins,
     parent/child flow, the S/4HANA impact map and the incident catalogue — and
     draws its distractors from real sibling tables in the same module. Every
     question also carries `why`, and often `wrongNote`, `context`, `related`
     and `tcodes`. lib/cert/store.ts already records attempts, best score,
     rolling mastery and the daily streak.

     What did not exist was a NEO runner. /neo/certification/ counted the banks
     honestly and then handed the reader to the LEGACY centre to actually sit an
     assessment. This is that runner, inside NEO.

   NOTHING HERE AUTHORS SAP CONTENT

     No stem, no choice, no correct answer and no explanation is written in this
     file. It renders `pickExam()`'s output and nothing else. Where a question
     carries no `wrongNote`, the surface stays silent rather than inventing a
     reason — the brief's rule, and the honest one.

   THE PASS MARK IS THE PROJECT'S, AND SAYS SO

     store.ts scores a pass at >= 80. That is this project's own rule; SAP
     publishes no threshold that this repo holds. The result screen labels it
     as the project's rule rather than implying an official one.

   FEEDBACK IS IMMEDIATE AND THEN LOCKED

     A choice is committed on selection: the answer locks, the explanation
     opens, and the score moves. Letting a reader change an answer after seeing
     the explanation would make the score meaningless. Navigation stays open —
     you can go back and READ a locked question, you just cannot re-answer it.
   ========================================================================== */

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft, ArrowRight, Award, Check, RotateCcw, Target, X,
} from "lucide-react";
import {
  LEVEL_HE, QTYPE_HE, pickExam, type CertModule, type Level, type Question,
} from "@/lib/cert/generate";
import { recordExam } from "@/lib/cert/store";

const MODULES: { id: CertModule; he: string }[] = [
  { id: "PM", he: "אחזקת מפעל" },
  { id: "PP-PI", he: "ייצור תהליכי" },
  { id: "PP", he: "ליבת הייצור" },
];
const LEVELS: Level[] = [1, 2, 3, 4];
const LENGTHS = [10, 20, 30];

/** The project's own threshold, from lib/cert/store. Never presented as SAP's. */
const PASS = 80;

type Phase = "setup" | "run" | "done";
type Answer = { picked: number; correct: boolean };

export function CertExam() {
  const [phase, setPhase] = useState<Phase>("setup");
  const [mod, setMod] = useState<CertModule>("PM");
  const [level, setLevel] = useState<Level>(2);
  const [len, setLen] = useState(20);

  const [qs, setQs] = useState<Question[]>([]);
  const [at, setAt] = useState(0);
  const [answers, setAnswers] = useState<Record<number, Answer>>({});
  const [reviewWrongOnly, setReviewWrongOnly] = useState(false);
  const liveRef = useRef<HTMLParagraphElement>(null);

  const answered = Object.keys(answers).length;
  const correct = Object.values(answers).filter((a) => a.correct).length;
  const score = qs.length ? Math.round((correct / qs.length) * 100) : 0;
  const q = qs[at];
  const given = answers[at];

  const start = useCallback(() => {
    const bank = pickExam(mod, level, len);
    setQs(bank);
    setAnswers({});
    setAt(0);
    setPhase(bank.length ? "run" : "setup");
  }, [mod, level, len]);

  /* Commit on selection. See the header note on why this locks. */
  const answer = useCallback((i: number) => {
    setAnswers((prev) => {
      if (prev[at]) return prev;                        // already locked
      const ok = i === qs[at].answer;
      return { ...prev, [at]: { picked: i, correct: ok } };
    });
  }, [at, qs]);

  const finish = useCallback(() => {
    setPhase("done");
    /* The reader's own record. Written once, on finish, through the existing
       store — this file does not invent a persistence layer. */
    try { recordExam(mod, score, qs.length, correct); } catch { /* device storage off */ }
  }, [mod, score, qs.length, correct]);

  /* Keyboard: 1-9 answer, arrows move, Enter advances. A question surface that
     needs a mouse is a question surface half the readers cannot use quickly. */
  useEffect(() => {
    if (phase !== "run") return;
    const onKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLElement && /input|textarea/i.test(e.target.tagName)) return;
      const n = Number(e.key);
      if (n >= 1 && n <= (q?.choices.length ?? 0)) { answer(n - 1); return; }
      if (e.key === "ArrowLeft" || e.key === "Enter") { setAt((v) => Math.min(v + 1, qs.length - 1)); }
      if (e.key === "ArrowRight") { setAt((v) => Math.max(v - 1, 0)); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [phase, q, qs.length, answer]);

  /* Screen readers get the verdict in words, not only as colour. */
  useEffect(() => {
    if (!given || !liveRef.current) return;
    liveRef.current.textContent = given.correct ? "תשובה נכונה" : "תשובה שגויה";
  }, [given, at]);

  /* ------------------------------------------------------------- setup */

  if (phase === "setup") {
    return (
      <div className="nce" data-phase="setup">
        <header className="nce-hero">
          <p className="nce-eye"><Target size={13} strokeWidth={2} aria-hidden="true" />הערכת ידע</p>
          <h1 className="nce-h1">בחר מאגר ורמה</h1>
          <p className="nce-lede">
            השאלות נבנות מהתיעוד המאומת של הפרויקט: ייעודי טבלאות, מפתחות, קשרי ER,
            זרימת נתונים, מפת ההשפעה של S/4HANA וקטלוג התקלות. אין כאן סילבוס הסמכה רשמי של SAP.
          </p>
        </header>

        <Picker label="מאגר" >
          {MODULES.map((m) => (
            <Opt key={m.id} on={mod === m.id} onClick={() => setMod(m.id)}>
              <b>{m.id}</b><span>{m.he}</span>
            </Opt>
          ))}
        </Picker>

        <Picker label="רמה">
          {LEVELS.map((l) => (
            <Opt key={l} on={level === l} onClick={() => setLevel(l)}>
              <b>{l}</b><span>{LEVEL_HE[l]}</span>
            </Opt>
          ))}
        </Picker>

        <Picker label="מספר שאלות">
          {LENGTHS.map((n) => (
            <Opt key={n} on={len === n} onClick={() => setLen(n)}><b>{n}</b><span>שאלות</span></Opt>
          ))}
        </Picker>

        <div className="nce-go">
          <button type="button" className="nu-btn nce-start" onClick={start}>
            התחל הערכה
            <ArrowLeft size={15} strokeWidth={2} aria-hidden="true" />
          </button>
          <Link href="/neo/certification/" prefetch={false} className="nu-ghost">חזרה למרכז ההסמכה</Link>
        </div>
      </div>
    );
  }

  /* --------------------------------------------------------------- done */

  if (phase === "done") {
    const byType = new Map<string, { n: number; ok: number }>();
    qs.forEach((qq, i) => {
      const k = QTYPE_HE[qq.type];
      const cur = byType.get(k) ?? { n: 0, ok: 0 };
      cur.n++; if (answers[i]?.correct) cur.ok++;
      byType.set(k, cur);
    });
    const pass = score >= PASS;
    const wrong = qs.map((_, i) => i).filter((i) => !answers[i]?.correct);

    return (
      <div className="nce" data-phase="done">
        <section className="nce-result" data-pass={pass ? "1" : "0"}>
          <span className="nce-trophy" aria-hidden="true">
            <Award size={38} strokeWidth={1.6} />
          </span>
          <p className="nce-eye">תוצאה</p>
          {/* The ring is decorative; the number beside it is the accessible value. */}
          <div className="nce-ring" style={{ "--p": score } as React.CSSProperties} aria-hidden="true">
            <b>{score}<i>%</i></b>
          </div>
          <p className="nce-score-a11y">ציון {score} אחוז, {correct} נכונות מתוך {qs.length}.</p>
          <p className="nce-verdict">
            {pass ? "עברת את סף הפרויקט" : "מתחת לסף הפרויקט"}
          </p>
          <p className="nce-note">
            הסף הוא {PASS}% והוא כלל של הפרויקט הזה. SAP אינה מפרסמת סף שהפרויקט מחזיק.
          </p>
          <div className="nce-tally">
            <span className="nce-t nce-t--ok"><Check size={13} aria-hidden="true" />{correct} נכונות</span>
            <span className="nce-t nce-t--no"><X size={13} aria-hidden="true" />{qs.length - correct} שגויות</span>
          </div>
        </section>

        <section className="nce-topics" aria-label="ביצועים לפי סוג שאלה">
          <h2 className="nce-h2">לפי סוג שאלה</h2>
          <ul>
            {[...byType.entries()].map(([k, v]) => (
              <li key={k}>
                <span className="nce-topic-n">{k}</span>
                <span className="nce-bar" aria-hidden="true">
                  <i style={{ width: `${Math.round((v.ok / v.n) * 100)}%` }} />
                </span>
                <span className="nce-topic-v">{v.ok}/{v.n}</span>
              </li>
            ))}
          </ul>
        </section>

        <div className="nce-go">
          <button type="button" className="nu-btn" onClick={() => { setPhase("run"); setAt(0); setReviewWrongOnly(false); }}>
            סקירת השאלות
          </button>
          {wrong.length ? (
            <button type="button" className="nu-btn2" onClick={() => { setPhase("run"); setAt(wrong[0]); setReviewWrongOnly(true); }}>
              סקירת {wrong.length} השגויות
            </button>
          ) : null}
          <button type="button" className="nu-btn2" onClick={() => { setPhase("setup"); }}>
            <RotateCcw size={14} strokeWidth={2} aria-hidden="true" />הערכה חדשה
          </button>
          <Link href="/neo/certification/" prefetch={false} className="nu-ghost">מרכז ההסמכה</Link>
        </div>
      </div>
    );
  }

  /* ---------------------------------------------------------------- run */

  const pct = Math.round((answered / qs.length) * 100);
  return (
    <div className="nce" data-phase="run">
      <header className="nce-bar">
        <span className="nce-count">
          <b>{at + 1}</b><i>/{qs.length}</i>
        </span>
        <span className="nce-prog" aria-hidden="true"><i style={{ width: `${pct}%` }} /></span>
        <span className="nce-live">
          <span className="nce-t nce-t--ok">{correct}</span>
          <span className="nce-t nce-t--no">{answered - correct}</span>
        </span>
      </header>

      {q ? (
        <article className="nce-q" key={q.id}>
          <p className="nce-q-meta">
            <span className="nce-chip">{QTYPE_HE[q.type]}</span>
            <span className="nce-chip nce-chip--lvl">{LEVEL_HE[q.level]}</span>
            <span className="nce-chip nx-sap" dir="ltr">{q.table}</span>
          </p>
          <h1 className="nce-stem">{q.stem}</h1>
          {q.context ? <p className="nce-ctx">{q.context}</p> : null}
          {q.code ? <pre className="nce-code" dir="ltr">{q.code}</pre> : null}

          <ul className="nce-choices" role="listbox" aria-label="אפשרויות">
            {q.choices.map((c, i) => {
              const isPicked = given?.picked === i;
              const isAnswer = i === q.answer;
              const state = !given ? "idle" : isAnswer ? "right" : isPicked ? "wrong" : "muted";
              return (
                <li key={i}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={isPicked}
                    disabled={!!given}
                    className="nce-choice"
                    data-state={state}
                    onClick={() => answer(i)}
                  >
                    <span className="nce-key" aria-hidden="true">{i + 1}</span>
                    <span className="nce-choice-t">{c}</span>
                    {given && isAnswer ? <Check size={16} strokeWidth={2.4} aria-hidden="true" /> : null}
                    {given && isPicked && !isAnswer ? <X size={16} strokeWidth={2.4} aria-hidden="true" /> : null}
                  </button>
                </li>
              );
            })}
          </ul>

          <p ref={liveRef} className="nce-sr" role="status" aria-live="polite" />

          {given ? (
            <div className="nce-why" data-ok={given.correct ? "1" : "0"}>
              <b>{given.correct ? "נכון" : "התשובה הנכונה"}</b>
              <p>{q.why}</p>
              {/* Silence when the record has no note. Nothing is authored here. */}
              {q.wrongNote ? <p className="nce-why-2">{q.wrongNote}</p> : null}
              {q.tcodes?.length ? (
                <p className="nce-rel">
                  {q.tcodes.map((t) => <span key={t} className="nce-chip nx-sap" dir="ltr">{t}</span>)}
                </p>
              ) : null}
            </div>
          ) : null}
        </article>
      ) : null}

      <nav className="nce-nav" aria-label="ניווט בשאלות">
        <button type="button" className="nu-ghost" disabled={at === 0}
          onClick={() => setAt((v) => Math.max(0, v - 1))}>
          <ArrowRight size={15} strokeWidth={2} aria-hidden="true" />הקודמת
        </button>
        {at < qs.length - 1 ? (
          <button type="button" className="nu-btn2"
            onClick={() => setAt((v) => Math.min(qs.length - 1, v + 1))}>
            הבאה<ArrowLeft size={15} strokeWidth={2} aria-hidden="true" />
          </button>
        ) : (
          <button type="button" className="nu-btn" onClick={finish}>
            {answered === qs.length ? "סיים והצג תוצאה" : `סיים (${answered}/${qs.length} נענו)`}
          </button>
        )}
        {reviewWrongOnly ? (
          <button type="button" className="nu-ghost" onClick={() => setPhase("done")}>חזרה לתוצאה</button>
        ) : null}
      </nav>
    </div>
  );
}

/* ------------------------------------------------------------- primitives */

function Picker({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <section className="nce-pick">
      <h2 className="nce-pick-h">{label}</h2>
      <div className="nce-pick-row">{children}</div>
    </section>
  );
}

function Opt({ on, onClick, children }: { on: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button type="button" className="nce-opt" data-on={on ? "1" : "0"} aria-pressed={on} onClick={onClick}>
      {children}
    </button>
  );
}
