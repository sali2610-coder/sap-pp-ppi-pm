"use client";

/* ============================================================================
   PROJECT NEO · READER — one subchapter, rendered.
   ----------------------------------------------------------------------------
   The content engine is not touched here. This file receives a `SectionBody`
   exactly as lib/library/book.ts#loadChapterBodies returned it and decides how
   it READS — nothing more. Two shapes exist in the corpus and both are handled
   the way the platform already defines them:

     format: "prose"     ten books. TWO REAL TEXTS: `en`, the publisher's
                         original, and `he`, the project's translation.
                         `**bold**` and blank-line paragraphs are the only
                         markup the source carries.
     format: "academy"   book8. Named Hebrew facets, rendered in FACET_ORDER and
                         never in object order, because a JSON reshuffle must not
                         be able to change the reading order of a lesson.

   THE BILINGUAL RULE, AND WHY IT IS A LAYOUT AND NOT A DISCLOSURE
   The English is not a footnote to the Hebrew. It is the source the book was
   published in, and for a consultant reading about SAP the English term IS the
   thing being learned: "maintenance order" is what the screen will say. So when
   both texts exist the reader sets them side by side, each in its own direction,
   paragraph facing paragraph — a study spread, which is how this content was
   read before and what the client asked to have back.

     wide screen    two columns. Hebrew at the inline start, the original at the
                    inline end, one hairline between them.
     narrow screen  the same pairs, stacked. Never two squeezed columns on a
                    390px phone, and never a language dropped to make room.

   NO TEXT IS EVER REMOVED BY A SETTING. In single-language mode the other text
   is still rendered into the page inside a disclosure, so the browser's own find
   still reaches it and one click brings it back. §30: progressive disclosure,
   not deletion.

   An empty body is a REAL state — a chapter may be headings only — and is said
   in words rather than hidden or filled in.
   ========================================================================== */

import { useMemo } from "react";
import Image from "next/image";
import { ImageIcon } from "lucide-react";
import type { AcademyBody, SectionBody } from "@/lib/library/book";
import { FACET_ORDER } from "@/lib/library/book";
import type { PlacedFigure } from "./figures";
import type { NRLang } from "./prefs";
import type { NRSection } from "./types";

/* ------------------------------------------------------------------ prose */

/** Paragraphs, the only structure the source carries. */
const split = (text: string): string[] =>
  text.split(/\n{2,}/).map((p) => p.trim()).filter(Boolean);

/** `**bold**` is the whole of the source's inline markup. */
function inline(p: string, key: number) {
  return (
    <p className="nr-p" key={key}>
      {p.split(/(\*\*[^*]+\*\*)/g).map((chunk, j) =>
        chunk.startsWith("**") && chunk.endsWith("**")
          ? <strong key={j}>{chunk.slice(2, -2)}</strong>
          : <span key={j}>{chunk}</span>,
      )}
    </p>
  );
}

/**
 * Rendered as structured text rather than through dangerouslySetInnerHTML. The
 * corpus is trusted, but the reader should not be the one place in the product
 * where that assumption is load-bearing.
 */
function Prose({ text }: { text: string }) {
  const paras = useMemo(() => split(text), [text]);
  return <>{paras.map((p, i) => inline(p, i))}</>;
}

/* -------------------------------------------------------------- bilingual */

const LANG_LABEL = { he: "עברית", en: "English" } as const;

/** One column of the spread. The direction is the TEXT's, never the page's. */
function Cell({ l, paras }: { l: "he" | "en"; paras: string[] }) {
  return (
    <div
      className="nr-bi-cell"
      data-l={l}
      dir={l === "he" ? "rtl" : "ltr"}
      lang={l}
    >
      <span className="nr-bi-tag">{LANG_LABEL[l]}</span>
      {paras.map((p, i) => inline(p, i))}
    </div>
  );
}

/**
 * The study spread.
 *
 * PARAGRAPH FACING PARAGRAPH WHEN THE TEXTS ALLOW IT. When both sides split into
 * the same number of paragraphs — which is the common case, because the
 * translation was made paragraph by paragraph — each pair gets its own grid row
 * and the two languages stay level down the page. When the counts differ the
 * reader does NOT force a pairing that the data does not support: it falls back
 * to two whole columns, which is still a spread and is still honest.
 */
function Spread({ he, en }: { he: string; en: string }) {
  const { rows, paired } = useMemo(() => {
    const h = split(he);
    const e = split(en);
    const level = h.length > 0 && h.length === e.length;
    const out: [string, string][] = level
      ? h.map((p, i): [string, string] => [p, e[i]])
      : [[he, en]];
    return { rows: out, paired: level };
  }, [he, en]);

  return (
    <div className="nr-bi" data-paired={paired ? "1" : undefined}>
      {rows.map(([h, e], i) => (
        <div className="nr-bi-row" key={i}>
          <Cell l="he" paras={paired ? [h] : split(h)} />
          <Cell l="en" paras={paired ? [e] : split(e)} />
        </div>
      ))}
    </div>
  );
}

/** The text that is not on screen, kept in the page and one click away. */
function Aside({ l, text }: { l: "he" | "en"; text: string }) {
  return (
    <details className="nr-orig">
      <summary>{l === "en" ? "המקור באנגלית" : "התרגום לעברית"}</summary>
      <div
        className="nr-orig-b"
        dir={l === "he" ? "rtl" : "ltr"}
        lang={l}
      >
        <Prose text={text} />
      </div>
    </details>
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

/* ---------------------------------------------------------------- figures */

/**
 * A scan, where the text that it belongs to actually is.
 *
 * The caption carries the real source page and says, in words, that the
 * position was derived from that page rather than recorded in the book — see
 * ./figures.ts. `unoptimized` because the export is static and offline: the
 * file on disk is the file that is served.
 */
function Figures({
  figures,
  onOpen,
  placed,
}: {
  figures: PlacedFigure[];
  onOpen: (index: number) => void;
  placed: boolean;
}) {
  if (!figures.length) return null;
  return (
    <div className="nr-infigs" data-placed={placed ? "1" : undefined}>
      {figures.map(({ fig, index, n }) => (
        <figure
          className="nr-infig"
          key={fig.file}
          /* NEVER UPSCALED PAST THE SOURCE. Half of this corpus's scans are
             500-700px wide; stretched to a 40rem column they are a blur, and a
             blurred SAP screen is worse than a small legible one. The same rule
             the canonical reader applies. */
          style={fig.w ? { maxInlineSize: `min(100%, ${fig.w}px)` } : undefined}
        >
          <button
            type="button"
            className="nr-infig-b"
            onClick={() => onOpen(index)}
            aria-label={`הגדל את האיור מעמוד ${fig.page}`}
          >
            <Image
              src={fig.file}
              alt=""
              width={fig.w || 1200}
              height={fig.h || 800}
              sizes="(max-width: 900px) 100vw, 40rem"
              unoptimized
            />
          </button>
          <figcaption className="nr-infig-c">
            <span className="nr-infig-n">
              <ImageIcon size={12} strokeWidth={2} aria-hidden="true" />
              איור {n}
            </span>
            <span className="nu-chip is-sap" dir="ltr">p. {fig.page}</span>
            <span className="nr-infig-note">
              {placed
                ? "המיקום נגזר מעמוד המקור של הסריקה. בנתוני הספר אין שיוך איור לתת-פרק."
                : "לסריקה הזו אין עמוד שניתן לשבץ לפיו, ולכן היא בסוף הפרק."}
            </span>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}

/** The chapter's leftovers, printed under the last subchapter so nothing that
 *  could not be placed is lost. Exported because the reader owns the tail. */
export function FigureTail({
  figures,
  onOpen,
}: {
  figures: PlacedFigure[];
  onOpen: (index: number) => void;
}) {
  if (!figures.length) return null;
  return (
    <section className="nr-tailfigs" aria-label="איורים ללא שיבוץ בטקסט">
      <h2 className="nr-figs-h">
        <ImageIcon size={14} strokeWidth={1.9} aria-hidden="true" />
        איורים שלא ניתן היה לשבץ בגוף הפרק
      </h2>
      <Figures figures={figures} onOpen={onOpen} placed={false} />
    </section>
  );
}

/* --------------------------------------------------------------- section */

export function SectionBlock({
  section,
  body,
  index,
  count,
  active,
  lang,
  figures,
  onFigure,
}: {
  section: NRSection;
  body: SectionBody | undefined;
  index: number;
  count: number;
  active: boolean;
  lang: NRLang;
  /** Scans whose source page falls in this subchapter's share of the chapter. */
  figures: PlacedFigure[];
  onFigure: (index: number) => void;
}) {
  const prose = body && body.format === "prose" ? body : null;
  const he = prose?.he?.trim() ?? "";
  const en = prose?.en?.trim() ?? "";
  // Two texts only when they are genuinely two. Ten books carry a translation;
  // where the pipeline left the English in both fields there is one text, and
  // printing it twice would be a spread of nothing.
  const both = Boolean(he && en && en !== he);

  // What actually goes on screen, given the setting AND what this subchapter
  // holds. A setting can never manufacture a text the book does not have.
  const view: "spread" | "he" | "en" | "one" | "none" =
    both && lang === "both" ? "spread"
      : both ? (lang === "en" ? "en" : "he")
        : he || en ? "one" : "none";

  const only = he || en;
  const onlyLang: "he" | "en" = he ? "he" : "en";

  return (
    <article
      className="nr-sec"
      id={`nr-sec-${section.id}`}
      data-nr-section={section.id}
      data-nr-index={index}
      data-bi={view === "spread" ? "1" : undefined}
      aria-current={active ? "true" : undefined}
    >
      <header className="nr-sec-h">
        <span className="nr-sec-n nu-chip is-sap">{section.id}</span>
        <h3 className="nr-sec-t">{section.title}</h3>
        <span className="nr-sec-meta">
          {section.page !== null && <span className="nu-chip">עמ׳ {section.page}</span>}
          {both && <span className="nu-chip" title="לתת-פרק הזה יש טקסט בעברית ומקור באנגלית">HE · EN</span>}
          <span className="nu-chip is-sap">{index + 1}/{count}</span>
        </span>
      </header>

      <div className="nr-prose" data-bi={view === "spread" ? "1" : undefined}>
        {!body ? (
          <p className="nr-none">אין תוכן מורחב לתת-פרק זה במאגר הספר.</p>
        ) : body.format === "academy" ? (
          <>
            <Academy body={body} />
            {lang === "en" && (
              <p className="nr-langnote">
                הספר הזה כתוב בעברית בלבד במאגר, ואין לו מקור אנגלי לתת-הפרק הזה.
              </p>
            )}
          </>
        ) : view === "spread" ? (
          <Spread he={he} en={en} />
        ) : view === "he" ? (
          <>
            <Prose text={he} />
            <Aside l="en" text={en} />
          </>
        ) : view === "en" ? (
          <>
            <div dir="ltr" lang="en" className="nr-en-only"><Prose text={en} /></div>
            <Aside l="he" text={he} />
          </>
        ) : view === "one" ? (
          <>
            <div dir={onlyLang === "he" ? "rtl" : "ltr"} lang={onlyLang}>
              <Prose text={only} />
            </div>
            {lang === "both" && (
              <p className="nr-langnote">
                {onlyLang === "he"
                  ? "לתת-הפרק הזה קיים במאגר הטקסט העברי בלבד."
                  : "לתת-הפרק הזה קיים במאגר המקור באנגלית בלבד, בלי תרגום."}
              </p>
            )}
          </>
        ) : body.snippet ? (
          <p className="nr-p nr-snip">{body.snippet}</p>
        ) : (
          <p className="nr-none">אין תוכן מורחב לתת-פרק זה במאגר הספר.</p>
        )}
      </div>

      <Figures figures={figures} onOpen={onFigure} placed />
    </article>
  );
}
