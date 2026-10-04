/* ============================================================================
   PROJECT NEO · MODULE SECTIONS — the knowledge sections: business process,
   master data, configuration, enhancements, troubleshooting, best practices.
   Server components over section-data.ts. Every sentence is the record's own;
   the labels are the legacy portal's. Long parts fold into <details>.
   ========================================================================== */

import Link from "next/link";
import { enLang } from "../lang";
import { enhancements, incidents, processSteps } from "@/lib/module-portal";
import {
  cdsHref, cfgTreeOf, domainHref, exitHref, facetsOf, fioriAppHref, flowOf, funcHref,
  incidentHref, notesOf, objectHref, sheetOf, txHref, type MsModule,
} from "./section-data";
import { Bullets, Code, Codes, Empty, More, Sec, Sheet, nf } from "./parts";

const ids = (a: string[] | undefined, href: (s: string) => string | null) =>
  <Codes items={(a || []).map((x) => ({ id: x, href: href(x) }))} />;
/** English running text keeps its own direction inside the Hebrew page. */
const En = ({ t }: { t: string }) => <span dir={enLang(t) ? "ltr" : undefined} lang={enLang(t)}>{t}</span>;

/* -------------------------------------------------------- business process */

export function ProcessBody({ mod }: { mod: MsModule }) {
  const phases = flowOf(mod.code);
  if (phases.length) {
    // Steps are numbered across the phases, as the record's own seq is.
    const start = phases.map((_, i) => phases.slice(0, i).reduce((a, q) => a + q.steps.length, 0));
    return (
      <>
        {phases.map((p, pi) => (
          <Sec key={p.id} id={`nms-ph-${p.id}`} title={p.he} count={p.steps.length} unit="שלבים" lede={<En t={p.en} />}>
            <ol className="nms-flow">
              {p.steps.map((s, si) => {
                return (
                  <li key={s.id} className="nms-fstep">
                    <span className="nms-step-n" aria-hidden="true">{start[pi] + si + 1}</span>
                    <div className="nms-fstep-b">
                      <p className="nms-kick"><En t={s.sapObject} /></p>
                      <h3 className="nms-h3">{s.business}</h3>
                      <dl className="nms-kv">
                        <div><dt>טרנזקציה</dt><dd><Code id={s.tcode} href={txHref(s.tcode)} /></dd></div>
                        <div><dt>טבלאות</dt><dd>{ids(s.tables, objectHref)}</dd></div>
                        <div><dt>פלט</dt><dd>{s.output}</dd></div>
                        {s.nextStep ? <div><dt>השלב הבא</dt><dd>{s.nextStep}</dd></div> : null}
                      </dl>
                      {s.mistakes.length ? <More label="טעויות נפוצות"><Bullets items={s.mistakes} /></More> : null}
                    </div>
                  </li>
                );
              })}
            </ol>
          </Sec>
        ))}
      </>
    );
  }
  const steps = processSteps(mod.data);
  return (
    <Sec id="nms-flow" title={`הזרימה של ${mod.code}`} count={steps.length} unit="שלבים" lede="אובייקט אחרי אובייקט, בסדר שבו התהליך עובר ביניהם. לכל שלב טבלת הליבה שלו.">
      <ol className="nms-steps">
        {steps.map((s, i) => {
          const guide = domainHref(s.guide);
          return (
            <li key={`${s.code}-${i}`} className="nms-step">
              <span className="nms-step-n" aria-hidden="true">{i + 1}</span>
              <div className="nms-fstep-b">
                <p className="nms-kick">שלב {i + 1}{i === steps.length - 1 ? " · סיום" : ""}</p>
                <h3 className="nms-h3">{s.label}</h3>
                <p className="nms-row">
                  <Code id={s.code} href={objectHref(s.code)} />
                  {guide ? <Link className="nms-inl" href={guide} prefetch={false}>מדריך מלא</Link> : null}
                </p>
              </div>
            </li>
          );
        })}
      </ol>
    </Sec>
  );
}

/* ------------------------------------------------------------- master data */

export function MasterDataBody({ mod }: { mod: MsModule }) {
  const facets = facetsOf(mod.code);
  if (!facets.length) return <Empty text="אין בתיעוד רשומות נתוני אב למודול זה." />;
  return (
    <>
      {facets.map((f) => {
        const guide = domainHref(f.guide);
        const page = guide || objectHref(f.code);
        return (
          <Sec
            key={f.code}
            id={`nms-md-${f.code}`}
            title={<En t={f.he} />}
            lede={
              <>
                {f.en !== f.he ? <span className="nms-kick"><En t={f.en} /> · </span> : null}
                {f.whatIs}
              </>
            }
          >
            <dl className="nms-kv">
              {f.businessValue ? <div><dt>ערך עסקי</dt><dd>{f.businessValue}</dd></div>
                : f.why ? <div><dt>למה זה קיים</dt><dd>{f.why}</dd></div> : null}
              <div><dt>מתי נוצר</dt><dd>{f.whenCreated}</dd></div>
              <div><dt>בעלים</dt><dd>{f.owner}</dd></div>
              <div><dt>טבלאות מפתח</dt><dd>{ids(f.tables, objectHref)}</dd></div>
              <div><dt>טרנזקציות</dt><dd>{ids(f.tcodes, txHref)}</dd></div>
              {f.fiori?.length ? (
                <div><dt>Fiori Apps</dt><dd><ul className="nms-plain">{f.fiori.map((a) => {
                  const h = fioriAppHref(a);
                  return <li key={a}>{h ? <Link className="nms-inl" href={h} prefetch={false} lang="en">{a}</Link> : <span lang={enLang(a)}>{a}</span>}</li>;
                })}</ul></dd></div>
              ) : null}
              {f.cds?.length ? <div><dt>CDS Views</dt><dd>{ids(f.cds, cdsHref)}</dd></div> : null}
              {f.bapis?.length ? <div><dt>BAPIs / FMs</dt><dd>{ids(f.bapis, funcHref)}</dd></div> : null}
              {f.badis?.length ? <div><dt>BAdIs / Exits</dt><dd><ul className="nms-plain">{f.badis.map((b) => <li key={b}>{b}</li>)}</ul></dd></div> : null}
            </dl>
            <More label="תלויות, טעויות נפוצות ודוגמה מהארגון">
              <dl className="nms-kv">
                <div><dt>תלויות</dt><dd>{f.dependencies}</dd></div>
                {f.lifecycle && f.lifecycle !== f.whenCreated ? <div><dt>מחזור חיים</dt><dd>{f.lifecycle}</dd></div> : null}
                {f.spro ? <div><dt>קונפיגורציה (SPRO)</dt><dd><En t={f.spro} /></dd></div> : null}
                {f.crossLinks ? <div><dt>קישורים חוצי-מודול</dt><dd>{f.crossLinks}</dd></div> : null}
              </dl>
              <h3 className="nms-h3">טעויות נפוצות</h3>
              <Bullets items={f.commonMistakes} />
              {f.troubleshooting?.length ? <><h3 className="nms-h3">איתור תקלות</h3><Bullets items={f.troubleshooting} /></> : null}
              <h3 className="nms-h3">דוגמה מהארגון (CBC)</h3>
              <p className="nms-p">{f.cbcExample}</p>
            </More>
            <p className="nms-src">
              <span>מקור: {f.source}</span>
              {page ? <Link className="nms-inl" href={page} prefetch={false}>{guide ? "מדריך מלא" : "עמוד הטבלה"}</Link> : null}
            </p>
          </Sec>
        );
      })}
    </>
  );
}

/* ----------------------------------------------------------- configuration */

export function ConfigBody({ mod }: { mod: MsModule }) {
  const sheet = sheetOf(mod.data, "config");
  if (sheet) {
    return (
      <Sec id="nms-cfg" title={sheet.title} count={sheet.rows.length} unit="אובייקטי קונפיגורציה" lede="מדריך הקונפיגורציה מתיעוד המודול, כלשונו: לכל אובייקט הטרנזקציה, ההסבר הפונקציונלי, תרגום המונחים והפניות.">
        <Sheet sheet={sheet} />
      </Sec>
    );
  }
  const areas = cfgTreeOf(mod.code);
  if (!areas.length) return <Empty text="אין בתיעוד מדריך קונפיגורציה למודול זה." />;
  return (
    <>
      {areas.map((a) => (
        <Sec key={a.id} id={`nms-cfg-${a.id}`} title={a.he} count={a.nodes.length} unit="צמתים" lede={<En t={a.en} />}>
          {a.nodes.map((n) => (
            <article key={n.id} className="nms-node" aria-labelledby={`nms-n-${a.id}-${n.id}`}>
              <h3 className="nms-h3" id={`nms-n-${a.id}-${n.id}`}>{n.he}</h3>
              <p className="nms-row">
                {n.tcode ? <Code id={n.tcode} href={txHref(n.tcode)} /> : null}
                {n.imgPath.length ? <span className="nms-img" dir="ltr" lang="en">{n.imgPath.join(" › ")}</span> : null}
              </p>
              <p className="nms-p">{n.business}</p>
              <dl className="nms-kv">
                <div><dt>השפעה</dt><dd>{n.impact}</dd></div>
                {n.warnings?.length ? <div><dt>אזהרה</dt><dd>{n.warnings.map((w, i) => <p key={i} className="nms-p">{w}</p>)}</dd></div> : null}
              </dl>
              {n.mistakes?.length ? <More label="טעויות נפוצות"><Bullets items={n.mistakes} /></More> : null}
              <div className="nms-src">
                {n.tables?.length ? ids(n.tables, objectHref) : null}
                <span>מקור: {n.source}</span>
              </div>
            </article>
          ))}
        </Sec>
      ))}
    </>
  );
}

/* ------------------------------------------------------------ enhancements */

export function EnhancementsBody({ mod }: { mod: MsModule }) {
  const ex = enhancements(mod.data);
  const cc = sheetOf(mod.data, "customCode");
  return (
    <>
      <Sec id="nms-exits" title="User-Exits, BAdIs ונקודות הרחבה" count={ex.length} unit="הרחבות" lede="ההרחבות בשם מקטלוג ההרחבות של הפרויקט שמשויכות למודול: מה כל אחת מאפשרת, דוגמה מהארגון והטרנזקציות שבהן היא פועלת.">
        {ex.length ? (
          <ul className="nms-cards">
            {ex.map((e) => (
              <li key={e.name} className="nms-card">
                <p className="nms-row"><Code id={e.name} href={exitHref(e.name)} /><span className="nms-tag" lang="en">{e.kind}</span></p>
                <p className="nms-card-t">{e.he}</p>
                {e.example ? <p className="nms-p">{e.example}</p> : null}
                {e.tcodes?.length ? ids(e.tcodes, txHref) : null}
              </li>
            ))}
          </ul>
        ) : <Empty text="אין בתיעוד הרחבות למודול זה." />}
      </Sec>
      {cc ? (
        <Sec id="nms-cc" title={cc.title} count={cc.rows.length} unit="שורות" lede="בדיקת הקוד המותאם מתיעוד המודול, כלשונה: סוג, שם טכני, סטטוס הבדיקה וההמלצה למעבר ל-S/4HANA.">
          <More label={`הצגת ${nf.format(cc.rows.length)} השורות`}><Sheet sheet={cc} /></More>
        </Sec>
      ) : null}
    </>
  );
}

/* --------------------------------------------------------- troubleshooting */

export function TroubleBody({ mod }: { mod: MsModule }) {
  const inc = incidents(mod.data);
  if (!inc.length) return <Empty text="אין תקלות מתועדות למודול זה עדיין." />;
  return (
    <Sec id="nms-inc" title="תקלות נפוצות" count={inc.length} unit="תקלות" lede="לכל תקלה התסמין כפי שתועד, וההשפעה העסקית כשתויגה. בדף של כל תקלה: שורש, ניתוח ופתרון.">
      <ul className="nms-cards">
        {inc.map((i) => {
          const href = incidentHref(i.slug);
          const body = (
            <>
              <span className="nms-row"><b className="nms-card-t">{i.he}</b>{i.impact ? <span className="nms-tag" dir="auto" lang={enLang(i.impact)}>{i.impact}</span> : null}</span>
              <span className="nms-p">{i.symptom}</span>
            </>
          );
          return (
            <li key={i.slug}>
              {href ? <Link className="nms-card nms-card--go" href={href} prefetch={false}>{body}</Link> : <div className="nms-card">{body}</div>}
            </li>
          );
        })}
      </ul>
    </Sec>
  );
}

/* ---------------------------------------------------------- best practices */

export function PracticesBody({ mod }: { mod: MsModule }) {
  const bp = notesOf(mod.data);
  if (!bp.length) return <Empty text="אין בתיעוד המלצות למודול זה." />;
  return (
    <Sec id="nms-bp" title="המלצות לפי אובייקט" count={bp.length} unit="טבלאות" lede="הערות היועץ הפונקציונלי לטבלאות המודול, משכבת הערות היועץ של הפרויקט.">
      <ul className="nms-cards">
        {bp.map((o) => (
          <li key={o.code} className="nms-card">
            <p className="nms-row">
              <Code id={o.code} href={objectHref(o.code)} />
              <span>{o.he}</span>
              {o.trust !== "curated" ? <span className="nms-tag">נדרש אימות</span> : null}
            </p>
            <Bullets items={o.notes} />
          </li>
        ))}
      </ul>
    </Sec>
  );
}
