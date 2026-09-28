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
       how many questions — and ONE action that starts it (design audit
       S7-CERT-2: the selection screen was the focused one, so the entry now
       leads with it);
     · three question banks the project GENERATES from its own verified
       dictionary — table purposes, keys, ER joins, data flow, the S/4HANA
       impact map and the incident catalogue — with their real sizes, their
       real question-type mix and the real number of tables they are anchored
       to, folded behind two disclosures so the long form is one tap away and
       never in the way;
     · the reader's OWN record, read from the device (`neo:cert`), or an
       explicit "nothing recorded yet" when there is none.

   CONTROL LANGUAGE (app/neo/ui.css + app/neo/cert.css)
     .nce-opt    one answer to one of the three questions (shared with the
                 runner through ./cert-pick.tsx).
     .nu-chip    a value — a module, a count. Never clickable.
     .nu-status  dot + word. One use: whether the reader passed a bank, by the
                 project's own rule, which is a real state of their record.
     .nu-btn     the one real action: start the exam with the chosen setup.
     .nu-card    a bank, as a whole region.
     .nu-link    the contextual return at the top of the surface.

   HYDRATION. The certification store reads localStorage inside its snapshot
   getter, so the first client render would not match the server's. The reader's
   own results are therefore gated behind a mounted flag: the server and the
   first client render both draw the "nothing recorded" state, and the real
   record replaces it one tick later.
   ========================================================================== */

import Link from "next/link";
import { useState, useSyncExternalStore } from "react";
import { ArrowLeft, Award, ChevronDown, Database, Info, Layers, ListChecks, Target } from "lucide-react";
import { SmartReturn } from "@/components/neo-shell/nav-context";
import { useCertState, masteryPct } from "@/lib/cert/store";
import type { CertModule, Level } from "@/lib/cert/generate";
import { learnModVar } from "./mod";
import { LENGTHS, LEVELS, MODULES, Opt, Picker, examHref } from "./cert-pick";
import type { CertData } from "./cert-data";

const nf = new Intl.NumberFormat("he-IL");

/* "Are we past hydration yet?" expressed as an external store rather than as a
   setState in an effect. The server snapshot is false and the client snapshot
   is true, which is exactly the signal needed — and unlike the effect version it
   causes no cascading render and trips no lint rule. The subscriber is a no-op
   because the answer never changes again after the first client render. */
const NEVER = () => () => {};
const ON_CLIENT = () => true;
const ON_SERVER = () => false;
const useHydrated = () => useSyncExternalStore(NEVER, ON_CLIENT, ON_SERVER);

export function CertSurface({ data }: { data: CertData }) {
  const { banks, totals, passPct } = data;
  const st = useCertState();
  const mounted = useHydrated();

  /* The three questions, with the runner's own defaults (cert-exam.tsx). */
  const [mod, setMod] = useState<CertModule>("PM");
  const [level, setLevel] = useState<Level>(2);
  const [len, setLen] = useState(20);

  const bank = banks.find((b) => b.id === mod) ?? banks[0];
  const availAt = (l: Level) => bank?.levels.find((x) => x.level === l)?.n ?? 0;
  const avail = availAt(level);

  const records = mounted
    ? banks
      .map((b) => ({ b, s: st.mods[b.id] }))
      .filter((x) => x.s && x.s.attempts > 0)
    : [];

  return (
    <div className="nxl" data-surface="certification">
      <SmartReturn fallback={{ href: "/neo/", label: "מסך הבית" }} />

      <header className="nxl-head">
        <span className="nx-eyebrow">ידע ולמידה</span>
        <h1 className="nx-h1">תרגול ובדיקת ידע</h1>
        <p className="nx-lede">
          הערכת ידע עצמית מתוך התיעוד המאומת של הפרויקט. זו אינה תוכנית הסמכה רשמית של SAP.
        </p>
      </header>

      {/* ------------------------------------------ THE THREE QUESTIONS, FIRST */}
      <section className="nx-card nxb-setup" aria-labelledby="ce-setup">
        <h2 id="ce-setup" className="nxl-sr">הגדרת המבחן</h2>

        <Picker label="מאגר">
          {MODULES.map((m) => {
            const b = banks.find((x) => x.id === m.id);
            return (
              <Opt key={m.id} on={mod === m.id} onClick={() => setMod(m.id)}>
                <b>{m.id}</b>
                <span>{m.he}{b ? ` · ${nf.format(b.total)} שאלות` : ""}</span>
              </Opt>
            );
          })}
        </Picker>

        <Picker label="רמה" hint={`${nf.format(avail)} שאלות זמינות ברמה זו, מצטבר`}>
          {LEVELS.map((l) => (
            <Opt key={l} on={level === l} onClick={() => setLevel(l)}>
              <b>{l}</b>
              <span>{bank?.levels.find((x) => x.level === l)?.he ?? ""}</span>
            </Opt>
          ))}
        </Picker>

        <Picker label="מספר שאלות">
          {LENGTHS.map((n) => (
            <Opt key={n} on={len === n} onClick={() => setLen(n)}>
              <b>{n}</b>
              <span>שאלות</span>
            </Opt>
          ))}
        </Picker>

        <div className="nce-go">
          <Link href={examHref(mod, level, len)} className="nu-btn nxl-primary nce-start" prefetch={false}>
            התחלת המבחן
            <ArrowLeft size={15} strokeWidth={2} className="nu-arw" aria-hidden="true" />
          </Link>
          <span className="nx-muted nxb-setup-n">
            {nf.format(len)} שאלות נדגמות מתוך {nf.format(avail)} הזמינות במאגר {bank?.he ?? mod} ברמה {level}.
            {" "}הרף הפנימי לעמידה: {passPct}%.
          </span>
        </div>
      </section>

      {/* ------------------------------------------------------- YOUR RECORD */}
      <section className="nxv-sec" aria-labelledby="ce-rec">
        <div className="nxv-sec-h">
          <span className="nxv-sec-i" aria-hidden="true"><Award size={16} strokeWidth={1.75} /></span>
          <h2 className="nx-h2" id="ce-rec">התוצאות שלך</h2>
          <em className="nxv-sec-n">{mounted ? nf.format(records.length) : ""}</em>
        </div>

        {records.length ? (
          <ul className="nxb-banks">
            {records.map(({ b, s }) => (
              <li key={b.id} style={{ "--m": learnModVar(b.id), display: "grid" } as React.CSSProperties}>
                <div className="nx-card nxb-bank">
                  <div className="nxb-bank-h">
                    <b>{b.id}</b>
                    <span>{b.he}</span>
                  </div>
                  <div className="nxb-kv">
                    <div><span>ניסיונות</span><b>{nf.format(s!.attempts)}</b></div>
                    <div><span>הציון הגבוה ביותר</span><b>{nf.format(s!.best)}%</b></div>
                    <div><span>תשובות נכונות (מצטבר)</span><b>{nf.format(masteryPct(s))}%</b></div>
                    <div><span>שאלות שנענו</span><b>{nf.format(s!.seen)}</b></div>
                  </div>
                  <span
                    className="nu-status"
                    style={{ "--s": s!.passed ? "var(--status-done)" : "var(--status-in-analysis)" } as React.CSSProperties}
                  >
                    {s!.passed ? `הרף הפנימי הושג (${passPct}%)` : `הרף הפנימי טרם הושג (${passPct}%)`}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="nx-muted nxb-none-l">
            לא נרשם מבחן במכשיר הזה. התוצאה של כל מבחן שיושלם תופיע כאן; התוצאות נשמרות במכשיר בלבד.
          </p>
        )}
      </section>

      {/* ----------------------------------------- THE LONG FORM, ONE TAP AWAY */}
      <details className="nxl-more">
        <summary>
          <ChevronDown size={15} strokeWidth={2} aria-hidden="true" />
          מה נמדד ומה אינו נמדד
          <em>היקף ההערכה · {nf.format(totals.questions)} שאלות</em>
        </summary>
        <div className="nxl-more-b">
          <section className="nxb-claim" aria-labelledby="ce-claim">
            <span className="nx-eyebrow">היקף ההערכה</span>
            <h3 id="ce-claim">מה נמדד ומה אינו נמדד</h3>
            <p>
              ההערכה בודקת שליטה במודל הנתונים המתועד של הפרויקט. היא אינה הסמכה רשמית של SAP
              {" "}ואינה תחליף לה.
            </p>
            <div className="nxb-two">
              <div className="nxb-yes">
                <h4>נמדד בהערכה</h4>
                <ul>
                  <li>{nf.format(totals.banks)} מאגרי שאלות שנבנים מהתיעוד הטכני המאומת: ייעוד הטבלה, מפתח ראשי, מפתח זר, JOIN, זרימת נתונים.</li>
                  <li>שאלות S/4HANA שנגזרות ממפת השפעת המעבר המתועדת בפרויקט.</li>
                  <li>שאלות פתרון בעיות ותרחישים שנגזרות מקטלוג התקלות.</li>
                  <li>{nf.format(totals.types)} סוגי שאלה ו-{nf.format(totals.levels)} רמות קושי מצטברות.</li>
                  <li>הסבר לכל תשובה נכונה, ובחלק מהשאלות גם הסבר לתשובות השגויות.</li>
                </ul>
              </div>
              <div className="nxb-no">
                <h4>אינו כלול בהערכה</h4>
                <ul>
                  <li>קוד בחינה ונושאי בחינה רשמיים של SAP.</li>
                  <li>משקלות נושאים, מספר שאלות רשמי וציון עובר של SAP.</li>
                  <li>רישום לבחינה, תעודה או תוקף מול SAP.</li>
                  <li>רף המעבר של {passPct}% הוא כלל פנימי של הפרויקט, לא ציון עובר של SAP.</li>
                  <li>מסלול הכנה מומלץ לבחינת SAP.</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="nx-card nxl-stats" aria-label="סיכום ההערכה">
            {[
              { v: totals.questions, l: "שאלות במאגרים", i: <ListChecks size={14} strokeWidth={1.75} /> },
              { v: totals.banks, l: "מאגרים", i: <Layers size={14} strokeWidth={1.75} /> },
              { v: totals.tables, l: "טבלאות עוגן", i: <Database size={14} strokeWidth={1.75} /> },
              { v: totals.types, l: "סוגי שאלה", i: <Target size={14} strokeWidth={1.75} /> },
              { v: totals.levels, l: "רמות קושי", i: <Award size={14} strokeWidth={1.75} /> },
            ].map((s) => (
              <div key={s.l} className="nxl-stat">
                <span className="nxl-stat-i" aria-hidden="true">{s.i}</span>
                <b>{nf.format(s.v)}</b>
                <span>{s.l}</span>
              </div>
            ))}
          </section>
        </div>
      </details>

      <details className="nxl-more">
        <summary>
          <ChevronDown size={15} strokeWidth={2} aria-hidden="true" />
          הרכב המאגרים
          <em>{nf.format(totals.banks)} מאגרים · {nf.format(totals.tables)} טבלאות עוגן</em>
        </summary>
        <div className="nxl-more-b">
          <ul className="nxb-banks">
            {banks.map((b) => {
              const max = Math.max(...b.types.map((t) => t.n), 1);
              return (
                <li key={b.id} style={{ "--m": learnModVar(b.id), display: "grid" } as React.CSSProperties}>
                  <div className="nx-card nxb-bank">
                    <div className="nxb-bank-h">
                      <b>{b.id}</b>
                      <span>{b.he}</span>
                    </div>
                    <p className="nx-muted">{b.from}</p>

                    <div className="nxb-kv">
                      <div><span>שאלות במאגר</span><b>{nf.format(b.total)}</b></div>
                      <div><span>טבלאות עוגן</span><b>{nf.format(b.tables)}</b></div>
                    </div>

                    <div>
                      <span className="nxv-l">התפלגות לפי סוג שאלה</span>
                      <div className="nxb-dist">
                        {b.types.map((t) => (
                          <div className="nxb-dist-r" key={t.id}>
                            <span>{t.he}</span>
                            <span className="nxb-dist-t">
                              <span className="nxb-dist-f" style={{ "--p": t.n / max } as React.CSSProperties} />
                            </span>
                            <span className="nxb-dist-n">{nf.format(t.n)}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <span className="nxv-l">שאלות זמינות לפי רמה (מצטבר)</span>
                      <div className="nxv-chips">
                        {b.levels.map((l) => (
                          <span key={l.level} className="nu-chip">
                            {l.level} · {l.he} · {nf.format(l.n)}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </details>

      <div className="nxl-foot">
        <p className="nxv-src">
          <Info size={13} strokeWidth={1.75} aria-hidden="true" />
          <span>
            המאגרים נבנים מהתיעוד הטכני המאומת של הפרויקט (<span className="nx-sap">lib/cert/generate.ts</span>);
            {" "}התוצאות נשמרות במכשיר (<span className="nx-sap">neo:cert</span>). הנתונים אינם נקראים ממערכת SAP חיה.
          </span>
        </p>
        <p>
          המספרים מציינים את גודל המאגר. מבחן בודד דוגם ממנו קבוצת שאלות ומפזר אותה בין סוגי השאלה
          {" "}ובין טבלאות עוגן שונות.
        </p>
      </div>
    </div>
  );
}
