// Project NEO · the object PROFILE — two sections at the foot of an object page.
//
// SERVER component. Renders object-profile.ts: the consultant layer the legacy
// object page carried on its default tab and behind its other tabs. It sits
// AFTER the dictionary sections on purpose — the first screen of an object page
// stays the record itself — and it wears the page's own section chrome (.no-sec,
// .no-h3, .no-kv, .nox-chip), so it reads as more of the same page and not as a
// second product. Long secondary blocks are native <details>: they stay in the
// HTML and out of the way.

import Link from "next/link";
import {
  BadgeCheck, ChevronDown, ClipboardCheck, Compass, GraduationCap, Lightbulb,
  Link2, RefreshCw, Sigma, Users, Wrench,
} from "lucide-react";
import { LEVEL_HE, hasKnowledge, type ObjectProfile, type PLink } from "./object-profile";

/** A SECTION of an object page: numbered, its icon in the object's class hue,
 *  one h2 and one sentence of orientation. The blueprint page, the supplemental
 *  page and the profile all build their sections with it, and each page builds
 *  its jump nav from the same list that numbers them, so the two cannot drift. */
export function Sec({
  id, n, icon, eyebrow, title, lede, children,
}: {
  id: string;
  n: number;
  icon: React.ReactNode;
  eyebrow: string;
  title: string;
  lede?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    // nm-rise + nm-once, from app/neo/motion.css: an 8px rise scrubbed on
    // .nx-canvas's view timeline, finished while the section is still entering,
    // so it never replays on the way back up.
    <section className="no-sec nm-rise nm-once" id={id} aria-labelledby={`${id}-h`}>
      <header className="no-sec-h">
        <span className="no-sec-n" aria-hidden="true">{String(n).padStart(2, "0")}</span>
        <p className="no-sec-k">
          <span className="no-sec-ico" aria-hidden="true">{icon}</span>
          {eyebrow}
        </p>
        <h2 className="no-h2" id={`${id}-h`}>{title}</h2>
        {lede ? <p className="no-sec-s">{lede}</p> : null}
      </header>
      <div className="no-sec-b">{children}</div>
    </section>
  );
}

/** Identifiers as chips: a destination when NEO generates the page, a value
 *  when it does not. */
export function PChips({ items }: { items: PLink[] }) {
  return (
    <div className="nox-chips">
      {items.map((l) => {
        const body = (
          <>
            <b className="nx-sap" dir="ltr">{l.t}</b>
            {l.sub ? <em>{l.sub}</em> : null}
          </>
        );
        return l.href ? (
          <Link key={l.t} className="nox-chip" href={l.href} prefetch={false} data-live="1">{body}</Link>
        ) : (
          <span key={l.t} className="nox-chip" data-live="0">{body}</span>
        );
      })}
    </div>
  );
}

function List({ items }: { items: string[] }) {
  return <ul className="nop-list">{items.map((x) => <li key={x}>{x}</li>)}</ul>;
}

/** A labelled list inside a block, or nothing when the source holds none. */
function Group({ label, items }: { label: string; items: string[] }) {
  if (!items.length) return null;
  return (
    <div className="nop-g">
      <h4 className="nop-h4">{label}</h4>
      <List items={items} />
    </div>
  );
}

/** Which profile sections a page will render, in order — for its jump nav. */
export const profileNav = (p: ObjectProfile): [string, string][] => [
  ["no-prof", "פרופיל האובייקט"],
  ...(hasKnowledge(p) ? [["no-know", "ידע יועץ ובדיקות"] as [string, string]] : []),
];

export function ProfileSections({ p, num }: { p: ObjectProfile; num: Record<string, number> }) {
  const u = p.usage;
  const a = p.actors;
  const qa = p.qa;
  const cn = p.consult;

  return (
    <>
      {/* ==================================================== PROFILE */}
      <Sec
        id="no-prof"
        n={num["no-prof"]}
        icon={<Compass size={16} strokeWidth={1.75} />}
        eyebrow="פרופיל האובייקט"
        title="שימוש עסקי, תפקידים ומחזור חיים"
        lede="שכבת הידע של הפרויקט על האובייקט: למה הוא קיים, מתי משתמשים בו ומי יוצר, צורך ומעדכן אותו. התקציר בראש הקטע מורכב מערכי המאגר."
      >
        <div className="nop-sum">
          <p className="no-quote">{p.summary}</p>
          <p className="no-note">
            <Sigma size={13} strokeWidth={1.75} aria-hidden="true" />
            תקציר נגזר אוטומטית מהמאגר · לא תוכן מאומת ידנית
          </p>
        </div>

        {u ? (
          <div className="nop-blk">
            <h3 className="no-h3">
              <Lightbulb size={14} strokeWidth={1.75} aria-hidden="true" />
              שימוש עסקי
            </h3>
            {u.role ? <p className="nop-role">{u.role}</p> : null}
            {u.why ? <p className="nop-why">{u.why}</p> : null}
            <dl className="no-kv">
              {u.whenUsed ? (<div><dt>מתי משתמשים</dt><dd>{u.whenUsed}</dd></div>) : null}
              {p.topics.length ? (<div><dt>מיקום בתהליך</dt><dd>{p.topics.join(" · ")}</dd></div>) : null}
              {u.step ? (<div><dt>צעד בתהליך</dt><dd>{u.step}</dd></div>) : null}
              {p.fioriMore.length ? (
                <div><dt>יישום Fiori ברשומת תיעוד נוספת</dt><dd>{p.fioriMore.join(" · ")}</dd></div>
              ) : null}
              {u.importance ? (<div><dt>משקל בלמידה</dt><dd>{u.importance}</dd></div>) : null}
              {u.s4 ? (<div><dt>ECC ↔ S/4</dt><dd>{u.s4}</dd></div>) : null}
            </dl>
            <Group label="תרחישים טיפוסיים" items={p.scenarios} />
            <p className="no-note">
              <BadgeCheck size={13} strokeWidth={1.75} aria-hidden="true" />
              {p.provenance}{u.trust ? ` · ${u.trust}` : ""}
            </p>
          </div>
        ) : null}

        <div className="nop-blk">
          <h3 className="no-h3">
            <Users size={14} strokeWidth={1.75} aria-hidden="true" />
            מי עובד עם האובייקט
          </h3>
          <div className="nop-flow">
            <div className="nop-col">
              <h4 className="nop-h4">מה יוצר / מזין</h4>
              {p.feeds.length ? (
                <PChips items={p.feeds} />
              ) : (
                <p className="no-none"><b>נקודת התחלה</b>: אין במאגר אובייקט שמזין אותו.</p>
              )}
              {a.creates.length ? <List items={a.creates} /> : null}
            </div>
            <div className="nop-col">
              <h4 className="nop-h4">מי צורך / משתמש</h4>
              {p.consumers.length ? (
                <PChips items={p.consumers} />
              ) : (
                <p className="no-none"><b>נקודת סיום</b>: אין במאגר אובייקט שתלוי בו.</p>
              )}
              {a.reads.length ? <List items={a.reads} /> : null}
            </div>
            <div className="nop-col">
              <h4 className="nop-h4">מעדכנים</h4>
              {a.updates.length ? <List items={a.updates} /> : <p className="no-none">אין במאגר.</p>}
            </div>
          </div>
          {!a.specific ? (
            <p className="no-note">תפקידים גנריים נגזרים מהמודול — לא מאומת-ספציפי.</p>
          ) : null}
        </div>

        {p.lifecycle ? (
          <div className="nop-blk">
            <h3 className="no-h3">
              <RefreshCw size={14} strokeWidth={1.75} aria-hidden="true" />
              מחזור חיים · {p.lifecycle.label}
            </h3>
            <ol className="nop-life">
              {p.lifecycle.steps.map((s, i) => (
                <li key={s}><span className="nox-step-n" aria-hidden="true">{i + 1}</span>{s}</li>
              ))}
            </ol>
            <p className="no-note">{p.lifecycle.note}</p>
          </div>
        ) : null}
      </Sec>

      {/* ================================================== KNOWLEDGE */}
      {hasKnowledge(p) ? (
        <Sec
          id="no-know"
          n={num["no-know"]}
          icon={<ClipboardCheck size={16} strokeWidth={1.75} />}
          eyebrow="ידע יועץ"
          title="הערות יועץ, בדיקות ושאלות אימות"
          lede="מה בודקים כשעובדים עם האובייקט: הערות היועץ, היחסים והאינטגרציות שחייבים להחזיק, תרחישי הרגרסיה שהתקלות המתועדות מלמדות, ושאלות לאימות ידע."
        >
          {cn ? (
            <div className="nop-blk">
              <h3 className="no-h3">
                <Lightbulb size={14} strokeWidth={1.75} aria-hidden="true" />
                הערות יועץ
                {cn.verify ? <span className="nop-flag">נדרש אימות</span> : null}
              </h3>
              <div className="nop-grid">
                <Group label="טעויות נפוצות" items={cn.mistakes} />
                <Group label="גישת דיבוג" items={cn.debug} />
                <Group label="הערות יועץ פונקציונלי" items={cn.fnNotes} />
                <Group label="הערות יועץ טכני / ABAP" items={cn.techNotes} />
              </div>
            </div>
          ) : null}

          {p.tips.length ? (
            <div className="nop-blk">
              <h3 className="no-h3">
                <Wrench size={14} strokeWidth={1.75} aria-hidden="true" />
                טיפים לפתרון תקלות
              </h3>
              <List items={p.tips} />
              <p className="no-note">טיפים ספציפיים לאובייקט</p>
            </div>
          ) : null}

          {qa.mustExist.length || qa.integ.length || qa.regression.length ? (
            <div className="nop-blk">
              <h3 className="no-h3">
                <ClipboardCheck size={14} strokeWidth={1.75} aria-hidden="true" />
                בדיקות · QA
              </h3>
              {qa.mustExist.length ? (
                <div className="nop-g">
                  <h4 className="nop-h4">יחסים שחייבים להתקיים</h4>
                  <ul className="nop-rels">
                    {qa.mustExist.map((r) => (
                      <li key={r.t}>
                        {r.href ? (
                          <Link className="nx-sap nu-link" href={r.href} prefetch={false} dir="ltr">{r.t}</Link>
                        ) : (
                          <b className="nx-sap" dir="ltr">{r.t}</b>
                        )}
                        {r.card ? <span className="nop-card nx-sap" dir="ltr">{r.card}</span> : null}
                        {r.desc ? <span>{r.desc}</span> : null}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
              <Group label="נקודות אינטגרציה לבדיקה" items={qa.integ} />
              <Group label="תרחישי רגרסיה" items={qa.regression} />
            </div>
          ) : null}

          {p.interview.length ? (
            <div className="nop-blk">
              <h3 className="no-h3">
                <GraduationCap size={14} strokeWidth={1.75} aria-hidden="true" />
                שאלות אימות ידע
              </h3>
              <ul className="nop-iq">
                {p.interview.map((q) => (
                  <li key={q.q}>
                    {q.a ? (
                      <details className="no-more">
                        <summary>
                          <span className="nop-lvl" dir="ltr">{LEVEL_HE[q.level]}</span>
                          <span className="nop-q">{q.q}</span>
                          <ChevronDown size={15} strokeWidth={1.75} aria-hidden="true" />
                        </summary>
                        <p className="nop-a">{q.a}</p>
                      </details>
                    ) : (
                      <p className="nop-qflat">
                        <span className="nop-lvl" dir="ltr">{LEVEL_HE[q.level]}</span>
                        <span className="nop-q">{q.q}</span>
                      </p>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {p.conn.s4 || p.conn.migration.length || p.conn.bw.length ? (
            <details className="no-more">
              <summary>
                <Link2 size={14} strokeWidth={1.75} aria-hidden="true" />
                אובייקט מקושר · S/4 · הגירה · BW
                <em>מקטלוג ה-S/4, קוקפיט ההגירה ומודל ה-BW של הפרויקט</em>
                <ChevronDown size={15} strokeWidth={1.75} aria-hidden="true" />
              </summary>
              <dl className="no-kv nop-more-b">
                {p.conn.s4 ? (<div><dt>קטלוג S/4</dt><dd><b>{p.conn.s4.label}</b>{p.conn.s4.sub ? ` · ${p.conn.s4.sub}` : ""}</dd></div>) : null}
                {p.conn.migration.length ? (
                  <div><dt>אובייקטי הגירה</dt><dd>{p.conn.migration.map((m) => <span key={m.label + m.sub} className="nop-conn">{m.label}<em>{m.sub}</em></span>)}</dd></div>
                ) : null}
                {p.conn.bw.length ? (
                  <div><dt>אובייקטי BW</dt><dd>{p.conn.bw.map((m) => <span key={m.label + m.sub} className="nop-conn">{m.label}<em>{m.sub}</em></span>)}</dd></div>
                ) : null}
              </dl>
            </details>
          ) : null}
        </Sec>
      ) : null}
    </>
  );
}
