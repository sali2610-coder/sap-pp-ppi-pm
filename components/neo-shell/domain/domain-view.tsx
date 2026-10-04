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
   exception — its tones are semantic, not decorative, and they are the S/4
   status families (S4_STATUS_DOT), the same colour as everywhere else.
   ========================================================================== */

import { enLang } from "../lang";
import Link from "next/link";
import {
  AlertTriangle, BadgeCheck, BookOpen, Boxes, Cable, Factory, FlaskConical, GitBranch,
  GraduationCap, LayoutGrid, Lightbulb, Plug, Puzzle, Route, ShieldQuestion,
  Table2, Terminal,
} from "lucide-react";
import { SectionNav } from "@/components/neo-shell/workspace/section-nav";
import { SmartReturn } from "@/components/neo-shell/nav-context";
import { S4_TONE, domainCards, domainTotals, mfgAreas, type DomLink, type DomainView } from "./domain-data";
import { DomainHubList } from "./domain-hub-list";

const nf = new Intl.NumberFormat("he-IL");

const MOD_VAR: Record<string, string> = { PM: "var(--mod-pm)", "PP-PI": "var(--mod-pppi)" };

/* --------------------------------------------------------------------- hub */


export function DomainsHub() {
  const t = domainTotals();
  const cards = domainCards();

  return (
    <div className="ndm nm-scene" data-surface="domains" data-scene="cream">
      <SmartReturn fallback={{ href: "/neo/", label: "מסך הבית" }} />
      <header className="ndm-hero">
        <p className="ndm-eye">
          <Boxes size={13} strokeWidth={2} aria-hidden="true" />
          תחומים עסקיים
        </p>
        <h1 className="ndm-h1">התחומים העסקיים של PM ו-PP-PI</h1>
        <p className="ndm-lede">
          {t.domains} תחומים פונקציונליים של PM ו-PP-PI. לכל תחום: הזרימה העסקית שלב אחר שלב,
          טבלאות SAP והטרנזקציות התומכות בה, נקודות למידה ותקלות נפוצות.
          {" "}<b>{t.deep}</b> מהם כוללים גם רשומה מלאה: נתוני אב, User Exits ו-BAdIs, תרחישי בדיקה,
          תקלות מהשטח, תרחיש מהמפעל והכרעת מעבר ל-S/4HANA.
        </p>
        <p className="nx-gate-note">
          הסברי מושגים נמצאים ב<b>מרכז הידע</b>, שלבי ביצוע ורשימות בדיקה ב<b>מדריכי העבודה</b>, והמיקום בתהליך ב<b>תחומים העסקיים</b>.
        </p>
        <div className="ndm-stats">
          {([
            [t.domains, "תחומים"],
            [t.steps, "שלבי תהליך"],
            [t.tables, "טבלאות SAP"],
            [t.tcodes, "טרנזקציות"],
            [t.bapis, "BAPI ו-FM"],
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
            {" "}{t.domains - t.deep} תחומים כוללים רשומת בסיס בלבד, והם מסומנים כך בכרטיס ובעמוד.
            לרשומה המלאה שלהם אין תיעוד מאומת במאגר.
          </p>
        ) : null}
      </header>

      <DomainHubList cards={cards} />

      <PlantAreas />

      <nav className="nxr-also" aria-labelledby="dm-also-h">
        <h2 className="nxr-also-h" id="dm-also-h">ראו גם</h2>
        <ul>
          <li><Link href="/neo/process-explorer/" prefetch={false} className="nu-link">מפות תהליך מקצה-לקצה</Link></li>
          <li><Link href="/neo/process/" prefetch={false} className="nu-link">תהליכי המודולים</Link></li>
          <li><Link href="/neo/story/" prefetch={false} className="nu-link">סיור מודרך בתהליך</Link></li>
        </ul>
      </nav>
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

/* ------------------------------------------------------------- plant areas */

/** THE PLANT AREAS (content parity, rollout 2026-10). The legacy /domain-model/
 *  page was data/domain-model.ts: seven areas of the plant, each with its SAP
 *  modules, its steps, and the objects, process maps and incidents it touches.
 *  The description sits in the summary, the rest opens on demand. The section
 *  lede is the legacy page header's, verbatim. */
function PlantAreas() {
  const areas = mfgAreas();
  return (
    <section className="ndm-mod ndm-areas" aria-labelledby="ndm-areas-h">
      <h2 className="ndm-mod-h" id="ndm-areas-h">
        <Factory size={16} strokeWidth={1.75} aria-hidden="true" />
        אזורי המפעל ומודולי SAP
        <span className="ndm-mod-n">{areas.length} אזורים</span>
      </h2>
      <p className="ndm-sec-s">
        {areas.length} אזורי מפעל (קו ייצור, חדר תרכיז, CIP, אצוות, אריזה, איכות, מחסן) מחוברים למודולי SAP (PP/PP-PI/QM/PM/MM) + אובייקטים, מפות תהליך ותקלות.
      </p>
      <div className="ndm-area-l">
        {areas.map((a) => (
          <details key={a.slug} className="ndm-area">
            <summary>
              <span className="ndm-area-t">
                <b>{a.he}</b>
                <span className="ndm-card-en" dir="ltr" lang={enLang(a.title)}>{a.title}</span>
                <span className="ndm-area-mods">
                  {a.modules.map((m) => <span key={m} className="ndm-tag nx-sap" dir="ltr">{m}</span>)}
                </span>
              </span>
              <span className="ndm-area-d">{a.description}</span>
            </summary>
            <div className="ndm-area-b">
              <ol className="ndm-chain" aria-label={`שלבי ${a.he}`}>
                {a.flow.map((s, i) => <li key={i}>{s}</li>)}
              </ol>
              <h3 className="ndm-h3">אובייקטי SAP</h3>
              <Chips items={a.objects} mono={false} />
              <h3 className="ndm-h3">מפות תהליך</h3>
              <Chips items={a.processes} mono={false} />
              <h3 className="ndm-h3">תקלות</h3>
              <Chips items={a.incidents} mono={false} />
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}

export function DomainDetailView({ v }: { v: DomainView }) {
  const nav: [string, string][] = [];
  const push = (id: string, he: string) => { nav.push([id, he]); return nav.length; };

  const nFlow = push("ndm-flow", "הזרימה העסקית");
  const nPurpose = v.purpose || v.masterData.length ? push("ndm-purpose", "הגדרה ומטרה") : 0;
  const nData = push("ndm-data", "טבלאות וטרנזקציות");
  const nApi = v.bapis.length || v.funcs.length ? push("ndm-api", "BAPI ומודולי פונקציה") : 0;
  const nExt = v.exits.length || v.badis.length ? push("ndm-ext", "הרחבות") : 0;
  const nLearn = push("ndm-learn", "נקודות למידה");
  const g = v.guide;
  const nGuide = g ? push("ndm-guide", g.title) : 0;
  const nQa = v.qa.length ? push("ndm-qa", "תרחישי בדיקה") : 0;
  const nTrb = push("ndm-trb", "תקלות ופתרונות");
  const nScen = v.scenario ? push("ndm-scen", "תרחיש מהמפעל") : 0;
  const nS4 = push("ndm-s4", "המעבר ל-S/4HANA");
  const nSib = v.siblings.length ? push("ndm-sib", "תחומים נוספים") : 0;

  return (
    <article
      className="ndm ndm-detail nm-scene"
      data-surface="domains"
      data-scene="cream"
      style={{ "--m": MOD_VAR[v.module] } as React.CSSProperties}
    >
      {/* The way back, as on every NEO detail page (gate 5, finding 10). */}
      <SmartReturn fallback={{ href: "/neo/domain-model/", label: "תחומים עסקיים" }} />
      <header className="ndm-hero ndm-hero--item">
        <p className="ndm-eye">
          <Link className="ndm-back" href="/neo/domain-model/" prefetch={false}>תחומים עסקיים</Link>
          <i aria-hidden="true" />
          <span className="ndm-sap" dir="ltr">{v.module}</span>
        </p>
        <h1 className="ndm-h1">{v.he}</h1>
        <p className="ndm-h1-en" dir="ltr" lang={enLang(v.title)}>{v.title}</p>
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
            {" "}לתחום זה קיימת במאגר רשומת בסיס: זרימה, טבלאות, טרנזקציות, BAPI ו-FM, נקודות למידה ותקלות.
            לרשומה המלאה (נתוני אב, User Exits ו-BAdIs, תרחישי בדיקה, תרחיש מהמפעל והכרעת מעבר)
            אין תיעוד מאומת במאגר.
          </p>
        ) : null}
      </header>

      <SectionNav sections={nav.map(([id, label]) => ({ id, label }))} />

      <Sec
        id="ndm-flow" n={nFlow}
        icon={<Route size={15} strokeWidth={1.75} />}
        eyebrow="תהליך"
        title="הזרימה העסקית"
        lede={`${nf.format(v.flow.length)} שלבים.`}
      >
        {/* A COMPACT STEP DIAGRAM (design audit S7-DOM-2). The same steps the
            record holds, in the same order, drawn as a row of numbered stations
            that wraps on a phone. Nothing is added: a station is one `flow`
            entry, and the detailed chain below stays the long form. */}
        <ol className="ndm-steps" aria-label={`${nf.format(v.flow.length)} שלבי התהליך`}>
          {v.flow.map((s, i) => (
            <li key={i} className="ndm-step">
              <span className="ndm-step-n" aria-hidden="true">{i + 1}</span>
              <span className="ndm-step-b">
                <b className="nx-sap" dir="ltr">{s.step}</b>
                <em>{s.he}</em>
              </span>
            </li>
          ))}
        </ol>
        {v.diagram.length ? (
          <>
            <a className="ndm-step-more" href="#ndm-chain">
              לתהליך המפורט · {nf.format(v.diagram.length)} תחנות
            </a>
            <h3 className="ndm-h3" id="ndm-chain">התהליך המפורט</h3>
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
          title="הגדרה ומטרה"
        >
          {v.purpose ? <p className="ndm-p">{v.purpose}</p> : null}
          {v.masterData.length ? (
            <>
              <h3 className="ndm-h3">נתוני אב נדרשים</h3>
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
        eyebrow="נתונים"
        title="טבלאות וטרנזקציות"
        lede={`${nf.format(v.tables.filter((x) => x.href).length)} מתוך ${nf.format(v.tables.length)} הטבלאות ו-${nf.format(v.tcodes.filter((x) => x.href).length)} מתוך ${nf.format(v.tcodes.length)} הטרנזקציות מקושרות לדף בפרויקט.`}
      >
        <h3 className="ndm-h3"><Table2 size={13} strokeWidth={2} aria-hidden="true" /> טבלאות</h3>
        <Chips items={v.tables} />
        <h3 className="ndm-h3"><Terminal size={13} strokeWidth={2} aria-hidden="true" /> טרנזקציות</h3>
        <Chips items={v.tcodes} />
        {v.fiori.length ? (
          <>
            <h3 className="ndm-h3"><LayoutGrid size={13} strokeWidth={2} aria-hidden="true" /> יישומי Fiori</h3>
            <Chips items={v.fiori.map((t) => ({ t, href: null }))} mono={false} />
          </>
        ) : null}
      </Sec>

      {nApi ? (
        <Sec
          id="ndm-api" n={nApi}
          icon={<Plug size={15} strokeWidth={1.75} />}
          eyebrow="ממשקים"
          title="BAPI ומודולי פונקציה"
          lede={v.bapis.length ? `BAPIs / Functions · ${nf.format(v.bapis.length)}` : undefined}
        >
          {v.bapis.length ? <Chips items={v.bapis} /> : null}
          {v.funcs.length ? (
            <>
              <h3 className="ndm-h3">מודולי פונקציה מהרשומה המלאה</h3>
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
          lede="User Exits ו-BAdIs."
        >
          {v.exits.length ? (<><h3 className="ndm-h3">User Exits</h3><Bullets items={v.exits} /></>) : null}
          {v.badis.length ? (<><h3 className="ndm-h3">BAdIs</h3><Bullets items={v.badis} /></>) : null}
        </Sec>
      ) : null}

      <Sec
        id="ndm-learn" n={nLearn}
        icon={<GraduationCap size={15} strokeWidth={1.75} />}
        eyebrow="למידה"
        title="נקודות למידה"
      >
        <Bullets items={v.learning} />
      </Sec>

      {/* THE CARRIED GUIDE (content parity, rollout 2026-10): the legacy MRP /
          MPS planning centre, data/mrp-center.ts, on the domain /mrp/ now
          redirects to. Each topic opens on demand; the first is open. */}
      {g && nGuide ? (
        <Sec
          id="ndm-guide" n={nGuide}
          icon={<BookOpen size={15} strokeWidth={1.75} />}
          eyebrow="מדריך תכנון"
          title={g.title}
          lede={g.lede}
        >
          <h3 className="ndm-h3"><Terminal size={13} strokeWidth={2} aria-hidden="true" /> טרנזקציות התכנון</h3>
          <Chips items={g.tcodes} />
          <div className="ndm-guide-l">
            {g.topics.map((s, i) => (
              <details key={s.id} className="ndm-guide-t" open={i === 0}>
                <summary>{s.he}</summary>
                <div className="ndm-guide-b">
                  <p className="ndm-p">{s.body}</p>
                  <Bullets items={s.points} />
                  {s.tcodes.length ? (<><p className="ndm-h4" lang="en">T-Codes</p><Chips items={s.tcodes} /></>) : null}
                  {s.tables.length ? (<><p className="ndm-h4">טבלאות</p><Chips items={s.tables} /></>) : null}
                  {s.s4.length ? (
                    <>
                      <p className="ndm-h4" lang="en">ECC6 → S/4HANA</p>
                      <ul className="ndm-s4">
                        {s.s4.map((r) => (
                          <li key={r.key} style={{ "--t": S4_TONE[r.tone] } as React.CSSProperties}>
                            <b>{r.he}</b>
                            <span lang={enLang(r.text)}>{r.text}</span>
                          </li>
                        ))}
                      </ul>
                    </>
                  ) : null}
                </div>
              </details>
            ))}
          </div>
          <h3 className="ndm-h3" id="ndm-strat-h">אסטרטגיות תכנון — טבלת עזר</h3>
          <div className="ndm-tbl-w" role="region" aria-labelledby="ndm-strat-h" tabIndex={0}>
            <table className="ndm-tbl">
              <thead>
                <tr><th scope="col">אסטרטגיה</th><th scope="col">שם</th><th scope="col">תיאור</th><th scope="col" lang="en">Req. Type</th><th scope="col">צריכה</th></tr>
              </thead>
              <tbody>
                {g.strategies.map((s) => (
                  <tr key={s.key}>
                    <td><span className="ndm-tag nx-sap" dir="ltr">{s.key}</span></td>
                    <td><b>{s.he}</b></td>
                    <td>{s.desc}</td>
                    <td><span className="nx-sap" dir="ltr">{s.reqType}</span></td>
                    <td>{s.consumption}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Sec>
      ) : null}

      {nQa ? (
        <Sec
          id="ndm-qa" n={nQa}
          icon={<BadgeCheck size={15} strokeWidth={1.75} />}
          eyebrow="איכות"
          title="תרחישי בדיקה"
          lede="Positive · Negative · Integration · Regression."
        >
          <Bullets items={v.qa} />
        </Sec>
      ) : null}

      <Sec
        id="ndm-trb" n={nTrb}
        icon={<AlertTriangle size={15} strokeWidth={1.75} />}
        eyebrow="תקלות"
        title="תקלות ופתרונות"
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
          title="תרחיש מהמפעל"
        >
          <p className="ndm-quote">{v.scenario}</p>
        </Sec>
      ) : null}

      <Sec
        id="ndm-s4" n={nS4}
        icon={<GitBranch size={15} strokeWidth={1.75} />}
        eyebrow="מעבר"
        title="המעבר ל-S/4HANA"
        lede={v.s4.length ? "הכרעת המעבר, שורה לכל היבט." : undefined}
      >
        {v.s4.length ? (
          <ul className="ndm-s4">
            {v.s4.map((r) => (
              <li key={r.key} style={{ "--t": S4_TONE[r.tone] } as React.CSSProperties}>
                <b>{r.he}</b>
                <span>{r.text}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="ndm-silent">
            לתחום זה לא קיימת הכרעת מעבר מתועדת במאגר. נדרש אימות נוסף בהתאם לגרסת המערכת.
          </p>
        )}
        {v.migration ? (
          <>
            <h3 className="ndm-h3">נקודות לבדיקה לאחר המעבר</h3>
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
        {" "}מקור: תיעוד הפרויקט.
      </p>
    </article>
  );
}
