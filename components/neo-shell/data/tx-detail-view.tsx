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

   FORM RULE (app/globals.css, above --mod-pm), obeyed exactly
     STATUS  — S/4 risk, verification trust and registry depth. Each is a small
               dot plus its word (.nu-status), never a surface and never a ring.
     MODULE  — the header's bar, the top rule of a plate, the ring on the module
               chip, the row edges. Line / edge / ring / tint only.
     ACCENT  — brand red marks ONE thing: that this transaction materially
               changes in S/4HANA. It is not a module colour and not a status.
   ========================================================================== */

import {
  AlertTriangle, AppWindow, Boxes, GitBranch, KeyRound,
  Plug, ShieldCheck, Terminal, Workflow,
} from "lucide-react";
import { OriginLink, SmartReturn } from "@/components/neo-shell/nav-context";
import { SectionNav } from "@/components/neo-shell/workspace/section-nav";
import { RISK_COLOR, RISK_HE, TRUST_HE } from "@/lib/s4";
import { MOD_HE, modVar } from "../mod-var";
import type { TxDetail } from "./tx-detail";
import { TxActions } from "./tx-actions";

const nf = new Intl.NumberFormat("he-IL");

const NONE = "לא קיים מידע מאומת";

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

function Bullets({ items }: { items: string[] }) {
  return <ul className="nxt-ul">{items.map((x, i) => <li key={`${i}-${x.slice(0, 24)}`}>{x}</li>)}</ul>;
}

function Codes({ items, label }: { items: string[]; label: string }) {
  return (
    <ul className="nxt-codes" aria-label={label}>
      {items.map((x) => <li key={x} className="nu-chip is-sap">{x}</li>)}
    </ul>
  );
}

/* ------------------------------------------------------------- the screen */

export function TxDetailView({ t }: { t: TxDetail }) {
  const m = modVar(t.module);
  const modHe = MOD_HE[t.module] || t.moduleHe;
  const impacted = t.s4.disposition === "superseded" || t.s4.disposition === "changed";

  // The origin every outgoing link on this page records. One object, so the
  // label can never drift between the table links and the neighbour links.
  const origin = { href: `/neo/transactions/${encodeURIComponent(t.code)}/`, label: "טרנזקציה", detail: t.code };

  const authored = t.tables.filter((x) => x.from === "authored");
  const blueprint = t.tables.filter((x) => x.from === "blueprint");

  // A block whose question the dataset does not answer is not rendered, so the
  // running section bar is built from the SAME conditions the page renders on.
  // A chip can therefore never point at a section that is not on the screen.
  const has = {
    what: !!(t.purpose || t.process || t.whenUse || t.whenNot || t.tech),
    flow: !!(t.flow.length || t.selection.length),
    int: !!(t.bapis.length || t.exits.length || t.badis.length || t.enhancements.length || t.auth.length),
  };
  const nav: { id: string; label: string }[] = [
    { id: "nxt-s4", label: "המעבר ל-S/4HANA" },
    ...(has.what ? [{ id: "sec-what", label: "מה הטרנזקציה עושה" }] : []),
    ...(has.flow ? [{ id: "sec-flow", label: "מסך והרצה" }] : []),
    { id: "sec-obj", label: "אובייקטים וטבלאות" },
    ...(has.int ? [{ id: "sec-int", label: "ממשקים והרחבות" }] : []),
    { id: "sec-near", label: "טרנזקציות שכנות" },
    { id: "sec-iss", label: "תקלות ידועות" },
  ];

  return (
    <article className="nxt" data-surface="transaction" style={{ "--m": m } as React.CSSProperties}>
      <SmartReturn
        fallback={{ href: "/neo/transactions/", label: "טרנזקציות" }}
        hint="לא נשמר מסלול הגעה בביקור הזה"
      />

      {/* ------------------------------------------------------ 1. IDENTITY */}
      <header className="nxt-head nm-rise nm-once">
        <span className="nx-modbar" aria-hidden="true" />
        <p className="nx-eyebrow nxt-eyebrow">
          טרנזקציה · {t.module}{modHe ? ` · ${modHe}` : ""}
        </p>

        <div className="nxt-title">
          <h1 className="nxt-code nx-sap">{t.code}</h1>
          <div className="nxt-names">
            <p className="nxt-he">{t.he || NONE}</p>
            {t.en ? <p className="nxt-en" dir="ltr">{t.en}</p> : <p className="nxt-en nxt-absent">אין שם אנגלי במקור</p>}
          </div>
          <TxActions code={t.code} />
        </div>

        <div className="nxt-meta">
          <Status color={t.depth === "deep" ? "var(--status-done)" : "var(--status-not-started)"}>
            {t.depth === "deep" ? "מתועדת לעומק" : "רשומת אימות"}
          </Status>
          {t.verified ? <Status color="var(--status-done)">רשומה מסומנת כמאומתת</Status> : null}
          <span className="nu-chip nxt-mod" style={{ "--m": m } as React.CSSProperties}>
            <i aria-hidden="true" />{t.module}
          </span>
          {t.area ? <span className="nu-chip">{t.area}</span> : null}
          {t.popularity > 0 ? (
            <span className="nu-chip">
              <span className="nx-sr">הפניות מתוך גרף הקשרים </span>{nf.format(t.popularity)} הפניות במאגר
            </span>
          ) : null}
          <span className="nxt-known">
            <span className="nx-sr">שלמות הרשומה </span>
            {nf.format(t.known)}/{nf.format(t.total)} עובדות מאומתות
          </span>
        </div>
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
          <p className="nx-eyebrow">מעבר ל-S/4HANA</p>
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
            <p className="nxt-l">היורש לפי המאגר</p>
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
              רשומת היורש מצהירה על <span className="nx-sap">{t.code}</span> כטרנזקציה שהוחלפה. זהו קשר מוצהר במאגר, לא פרשנות.
            </p>
          </div>
        ) : null}

        <dl className="nxt-s4-facts">
          <Fact label="מה כתוב במאגר">{t.s4.note || NONE}</Fact>
          {t.s4.delta ? <Fact label="ECC6 → S/4HANA · מה השתנה">{t.s4.delta}</Fact> : null}
          {t.s4.unchanged ? <Fact label="מה לא השתנה">{t.s4.unchanged}</Fact> : null}
          <Fact label="חלופת Fiori">
            {t.s4.fiori ? <span className="nxt-fiori"><AppWindow size={13} strokeWidth={1.75} aria-hidden="true" />{t.s4.fiori}</span> : NONE}
          </Fact>
          {t.s4.replaces.length ? (
            <Fact label="טרנזקציות שהיא החליפה">
              <ul className="nxt-codes">
                {t.s4.replaces.map((c) => <li key={c} className="nu-chip is-sap">{c}</li>)}
              </ul>
            </Fact>
          ) : null}
          {t.cds.length ? (
            <Fact label="תצוגות CDS">
              <ul className="nxt-codes">{t.cds.map((c) => <li key={c} className="nu-chip is-sap">{c}</li>)}</ul>
            </Fact>
          ) : null}
        </dl>

        {t.s4.disposition === "unknown" ? (
          <p className="nxt-s4-warn">
            למאגר אין אמירה על מצב הטרנזקציה ב-S/4HANA. הפריט דורש אימות במערכת SAP לפני החלטת מיגרציה, ולא הושלם כאן בהשערה.
          </p>
        ) : null}
      </section>

      {/* --------------------------------------------------- 3. WHAT IT DOES */}
      {has.what ? (
        <Section id="sec-what" icon={<Terminal size={15} strokeWidth={1.75} />} title="מה הטרנזקציה עושה">
          <dl className="nxt-grid">
            {t.purpose ? <Fact label="מטרה עסקית">{t.purpose}</Fact> : null}
            {t.process ? <Fact label="מיקום בתהליך">{t.process}</Fact> : null}
            {t.whenUse ? <Fact label="מתי להשתמש">{t.whenUse}</Fact> : null}
            {t.whenNot ? <Fact label="מתי לא">{t.whenNot}</Fact> : null}
            {t.tech ? <Fact label="מה קורה טכנית">{t.tech}</Fact> : null}
            {t.users.length ? <Fact label="מי משתמש">{t.users.join(" · ")}</Fact> : null}
            {t.prereq.length ? <Fact label="תנאים מקדימים"><Bullets items={t.prereq} /></Fact> : null}
          </dl>
        </Section>
      ) : null}

      {/* ------------------------------------------------------- 4. THE FLOW */}
      {has.flow ? (
        <Section id="sec-flow" icon={<Workflow size={15} strokeWidth={1.75} />} title="מסך והרצה">
          <div className="nxt-two">
            {t.flow.length ? (
              <div>
                <h3 className="nxt-sub">זרימה טיפוסית</h3>
                <ol className="nxt-ol">{t.flow.map((s, i) => <li key={`${i}-${s.slice(0, 20)}`}>{s}</li>)}</ol>
              </div>
            ) : null}
            {t.selection.length ? (
              <div>
                <h3 className="nxt-sub">שדות מסך הבחירה</h3>
                <Bullets items={t.selection} />
              </div>
            ) : null}
          </div>
        </Section>
      ) : null}

      {/* -------------------------------------------- 5. OBJECTS AND TABLES */}
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

        {t.tables.length === 0 ? (
          <p className="nxt-absent">{NONE} על טבלאות שהטרנזקציה נוגעת בהן.</p>
        ) : (
          <>
            {authored.length ? <h3 className="nxt-sub">טבלאות שהרשומה מצהירה עליהן</h3> : null}
            {authored.length ? <TableList rows={authored} origin={origin} /> : null}
            {blueprint.length ? <h3 className="nxt-sub">טבלאות שהבלוּפרינט מקשר לקוד הזה</h3> : null}
            {blueprint.length ? <TableList rows={blueprint} origin={origin} /> : null}
          </>
        )}
      </Section>

      {/* --------------------------------------------------- 6. INTEGRATION */}
      {has.int ? (
        <Section id="sec-int" icon={<Plug size={15} strokeWidth={1.75} />} title="ממשקים והרחבות">
          <dl className="nxt-grid">
            {t.bapis.length ? <Fact label="BAPI / FM"><Codes items={t.bapis} label="BAPI ו-FM" /></Fact> : null}
            {t.exits.length ? <Fact label="User Exits"><Codes items={t.exits} label="User Exits" /></Fact> : null}
            {t.badis.length ? <Fact label="BAdIs"><Codes items={t.badis} label="BAdIs" /></Fact> : null}
            {t.enhancements.length ? <Fact label="Enhancements"><Codes items={t.enhancements} label="Enhancements" /></Fact> : null}
            {t.auth.length ? (
              <Fact label="אובייקטי הרשאה">
                <span className="nxt-inline-i" aria-hidden="true"><KeyRound size={12} strokeWidth={1.75} /></span>
                <Codes items={t.auth} label="אובייקטי הרשאה" />
              </Fact>
            ) : null}
          </dl>
        </Section>
      ) : null}

      {/* ---------------------------------------------------- 7. NEIGHBOURS */}
      <Section
        id="sec-near"
        icon={<GitBranch size={15} strokeWidth={1.75} />}
        title="טרנזקציות שכנות"
        note={t.neighbours.length ? `${nf.format(t.neighbours.length)} קודים` : undefined}
      >
        {t.neighbours.length === 0 ? (
          <p className="nxt-absent">{NONE} על טרנזקציות סמוכות לקוד הזה.</p>
        ) : (
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
        )}
      </Section>

      {/* -------------------------------------------------------- 8. ISSUES */}
      <Section
        id="sec-iss"
        icon={<AlertTriangle size={15} strokeWidth={1.75} />}
        title="תקלות ידועות"
        note={t.issues.length ? `${nf.format(t.issues.length)} רשומות` : undefined}
      >
        {t.issues.length === 0 ? (
          <p className="nxt-absent">{NONE} על תקלות לקוד הזה.</p>
        ) : (
          <ul className="nxt-iss">
            {t.issues.map((x, i) => (
              <li key={`${x.kind}-${i}`} className="nxt-iss-i">
                <span className="nxt-iss-k">
                  {x.kind === "incident" ? "תקלה מתועדת" : x.kind === "mistake" ? "טעות נפוצה" : "שגיאה"}
                </span>
                <span className="nxt-iss-t">{x.he}</span>
                {x.detail ? <span className="nxt-iss-d">{x.detail}</span> : null}
              </li>
            ))}
          </ul>
        )}
      </Section>

      {/* ------------------------------------------------------- 9. HONESTY */}
      <footer className="nxt-foot nm-fade nm-once">
        {t.sources.length ? (
          <p className="nxt-src">
            <ShieldCheck size={13} strokeWidth={1.75} aria-hidden="true" />
            מקורות הרשומה: {t.sources.join(" · ")}
          </p>
        ) : null}
        <p>
          כל שדה בעמוד הזה נלקח מהמאגר המאומת של הפרויקט. שדה שהמאגר שותק לגביו אינו מוצג, או מסומן במפורש
          {" "}«{NONE}», ולא הושלם מזיכרון. מספר ה-SAP Note לא נכתב כאן אלא אם הוא קיים ברשומה עצמה.
        </p>
      </footer>
    </article>
  );
}

/* ------------------------------------------------------------ table list */

function TableList({ rows, origin }: {
  rows: TxDetail["tables"];
  origin: { href: string; label: string; detail: string };
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
            <span className="nxt-tbl-he">{r.he || "אין תיאור במילון"}</span>
            <span className="nxt-tbl-s">
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
              <div className="nxt-tbl-r is-flat" aria-label={`${r.name}: אין עמוד אובייקט במילון`}>{inner}</div>
            )}
          </li>
        );
      })}
    </ul>
  );
}
