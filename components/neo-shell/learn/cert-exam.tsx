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

   THE RUNNER IN THE CATALOGS' LANGUAGE (2026-10). The setup is the entry
   page's own composition (catalog-kit hero, a Sig, facet groups of pressed
   .nu-filter chips, one red action); the run header is a sticky band with an
   ink meter and the counts as glyph + word (it was defined twice in cert.css
   and the second rule crushed it to a 7px bar); a locked choice is a 1px
   status ring plus its glyph and word, never a fill; the result is a ledger
   and a ranked list by question type, with no trophy, ring or gold wash; the
   credit closes every phase.

   FEEDBACK IS IMMEDIATE AND THEN LOCKED

     A choice is committed on selection: the answer locks, the explanation
     opens, and the score moves. Letting a reader change an answer after seeing
     the explanation would make the score meaningless. Navigation stays open —
     you can go back and READ a locked question, you just cannot re-answer it.
   ========================================================================== */

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft, ArrowRight, Award, Check, ListChecks, RotateCcw, Target, X,
} from "lucide-react";
import {
  LEVEL_HE, QTYPE_HE, pickExam, type CertModule, type Level, type Question,
} from "@/lib/cert/generate";
import { recordExam } from "@/lib/cert/store";
import { CatalogFoot, CatalogHero, Ledger, RankList, Sig, fmt } from "../data/catalog-kit";
import { LENGTHS, LEVELS, MODULES, parseExamQuery } from "./cert-pick";

/** The project's own threshold, from lib/cert/store. Never presented as SAP's. */
const PASS = 80;

type Phase = "setup" | "run" | "done";
type Answer = { picked: number; correct: boolean };

const RED = { "--m": "var(--brand)" } as React.CSSProperties;

/** The foot every phase closes with: what the questions are, and the credit. */
function Foot() {
  return (
    <CatalogFoot>
      השאלות, התשובות וההסברים נבנים מהתיעוד המאומת של הפרויקט. המבחן אינו מבוסס על תוכנית הסמכה רשמית של SAP.
    </CatalogFoot>
  );
}

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

  /* THE ENTRY PAGE'S CHOICE. /neo/certification/ asks bank, level and length
     first and hands them over in the URL (cert-pick.tsx). Read once, on the
     client, after hydration: the server render is the untouched setup screen,
     so nothing can mismatch. `start=1` begins the exam at once; without it the
     pickers are only pre-filled. The writes are deferred a tick so they happen
     outside the effect body itself. */
  useEffect(() => {
    const p = parseExamQuery(window.location.search);
    if (!p.mod && !p.level && !p.len) return;
    const id = window.setTimeout(() => {
      if (p.mod) setMod(p.mod);
      if (p.level) setLevel(p.level);
      if (p.len) setLen(p.len);
      if (p.start && p.mod && p.level && p.len) {
        const bank = pickExam(p.mod, p.level, p.len);
        setQs(bank);
        setAnswers({});
        setAt(0);
        setPhase(bank.length ? "run" : "setup");
      }
    }, 0);
    return () => window.clearTimeout(id);
  }, []);

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
      <div className="nxd nce nm-scene" data-scene="cream" data-surface="assessment" data-phase="setup">
        <CatalogHero
          icon={<Target size={14} strokeWidth={1.75} aria-hidden="true" />}
          eyebrow="הערכת ידע"
          title="הגדרת המבחן"
          lede={
            <>
              השאלות נבנות מהתיעוד המאומת של הפרויקט: ייעוד טבלאות, מפתחות, קשרי ER,
              זרימת נתונים, מפת השפעת המעבר ל-S/4HANA וקטלוג התקלות. המבחן אינו מבוסס על תוכנית הסמכה רשמית של SAP.
            </>
          }
        />

        <Sig id="ce-setup" icon={<ListChecks size={15} strokeWidth={1.75} />} title="מאגר, רמה ומספר שאלות">
          <div className="nxd-setup nce-setup">
            <div className="nxd-facet" role="group" aria-label="מאגר">
              <span className="nxd-facet-l">מאגר</span>
              {MODULES.map((m) => (
                <button key={m.id} type="button" className="nu-filter" aria-pressed={mod === m.id} onClick={() => setMod(m.id)}>
                  <bdi className="nx-sap">{m.id}</bdi> {m.he}
                </button>
              ))}
            </div>
            <div className="nxd-facet" role="group" aria-label="רמה">
              <span className="nxd-facet-l">רמה</span>
              {LEVELS.map((l) => (
                <button key={l} type="button" className="nu-filter" aria-pressed={level === l} onClick={() => setLevel(l)}>
                  <bdi className="nx-sap">{l}</bdi> {LEVEL_HE[l]}
                </button>
              ))}
            </div>
            <div className="nxd-facet" role="group" aria-label="מספר שאלות">
              <span className="nxd-facet-l">מספר שאלות</span>
              {LENGTHS.map((n) => (
                <button key={n} type="button" className="nu-filter" aria-pressed={len === n} onClick={() => setLen(n)}>
                  {fmt(n)} שאלות
                </button>
              ))}
            </div>
            <div className="nxd-go">
              {/* The one red action on the page. */}
              <button type="button" className="nu-btn nxd-start" style={RED} onClick={start}>
                התחלת המבחן
                <ArrowLeft size={15} strokeWidth={2} className="nu-arw" aria-hidden="true" />
              </button>
              <Link href="/neo/certification/" prefetch={false} className="nu-ghost">חזרה לתרגול ובדיקת ידע</Link>
            </div>
          </div>
        </Sig>

        <Foot />
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
      <div className="nxd nce nm-scene" data-scene="cream" data-surface="assessment" data-phase="done" data-pass={pass ? "1" : "0"}>
        <CatalogHero
          icon={<Award size={14} strokeWidth={1.75} aria-hidden="true" />}
          eyebrow="הערכת ידע · תוצאה"
          title={`ציון ${score}%`}
          lede={<>הרף הוא {PASS}%, כלל פנימי של הפרויקט ולא ציון עובר של SAP. התוצאה נשמרה במכשיר זה בלבד.</>}
        >
          <p className="nce-verdict">
            <span className="nu-status" style={{ "--s": pass ? "var(--status-done)" : "var(--status-in-analysis)" } as React.CSSProperties}>
              {pass ? "הציון עובר את הרף הפנימי" : "הציון מתחת לרף הפנימי"}
            </span>
          </p>
          <Ledger
            label="התוצאה במספרים"
            items={[
              { v: score, l: "ציון באחוזים" },
              { v: correct, l: "תשובות נכונות" },
              { v: qs.length - correct, l: "תשובות שגויות" },
              { v: qs.length, l: "שאלות במבחן" },
            ]}
          />
        </CatalogHero>

        <Sig
          id="ce-types"
          icon={<ListChecks size={15} strokeWidth={1.75} />}
          title="לפי סוג שאלה"
          count={`${fmt(byType.size)} סוגים`}
          lede="אורך הפס: מספר השאלות מכל סוג. החלק המודגש: התשובות הנכונות."
        >
          <RankList
            label="תוצאות לפי סוג שאלה"
            items={[...byType.entries()].map(([k, v]) => ({
              id: k,
              label: k,
              n: v.n,
              part: v.ok,
              sub: <>{fmt(v.ok)} {v.ok === 1 ? "נכונה" : "נכונות"} מתוך {fmt(v.n)}</>,
            }))}
          />
        </Sig>

        <div className="nxd-go nce-go">
          <button type="button" className="nu-btn" style={RED} onClick={() => { setPhase("run"); setAt(0); setReviewWrongOnly(false); }}>
            סקירת השאלות
          </button>
          {wrong.length ? (
            <button type="button" className="nu-btn2" onClick={() => { setPhase("run"); setAt(wrong[0]); setReviewWrongOnly(true); }}>
              {wrong.length === 1 ? "סקירת התשובה השגויה" : `סקירת ${wrong.length} התשובות השגויות`}
            </button>
          ) : null}
          <button type="button" className="nu-btn2" onClick={() => { setPhase("setup"); }}>
            <RotateCcw size={14} strokeWidth={2} aria-hidden="true" />התחלת מבחן חדש
          </button>
          <Link href="/neo/certification/" prefetch={false} className="nu-ghost">חזרה לתרגול ובדיקת ידע</Link>
        </div>

        <Foot />
      </div>
    );
  }

  /* ---------------------------------------------------------------- run
     Block flow, not the catalog's grid: the header below is sticky, and a
     sticky GRID item cannot travel past its own grid area. */

  return (
    <div className="nce nm-scene" data-scene="cream" data-surface="assessment" data-phase="run">
      <header className="nce-run">
        <span className="nce-count">שאלה <bdi dir="ltr" className="nx-sap">{at + 1}/{qs.length}</bdi></span>
        <span className="nce-meter" aria-hidden="true">
          <i style={{ transform: `scaleX(${qs.length ? answered / qs.length : 0})` }} />
        </span>
        <span className="nce-live">
          <span className="nce-st" data-k="ok"><Check size={14} strokeWidth={2.2} aria-hidden="true" />{fmt(correct)} {correct === 1 ? "נכונה" : "נכונות"}</span>
          <span className="nce-st" data-k="no"><X size={14} strokeWidth={2.2} aria-hidden="true" />{fmt(answered - correct)} {answered - correct === 1 ? "שגויה" : "שגויות"}</span>
        </span>
      </header>

      {q ? (
        <article className="nce-q" key={q.id}>
          <p className="nce-q-meta">
            <span className="nu-chip">{QTYPE_HE[q.type]}</span>
            <span className="nu-chip">{LEVEL_HE[q.level]}</span>
            <span className="nu-chip is-sap" dir="ltr">{q.table}</span>
          </p>
          <h1 className="nce-stem">{q.stem}</h1>
          {q.context ? <p className="nce-ctx">{q.context}</p> : null}
          {q.code ? <pre className="nce-code" dir="ltr" tabIndex={0} role="region" aria-label="קוד השאלה">{q.code}</pre> : null}

          {/* A plain list of buttons: choosing commits the answer, so each choice
              is an action, not an option a listbox would let you move between.
              (It was ul[role=listbox] > li > button[role=option], a structure
              axe rejects: the li stood between the listbox and its options.) */}
          <ul className="nce-choices" aria-label="אפשרויות התשובה">
            {q.choices.map((c, i) => {
              const isPicked = given?.picked === i;
              const isAnswer = i === q.answer;
              const state = !given ? "idle" : isAnswer ? "right" : isPicked ? "wrong" : "muted";
              return (
                <li key={i}>
                  <button
                    type="button"
                    aria-pressed={isPicked}
                    disabled={!!given}
                    className="nce-choice"
                    data-state={state}
                    onClick={() => answer(i)}
                  >
                    <span className="nce-key" aria-hidden="true">{i + 1}</span>
                    <span className="nce-choice-t">{c}</span>
                    {/* A locked state is said in words as well as by its glyph. */}
                    {given && isAnswer ? (
                      <span className="nce-tag" data-k="ok"><Check size={15} strokeWidth={2.4} aria-hidden="true" />התשובה הנכונה</span>
                    ) : null}
                    {given && isPicked && !isAnswer ? (
                      <span className="nce-tag" data-k="no"><X size={15} strokeWidth={2.4} aria-hidden="true" />הבחירה שלך</span>
                    ) : null}
                  </button>
                </li>
              );
            })}
          </ul>

          <p ref={liveRef} className="nce-sr" role="status" aria-live="polite" />

          {given ? (
            <div className="nce-why" data-ok={given.correct ? "1" : "0"}>
              <b>
                {given.correct
                  ? <Check size={15} strokeWidth={2.4} aria-hidden="true" />
                  : <X size={15} strokeWidth={2.4} aria-hidden="true" />}
                {given.correct ? "תשובה נכונה" : "תשובה שגויה · ההסבר לתשובה הנכונה"}
              </b>
              <p>{q.why}</p>
              {/* Silence when the record has no note. Nothing is authored here. */}
              {q.wrongNote ? <p className="nce-why-2">{q.wrongNote}</p> : null}
              {q.tcodes?.length ? (
                <p className="nce-rel">
                  {q.tcodes.map((t) => <span key={t} className="nu-chip is-sap" dir="ltr">{t}</span>)}
                </p>
              ) : null}
            </div>
          ) : null}
        </article>
      ) : null}

      <nav className="nce-nav" aria-label="מעבר בין השאלות">
        <button type="button" className="nu-ghost" disabled={at === 0}
          onClick={() => setAt((v) => Math.max(0, v - 1))}>
          <ArrowRight size={15} strokeWidth={2} aria-hidden="true" />השאלה הקודמת
        </button>
        {at < qs.length - 1 ? (
          <button type="button" className="nu-btn2"
            onClick={() => setAt((v) => Math.min(qs.length - 1, v + 1))}>
            השאלה הבאה<ArrowLeft size={15} strokeWidth={2} aria-hidden="true" />
          </button>
        ) : (
          <button type="button" className="nu-btn" style={RED} onClick={finish}>
            {answered === qs.length ? "סיום המבחן והצגת התוצאה" : `סיום המבחן (${answered}/${qs.length} נענו)`}
          </button>
        )}
        {reviewWrongOnly ? (
          <button type="button" className="nu-ghost" onClick={() => setPhase("done")}>חזרה לתוצאה</button>
        ) : null}
      </nav>

      <Foot />
    </div>
  );
}
