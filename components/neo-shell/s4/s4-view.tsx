/* ============================================================================
   PROJECT NEO · THE S/4HANA SURFACES — three pages, one language.
   ----------------------------------------------------------------------------
   SERVER components.

     /neo/s4hana/            the object catalogue + the landscape + the method
     /neo/s4-readiness/      where each module actually stands + the 18 changes
     /neo/migration-cockpit/ what loads, in what order, and what breaks

   ONE VISUAL RULE ACROSS ALL THREE: status is the only colour, and it is always
   the dataset's own. data/s4-objects, data/s4-architecture and data/ecc-s4 each
   ship a status→colour map that the legacy pages already rendered; those maps
   are used verbatim rather than re-mapped onto product tokens, because a reader
   moving between the legacy site and NEO must not see "removed" change colour.

   AND ONE HONESTY RULE: `trust` is printed. Every one of these datasets marks
   curated vs needs-verification per record. A page that hides that flag turns a
   flagged assumption into an assertion, which is the one thing this product may
   never do.
   ========================================================================== */

import Link from "next/link";
import {
  AlertTriangle, ArrowLeft, BadgeCheck, Boxes, Cable, CheckCircle2, ClipboardList,
  Code2, Database, Gauge, GitBranch, Layers, Network, Rocket, Route, ShieldQuestion,
  Sparkles, Truck, Waypoints,
} from "lucide-react";
import { SectionNav } from "@/components/neo-shell/workspace/section-nav";
import {
  APPROACHES, ARCH, ARCH_STATUS, CUSTOM_CODE, CUSTOM_CODE_NOTE, CUTOVER, EXEC_NARRATIVE,
  INTEGRATION, LESSONS, MIG_CHECKLIST, MIG_ERRORS, MIG_LOAD_LAYERS, QUALITY_DIMS, READINESS,
  TESTING, migObjects, migTotals, monitorLinks, s4Objects, s4ObjectTotals, s4Readiness,
  s4TopicTotals, s4Topics, transformTotals, type S4Link,
} from "./s4-data";

const nf = new Intl.NumberFormat("he-IL");

const RISK_HE: Record<string, string> = { high: "סיכון גבוה", medium: "סיכון בינוני", low: "סיכון נמוך" };
const RISK_C: Record<string, string> = {
  high: "var(--status-blocked, #dc2626)",
  medium: "var(--status-in-analysis, #d97706)",
  low: "var(--status-done, #16a34a)",
};
const TRUST_HE: Record<string, string> = { curated: "תיעוד מאומת", "needs-verification": "נדרש אימות נוסף" };

/* ------------------------------------------------------------- primitives */

function Sec({
  id, n, icon, eyebrow, title, lede, children,
}: {
  id: string; n: number; icon: React.ReactNode; eyebrow: string;
  title: string; lede?: React.ReactNode; children: React.ReactNode;
}) {
  return (
    <section className="ns4-sec nm-rise nm-once" id={id} aria-labelledby={`${id}-h`}>
      <header className="ns4-sec-h">
        <span className="ns4-sec-n" aria-hidden="true">{String(n).padStart(2, "0")}</span>
        <p className="ns4-sec-k"><span className="ns4-sec-ico" aria-hidden="true">{icon}</span>{eyebrow}</p>
        <h2 className="ns4-h2" id={`${id}-h`}>{title}</h2>
        {lede ? <p className="ns4-sec-s">{lede}</p> : null}
      </header>
      <div className="ns4-sec-b">{children}</div>
    </section>
  );
}

function Hero({
  eyebrow, icon, title, lede, stats, note,
}: {
  eyebrow: string; icon: React.ReactNode; title: string; lede: React.ReactNode;
  stats: [number | string, string][]; note?: React.ReactNode;
}) {
  return (
    <header className="ns4-hero">
      <p className="ns4-eye">{icon}{eyebrow}</p>
      <h1 className="ns4-h1">{title}</h1>
      <p className="ns4-lede">{lede}</p>
      <div className="ns4-stats">
        {stats.map(([v, l]) => (
          <span key={l} className="ns4-stat">
            <b className="nx-sap">{typeof v === "number" ? nf.format(v) : v}</b>
            <em>{l}</em>
          </span>
        ))}
      </div>
      {note ? <p className="ns4-gap"><ShieldQuestion size={14} strokeWidth={1.75} aria-hidden="true" /> {note}</p> : null}
    </header>
  );
}

const Trust = ({ t }: { t?: string }) =>
  !t ? null : <span className="ns4-trust" data-t={t}>{TRUST_HE[t] || t}</span>;

const Risk = ({ r }: { r?: string }) =>
  !r ? null : <span className="ns4-risk" style={{ "--r": RISK_C[r] } as React.CSSProperties}>{RISK_HE[r] || r}</span>;

function Chips({ items }: { items: S4Link[] }) {
  if (!items.length) return null;
  return (
    <div className="ns4-chips">
      {items.map((l) =>
        l.href
          ? <Link key={l.t} className="ns4-chip" data-live="1" href={l.href} prefetch={false}><span className="nx-sap" dir="ltr">{l.t}</span></Link>
          : <span key={l.t} className="ns4-chip" data-live="0"><span className="nx-sap" dir="ltr">{l.t}</span></span>,
      )}
    </div>
  );
}

const Credit = () => (
  <p className="ns4-credit">
    <Cable size={13} strokeWidth={1.75} aria-hidden="true" />
    {" "}התוכן מוצג כפי שנכתב בתיעוד הפרויקט.
  </p>
);

/* ========================================================================== */
/*  /neo/s4hana/                                                              */
/* ========================================================================== */

export function S4HanaCenter() {
  const objs = s4Objects();
  const t = s4ObjectTotals();
  const tr = transformTotals();
  const mon = monitorLinks();

  const ORDER: { k: string; he: string }[] = [
    { k: "removed", he: "בוטל" },
    { k: "replaced", he: "הוחלף" },
    { k: "changed", he: "השתנה" },
    { k: "stays", he: "נשאר" },
  ];

  const nav: [string, string][] = [
    ["ns4-cat", "קטלוג האובייקטים"],
    ["ns4-arch", "ארכיטקטורת המערכת"],
    ["ns4-code", "קוד מותאם"],
    ["ns4-int", "אינטגרציה"],
    ["ns4-test", "בדיקות"],
    ["ns4-cut", "Cutover"],
    ["ns4-les", "לקחים"],
  ];

  return (
    <div className="ns4 nm-scene" data-surface="s4" data-scene="s4">
      <Hero
        eyebrow="מרכז S/4HANA · TRANSFORMATION"
        icon={<Rocket size={13} strokeWidth={2} aria-hidden="true" />}
        title="השינויים במעבר מ-ECC ל-S/4HANA"
        lede={
          <>
            {t.total} אובייקטים מתועדים: המצב ב-ECC, המצב ב-S/4HANA, סיבת השינוי וההשפעה על הקוד המותאם.
            בנוסף: {tr.arch} רכיבי ארכיטקטורה, {tr.customCode} דפוסי קוד מותאם,
            {" "}{tr.testing} שכבות בדיקה ו-{tr.cutoverSteps} צעדי Cutover.
          </>
        }
        stats={[
          [t.total, "אובייקטים"],
          [t.byStatus.replaced || 0, "הוחלפו"],
          [t.byStatus.removed || 0, "בוטלו"],
          [t.byRisk.high || 0, "בסיכון גבוה"],
          [t.abapNotes, "הערות ABAP"],
          [t.checklistItems, "פריטי בדיקה"],
        ]}
        note={
          <>
            {t.curated} מתוך {t.total} האובייקטים מסומנים כתיעוד מאומת; ליתר נדרש אימות נוסף בהתאם לגרסת המערכת,
            והסימון מוצג על כל כרטיס. {t.linked} מהם מקושרים לדף אובייקט מלא בפרויקט.
          </>
        }
      />

      <p className="ns4-narr">{EXEC_NARRATIVE}</p>

      <SectionNav sections={nav.map(([id, label]) => ({ id, label }))} />

      {/* =================================================== THE CATALOGUE */}
      <Sec
        id="ns4-cat" n={1}
        icon={<Database size={15} strokeWidth={1.75} />}
        eyebrow="קטלוג"
        title="קטלוג האובייקטים"
        lede="מסודר לפי חומרת השינוי: תחילה מה שבוטל, בסוף מה שנשאר."
      >
        {ORDER.map(({ k, he }) => {
          const list = objs.filter((o) => o.status === k);
          if (!list.length) return null;
          return (
            <div key={k} className="ns4-group">
              <h3 className="ns4-h3">
                <i aria-hidden="true" style={{ background: list[0].statusColor }} />
                {he}
                <span className="ns4-h3-n">{list.length}</span>
              </h3>
              <div className="ns4-objs">
                {list.map((o) => (
                  <article key={o.name} className="ns4-obj" style={{ "--s": o.statusColor } as React.CSSProperties}>
                    <header className="ns4-obj-h">
                      {o.href
                        ? <Link className="ns4-obj-n nx-sap" href={o.href} prefetch={false} dir="ltr">{o.name}</Link>
                        : <b className="ns4-obj-n nx-sap" dir="ltr">{o.name}</b>}
                      <span className="ns4-kind">{o.kind}</span>
                      <Risk r={o.risk} />
                      {o.release ? <span className="ns4-rel nx-sap" dir="ltr">{o.release}</span> : null}
                      <Trust t={o.trust} />
                    </header>
                    <p className="ns4-obj-he">{o.he}</p>

                    <dl className="ns4-ba">
                      <div><dt>ECC</dt><dd>{o.ecc}</dd></div>
                      <div><dt>S/4HANA</dt><dd>{o.s4}</dd></div>
                    </dl>

                    {o.why ? <p className="ns4-why"><b>סיבת השינוי: </b>{o.why}</p> : null}

                    {o.replacesLinks.length ? (
                      <>
                        <h4 className="ns4-h4">מחליף את</h4>
                        <Chips items={o.replacesLinks} />
                      </>
                    ) : null}

                    {(o.abap || []).length ? (
                      <>
                        <h4 className="ns4-h4"><Code2 size={12} strokeWidth={2} aria-hidden="true" /> השפעה על קוד ABAP</h4>
                        <ul className="ns4-abap">
                          {(o.abap || []).map((a, i) => (
                            <li key={i}>
                              <span className="ns4-abap-k nx-sap" dir="ltr">{a.k}</span>
                              <span className="ns4-abap-b">
                                <span>{a.note}</span>
                                {a.code ? <code className="ns4-code" dir="ltr">{a.code}</code> : null}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </>
                    ) : null}

                    {(o.checklist || []).length ? (
                      <>
                        <h4 className="ns4-h4"><ClipboardList size={12} strokeWidth={2} aria-hidden="true" /> נקודות לבדיקה בפרויקט</h4>
                        <ul className="ns4-check">
                          {(o.checklist || []).map((c, i) => <li key={i}>{c}</li>)}
                        </ul>
                      </>
                    ) : null}

                    <footer className="ns4-obj-f">
                      <span className="ns4-mods">{o.modules.join(" · ")}</span>
                      {o.relatedLinks.length ? <Chips items={o.relatedLinks} /> : null}
                    </footer>
                  </article>
                ))}
              </div>
            </div>
          );
        })}
      </Sec>

      {/* ================================================== ARCHITECTURE */}
      <Sec
        id="ns4-arch" n={2}
        icon={<Network size={15} strokeWidth={1.75} />}
        eyebrow="ארכיטקטורה"
        title="רכיבי הארכיטקטורה לפי שכבה"
        lede={`${tr.arch} רכיבים, ECC מול S/4HANA, ולכל אחד מה שנשאר ומה שהוסר.`}
      >
        <div className="ns4-arch">
          {ARCH.map((c) => {
            const meta = ARCH_STATUS[c.status];
            return (
              <article key={c.id} className="ns4-arch-c" style={{ "--s": meta.c } as React.CSSProperties}>
                <header className="ns4-arch-h">
                  <span className="ns4-arch-layer">{c.layerHe}</span>
                  <span className="ns4-arch-st">{meta.he}</span>
                  <Risk r={c.risk} />
                </header>
                <p className="ns4-arch-pair">
                  <b className="nx-sap" dir="ltr">{c.ecc}</b>
                  <ArrowLeft size={14} strokeWidth={2} aria-hidden="true" />
                  <b className="nx-sap" dir="ltr">{c.s4}</b>
                </p>
                <dl className="ns4-ba">
                  <div><dt>ECC</dt><dd>{c.eccDesc}</dd></div>
                  <div><dt>S/4HANA</dt><dd>{c.s4Desc}</dd></div>
                </dl>
                <ul className="ns4-sg">
                  <li data-k="stay"><b>נשאר</b><span>{c.stays}</span></li>
                  <li data-k="gone"><b>הוסר</b><span>{c.gone}</span></li>
                </ul>
              </article>
            );
          })}
        </div>
      </Sec>

      {/* ==================================================== CUSTOM CODE */}
      <Sec
        id="ns4-code" n={3}
        icon={<Code2 size={15} strokeWidth={1.75} />}
        eyebrow="ABAP"
        title="השפעה על הקוד המותאם"
        lede={CUSTOM_CODE_NOTE}
      >
        <ul className="ns4-rows">
          {CUSTOM_CODE.map((r, i) => (
            <li key={i} style={{ "--r": RISK_C[r.risk || "low"] } as React.CSSProperties}>
              <header><b>{r.he}</b><Risk r={r.risk} /></header>
              {r.ecc ? <p><span className="ns4-lbl">ECC</span>{r.ecc}</p> : null}
              {r.s4 ? <p><span className="ns4-lbl">S/4HANA</span>{r.s4}</p> : null}
            </li>
          ))}
        </ul>
        <h3 className="ns4-h3">כלי בדיקה וניטור</h3>
        <Chips items={mon} />
      </Sec>

      {/* ==================================================== INTEGRATION */}
      <Sec
        id="ns4-int" n={4}
        icon={<Waypoints size={15} strokeWidth={1.75} />}
        eyebrow="ממשקים"
        title="שכבות האינטגרציה"
        lede={`${tr.integration} שכבות אינטגרציה, ECC מול S/4HANA.`}
      >
        <ul className="ns4-rows">
          {INTEGRATION.map((r, i) => (
            <li key={i}>
              <header><b>{r.he}</b><Trust t={r.trust} /></header>
              <p><span className="ns4-lbl">ECC</span>{r.ecc}</p>
              <p><span className="ns4-lbl">S/4HANA</span>{r.s4}</p>
            </li>
          ))}
        </ul>
      </Sec>

      {/* ======================================================= TESTING */}
      <Sec
        id="ns4-test" n={5}
        icon={<BadgeCheck size={15} strokeWidth={1.75} />}
        eyebrow="איכות"
        title="שכבות הבדיקה"
        lede={`${tr.testing} שכבות, מ-ABAP Unit ועד Reconciliation לאחר המעבר.`}
      >
        <ol className="ns4-steps">
          {TESTING.map((r, i) => (
            <li key={i}><span className="ns4-step-n">{i + 1}</span><span><b>{r.he}</b>{r.sub ? <em>{r.sub}</em> : null}</span></li>
          ))}
        </ol>
      </Sec>

      {/* ======================================================= CUTOVER */}
      <Sec
        id="ns4-cut" n={6}
        icon={<Route size={15} strokeWidth={1.75} />}
        eyebrow="Go-Live"
        title="Cutover"
        lede={`${tr.cutoverPhases} שלבים, ${tr.cutoverSteps} צעדים.`}
      >
        <div className="ns4-cut">
          {CUTOVER.map((p) => (
            <section key={p.phase} className="ns4-cut-p" style={{ "--s": p.c } as React.CSSProperties}>
              <h3 className="ns4-h3"><i aria-hidden="true" style={{ background: p.c }} />{p.phase}<span className="ns4-h3-n">{p.items.length}</span></h3>
              <ul className="ns4-check">{p.items.map((x, i) => <li key={i}>{x}</li>)}</ul>
            </section>
          ))}
        </div>
      </Sec>

      {/* ======================================================= LESSONS */}
      <Sec
        id="ns4-les" n={7}
        icon={<Sparkles size={15} strokeWidth={1.75} />}
        eyebrow="ניסיון"
        title="לקחים מפרויקטי מעבר"
        lede={`${tr.lessons} לקחים חוזרים בפרויקטי מעבר ל-S/4HANA.`}
      >
        <ul className="ns4-rows">
          {LESSONS.map((l, i) => (
            <li key={i} style={{ "--r": RISK_C[l.risk] } as React.CSSProperties}>
              <header><b>{l.he}</b><Risk r={l.risk} /></header>
              <p>{l.sub}</p>
            </li>
          ))}
        </ul>
      </Sec>

      <Credit />
    </div>
  );
}

/* ========================================================================== */
/*  /neo/s4-readiness/                                                        */
/* ========================================================================== */

export function S4ReadinessCenter() {
  const r = s4Readiness();
  const topics = s4Topics();
  const tt = s4TopicTotals();

  const AREA_HE: Record<string, string> = {
    Data: "מודל הנתונים", PP: "תכנון ייצור (PP)", PM: "תחזוקת מפעל (PM)", Platform: "פלטפורמה",
  };

  const nav: [string, string][] = [
    ["ns4-score", "מוכנות לפי מודול"],
    ["ns4-topics", "נושאי השינוי"],
  ];

  return (
    <div className="ns4 nm-scene" data-surface="s4" data-scene="s4">
      <Hero
        eyebrow="מוכנות ל-S/4HANA · READINESS"
        icon={<Gauge size={13} strokeWidth={2} aria-hidden="true" />}
        title="מוכנות ל-S/4HANA לפי מודול"
        lede={
          r.available
            ? <>ציון מוכנות לכל מודול, מחושב מ-{nf.format(r.tables)} טבלאות SAP מתועדות: כיסוי Fiori, כיסוי CDS, שיעור הטבלאות המסומנות כמוחלפות ואומדן עבודת הקוד המותאם. בנוסף {tt.total} נושאי שינוי ECC → S/4HANA, כל אחד עם סטטוס והשפעת מעבר.</>
            : <>ציון המוכנות אינו זמין, מכיוון שקטלוג טבלאות SAP לא נטען. {tt.total} נושאי השינוי מוצגים במלואם.</>
        }
        stats={
          r.available
            ? [
                [`${r.overall}%`, "מוכנות כוללת"],
                [r.mods.length, "מודולים"],
                [r.tables, "טבלאות SAP"],
                [r.highRisk, "מודולים בסיכון גבוה"],
                [tt.total, "נושאי שינוי"],
                [tt.withFioriCds, "עם Fiori או CDS"],
              ]
            : [[tt.total, "נושאי שינוי"], [tt.withSimplification, "עם פריט Simplification"]]
        }
        note={
          <>הציון נגזר מהתיעוד: Fiori, CDS, סטטוס S/4HANA ומספר הקשרים לכל טבלה. הוא מודד כיסוי תיעוד בלבד ואינו מחליף SAP Readiness Check.</>
        }
      />

      <SectionNav sections={nav.map(([id, label]) => ({ id, label }))} />

      <Sec
        id="ns4-score" n={1}
        icon={<Gauge size={15} strokeWidth={1.75} />}
        eyebrow="ציון"
        title="מוכנות לפי מודול"
        lede={r.available ? "מסודר לפי ציון, מהגבוה לנמוך." : undefined}
      >
        {r.available ? (
          <ul className="ns4-mods">
            {r.mods.map((m) => (
              <li key={m.mod} style={{ "--s": m.color } as React.CSSProperties}>
                <header>
                  <b>{m.he}</b>
                  <span className="ns4-mod-code nx-sap" dir="ltr">{m.mod}</span>
                  <span className="ns4-band">{m.band}</span>
                  <Risk r={m.risk} />
                  <span className="ns4-score nx-sap" dir="ltr">{m.score}%</span>
                </header>
                <div className="ns4-bar" role="img" aria-label={`ציון מוכנות ${m.score} אחוז`}>
                  <span style={{ inlineSize: `${m.score}%` }} />
                </div>
                <dl className="ns4-mod-kv">
                  <div><dt>טבלאות</dt><dd className="nx-sap">{nf.format(m.tables)}</dd></div>
                  <div><dt>Fiori</dt><dd className="nx-sap">{m.fioriPct}%</dd></div>
                  <div><dt>CDS</dt><dd className="nx-sap">{m.cdsPct}%</dd></div>
                  <div><dt>מסומן S/4HANA</dt><dd className="nx-sap">{m.s4Pct}%</dd></div>
                  <div><dt>מוחלף/הוסר</dt><dd className="nx-sap">{m.deprecatedPct}%</dd></div>
                  <div><dt>מורכבות</dt><dd className="nx-sap">{m.complexity}</dd></div>
                  <div><dt>אומדן</dt><dd>{m.effort}</dd></div>
                  <div><dt>קוד מותאם</dt><dd className="nx-sap">{nf.format(m.customCodeImpact)}</dd></div>
                </dl>
              </li>
            ))}
          </ul>
        ) : (
          <p className="ns4-silent">
            ציון המוכנות אינו זמין: קטלוג טבלאות SAP לא נטען.
          </p>
        )}
      </Sec>

      <Sec
        id="ns4-topics" n={2}
        icon={<GitBranch size={15} strokeWidth={1.75} />}
        eyebrow="שינויים"
        title="נושאי השינוי במעבר ל-S/4HANA"
        lede={`${tt.total} נושאים. ${Object.entries(tt.byArea).map(([a, n]) => `${AREA_HE[a] || a} ${n}`).join(" · ")}.`}
      >
        <ul className="ns4-topics">
          {topics.map((t) => (
            <li key={t.slug} style={{ "--s": t.statusColor } as React.CSSProperties}>
              <header>
                <b>{t.he}</b>
                <span className="ns4-topic-en nx-sap" dir="ltr">{t.title}</span>
                <span className="ns4-topic-st">{t.statusHe}</span>
                <span className="ns4-topic-area">{AREA_HE[t.area] || t.area}</span>
              </header>
              <dl className="ns4-ba">
                <div><dt>ECC</dt><dd>{t.ecc}</dd></div>
                <div><dt>S/4HANA</dt><dd>{t.s4}</dd></div>
              </dl>
              {t.fioriCds ? <p className="ns4-note"><span className="ns4-lbl">Fiori · CDS</span>{t.fioriCds}</p> : null}
              {t.simplification ? <p className="ns4-note"><span className="ns4-lbl">Simplification</span>{t.simplification}</p> : null}
              <p className="ns4-impact"><b>השפעת המעבר: </b>{t.impact}</p>
              {t.note ? <p className="ns4-note-x">{t.note}</p> : null}
            </li>
          ))}
        </ul>
      </Sec>

      <Credit />
    </div>
  );
}

/* ========================================================================== */
/*  /neo/migration-cockpit/                                                   */
/* ========================================================================== */

export function MigrationCockpit() {
  const objs = migObjects();
  const t = migTotals();
  const waves = Array.from({ length: t.waves }, (_, i) => i + 1);
  const catColor = Object.fromEntries(MIG_LOAD_LAYERS.map((l) => [l.cat, l.c]));
  const catHe = Object.fromEntries(MIG_LOAD_LAYERS.map((l) => [l.cat, l.he]));

  const nav: [string, string][] = [
    ["ns4-seq", "רצף הטעינה"],
    ["ns4-objs", "אובייקטי המעבר"],
    ["ns4-appr", "גישות העברת נתונים"],
    ["ns4-err", "שגיאות נפוצות"],
    ["ns4-qual", "איכות נתונים"],
    ["ns4-ready", "קריטריוני מוכנות"],
    ["ns4-check", "רשימת ביצוע"],
  ];

  return (
    <div className="ns4 nm-scene" data-surface="s4" data-scene="s4">
      <Hero
        eyebrow="קוקפיט המעבר · MIGRATION COCKPIT"
        icon={<Truck size={13} strokeWidth={2} aria-hidden="true" />}
        title="אובייקטי המעבר ורצף הטעינה"
        lede={
          <>
            {t.objects} אובייקטי מעבר ב-Migration Cockpit, עם {nf.format(t.eccRefs)} הפניות
            ל-{nf.format(t.eccTables)} טבלאות מקור נבדלות ב-ECC. רצף הטעינה מחושב מהתלויות בין האובייקטים.
          </>
        }
        stats={[
          [t.objects, "אובייקטים"],
          [t.eccTables, "טבלאות ECC"],
          [t.waves, "גלי טעינה"],
          [t.byRisk.high || 0, "בסיכון גבוה"],
          [t.errors, "דפוסי שגיאה"],
          [t.checklist, "צעדי ביצוע"],
        ]}
        note={
          <>
            {t.curated} אובייקטים מסומנים כתיעוד מאומת ו-{t.needsVerification} כנדרש אימות נוסף בהתאם לגרסת המערכת.
            הסימון מופיע על כל אובייקט. {t.eccLinked} מטבלאות ה-ECC מקושרות לדף טבלה מלא בפרויקט.
          </>
        }
      />

      <SectionNav sections={nav.map(([id, label]) => ({ id, label }))} />

      {/* ======================================================= SEQUENCE */}
      <Sec
        id="ns4-seq" n={1}
        icon={<Layers size={15} strokeWidth={1.75} />}
        eyebrow="סדר"
        title="רצף הטעינה"
        lede="כל גל מכיל אובייקטים שכל התלויות שלהם נטענו בגלים הקודמים."
      >
        <div className="ns4-waves">
          {waves.map((w) => {
            const list = objs.filter((o) => o.wave === w);
            return (
              <section key={w} className="ns4-wave">
                <h3 className="ns4-h3">גל {w}<span className="ns4-h3-n">{list.length}</span></h3>
                <ul className="ns4-wave-l">
                  {list.map((o) => (
                    <li key={o.id} style={{ "--s": catColor[o.cat] } as React.CSSProperties}>
                      <b>{o.he}</b>
                      <em className="nx-sap" dir="ltr">{o.name}</em>
                      <span className="ns4-cat">{catHe[o.cat]}</span>
                    </li>
                  ))}
                </ul>
              </section>
            );
          })}
        </div>
      </Sec>

      {/* ======================================================== OBJECTS */}
      <Sec
        id="ns4-objs" n={2}
        icon={<Boxes size={15} strokeWidth={1.75} />}
        eyebrow="קטלוג"
        title="אובייקטי המעבר"
        lede={`${t.objects} אובייקטים. ${MIG_LOAD_LAYERS.map((l) => `${l.he.replace(/^\d+ · /, "")} ${t.byCat[l.cat] || 0}`).join(" · ")}.`}
      >
        <div className="ns4-objs">
          {objs.map((o) => (
            <article key={o.id} className="ns4-obj" style={{ "--s": catColor[o.cat] } as React.CSSProperties}>
              <header className="ns4-obj-h">
                <b className="ns4-obj-n">{o.he}</b>
                <span className="ns4-obj-en nx-sap" dir="ltr">{o.name}</span>
                <span className="ns4-kind">{catHe[o.cat]}</span>
                <span className="ns4-kind nx-sap" dir="ltr">{o.module}</span>
                <Risk r={o.risk} />
                <span className="ns4-wave-b">גל {o.wave}</span>
                <Trust t={o.trust} />
              </header>

              <dl className="ns4-ba">
                <div><dt>מפתח</dt><dd className="nx-sap" dir="ltr">{o.keys}</dd></div>
              </dl>

              <h4 className="ns4-h4">טבלאות המקור ב-ECC</h4>
              {o.eccLinks.length
                ? <Chips items={o.eccLinks} />
                : <p className="ns4-silent">לאובייקט זה לא מתועדת טבלת מקור ב-ECC.</p>}

              {o.dependsHe.length ? (
                <>
                  <h4 className="ns4-h4">נטען לאחר</h4>
                  <ul className="ns4-dep">{o.dependsHe.map((d) => <li key={d.id}>{d.he}</li>)}</ul>
                </>
              ) : (
                <p className="ns4-free"><CheckCircle2 size={12} strokeWidth={2} aria-hidden="true" /> ללא תלויות, נטען בגל הראשון.</p>
              )}

              {o.unlocks.length ? (
                <>
                  <h4 className="ns4-h4">תנאי מקדים ל</h4>
                  <ul className="ns4-dep" data-tone="fwd">{o.unlocks.map((d) => <li key={d.id}>{d.he}</li>)}</ul>
                </>
              ) : null}

              {o.note ? <p className="ns4-why">{o.note}</p> : null}
            </article>
          ))}
        </div>
      </Sec>

      {/* ===================================================== APPROACHES */}
      <Sec
        id="ns4-appr" n={3}
        icon={<Route size={15} strokeWidth={1.75} />}
        eyebrow="שיטה"
        title="גישות העברת נתונים"
        lede={`${t.approaches} גישות, ומתי כל אחת מתאימה.`}
      >
        <ul className="ns4-rows">
          {APPROACHES.map((a) => (
            <li key={a.id}>
              <header>
                <b>{a.he}</b>
                <span className="ns4-topic-en nx-sap" dir="ltr">{a.en}</span>
                <Trust t={a.trust} />
              </header>
              <p>{a.desc}</p>
              <p><span className="ns4-lbl">מתי</span>{a.when}</p>
              {a.note ? <p className="ns4-note-x">{a.note}</p> : null}
            </li>
          ))}
        </ul>
      </Sec>

      {/* ========================================================= ERRORS */}
      <Sec
        id="ns4-err" n={4}
        icon={<AlertTriangle size={15} strokeWidth={1.75} />}
        eyebrow="תקלות"
        title="שגיאות טעינה נפוצות"
        lede={`${t.errors} דפוסי שגיאה ב-LTMC: סימפטום, סיבה ותיקון.`}
      >
        <ul className="ns4-errs">
          {MIG_ERRORS.map((e, i) => (
            <li key={i}>
              <header><b>{e.he}</b><Trust t={e.trust} /></header>
              <p><span className="ns4-lbl">סימפטום</span>{e.symptom}</p>
              <p><span className="ns4-lbl">סיבה</span>{e.cause}</p>
              <p><span className="ns4-lbl">תיקון</span>{e.fix}</p>
            </li>
          ))}
        </ul>
      </Sec>

      {/* ======================================================== QUALITY */}
      <Sec
        id="ns4-qual" n={5}
        icon={<BadgeCheck size={15} strokeWidth={1.75} />}
        eyebrow="נתונים"
        title="ממדי איכות הנתונים"
        lede={`${t.quality} ממדים לבדיקה לפני הטעינה.`}
      >
        <ul className="ns4-rows">
          {QUALITY_DIMS.map((q) => (
            <li key={q.he}><header><b>{q.he}</b></header><p>{q.sub}</p></li>
          ))}
        </ul>
      </Sec>

      {/* ====================================================== READINESS */}
      <Sec
        id="ns4-ready" n={6}
        icon={<Gauge size={15} strokeWidth={1.75} />}
        eyebrow="מוכנות"
        title="קריטריוני מוכנות"
        lede={`${t.readiness} קריטריונים, ${t.readinessWeight} נקודות משקל בסך הכול, כפי שנקבעו בתיעוד הפרויקט.`}
      >
        <ul className="ns4-weights">
          {READINESS.map((r) => (
            <li key={r.he}>
              <span className="ns4-w-he">{r.he}</span>
              <span className="ns4-w-bar" aria-hidden="true"><i style={{ inlineSize: `${(r.w / t.readinessWeight) * 100}%` }} /></span>
              <span className="ns4-w-n nx-sap" dir="ltr">{r.w}</span>
            </li>
          ))}
        </ul>
      </Sec>

      {/* ====================================================== CHECKLIST */}
      <Sec
        id="ns4-check" n={7}
        icon={<ClipboardList size={15} strokeWidth={1.75} />}
        eyebrow="ביצוע"
        title="רשימת הביצוע"
        lede={`${t.checklist} צעדים, מהפעלת התרחיש ועד מסירה ל-Cutover.`}
      >
        <ol className="ns4-steps">
          {MIG_CHECKLIST.map((c, i) => (
            <li key={i}><span className="ns4-step-n">{i + 1}</span><span><b>{c}</b></span></li>
          ))}
        </ol>
      </Sec>

      <Credit />
    </div>
  );
}
