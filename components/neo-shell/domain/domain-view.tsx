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
import { Fragment } from "react";
import {
  AlertTriangle, ArrowLeft, BadgeCheck, Boxes, FlaskConical, GitBranch,
  GraduationCap, LayoutGrid, Lightbulb, Plug, Puzzle, Route, ShieldQuestion,
  Table2, Terminal, Workflow,
} from "lucide-react";
import { SectionNav } from "@/components/neo-shell/workspace/section-nav";
import { Rtl } from "@/components/neo-shell/rtl-text";
import { domainCards, domainTotals, tableLines, type DomLink, type DomainView } from "./domain-data";
import { DomainHubList } from "./domain-hub-list";

const nf = new Intl.NumberFormat("he-IL");

const MOD_VAR: Record<string, string> = { PM: "var(--mod-pm)", "PP-PI": "var(--mod-pppi)" };

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


export function DomainsHub() {
  const t = domainTotals();
  const cards = domainCards();
  const lines = tableLines();

  return (
    <div className="ndm nm-scene" data-surface="domains" data-scene="cream">
      <header className="ndm-hero">
        <p className="ndm-eye">
          <Boxes size={13} strokeWidth={2} aria-hidden="true" />
          <span>תחומים עסקיים</span>
          <i aria-hidden="true" />
          <span lang="en">BUSINESS DOMAINS</span>
        </p>
        <h1 className="ndm-h1">התחומים העסקיים של PM ו-PP-PI</h1>
        {/* What a full record holds is stated beside the depth filter, where the
            reader chooses between the two, in the same words. */}
        <p className="ndm-lede">
          {t.domains} תחומים פונקציונליים של PM ו-PP-PI. לכל תחום: הזרימה העסקית שלב אחר שלב,
          טבלאות SAP והטרנזקציות התומכות בה, נקודות למידה ותקלות נפוצות.
        </p>
        <p className="nx-gate-note">
          כאן: איפה זה קורה בתהליך. מרכז הידע מסביר מה זה (<Link href="/neo/knowledge/" prefetch={false}>מושגי SAP</Link>),
          מרכזי הידע מסבירים איך עושים (<Link href="/neo/centers/" prefetch={false}>יחידות עבודה</Link>).
        </p>
        <div className="ndm-stats">
          {/* Each label states its scope: these are the tables, codes and BAPIs
              the domains name, not the catalogues the rail counts. */}
          {([
            [t.domains, "תחומים", `PM ${nf.format(t.pm)} · PP-PI ${nf.format(t.pppi)}`],
            [t.steps, "שלבי תהליך", ""],
            [t.tables, "טבלאות SAP בתחומים", ""],
            [t.tcodes, "טרנזקציות בתחומים", ""],
            [t.bapis, "BAPIs בתחומים", ""],
            [t.trouble, "תקלות מתועדות", ""],
          ] as [number, string, string][]).map(([n, l, sub]) => (
            <span key={l} className="ndm-stat">
              <b className="nx-sap">{nf.format(n)}</b>{" "}
              <em>{l}</em>
              {sub ? <small><bdi dir="ltr">{sub}</bdi></small> : null}
            </span>
          ))}
        </div>

      </header>

      <DomainHubList cards={cards} lines={lines} tables={t.tables} />

      <p className="ndm-credit">Project NEO · CBC Israel · פותח על ידי סאלי חליף · Web Coding</p>
    </div>
  );
}

/* ------------------------------------------------------------------ detail */

/** "רשימות פעולות (Task Lists)": the Latin gloss is one LTR unit that moves to
 *  the next line whole instead of splitting with its brackets mirrored. */
function Title({ he }: { he: string }) {
  const m = he.match(/^(.*?)\s*(\([A-Za-z][^)]*\))\s*$/);
  if (!m) return <>{he}</>;
  return <>{m[1]} <bdi dir="ltr" className="ndm-gloss">{m[2]}</bdi></>;
}

/** Plain chips, for names the record holds without a page or a description of
 *  their own (business objects, Fiori apps). */
function Chips({ items }: { items: string[] }) {
  return (
    <div className="ndm-chips">
      {items.map((t, i) => <span key={`${t}-${i}`} className="ndm-chip">{t}</span>)}
    </div>
  );
}

/** SAP objects by name, each with the description the project's own registry
 *  holds. A name the project documents is a link to its page; one it does not
 *  is the same row, dashed, with no pointer. Nothing is described here that
 *  the registry does not describe. */
function RefList({ items, share }: { items: DomLink[]; share?: Map<string, number> }) {
  return (
    <ul className="ndm-refs">
      {items.map((l, i) => {
        const n = share?.get(l.t) || 0;
        const body = (
          <>
            <b className="nx-sap" dir="ltr">{l.t}</b>
            <span className="ndm-ref-he">{l.he ? <Rtl s={l.he} /> : <em>אין תיאור במאגר</em>}</span>
            {n ? <span className="ndm-ref-share">ב־{nf.format(n)} תחומים נוספים</span> : null}
          </>
        );
        return (
          <li key={`${l.t}-${i}`}>
            {l.href ? (
              <Link className="ndm-ref" data-live="1" href={l.href} prefetch={false}>
                {body}
                <ArrowLeft className="ndm-ref-go" size={14} strokeWidth={2} aria-hidden="true" />
              </Link>
            ) : (
              <span className="ndm-ref" data-live="0">{body}</span>
            )}
          </li>
        );
      })}
    </ul>
  );
}

/** One section: a badge carrying the section's icon and number, the title,
 *  and the count of what it holds; a one-line lede under them. */
function Sec({
  id, n, icon, title, count, lede, children,
}: {
  id: string; n: number; icon: React.ReactNode; title: string;
  count?: string; lede?: string; children: React.ReactNode;
}) {
  return (
    <section className="ndm-sec nm-rise nm-once" id={id} aria-labelledby={`${id}-h`}>
      <header className="ndm-sec-h">
        <span className="ndm-sec-badge" aria-hidden="true">
          {icon}
          <b>{String(n).padStart(2, "0")}</b>
        </span>
        <div className="ndm-sec-t">
          <h2 className="ndm-h2" id={`${id}-h`}>
            {title}
            {count ? <span className="ndm-sec-c">{count}</span> : null}
          </h2>
          {lede ? <p className="ndm-sec-s">{lede}</p> : null}
        </div>
      </header>
      <div className="ndm-sec-b">{children}</div>
    </section>
  );
}

const Bullets = ({ items }: { items: string[] }) => (
  <ul className="ndm-bul">{items.map((x, i) => <li key={i}><Rtl s={x} /></li>)}</ul>
);

/** What a full record holds, in the order the base-record sentence names it:
 *  [label, section to open, does this record have it]. */
const COVER: [string, string, (v: DomainView) => boolean][] = [
  ["זרימה", "ndm-flow", (v) => v.flow.length > 0],
  ["טבלאות", "ndm-data", (v) => v.tables.length > 0],
  ["טרנזקציות", "ndm-data", (v) => v.tcodes.length > 0],
  ["BAPIs", "ndm-api", (v) => v.bapis.length + v.funcs.length > 0],
  ["נקודות למידה", "ndm-learn", (v) => v.learning.length > 0],
  ["תקלות", "ndm-trb", (v) => v.trouble.length + v.incidents.length > 0],
  ["נתוני אב", "ndm-purpose", (v) => v.masterData.length > 0],
  ["User Exits ו-BAdIs", "ndm-ext", (v) => v.exits.length + v.badis.length > 0],
  ["תרחישי בדיקה", "ndm-qa", (v) => v.qa.length > 0],
  ["תרחיש מהמפעל", "ndm-scen", (v) => !!v.scenario],
  ["הכרעת מעבר", "ndm-s4", (v) => v.s4.length > 0],
];

/** The tones that are a verdict on the domain: stays, changes, replaced, gone. */
const VERDICT = new Set(["stays", "changes", "replaced", "gone"]);

/** The test type a scenario starts with in the record ("Positive: …"). */
const QA_KIND = /^(Positive|Negative|Integration|Regression)\s*:\s*(.*)$/i;

export function DomainDetailView({ v }: { v: DomainView }) {
  const nav: [string, string][] = [];
  const push = (id: string, he: string) => { nav.push([id, he]); return nav.length; };

  // The flow is the hero's route, so it takes the first place in the bar
  // without a numbered section of its own.
  push("ndm-flow", "הזרימה העסקית");
  const nChain = v.diagram.length ? push("ndm-chain", "התהליך המפורט") : 0;
  const nPurpose = v.purpose || v.masterData.length || v.objects.length ? push("ndm-purpose", "הגדרה ומטרה") : 0;
  const nData = push("ndm-data", "טבלאות וטרנזקציות");
  const nApi = v.bapis.length || v.funcs.length ? push("ndm-api", "BAPIs ומודולי פונקציה") : 0;
  // The migration verdict is the question the product exists to answer, so it
  // comes right after the data and the interfaces rather than near the end.
  const nS4 = push("ndm-s4", "המעבר ל-S/4HANA");
  const nExt = v.exits.length || v.badis.length ? push("ndm-ext", "הרחבות") : 0;
  const nLearn = v.learning.length ? push("ndm-learn", "נקודות למידה") : 0;
  const nQa = v.qa.length ? push("ndm-qa", "תרחישי בדיקה") : 0;
  const nTrb = v.trouble.length || v.incidents.length ? push("ndm-trb", "תקלות ופתרונות") : 0;
  const nScen = v.scenario ? push("ndm-scen", "תרחיש מהמפעל") : 0;
  const nRel = v.related.length || v.siblings.length ? push("ndm-rel", "תחומים קשורים") : 0;

  // How many OTHER domains run through each of this domain's tables.
  const share = new Map<string, number>();
  for (const r of v.related) for (const t of r.shared) share.set(t, (share.get(t) || 0) + 1);
  const relSet = new Set(v.related.map((r) => r.slug));
  const others = v.siblings.filter((s) => !relSet.has(s.slug));
  const enShown = !v.he.toLowerCase().includes(v.title.toLowerCase());
  const verdicts = v.s4.filter((r) => VERDICT.has(r.tone));
  const dashed = v.tables.some((x) => !x.href) || v.tcodes.some((x) => !x.href);

  // The ledger: every count opens the section that holds it.
  const ledger: [number, string, string][] = [
    [v.flow.length, "שלבים", "#ndm-flow"],
    [v.tables.length, "טבלאות", "#ndm-data"],
    [v.tcodes.length, "טרנזקציות", "#ndm-data"],
    [v.bapis.length + v.funcs.length, "BAPIs ומודולים", "#ndm-api"],
    [v.learning.length, "נקודות למידה", "#ndm-learn"],
    [v.trouble.length + v.incidents.length, "תקלות", "#ndm-trb"],
  ];

  return (
    <article
      className="ndm ndm-detail nm-scene"
      data-surface="domains"
      data-scene="cream"
      style={{ "--m": MOD_VAR[v.module] } as React.CSSProperties}
    >
      <header className="ndm-dh">
        <div className="ndm-dh-main">
          <p className="ndm-eye">
            <Link className="ndm-back" href="/neo/domain-model/" prefetch={false}>תחומים עסקיים</Link>
            <i aria-hidden="true" />
            <span className="ndm-sap" dir="ltr">{v.module}</span>
          </p>
          <h1 className="ndm-h1"><Title he={v.he} /></h1>
          {/* An LTR block would align to the far side of an RTL page; the name is an
              isolated run inside a block that keeps the page's direction. */}
          {enShown ? <p className="ndm-h1-en"><bdi dir="ltr">{v.title}</bdi></p> : null}
          <p className="ndm-lede"><Rtl s={v.summary} /></p>
          <p className="ndm-dh-tags">
            <span className="ndm-tag ndm-tag--mod">{v.moduleHe}</span>
            <span className="ndm-mark" data-deep={v.deep ? "1" : "0"}>{v.deep ? "רשומה מלאה" : "רשומת בסיס"}</span>
          </p>
          {/* THE VERDICT AT A GLANCE: one status dot and word per verdict line the
              record holds, all of them a way into the S/4HANA section. */}
          <p className="ndm-verdict">
            <span className="ndm-verdict-k">הכרעת מעבר</span>
            {verdicts.length ? (
              <a href="#ndm-s4">
                {/* Each verdict line's own label from the record. Fiori, CDS and the
                    planning notes are not verdicts and are read in the section. */}
                {verdicts.map((r) => (
                  <span key={r.key} className="ndm-verdict-i" style={{ "--t": TONE[r.tone] } as React.CSSProperties}>{r.he}</span>
                ))}
              </a>
            ) : (
              <a href="#ndm-s4" className="ndm-verdict-none">לא מתועדת במאגר</a>
            )}
          </p>
          {/* WHAT IS AND IS NOT HERE, first thing on a thin domain's page: the
              parts a full record holds, filled where this record has them. */}
          {!v.deep ? (
            <div className="ndm-cover">
              <p className="ndm-cover-k">
                <ShieldQuestion size={14} strokeWidth={1.75} aria-hidden="true" />
                רשומת בסיס: זרימה, טבלאות, טרנזקציות, BAPIs, נקודות למידה ותקלות. לרשומה המלאה לא קיים תיעוד מאומת במאגר:
              </p>
              <ul aria-label="חלקי הרשומה המלאה שאינם קיימים לתחום זה">
                {COVER.filter(([, , has]) => !has(v)).map(([he]) => <li key={he}>{he}</li>)}
              </ul>
            </div>
          ) : null}
          <ul className="ndm-led" aria-label="התחום במספרים">
            {ledger.map(([n, l, to]) => (
              <li key={l}>
                <a href={to}>
                  <b className="nx-sap">{nf.format(n)}</b>{" "}
                  <span>{l}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* THE ROUTE. The domain's business flow, in the record's own order: the
            step as the record names it and its Hebrew gloss. */}
        <section className="ndm-route" id="ndm-flow" aria-labelledby="ndm-route-h">
          <p className="ndm-route-k" id="ndm-route-h">
            <span><Route size={14} strokeWidth={2} aria-hidden="true" /> הזרימה העסקית</span>
            <em>{nf.format(v.flow.length)} שלבים, כפי שתועדו במאגר</em>
          </p>
          <ol>
            {v.flow.map((s, i) => (
              <li key={i}>
                <i className="ndm-route-dot" aria-hidden="true">{i + 1}</i>
                <span className="ndm-route-t">
                  <b><Rtl s={s.he} /></b>
                  <span lang="en" dir="ltr">{s.step}</span>
                </span>
              </li>
            ))}
          </ol>
          {v.diagram.length ? (
            <a className="ndm-route-more" href="#ndm-chain">
              לתהליך המפורט · {nf.format(v.diagram.length)} תחנות
              <ArrowLeft size={13} strokeWidth={2} aria-hidden="true" />
            </a>
          ) : null}
        </section>
      </header>

      <SectionNav sections={nav.map(([id, label]) => ({ id, label }))} />

      {nChain ? (
        <Sec id="ndm-chain" n={nChain} icon={<Workflow size={15} strokeWidth={1.75} />}
          title="התהליך המפורט" count={`${nf.format(v.diagram.length)} תחנות`}>
          <ol className="ndm-chain">
            {v.diagram.map((x, i) => <li key={i}><i aria-hidden="true">{i + 1}</i><span><Rtl s={x} /></span></li>)}
          </ol>
        </Sec>
      ) : null}

      {nPurpose ? (
        <Sec id="ndm-purpose" n={nPurpose} icon={<Lightbulb size={15} strokeWidth={1.75} />} title="הגדרה ומטרה">
          {v.purpose ? <p className="ndm-p ndm-p--lead"><Rtl s={v.purpose} /></p> : null}
          {v.masterData.length || v.objects.length ? (
            <div className="ndm-two">
              {v.masterData.length ? (
                <div>
                  <h3 className="ndm-h3">נתוני אב נדרשים</h3>
                  <Bullets items={v.masterData} />
                </div>
              ) : null}
              {v.objects.length ? (
                <div>
                  <h3 className="ndm-h3">אובייקטים עסקיים</h3>
                  <Chips items={v.objects} />
                </div>
              ) : null}
            </div>
          ) : null}
        </Sec>
      ) : null}

      <Sec
        id="ndm-data" n={nData}
        icon={<Table2 size={15} strokeWidth={1.75} />}
        title="טבלאות וטרנזקציות"
        count={`${nf.format(v.tables.length)} טבלאות · ${nf.format(v.tcodes.length)} טרנזקציות`}
        lede={`${nf.format(v.tables.filter((x) => x.href).length)} מתוך ${nf.format(v.tables.length)} הטבלאות ו-${nf.format(v.tcodes.filter((x) => x.href).length)} מתוך ${nf.format(v.tcodes.length)} הטרנזקציות פותחות דף בפרויקט.${dashed ? " שורה מקווקוות היא שם שאין לו דף." : ""}`}
      >
        <div className="ndm-two">
          <div>
            <h3 className="ndm-h3"><Table2 size={13} strokeWidth={2} aria-hidden="true" /> טבלאות</h3>
            <RefList items={v.tables} share={share} />
          </div>
          <div>
            <h3 className="ndm-h3"><Terminal size={13} strokeWidth={2} aria-hidden="true" /> טרנזקציות</h3>
            <RefList items={v.tcodes} />
          </div>
        </div>
        {v.fiori.length ? (
          <>
            <h3 className="ndm-h3"><LayoutGrid size={13} strokeWidth={2} aria-hidden="true" /> יישומי Fiori</h3>
            <Chips items={v.fiori} />
          </>
        ) : null}
      </Sec>

      {nApi ? (
        <Sec
          id="ndm-api" n={nApi}
          icon={<Plug size={15} strokeWidth={1.75} />}
          title="BAPIs ומודולי פונקציה"
          count={`${nf.format(v.bapis.length + v.funcs.length)}`}
        >
          {v.bapis.length ? <RefList items={v.bapis} /> : null}
          {v.funcs.length ? (
            <>
              <h3 className="ndm-h3">מודולי פונקציה מהרשומה המלאה</h3>
              <RefList items={v.funcs} />
            </>
          ) : null}
        </Sec>
      ) : null}

      <Sec
        id="ndm-s4" n={nS4}
        icon={<GitBranch size={15} strokeWidth={1.75} />}
        title="המעבר ל-S/4HANA"
        lede={v.s4.length ? "הכרעת המעבר כפי שתועדה במאגר, שורה לכל היבט." : undefined}
      >
        {v.s4.length ? (
          <ul className="ndm-s4">
            {v.s4.map((r) => (
              <li key={r.key} style={{ "--t": TONE[r.tone] } as React.CSSProperties}>
                <b>{r.he}</b>
                <span><Rtl s={r.text} /></span>
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
            <p className="ndm-p"><Rtl s={v.migration} /></p>
          </>
        ) : null}
      </Sec>

      {nExt ? (
        <Sec id="ndm-ext" n={nExt} icon={<Puzzle size={15} strokeWidth={1.75} />}
          title="נקודות הרחבה" lede="User Exits ו-BAdIs כפי שתועדו במאגר.">
          <div className="ndm-two">
            {v.exits.length ? (<div><h3 className="ndm-h3"><bdi dir="ltr">User Exits</bdi></h3><Bullets items={v.exits} /></div>) : null}
            {v.badis.length ? (<div><h3 className="ndm-h3"><bdi dir="ltr">BAdIs</bdi></h3><Bullets items={v.badis} /></div>) : null}
          </div>
        </Sec>
      ) : null}

      {nLearn ? (
        <Sec id="ndm-learn" n={nLearn} icon={<GraduationCap size={15} strokeWidth={1.75} />}
          title="נקודות למידה" count={`${nf.format(v.learning.length)}`}>
          <ol className="ndm-learn">
            {v.learning.map((x, i) => (
              <li key={i}><i aria-hidden="true">{i + 1}</i><span><Rtl s={x} /></span></li>
            ))}
          </ol>
        </Sec>
      ) : null}

      {nQa ? (
        <Sec id="ndm-qa" n={nQa} icon={<BadgeCheck size={15} strokeWidth={1.75} />}
          title="תרחישי בדיקה" count={`${nf.format(v.qa.length)}`}
          lede="כל תרחיש פותח בסוג הבדיקה שהמאגר נתן לו.">
          <ul className="ndm-qa">
            {v.qa.map((x, i) => {
              const m = x.match(QA_KIND);
              return (
                <li key={i}>
                  {m ? <b className="ndm-qa-k" lang="en">{m[1]}</b> : null}
                  <span><Rtl s={m ? m[2] : x} /></span>
                </li>
              );
            })}
          </ul>
        </Sec>
      ) : null}

      {nTrb ? (
        <Sec id="ndm-trb" n={nTrb} icon={<AlertTriangle size={15} strokeWidth={1.75} />}
          title="תקלות ופתרונות" count={`${nf.format(v.trouble.length + v.incidents.length)}`}>
          {v.trouble.length ? (
            <ul className="ndm-trb">
              {v.trouble.map((t, i) => (
                <li key={i}>
                  <b><Rtl s={t.issue} /></b>
                  <span><em>פתרון</em><Rtl s={t.fix} /></span>
                </li>
              ))}
            </ul>
          ) : null}
          {v.incidents.length ? (
            <>
              <h3 className="ndm-h3">תקלות מהשטח</h3>
              <ul className="ndm-inc">
                {v.incidents.map((x, i) => {
                  const k = x.indexOf(" — ");
                  return (
                    <li key={i}>
                      {k > 0 ? <><b><Rtl s={x.slice(0, k)} /></b><span><Rtl s={x.slice(k + 3)} /></span></> : <b><Rtl s={x} /></b>}
                    </li>
                  );
                })}
              </ul>
            </>
          ) : null}
        </Sec>
      ) : null}

      {nScen ? (
        <Sec id="ndm-scen" n={nScen} icon={<FlaskConical size={15} strokeWidth={1.75} />} title="תרחיש מהמפעל">
          <p className="ndm-quote"><Rtl s={v.scenario} /></p>
        </Sec>
      ) : null}

      {nRel ? (
        <Sec
          id="ndm-rel" n={nRel}
          icon={<Boxes size={15} strokeWidth={1.75} />}
          title="תחומים קשורים"
          lede={v.related.length ? "תחומים שעוברים באותן טבלאות, מהמשותף ביותר. ליד כל אחד: הטבלאות המשותפות." : undefined}
        >
          {v.related.length ? (
            <ul className="ndm-rel">
              {v.related.map((r) => (
                <li key={r.slug} style={{ "--m": MOD_VAR[r.module] } as React.CSSProperties}>
                  <Link href={`/neo/domain/${r.slug}/`} prefetch={false}>
                    <b><Title he={r.he} /></b>
                    <span className="ndm-rel-mod" dir="ltr">{r.module}</span>
                    <span className="ndm-rel-t">
                      {r.shared.map((t, k) => <Fragment key={t}>{k ? " · " : ""}<span className="nx-sap">{t}</span></Fragment>)}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          ) : null}
          {others.length ? (
            <>
              <h3 className="ndm-h3">שאר תחומי <bdi dir="ltr">{v.module}</bdi></h3>
              <ul className="ndm-sib">
                {others.map((s) => (
                  <li key={s.slug}>
                    <Link href={`/neo/domain/${s.slug}/`} prefetch={false}>
                      <b><Title he={s.he} /></b>
                      <em>{s.tables} טבלאות</em>
                    </Link>
                  </li>
                ))}
              </ul>
            </>
          ) : null}
        </Sec>
      ) : null}

      <footer className="ndm-foot">
        <p className="ndm-src">התוכן מוצג כפי שנכתב בתיעוד הפרויקט.</p>
        <p className="ndm-credit">Project NEO · CBC Israel · פותח על ידי סאלי חליף · Web Coding</p>
      </footer>
    </article>
  );
}
