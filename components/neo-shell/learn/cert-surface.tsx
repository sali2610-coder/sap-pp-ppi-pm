"use client";

/* ============================================================================
   PROJECT NEO · /neo/certification — an honest assessment surface.
   ----------------------------------------------------------------------------
   The brief for this screen was the hardest of the four, and the answer is a
   refusal: this project does not hold an SAP certification syllabus, so this
   page does not draw one. No exam code, no official topic weighting, no
   official question count, no pass mark borrowed from SAP, no booking flow.

   What it draws instead is what genuinely exists:
     · the THREE QUESTIONS the exam actually asks — which bank, which level,
       how many questions — and ONE action that starts it. Bank and level are
       coupled and cumulative, so they are one control (2026-10): a matrix of
       the three banks against the four levels whose every cell is the real
       number of questions available there and the choice of both at once;
     · three question banks the project GENERATES from its own verified
       dictionary, with their real sizes, their real question-type mix and the
       real number of tables they are anchored to, behind a disclosure;
     · the reader's OWN record, read from the device (`neo:cert`), or an
       explicit "nothing recorded yet" when there is none.

   THE SHAPE is the Reference catalogs' (components/neo-shell/data/catalog-
   kit.tsx): a hero with its facts, one signature band (the setup), the record
   as aligned rows, the long form in disclosures, the source and the credit.
   The runner at /neo/certification/exam/ keeps its own pickers (./cert-pick).

   HYDRATION. The certification store reads localStorage inside its snapshot
   getter, so the first client render would not match the server's. The reader's
   own results are therefore gated behind a mounted flag: the server and the
   first client render both draw the "nothing recorded" state, and the real
   record replaces it one tick later.
   ========================================================================== */

import Link from "next/link";
import { useState, useSyncExternalStore } from "react";
import { ArrowLeft, Award, Check, Minus, Target } from "lucide-react";
import { SmartReturn } from "@/components/neo-shell/nav-context";
import { useCertState, masteryPct } from "@/lib/cert/store";
import type { CertModule, Level } from "@/lib/cert/generate";
import { CatalogFoot, CatalogHero, Cell, Cols, RankList, Sig, fmt } from "../data/catalog-kit";
import { LENGTHS, LEVELS, examHref } from "./cert-pick";
import type { CertData } from "./cert-data";

/* "Are we past hydration yet?" expressed as an external store rather than as a
   setState in an effect. The server snapshot is false and the client snapshot
   is true, which is exactly the signal needed. */
const NEVER = () => () => {};
const ON_CLIENT = () => true;
const ON_SERVER = () => false;
const useHydrated = () => useSyncExternalStore(NEVER, ON_CLIENT, ON_SERVER);

const REC_COLS = [
  { k: "id", l: "מאגר" },
  { k: "att", l: "ניסיונות" },
  { k: "best", l: "הציון הגבוה ביותר" },
  { k: "mast", l: "תשובות נכונות (מצטבר)" },
  { k: "seen", l: "שאלות שנענו" },
  { k: "st", l: "הרף הפנימי" },
];

export function CertSurface({ data }: { data: CertData }) {
  const { banks, totals, passPct } = data;
  const st = useCertState();
  const mounted = useHydrated();

  /* The three questions, with the runner's own defaults (cert-exam.tsx). */
  const [mod, setMod] = useState<CertModule>("PM");
  const [level, setLevel] = useState<Level>(2);
  const [len, setLen] = useState(20);

  const bank = banks.find((b) => b.id === mod) ?? banks[0];
  const avail = bank?.levels.find((x) => x.level === level)?.n ?? 0;
  const levelHe = (l: Level) => banks[0]?.levels.find((x) => x.level === l)?.he ?? "";

  const records = mounted
    ? banks.map((b) => ({ b, s: st.mods[b.id] })).filter((x) => x.s && x.s.attempts > 0)
    : [];

  return (
    <div className="nxd nm-scene" data-scene="cream" data-surface="certification">
      <SmartReturn fallback={{ href: "/neo/", label: "מסך הבית" }} />

      <CatalogHero
        icon={<Award size={14} strokeWidth={1.75} aria-hidden="true" />}
        eyebrow="ידע ולמידה · Self-Assessment"
        title="תרגול ובדיקת ידע"
        lede="הערכת ידע עצמית מתוך התיעוד המאומת של הפרויקט. זו אינה תוכנית הסמכה רשמית של SAP."
        facts={[
          { v: totals.questions, l: "שאלות במאגרים" },
          { v: totals.banks, l: "מאגרים" },
          { v: totals.tables, l: "טבלאות עוגן" },
          { v: totals.types, l: "סוגי שאלה" },
          { v: totals.levels, l: "רמות קושי מצטברות" },
        ]}
      />

      {/* ------------------------------------------ THE THREE QUESTIONS, FIRST */}
      <Sig
        id="ce-setup"
        icon={<Target size={15} strokeWidth={1.75} />}
        title="הגדרת המבחן"
        count={`${bank?.id ?? mod} · רמה ${level} · ${fmt(len)} שאלות`}
        lede="בחרו מאגר ורמה בטבלה, ואחר כך את מספר השאלות. המספר בכל תא הוא מספר השאלות הזמינות ברמה, כולל כל הרמות הקלות ממנה."
      >
        <div className="nxd-mxw">
          <table className="nxd-mx nxd-mx--cards nxd-mx--four">
            <caption className="nx-sr">שאלות זמינות לפי מאגר ולפי רמת קושי, מצטבר</caption>
            <thead>
              <tr>
                <th scope="col">מאגר</th>
                {LEVELS.map((l) => (
                  <th key={l} scope="col"><span className="nxd-mx-lv"><i>{l}</i>{levelHe(l)}</span></th>
                ))}
                <th scope="col">טבלאות עוגן</th>
              </tr>
            </thead>
            <tbody>
              {banks.map((b) => (
                <tr key={b.id}>
                  <th scope="row">
                    <button type="button" aria-pressed={mod === b.id} onClick={() => setMod(b.id)}>
                      <bdi className="nx-sap nxd-mx-id">{b.id}</bdi>
                      <span>{b.he}</span>
                      <b className="nx-sap">{fmt(b.total)}</b>
                    </button>
                  </th>
                  {b.levels.map((l) => {
                    const on = mod === b.id && level === l.level;
                    return (
                      <td key={l.level} data-l={`רמה ${l.level}`}>
                        <button
                          type="button"
                          aria-pressed={on}
                          aria-label={`${b.he} (${b.id}), רמה ${l.level}, ${l.he}: ${fmt(l.n)} שאלות זמינות`}
                          onClick={() => { setMod(b.id); setLevel(l.level); }}
                        >
                          <b className="nx-sap">{fmt(l.n)}</b>
                          <span className="nxd-mx-bar" aria-hidden="true"><i style={{ inlineSize: `${b.total ? (l.n / b.total) * 100 : 0}%` }} /></span>
                        </button>
                      </td>
                    );
                  })}
                  <td data-l="טבלאות עוגן" className="nxd-mx-meta"><span className="nxd-mx-tot"><b>{fmt(b.tables)}</b></span></td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* A phone's cards label a cell by its level number; the names, once. */}
          <p className="nxd-mx-legend">
            רמות:{" "}
            {LEVELS.map((l, i) => (
              <span key={l}>{i ? <>{" "}<span className="nxd-dot" aria-hidden="true">·</span>{" "}</> : null}<b>{l}</b> {levelHe(l)}</span>
            ))}
          </p>
        </div>

        <div className="nxd-setup">
          <div className="nxd-facet" role="group" aria-label="מספר שאלות במבחן">
            <span className="nxd-facet-l">מספר שאלות</span>
            {LENGTHS.map((n) => (
              <button key={n} type="button" className="nu-filter" aria-pressed={len === n} onClick={() => setLen(n)}>
                {fmt(n)} שאלות
              </button>
            ))}
          </div>
          <div className="nxd-go">
            {/* The one red action on the page. */}
            <Link
              href={examHref(mod, level, len)}
              className="nu-btn nxd-start"
              prefetch={false}
              style={{ "--m": "var(--brand)" } as React.CSSProperties}
            >
              התחלת המבחן
              <ArrowLeft size={15} strokeWidth={2} className="nu-arw" aria-hidden="true" />
            </Link>
            <p className="nxd-go-n" aria-live="polite">
              {fmt(len)} שאלות נדגמות מתוך {fmt(avail)} הזמינות במאגר {bank?.he ?? mod} ברמה {level}.
              {" "}הרף הפנימי לעמידה: <bdi>{passPct}%</bdi>.
            </p>
          </div>
        </div>
      </Sig>

      {/* ------------------------------------------------------- YOUR RECORD */}
      <Sig
        id="ce-rec"
        icon={<Award size={15} strokeWidth={1.75} />}
        title="התוצאות שלך"
        count={mounted ? `${fmt(records.length)} מאגרים` : undefined}
        lede="התוצאות נשמרות במכשיר הזה בלבד."
      >
        {records.length ? (
          <div className="nxd-results" data-cols="cert">
            <div className="nxd-table">
              <Cols cols={REC_COLS} />
              <ul className="nxd-list">
                {records.map(({ b, s }) => (
                  <li key={b.id} className="nxd-item">
                    <div className="nxd-row is-flat">
                      <span className="nxd-c" data-k="id">
                        <span className="nxd-lead"><bdi className="nx-sap">{b.id}</bdi> · {b.he}</span>
                      </span>
                      <Cell k="att" l="ניסיונות" sr="ניסיונות "><b className="nx-sap">{fmt(s!.attempts)}</b></Cell>
                      <Cell k="best" l="הציון הגבוה ביותר" sr="הציון הגבוה ביותר "><b className="nx-sap">{fmt(s!.best)}%</b></Cell>
                      <Cell k="mast" l="תשובות נכונות" sr="תשובות נכונות במצטבר "><b className="nx-sap">{fmt(masteryPct(s))}%</b></Cell>
                      <Cell k="seen" l="שאלות שנענו" sr="שאלות שנענו "><b className="nx-sap">{fmt(s!.seen)}</b></Cell>
                      <Cell k="st" l="הרף הפנימי">
                        <span
                          className="nu-status"
                          style={{ "--s": s!.passed ? "var(--status-done)" : "var(--status-in-analysis)" } as React.CSSProperties}
                        >
                          {s!.passed ? "הרף הפנימי הושג" : "הרף הפנימי טרם הושג"}
                        </span>
                        <small>רף של <bdi>{passPct}%</bdi>, כלל של הפרויקט</small>
                      </Cell>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ) : (
          <p className="nxd-empty">
            לא נרשם מבחן במכשיר הזה. התוצאה של כל מבחן שיושלם תופיע כאן; התוצאות נשמרות במכשיר בלבד.
          </p>
        )}
      </Sig>

      {/* ----------------------------------------- THE LONG FORM, ONE TAP AWAY */}
      <details className="nxd-compare">
        <summary>
          מה נמדד ומה אינו נמדד
          <em>היקף ההערכה · {fmt(totals.questions)} שאלות</em>
        </summary>
        <div className="nxd-cmp-b">
          <p>
            ההערכה בודקת שליטה במודל הנתונים המתועד של הפרויקט. היא אינה הסמכה רשמית של SAP
            {" "}ואינה תחליף לה.
          </p>
          <div className="nxd-lanes">
            <section className="nxd-lane" aria-labelledby="ce-yes-h">
              <h3 className="nxd-lane-h" id="ce-yes-h">נמדד בהערכה</h3>
              <ul className="nxd-lane-l">
                <li><Check size={14} strokeWidth={2.2} aria-hidden="true" /><span>{fmt(totals.banks)} מאגרי שאלות שנבנים מהתיעוד הטכני המאומת: ייעוד הטבלה, מפתח ראשי, מפתח זר, JOIN, זרימת נתונים.</span></li>
                <li><Check size={14} strokeWidth={2.2} aria-hidden="true" /><span>שאלות S/4HANA שנגזרות ממפת השפעת המעבר המתועדת בפרויקט.</span></li>
                <li><Check size={14} strokeWidth={2.2} aria-hidden="true" /><span>שאלות פתרון בעיות ותרחישים שנגזרות מקטלוג התקלות.</span></li>
                <li><Check size={14} strokeWidth={2.2} aria-hidden="true" /><span>{fmt(totals.types)} סוגי שאלה ו-{fmt(totals.levels)} רמות קושי מצטברות.</span></li>
                <li><Check size={14} strokeWidth={2.2} aria-hidden="true" /><span>הסבר לכל תשובה נכונה, ובחלק מהשאלות גם הסבר לתשובות השגויות.</span></li>
              </ul>
            </section>
            <section className="nxd-lane" aria-labelledby="ce-no-h">
              <h3 className="nxd-lane-h" id="ce-no-h">אינו כלול בהערכה</h3>
              <ul className="nxd-lane-l">
                <li><Minus size={14} strokeWidth={2.2} aria-hidden="true" /><span>קוד בחינה ונושאי בחינה רשמיים של SAP.</span></li>
                <li><Minus size={14} strokeWidth={2.2} aria-hidden="true" /><span>משקלות נושאים, מספר שאלות רשמי וציון עובר של SAP.</span></li>
                <li><Minus size={14} strokeWidth={2.2} aria-hidden="true" /><span>רישום לבחינה, תעודה או תוקף מול SAP.</span></li>
                <li><Minus size={14} strokeWidth={2.2} aria-hidden="true" /><span>רף המעבר של <bdi>{passPct}%</bdi> הוא כלל פנימי של הפרויקט, לא ציון עובר של SAP.</span></li>
                <li><Minus size={14} strokeWidth={2.2} aria-hidden="true" /><span>מסלול הכנה מומלץ לבחינת SAP.</span></li>
              </ul>
            </section>
          </div>
        </div>
      </details>

      <details className="nxd-compare">
        <summary>
          הרכב המאגרים
          <em>{fmt(totals.banks)} מאגרים · {fmt(totals.tables)} טבלאות עוגן</em>
        </summary>
        <div className="nxd-cmp-b">
          <ul className="nxd-banks">
            {banks.map((b) => (
              <li key={b.id} className="nxd-bank">
                <h3 className="nxd-bank-h"><bdi className="nx-sap">{b.id}</bdi> · {b.he}</h3>
                <p className="nxd-bank-from">{b.from}</p>
                <p className="nxd-bank-kv">
                  <span><b className="nx-sap">{fmt(b.total)}</b> שאלות במאגר</span>
                  {" "}<span className="nxd-dot" aria-hidden="true">·</span>{" "}
                  <span><b className="nx-sap">{fmt(b.tables)}</b> טבלאות עוגן</span>
                </p>
                <RankList
                  label={`התפלגות השאלות במאגר ${b.id} לפי סוג שאלה`}
                  items={b.types.map((tp) => ({ id: tp.id, label: tp.he, n: tp.n }))}
                />
              </li>
            ))}
          </ul>
        </div>
      </details>

      <CatalogFoot
        notes={["המספרים מציינים את גודל המאגר. מבחן בודד דוגם ממנו קבוצת שאלות ומפזר אותה בין סוגי השאלה ובין טבלאות עוגן שונות."]}
      >
        המאגרים נבנים מהתיעוד הטכני המאומת של הפרויקט (<span className="nx-sap">lib/cert/generate.ts</span>);
        {" "}התוצאות נשמרות במכשיר (<span className="nx-sap">neo:cert</span>). הנתונים אינם נקראים ממערכת SAP חיה.
      </CatalogFoot>
    </div>
  );
}
