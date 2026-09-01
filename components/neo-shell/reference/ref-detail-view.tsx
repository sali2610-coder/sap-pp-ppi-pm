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

   FORM RULE (app/globals.css, above --mod-pm), obeyed exactly
     STATUS  every .nu-status — S/4 standing, trust, verification. Dot + word.
     MODULE  the header bar, a plate's top rule, the module chip's ring, a
             neighbour card's leading edge. Line / edge / ring / tint only.
     ACCENT  brand red marks ONE condition: tone === "changed".
   ========================================================================== */

import Link from "next/link";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import { SmartReturn } from "@/components/neo-shell/nav-context";
import { MOD_HE, modVar } from "../mod-var";
import { Glyph } from "./icons";
import type { RefDetail, RefFact, RefSection, RefStatus } from "./types";

const NONE = "לא קיים תיעוד מאומת במאגר";

const DIR_HE: Record<string, string> = {
  bapi: "קטלוג BAPI ו-FM",
  cds: "קטלוג CDS Views",
  idoc: "קטלוג IDoc",
  "fiori-apps": "קטלוג יישומי Fiori",
  enhancements: "קטלוג הרחבות",
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
        {f.pre ? <pre className="nxr-pre" dir="ltr">{f.pre}</pre> : null}
      </dd>
    </div>
  );
}

function Section({ s }: { s: RefSection }) {
  const nothing =
    !s.facts?.length && !s.subs?.length && !s.cards?.length;
  return (
    <section className="nxt-sec" aria-labelledby={`sec-${s.id}`}>
      <h2 className="nx-h2 nxt-sec-h" id={`sec-${s.id}`}>
        <span className="nxt-sec-i" aria-hidden="true"><Glyph i={s.icon} size={15} /></span>
        {s.title}
        {s.note ? <em className="nxt-sec-n">{s.note}</em> : null}
      </h2>

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
                <span className="nxt-near-e" aria-hidden="true" />
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
    </section>
  );
}

/* ------------------------------------------------------------- the screen */

export function RefDetailView({ d }: { d: RefDetail }) {
  const m = modVar(d.mod);
  const modHe = d.modHe || MOD_HE[d.mod] || "";
  const impacted = d.s4.tone === "changed";

  return (
    <article className="nxt nxr-rec" data-surface={d.kind} style={{ "--m": m } as React.CSSProperties}>
      <SmartReturn
        fallback={{ href: `/neo/${d.kind}/`, label: DIR_HE[d.kind] || "קטלוג" }}
        hint="לא נשמר מסלול הגעה בביקור הזה"
      />

      {/* ------------------------------------------------------ 1. IDENTITY */}
      <header className="nxt-head">
        <span className="nx-modbar" aria-hidden="true" />
        <p className="nx-eyebrow nxt-eyebrow">{d.eyebrow}</p>

        <div className="nxt-title nxr-title">
          <h1 className="nxt-code nx-sap">{d.code}</h1>
          <div className="nxt-names">
            <p className="nxt-he">{d.he || NONE}</p>
            {d.en
              ? <p className="nxt-en" dir="ltr">{d.en}</p>
              : d.enAbsent ? <p className="nxt-en nxt-absent">{d.enAbsent}</p> : null}
          </div>
        </div>

        <div className="nxt-meta">
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
        </div>
      </header>

      {/* --------------------------------------------- 2. S/4HANA — §2
          The loudest block on the screen, and the only one rendered even when
          the dataset is silent: "we do not know" is decision-relevant for a
          migration, and hiding it would be the lie. */}
      <section
        className="nxt-s4"
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
      </section>

      {/* -------------------------------------------------- 3..n THE ANSWERS */}
      {d.sections.map((s) => <Section key={s.id} s={s} />)}

      {/* ------------------------------------------------------- n+1 HONESTY */}
      <footer className="nxt-foot">
        {d.sources.length ? (
          <p className="nxt-src">
            <ShieldCheck size={13} strokeWidth={1.75} aria-hidden="true" />
            מקורות הרשומה: {d.sources.join(" · ")}
          </p>
        ) : null}
        <p>{d.foot}</p>
      </footer>
    </article>
  );
}
