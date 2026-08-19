/* ============================================================================
   PROJECT NEO · /neo/knowledge/<slug>/ — one concept, in full.
   ----------------------------------------------------------------------------
   The directory answers "which concept". This answers "what is it, and what
   does S/4HANA do with it".

   A server component. The only client code on the page is <SmartReturn/>, which
   has to read the session's navigation memory; everything else is text the
   builder already resolved at build time.

   HIERARCHY (see the header of app/neo/learn.css)
     page     .nxv-h1     the Hebrew name, display size
     headline .nxv-s4-h   the S/4HANA verdict — second largest thing on screen
     section  .nxv-sec-h  .nx-h2 plus a module-coloured leading plate
     label    .nxv-l      micro, tracked — metadata, never content
     value    .nxv-v      body, ink-1 — content, never metadata

   ABSENCE IS RENDERED, NOT HIDDEN. A concept whose source leaves a field blank
   gets "לא קיים מידע מאומת במאגר" in that field's own place, so the reader can tell
   the difference between "the project checked and there is nothing" and "the
   page forgot to show it".
   ========================================================================== */

import Link from "next/link";
import { ArrowLeft, BookOpen, Info, Lightbulb, Link2, Sparkles, Terminal, Table as TableIcon, Wrench } from "lucide-react";
import { SmartReturn } from "@/components/neo-shell/nav-context";
import type { ConceptRef, ConceptRow } from "./knowledge-data";

const ABSENT = "לא קיים מידע מאומת במאגר";

function Absent({ what }: { what: string }) {
  return (
    <span className="nxv-absent">
      <Info size={13} strokeWidth={1.75} aria-hidden="true" />
      {ABSENT} · {what}
    </span>
  );
}

/** A cross-reference. It is a link only when the builder resolved it to a page
 *  that is actually generated; otherwise it renders as an inert value, and the
 *  form itself says so — no pointer, no hover, no focus ring. */
function Ref({ r }: { r: ConceptRef }) {
  const icon =
    r.kind === "concept" ? <BookOpen size={13} strokeWidth={1.75} />
      : r.kind === "table" ? <TableIcon size={13} strokeWidth={1.75} />
        : r.kind === "tcode" ? <Terminal size={13} strokeWidth={1.75} />
          : null;

  if (!r.href) {
    return (
      <span className="nu-chip">
        {r.code}
        {r.note ? <em style={{ fontStyle: "normal", color: "var(--ink-3)" }}>· {r.note}</em> : null}
      </span>
    );
  }
  return (
    <Link href={r.href} className="nu-card nxv-ref" prefetch={false}>
      {icon}
      <b>{r.code}</b>
      {r.note ? <span>{r.note}</span> : null}
      <ArrowLeft size={13} strokeWidth={2} aria-hidden="true" style={{ marginInlineStart: "auto", opacity: 0.5 }} />
    </Link>
  );
}

export function ConceptView({ c }: { c: ConceptRow }) {
  const linked = [...c.examples, ...c.related].filter((r) => r.href).length;

  return (
    <div className="nxv" data-surface="concept">
      <SmartReturn fallback={{ href: "/neo/knowledge/", label: "מרכז המושגים" }} />

      <header className="nxv-head">
        <span className="nx-eyebrow">מרכז המושגים · {c.groupHe}</span>
        <div className="nxv-title">
          <h1 className="nxv-h1">{c.he}</h1>
          <p className="nxv-en">{c.title}</p>
        </div>
        <div className="nxv-meta">
          <span className="nu-chip">{c.groupHe}</span>
          <span className="nu-chip is-sap">{c.slug}</span>
          <span
            className="nu-status"
            style={{ "--s": c.s4Changed ? "var(--status-in-conversion)" : "var(--status-done)" } as React.CSSProperties}
          >
            {c.s4Changed ? "המקור מתאר שינוי ב-S/4HANA" : "המקור כותב «ללא שינוי מהותי»"}
          </span>
        </div>
      </header>

      {/* ------------------------------------------------- THE S/4HANA PLATE */}
      <section className="nxv-s4" data-s4={c.s4Changed ? "1" : "0"} aria-labelledby="c-s4">
        <div className="nxv-s4-top">
          <span className="nx-eyebrow">S/4HANA</span>
          <h2 className="nxv-s4-h" id="c-s4">
            {c.s4Changed ? "המושג הזה משתנה במעבר ל-S/4HANA" : "המושג הזה נשאר כפי שהוא ב-S/4HANA"}
          </h2>
        </div>
        <div className="nxv-s4-two">
          <div className="nxv-s4-c">
            <span className="nxv-l">ECC 6.0</span>
            {c.ecc ? <p>{c.ecc}</p> : <Absent what="התנהגות ב-ECC" />}
          </div>
          <div className="nxv-s4-c">
            <span className="nxv-l">S/4HANA</span>
            {c.s4 ? <p>{c.s4}</p> : <Absent what="התנהגות ב-S/4HANA" />}
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------- EXPLANATION */}
      <section className="nxv-sec" aria-labelledby="c-biz">
        <div className="nxv-sec-h">
          <span className="nxv-sec-i" aria-hidden="true"><Sparkles size={16} strokeWidth={1.75} /></span>
          <h2 className="nx-h2" id="c-biz">מה זה, במונחים עסקיים</h2>
          <em className="nxv-sec-n">01</em>
        </div>
        {c.biz ? <p className="nxv-v">{c.biz}</p> : <Absent what="הסבר עסקי" />}
      </section>

      <section className="nxv-sec" aria-labelledby="c-tech">
        <div className="nxv-sec-h">
          <span className="nxv-sec-i" aria-hidden="true"><Wrench size={16} strokeWidth={1.75} /></span>
          <h2 className="nx-h2" id="c-tech">איך זה בנוי, טכנית</h2>
          <em className="nxv-sec-n">02</em>
        </div>
        {c.tech ? <p className="nxv-v">{c.tech}</p> : <Absent what="הסבר טכני" />}
      </section>

      {/* ------------------------------------------------------------ EXAMPLES */}
      <section className="nxv-sec" aria-labelledby="c-ex">
        <div className="nxv-sec-h">
          <span className="nxv-sec-i" aria-hidden="true"><Lightbulb size={16} strokeWidth={1.75} /></span>
          <h2 className="nx-h2" id="c-ex">דוגמאות מהמאגר</h2>
          <em className="nxv-sec-n">03</em>
        </div>
        {c.examples.length ? (
          <>
            <p className="nx-muted">
              דוגמה שמזוהה כטבלה במילון או כטרנזקציה במרשם נפתחת לעמוד שלה. דוגמה שאינה אחת מהשתיים,
              {" "}אלמנט נתונים, שם מודול פונקציה, תבנית: מוצגת כערך ולא כקישור.
            </p>
            <div className="nxv-refs">
              {c.examples.map((r) => <Ref key={`${r.kind}-${r.label}`} r={r} />)}
            </div>
          </>
        ) : (
          <Absent what="דוגמאות" />
        )}
      </section>

      {/* ------------------------------------------------------------- RELATED */}
      <section className="nxv-sec" aria-labelledby="c-rel">
        <div className="nxv-sec-h">
          <span className="nxv-sec-i" aria-hidden="true"><Link2 size={16} strokeWidth={1.75} /></span>
          <h2 className="nx-h2" id="c-rel">מושגים קשורים</h2>
          <em className="nxv-sec-n">04</em>
        </div>
        {c.related.length ? (
          <div className="nxv-refs">
            {c.related.map((r) => <Ref key={`rel-${r.label}`} r={r} />)}
          </div>
        ) : (
          <Absent what="מושגים קשורים" />
        )}
      </section>

      <div className="nxv-foot">
        <p className="nxv-src">
          <Info size={13} strokeWidth={1.75} aria-hidden="true" />
          <span>
            מקור: <span className="nx-sap">data/concepts.ts</span>: ידע SAP כתוב. אינו נגזר ממערכת חיה
            {" "}ואינו תחליף לאימות מול המערכת לפני יישום.
          </span>
        </p>
        <p>
          {linked} מתוך {c.examples.length + c.related.length} ההפניות של המושג נפתרו לעמוד קיים בפרויקט;
          {" "}השאר מוצגות כערך, כי אין להן עמוד ולא הומצא להן אחד.
        </p>
      </div>
    </div>
  );
}
