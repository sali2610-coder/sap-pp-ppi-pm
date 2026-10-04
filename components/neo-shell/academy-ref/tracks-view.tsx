/* ============================================================================
   PROJECT NEO · /neo/academy/tracks — the learning tracks, read inside NEO.
   ----------------------------------------------------------------------------
   Server components. The only client code on these pages is <SmartReturn/>;
   every value was resolved by ./tracks-data at build time.

   The old track screen showed one step at a time behind a course map. Here
   every step is its own section, in order, with what the old screen derived
   for it: the step's point, the consultant note, ECC vs S/4HANA, and behind a
   native <details> the organisation scenario, the interview question and the
   related objects. Composition and classes are the academy's own
   (app/neo/learn.css: .nxl directory, .nxv detail, .nxc course map).
   ========================================================================== */

import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import {
  ArrowLeft, Award, BookOpen, Boxes, ChevronDown, Clock, Compass, Factory, Info,
  Layers, ListOrdered, ShieldCheck, Workflow, Wrench,
} from "lucide-react";
import { SmartReturn } from "@/components/neo-shell/nav-context";
import { learnModVar } from "@/components/neo-shell/learn/mod";
import {
  TRACKS_HREF,
  type TrackLink, type TrackPage, type TrackRef, type TrackStatus, type TrackStep, type TracksIndex,
} from "./tracks-data";

const CAT_ICON: Record<string, ReactNode> = {
  onboarding: <Compass size={16} strokeWidth={1.75} />,
  pm: <Wrench size={16} strokeWidth={1.75} />,
  pppi: <Factory size={16} strokeWidth={1.75} />,
  qa: <ShieldCheck size={16} strokeWidth={1.75} />,
};

const modStyle = (mod?: string) => ({ "--m": learnModVar(mod) }) as CSSProperties;

function Status({ st }: { st: TrackStatus }) {
  return <span className="nu-status" style={{ "--s": st.s } as CSSProperties}>{st.he}</span>;
}

/** A NEO page link of 44px, or the label as a value when no page exists. */
function Go({ l, icon }: { l: TrackLink; icon: ReactNode }) {
  return l.href ? (
    <Link className="nu-card nxv-ref" href={l.href} prefetch={false}>
      {icon}
      {l.label}
      <ArrowLeft size={13} strokeWidth={2} aria-hidden="true" />
    </Link>
  ) : (
    <span className="nu-chip">{l.label}</span>
  );
}

function Refs({ items }: { items: TrackRef[] }) {
  return (
    <div className="nxs-refs">
      {items.map((r) =>
        r.href ? (
          <Link key={r.code} className="nu-card nxv-ref" href={r.href} prefetch={false}>
            <b>{r.code}</b>
          </Link>
        ) : (
          <span key={r.code} className="nu-chip is-sap" dir="ltr">{r.code}</span>
        ),
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ index */

export function TracksIndexView({ d }: { d: TracksIndex }) {
  return (
    <div className="nxl" data-surface="tracks">
      <SmartReturn fallback={{ href: "/neo/academy/", label: "SAP Academy" }} />

      <header className="nxl-head">
        <span className="nx-eyebrow">SAP Academy</span>
        <h1 className="nx-h1 nx-display">מסלולי למידה</h1>
        <p className="nx-lede">{d.totals.tracks} מסלולים · {d.totals.units} יחידות</p>
        <p className="nx-lede">
          מסלולים מסודרים לפי תחום. כל מסלול מציג את כל יחידות הלימוד שלו בעמוד אחד, עם הערת היועץ, השינוי ב-S/4HANA והאובייקטים הקשורים לכל יחידה.
        </p>
      </header>

      {d.categories.map((c) => (
        <section key={c.id} className="nxv-sec" aria-labelledby={`tr-${c.id}`} style={modStyle(c.mod)}>
          <div className="nxv-sec-h">
            <span className="nxv-sec-i" aria-hidden="true">{CAT_ICON[c.id] ?? <Layers size={16} strokeWidth={1.75} />}</span>
            <h2 className="nx-h2" id={`tr-${c.id}`}>{c.he}</h2>
          </div>
          <p className="nxv-lede">{c.sub}</p>
          <div className="nxv-meta">
            <span className="nu-chip">{c.tracks.length === 1 ? "מסלול אחד" : `${c.tracks.length} מסלולים`}</span>
            <span className="nu-chip">{c.units} יחידות</span>
            {c.hours > 0 ? <span className="nu-chip"><Clock size={11} strokeWidth={1.75} />~{c.hours} שעות</span> : null}
            <span className="nu-chip">רמה רווחת · {c.level}</span>
          </div>
          <ul className="nxl-courses">
            {c.tracks.map((t) => (
              <li key={t.id} style={{ display: "grid" }}>
                <Link href={t.href} className="nu-card nxl-course" prefetch={false}>
                  <span className="nxl-course-h">
                    {t.level ? <span className="nxl-course-k"><span className="nu-chip">{t.level}</span></span> : null}
                    <h3 className="nxl-course-t">{t.he}</h3>
                    <span className="nxl-desc">{t.sub}</span>
                  </span>
                  <span className="nxl-course-n">
                    <span className="nxl-num"><b>{t.units}</b><span>יחידות</span></span>
                    <span className="nxl-num"><b>{t.objects}</b><span>אובייקטים</span></span>
                    {t.durationHe ? <span className="nxl-num"><b data-text="1">{t.durationHe}</b><span>זמן משוער</span></span> : null}
                  </span>
                  <span className="nxl-course-a nxl-course-go">
                    פתיחת המסלול
                    <ArrowLeft size={14} strokeWidth={2} aria-hidden="true" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}

      <section className="nxv-sec" aria-labelledby="tr-more">
        <div className="nxv-sec-h">
          <span className="nxv-sec-i" aria-hidden="true"><Award size={16} strokeWidth={1.75} /></span>
          <h2 className="nx-h2" id="tr-more">עוד באקדמיה</h2>
        </div>
        <ul className="nxl-courses">
          {[
            { l: d.cert, desc: <>מבחני ידע טכני אקראיים (<span className="nx-sap" dir="ltr">PM · PP-PI · PP</span>) · ציון מעבר 80 · תג יועץ מוסמך</> },
            { l: d.story, desc: <>תהליך אחזקה ופקודת תהליך — מקצה לקצה, בהקשר עסקי מלא</> },
          ].map(({ l, desc }) => (
            <li key={l.label} style={{ display: "grid" }}>
              {l.href ? (
                <Link href={l.href} className="nu-card nxl-course" prefetch={false}>
                  <span className="nxl-course-h">
                    <h3 className="nxl-course-t">{l.label}</h3>
                    <span className="nxl-desc">{desc}</span>
                  </span>
                  <span className="nxl-course-a nxl-course-go">
                    פתיחה
                    <ArrowLeft size={14} strokeWidth={2} aria-hidden="true" />
                  </span>
                </Link>
              ) : null}
            </li>
          ))}
        </ul>
      </section>

      <div className="nxl-foot">
        <p>
          מקור: מסלולי הלמידה של האקדמיה (<span className="nx-sap" dir="ltr">data/learn/paths</span>).
          {" "}השעות לתחום הן סכום הזמן המשוער שהמסלולים בו מצהירים, ו«רמה רווחת» היא הרמה שרוב המסלולים בו מצהירים.
        </p>
        <p>ההתקדמות במסלולים נשמרה בגרסה הקודמת במכשיר בלבד ואינה מוצגת כאן.</p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ track */

function StepSection({ s, total }: { s: TrackStep; total: number }) {
  const more = [
    s.scenario ? "המציאות בארגון" : "",
    s.interview ? "שאלת ראיון נפוצה" : "",
    s.related.length ? `${s.related.length} אובייקטים קשורים` : "",
  ].filter(Boolean);

  return (
    <section className="nxv-sec" id={s.id} aria-labelledby={`${s.id}-h`}>
      <div className="nxv-sec-h">
        <span className="nxv-sec-i nx-sap" aria-hidden="true">{s.n}</span>
        <h2 className="nx-h2" id={`${s.id}-h`}>{s.title}</h2>
      </div>
      <div className="nxv-meta">
        <span className="nu-chip">יחידה {s.n} מתוך {total}</span>
        {s.object ? <span className="nu-chip is-sap" dir="ltr">{s.object}</span> : null}
        <span className="nu-chip">{s.importance}</span>
        {s.module ? (
          <span className="nu-chip nxv-mod" style={modStyle(s.module)}><i aria-hidden="true" />{s.module}</span>
        ) : null}
      </div>

      <div className="nxv-grid">
        <div className="nxv-fact">
          <h3 className="nxv-sub">עיקר היחידה</h3>
          <p className="nxv-v">{s.why}</p>
        </div>
        {s.knowledge ? (
          <div className="nxv-fact">
            <h3 className="nxv-sub">הערת יועץ — מה לזכור</h3>
            <p className="nxv-v">{s.knowledge.role}</p>
            {s.knowledge.when ? <p className="nxv-v"><b>מתי: </b>{s.knowledge.when}</p> : null}
            <div className="nxv-meta"><Status st={s.knowledge.trust} /></div>
          </div>
        ) : null}
        {s.s4 ? (
          <div className="nxv-fact">
            <h3 className="nxv-sub"><span dir="ltr">ECC</span> מול <span dir="ltr">S/4HANA</span></h3>
            <div className="nxv-meta"><Status st={s.s4.risk} /><Status st={s.s4.trust} /></div>
            <p className="nxv-v">{s.s4.text}</p>
          </div>
        ) : null}
      </div>

      {more.length ? (
        <details className="nxl-more">
          <summary>
            <ChevronDown size={15} strokeWidth={2} aria-hidden="true" />
            הקשר נוסף ליחידה
            <em>{more.join(" · ")}</em>
          </summary>
          <div className="nxl-more-b">
            {s.scenario ? (
              <div className="nxv-fact">
                <h3 className="nxv-sub">המציאות בארגון</h3>
                <p className="nxv-v">{s.scenario}</p>
              </div>
            ) : null}
            {s.interview ? (
              <div className="nxv-fact">
                <h3 className="nxv-sub">שאלת ראיון נפוצה</h3>
                <p className="nxv-v"><b>{s.interview.q}</b></p>
                {s.interview.a ? <p className="nxv-v">{s.interview.a}</p> : null}
              </div>
            ) : null}
            {s.related.length ? (
              <div className="nxv-fact">
                <h3 className="nxv-sub">אובייקטים קשורים</h3>
                <Refs items={s.related} />
              </div>
            ) : null}
          </div>
        </details>
      ) : null}

      {s.objectHref || s.link ? (
        <div className="nxs-refs">
          {s.objectHref ? (
            <Link className="nu-card nxv-ref" href={s.objectHref} prefetch={false}>
              <BookOpen size={14} strokeWidth={1.75} aria-hidden="true" />
              דף הידע המלא של <b>{s.object}</b>
              <ArrowLeft size={13} strokeWidth={2} aria-hidden="true" />
            </Link>
          ) : null}
          {s.link ? <Go l={s.link} icon={<Workflow size={14} strokeWidth={1.75} aria-hidden="true" />} /> : null}
        </div>
      ) : null}
    </section>
  );
}

export function TrackView({ t }: { t: TrackPage }) {
  return (
    <div className="nxv" data-surface="track" style={modStyle(t.mod)}>
      <SmartReturn fallback={{ href: TRACKS_HREF, label: "מסלולי למידה" }} />

      <header className="nxv-head">
        <span className="nx-modbar" aria-hidden="true" />
        <span className="nx-eyebrow">SAP Academy · מסלולי למידה · {t.cat.he}</span>
        <div className="nxv-title">
          <h1 className="nxv-h1 nx-display">{t.he}</h1>
          <p className="nxv-lede">{t.sub}</p>
        </div>
        <div className="nxv-meta">
          <span className="nu-chip"><Layers size={11} strokeWidth={1.75} />{t.units} יחידות לימוד</span>
          <span className="nu-chip"><Boxes size={11} strokeWidth={1.75} />{t.objects} אובייקטים</span>
          {t.durationHe ? <span className="nu-chip"><Clock size={11} strokeWidth={1.75} />{t.durationHe}</span> : null}
          {t.level ? <span className="nu-chip">{t.level}</span> : null}
        </div>
        <p className="nxv-lede"><b>מתאים ל:</b> {t.audience}</p>
        {t.note ? <p className="nxv-lede">{t.note}</p> : null}
      </header>

      {t.story ? (
        <div className="nxs-refs">
          <Go l={t.story} icon={<Workflow size={14} strokeWidth={1.75} aria-hidden="true" />} />
        </div>
      ) : null}

      <section className="nxv-sec" aria-labelledby="tr-map">
        <div className="nxv-sec-h">
          <span className="nxv-sec-i" aria-hidden="true"><ListOrdered size={16} strokeWidth={1.75} /></span>
          <h2 className="nx-h2" id="tr-map">תוכן הקורס</h2>
        </div>
        <ol className="nxc-lessons">
          {t.steps.map((s) => (
            <li key={s.id}>
              <a className="nu-card nxc-l" href={`#${s.id}`}>
                <span className="nxc-l-n">{String(s.n).padStart(2, "0")}</span>
                <span className="nxc-l-t">{s.title}</span>
                <span className="nxc-l-s">
                  {s.object ? <span className="nu-chip is-sap" dir="ltr">{s.object}</span> : null}
                  <span className="nu-chip">{s.importance}</span>
                </span>
              </a>
            </li>
          ))}
        </ol>
      </section>

      {t.steps.map((s) => <StepSection key={s.id} s={s} total={t.units} />)}

      <div className="nxv-foot">
        <p className="nxv-src">
          <Info size={13} strokeWidth={1.75} aria-hidden="true" />
          <span>
            מקור: מסלולי הלמידה של האקדמיה. הערת היועץ, תרחיש הארגון, שאלת הראיון, השינוי ב-S/4HANA והאובייקטים הקשורים נשלפים מבסיס הידע של הפרויקט לפי האובייקט של כל יחידה; תווית האמון שליד הערה היא של המקור שלה.
          </span>
        </p>
        <p>ההתקדמות במסלול נשמרה בגרסה הקודמת במכשיר בלבד ואינה מוצגת כאן.</p>
      </div>
    </div>
  );
}
