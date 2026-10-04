/* ============================================================================
   PROJECT NEO · /neo/alm/ and /neo/delivery/ — the two interactive courses.
   ----------------------------------------------------------------------------
   The legacy pages rendered components/learn/course-center.tsx over
   lib/alm-course.ts and lib/delivery-course.ts: a start row, a Beginner →
   Expert ladder, and one topic at a time behind eight client-side tabs. Here
   every topic is on the page, in ladder order, and every tab's content is in
   the HTML: the overview (the intro fields and "after this topic you will
   know…") in view, the other seven tabs folded natively. The adapters are
   called as they are, so each string is the legacy one.

   Tab content that is empty is not drawn (the legacy tab said "no content in
   this tab"). Legacy hrefs are mapped to the NEO page that does the same job,
   or shown as plain text when there is none. Colour fields are decoration and
   are not painted (the family hue carries the page). The one emoji in the
   adapters' text (the "finished the path" line) is dropped.
   ========================================================================== */

import Link from "next/link";
import type { ReactNode } from "react";
import type { CourseTopic } from "@/components/learn/course-center";
import type { LadderLevel } from "@/components/learn/course-kit";
import { enLang } from "../lang";
import { incidentLink, neoHrefOf, tableLink, txHref } from "./links";
import { Bullets, Codes, Flow, More, Onward, ToolPage } from "./kit";
import { LadderProgress, LevelCount, MarkComplete, TopicMark } from "./course-progress";

export interface CourseData {
  meta: { he: string; sub: string; eyebrow: string };
  startMeta: { id: string; he: string; sub: string }[];
  ladder: LadderLevel[];
  topics: CourseTopic[];
  crossLinks: { label: string; href: string }[];
}

const noEmoji = (s: string) => s.replace(/\s*\p{Emoji_Presentation}\uFE0F?/gu, "");

function Lbl({ children }: { children: ReactNode }) {
  return <h3 className="ntl-lbl">{children}</h3>;
}

function TopicBody({ t, course }: { t: CourseTopic; course: string }) {
  const v = t.visual;
  const ex = t.examples;
  const tx = t.transactions;
  const db = t.debug;
  const sc = t.scenario;
  const incs = (sc?.incidents || []).map((i) => ({ ...i, href: incidentLink(i.slug) }));
  const rel = (t.related || []).map((l) => ({ label: l.label, href: l.href.startsWith("#") ? null : neoHrefOf(l.href) }));

  return (
    <>
      <h3 className="ntl-lbl">סקירה</h3>
      <dl className="ntl-dl ntl-dl--2">
        {t.intro.filter((f) => f.text).map((f) => (
          <div key={f.label}>
            <dt>{f.label}</dt>
            <dd lang={enLang(f.text)}>{noEmoji(f.text)}</dd>
          </div>
        ))}
      </dl>

      <div className="ntl-know">
        <h3 className="ntl-h3">אחרי שתסיים את הנושא הזה תדע…</h3>
        <ul className="nct-bul">{t.checklist.map((x, i) => <li key={i}>{x}</li>)}</ul>
        <MarkComplete course={course} id={t.id} />
      </div>

      {v?.layers?.length || v?.flow?.length || v?.note ? (
        <More summary="ויזואלי">
          {v?.layers?.length ? (
            <dl className="ntl-dl ntl-dl--2">
              {v.layers.map((l, i) => (
                <div key={i}>
                  <dt>{l.he}{l.en ? <> <span className="ntl-en" dir="ltr" lang={enLang(l.en)}>{l.en}</span></> : null}</dt>
                  <dd>{l.items.length > 1 ? <Bullets items={l.items} /> : l.items[0]}</dd>
                </div>
              ))}
            </dl>
          ) : null}
          {v?.flow?.length ? <Flow items={v.flow} label={`רצף · ${t.he}`} /> : null}
          {v?.note ? <p className="ntl-note">{v.note}</p> : null}
        </More>
      ) : null}

      {ex?.scenario || ex?.bullets?.length ? (
        <More summary="דוגמאות">
          {ex?.scenario ? <div><Lbl>תרחיש טיפוסי</Lbl><p className="nct-p">{ex.scenario}</p></div> : null}
          {ex?.bullets?.length ? <div><Lbl>איך עושים נכון</Lbl><Bullets items={ex.bullets} /></div> : null}
        </More>
      ) : null}

      {tx?.tcodes?.length || tx?.tables?.length || tx?.tools?.length ? (
        <More summary="טרנזקציות">
          {tx?.tcodes?.length ? <div><Lbl>טרנזקציות</Lbl><Codes items={tx.tcodes} href={txHref} /></div> : null}
          {tx?.tables?.length ? <div><Lbl>טבלאות</Lbl><Codes items={tx.tables} href={tableLink} /></div> : null}
          {tx?.tools?.length ? <div><Lbl>כלים</Lbl><Codes items={tx.tools} href={txHref} /></div> : null}
        </More>
      ) : null}

      {db?.issues?.length || db?.steps?.length || db?.oss?.length ? (
        <More summary="Debug">
          {db?.issues?.length ? <div><Lbl>תקלות נפוצות</Lbl><Bullets items={db.issues} /></div> : null}
          {db?.steps?.length ? <div><Lbl>נתיב Debug</Lbl><Bullets items={db.steps} /></div> : null}
          {db?.oss?.length ? <div><Lbl><span dir="ltr">OSS · SAP Notes</span></Lbl><Codes items={db.oss} /></div> : null}
        </More>
      ) : null}

      <More summary="ראיון">
        <div><Lbl>מה המנהל מצפה שתדע</Lbl><p className="nct-p">{t.managerExpects}</p></div>
        {t.interview.length ? <div><Lbl>שאלות ראיון טיפוסיות</Lbl><Bullets items={t.interview} /></div> : null}
      </More>

      {sc?.text || incs.length ? (
        <More summary="הארגון">
          {sc?.text ? <div><Lbl>דוגמת ייצור — הארגון</Lbl><p className="nct-p">{sc.text}</p></div> : null}
          {incs.length ? (
            <div>
              <Lbl>תקלות מתועדות</Lbl>
              <ul className="ntl-links">
                {incs.map((i) => <li key={i.slug}>{i.href ? <Link href={i.href} prefetch={false} className="nu-link">{i.label}</Link> : i.label}</li>)}
              </ul>
            </div>
          ) : null}
        </More>
      ) : null}

      {rel.length ? (
        <More summary="קשור">
          <ul className="ntl-links">
            {rel.map((l) => <li key={l.label}>{l.href ? <Link href={l.href} prefetch={false} className="nu-link">{l.label}</Link> : <span>{l.label}</span>}</li>)}
          </ul>
        </More>
      ) : null}
    </>
  );
}

export function CourseView({ d, course, surface, back, extra, foot }: {
  d: CourseData;
  course: string;
  surface: string;
  back: { href: string; label: string };
  /** Per-topic record content the adapter does not surface, keyed by topic id. */
  extra?: Record<string, ReactNode>;
  foot?: ReactNode;
}) {
  const byId = new Map(d.topics.map((t) => [t.id, t]));
  const order = d.ladder.flatMap((l) => l.topics.map((x) => x.id)).filter((id) => byId.has(id));
  const ids = [...order, ...d.topics.map((t) => t.id).filter((id) => !order.includes(id))];
  const cross = d.crossLinks.map((l) => ({ label: l.label, href: neoHrefOf(l.href) })).filter((l): l is { label: string; href: string } => !!l.href);

  return (
    <ToolPage
      surface={surface}
      back={back}
      eye={d.meta.eyebrow}
      title={d.meta.he}
      lede={<p className="ntl-lede-p">{d.meta.sub}</p>}
      foot={foot}
    >
      <section className="nct-sec ntl-sec" aria-labelledby="start-h">
        <h2 id="start-h" className="nct-sec-h"><i aria-hidden="true" />התחל כאן <span className="ntl-sec-en" dir="ltr" lang="en">Start Here</span></h2>
        <ul className="ntl-start">
          {d.startMeta.map((s) => (
            <li key={s.id}>
              <a href={`#t-${s.id}`} className="ntl-start-a">
                <b>{s.he}</b>
                <span>{s.sub}</span>
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section className="nct-sec ntl-sec" aria-labelledby="ladder-h">
        <h2 id="ladder-h" className="nct-sec-h"><i aria-hidden="true" />מסלול למידה <span className="ntl-sec-en" dir="ltr" lang="en">Beginner → Expert</span></h2>
        <LadderProgress course={course} ids={d.ladder.flatMap((l) => l.topics.map((x) => x.id))} />
        <ol className="ntl-ladder">
          {d.ladder.map((lv, i) => (
            <li key={lv.id}>
              <h3 className="ntl-h3">{i + 1}. {lv.label} <LevelCount course={course} ids={lv.topics.map((x) => x.id)} /></h3>
              <ul className="ntl-links">
                {lv.topics.map((x) => (
                  <li key={x.id}>
                    <a href={`#t-${x.id}`} className="nu-link ntl-ladder-a">
                      <TopicMark course={course} id={x.id} />
                      {x.he}
                    </a>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </section>

      {ids.map((id) => {
        const t = byId.get(id)!;
        return (
          <section key={t.id} id={`t-${t.id}`} className="nct-sec ntl-sec ntl-topic" aria-labelledby={`t-${t.id}-h`}>
            <h2 id={`t-${t.id}-h`} className="nct-sec-h">
              <i aria-hidden="true" />{t.he}
              <span className="ntl-sec-en" dir="ltr" lang={enLang(t.en)}>{t.en}</span>
            </h2>
            <TopicBody t={t} course={course} />
            {extra?.[t.id] ?? null}
          </section>
        );
      })}

      <Onward items={[...cross, { href: "/neo/knowledge/", label: "כל המרכזים" }]} />
    </ToolPage>
  );
}
