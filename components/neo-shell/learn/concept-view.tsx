/* ============================================================================
   PROJECT NEO · /neo/knowledge/<slug>/ — one concept, in full.
   ----------------------------------------------------------------------------
   The directory answers "which concept". This answers "what is it, and what
   does S/4HANA do with it".

   A server component. The only client code on the page is <SmartReturn/>, which
   has to read the session's navigation memory; everything else is text the
   builder already resolved at build time.

   THE RECORD LANGUAGE (2026-10, components/neo-shell/record-kit.tsx and
   app/neo/record.css): the catalog's hero, the S/4HANA plate as a raised card
   without a stripe, every question as the catalog's Sig, the references as
   rows, and the credit at the foot.

   THE S/4HANA WORDS ARE THE LIST'S. `s4Changed` is false only when the
   concept's own S/4 sentence opens with "ללא שינוי"; every other concept is
   left UNCLASSIFIED, not asserted to change (knowledge-data.ts). Most of those
   sentences say what S/4HANA adds or prefers, so the page says the record
   carries S/4HANA guidance, exactly as the Knowledge Center list does.

   ABSENCE IS RENDERED, NOT HIDDEN. A concept whose source leaves a field blank
   gets "לא קיים מידע מאומת במאגר" in that field's own place, so the reader can tell
   the difference between "the project checked and there is nothing" and "the
   page forgot to show it".
   ========================================================================== */

import Link from "next/link";
import {
  ArrowLeft, BookOpen, BrainCircuit, Info, Lightbulb, Link2, Sparkles, Terminal, Table as TableIcon, Wrench,
} from "lucide-react";
import { SmartReturn } from "@/components/neo-shell/nav-context";
import { RecordHead } from "../record-kit";
import { CatalogFoot, Sig } from "../data/catalog-kit";
import type { ConceptRef, ConceptRow } from "./knowledge-data";

const ABSENT = "לא קיים תיעוד מאומת במאגר";
const nf = new Intl.NumberFormat("he-IL");

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
      {r.he ? (
        <>
          <b>{r.he}</b>
          <span className="nx-sap" dir="ltr">{r.en}</span>
        </>
      ) : (
        <>
          <b>{r.code}</b>
          {r.note ? <span>{r.note}</span> : null}
        </>
      )}
      <ArrowLeft size={13} strokeWidth={2} aria-hidden="true" style={{ marginInlineStart: "auto", opacity: 0.5 }} />
    </Link>
  );
}

export function ConceptView({ c }: { c: ConceptRow }) {
  const linked = [...c.examples, ...c.related].filter((r) => r.href).length;

  return (
    <div className="nxv nrc nm-scene" data-scene="cream" data-surface="concept">
      <SmartReturn fallback={{ href: "/neo/knowledge/", label: "מרכז הידע" }} />

      <RecordHead
        icon={<BrainCircuit size={14} strokeWidth={1.75} aria-hidden="true" />}
        eyebrow={`מרכז הידע · ${c.groupHe}`}
        title={c.he}
        en={c.title.toLowerCase() !== c.he.toLowerCase() ? c.title : undefined}
        meta={
          <>
            <span className="nu-chip">{c.groupHe}</span>
            <span className="nu-chip is-sap">{c.slug}</span>
          </>
        }
        verdict={
          <span
            className="nu-status"
            style={{ "--s": c.s4Changed ? "var(--status-not-started)" : "var(--status-done)" } as React.CSSProperties}
          >
            {c.s4Changed ? "עם הנחיה ל-S/4HANA" : "ללא שינוי לפי התיעוד"}
          </span>
        }
      />

      {/* ------------------------------------------------- THE S/4HANA PLATE */}
      <section className="nxv-s4" data-s4={c.s4Changed ? "1" : "0"} aria-labelledby="c-s4">
        <div className="nxv-s4-top">
          <span className="nx-eyebrow">S/4HANA</span>
          <h2 className="nxv-s4-h" id="c-s4">
            {c.s4Changed ? "התיעוד כולל הנחיה ל-S/4HANA" : "המושג ללא שינוי ב-S/4HANA לפי התיעוד"}
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
      <Sig id="c-biz" icon={<Sparkles size={15} strokeWidth={1.75} />} title="הסבר עסקי">
        {c.biz ? <p className="nxv-v">{c.biz}</p> : <Absent what="הסבר עסקי" />}
      </Sig>

      <Sig id="c-tech" icon={<Wrench size={15} strokeWidth={1.75} />} title="הסבר טכני">
        {c.tech ? <p className="nxv-v">{c.tech}</p> : <Absent what="הסבר טכני" />}
      </Sig>

      {/* ------------------------------------------------------------ EXAMPLES */}
      <Sig
        id="c-ex"
        icon={<Lightbulb size={15} strokeWidth={1.75} />}
        title="דוגמאות"
        count={c.examples.length ? `${nf.format(c.examples.length)} דוגמאות` : undefined}
        lede={c.examples.length
          ? <>דוגמה שמזוהה כטבלת SAP או כטרנזקציה בקטלוג נפתחת לעמוד שלה. דוגמה אחרת{" "}(אלמנט נתונים, מודול פונקציה, תבנית) מוצגת כערך ללא קישור.</>
          : undefined}
      >
        {c.examples.length ? (
          <div className="nxv-refs">
            {c.examples.map((r) => <Ref key={`${r.kind}-${r.label}`} r={r} />)}
          </div>
        ) : (
          <Absent what="דוגמאות" />
        )}
      </Sig>

      {/* ------------------------------------------------------------- RELATED */}
      <Sig
        id="c-rel"
        icon={<Link2 size={15} strokeWidth={1.75} />}
        title="מושגים קשורים"
        count={c.related.length ? `${nf.format(c.related.length)} מושגים` : undefined}
      >
        {c.related.length ? (
          <div className="nxv-refs">
            {c.related.map((r) => <Ref key={`rel-${r.label}`} r={r} />)}
          </div>
        ) : (
          <Absent what="מושגים קשורים" />
        )}
      </Sig>

      <CatalogFoot
        notes={[
          <>
            מקור: <span className="nx-sap">data/concepts.ts</span>: תיעוד SAP מאומת, שאינו נקרא ממערכת חיה.
            {" "}נדרש אימות במערכת לפני יישום.
          </>,
        ]}
      >
        {linked} מתוך {c.examples.length + c.related.length} ההפניות של המושג מקושרות לעמוד בפרויקט;
        {" "}השאר מוצגות כערך.
      </CatalogFoot>
    </div>
  );
}
