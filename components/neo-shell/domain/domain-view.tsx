/* ============================================================================
   PROJECT NEO · BUSINESS DOMAINS — hub and detail.
   ----------------------------------------------------------------------------
   SERVER components.

   THE ONE THING THIS SURFACE DOES THAT THE LEGACY ONE DID NOT

     It states its own coverage. 39 domains, 32 of them with a deep record — the
     hub says so, each card says which kind it is, and a thin domain's page opens
     by naming what it does not carry. The legacy grid showed 39 identical cards
     and left a reader to discover the difference by clicking.

   COLOUR: the MODULE hue (--m) is the only colour on the page, and it enters as
   an edge and a marker, never as a fill. The ECC↔S/4 verdict is the single
   exception — its six tones are semantic, not decorative, and they use the
   product's existing status tokens rather than a new palette.
   ========================================================================== */

import Link from "next/link";
import {
  AlertTriangle, ArrowLeft, BadgeCheck, Boxes, Cable, FlaskConical, GitBranch,
  GraduationCap, LayoutGrid, Lightbulb, Plug, Puzzle, Route, ShieldQuestion,
  Table2, Terminal, Wrench,
} from "lucide-react";
import { SectionNav } from "@/components/neo-shell/workspace/section-nav";
import { domainCards, domainTotals, type DomainCard, type DomLink, type DomainView } from "./domain-data";

const nf = new Intl.NumberFormat("he-IL");

const MOD_VAR: Record<string, string> = { PM: "var(--mod-pm)", "PP-PI": "var(--mod-pppi)" };
const MOD_HE: Record<string, string> = { PM: "אחזקה · PM", "PP-PI": "ייצור · PP-PI" };

/** The four semantic tones of the ECC↔S/4 verdict, mapped onto the status
 *  tokens the product already owns. No new colour is introduced. */
const TONE: Record<string, string> = {
  stays: "var(--status-done)",
  changes: "var(--status-in-analysis)",
  replaced: "var(--sec-transactions, #1d5fd0)",
  gone: "var(--status-blocked, var(--brand))",
  new: "var(--sec-cds, #0e7f8c)",
  plan: "var(--ink-3)",
};

/* --------------------------------------------------------------------- hub */

function Card({ c, i }: { c: DomainCard; i: number }) {
  return (
    <Link
      href={`/neo/domain/${c.slug}/`}
      prefetch={false}
      className="ndm-card nm-rise nm-once"
      style={{ "--m": MOD_VAR[c.module], "--nm-i": i } as React.CSSProperties}
    >
      <span className="ndm-card-top">
        <span className="ndm-card-mod">{MOD_HE[c.module]}</span>
        {/* DEPTH, STATED. A card that carries the deep consultant record says
            so; one that carries only the spine says that instead of staying
            silent and letting the reader assume parity. */}
        <span className="ndm-depth" data-deep={c.deep ? "1" : "0"}>
          {c.deep ? "רשומה מלאה" : "רשומת בסיס"}
        </span>
      </span>
      <b className="ndm-card-he">{c.he}</b>
      <span className="ndm-card-en" dir="ltr">{c.title}</span>
      <span className="ndm-card-sum">{c.summary}</span>
      <span className="ndm-card-nums">
        <em><b>{nf.format(c.steps)}</b> שלבים</em>
        <em><b>{nf.format(c.tables)}</b> טבלאות</em>
        <em><b>{nf.format(c.tcodes)}</b> טרנזקציות</em>
        {c.s4 ? <em className="ndm-card-s4">S/4HANA</em> : null}
      </span>
      <span className="ndm-card-go">
        <ArrowLeft size={14} strokeWidth={2} aria-hidden="true" />
        פתח את התחום
      </span>
    </Link>
  );
}

export function DomainsHub() {
  const t = domainTotals();
  const cards = domainCards();
  const pm = cards.filter((c) => c.module === "PM");
  const pp = cards.filter((c) => c.module === "PP-PI");

  return (
    <div className="ndm nm-scene" data-surface="domains" data-scene="cream">
      <header className="ndm-hero">
        <p className="ndm-eye">
          <Boxes size={13} strokeWidth={2} aria-hidden="true" />
          תחומים עסקיים · BUSINESS DOMAINS
        </p>
        <h1 className="ndm-h1">איך העבודה באמת מתנהלת</h1>
        <p className="ndm-lede">
          {t.domains} תחומים פונקציונליים של PM ו-PP-PI. כל תחום הוא יחידת עבודה שלמה:
          הזרימה העסקית שלב אחר שלב, הטבלאות והטרנזקציות שמאחוריה, נקודות הלמידה והתקלות הנפוצות.
          {" "}<b>{t.deep}</b> מהם נושאים גם רשומה עמוקה — נתוני אב, User Exits ו-BAdIs, תרחישי בדיקה,
          תקלות מהשטח, דוגמה מהמפעל והכרעת מעבר ל-S/4HANA.
        </p>
        <div className="ndm-stats">
          {([
            [t.domains, "תחומים"],
            [t.steps, "שלבי תהליך"],
            [t.tables, "טבלאות מוזכרות"],
            [t.tcodes, "טרנזקציות"],
            [t.bapis, "BAPIs"],
            [t.trouble, "תקלות מתועדות"],
          ] as [number, string][]).map(([n, l]) => (
            <span key={l} className="ndm-stat">
              <b className="nx-sap">{nf.format(n)}</b>
              <em>{l}</em>
            </span>
          ))}
        </div>
        {/* THE GAP, NAMED. 7 of 39 carry no deep record. Saying it here costs
            nothing and stops the hub from over-promising. */}
        {t.domains > t.deep ? (
          <p className="ndm-gap">
            <ShieldQuestion size={14} strokeWidth={1.75} aria-hidden="true" />
            {" "}{t.domains - t.deep} תחומים נושאים כרגע רשומת בסיס בלבד. הם מסומנים ככאלה בכרטיס ובעמוד,
            ולא הושלמו כאן בתוכן שלא נכתב במאגר.
          </p>
        ) : null}
      </header>

      {([["PM", pm, Wrench], ["PP-PI", pp, FlaskConical]] as const).map(([mod, list, Icon]) => (
        <section key={mod} className="ndm-mod" style={{ "--m": MOD_VAR[mod] } as React.CSSProperties}>
          <h2 className="ndm-mod-h">
            <Icon size={16} strokeWidth={1.75} aria-hidden="true" />
            {MOD_HE[mod]}
            <span className="ndm-mod-n">{list.length} תחומים</span>
          </h2>
          <div className="ndm-grid">
            {list.map((c, i) => <Card key={c.slug} c={c} i={i} />)}
          </div>
        </section>
      ))}

      <p className="ndm-credit">Project NEO · CBC Israel · פותח על ידי סאלי חליף · Web Coding</p>
    </div>
  );
}

/* ------------------------------------------------------------------ detail */

function Chips({ items, mono = true }: { items: DomLink[]; mono?: boolean }) {
  return (
    <div className="ndm-chips">
      {items.map((l) =>
        l.href ? (
          <Link key={l.t} className="ndm-chip" data-live="1" href={l.href} prefetch={false}>
            <span className={mono ? "nx-sap" : undefined} dir={mono ? "ltr" : undefined}>{l.t}</span>
          </Link>
        ) : (
          <span key={l.t} className="ndm-chip" data-live="0">
            <span className={mono ? "nx-sap" : undefined} dir={mono ? "ltr" : undefined}>{l.t}</span>
          </span>
        ),
      )}
    </div>
  );
}

function Sec({
  id, n, icon, eyebrow, title, lede, children,
}: {
  id: string; n: number; icon: React.ReactNode; eyebrow: string;
  title: string; lede?: string; children: React.ReactNode;
}) {
  return (
    <section className="ndm-sec nm-rise nm-once" id={id} aria-labelledby={`${id}-h`}>
      <header className="ndm-sec-h">
        <span className="ndm-sec-n" aria-hidden="true">{String(n).padStart(2, "0")}</span>
        <p className="ndm-sec-k"><span className="ndm-sec-ico" aria-hidden="true">{icon}</span>{eyebrow}</p>
        <h2 className="ndm-h2" id={`${id}-h`}>{title}</h2>
        {lede ? <p className="ndm-sec-s">{lede}</p> : null}
      </header>
      <div className="ndm-sec-b">{children}</div>
    </section>
  );
}

const Bullets = ({ items }: { items: string[] }) => (
  <ul className="ndm-bul">{items.map((x, i) => <li key={i}>{x}</li>)}</ul>
);

export function DomainDetailView({ v }: { v: DomainView }) {
  const nav: [string, string][] = [];
  const push = (id: string, he: string) => { nav.push([id, he]); return nav.length; };

  const nFlow = push("ndm-flow", "הזרימה העסקית");
  const nPurpose = v.purpose || v.masterData.length ? push("ndm-purpose", "מה זה ולמה") : 0;
  const nData = push("ndm-data", "טבלאות וטרנזקציות");
  const nApi = v.bapis.length || v.funcs.length ? push("ndm-api", "BAPIs ומודולי פונקציה") : 0;
  const nExt = v.exits.length || v.badis.length ? push("ndm-ext", "הרחבות") : 0;
  const nLearn = push("ndm-learn", "נקודות למידה");
  const nQa = v.qa.length ? push("ndm-qa", "תרחישי בדיקה") : 0;
  const nTrb = push("ndm-trb", "תקלות ופתרונות");
  const nScen = v.scenario ? push("ndm-scen", "מהמפעל") : 0;
  const nS4 = push("ndm-s4", "המעבר ל-S/4HANA");
  const nSib = v.siblings.length ? push("ndm-sib", "תחומים נוספים") : 0;

  return (
    <article
      className="ndm ndm-detail nm-scene"
      data-surface="domains"
      data-scene="cream"
      style={{ "--m": MOD_VAR[v.module] } as React.CSSProperties}
    >
      <header className="ndm-hero ndm-hero--item">
        <p className="ndm-eye">
          <Link className="ndm-back" href="/neo/domain-model/" prefetch={false}>תחומים עסקיים</Link>
          <i aria-hidden="true" />
          <span className="ndm-sap" dir="ltr">{v.module}</span>
        </p>
        <h1 className="ndm-h1">{v.he}</h1>
        <p className="ndm-h1-en" dir="ltr">{v.title}</p>
        <p className="ndm-lede">{v.summary}</p>
        <div className="ndm-hero-tags">
          <span className="ndm-tag ndm-tag--mod">{v.moduleHe}</span>
          <span className="ndm-depth" data-deep={v.deep ? "1" : "0"}>
            {v.deep ? "רשומה מלאה" : "רשומת בסיס"}
          </span>
        </div>
        {/* WHAT IS AND IS NOT HERE. First thing on a thin domain's page. */}
        {!v.deep ? (
          <p className="ndm-gap">
            <ShieldQuestion size={14} strokeWidth={1.75} aria-hidden="true" />
            {" "}לתחום הזה המאגר מחזיק את רשומת הבסיס: זרימה, טבלאות, טרנזקציות, BAPIs, נקודות למידה ותקלות.
            הרשומה העמוקה — נתוני אב, Exits ו-BAdIs, תרחישי בדיקה, דוגמה מהמפעל והכרעת מעבר — לא נכתבה עבורו,
            והיא לא הושלמה כאן.
          </p>
        ) : null}
      </header>

      <SectionNav sections={nav.map(([id, label]) => ({ id, label }))} />

      <Sec
        id="ndm-flow" n={nFlow}
        icon={<Route size={15} strokeWidth={1.75} />}
        eyebrow="תהליך"
        title="הזרימה העסקית"
        lede={`${nf.format(v.flow.length)} שלבים, כפי שהם כתובים במאגר.`}
      >
        <ol className="ndm-flow">
          {v.flow.map((s, i) => (
            <li key={i}>
              <span className="ndm-flow-n">{i + 1}</span>
              <span className="ndm-flow-b">
                <b className="nx-sap" dir="ltr">{s.step}</b>
                <em>{s.he}</em>
              </span>
            </li>
          ))}
        </ol>
        {v.diagram.length ? (
          <>
            <h3 className="ndm-h3">התהליך המפורט</h3>
            <ol className="ndm-chain">
              {v.diagram.map((x, i) => <li key={i}>{x}</li>)}
            </ol>
          </>
        ) : null}
      </Sec>

      {nPurpose ? (
        <Sec
          id="ndm-purpose" n={nPurpose}
          icon={<Lightbulb size={15} strokeWidth={1.75} />}
          eyebrow="הגדרה"
          title="מה זה, ולמה זה קיים"
        >
          {v.purpose ? <p className="ndm-p">{v.purpose}</p> : null}
          {v.masterData.length ? (
            <>
              <h3 className="ndm-h3">נתוני אב שהתחום נשען עליהם</h3>
              <Bullets items={v.masterData} />
            </>
          ) : null}
          {v.objects.length ? (
            <>
              <h3 className="ndm-h3">אובייקטים עסקיים</h3>
              <Chips items={v.objects.map((t) => ({ t, href: null }))} mono={false} />
            </>
          ) : null}
        </Sec>
      ) : null}

      <Sec
        id="ndm-data" n={nData}
        icon={<Table2 size={15} strokeWidth={1.75} />}
        eyebrow="מאחורי הקלעים"
        title="טבלאות וטרנזקציות"
        lede={`${nf.format(v.tables.filter((x) => x.href).length)} מתוך ${nf.format(v.tables.length)} הטבלאות ו-${nf.format(v.tcodes.filter((x) => x.href).length)} מתוך ${nf.format(v.tcodes.length)} הטרנזקציות נושאות דף בפרויקט. השאר מוצגות כערך, לא כקישור מת.`}
      >
        <h3 className="ndm-h3"><Table2 size={13} strokeWidth={2} aria-hidden="true" /> טבלאות</h3>
        <Chips items={v.tables} />
        <h3 className="ndm-h3"><Terminal size={13} strokeWidth={2} aria-hidden="true" /> טרנזקציות</h3>
        <Chips items={v.tcodes} />
        {v.fiori.length ? (
          <>
            <h3 className="ndm-h3"><LayoutGrid size={13} strokeWidth={2} aria-hidden="true" /> אפליקציות Fiori</h3>
            <Chips items={v.fiori.map((t) => ({ t, href: null }))} mono={false} />
          </>
        ) : null}
      </Sec>

      {nApi ? (
        <Sec
          id="ndm-api" n={nApi}
          icon={<Plug size={15} strokeWidth={1.75} />}
          eyebrow="ממשקים"
          title="BAPIs ומודולי פונקציה"
        >
          {v.bapis.length ? <Chips items={v.bapis} /> : null}
          {v.funcs.length ? (
            <>
              <h3 className="ndm-h3">מהרשומה העמוקה</h3>
              <Chips items={v.funcs} />
            </>
          ) : null}
        </Sec>
      ) : null}

      {nExt ? (
        <Sec
          id="ndm-ext" n={nExt}
          icon={<Puzzle size={15} strokeWidth={1.75} />}
          eyebrow="פיתוח"
          title="נקודות הרחבה"
          lede="User Exits ו-BAdIs כפי שנרשמו במאגר. הסוגריים הם ההסבר שנכתב שם, לא תוספת שלנו."
        >
          {v.exits.length ? (<><h3 className="ndm-h3">User Exits</h3><Bullets items={v.exits} /></>) : null}
          {v.badis.length ? (<><h3 className="ndm-h3">BAdIs</h3><Bullets items={v.badis} /></>) : null}
        </Sec>
      ) : null}

      <Sec
        id="ndm-learn" n={nLearn}
        icon={<GraduationCap size={15} strokeWidth={1.75} />}
        eyebrow="למידה"
        title="מה חשוב לזכור"
      >
        <Bullets items={v.learning} />
      </Sec>

      {nQa ? (
        <Sec
          id="ndm-qa" n={nQa}
          icon={<BadgeCheck size={15} strokeWidth={1.75} />}
          eyebrow="איכות"
          title="תרחישי בדיקה"
          lede="Positive · Negative · Integration · Regression — כפי שנוסחו במאגר."
        >
          <Bullets items={v.qa} />
        </Sec>
      ) : null}

      <Sec
        id="ndm-trb" n={nTrb}
        icon={<AlertTriangle size={15} strokeWidth={1.75} />}
        eyebrow="תקלות"
        title="מה נשבר, ומה עושים"
      >
        <ul className="ndm-trb">
          {v.trouble.map((t, i) => (
            <li key={i}>
              <b>{t.issue}</b>
              <span>{t.fix}</span>
            </li>
          ))}
        </ul>
        {v.incidents.length ? (
          <>
            <h3 className="ndm-h3">תקלות מהשטח</h3>
            <Bullets items={v.incidents} />
          </>
        ) : null}
      </Sec>

      {nScen ? (
        <Sec
          id="ndm-scen" n={nScen}
          icon={<FlaskConical size={15} strokeWidth={1.75} />}
          eyebrow="בשטח"
          title="איך זה נראה במפעל"
        >
          <p className="ndm-quote">{v.scenario}</p>
        </Sec>
      ) : null}

      <Sec
        id="ndm-s4" n={nS4}
        icon={<GitBranch size={15} strokeWidth={1.75} />}
        eyebrow="מעבר"
        title="ECC ← S/4HANA"
        lede={v.s4.length ? "ההכרעה כפי שנכתבה במאגר, שורה לכל היבט." : undefined}
      >
        {v.s4.length ? (
          <ul className="ndm-s4">
            {v.s4.map((r) => (
              <li key={r.key} style={{ "--t": TONE[r.tone] } as React.CSSProperties}>
                <b>{r.he}</b>
                <span>{r.text}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="ndm-silent">
            למאגר אין הכרעת מעבר מתועדת לתחום הזה. הריק מכוון, ואינו אומר שאין שינוי ב-S/4HANA.
          </p>
        )}
        {v.migration ? (
          <>
            <h3 className="ndm-h3">מה לבדוק אחרי ההמרה</h3>
            <p className="ndm-p">{v.migration}</p>
          </>
        ) : null}
      </Sec>

      {nSib ? (
        <Sec
          id="ndm-sib" n={nSib}
          icon={<Boxes size={15} strokeWidth={1.75} />}
          eyebrow="המשך"
          title={`תחומים נוספים ב-${v.module}`}
        >
          <ul className="ndm-sib">
            {v.siblings.map((s) => (
              <li key={s.slug}>
                <Link href={`/neo/domain/${s.slug}/`} prefetch={false}>
                  <b>{s.he}</b>
                  <em>{s.tables} טבלאות</em>
                </Link>
              </li>
            ))}
          </ul>
        </Sec>
      ) : null}

      <p className="ndm-credit">
        <Cable size={13} strokeWidth={1.75} aria-hidden="true" />
        {" "}התוכן מוצג כפי שנכתב במאגר הפרויקט. לא נוסחו כאן עובדות SAP חדשות.
      </p>
    </article>
  );
}
