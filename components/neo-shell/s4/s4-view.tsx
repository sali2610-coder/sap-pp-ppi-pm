/* ============================================================================
   PROJECT NEO · THE S/4HANA SURFACES — three pages, one language.
   ----------------------------------------------------------------------------
   SERVER components.

     /neo/s4hana/            the object catalogue + the landscape + the method
     /neo/s4-readiness/      where each module actually stands + the 18 changes
     /neo/migration-cockpit/ what loads, in what order, and what breaks

   ONE VISUAL RULE ACROSS ALL THREE: status is the only colour, and it is the
   system's. data/s4-objects, data/s4-architecture and data/ecc-s4 each ship a
   status→hex map in the old palette; the views map the status to its --s4-*
   family (S4_STATUS_DOT) instead, so one family is one colour everywhere in
   NEO, and removed is brick, never the red of selection (gate 3, major 6).

   AND ONE HONESTY RULE: `trust` is printed. Every one of these datasets marks
   curated vs needs-verification per record. A page that hides that flag turns a
   flagged assumption into an assertion, which is the one thing this product may
   never do.
   ========================================================================== */

import { enDir, enLang } from "../lang";
import Link from "next/link";
import {
  AlertTriangle, ArrowLeft, BadgeCheck, Boxes, Cable, CheckCircle2, ClipboardList,
  Code2, Database, Gauge, GitBranch, History, LayoutGrid, Layers, Network, Rocket, Route,
  ShieldQuestion, TrendingUp, Truck, Waypoints,
} from "lucide-react";
import { SectionNav } from "@/components/neo-shell/workspace/section-nav";
import { SmartReturn } from "@/components/neo-shell/nav-context";
import { RISK_HE } from "@/lib/s4";
import { S4_STATUS_DOT, S4_STATUS_WORD } from "@/lib/evidence/types";
import type { ArchStatus } from "@/data/s4-architecture";
import { S4Catalog } from "./s4-catalog";
import type { MigCat } from "@/data/migration-cockpit";
import {
  APPROACHES, ARCH, ARCH_STATUS, CUSTOM_CODE, CUSTOM_CODE_NOTE, CUTOVER, EXEC_NARRATIVE,
  EXEC_OVERVIEW, INTEGRATION, LESSONS, MIG_CHECKLIST, MIG_ERRORS, MIG_LOAD_LAYERS, MIG_LOAD_RULE,
  MIG_PROVENANCE, QUALITY_DIMS, READINESS, S4HANA_PROVENANCE, TESTING, fioriTxByModule,
  migObjects, migTotals, monitorLinks, readinessBoard, relatedCenters, s4AreaImpact, s4Objects,
  s4ObjectTotals, s4Readiness, s4TopicTotals, s4Topics, transformTotals, type ModuleReadiness,
  type S4Link,
} from "./s4-data";

const nf = new Intl.NumberFormat("he-IL");

/* Risk is not an S/4 status: it takes the feedback tokens. --status-blocked was
   never defined, so "high" painted its #dc2626 fallback (gate 3, majors 6 and 28). */
const RISK_C: Record<string, string> = {
  high: "var(--danger)",
  medium: "var(--warning)",
  low: "var(--success)",
};
/** The landscape's four verdicts as S/4 families (gate 3, major 6). */
const ARCH_C: Record<ArchStatus, string> = {
  Replaced: S4_STATUS_DOT.replaced,
  Enhanced: S4_STATUS_DOT.changed,
  New: S4_STATUS_DOT.s4_native,
  Stays: S4_STATUS_DOT.unchanged,
};
/** The cutover phases carry the old traffic-light hexes; the same meaning in tokens. */
const PHASE_C: Record<string, string> = { "#d97706": "var(--warning)", "#dc2626": "var(--danger)", "#16a34a": "var(--success)" };
/** A coverage score's band colour (lib/s4-readiness bands), in tokens. */
const bandC = (score: number) =>
  score >= 75 ? "var(--success)"
    : score >= 55 ? "var(--warning)"
      : score >= 35 ? "color-mix(in srgb, var(--warning) 50%, var(--danger))"
        : "var(--danger)";
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
  /** [value, label, the label for exactly one]: "1 מודול", not "1 מודולים"
   *  (gate 11 round 2, R2-2). */
  stats: [number | string, string, string?][]; note?: React.ReactNode;
}) {
  return (
    <header className="ns4-hero">
      {/* The three S/4HANA pages open from the rail like their siblings, and
          like them they carry the way back. */}
      <SmartReturn fallback={{ href: "/neo/", label: "מסך הבית" }} />
      <p className="ns4-eye">{icon}{eyebrow}</p>
      {/* A gateway title: the display face, 32 to 40px (DESIGN-SPEC §1; gate 3, major 15). */}
      <h1 className="ns4-h1 nx-display">{title}</h1>
      <p className="ns4-lede">{lede}</p>
      <div className="ns4-stats">
        {stats.map(([v, l, one]) => (
          <span key={l} className="ns4-stat">
            <b className="nx-sap">{typeof v === "number" ? nf.format(v) : v}</b>
            <em>{v === 1 && one ? one : l}</em>
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

/** `note`: the legacy page's own provenance line, carried with the credit. */
const Credit = ({ note }: { note?: string }) => (
  <>
    <p className="ns4-credit">
      <Cable size={13} strokeWidth={1.75} aria-hidden="true" />
      {" "}מקור: תיעוד הפרויקט.
    </p>
    {note ? <p className="ns4-prov">{note}</p> : null}
  </>
);

/** "מרכזים קשורים": the five consultant centres the legacy /s4hana/ and
 *  /migration-cockpit/ pages linked (components/related-centers.tsx), each
 *  with its one-line description from lib/centers.ts. */
function RelatedCenters() {
  return (
    <nav className="nxr-also ns4-relc" aria-labelledby="ns4-relc-h">
      <h2 className="nxr-also-h" id="ns4-relc-h">מרכזים קשורים</h2>
      <ul>
        {relatedCenters().map((c) => (
          <li key={c.href}>
            <Link href={c.href} prefetch={false} className="nu-link">{c.he}</Link>
            <span className="ns4-relc-d">{c.desc}</span>
          </li>
        ))}
      </ul>
    </nav>
  );
}

/* ========================================================================== */
/*  /neo/s4hana/                                                              */
/* ========================================================================== */

export function S4HanaCenter() {
  const objs = s4Objects();
  const t = s4ObjectTotals();
  const tr = transformTotals();
  const mon = monitorLinks();
  const areas = s4AreaImpact();
  const fioriMods = fioriTxByModule();
  const fioriTotal = fioriMods.reduce((a, g) => a + g.rows.length, 0);

  const nav: [string, string][] = [
    ["ns4-exec", "סקירת הנהלה"],
    ["ns4-cat", "קטלוג האובייקטים"],
    ["ns4-arch", "ארכיטקטורת המערכת"],
    ["ns4-area", "השפעה לפי תחום"],
    ["ns4-fiori", "טרנזקציות ויישומי Fiori"],
    ["ns4-code", "קוד מותאם"],
    ["ns4-int", "אינטגרציה"],
    ["ns4-test", "בדיקות"],
    ["ns4-cut", "Cutover"],
    ["ns4-les", "לקחים"],
  ];

  return (
    <div className="ns4 nm-scene" data-surface="s4" data-scene="s4">
      <Hero
        eyebrow="מרכז S/4HANA"
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
          [t.total, "אובייקטים", "אובייקט"],
          [t.byKey.replaced || 0, S4_STATUS_WORD.replaced],
          [t.byKey.not_available || 0, S4_STATUS_WORD.not_available],
          [t.byRisk.high || 0, "בסיכון גבוה"],
          [t.abapNotes, "הערות ABAP", "הערת ABAP"],
          [t.checklistItems, "פריטי בדיקה", "פריט בדיקה"],
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

      {/* ============================================== EXECUTIVE OVERVIEW
          The legacy page's opening card, ECC against S/4HANA layer by layer
          (EXEC_OVERVIEW, carried verbatim). */}
      <Sec
        id="ns4-exec" n={1}
        icon={<TrendingUp size={15} strokeWidth={1.75} />}
        eyebrow="מבט-על"
        title="סקירת הנהלה"
        lede="ECC6 → S/4HANA במבט-על"
      >
        <ul className="ns4-rows ns4-xo">
          {EXEC_OVERVIEW.map((r) => (
            <li key={r.k}>
              <header><b lang={enLang(r.k)}>{r.k}</b></header>
              <p><span className="ns4-lbl">ECC</span><span lang={enLang(r.ecc)} dir={enDir(r.ecc)}>{r.ecc}</span></p>
              <p><span className="ns4-lbl">S/4HANA</span><span lang={enLang(r.s4)} dir={enDir(r.s4)}>{r.s4}</span></p>
            </li>
          ))}
        </ul>
      </Sec>

      {/* =================================================== THE CATALOGUE */}
      <Sec
        id="ns4-cat" n={2}
        icon={<Database size={15} strokeWidth={1.75} />}
        eyebrow="קטלוג"
        title="קטלוג האובייקטים"
        lede="מסודר לפי חומרת השינוי: תחילה מה שהוסר, בסוף מה שנשמר."
      >
        <S4Catalog objs={objs} />
      </Sec>

      {/* ================================================== ARCHITECTURE */}
      <Sec
        id="ns4-arch" n={3}
        icon={<Network size={15} strokeWidth={1.75} />}
        eyebrow="ארכיטקטורה"
        title="רכיבי הארכיטקטורה לפי שכבה"
        lede={`${tr.arch} רכיבים, ECC מול S/4HANA, ולכל אחד מה שנשאר ומה שהוסר.`}
      >
        <div className="ns4-arch">
          {ARCH.map((c) => {
            const meta = ARCH_STATUS[c.status];
            return (
              <article key={c.id} className="ns4-arch-c" style={{ "--s": ARCH_C[c.status] } as React.CSSProperties}>
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
                  <div><dt>ECC</dt><dd lang={enLang(c.eccDesc)}>{c.eccDesc}</dd></div>
                  <div><dt>S/4HANA</dt><dd lang={enLang(c.s4Desc)}>{c.s4Desc}</dd></div>
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

      {/* ================================================ IMPACT BY AREA
          The legacy card's count over ECC_S4_TOPICS (s4AreaImpact). The topics
          themselves are listed in full on /neo/s4-readiness/, which owns them. */}
      <Sec
        id="ns4-area" n={4}
        icon={<GitBranch size={15} strokeWidth={1.75} />}
        eyebrow="תחומים"
        title="השפעה לפי מודול / תחום"
        lede="היקף השינוי לכל תחום (מתוך נושאי ה-ECC↔S/4 המאומתים)"
      >
        <ul className="ns4-rows ns4-xo">
          {areas.map((a) => (
            <li key={a.area}>
              <header><b>{a.he}</b></header>
              <p className="ns4-xo-n">
                <span>{nf.format(a.tot)} נושאים</span>
                {a.risk ? <span>{nf.format(a.risk)} סיכון</span> : null}
              </p>
            </li>
          ))}
        </ul>
        <p className="ns4-note-x">«סיכון»: נושאים במצב מוחלף, או במצב הוסר או לא אסטרטגי.</p>
        <p className="ns4-note">
          <Link className="nu-link" href="/neo/s4-readiness/#ns4-topics" prefetch={false}>
            כל נושאי השינוי: המצב ב-ECC, המצב ב-S/4HANA והשפעת המעבר
            <ArrowLeft className="nu-arw" size={14} strokeWidth={2} aria-hidden="true" />
          </Link>
        </p>
      </Sec>

      {/* ================================================ GUI AND FIORI
          The authored transactions that name a Fiori app (fioriTxByModule),
          every row, grouped by module. */}
      <Sec
        id="ns4-fiori" n={5}
        icon={<LayoutGrid size={15} strokeWidth={1.75} />}
        eyebrow="GUI ← Fiori"
        title="טרנזקציות SAP GUI ויישומי ה-Fiori הקשורים"
        lede={`${nf.format(fioriTotal)} טרנזקציות עם יישום Fiori קשור, לפי מודול.`}
      >
        {fioriMods.map((g, i) => (
          <details key={g.mod} className="ns4-group ns4-group-d" open={i === 0}>
            <summary className="ns4-h3">
              <span className="nx-sap" dir="ltr">{g.mod}</span>
              <span className="ns4-h3-n">{g.rows.length}</span>
              <span className="ns4-h3-hint" aria-hidden="true">הצגה / צמצום</span>
            </summary>
            <ul className="ns4-fx">
              {g.rows.map((r) => (
                <li key={r.code}>
                  {r.href
                    ? <Link className="ns4-chip" data-live="1" href={r.href} prefetch={false}><span className="nx-sap" dir="ltr">{r.code}</span></Link>
                    : <span className="ns4-chip" data-live="0"><span className="nx-sap" dir="ltr">{r.code}</span></span>}
                  <span className="ns4-fx-he">{r.title}</span>
                  <span className="ns4-fx-app" dir={enDir(r.fiori)} lang={enLang(r.fiori)}>{r.fiori}</span>
                </li>
              ))}
            </ul>
          </details>
        ))}
      </Sec>

      {/* ==================================================== CUSTOM CODE */}
      <Sec
        id="ns4-code" n={6}
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
        id="ns4-int" n={7}
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
        id="ns4-test" n={8}
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
        id="ns4-cut" n={9}
        icon={<Route size={15} strokeWidth={1.75} />}
        eyebrow="Go-Live"
        title="Cutover"
        lede={`${tr.cutoverPhases} שלבים, ${tr.cutoverSteps} צעדים.`}
      >
        <div className="ns4-cut">
          {CUTOVER.map((p) => (
            <section key={p.phase} className="ns4-cut-p" style={{ "--s": PHASE_C[p.c] ?? "var(--ink-3)" } as React.CSSProperties}>
              <h3 className="ns4-h3"><i aria-hidden="true" style={{ background: PHASE_C[p.c] ?? "var(--ink-3)" }} />{p.phase}<span className="ns4-h3-n">{p.items.length}</span></h3>
              <ul className="ns4-check">{p.items.map((x, i) => <li key={i}>{x}</li>)}</ul>
            </section>
          ))}
        </div>
      </Sec>

      {/* ======================================================= LESSONS */}
      <Sec
        id="ns4-les" n={10}
        icon={<History size={15} strokeWidth={1.75} />}
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

      <RelatedCenters />

      <Credit note={S4HANA_PROVENANCE} />
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

  const board = readinessBoard();
  const tablesN = (n: number) => (n === 1 ? "טבלה אחת" : `${nf.format(n)} טבלאות`);
  // An impact ranking lists the modules that have any impact: a module with
  // none carries no information in a "top five".
  const boardLists: [string, ModuleReadiness[], (m: ModuleReadiness) => string][] = [
    ["5 המודולים המסוכנים", board.risky, (m) => RISK_HE[m.risk] || m.risk],
    ["השפעת קוד מותאם", board.code.filter((m) => m.customCodeImpact > 0), (m) => tablesN(m.customCodeImpact)],
    ["השפעת מודל נתונים", board.data.filter((m) => m.dataModelImpact > 0), (m) => tablesN(m.dataModelImpact)],
  ];

  const nav: [string, string][] = [
    ["ns4-score", "כיסוי תיעוד לפי מודול"],
    ...(r.available ? [["ns4-board", "לוח הנהלה"] as [string, string]] : []),
    ["ns4-topics", "נושאי השינוי"],
  ];

  return (
    <div className="ns4 nm-scene" data-surface="s4" data-scene="s4">
      <Hero
        eyebrow="כיסוי תיעוד למעבר"
        icon={<Gauge size={13} strokeWidth={2} aria-hidden="true" />}
        title="כיסוי תיעוד למעבר ל-S/4HANA לפי מודול"
        lede={
          r.available
            ? <>ציון כיסוי תיעוד לכל מודול, מחושב מ-{nf.format(r.tables)} הטבלאות של מודל הנתונים ({nf.format(r.mods.length)} מודולים; לא מקטלוג הטבלאות של PM ו-PP-PI). בנוסף {tt.total} נושאי שינוי ECC → S/4HANA, כל אחד עם סטטוס והשפעת מעבר.</>
            : <>ציון כיסוי התיעוד אינו זמין, מכיוון שקטלוג טבלאות SAP לא נטען. {tt.total} נושאי השינוי מוצגים במלואם.</>
        }
        stats={
          r.available
            ? [
                [`${r.overall}%`, `כיסוי תיעוד למעבר · מדגם ${nf.format(r.tables)} טבלאות`],
                [r.mods.length, "מודולים עם ציון", "מודול עם ציון"],
                [r.tables, "טבלאות SAP", "טבלת SAP"],
                [r.highRisk, "מודולים בסיכון גבוה", "מודול בסיכון גבוה"],
                [tt.total, "נושאי שינוי", "נושא שינוי"],
                [tt.withFioriCds, "עם Fiori או CDS"],
              ]
            : [[tt.total, "נושאי שינוי", "נושא שינוי"], [tt.withSimplification, "עם פריט Simplification"]]
        }
        note={
          <>הציון משקלל את שיעור הטבלאות עם יישום Fiori (30%), עם תצוגת CDS (30%) ועם הערת S/4HANA (25%), ואת שיעור הטבלאות שאינן מסומנות כמוחלפות או כמוסרות (15%). הוא מודד כיסוי תיעוד בלבד ואינו מחליף SAP Readiness Check.</>
        }
      />

      {/* The ECC↔S/4HANA comparison and the T-Code evolution table are their
          own record families now (rollout 2026-10, P0 §3). */}
      <nav className="nxr-also" aria-labelledby="ns4-also-h">
        <h2 className="nxr-also-h" id="ns4-also-h">ראו גם</h2>
        <ul>
          <li><Link href="/neo/ecc-s4/" prefetch={false} className="nu-link">ECC מול S/4HANA</Link></li>
          <li><Link href="/neo/evolution/" prefetch={false} className="nu-link">מרכז אבולוציית טרנזקציות</Link></li>
        </ul>
      </nav>

      <SectionNav sections={nav.map(([id, label]) => ({ id, label }))} />

      <Sec
        id="ns4-score" n={1}
        icon={<Gauge size={15} strokeWidth={1.75} />}
        eyebrow="ציון"
        title="כיסוי תיעוד לפי מודול"
        lede={r.available ? "מסודר לפי ציון, מהגבוה לנמוך." : undefined}
      >
        {r.available ? (
          <ul className="ns4-mods">
            {r.mods.map((m) => (
              <li key={m.mod} style={{ "--s": bandC(m.score) } as React.CSSProperties}>
                <header>
                  <b>{m.he}</b>
                  <span className="ns4-mod-code nx-sap" dir="ltr">{m.mod}</span>
                  <Risk r={m.risk} />
                  <span className="ns4-score nx-sap" dir="ltr">{m.score}%</span>
                </header>
                <div className="ns4-bar" role="img" aria-label={`ציון כיסוי תיעוד ${m.score} אחוז`}>
                  <span style={{ inlineSize: `${m.score}%` }} />
                </div>
                <dl className="ns4-mod-kv">
                  <div><dt>טבלאות</dt><dd className="nx-sap">{nf.format(m.tables)}</dd></div>
                  <div><dt>Fiori</dt><dd className="nx-sap">{m.fioriPct}%</dd></div>
                  <div><dt>CDS</dt><dd className="nx-sap">{m.cdsPct}%</dd></div>
                  <div><dt>מסומן S/4HANA</dt><dd className="nx-sap">{m.s4Pct}%</dd></div>
                  <div><dt>מוחלף או הוסר</dt><dd className="nx-sap">{m.deprecatedPct}%</dd></div>
                  <div><dt>מורכבות</dt><dd className="nx-sap">{m.complexity}</dd></div>
                  <div><dt>אומדן (לא תוכנית מאומתת)</dt><dd>{m.effort}</dd></div>
                  <div><dt>קוד מותאם</dt><dd className="nx-sap">{nf.format(m.customCodeImpact)}</dd></div>
                  {/* Computed by the same computeReadiness, shown by the legacy
                      page in its module panel (components/s4-readiness.tsx:132). */}
                  <div><dt>השפעת מודל נתונים</dt><dd className="nx-sap">{nf.format(m.dataModelImpact)}</dd></div>
                  <div><dt>אובייקטי מעבר</dt><dd className="nx-sap">{nf.format(m.migrationObjs)}</dd></div>
                  <div><dt>נושאי שינוי בתחום</dt><dd className="nx-sap">{nf.format(m.simplification)}</dd></div>
                </dl>
              </li>
            ))}
            {/* A module the list names but the dataset holds no table for: no
                basis, so no score, no bar and no band. The gap is the answer. */}
            {r.unmeasured.map((m) => (
              <li key={m.mod} style={{ "--s": "var(--status-not-started)" } as React.CSSProperties}>
                <header>
                  <b>{m.he}</b>
                  <span className="ns4-mod-code nx-sap" dir="ltr">{m.mod}</span>
                </header>
                <p className="ns4-silent">לא מתועד במאגר: אין בו טבלאות של המודול, ולכן לא מחושב לו ציון.</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="ns4-silent">
            ציון כיסוי התיעוד אינו זמין: קטלוג טבלאות SAP לא נטען.
          </p>
        )}
        {r.available ? (
          <p className="ns4-note-x">
            «קוד מותאם»: טבלאות המודול שקטלוג S/4HANA של הפרויקט מסמן כמוחלפות או כמוסרות. «השפעת מודל נתונים»: אותן טבלאות ועוד
            הטבלאות שהקטלוג מסמן כמשתנות. «אובייקטי מעבר»: אובייקטי Migration Cockpit של המודול או הנטענים מטבלאותיו.
            «נושאי שינוי בתחום»: נושאי השינוי שתחומם הוא המודול; נושאי מודל הנתונים נספרים ל-FI, ל-MM ול-CO.
          </p>
        ) : null}
      </Sec>

      {/* ================================================= THE BOARD
          The legacy page's executive rankings (readinessBoard), over the same
          per-module figures listed above. */}
      {r.available ? (
        <Sec
          id="ns4-board" n={2}
          icon={<TrendingUp size={15} strokeWidth={1.75} />}
          eyebrow="דירוג"
          title="לוח הנהלה"
          lede="שלושה דירוגים של המודולים שלמעלה, לפי אותם נתונים."
        >
          <div className="ns4-board">
            {boardLists.map(([title, rows, metric]) => (
              <section key={title} className="ns4-board-p">
                <h3 className="ns4-h3">{title}</h3>
                {rows.length ? (
                  <ol className="ns4-steps">
                    {rows.map((m, i) => (
                      <li key={m.mod}>
                        <span className="ns4-step-n">{i + 1}</span>
                        <span>
                          <b>{m.he} <span className="nx-sap" dir="ltr">{m.mod}</span></b>
                          <em>{metric(m)}</em>
                        </span>
                      </li>
                    ))}
                  </ol>
                ) : <p className="ns4-silent">לאף מודול אין השפעה כזו בנתונים.</p>}
              </section>
            ))}
          </div>
        </Sec>
      ) : null}

      <Sec
        id="ns4-topics" n={r.available ? 3 : 2}
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
                <span className="ns4-topic-en nx-sap" dir="ltr" lang={enLang(t.title)}>{t.title}</span>
                <span className="ns4-topic-st">{t.statusHe}</span>
                <span className="ns4-topic-area">{AREA_HE[t.area] || t.area}</span>
              </header>
              <dl className="ns4-ba">
                <div><dt>ECC</dt><dd lang={enLang(t.ecc)}>{t.ecc}</dd></div>
                <div><dt>S/4HANA</dt><dd lang={enLang(t.s4)}>{t.s4}</dd></div>
              </dl>
              {t.fioriCds ? <p className="ns4-note" lang={enLang(t.fioriCds)}><span className="ns4-lbl">Fiori · CDS</span>{t.fioriCds}</p> : null}
              {t.simplification ? <p className="ns4-note" lang={enLang(t.simplification)}><span className="ns4-lbl">Simplification</span>{t.simplification}</p> : null}
              <p className="ns4-impact"><b>השפעת המעבר: </b><span lang={enLang(t.impact)}>{t.impact}</span></p>
              {t.note ? <p className="ns4-note-x" lang={enLang(t.note)}>{t.note}</p> : null}
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
  // Each card names its layer in text; the colour is a second cue, taken from the
  // object-class tokens rather than the data's Tailwind hexes (violet for Master,
  // 2.6:1 amber for Transactional). HR is a separate system and stays neutral.
  const catColor: Record<MigCat, string> = {
    Foundation: "var(--obj-config)", Master: "var(--obj-master)",
    Transactional: "var(--obj-transaction)", HR: "var(--ink-3)",
  };
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
        eyebrow="קוקפיט המעבר"
        icon={<Truck size={13} strokeWidth={2} aria-hidden="true" />}
        title="אובייקטי המעבר ורצף הטעינה"
        lede={
          <>
            {t.objects} אובייקטי מעבר ב-Migration Cockpit, עם {nf.format(t.eccRefs)} הפניות
            ל-{nf.format(t.eccTables)} טבלאות מקור שונות ב-ECC. רצף הטעינה מחושב מהתלויות בין האובייקטים.
          </>
        }
        stats={[
          [t.objects, "אובייקטים", "אובייקט"],
          [t.eccTables, "טבלאות ECC", "טבלת ECC"],
          [t.waves, "גלי טעינה", "גל טעינה"],
          [t.byRisk.high || 0, "בסיכון גבוה"],
          [t.errors, "דפוסי שגיאה", "דפוס שגיאה"],
          [t.checklist, "צעדי ביצוע", "צעד ביצוע"],
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
        {/* The legacy dependency map's own rule (MIG_LOAD_RULE, verbatim). */}
        <p className="ns4-note">{MIG_LOAD_RULE}</p>
        <div className="ns4-waves">
          {waves.map((w) => {
            const list = objs.filter((o) => o.wave === w);
            return (
              <section key={w} className="ns4-wave">
                <h3 className="ns4-h3">גל {w}<span className="ns4-h3-n">{list.length}</span></h3>
                <ul className="ns4-wave-l">
                  {/* Each entry of the load-order map jumps to its own card below
                      (design audit §7: highlight the chosen object). */}
                  {list.map((o) => (
                    <li key={o.id} style={{ "--s": catColor[o.cat] } as React.CSSProperties}>
                      <a className="ns4-wave-a" href={`#mo-${o.id}`}>
                        <b>{o.he}</b>
                        <em className="nx-sap" dir="ltr">{o.name}</em>
                        <span className="ns4-cat">{catHe[o.cat]}</span>
                      </a>
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
        {/* The long catalogue is grouped by wave; wave 1 open, the rest on demand
            (the map above, the dependency lists and the anchors open a closed
            wave on navigation). The chosen card is highlighted with :target. */}
        {waves.map((w) => (
        <details key={w} className="ns4-group ns4-group-d" open={w === waves[0]}>
          <summary className="ns4-h3">
            גל {w}
            <span className="ns4-h3-n">{objs.filter((o) => o.wave === w).length}</span>
            <span className="ns4-h3-hint" aria-hidden="true">הצגה / צמצום</span>
          </summary>
        <div className="ns4-objs">
          {objs.filter((o) => o.wave === w).map((o) => (
            <article key={o.id} id={`mo-${o.id}`} className="ns4-obj" style={{ "--s": catColor[o.cat] } as React.CSSProperties}>
              <header className="ns4-obj-h">
                <b className="ns4-obj-n">{o.he}</b>
                <span className="ns4-obj-en nx-sap" dir="ltr" lang={enLang(o.name)}>{o.name}</span>
                <span className="ns4-kind">{catHe[o.cat]}</span>
                <span className="ns4-kind nx-sap" dir="ltr">{o.module}</span>
                <Risk r={o.risk} />
                <span className="ns4-wave-b">גל {o.wave}</span>
                <Trust t={o.trust} />
              </header>

              <dl className="ns4-ba">
                <div><dt>מפתח</dt><dd className="nx-sap" dir="ltr">{o.keys}</dd></div>
              </dl>

              <h3 className="ns4-h4">טבלאות המקור ב-ECC</h3>
              {o.eccLinks.length
                ? <Chips items={o.eccLinks} />
                : <p className="ns4-silent">לאובייקט זה לא מתועדת טבלת מקור ב-ECC.</p>}

              {o.dependsHe.length ? (
                <>
                  <h3 className="ns4-h4">נטען לאחר</h3>
                  <ul className="ns4-dep">{o.dependsHe.map((d) => <li key={d.id}><a href={`#mo-${d.id}`}>{d.he}</a></li>)}</ul>
                </>
              ) : (
                <p className="ns4-free"><CheckCircle2 size={12} strokeWidth={2} aria-hidden="true" /> ללא תלויות, נטען בגל הראשון.</p>
              )}

              {o.unlocks.length ? (
                <>
                  <h3 className="ns4-h4">תנאי מקדים ל</h3>
                  <ul className="ns4-dep" data-tone="fwd">{o.unlocks.map((d) => <li key={d.id}><a href={`#mo-${d.id}`}>{d.he}</a></li>)}</ul>
                </>
              ) : null}

              {o.note ? <p className="ns4-why">{o.note}</p> : null}
            </article>
          ))}
        </div>
        </details>
        ))}
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
                <span className="ns4-topic-en nx-sap" dir="ltr" lang={enLang(a.en)}>{a.en}</span>
                <Trust t={a.trust} />
              </header>
              <p>{a.desc}</p>
              <p><span className="ns4-lbl">מתי</span>{a.when}</p>
              {a.note ? <p className="ns4-note-x" lang={enLang(a.note)}>{a.note}</p> : null}
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
              <p><span className="ns4-lbl">סימפטום</span><span lang={enLang(e.symptom)}>{e.symptom}</span></p>
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

      <RelatedCenters />

      <Credit note={MIG_PROVENANCE} />
    </div>
  );
}
