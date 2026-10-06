/* ============================================================================
   PROJECT NEO · THE REFERENCE RECORD — one screen, five directories.
   ----------------------------------------------------------------------------
   A SERVER component. The SAP facts are rendered to HTML at build time and the
   browser receives exactly one island: the contextual return. Nothing else here
   is interactive, so nothing else here ships JavaScript.

   IT IS A PRODUCT SCREEN, NOT A DOCUMENT — the same screen /neo/transactions/
   <CODE>/ already is, so a reader who has learned one has learned all six:

     · identity first, in the technical name's own script and direction;
     · then S/4HANA, full width, with the largest non-heading type on the page,
       because that is the first decision a consultant has to make in 2026;
     · then answers to named questions, in blocks that can be scanned. A block
       whose question the dataset does not answer is not rendered at all; where
       silence is itself the answer, it is written out as
       `לא קיים מידע מאומת במאגר` rather than filled with something plausible.

   TYPOGRAPHY — five steps, each different in at least two of size / weight /
   colour, so the level is readable without reading the words:
     page        .nxt-code   display, monospace, the technical name
     headline    .nxt-s4-h   the S/4 verdict, second largest thing on screen
     section     .nxt-sec-h  .nx-h2 plus a module-coloured leading tile
     subsection  .nxt-sub    small, ink-2, no rule
     data label  .nxt-l      micro, tracked, ink-3 — metadata, never content
     value       .nxt-v      body, ink-1 — content, never metadata

   THE RECORD LANGUAGE (2026-10, components/neo-shell/record-kit.tsx and
   app/neo/record.css): the catalog's hero, the running section bar, the S/4HANA
   band as a raised card without a stripe, every question as the catalog's Sig,
   the reference rows in the domain page's form, and the credit at the foot.

   FORM RULE (app/globals.css, above --mod-pm), obeyed exactly
     STATUS  every .nu-status — S/4 standing, trust, verification. Dot + word.
     MODULE  the ring and tint on the module chip, a section badge, a row's
             border. Never a stripe.
     ACCENT  brand red marks ONE condition: tone === "changed".
   ========================================================================== */

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { SmartReturn } from "@/components/neo-shell/nav-context";
import { SectionNav } from "@/components/neo-shell/workspace/section-nav";
import { EvidenceBlock } from "../evidence/evidence-block";
import { CopyId } from "../copy-id";
import { MOD_HE, modVar } from "../mod-var";
import { RecordHead } from "../record-kit";
import { CatalogFoot, Ledger, Sig } from "../data/catalog-kit";
import { Glyph } from "./icons";
import type { RefCode, RefDetail, RefFact, RefIcon, RefSection, RefStatus } from "./types";

const NONE = "לא קיים תיעוד מאומת במאגר";

const DIR_HE: Record<string, string> = {
  bapi: "קטלוג BAPI ו-FM",
  cds: "קטלוג CDS Views",
  idoc: "קטלוג IDoc",
  "fiori-apps": "קטלוג יישומי Fiori",
  enhancements: "קטלוג הרחבות",
};

/** The glyph of each directory, as its rail entry draws it. */
const ICON: Record<string, RefIcon> = {
  bapi: "plug",
  cds: "sigma",
  idoc: "cable",
  "fiori-apps": "layoutGrid",
  enhancements: "puzzle",
};

/* ------------------------------------------------------------ primitives */

function Status({ s }: { s: RefStatus }) {
  return <span className="nu-status" style={{ "--s": s.color } as React.CSSProperties}>{s.he}</span>;
}

/** A named fact. The label is metadata, the value is content — set at different
 *  sizes and weights on purpose. */
function Fact({ f }: { f: RefFact }) {
  const empty = !f.text && !f.bullets?.length && !f.steps?.length && !f.codes?.length && !f.pre;
  return (
    <div className="nxt-fact">
      <dt className="nxt-l">{f.label}</dt>
      <dd className="nxt-v">
        {empty ? <span className="nxt-absent">{f.absent || NONE}</span> : null}
        {f.text ? <span className="nxr-text">{f.text}</span> : null}
        {f.bullets?.length ? (
          <ul className="nxt-ul">{f.bullets.map((x, i) => <li key={`${i}-${x.slice(0, 24)}`}>{x}</li>)}</ul>
        ) : null}
        {f.steps?.length ? (
          <ol className="nxt-ol">{f.steps.map((x, i) => <li key={`${i}-${x.slice(0, 24)}`}>{x}</li>)}</ol>
        ) : null}
        {f.codes?.length ? (
          // TWO FORMS, ON PURPOSE. A code that opens a generated page is a
          // .nu-link — text plus the arrow that ui.css reserves for "this leaves
          // for another route". A code the project has no page for stays a
          // .nu-chip: a value, with no pointer and no hover, so the form itself
          // says "this is information, not a destination" — and the dead-link
          // crawler never sees an href that opens nothing.
          <ul className="nxt-codes nxr-codes" aria-label={f.label}>
            {f.codes.map((c) => (
              <li key={c.t}>
                {c.href ? (
                  <Link href={c.href} prefetch={false} className="nu-link nxr-codelink">
                    <span className="nx-sap">{c.t}</span>
                    <ArrowLeft size={12} strokeWidth={2} className="nu-arw" aria-hidden="true" />
                  </Link>
                ) : (
                  <span className="nu-chip is-sap">{c.t}</span>
                )}
              </li>
            ))}
          </ul>
        ) : null}
        {/* Code is meant to be taken away (design audit S7-CAT-5): every
            preformatted block carries its own copy control. */}
        {f.pre ? (
          <div className="nxr-pre-w">
            {/* It scrolls inside its own box, so it takes keyboard focus and is
                named by its fact (axe scrollable-region-focusable). */}
            <pre className="nxr-pre" dir="ltr" tabIndex={0} role="region" aria-label={f.label}>{f.pre}</pre>
            <CopyId value={f.pre} label="העתקת הקוד" />
          </div>
        ) : null}
      </dd>
    </div>
  );
}

function Section({ s }: { s: RefSection }) {
  const nothing =
    !s.facts?.length && !s.subs?.length && !s.cards?.length;
  // The catalog's own question card (catalog-kit Sig). The section carries the
  // id the old heading had, so a link to #sec-<id> still lands on it.
  return (
    <Sig id={`sec-${s.id}`} icon={<Glyph i={s.icon} size={15} />} title={s.title} count={s.note}>
      {nothing ? <p className="nxt-absent">{s.empty || NONE}</p> : null}

      {s.facts?.length ? (
        <dl className="nxt-grid">{s.facts.map((f) => <Fact key={f.label} f={f} />)}</dl>
      ) : null}

      {s.subs?.map((sub) => (
        <div key={sub.title} className="nxt-block">
          <h3 className="nxt-sub">{sub.title}</h3>
          <dl className="nxt-grid">{sub.facts.map((f) => <Fact key={f.label} f={f} />)}</dl>
        </div>
      ))}

      {s.cards?.length ? (
        <ul className="nxt-near">
          {s.cards.map((c) => {
            const inner = (
              <>
                <span className="nxt-near-c1">
                  <b className="nx-sap">{c.code}</b>
                  {c.mod ? (
                    <span className="nu-chip nxt-mod" style={{ "--m": modVar(c.mod) } as React.CSSProperties}>
                      <i aria-hidden="true" />{c.mod}
                    </span>
                  ) : null}
                </span>
                <span className="nxt-near-he">{c.he || NONE}</span>
                {c.reason ? <span className="nxt-near-r">{c.reason}</span> : null}
              </>
            );
            const style = { "--m": modVar(c.mod) } as React.CSSProperties;
            return (
              <li key={`${c.code}-${c.reason ?? ""}`}>
                {c.href ? (
                  <Link href={c.href} prefetch={false} className="nu-card nxt-near-c" style={style}>{inner}</Link>
                ) : (
                  <div className="nxt-near-c nxr-flat" style={style} aria-label={`${c.code}: ללא עמוד ייעודי בתיעוד`}>{inner}</div>
                )}
              </li>
            );
          })}
        </ul>
      ) : null}
    </Sig>
  );
}

/* ------------------------------------------------------------- the screen */

/** One record in the chain: a link when the project has its page, a value
 *  when it does not. */
function ChainCode({ c }: { c: RefCode }) {
  const body = (
    <>
      <b className="nx-sap">{c.t}</b>
      {c.he ? <span>{c.he}</span> : null}
    </>
  );
  return c.href
    ? <Link href={c.href} prefetch={false} className="nxr-chain-c">{body}</Link>
    : <span className="nxr-chain-c nxr-chain-c--none">{body}</span>;
}

export function RefDetailView({ d }: { d: RefDetail }) {
  const m = modVar(d.mod);
  const modHe = d.modHe || MOD_HE[d.mod] || "";
  const impacted = d.s4.tone === "changed";
  const nameLed = d.lead === "name";
  // The running bar is built from the same list the page renders, so a chip
  // can never point at a section that is not on the screen.
  const nav = [
    { id: "nxt-s4", label: "המעבר ל-S/4HANA" },
    ...d.sections.map((s) => ({ id: `sec-${s.id}`, label: s.title })),
  ];
  // The record's own counts, each a door to the part of the page that lists
  // them: the classic tables the S/4 band stands, and every section's related
  // records. Drawn only when there are at least two, as on the other records.
  const ledger = [
    ...(d.s4.tables?.length ? [{ v: d.s4.tables.length, l: "טבלאות קלאסיות", href: "#nxt-s4" }] : []),
    ...d.sections.filter((s) => s.cards?.length).map((s) => ({ v: s.cards!.length, l: s.title, href: `#sec-${s.id}` })),
  ];

  return (
    <article className="nxt nxr-rec nrc nm-scene" data-scene="cream" data-surface={d.kind} style={{ "--m": m } as React.CSSProperties}>
      <SmartReturn
        fallback={{ href: `/neo/${d.kind}/`, label: DIR_HE[d.kind] || "קטלוג" }}
        hint="לא נשמר מסלול הגעה בביקור הזה"
      />

      {/* ------------------------------------------------------ 1. IDENTITY
          THE BUSINESS ACTION IS THE TITLE where the record leads with its name
          (design audit S7-CAT-6, Fiori): the Hebrew name is the heading, the
          technical id follows it with its copy control. Everywhere else the
          technical name is the heading, in its own script and direction. */}
      <RecordHead
        icon={<Glyph i={ICON[d.kind] || "fileCode"} size={14} />}
        eyebrow={d.eyebrow}
        title={nameLed ? (d.he || d.code) : d.code}
        mono={!nameLed}
        sub={nameLed ? d.code : undefined}
        copy={d.code}
        copyLabel={nameLed ? "העתקת המזהה הטכני" : "העתקת השם הטכני"}
        he={nameLed ? undefined : (d.he || NONE)}
        en={d.en || undefined}
        enAbsent={d.enAbsent || undefined}
        meta={
          <>
            {d.statuses.map((s) => <Status key={s.he} s={s} />)}
            {d.mod ? (
              <span className="nu-chip nxt-mod" style={{ "--m": m } as React.CSSProperties}>
                <i aria-hidden="true" />{d.mod}{modHe ? ` · ${modHe}` : ""}
              </span>
            ) : null}
            {d.chips.map((c) => <span key={c} className="nu-chip">{c}</span>)}
            {d.completeness ? (
              <span className="nxt-known">
                <span className="nx-sr">שלמות הרשומה </span>{d.completeness}
              </span>
            ) : null}
          </>
        }
      >
        {ledger.length > 1 ? <Ledger label="הרשומה במספרים. כל מספר מוביל לחלק שלו בעמוד" items={ledger} /> : null}
      </RecordHead>

      {/* THE CHAIN (design audit S7-CAT-5): what feeds the record and what
          consumes it, one line, real routes only. */}
      {d.chain ? (
        <section className="nxr-chain" aria-label="שרשרת הנתונים">
          <div className="nxr-chain-col">
            <span className="nxr-chain-l">{d.chain.fromLabel}</span>
            {d.chain.from.length
              ? d.chain.from.map((c) => <ChainCode key={c.t} c={c} />)
              : <span className="nxr-chain-none">אין רשומה בתיעוד</span>}
          </div>
          <span className="nxr-chain-arrow" aria-hidden="true">←</span>
          <div className="nxr-chain-col nxr-chain-via">
            <span className="nxr-chain-l">התצוגה</span>
            <b className="nx-sap">{d.chain.via.code}</b>
            <span>{d.chain.via.he}</span>
          </div>
          <span className="nxr-chain-arrow" aria-hidden="true">←</span>
          <div className="nxr-chain-col">
            <span className="nxr-chain-l">{d.chain.toLabel}</span>
            {d.chain.to.length
              ? d.chain.to.map((c) => <ChainCode key={`${c.t}-${c.he ?? ""}`} c={c} />)
              : <span className="nxr-chain-none">אין רשומה בתיעוד</span>}
          </div>
          {d.chain.note ? <p className="nxr-chain-note">{d.chain.note}</p> : null}
        </section>
      ) : null}

      {/* The page's own index, kept on screen. */}
      <SectionNav sections={nav} />

      {/* --------------------------------------------- 2. S/4HANA — §2
          The loudest block on the screen, and the only one rendered even when
          the dataset is silent: "we do not know" is decision-relevant for a
          migration, and hiding it would be the lie. */}
      <section
        className="nxt-s4 nm-rise nm-once"
        id="nxt-s4"
        data-tone={d.s4.tone}
        data-impacted={impacted ? "1" : undefined}
        aria-labelledby="s4-h"
      >
        <div className="nxt-s4-top">
          <p className="nx-eyebrow">S/4HANA</p>
          <h2 className="nxt-s4-h" id="s4-h">{d.s4.headline}</h2>
          <div className="nxt-s4-st">
            {d.s4.statuses.map((s) => <Status key={s.he} s={s} />)}
          </div>
        </div>

        {d.s4.facts.length ? (
          <dl className="nxt-s4-facts">{d.s4.facts.map((f) => <Fact key={f.label} f={f} />)}</dl>
        ) : null}

        {d.s4.tables?.length ? (
          <div className="nxr-stand">
            <p className="nxt-l">מעמד הטבלאות הקלאסיות שהרשומה נשענת עליהן במעבר ל-S/4HANA</p>
            <ul className="nxt-tbl">
              {d.s4.tables.map((t) => {
                const inner = (
                  <>
                    <span className="nxt-tbl-n nx-sap">{t.name}</span>
                    <span className="nxt-tbl-he">{t.he || "לא קיים תיאור בתיעוד"}</span>
                    <span className="nxt-tbl-s"><Status s={t.status} /></span>
                    {t.note ? <span className="nxt-tbl-note">{t.note}</span> : null}
                  </>
                );
                return (
                  <li key={t.name}>
                    {t.href ? (
                      <Link href={t.href} prefetch={false} className="nu-card nxt-tbl-r">{inner}</Link>
                    ) : (
                      <div className="nxt-tbl-r is-flat" aria-label={`${t.name}: ללא עמוד ייעודי בתיעוד`}>{inner}</div>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        ) : null}

        {d.s4.warn ? <p className="nxt-s4-warn">{d.s4.warn}</p> : null}

        {d.evidence ? <EvidenceBlock e={d.evidence} /> : null}
      </section>

      {/* -------------------------------------------------- 3..n THE ANSWERS */}
      {d.sections.map((s) => <Section key={s.id} s={s} />)}

      {/* ------------------------------------------------------- n+1 HONESTY */}
      <CatalogFoot notes={d.sources.length ? [<>מקורות הרשומה: {d.sources.join(" · ")}</>] : undefined}>
        {d.foot}
      </CatalogFoot>
    </article>
  );
}
