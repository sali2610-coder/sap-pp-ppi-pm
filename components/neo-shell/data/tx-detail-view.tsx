/* ============================================================================
   PROJECT NEO · /neo/transactions/<CODE>/ — the screen.
   ----------------------------------------------------------------------------
   A SERVER component. The SAP facts are rendered to HTML at build time and the
   browser receives two small islands: the contextual return and the favourite
   toggle. Nothing else here is interactive, so nothing else here ships JS.

   IT IS A PRODUCT SCREEN, NOT A DOCUMENT
     · The first decision a consultant has to make about a T-Code in 2026 is
       "does this survive S/4HANA". So that block sits directly under the
       identity, at full width, with the largest non-heading type on the page —
       §I, taken literally.
     · Everything else is answers to named questions, in blocks that can be
       scanned. A block whose question the dataset does not answer is NOT
       rendered; the four facts where silence is itself the answer say
       `לא קיים מידע מאומת` in words.
     · Every control is a real .nu-* control with a real destination, and every
       outgoing link records the origin so the page it opens can come back here.

   THE LEGACY PAGES' BLOCKS (tx/blocks.ts), in the order a reader needs them:
     the /apps/ evolution path after the S/4 plate; the plain explanation and
     the consultant's note in «תפקיד הטרנזקציה»; debug, performance, tips and
     examples behind «פירוט Enterprise»; the process strip and every relation
     list beside the related transactions; the consultant's notes and the
     interview questions last. Long secondary content sits in native <details>,
     so it is in the HTML and the first screen stays what it was.

   FORM RULE (app/globals.css, above --mod-pm), obeyed exactly
     STATUS  — S/4 risk, verification trust and registry depth. Each is a small
               dot plus its word (.nu-status), never a surface and never a ring.
     MODULE  — the header's bar, the top rule of a plate, the ring on the module
               chip, the row edges. Line / edge / ring / tint only.
     ACCENT  — brand red marks ONE thing: that this transaction materially
               changes in S/4HANA. It is not a module colour and not a status.
   ========================================================================== */

import { enDir, enLang } from "../lang";
import { ViewTransition } from "react";
import {
  AlertTriangle, AppWindow, ArrowLeft, Boxes, ChevronDown, GitBranch, KeyRound,
  Lightbulb, NotebookPen, Plug, Route, ShieldCheck, Terminal, Workflow,
} from "lucide-react";
import { OriginLink, SmartReturn, type OriginArg } from "@/components/neo-shell/nav-context";
import { bapiHref, cdsHref, idocHref, txHref } from "../reference/ref-links";
import { SectionNav } from "@/components/neo-shell/workspace/section-nav";
import { EvidenceBlock } from "../evidence/evidence-block";
import { RecordStatus } from "../evidence/record-status";
import { CopyId } from "../copy-id";
import { RISK_COLOR, RISK_HE, TRUST_HE } from "@/lib/s4";
import { MOD_HE, modVar } from "../mod-var";
import type { TxDetail, TxIssue } from "./tx-detail";
import type { TxCodeRef, TxLine, TxProfileDim } from "./tx/blocks";
import { TxActions } from "./tx-actions";

const nf = new Intl.NumberFormat("he-IL");

const NONE = "אין תיעוד מאומת במאגר";

type Origin = { href: string; label: string; detail: string };

/* ------------------------------------------------------------ primitives */

/** The id lands on the SECTION and not on the heading, because the running
 *  section bar observes the section BOX to decide which chip is active and a
 *  heading is one line tall. The heading keeps its own `${id}-h`, so the section
 *  is still named by it for a screen reader. */
function Section({ id, icon, title, note, children }: {
  id: string; icon: React.ReactNode; title: string; note?: string; children: React.ReactNode;
}) {
  return (
    // nm-rise + nm-once, from app/neo/motion.css. /neo/transactions/<CODE>/
    // resolves to [data-motion="2"]: an 8px rise scrubbed on .nx-canvas's view
    // timeline, complete while the section is still entering, so a reader
    // scrolling back up over a nine-section page never sees it replay. One
    // class on the ONE wrapper every section already goes through, which is
    // also why no section can be forgotten.
    <section className="nxt-sec nm-rise nm-once" id={id} aria-labelledby={`${id}-h`}>
      <h2 className="nx-h2 nxt-sec-h" id={`${id}-h`}>
        <span className="nxt-sec-i" aria-hidden="true">{icon}</span>
        {title}
        {note ? <em className="nxt-sec-n">{note}</em> : null}
      </h2>
      {children}
    </section>
  );
}

/** A named fact. The label is metadata, the value is content — the two are set
 *  at different sizes and weights on purpose (§T). */
function Fact({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="nxt-fact">
      <dt className="nxt-l">{label}</dt>
      <dd className="nxt-v">{children}</dd>
    </div>
  );
}

function Status({ color, children }: { color: string; children: React.ReactNode }) {
  return <span className="nu-status" style={{ "--s": color } as React.CSSProperties}>{children}</span>;
}

function Bullets({ items, ordered }: { items: string[]; ordered?: boolean }) {
  // lang only: a dir="ltr" item in a right-to-left list moves its marker and
  // its alignment to the other edge.
  const li = items.map((x, i) => <li key={`${i}-${x.slice(0, 24)}`} lang={enLang(x)}>{x}</li>);
  return ordered ? <ol className="nxt-ol">{li}</ol> : <ul className="nxt-ul">{li}</ul>;
}

/** A long secondary block, closed by default and present in the HTML. */
function More({ title, note, children }: { title: string; note?: string; children: React.ReactNode }) {
  return (
    <details className="nxt-more">
      <summary>
        <ChevronDown size={16} strokeWidth={1.75} aria-hidden="true" />
        {title}
        {note ? <em>{note}</em> : null}
      </summary>
      <div className="nxt-more-b">{children}</div>
    </details>
  );
}

/** SAP identifiers in a list. A code with a page in NEO is a link to it (the
 *  link language: link colour and an arrow), as the related transactions on
 *  the same page are; a code without one is a value, a .nu-chip. MIGO could
 *  not reach MB01 although MB01 has a page and links back (gate 5, finding
 *  15). `href` answers only with a page the build generates (ref-links.ts). */
function Codes({ items, label, href, origin }: {
  items: string[]; label: string; href?: (code: string) => string | null; origin?: OriginArg;
}) {
  return (
    <ul className="nxt-codes" aria-label={label}>
      {items.map((x) => {
        const to = href?.(x);
        return to && origin ? (
          <li key={x}>
            <OriginLink href={to} origin={origin} className="nu-link nxt-codelink">
              <span className="nx-sap">{x}</span>
              <ArrowLeft className="nu-arw" size={12} strokeWidth={2} aria-hidden="true" />
            </OriginLink>
          </li>
        ) : <li key={x} className="nu-chip is-sap">{x}</li>;
      })}
    </ul>
  );
}

/** A relation list: each value links to its NEO page when one exists. */
function Refs({ items, label, origin }: { items: TxCodeRef[]; label: string; origin: Origin }) {
  const by = new Map(items.map((x) => [x.code, x.href]));
  return <Codes items={items.map((x) => x.code)} label={label} href={(c) => by.get(c) ?? null} origin={origin} />;
}

/** Labelled lines (the /apps/ guidance and catalogue facts). */
function Lines({ rows }: { rows: TxLine[] }) {
  return (
    <dl className="nxt-grid">
      {rows.map((r) => (
        <Fact key={r.label} label={r.label}>
          {r.items.length > 1 ? <Bullets items={r.items} /> : <span lang={enLang(r.items[0])} dir={enDir(r.items[0])}>{r.items[0]}</span>}
        </Fact>
      ))}
    </dl>
  );
}

/** A function object is a BAPI or FM, or an IDoc message type, and has one
 *  home either way. */
const funcHref = (code: string) => bapiHref(code) ?? idocHref(code);

/* ------------------------------------------------------------- the screen */

export function TxDetailView({ t }: { t: TxDetail }) {
  const m = modVar(t.module);
  const modHe = MOD_HE[t.module] || t.moduleHe;
  const impacted = t.s4.disposition === "superseded" || t.s4.disposition === "changed";
  const b = t.blocks;
  const apps = t.apps;

  // The origin every outgoing link on this page records. One object, so the
  // label can never drift between the table links and the neighbour links.
  const origin = { href: `/neo/transactions/${encodeURIComponent(t.code)}/`, label: "טרנזקציה", detail: t.code };

  const authored = t.tables.filter((x) => x.from === "authored");
  const blueprint = t.tables.filter((x) => x.from === "blueprint");
  // Exits the record names itself. The ones only the enhancement catalogue
  // ties to this code are listed with the derived issues, labelled as such.
  const ownExits = t.exits.filter((x) => !t.exitsDerived.includes(x));
  // CDS views the legacy /apps/ page joined through the record's tables
  // (data/cds-map); the ones the record names itself are on the S/4 plate.
  const cdsByTable = (apps?.cds || []).filter((v) => !t.cds.includes(v));

  const enterprise = b
    ? ([
        ["נתיב Debug", b.debug.length],
        ["ביצועים", b.perf.length],
        ["טיפים לפרודקשן", b.prodTips.length],
        ["דוגמה עסקית", b.businessExample ? 1 : 0],
        ["דוגמה טכנית", b.techExample ? 1 : 0],
      ] as [string, number][]).filter(([, n]) => n).map(([l]) => l)
    : [];
  const notes = !!b && !!(b.bestPractices.length || b.certTips || b.oss.length || b.interview.length);
  const guidance = !!apps && !!(apps.tips.length || apps.qa.length);

  // A block whose question the dataset does not answer is not rendered, so the
  // running section bar is built from the SAME conditions the page renders on.
  // A chip can therefore never point at a section that is not on the screen.
  const has = {
    succ: !!apps && !!(apps.path || apps.catalog.length || apps.lifecycle.length),
    what: !!(t.purpose || t.process || t.whenUse || t.whenNot || t.tech || b?.beginner || b?.consultant),
    flow: !!(t.flow.length || t.selection.length || enterprise.length),
    int: !!(t.bapis.length || ownExits.length || t.badis.length || t.enhancements.length || t.auth.length || b?.classes.length),
    notes: notes || guidance,
  };
  const heIsArea = !!t.he && t.he === t.area;
  const nav: { id: string; label: string }[] = [
    { id: "nxt-s4", label: "המעבר ל-S/4HANA" },
    ...(has.succ ? [{ id: "sec-succ", label: "היורש המומלץ" }] : []),
    ...(has.what ? [{ id: "sec-what", label: "תפקיד הטרנזקציה" }] : []),
    ...(has.flow ? [{ id: "sec-flow", label: "מסך והרצה" }] : []),
    { id: "sec-obj", label: "אובייקטים וטבלאות" },
    ...(t.profile ? [{ id: "sec-prof", label: "תבונת אובייקט" }] : []),
    ...(has.int ? [{ id: "sec-int", label: "ממשקים והרחבות" }] : []),
    { id: "sec-near", label: "טרנזקציות קשורות" },
    { id: "sec-iss", label: "תקלות ידועות" },
    ...(has.notes ? [{ id: "sec-notes", label: "הערות יועץ" }] : []),
  ];

  return (
    <article className="nxt" data-surface="transaction" style={{ "--m": m } as React.CSSProperties}>
      <SmartReturn
        fallback={{ href: "/neo/transactions/", label: "טרנזקציות" }}
        hint="אין עמוד קודם בביקור הזה"
      />

      {/* ------------------------------------------------------ 1. IDENTITY */}
      <header className="nxt-head nm-rise nm-once">
        <span className="nx-modbar" aria-hidden="true" />
        <p className="nx-eyebrow nxt-eyebrow">
          טרנזקציה · {t.module}{modHe ? ` · ${modHe}` : ""}
        </p>

        <div className="nxt-title">
          <div className="nxt-codeline">
            <ViewTransition name={`rec-tx-${t.code}`} share="rec-morph" default="none">
              <h1 className="nxt-code nx-sap">{t.code}</h1>
            </ViewTransition>
            <CopyId value={t.code} label="העתקת קוד הטרנזקציה" compact />
          </div>
          <div className="nxt-names">
            {/* Most registry rows carry the functional area where a meaning would
                be (IW31, IW32 and IW33 all read "הזמנות תחזוקה"); said as an
                area, it is not mistaken for what this code does. */}
            {heIsArea
              ? <p className="nxt-he"><span className="nxt-he-k">תחום:</span> {t.he}</p>
              : <p className="nxt-he" lang={enLang(t.he)}>{t.he || NONE}</p>}
            {t.en ? <p className="nxt-en" dir="ltr" lang={enLang(t.en)}>{t.en}</p> : <p className="nxt-en nxt-absent">אין שם אנגלי במקור</p>}
          </div>
          <TxActions code={t.code} />
        </div>

        <p className="nxt-s4line"><RecordStatus e={t.evidence} /></p>
        <div className="nxt-meta">
          {t.origin === "blueprint" ? (
            <Status color="var(--status-not-started)">לא ברשומת הטרנזקציות המאומתת</Status>
          ) : (
            <Status color={t.depth === "deep" ? "var(--status-done)" : "var(--status-not-started)"}>
              {t.depth === "deep" ? "מתועדת לעומק" : "רשומת אימות"}
            </Status>
          )}
          {t.verified ? <Status color="var(--status-done)">רשומה מסומנת כמאומתת</Status> : null}
          <span className="nu-chip nxt-mod" style={{ "--m": m } as React.CSSProperties}>
            <i aria-hidden="true" />{t.module}
          </span>
          {t.area && !heIsArea ? <span className="nu-chip">{t.area}</span> : null}
          {t.popularity > 0 ? (
            <span className="nu-chip">
              <span className="nx-sr">הפניות מתוך גרף הקשרים </span>{nf.format(t.popularity)} הפניות במאגר
            </span>
          ) : null}
          <span className="nxt-known">
            <span className="nx-sr">שלמות הרשומה </span>
            <bdi className="nxt-known-n">{nf.format(t.known)}/{nf.format(t.total)}</bdi> עובדות מאומתות
          </span>
        </div>
        {t.origin === "blueprint" ? (
          <p className="nxt-origin">
            הקוד אינו ברשומת הטרנזקציות המאומתת. הוא מוכר משורות תיעוד המקור של PM ו-PP-PI שמציינות אותו,
            וכל הנתונים בעמוד נגזרים מהן.
          </p>
        ) : null}
      </header>

      {/* The page's own index, kept on screen. The transaction page had no jump
          nav at all, so moving from "מה הטרנזקציה עושה" to "תקלות ידועות" meant
          scrolling the whole screen twice. */}
      <SectionNav sections={nav} />

      {/* ------------------------------------------------ 2. S/4HANA — §I
          The loudest block on the screen, and the only one that is rendered
          even when the dataset is silent: "we do not know" is a decision-
          relevant answer for a migration, and hiding it would be the lie. */}
      <section
        className="nxt-s4 nm-rise nm-once"
        id="nxt-s4"
        data-disp={t.s4.disposition}
        data-impacted={impacted ? "1" : undefined}
        aria-labelledby="s4-h"
      >
        <div className="nxt-s4-top">
          <p className="nx-eyebrow">המעבר ל-S/4HANA</p>
          <h2 className="nxt-s4-h" id="s4-h">{t.s4.he}</h2>
          <div className="nxt-s4-st">
            <Status color={RISK_COLOR[t.s4.risk]}>{RISK_HE[t.s4.risk]}</Status>
            <Status color={t.s4.trust === "verified" ? "var(--status-done)" : t.s4.trust === "partial" ? "var(--status-in-analysis)" : "var(--status-not-started)"}>
              {TRUST_HE[t.s4.trust]}
            </Status>
          </div>
        </div>

        {t.s4.supersededBy.length ? (
          <div className="nxt-s4-succ">
            <p className="nxt-l">הטרנזקציה העוקבת לפי המאגר</p>
            <ul className="nxt-succ-list">
              {t.s4.supersededBy.map((c) => (
                <li key={c}>
                  <OriginLink href={`/neo/transactions/${encodeURIComponent(c)}/`} origin={origin} className="nu-btn nxt-succ">
                    <span className="nx-sap">{c}</span>
                  </OriginLink>
                </li>
              ))}
            </ul>
            <p className="nxt-s4-why">
              {t.s4.supersededBy.length > 1
                ? "רשומות הטרנזקציות העוקבות במאגר מציינות את "
                : "רשומת הטרנזקציה העוקבת במאגר מציינת את "}
              <span className="nx-sap">{t.code}</span> כטרנזקציה שהוחלפה.
            </p>
          </div>
        ) : null}

        <dl className="nxt-s4-facts">
          <Fact label="הערת המאגר">{t.s4.note || NONE}</Fact>
          {/* The record's delta field is the ECC6 → S/4HANA 2025 comparison
              (data/tx-intel); an authored 14-column record's is not dated. */}
          {t.s4.delta ? <Fact label={b ? "ECC6 → S/4HANA 2025 · מה השתנה" : "ECC → S/4HANA · מה השתנה"}>{t.s4.delta}</Fact> : null}
          {t.s4.unchanged ? <Fact label="מה לא השתנה">{t.s4.unchanged}</Fact> : null}
          <Fact label="יישום Fiori קשור">
            {t.s4.fiori ? <span className="nxt-fiori"><AppWindow size={13} strokeWidth={1.75} aria-hidden="true" />{t.s4.fiori}</span> : NONE}
          </Fact>
          {t.s4.replaces.length ? (
            <Fact label="טרנזקציות שהוחלפו על ידה">
              <Codes items={t.s4.replaces} label="טרנזקציות שהוחלפו על ידה" href={txHref} origin={origin} />
            </Fact>
          ) : null}
          {t.cds.length ? (
            <Fact label="תצוגות CDS">
              <Codes items={t.cds} label="תצוגות CDS" href={cdsHref} origin={origin} />
            </Fact>
          ) : null}
        </dl>

        {t.s4.disposition === "unknown" ? (
          <p className="nxt-s4-warn">
            לא קיים במאגר תיעוד על מצב הטרנזקציה ב-S/4HANA. נדרש אימות במערכת SAP לפני החלטת המעבר.
          </p>
        ) : null}

        <EvidenceBlock e={t.evidence} />
      </section>

      {/* ------------------------------------- 3. THE EVOLUTION PATH (/apps/) */}
      {apps && has.succ ? (
        <Section id="sec-succ" icon={<Route size={15} strokeWidth={1.75} />} title="היורש המומלץ">
          <p className="nxt-sec-sub">מסלול האבולוציה של האובייקט</p>
          {apps.path ? (
            <ol className="nxt-path" aria-label="מסלול האבולוציה של האובייקט">
              <li>
                <span className="nxt-path-s">
                  <span className="nxt-l">ECC GUI</span>
                  <span className="nxt-path-v nx-sap">{t.code}</span>
                </span>
              </li>
              <li>
                <ArrowLeft className="nxt-path-sep" size={16} strokeWidth={1.75} aria-hidden="true" />
                <span className="nxt-path-s">
                  <span className="nxt-l">S/4HANA</span>
                  <span className={apps.path.s4IsCode ? "nxt-path-v nx-sap" : "nxt-path-v"}>{apps.path.s4}</span>
                </span>
              </li>
              <li>
                <ArrowLeft className="nxt-path-sep" size={16} strokeWidth={1.75} aria-hidden="true" />
                <span className="nxt-path-s">
                  <span className="nxt-l">Fiori</span>
                  <span className="nxt-path-v" lang={enLang(apps.path.fiori)}>{apps.path.fiori}</span>
                  {apps.path.fioriId ? <span className="nu-chip is-sap">{apps.path.fioriId}</span> : null}
                </span>
              </li>
            </ol>
          ) : null}
          {apps.moreApps.length ? (
            <div className="nxt-block">
              <p className="nxt-l">אפליקציות נוספות:</p>
              <ul className="nxt-codes" aria-label="אפליקציות Fiori נוספות">
                {apps.moreApps.map((x) => <li key={x} className="nu-chip" lang={enLang(x)} dir={enDir(x)}>{x}</li>)}
              </ul>
            </div>
          ) : null}
          {apps.criticality ? (
            <p><Status color={apps.criticality === "פעיל / יציב" ? "var(--status-done)" : "var(--status-in-analysis)"}>{apps.criticality}</Status></p>
          ) : null}
          {apps.lifecycle.length ? (
            <div className="nxt-block">
              <h3 className="nxt-sub">מחזור חיים ומיגרציה</h3>
              <Lines rows={apps.lifecycle} />
            </div>
          ) : null}
          {apps.catalog.length ? (
            <div className="nxt-block">
              <h3 className="nxt-sub">אפליקציית Fiori בקטלוג</h3>
              <Lines rows={apps.catalog} />
            </div>
          ) : null}
          {apps.compare ? (
            <More title="השוואה — ECC מול Fiori" note={`${t.code} מול ${apps.compare.app}`}>
              <div className="nxt-cmp-w">
                <table className="nxt-cmp">
                  <thead>
                    <tr><th scope="col">היבט</th><th scope="col"><span className="nx-sap">{t.code}</span> · SAP GUI</th><th scope="col" lang="en" dir="ltr">{apps.compare.app}</th></tr>
                  </thead>
                  <tbody>
                    {apps.compare.rows.map(([k, ecc, fiori]) => (
                      <tr key={k}>
                        <th scope="row">{k}</th>
                        <td lang={enLang(ecc)} dir={enDir(ecc)}>{ecc}</td>
                        <td lang={enLang(fiori)} dir={enDir(fiori)}>{fiori}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </More>
          ) : null}
        </Section>
      ) : null}

      {/* --------------------------------------------------- 4. WHAT IT DOES */}
      {has.what ? (
        <Section id="sec-what" icon={<Terminal size={15} strokeWidth={1.75} />} title="תפקיד הטרנזקציה">
          <dl className="nxt-grid">
            {b?.beginner ? <Fact label="מה אני רואה?">{b.beginner}</Fact> : null}
            {t.purpose ? <Fact label="מטרה עסקית">{t.purpose}</Fact> : null}
            {t.process ? <Fact label="מיקום בתהליך">{t.process}</Fact> : null}
            {t.whenUse ? <Fact label="מתי להשתמש">{t.whenUse}</Fact> : null}
            {t.whenNot ? <Fact label="מתי לא להשתמש">{t.whenNot}</Fact> : null}
            {t.tech ? <Fact label="תיאור טכני">{t.tech}</Fact> : null}
            {t.users.length ? <Fact label="משתמשים">{t.users.join(" · ")}</Fact> : null}
            {t.prereq.length ? <Fact label="דרישות מקדימות"><Bullets items={t.prereq} /></Fact> : null}
          </dl>
          {b?.consultant ? (
            <More title="הסבר ליועץ (טכני)">
              <p className="nxt-v">{b.consultant}</p>
            </More>
          ) : null}
        </Section>
      ) : null}

      {/* ------------------------------------------------------- 5. THE FLOW */}
      {has.flow ? (
        <Section id="sec-flow" icon={<Workflow size={15} strokeWidth={1.75} />} title="מסך והרצה">
          {t.flow.length || t.selection.length ? (
            <div className="nxt-two">
              {t.flow.length ? (
                <div>
                  <h3 className="nxt-sub">זרימה טיפוסית</h3>
                  <ol className="nxt-ol">{t.flow.map((s, i) => <li key={`${i}-${s.slice(0, 20)}`}>{s}</li>)}</ol>
                </div>
              ) : null}
              {t.selection.length ? (
                <div>
                  <h3 className="nxt-sub">מסך בחירה</h3>
                  <Bullets items={t.selection} />
                </div>
              ) : null}
            </div>
          ) : null}
          {b && enterprise.length ? (
            <More title="פירוט Enterprise" note={enterprise.join(" · ")}>
              <div className="nxt-two">
                {b.debug.length ? <div><h3 className="nxt-sub">נתיב Debug</h3><Bullets items={b.debug} ordered /></div> : null}
                {b.perf.length ? <div><h3 className="nxt-sub">ביצועים</h3><Bullets items={b.perf} /></div> : null}
                {b.prodTips.length ? <div><h3 className="nxt-sub">טיפים לפרודקשן</h3><Bullets items={b.prodTips} /></div> : null}
              </div>
              {b.businessExample ? (
                <div className="nxt-block">
                  <h3 className="nxt-sub">דוגמה עסקית</h3>
                  <p className="nxt-v">{b.businessExample}</p>
                </div>
              ) : null}
              {b.techExample ? (
                <div className="nxt-block">
                  <h3 className="nxt-sub">דוגמה טכנית</h3>
                  <p className="nxt-v" lang={enLang(b.techExample)} dir={enDir(b.techExample)}>{b.techExample}</p>
                </div>
              ) : null}
            </More>
          ) : null}
        </Section>
      ) : null}

      {/* -------------------------------------------- 6. OBJECTS AND TABLES */}
      <Section
        id="sec-obj"
        icon={<Boxes size={15} strokeWidth={1.75} />}
        title="אובייקטים וטבלאות"
        note={t.tables.length ? `${nf.format(t.tables.length)} טבלאות` : undefined}
      >
        {t.objects.length ? (
          <div className="nxt-block">
            <h3 className="nxt-sub">אובייקטים עסקיים</h3>
            <ul className="nxt-codes" aria-label="אובייקטים עסקיים">
              {t.objects.map((o) => <li key={o} className="nu-chip">{o}</li>)}
            </ul>
          </div>
        ) : null}

        {t.topics.length ? (
          <div className="nxt-block">
            <h3 className="nxt-sub">נושאים</h3>
            <ul className="nxt-codes" aria-label="נושאים">
              {t.topics.map((o) => <li key={o} className="nu-chip">{o}</li>)}
            </ul>
          </div>
        ) : null}

        {cdsByTable.length ? (
          <div className="nxt-block">
            <h3 className="nxt-sub nxt-sub-st">
              תצוגות CDS של הטבלאות
              <Status color="var(--status-in-analysis)">נגזר מהמאגר</Status>
            </h3>
            <Codes items={cdsByTable} label="תצוגות CDS של הטבלאות" href={cdsHref} origin={origin} />
          </div>
        ) : null}

        {t.tables.length === 0 ? (
          <p className="nxt-absent">{NONE} על טבלאות שהטרנזקציה נוגעת בהן.</p>
        ) : (
          <>
            {authored.length ? <h3 className="nxt-sub">טבלאות לפי רשומת הטרנזקציה</h3> : null}
            {authored.length ? <TableList rows={authored} origin={origin} /> : null}
            {/* The blueprint's own claim on a table the record already names:
                the row stays with the record, the derived claim is still said. */}
            {authored.some((r) => r.inBlueprint) ? (
              <p className="nxt-absent">
                טבלאות מקושרות (נגזר מהמאגר): תיעוד המקור של PM ו-PP-PI מציין את הקוד גם על{" "}
                {authored.filter((r) => r.inBlueprint).map((r, i) => (
                  <span key={r.name}>{i ? ", " : ""}<span className="nx-sap">{r.name}</span></span>
                ))}.
              </p>
            ) : null}
            {blueprint.length ? (
              <h3 className="nxt-sub nxt-sub-st">
                טבלאות מקושרות לפי תיעוד המקור של PM ו-PP-PI
                <Status color="var(--status-in-analysis)">נגזר מהמאגר</Status>
              </h3>
            ) : null}
            {blueprint.length ? <TableList rows={blueprint} origin={origin} showModule /> : null}
          </>
        )}
      </Section>

      {/* ------------------------------- 7. THE KIND PROFILE (blueprint only) */}
      {t.profile ? <ProfileSection dims={t.profile} origin={origin} /> : null}

      {/* --------------------------------------------------- 8. INTEGRATION */}
      {has.int ? (
        <Section id="sec-int" icon={<Plug size={15} strokeWidth={1.75} />} title="ממשקים והרחבות">
          <dl className="nxt-grid">
            {t.bapis.length ? <Fact label="BAPIs / FM"><Codes items={t.bapis} label="BAPIs / FM" href={funcHref} origin={origin} /></Fact> : null}
            {b?.classes.length ? <Fact label="Classes / APIs"><Codes items={b.classes} label="Classes / APIs" /></Fact> : null}
            {ownExits.length ? <Fact label="User Exits"><Codes items={ownExits} label="User Exits" /></Fact> : null}
            {t.badis.length ? <Fact label="BAdIs"><Codes items={t.badis} label="BAdIs" /></Fact> : null}
            {t.enhancements.length ? <Fact label="הרחבות (Enhancements)"><Codes items={t.enhancements} label="הרחבות" /></Fact> : null}
            {t.auth.length ? (
              <Fact label="אובייקטי הרשאה">
                <span className="nxt-inline-i" aria-hidden="true"><KeyRound size={12} strokeWidth={1.75} /></span>
                <Codes items={t.auth} label="אובייקטי הרשאה" />
              </Fact>
            ) : null}
          </dl>
        </Section>
      ) : null}

      {/* ---------------------------------------------------- 9. NEIGHBOURS */}
      <Section
        id="sec-near"
        icon={<GitBranch size={15} strokeWidth={1.75} />}
        title="טרנזקציות קשורות"
        note={t.neighbours.length ? `${nf.format(t.neighbours.length)} קודים` : undefined}
      >
        {t.neighbours.length === 0 && !b?.relations.length ? (
          <p className="nxt-absent">{NONE} על טרנזקציות קשורות לקוד זה.</p>
        ) : null}
        {t.neighbours.length ? (
          <ul className="nxt-near">
            {t.neighbours.map((n) => (
              <li key={n.code}>
                <OriginLink
                  href={n.href}
                  origin={origin}
                  className="nu-card nxt-near-c"
                  style={{ "--m": modVar(n.module) } as React.CSSProperties}
                >
                  <span className="nxt-near-e" aria-hidden="true" />
                  <span className="nxt-near-c1">
                    <b className="nx-sap">{n.code}</b>
                    <span className="nu-chip nxt-mod" style={{ "--m": modVar(n.module) } as React.CSSProperties}>
                      <i aria-hidden="true" />{n.module}
                    </span>
                  </span>
                  <span className="nxt-near-he">{n.he || "אין כותרת במאגר"}</span>
                  <span className="nxt-near-r">{n.reason}</span>
                </OriginLink>
              </li>
            ))}
          </ul>
        ) : null}

        {b?.steps.length ? (
          <div className="nxt-block">
            <h3 className="nxt-sub">ציר התהליך העסקי</h3>
            <ol className="nxt-path" aria-label="ציר התהליך העסקי">
              {b.steps.map((s, i) => (
                <li key={`${s.state}-${s.code}`} data-state={s.state} aria-current={s.state === "current" ? "step" : undefined}>
                  {i ? <ArrowLeft className="nxt-path-sep" size={16} strokeWidth={1.75} aria-hidden="true" /> : null}
                  <span className="nxt-path-s">
                    <span className="nx-sr">{s.state === "done" ? "שלב קודם: " : s.state === "todo" ? "שלב הבא: " : "הטרנזקציה הנוכחית: "}</span>
                    {s.href ? (
                      <OriginLink href={s.href} origin={origin} className="nu-link nxt-codelink">
                        <span className="nx-sap">{s.code}</span>
                        <ArrowLeft className="nu-arw" size={12} strokeWidth={2} aria-hidden="true" />
                      </OriginLink>
                    ) : <span className="nxt-path-v nx-sap">{s.code}</span>}
                    {s.he ? <span className="nxt-path-he" lang={enLang(s.he)}>{s.he}</span> : null}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        ) : null}

        {b?.relations.length ? (
          <More title="חוקר קשרים" note={`${nf.format(b.relations.reduce((n, r) => n + r.items.length, 0))} קשרים ברשומה`}>
            <dl className="nxt-rel">
              {b.relations.map((r) => {
                // The `obsolete` field is not written in one direction; where the
                // record's own S/4 note does not confirm the replacement (the
                // check behind «טרנזקציות שהוחלפו על ידה»), the row says so.
                const unchecked = r.label === "מיושנות" && r.items.some((x) => !t.s4.replaces.includes(x.code.toUpperCase()));
                return (
                  <div key={r.label} className="nxt-rel-r">
                    <dt className="nxt-l">{r.label}</dt>
                    <dd>
                      <Refs items={r.items} label={r.label} origin={origin} />
                      {unchecked ? <p className="nxt-absent">כיוון הקשר לא אומת: הערת ה-S/4HANA של הרשומה אינה מאשרת החלפה.</p> : null}
                    </dd>
                  </div>
                );
              })}
            </dl>
          </More>
        ) : null}
      </Section>

      {/* -------------------------------------------------------- 10. ISSUES */}
      <IssuesSection t={t} origin={origin} />

      {/* ------------------------------------------------ 11. CONSULTANT NOTES */}
      {has.notes ? (
        <Section id="sec-notes" icon={<NotebookPen size={15} strokeWidth={1.75} />} title="הערות יועץ">
          {b?.bestPractices.length || b?.certTips ? (
            <div className="nxt-two">
              {b.bestPractices.length ? <div><h3 className="nxt-sub">Best Practices</h3><Bullets items={b.bestPractices} /></div> : null}
              {b.certTips ? <div><h3 className="nxt-sub">טיפ הסמכה</h3><p className="nxt-v" lang={enLang(b.certTips)} dir={enDir(b.certTips)}>{b.certTips}</p></div> : null}
            </div>
          ) : null}
          {b?.oss.length ? (
            <div className="nxt-block">
              <h3 className="nxt-sub">OSS · SAP Notes — מילות חיפוש</h3>
              <ul className="nxt-codes" aria-label="מילות חיפוש ל-SAP Notes">
                {b.oss.map((k) => <li key={k} className="nu-chip" lang={enLang(k)} dir={enDir(k) ?? "auto"}>{k}</li>)}
              </ul>
            </div>
          ) : null}
          {apps && guidance ? (
            <More title="טיפים ובדיקות (QA)">
              {apps.tips.length ? <div className="nxt-block"><h3 className="nxt-sub">טיפים של יועץ SAP</h3><Lines rows={apps.tips} /></div> : null}
              {apps.qa.length ? <div className="nxt-block"><h3 className="nxt-sub">בדיקות (QA)</h3><Lines rows={apps.qa} /></div> : null}
            </More>
          ) : null}
          {b?.interview.length ? (
            <More title="ראיון · הסמכה · שאלות נפוצות" note={`${nf.format(b.interview.length)} שאלות`}>
              <Bullets items={b.interview} ordered />
            </More>
          ) : null}
        </Section>
      ) : null}

      {/* ------------------------------------------------------- 12. HONESTY */}
      <footer className="nxt-foot nm-fade nm-once">
        {t.sources.length ? (
          <p className="nxt-src">
            <ShieldCheck size={13} strokeWidth={1.75} aria-hidden="true" />
            {/* One flex item for the words: the label and the list as two items
                squeezed the label into a one-word column beside the icon. */}
            <span>מקורות הרשומה: <span lang={enLang(t.sources.join(" "))}>{t.sources.join(" · ")}</span></span>
          </p>
        ) : null}
        {/* The provenance line the tx-intel catalogue's own page carried. */}
        {b ? <p>ידע טרנזקציות SAP סטנדרטי · trust: curated — קודים ואובייקטים אמיתיים בלבד.</p> : null}
        <p>
          מקור: המאגר המאומת של הפרויקט. שדה שלא תועד מסומן בעמוד או אינו מוצג.
        </p>
      </footer>
    </article>
  );
}

/* ---------------------------------------------------------------- issues */

function IssueRows({ items, origin }: { items: TxIssue[]; origin: Origin }) {
  return (
    <ul className="nxt-iss is-grouped">
      {items.map((x, i) => (
        <li key={`${x.kind}-${i}`} className="nxt-iss-i">
          {/* The kind the ungrouped list printed in its own column, kept for a
              screen reader that lands on one row out of its group. */}
          <span className="nx-sr">{x.kind === "incident" ? "תקלה מתועדת: " : x.kind === "mistake" ? "טעות נפוצה: " : "שגיאה: "}</span>
          {x.href ? (
            <OriginLink href={x.href} origin={origin} className="nu-link nxt-iss-t">
              {x.he}
              <ArrowLeft className="nu-arw" size={12} strokeWidth={2} aria-hidden="true" />
            </OriginLink>
          ) : <span className="nxt-iss-t" lang={enLang(x.he)}>{x.he}</span>}
          {x.detail ? <span className="nxt-iss-d">{x.detail}</span> : null}
        </li>
      ))}
    </ul>
  );
}

/** Grouped by what each entry is, under the legacy pages' own labels. The
 *  incidents and the catalogue's exits are derived (their own lists name this
 *  code), and their heading says so. */
function IssuesSection({ t, origin }: { t: TxDetail; origin: Origin }) {
  const errors = t.issues.filter((x) => x.kind === "error");
  const mistakes = t.issues.filter((x) => x.kind === "mistake");
  const incidents = t.issues.filter((x) => x.kind === "incident");
  const count = t.issues.length + t.exitsDerived.length;
  return (
    <Section
      id="sec-iss"
      icon={<AlertTriangle size={15} strokeWidth={1.75} />}
      title="תקלות ידועות"
      note={count ? `${nf.format(count)} רשומות` : undefined}
    >
      {count === 0 ? <p className="nxt-absent">{NONE} על תקלות לקוד זה.</p> : null}
      {errors.length ? <div className="nxt-block"><h3 className="nxt-sub">שגיאות נפוצות</h3><IssueRows items={errors} origin={origin} /></div> : null}
      {mistakes.length ? <div className="nxt-block"><h3 className="nxt-sub">טעויות נפוצות</h3><IssueRows items={mistakes} origin={origin} /></div> : null}
      {incidents.length || t.exitsDerived.length ? (
        <div className="nxt-block">
          <h3 className="nxt-sub nxt-sub-st">
            תקלות ו-Exits
            <Status color="var(--status-in-analysis)">נגזר מהמאגר</Status>
          </h3>
          {incidents.length ? <IssueRows items={incidents} origin={origin} /> : null}
          {t.exitsDerived.length ? <Codes items={t.exitsDerived} label="Exits שקטלוג ההרחבות מקשר לקוד" /> : null}
        </div>
      ) : null}
    </Section>
  );
}

/* --------------------------------------------------------------- profile */

/** The kind-level profile the legacy page showed for a code only the
 *  blueprint lists. Each dimension keeps its legacy mark. */
function ProfileSection({ dims, origin }: { dims: TxProfileDim[]; origin: Origin }) {
  return (
    <Section id="sec-prof" icon={<Lightbulb size={15} strokeWidth={1.75} />} title="תבונת אובייקט">
      <p className="nxt-absent">
        «אומת» מסמן ממד שנגזר משורות המאגר; «ידע כללי» מסמן ידע נכון על טרנזקציות באופן כללי, לא עובדה על קוד זה.
      </p>
      <dl className="nxt-grid">
        {dims.map((d) => (
          <div key={d.label} className="nxt-fact">
            <dt className="nxt-l nxt-l-st">
              {d.label}
              {d.mark ? <Status color={d.mark === "אומת" ? "var(--status-done)" : "var(--status-not-started)"}>{d.mark}</Status> : null}
            </dt>
            <dd className="nxt-v">
              {d.text ? <span>{d.text}</span> : null}
              {d.items.length ? (
                d.label === "תלויות" ? (
                  <ul className="nxt-ul">
                    {d.items.map((x) => {
                      const [name, ...rest] = x.split(" — ");
                      return <li key={x}><span className="nx-sap">{name}</span>{rest.length ? ` — ${rest.join(" — ")}` : ""}</li>;
                    })}
                  </ul>
                ) : <Bullets items={d.items} ordered={d.ordered} />
              ) : null}
              {d.refs.length ? (
                <Codes
                  items={d.refs.map((r) => r.name)}
                  label={d.label}
                  href={(n) => d.refs.find((r) => r.name === n)?.href ?? null}
                  origin={origin}
                />
              ) : null}
            </dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}

/* ------------------------------------------------------------ table list */

function TableList({ rows, origin, showModule }: {
  rows: TxDetail["tables"];
  origin: Origin;
  showModule?: boolean;
}) {
  return (
    <ul className="nxt-tbl">
      {rows.map((r) => {
        // A transaction may legitimately name a table the /neo dictionary does
        // not cover (FI, SD…), and those have no object page. Rendering them as
        // links produced 1,237 dead links. With no page, the row is a value:
        // same information, no cursor, no hover, nothing to click into a 404.
        const inner = (
          <>
            <span className="nxt-tbl-n nx-sap">{r.name}</span>
            <span className="nxt-tbl-he">{r.he || "לא קיים תיאור בתיעוד"}</span>
            <span className="nxt-tbl-s">
              {showModule && r.module ? <span className="nu-chip nxt-tbl-m">{r.module}</span> : null}
              <span className="nu-status" style={{ "--s": RISK_COLOR[r.risk] } as React.CSSProperties}>
                {r.trust === "needs" ? TRUST_HE.needs : RISK_HE[r.risk]}
              </span>
            </span>
            {r.note ? <span className="nxt-tbl-note">{r.note}</span> : null}
          </>
        );
        return (
          <li key={`${r.from}-${r.name}`}>
            {r.href ? (
              <OriginLink href={r.href} origin={origin} className="nu-card nxt-tbl-r">{inner}</OriginLink>
            ) : (
              <div className="nxt-tbl-r is-flat" aria-label={`${r.name}: אין עמוד אובייקט בתיעוד`}>{inner}</div>
            )}
          </li>
        );
      })}
    </ul>
  );
}
