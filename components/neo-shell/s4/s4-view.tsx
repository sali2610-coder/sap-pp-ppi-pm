/* ============================================================================
   PROJECT NEO · THE S/4HANA SURFACES — three pages, one language.
   ----------------------------------------------------------------------------
   SERVER components.

     /neo/s4hana/            the transformation board, the object catalogue,
                             the landscape and the method
     /neo/s4-readiness/      the module coverage matrix and the 18 changes
     /neo/migration-cockpit/ the load route, the objects and what breaks

   THE SHAPE (2026-10), shared with the module and domain pages: a hero with a
   ledger whose every count opens its section, compact section heads (a badge
   with the section's icon and number, the title and its count), and one
   signature per page that shows the whole subject at once: the board of the 29
   changes, the matrix of 15 modules, the route of 24 migration objects.

   ONE COLOUR RULE: status is a small dot immediately followed by its word. The
   hexes are the datasets' own (data/s4-objects, s4-architecture, ecc-s4 and
   the readiness bands), so "removed" is the same colour here as anywhere else;
   they are never a stripe, a fill or a text colour.

   AND ONE HONESTY RULE: `trust` is printed. Every one of these datasets marks
   curated vs needs-verification per record. A page that hides that flag turns a
   flagged assumption into an assertion, which is the one thing this product may
   never do.
   ========================================================================== */

import Link from "next/link";
import {
  AlertTriangle, ArrowLeft, BadgeCheck, Code2, Database, Gauge, GitBranch, Layers, Network,
  Rocket, Route, ShieldQuestion, Sparkles, Truck, Waypoints,
} from "lucide-react";
import { SectionNav } from "@/components/neo-shell/workspace/section-nav";
import { SmartReturn } from "@/components/neo-shell/nav-context";
import { Rtl } from "@/components/neo-shell/rtl-text";
import { S4Catalog } from "./s4-catalog";
import { S4Reveal } from "./s4-reveal";
import { S4Route, type RouteStop } from "./s4-route";
import {
  APPROACHES, ARCH, ARCH_STATUS, CUSTOM_CODE, CUSTOM_CODE_NOTE, CUTOVER, EXEC_NARRATIVE,
  INTEGRATION, LESSONS, MIG_CHECKLIST, MIG_ERRORS, MIG_LOAD_LAYERS, QUALITY_DIMS, READINESS,
  STATUS_COLOR, STATUS_HE, TESTING, migObjects, migTotals, monitorLinks, s4Objects,
  s4ObjectTotals, s4Readiness, s4TopicTotals, s4Topics, transformTotals, type S4Link,
} from "./s4-data";

const nf = new Intl.NumberFormat("he-IL");
/** "טבלה אחת" / "56 טבלאות": Hebrew counts agree with one. */
const count = (n: number, one: string, many: string) => (n === 1 ? one : `${nf.format(n)} ${many}`);

const RISK_HE: Record<string, string> = { high: "סיכון גבוה", medium: "סיכון בינוני", low: "סיכון נמוך" };
const RISK_C: Record<string, string> = {
  high: "var(--status-blocked, #dc2626)",
  medium: "var(--status-in-analysis, #d97706)",
  low: "var(--status-done, #16a34a)",
};
const RISK_SHORT: Record<string, string> = { high: "גבוה", medium: "בינוני", low: "נמוך" };
const TRUST_HE: Record<string, string> = { curated: "תיעוד הפרויקט", "needs-verification": "נדרש אימות נוסף" };

/* ------------------------------------------------------------- primitives */

/** STATUS: a small dot immediately followed by its own word. */
const Dot = ({ c, children }: { c: string; children: React.ReactNode }) => (
  <span className="ns4-st" style={{ "--c": c } as React.CSSProperties}>{children}</span>
);
const Risk = ({ r }: { r?: string }) => (!r ? null : <Dot c={RISK_C[r]}>{RISK_HE[r] || r}</Dot>);
const Trust = ({ t }: { t?: string }) =>
  !t ? null : <span className="ns4-trust" data-t={t}>{TRUST_HE[t] || t}</span>;

/** One section: a badge with its icon and number, the title, the count of
 *  what it holds, and one line of orientation. */
function Sec({
  id, n, icon, title, count, lede, children,
}: {
  id: string; n: number; icon: React.ReactNode; title: string;
  count?: string; lede?: React.ReactNode; children: React.ReactNode;
}) {
  return (
    <section className="ns4-sec nm-rise nm-once" id={id} aria-labelledby={`${id}-h`}>
      <header className="ns4-sec-h">
        <span className="ns4-badge" aria-hidden="true">{icon}<b>{String(n).padStart(2, "0")}</b></span>
        <div className="ns4-sec-t">
          <h2 className="ns4-h2" id={`${id}-h`}>
            <span><Rtl s={title} /></span>
            {count ? <span className="ns4-pill">{count}</span> : null}
          </h2>
          {lede ? <p className="ns4-sec-s">{lede}</p> : null}
        </div>
      </header>
      <div className="ns4-sec-b">{children}</div>
    </section>
  );
}

/** The hero: kicker, title, lede, an optional lead block, a ledger whose every
 *  count opens the section that holds it, and the trust line. */
function Hero({
  he, en, icon, title, lede, stats, note, children,
}: {
  he: string; en: string; icon: React.ReactNode; title: string; lede: React.ReactNode;
  stats: [number | string, string, string][]; note?: React.ReactNode; children?: React.ReactNode;
}) {
  return (
    <header className="ns4-hero">
      <p className="ns4-eye">
        {icon}
        <span>{he}</span>
        <i aria-hidden="true" />
        <span lang="en">{en}</span>
      </p>
      <h1 className="ns4-h1"><Rtl s={title} /></h1>
      <p className="ns4-lede">{lede}</p>
      {children}
      <ul className="ns4-led" aria-label="העמוד במספרים">
        {stats.map(([v, l, href]) => (
          <li key={l}>
            <a href={href}>
              <b className="nx-sap">{typeof v === "number" ? nf.format(v) : v}</b>{" "}
              <span>{l}</span>
            </a>
          </li>
        ))}
      </ul>
      {note ? (
        <p className="ns4-gap">
          <ShieldQuestion size={14} strokeWidth={1.75} aria-hidden="true" />
          <span>{note}</span>
        </p>
      ) : null}
    </header>
  );
}

/** Before and after, for any record that states both. */
function FromTo({ ecc, s4, eccLabel = "ECC", s4Label = "S/4HANA" }: { ecc?: string; s4?: string; eccLabel?: string; s4Label?: string }) {
  if (!ecc && !s4) return null;
  return (
    <dl className="ns4-ft">
      {ecc ? <div><dt>{eccLabel}</dt><dd><Rtl s={ecc} /></dd></div> : null}
      {s4 ? <div data-k="s4"><dt>{s4Label}</dt><dd><Rtl s={s4} /></dd></div> : null}
    </dl>
  );
}

function Chips({ items }: { items: S4Link[] }) {
  if (!items.length) return null;
  return (
    <div className="ns4-chips">
      {items.map((l, i) =>
        l.href
          ? <Link key={`${l.t}-${i}`} className="ns4-chip" data-live="1" href={l.href} prefetch={false}><span className="nx-sap" dir="ltr">{l.t}</span></Link>
          : <span key={`${l.t}-${i}`} className="ns4-chip" data-live="0"><span className="nx-sap" dir="ltr">{l.t}</span></span>,
      )}
    </div>
  );
}

const Credit = () => (
  <footer className="ns4-foot">
    <p className="ns4-src">התוכן מוצג כפי שנכתב בתיעוד הפרויקט.</p>
    <p className="ns4-credit">Project NEO · CBC Israel · פותח על ידי סאלי חליף · Web Coding</p>
  </footer>
);

/* ========================================================================== */
/*  /neo/s4hana/                                                              */
/* ========================================================================== */

export function S4HanaCenter() {
  const objs = s4Objects();
  const t = s4ObjectTotals();
  const tr = transformTotals();
  const mon = monitorLinks();

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
      <SmartReturn fallback={{ href: "/neo/", label: "מסך הבית" }} />
      <Hero
        he="מרכז S/4HANA"
        en="TRANSFORMATION"
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
          [t.total, "אובייקטים", "#ns4-cat"],
          [t.byStatus.replaced || 0, "הוחלפו", "#ns4-cat"],
          [t.byStatus.removed || 0, "בוטלו", "#ns4-cat"],
          [t.byRisk.high || 0, "בסיכון גבוה", "#ns4-cat"],
          [t.abapNotes, "הערות ABAP", "#ns4-code"],
          [t.checklistItems, "פריטי בדיקה", "#ns4-cat"],
        ]}
        note={
          <>
            {t.curated} מתוך {t.total} האובייקטים מבוססים על תיעוד הפרויקט; הסימון מופיע על כל כרטיס.
            לפני החלטת מעבר יש לאמת את השינוי מול תיעוד SAP לגרסה ולמהדורה שלך.
            {" "}{t.linked} מהם מקושרים לדף אובייקט מלא בפרויקט, עם המקורות הזמינים במאגר.
          </>
        }
      >
        <p className="ns4-narr"><Rtl s={EXEC_NARRATIVE} /></p>
      </Hero>

      <SectionNav sections={nav.map(([id, label]) => ({ id, label }))} />

      {/* =================================================== THE CATALOGUE */}
      <Sec
        id="ns4-cat" n={1}
        icon={<Database size={15} strokeWidth={1.75} />}
        title="קטלוג האובייקטים"
        count={`${nf.format(t.total)} אובייקטים`}
        lede="הלוח מציג את כל האובייקטים לפי מה שקורה להם במעבר. לחיצה על שם פותחת את הכרטיס המלא."
      >
        <S4Catalog objs={objs} />
      </Sec>

      {/* ================================================== ARCHITECTURE */}
      <Sec
        id="ns4-arch" n={2}
        icon={<Network size={15} strokeWidth={1.75} />}
        title="רכיבי הארכיטקטורה לפי שכבה"
        count={`${nf.format(tr.arch)} רכיבים`}
        lede="לכל שכבה: הרכיב ב-ECC והרכיב ב-S/4HANA, מה נשאר ומה הוסר."
      >
        <div className="ns4-grid ns4-grid--2">
          {ARCH.map((c) => {
            const meta = ARCH_STATUS[c.status];
            return (
              <article key={c.id} className="ns4-card">
                <header className="ns4-card-h">
                  <h3 className="ns4-card-t">{c.layerHe}</h3>
                  <Dot c={meta.c}>{meta.he}</Dot>
                  <Risk r={c.risk} />
                </header>
                <p className="ns4-pair">
                  <bdi className="nx-sap" dir="ltr">{c.ecc}</bdi>
                  <ArrowLeft size={14} strokeWidth={2} aria-hidden="true" />
                  <bdi className="nx-sap" dir="ltr">{c.s4}</bdi>
                </p>
                <FromTo ecc={c.eccDesc} s4={c.s4Desc} eccLabel="ב-ECC" s4Label="ב-S/4HANA" />
                <ul className="ns4-sg">
                  <li data-k="stay"><b>נשאר</b><span><Rtl s={c.stays} /></span></li>
                  <li data-k="gone"><b>הוסר</b><span><Rtl s={c.gone} /></span></li>
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
        title="השפעה על הקוד המותאם"
        count={`${nf.format(tr.customCode)} דפוסים`}
        lede="דפוסי קוד מותאם שמשתנים במעבר, מה עשו ב-ECC ומה עושים ב-S/4HANA."
      >
        <div className="ns4-tbl-w">
          <table className="ns4-tbl">
            <caption className="sr-only">דפוסי קוד מותאם: ECC מול S/4HANA</caption>
            <thead>
              <tr><th scope="col">דפוס</th><th scope="col">ECC</th><th scope="col">S/4HANA</th><th scope="col">סיכון</th></tr>
            </thead>
            <tbody>
              {CUSTOM_CODE.map((r, i) => (
                <tr key={i}>
                  <th scope="row" data-l="דפוס"><Rtl s={r.he} /></th>
                  <td data-l="ECC">{r.ecc ? <Rtl s={r.ecc} /> : "–"}</td>
                  <td data-l="S/4HANA">{r.s4 ? <Rtl s={r.s4} /> : "–"}</td>
                  <td data-l="סיכון"><Risk r={r.risk} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="ns4-fine"><Rtl s={CUSTOM_CODE_NOTE} /></p>
        <div className="ns4-kv">
          <span className="ns4-lbl">כלי בדיקה וניטור</span>
          <Chips items={mon} />
        </div>
      </Sec>

      {/* ==================================================== INTEGRATION */}
      <Sec
        id="ns4-int" n={4}
        icon={<Waypoints size={15} strokeWidth={1.75} />}
        title="שכבות האינטגרציה"
        count={`${nf.format(tr.integration)} שכבות`}
        lede="כל שכבת אינטגרציה, ECC מול S/4HANA, עם מקור הקביעה."
      >
        <div className="ns4-tbl-w">
          <table className="ns4-tbl">
            <caption className="sr-only">שכבות האינטגרציה: ECC מול S/4HANA</caption>
            <thead>
              <tr><th scope="col">שכבה</th><th scope="col">ECC</th><th scope="col">S/4HANA</th><th scope="col">מקור</th></tr>
            </thead>
            <tbody>
              {INTEGRATION.map((r, i) => (
                <tr key={i}>
                  <th scope="row" data-l="שכבה"><Rtl s={r.he} /></th>
                  <td data-l="ECC"><Rtl s={r.ecc} /></td>
                  <td data-l="S/4HANA"><Rtl s={r.s4} /></td>
                  <td data-l="מקור"><Trust t={r.trust} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Sec>

      {/* ======================================================= TESTING */}
      <Sec
        id="ns4-test" n={5}
        icon={<BadgeCheck size={15} strokeWidth={1.75} />}
        title="שכבות הבדיקה"
        count={`${nf.format(tr.testing)} שכבות`}
        lede="מ-ABAP Unit ועד Reconciliation לאחר המעבר, לפי הסדר."
      >
        <ol className="ns4-tiles">
          {TESTING.map((r, i) => (
            <li key={i}>
              <i aria-hidden="true">{i + 1}</i>
              <div>
                <b><Rtl s={r.he} /></b>
                {r.sub ? <p><Rtl s={r.sub} /></p> : null}
              </div>
            </li>
          ))}
        </ol>
      </Sec>

      {/* ======================================================= CUTOVER */}
      <Sec
        id="ns4-cut" n={6}
        icon={<Route size={15} strokeWidth={1.75} />}
        title="Cutover"
        count={`${nf.format(tr.cutoverPhases)} שלבים · ${nf.format(tr.cutoverSteps)} צעדים`}
        lede="שלושת שלבי ה-Go-Live לפי הסדר, וצעדי הביצוע של כל שלב."
      >
        <ol className="ns4-phases">
          {CUTOVER.map((p, pi) => (
            <li key={p.phase} className="ns4-phase">
              <header>
                <i aria-hidden="true">{pi + 1}</i>
                <h3><Dot c={p.c}><Rtl s={p.phase} /></Dot></h3>
                <span className="ns4-pill">{nf.format(p.items.length)} צעדים</span>
              </header>
              <ul className="ns4-check">
                {p.items.map((x, i) => <li key={i}><Rtl s={x} /></li>)}
              </ul>
            </li>
          ))}
        </ol>
      </Sec>

      {/* ======================================================= LESSONS */}
      <Sec
        id="ns4-les" n={7}
        icon={<Sparkles size={15} strokeWidth={1.75} />}
        title="לקחים מפרויקטי מעבר"
        count={`${nf.format(tr.lessons)} לקחים`}
        lede="לקחים חוזרים בפרויקטי מעבר ל-S/4HANA, לפי רמת הסיכון."
      >
        <ul className="ns4-grid ns4-grid--3">
          {LESSONS.map((l, i) => (
            <li key={i} className="ns4-card">
              <header className="ns4-card-h">
                <h3 className="ns4-card-t"><Rtl s={l.he} /></h3>
              </header>
              <p className="ns4-card-p"><Rtl s={l.sub} /></p>
              <p className="ns4-card-f"><Risk r={l.risk} /></p>
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

const AREA_HE: Record<string, string> = {
  Data: "מודל הנתונים", PP: "תכנון ייצור (PP)", PM: "תחזוקת מפעל (PM)", Platform: "פלטפורמה",
};
const AREA_ORDER = ["Data", "PP", "PM", "Platform"];
const TOPIC_STATUS = ["Replaced", "Changed", "Deprecated", "Unchanged"] as const;

export function S4ReadinessCenter() {
  const r = s4Readiness();
  const topics = s4Topics();
  const tt = s4TopicTotals();
  const areas = AREA_ORDER.filter((a) => topics.some((t) => t.area === a));
  const bands = Object.entries(r.bands);

  const nav: [string, string][] = [
    ["ns4-score", "מוכנות לפי מודול"],
    ["ns4-topics", "נושאי השינוי"],
  ];

  return (
    <div className="ns4 nm-scene" data-surface="s4" data-scene="s4">
      <SmartReturn fallback={{ href: "/neo/", label: "מסך הבית" }} />
      <Hero
        he="כיסוי תיעוד למעבר"
        en="READINESS COVERAGE"
        icon={<Gauge size={13} strokeWidth={2} aria-hidden="true" />}
        title="כיסוי תיעוד למעבר ל-S/4HANA לפי מודול"
        lede={
          r.available
            ? <>ציון כיסוי תיעוד לכל מודול, מחושב מ-{nf.format(r.tables)} טבלאות SAP מתועדות: כיסוי Fiori, כיסוי CDS, שיעור הטבלאות המסומנות כמוחלפות ואומדן עבודת הקוד המותאם. בנוסף {tt.total} נושאי שינוי ECC → S/4HANA, כל אחד עם סטטוס והשפעת מעבר.</>
            : <>ציון המוכנות אינו זמין, מכיוון שקטלוג טבלאות SAP לא נטען. {tt.total} נושאי השינוי מוצגים במלואם.</>
        }
        stats={
          r.available
            ? [
                [`${r.overall}%`, `כיסוי תיעוד למעבר · מדגם ${nf.format(r.tables)} טבלאות`, "#ns4-score"],
                [r.mods.length, "מודולים", "#ns4-score"],
                [r.tables, "טבלאות SAP", "#ns4-score"],
                [r.highRisk, "מודולים בסיכון גבוה", "#ns4-score"],
                [tt.total, "נושאי שינוי", "#ns4-topics"],
                [tt.withFioriCds, "עם Fiori או CDS", "#ns4-topics"],
              ]
            : [[tt.total, "נושאי שינוי", "#ns4-topics"], [tt.withSimplification, "עם פריט Simplification", "#ns4-topics"]]
        }
        note={
          <>
            הציון נגזר מהתיעוד: Fiori, CDS, סטטוס S/4HANA ומספר הקשרים לכל טבלה. הוא מודד כיסוי תיעוד בלבד ואינו מחליף SAP Readiness Check.
            {r.available ? <> הציון הכולל הוא ממוצע המודולים שיש להם טבלאות במאגר.</> : null}
          </>
        }
      />

      <SectionNav sections={nav.map(([id, label]) => ({ id, label }))} />

      <Sec
        id="ns4-score" n={1}
        icon={<Gauge size={15} strokeWidth={1.75} />}
        title="מוכנות לפי מודול"
        count={r.available ? `${nf.format(r.mods.length)} מודולים` : undefined}
        lede={r.available ? "כל מודול בשורה אחת, מהציון הגבוה לנמוך. האחוזים הם שיעור הטבלאות המתועדות של המודול." : undefined}
      >
        {r.available ? (
          <>
            <p className="ns4-legend">
              {bands.map(([b, n]) => (
                <span key={b}><span className="ns4-tag" lang="en">{b}</span> {count(n, "מודול אחד", "מודולים")}</span>
              ))}
            </p>
            <div className="ns4-tbl-w">
              <table className="ns4-tbl ns4-mx">
                <caption className="sr-only">כיסוי תיעוד למעבר לפי מודול</caption>
                <thead>
                  <tr>
                    <th scope="col" rowSpan={2}>מודול</th>
                    <th scope="col" rowSpan={2}>ציון</th>
                    <th scope="col" rowSpan={2}>מצב</th>
                    <th scope="col" rowSpan={2}>סיכון</th>
                    <th scope="col" colSpan={4} className="ns4-th-g">שיעור הטבלאות</th>
                    <th scope="col" rowSpan={2}>קוד מותאם</th>
                    <th scope="col" rowSpan={2}>אובייקטי מעבר</th>
                    <th scope="col" rowSpan={2}>מורכבות ואומדן<span className="ns4-th-sub">לא תוכנית מאומתת</span></th>
                  </tr>
                  <tr>
                    <th scope="col">Fiori</th>
                    <th scope="col">CDS</th>
                    <th scope="col">סימון S/4HANA</th>
                    <th scope="col">הוחלף או הוסר</th>
                  </tr>
                </thead>
                <tbody>
                  {r.mods.map((m) => (
                    <tr key={m.mod}>
                      <th scope="row" data-l="מודול">
                        <b>{m.he}</b>
                        <span className="ns4-mx-sub"><bdi className="nx-sap" dir="ltr">{m.mod}</bdi> · {count(m.tables, "טבלה אחת", "טבלאות")}</span>
                        {m.tables === 0 ? <span className="ns4-mx-note">אין טבלאות במאגר; ערכים קבועים לפי כוונת הארכיטקטורה</span> : null}
                      </th>
                      <td data-l="ציון">
                        <span className="ns4-sc">
                          <bdi className="nx-sap">{m.score}%</bdi>
                          <span className="ns4-meter" aria-hidden="true"><i style={{ inlineSize: `${m.score}%` }} /></span>
                        </span>
                      </td>
                      <td data-l="מצב"><bdi lang="en" dir="ltr">{m.band}</bdi></td>
                      <td data-l="סיכון"><Dot c={RISK_C[m.risk]}>{RISK_SHORT[m.risk]}</Dot></td>
                      <td data-l="Fiori"><bdi className="nx-sap">{m.fioriPct}%</bdi></td>
                      <td data-l="CDS"><bdi className="nx-sap">{m.cdsPct}%</bdi></td>
                      <td data-l="סימון S/4HANA"><bdi className="nx-sap">{m.s4Pct}%</bdi></td>
                      <td data-l="הוחלף או הוסר"><bdi className="nx-sap">{m.deprecatedPct}%</bdi></td>
                      <td data-l="קוד מותאם"><bdi className="nx-sap">{nf.format(m.customCodeImpact)}</bdi></td>
                      <td data-l="אובייקטי מעבר">
                        {m.migrationObjs
                          ? <Link className="ns4-mx-link" href="/neo/migration-cockpit/#ns4-objs" prefetch={false}><bdi className="nx-sap">{nf.format(m.migrationObjs)}</bdi></Link>
                          : <bdi className="nx-sap">0</bdi>}
                      </td>
                      <td data-l="מורכבות ואומדן"><bdi className="nx-sap">{m.complexity}</bdi><span className="ns4-mx-eff"><bdi>{m.effort}</bdi></span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Read from lib/s4-readiness.ts (moduleScore). A change to the
                formula there must be mirrored here. */}
            <details className="ns4-how">
              <summary>איך מחושבים הערכים בטבלה</summary>
              <dl className="ns4-defs">
                <div><dt>ציון</dt><dd><Rtl s="Fiori 30%, CDS 30%, סימון S/4HANA 25%, טבלאות שלא הוחלפו ולא הוסרו 15%. מודול שרוב טבלאותיו בענן (SF, SAC, Datasphere) מקבל לפחות 80." /></dd></div>
                <div><dt>מצב</dt><dd><Rtl s="S/4 Ready: ציון 70 ומעלה, ופחות מ-25% מהטבלאות הוחלפו או הוסרו. Hybrid: ציון 35 ומעלה, או טבלה אחת לפחות עם סימון S/4HANA." /></dd></div>
                <div><dt>סיכון</dt><dd><Rtl s="גבוה: 30% ומעלה מהטבלאות הוחלפו או הוסרו, או 5 טבלאות כאלה ומעלה. בינוני: 10% ומעלה, או 2 ומעלה." /></dd></div>
                <div><dt>קוד מותאם</dt><dd>מספר הטבלאות שהוחלפו או הוסרו. קריאה ישירה אליהן מקוד מותאם תישבר.</dd></div>
                <div><dt>אובייקטי מעבר</dt><dd><Rtl s="אובייקטי Migration Cockpit של המודול, או שאחת מטבלאות המקור שלהם שייכת למודול." /></dd></div>
                <div><dt>מורכבות ואומדן</dt><dd>לפי מספר הטבלאות, מספר הקשרים ומשקל משולש לטבלאות שהוחלפו או הוסרו. אומדן בלבד, לא תוכנית עבודה מאומתת.</dd></div>
              </dl>
            </details>
          </>
        ) : (
          <p className="ns4-silent">ציון המוכנות אינו זמין: קטלוג טבלאות SAP לא נטען.</p>
        )}
      </Sec>

      <Sec
        id="ns4-topics" n={2}
        icon={<GitBranch size={15} strokeWidth={1.75} />}
        title="נושאי השינוי במעבר ל-S/4HANA"
        count={`${nf.format(tt.total)} נושאים`}
        lede="הנושאים לפי תחום. בכל נושא: מה היה ב-ECC, מה יש ב-S/4HANA, והשפעת המעבר."
      >
        {/* The changes at a glance: how many topics of each status in each area,
            every row a way into its area's group below. */}
        <div className="ns4-tbl-w">
          <table className="ns4-tbl ns4-amx">
            <caption className="sr-only">נושאי השינוי לפי תחום וסטטוס</caption>
            <thead>
              <tr>
                <th scope="col">תחום</th>
                {TOPIC_STATUS.filter((s) => tt.byStatus[s]).map((s) => (
                  <th key={s} scope="col"><Dot c={STATUS_COLOR[s]}>{STATUS_HE[s]}</Dot></th>
                ))}
                <th scope="col">סה״כ</th>
              </tr>
            </thead>
            <tbody>
              {areas.map((a) => (
                <tr key={a}>
                  <th scope="row" data-l="תחום"><a href={`#ns4-area-${a}`}><Rtl s={AREA_HE[a] || a} /></a></th>
                  {TOPIC_STATUS.filter((s) => tt.byStatus[s]).map((s) => {
                    const n = topics.filter((t) => t.area === a && t.status === s).length;
                    return <td key={s} data-l={STATUS_HE[s]} data-zero={n ? undefined : "1"}><bdi className="nx-sap">{nf.format(n)}</bdi></td>;
                  })}
                  <td data-l="סה״כ"><bdi className="nx-sap">{nf.format(tt.byArea[a] || 0)}</bdi></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {areas.map((a) => (
          <section key={a} className="ns4-area" id={`ns4-area-${a}`} aria-labelledby={`ns4-area-${a}-h`}>
            <h3 className="ns4-area-h" id={`ns4-area-${a}-h`}>
              <span><Rtl s={AREA_HE[a] || a} /></span>
              <span className="ns4-pill">{nf.format(tt.byArea[a] || 0)} נושאים</span>
            </h3>
            <ul className="ns4-grid ns4-grid--2">
              {topics.filter((t) => t.area === a).map((t) => (
                <li key={t.slug} id={`topic-${t.slug}`} className="ns4-card">
                  <header className="ns4-card-h">
                    <h4 className="ns4-card-t"><Rtl s={t.he} /></h4>
                    <Dot c={t.statusColor}>{t.statusHe}</Dot>
                  </header>
                  <p className="ns4-card-en"><bdi lang="en" dir="ltr">{t.title}</bdi></p>
                  <FromTo ecc={t.ecc} s4={t.s4} />
                  <p className="ns4-impact"><b>השפעת המעבר</b> <Rtl s={t.impact} /></p>
                  {t.fioriCds || t.simplification || t.note ? (
                    <dl className="ns4-ft ns4-ft--meta">
                      {t.fioriCds ? <div><dt>Fiori · CDS</dt><dd><Rtl s={t.fioriCds} /></dd></div> : null}
                      {t.simplification ? <div><dt>Simplification</dt><dd><Rtl s={t.simplification} /></dd></div> : null}
                      {t.note ? <div><dt>הערה</dt><dd><Rtl s={t.note} /></dd></div> : null}
                    </dl>
                  ) : null}
                </li>
              ))}
            </ul>
          </section>
        ))}
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
  // The category is a word, never a colour: the dataset's layer hexes include a
  // violet the product does not use.
  // The dataset's layer label carries its load order ("1 · בסיס"). On a card
  // or a stop that number read as a second wave number, so it shows there as
  // the plain layer; the legend keeps the order, named as a layer.
  const catHe = Object.fromEntries(MIG_LOAD_LAYERS.map((l) => [l.cat, l.he.replace(/^\d+\s*·\s*/, "")]));
  const layerHe = (he: string) => he.replace(/^(\d+)\s*·\s*/, "שכבה $1 · ");

  const route = waves.map((w) => ({
    w,
    stops: objs.filter((o) => o.wave === w).map((o): RouteStop => ({
      id: o.id, he: o.he, name: o.name, catHe: catHe[o.cat] || o.cat,
      up: o.dependsHe, down: o.unlocks,
    })),
  }));

  const nav: [string, string][] = [
    ["ns4-seq", "רצף הטעינה והאובייקטים"],
    ["ns4-appr", "גישות העברת נתונים"],
    ["ns4-err", "שגיאות נפוצות"],
    ["ns4-qual", "איכות נתונים"],
    ["ns4-ready", "מוכנות וביצוע"],
  ];

  return (
    <div className="ns4 nm-scene" data-surface="s4" data-scene="s4">
      <SmartReturn fallback={{ href: "/neo/", label: "מסך הבית" }} />
      <S4Reveal prefix="mo-" />
      <Hero
        he="קוקפיט המעבר"
        en="MIGRATION COCKPIT"
        icon={<Truck size={13} strokeWidth={2} aria-hidden="true" />}
        title="אובייקטי המעבר ורצף הטעינה"
        lede={
          <>
            {t.objects} אובייקטי מעבר ב-Migration Cockpit, עם {nf.format(t.eccRefs)} הפניות
            ל-{nf.format(t.eccTables)} טבלאות מקור נבדלות ב-ECC. רצף הטעינה מחושב מהתלויות בין האובייקטים.
          </>
        }
        stats={[
          [t.objects, "אובייקטים", "#ns4-seq"],
          [t.eccTables, "טבלאות ECC", "#ns4-objs"],
          [t.waves, "גלי טעינה", "#ns4-seq"],
          [t.byRisk.high || 0, "בסיכון גבוה", "#ns4-objs"],
          [t.errors, "דפוסי שגיאה", "#ns4-err"],
          [t.checklist, "צעדי ביצוע", "#ns4-check"],
        ]}
        note={
          <>
            {t.curated} אובייקטים מבוססים על תיעוד הפרויקט ו-{t.needsVerification} מסומנים כנדרש אימות נוסף.
            לפני תכנון הטעינה יש לבדוק זמינות ושיטת מעבר בתיעוד SAP לגרסה ולמהדורה שלך.
            {" "}{t.eccLinked} מטבלאות ה-ECC מקושרות לדף טבלה מלא בפרויקט.
          </>
        }
      />

      <SectionNav sections={nav.map(([id, label]) => ({ id, label }))} />

      {/* ============================================= THE ROUTE AND THE OBJECTS */}
      <Sec
        id="ns4-seq" n={1}
        icon={<Layers size={15} strokeWidth={1.75} />}
        title="רצף הטעינה"
        count={`${nf.format(t.waves)} גלים · ${nf.format(t.objects)} אובייקטים`}
        lede="כל גל מכיל אובייקטים שכל התלויות שלהם נטענו בגלים הקודמים."
      >
        <S4Route waves={route} />
        <p className="ns4-legend">
          {MIG_LOAD_LAYERS.map((l) => (
            <span key={l.cat}><span className="ns4-tag">{layerHe(l.he)}</span> {count(t.byCat[l.cat] || 0, "אובייקט אחד", "אובייקטים")}</span>
          ))}
        </p>

        <div className="ns4-objs-h" id="ns4-objs">
          <h3 className="ns4-area-h">
            <span>אובייקטי המעבר</span>
            <span className="ns4-pill">{nf.format(t.objects)} אובייקטים</span>
          </h3>
          <p className="ns4-fine">לפי גלי הטעינה. הגל הראשון פתוח; לחיצה על אובייקט ברצף פותחת את הגל שלו.</p>
        </div>
        {waves.map((w) => {
          const list = objs.filter((o) => o.wave === w);
          return (
            <details key={w} className="ns4-group" open={w === waves[0]}>
              <summary>
                <b>גל {w}</b>
                <span className="ns4-pill">{count(list.length, "אובייקט אחד", "אובייקטים")}</span>
                <span className="ns4-sum-hint" aria-hidden="true">הצגה / צמצום</span>
              </summary>
              <div className="ns4-grid">
                {list.map((o) => (
                  <article key={o.id} id={`mo-${o.id}`} className="ns4-obj">
                    <header className="ns4-obj-h">
                      <h4 className="ns4-obj-t"><Rtl s={o.he} /></h4>
                      <Risk r={o.risk} />
                    </header>
                    <p className="ns4-meta">
                      <span className="ns4-tag nx-sap" dir="ltr">{o.name}</span>
                      <span className="ns4-tag">{catHe[o.cat]}</span>
                      <span className="ns4-tag nx-sap" dir="ltr">{o.module}</span>
                      <span className="ns4-tag">גל {o.wave}</span>
                      <Trust t={o.trust} />
                    </p>
                    <dl className="ns4-ft">
                      <div><dt>מפתח</dt><dd><bdi className="nx-sap" dir="ltr">{o.keys}</bdi></dd></div>
                    </dl>
                    <div className="ns4-kv">
                      <span className="ns4-lbl">טבלאות המקור ב-ECC</span>
                      {o.eccLinks.length
                        ? <Chips items={o.eccLinks} />
                        : <span className="ns4-silent">לאובייקט זה לא מתועדת טבלת מקור ב-ECC.</span>}
                    </div>
                    <div className="ns4-kv">
                      <span className="ns4-lbl">נטען לאחר</span>
                      {o.dependsHe.length
                        ? <ul className="ns4-dep">{o.dependsHe.map((d) => <li key={d.id}><a href={`#mo-${d.id}`}>{d.he}</a></li>)}</ul>
                        : <span className="ns4-free">ללא תלויות, נטען בגל הראשון.</span>}
                    </div>
                    {o.unlocks.length ? (
                      <div className="ns4-kv">
                        <span className="ns4-lbl">תנאי מקדים ל</span>
                        <ul className="ns4-dep" data-tone="fwd">{o.unlocks.map((d) => <li key={d.id}><a href={`#mo-${d.id}`}>{d.he}</a></li>)}</ul>
                      </div>
                    ) : null}
                    {o.note ? <p className="ns4-why"><Rtl s={o.note} /></p> : null}
                  </article>
                ))}
              </div>
            </details>
          );
        })}
      </Sec>

      {/* ===================================================== APPROACHES */}
      <Sec
        id="ns4-appr" n={2}
        icon={<Route size={15} strokeWidth={1.75} />}
        title="גישות העברת נתונים"
        count={`${nf.format(t.approaches)} גישות`}
        lede="כל גישה, מה היא עושה ומתי היא מתאימה."
      >
        <div className="ns4-tbl-w">
          <table className="ns4-tbl">
            <caption className="sr-only">גישות העברת נתונים</caption>
            <thead>
              <tr><th scope="col">גישה</th><th scope="col">מה היא עושה</th><th scope="col">מתי</th><th scope="col">מקור</th></tr>
            </thead>
            <tbody>
              {APPROACHES.map((a) => (
                <tr key={a.id}>
                  <th scope="row" data-l="גישה">
                    <b><Rtl s={a.he} /></b>
                    <span className="ns4-card-en"><bdi lang="en" dir="ltr">{a.en}</bdi></span>
                  </th>
                  <td data-l="מה היא עושה">
                    <Rtl s={a.desc} />
                    {a.note ? <span className="ns4-cell-note"><Rtl s={a.note} /></span> : null}
                  </td>
                  <td data-l="מתי"><Rtl s={a.when} /></td>
                  <td data-l="מקור"><Trust t={a.trust} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Sec>

      {/* ========================================================= ERRORS */}
      <Sec
        id="ns4-err" n={3}
        icon={<AlertTriangle size={15} strokeWidth={1.75} />}
        title="שגיאות טעינה נפוצות"
        count={`${nf.format(t.errors)} דפוסים`}
        lede="דפוסי שגיאה ב-LTMC: מה רואים, למה זה קורה ואיך מתקנים."
      >
        <ul className="ns4-grid ns4-grid--2">
          {MIG_ERRORS.map((e, i) => (
            <li key={i} className="ns4-card ns4-err">
              <header className="ns4-card-h">
                <h3 className="ns4-card-t"><Rtl s={e.he} /></h3>
                <Trust t={e.trust} />
              </header>
              <dl className="ns4-ft">
                <div><dt>סימפטום</dt><dd><Rtl s={e.symptom} /></dd></div>
                <div><dt>סיבה</dt><dd><Rtl s={e.cause} /></dd></div>
                <div data-k="fix"><dt>תיקון</dt><dd><Rtl s={e.fix} /></dd></div>
              </dl>
            </li>
          ))}
        </ul>
      </Sec>

      {/* ======================================================== QUALITY */}
      <Sec
        id="ns4-qual" n={4}
        icon={<BadgeCheck size={15} strokeWidth={1.75} />}
        title="ממדי איכות הנתונים"
        count={`${nf.format(t.quality)} ממדים`}
        lede="מה לבדוק בנתונים לפני הטעינה."
      >
        <ol className="ns4-tiles ns4-tiles--3">
          {QUALITY_DIMS.map((q, i) => (
            <li key={q.he}>
              <i aria-hidden="true">{i + 1}</i>
              <div>
                <b><Rtl s={q.he} /></b>
                <p><Rtl s={q.sub} /></p>
              </div>
            </li>
          ))}
        </ol>
      </Sec>

      {/* ============================================ READINESS AND THE RUN */}
      <Sec
        id="ns4-ready" n={5}
        icon={<Gauge size={15} strokeWidth={1.75} />}
        title="מוכנות לטעינה ורשימת הביצוע"
        count={`${nf.format(t.readiness)} קריטריונים · ${nf.format(t.checklist)} צעדים`}
        lede="מה צריך להתקיים לפני הטעינה, ובאיזה סדר מבצעים אותה."
      >
        <div className="ns4-two">
          <div>
            <h3 className="ns4-area-h">
              <span>קריטריוני מוכנות</span>
              <span className="ns4-pill"><bdi className="nx-sap">{nf.format(t.readinessWeight)}</bdi> נקודות משקל</span>
            </h3>
            <ul className="ns4-weights">
              {READINESS.map((r) => (
                <li key={r.he}>
                  <span className="ns4-w-he"><Rtl s={r.he} /></span>
                  <span className="ns4-meter" aria-hidden="true"><i style={{ inlineSize: `${(r.w / t.readinessWeight) * 100}%` }} /></span>
                  <bdi className="ns4-w-n nx-sap">{r.w}</bdi>
                </li>
              ))}
            </ul>
            <p className="ns4-fine">המשקלות כפי שנקבעו בתיעוד הפרויקט.</p>
          </div>
          <div id="ns4-check">
            <h3 className="ns4-area-h">
              <span>רשימת הביצוע</span>
              <span className="ns4-pill">{nf.format(t.checklist)} צעדים</span>
            </h3>
            <ol className="ns4-steps">
              {MIG_CHECKLIST.map((c, i) => (
                <li key={i}><i aria-hidden="true">{i + 1}</i><span><Rtl s={c} /></span></li>
              ))}
            </ol>
          </div>
        </div>
      </Sec>

      <Credit />
    </div>
  );
}
