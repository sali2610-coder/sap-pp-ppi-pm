"use client";

/* ============================================================================
   PROJECT NEO · /neo/certification — an honest assessment surface.
   ----------------------------------------------------------------------------
   The brief for this screen was the hardest of the four, and the answer is a
   refusal: this project does not hold an SAP certification syllabus, so this
   page does not draw one. No exam code, no official topic weighting, no
   official question count, no pass mark borrowed from SAP, no booking flow.

   What it draws instead is what genuinely exists:
     · three question banks the project GENERATES from its own verified
       dictionary — table purposes, keys, ER joins, data flow, the S/4HANA
       impact map and the incident catalogue — with their real sizes, their
       real question-type mix and the real number of tables they are anchored
       to;
     · the reader's OWN record, read from the device (`neo:cert`), or an
       explicit "nothing recorded yet" when there is none;
     · one real destination — the assessment centre that already runs these
       banks — and nothing that pretends to be one.

   CONTROL LANGUAGE (app/neo/ui.css)
     .nu-chip    a value — a module, a count. Never clickable.
     .nu-status  dot + word. One use: whether the reader passed a bank, by the
                 project's own rule, which is a real state of their record.
     .nu-btn     the one real action: open the assessment centre.
     .nu-card    a bank, as a whole region.
     .nu-link    the contextual return at the top of the surface.

   HYDRATION. The certification store reads localStorage inside its snapshot
   getter, so the first client render would not match the server's. The reader's
   own results are therefore gated behind a mounted flag: the server and the
   first client render both draw the "nothing recorded" state, and the real
   record replaces it one tick later.
   ========================================================================== */

import Link from "next/link";
import { useSyncExternalStore } from "react";
import { ArrowLeft, Award, Database, Info, Layers, ListChecks, Target } from "lucide-react";
import { SmartReturn } from "@/components/neo-shell/nav-context";
import { useCertState, masteryPct } from "@/lib/cert/store";
import { learnModVar } from "./mod";
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
  const { banks, totals, passPct, examHref } = data;
  const st = useCertState();
  const mounted = useHydrated();

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
        <h1 className="nx-h1">הסמכה</h1>
        <p className="nx-lede">
          לפרויקט אין תוכנית הסמכה רשמית של SAP, ולכן העמוד הזה אינו מציג אחת. מה שכן קיים כאן הוא מנגנון
          {" "}הערכה עצמית שנבנה מהנתונים המאומתים של הפרויקט: {nf.format(totals.questions)} שאלות שנגזרות
          {" "}מ-{nf.format(totals.tables)} טבלאות במילון, מקשרי ה-ER שלהן, ממפת ההשפעה של S/4HANA ומקטלוג התקלות.
        </p>
      </header>

      {/* ---------------------------------------------- WHAT IS AND IS NOT HERE */}
      <section className="nxb-claim" aria-labelledby="ce-claim">
        <span className="nx-eyebrow">ההצהרה</span>
        <h2 id="ce-claim">מה נמדד כאן, ומה לא</h2>
        <p>
          ההבחנה הזו חשובה יותר מכל ציון: מנגנון פנימי שבודק שליטה במילון הנתונים של הפרויקט אינו הסמכה,
          {" "}ולא נכון להציג אותו כאילו הוא כזו.
        </p>
        <div className="nxb-two">
          <div className="nxb-yes">
            <h3>קיים בפרויקט, ונמדד</h3>
            <ul>
              <li>{nf.format(totals.banks)} מאגרי שאלות שנבנים מהמילון המאומת: מטרת הטבלה, מפתח ראשי, מפתח זר, JOIN, זרימת נתונים.</li>
              <li>שאלות S/4HANA שנגזרות ממפת ההשפעה של הפרויקט, ולא מנוסח מבחן.</li>
              <li>שאלות פתרון תקלות ותרחישים שנגזרות מקטלוג התקלות עצמו.</li>
              <li>{nf.format(totals.types)} סוגי שאלה ו-{nf.format(totals.levels)} רמות קושי, מצטברות.</li>
              <li>תיעוד מלא לכל תשובה: למה היא נכונה ולמה האחרות לא.</li>
            </ul>
          </div>
          <div className="nxb-no">
            <h3>אינו קיים, ולכן אינו מוצג</h3>
            <ul>
              <li>אין קוד בחינה רשמי של SAP ואין נושאי בחינה רשמיים.</li>
              <li>אין משקלות נושאים, אין מספר שאלות רשמי ואין ציון עובר של SAP.</li>
              <li>אין רישום לבחינה, אין תעודה ואין תוקף מול SAP.</li>
              <li>הרף של {passPct}% הוא כלל פנימי של הפרויקט בלבד.</li>
              <li>אין מסלול הכנה מומלץ: לא הומצא אחד.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="nx-card nxl-stats" aria-label="מספרי מנגנון ההערכה">
        {[
          { v: totals.questions, l: "שאלות שנוצרות", i: <ListChecks size={14} strokeWidth={1.75} /> },
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

      {/* ------------------------------------------------------- YOUR RECORD */}
      <section className="nxv-sec" aria-labelledby="ce-rec">
        <div className="nxv-sec-h">
          <span className="nxv-sec-i" aria-hidden="true"><Award size={16} strokeWidth={1.75} /></span>
          <h2 className="nx-h2" id="ce-rec">התוצאות שלך</h2>
          <em className="nxv-sec-n">{mounted ? nf.format(records.length) : "—"}</em>
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
                    <div><span>הציון הגבוה שלך</span><b>{nf.format(s!.best)}%</b></div>
                    <div><span>שליטה מתגלגלת</span><b>{nf.format(masteryPct(s))}%</b></div>
                    <div><span>שאלות שנענו</span><b>{nf.format(s!.seen)}</b></div>
                  </div>
                  <span
                    className="nu-status"
                    style={{ "--s": s!.passed ? "var(--status-done)" : "var(--status-in-analysis)" } as React.CSSProperties}
                  >
                    {s!.passed ? `עברת את הרף הפנימי (${passPct}%)` : `טרם עברת את הרף הפנימי (${passPct}%)`}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="nx-card nxl-none">
            <p><b>עוד לא נרשמה אף בחינה במכשיר הזה</b></p>
            <p className="nx-muted">
              אין כאן ציון התחלתי, אין דירוג ואין אחוז שליטה: כי אין מה למדוד עדיין. ברגע שתסיים מבחן
              {" "}במרכז ההערכה, התוצאה תופיע כאן. הנתונים נשמרים על המכשיר בלבד ואינם נשלחים לשום מקום.
            </p>
            <div className="nxl-none-a">
              <Link href={examHref} className="nu-btn nxl-primary" prefetch={false}>
                פתח את מרכז ההערכה
                <ArrowLeft size={14} strokeWidth={2} className="nu-arw" aria-hidden="true" />
              </Link>
            </div>
          </div>
        )}
      </section>

      {/* -------------------------------------------------------- THE BANKS */}
      <section className="nxv-sec" aria-labelledby="ce-banks">
        <div className="nxv-sec-h">
          <span className="nxv-sec-i" aria-hidden="true"><ListChecks size={16} strokeWidth={1.75} /></span>
          <h2 className="nx-h2" id="ce-banks">מה בדיוק יש בכל מאגר</h2>
          <em className="nxv-sec-n">{nf.format(totals.banks)}</em>
        </div>

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
                    <span className="nxv-l">כמה שאלות זמינות בכל רמה (מצטבר)</span>
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
      </section>

      <div className="nxl-foot">
        <p className="nxv-src">
          <Info size={13} strokeWidth={1.75} aria-hidden="true" />
          <span>
            המאגרים נבנים בזמן ריצה מ-<span className="nx-sap">lib/cert/generate.ts</span> על גבי המילון המאומת;
            {" "}התוצאות נשמרות ב-<span className="nx-sap">neo:cert</span> על המכשיר. שום נתון אינו מגיע ממערכת SAP חיה.
          </span>
        </p>
        <p>
          המספרים כאן הם גודל המאגר, לא גודל מבחן: מבחן בודד דוגם ממנו קבוצת שאלות ומפזר אותה בין סוגי השאלה
          {" "}ובין טבלאות עוגן שונות.
        </p>
      </div>
    </div>
  );
}
