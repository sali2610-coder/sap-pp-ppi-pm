"use client";

/* ============================================================================
   PROJECT NEO · READER — one subchapter, rendered.
   ----------------------------------------------------------------------------
   The content engine is not touched here. This file receives a `SectionBody`
   exactly as lib/library/book.ts#loadChapterBodies returned it and decides how
   it READS — nothing more. Two shapes exist in the corpus and both are handled
   the way the platform already defines them:

     format: "prose"     ten books. Hebrew when the book has it, English when it
                         does not. `**bold**` and blank-line paragraphs are the
                         only markup the source carries.
     format: "academy"   book8. Named Hebrew facets, rendered in FACET_ORDER and
                         never in object order, because a JSON reshuffle must not
                         be able to change the reading order of a lesson.

   An empty body is a REAL state — a chapter may be headings only — and is said
   in words rather than hidden or filled in.
   ========================================================================== */

import { useMemo } from "react";
import type { AcademyBody, SectionBody } from "@/lib/library/book";
import { FACET_ORDER, proseText } from "@/lib/library/book";
import type { NRSection } from "./types";

/* ------------------------------------------------------------------ prose */

/**
 * Rendered as structured text rather than through dangerouslySetInnerHTML. The
 * corpus is trusted, but the reader should not be the one place in the product
 * where that assumption is load-bearing.
 */
function Prose({ text }: { text: string }) {
  const paras = useMemo(
    () => text.split(/\n{2,}/).map((p) => p.trim()).filter(Boolean),
    [text],
  );
  return (
    <>
      {paras.map((p, i) => (
        <p className="nr-p" key={i}>
          {p.split(/(\*\*[^*]+\*\*)/g).map((chunk, j) =>
            chunk.startsWith("**") && chunk.endsWith("**")
              ? <strong key={j}>{chunk.slice(2, -2)}</strong>
              : <span key={j}>{chunk}</span>,
          )}
        </p>
      ))}
    </>
  );
}

/* ---------------------------------------------------------------- academy */

const isList = (v: unknown): v is unknown[] => Array.isArray(v);

function Refs({ label, value }: { label: string; value: unknown }) {
  const items = isList(value) ? value : value ? [value] : [];
  if (!items.length) return null;
  return (
    <div className="nr-refs-row">
      <span className="nr-refs-l">{label}</span>
      {items.map((x, i) => (
        <span className="nu-chip is-sap" key={i}>{typeof x === "string" ? x : JSON.stringify(x)}</span>
      ))}
    </div>
  );
}

function Academy({ body }: { body: AcademyBody }) {
  const facets = body.facets ?? {};
  const present = FACET_ORDER.filter((f) => {
    const v = facets[f.key];
    return Array.isArray(v) ? v.length > 0 : Boolean(v?.trim());
  });
  const refs = body.refs ?? {};
  const hasRefs = Object.values(refs).some((v) => (isList(v) ? v.length : v != null && v !== ""));

  return (
    <>
      {present.map((f) => {
        const v = facets[f.key];
        return (
          <section className="nr-facet" key={f.key}>
            <h4 className="nr-facet-h">{f.he}</h4>
            {Array.isArray(v) ? (
              // Nine of book8's facets are arrays — steps, common mistakes,
              // interview questions. Flattening them to a paragraph would lose
              // the item boundaries that make them readable.
              <ul className="nr-list">
                {v.map((item, i) => <li key={i}>{String(item)}</li>)}
              </ul>
            ) : (
              <Prose text={v} />
            )}
          </section>
        );
      })}
      {hasRefs && (
        <div className="nr-refs">
          <Refs label="טבלאות" value={refs.tables} />
          <Refs label="טרנזקציות" value={refs.tcodes} />
          <Refs label="אפליקציות Fiori" value={refs.fiori} />
        </div>
      )}
    </>
  );
}

/* --------------------------------------------------------------- section */

export function SectionBlock({
  section,
  body,
  index,
  count,
  active,
}: {
  section: NRSection;
  body: SectionBody | undefined;
  index: number;
  count: number;
  active: boolean;
}) {
  const he = body && body.format === "prose" ? body.he?.trim() : "";
  const en = body && body.format === "prose" ? body.en?.trim() : "";
  const main = body && body.format === "prose" ? proseText(body) : "";
  // The English original is offered ONLY when it is genuinely a second text —
  // not when it is the very text already on screen.
  const original = he && en && en !== he ? en : null;

  return (
    <article
      className="nr-sec"
      id={`nr-sec-${section.id}`}
      data-nr-section={section.id}
      data-nr-index={index}
      aria-current={active ? "true" : undefined}
    >
      <header className="nr-sec-h">
        <span className="nr-sec-n nu-chip is-sap">{section.id}</span>
        <h3 className="nr-sec-t">{section.title}</h3>
        <span className="nr-sec-meta">
          {section.page !== null && <span className="nu-chip">עמ׳ {section.page}</span>}
          <span className="nu-chip is-sap">{index + 1}/{count}</span>
        </span>
      </header>

      <div className="nr-prose">
        {!body ? (
          <p className="nr-none">אין תוכן מורחב לתת-פרק זה במאגר הספר.</p>
        ) : body.format === "academy" ? (
          <Academy body={body} />
        ) : main ? (
          <Prose text={main} />
        ) : body.snippet ? (
          <p className="nr-p nr-snip">{body.snippet}</p>
        ) : (
          <p className="nr-none">אין תוכן מורחב לתת-פרק זה במאגר הספר.</p>
        )}

        {original && (
          <details className="nr-orig">
            <summary>המקור באנגלית</summary>
            <div className="nr-orig-b" dir="ltr" lang="en"><Prose text={original} /></div>
          </details>
        )}
      </div>
    </article>
  );
}
