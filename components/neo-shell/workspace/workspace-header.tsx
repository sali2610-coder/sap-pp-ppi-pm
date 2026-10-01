// Project NEO · the module HERO.
//
// This band is the approved part of the workspace and it stays what it was: an
// editorial masthead, not a dashboard. The only thing added to it is the answer
// to "what do I open first" — three real routes, in descending weight, using
// the shared interaction language from app/neo/ui.css.
//
// Everything that used to hang off this header (the recents / transactions /
// books column, the density strip, the process strip, the relationship read)
// has moved BELOW the hero into four large blocks. The hero now owns the full
// width, so the large titles the client approved get more room, not less.
//
// COLOUR FORM RULE (app/globals.css, above --mod-pm), obeyed literally:
//   MODULE hue → surface tint, ring, line, edge, section marker. Here: the
//                masthead edge, the outlined code mark, the code pill's ring.
//                Never a small standalone dot.
//   STATUS hue → does not appear in this file at all.
//   OBJECT hue → the entry object's class marker.

import { Fragment } from "react";
import Link from "next/link";
import { ArrowLeft, GitBranch } from "lucide-react";
import { OriginLink } from "@/components/neo-shell/nav-context";
import type { WsData } from "./workspace-data";
import { useWsOrigin } from "./workspace-origin";

const nf = new Intl.NumberFormat("he-IL");

export function WorkspaceHero({ d }: { d: WsData }) {
  const origin = useWsOrigin();

  // Every figure is read straight off the server-built object. The four
  // "second numbers" sit next to their headline rather than instead of it,
  // because the dictionary genuinely holds two different counts. Each part is
  // its own isolate: as one run, "106 PK · 85 FK" inside the Hebrew line
  // reordered to "(PK · 85 FK 106)" and swapped the two counts (gate 3,
  // round 3, blocker 1).
  const stats: { n: number; l: string; sub?: string[] }[] = [
    { n: d.counts.topics, l: "נושאים" },
    { n: d.counts.rows, l: "רשומות תיעוד", sub: [`${nf.format(d.counts.tables)} טבלאות שונות`] },
    { n: d.counts.fields, l: "שדות מתועדים", sub: [`${nf.format(d.counts.pk)} PK`, `${nf.format(d.counts.fk)} FK`] },
    {
      n: d.counts.funcEntries,
      l: "רשומות ממשק",
      // The kind split is over the NORMALISED objects, so when normalisation
      // actually collapses entries (PP-PI: 71 → 53) both numbers are stated
      // instead of one quietly standing in for the other.
      sub: [
        d.counts.funcObjects === d.counts.funcEntries
          ? null
          : `${nf.format(d.counts.funcObjects)} אובייקטים שונים`,
        d.counts.bapis ? `${nf.format(d.counts.bapis)} BAPI` : null,
        d.counts.fms ? `${nf.format(d.counts.fms)} FM` : null,
        d.counts.idocs ? `${nf.format(d.counts.idocs)} IDoc` : null,
      ].filter((x): x is string => !!x),
    },
    { n: d.counts.tcodes, l: "טרנזקציות" },
    { n: d.counts.edges, l: "קשרים ממודלים" },
    { n: d.counts.cds, l: "תצוגות CDS" },
    { n: d.counts.fiori, l: "יישומי Fiori" },
  ];

  return (
    <header className="nw-hero">
      <p className="nw-eye nm-fade">
        סביבת עבודה · מודול
      </p>

      {/* The module is named once in type: the title, its code chip and the
          English name. The outlined code square and the icon box said "PM" a
          third and fourth time and carried nothing else (gate 10, round 3). */}
      <div className="nw-id">
        <div className="nw-idtext">
          <h1 className="nw-title nx-display">
            {d.he}
            <span className="nw-code nw-sap">{d.code}</span>
          </h1>
          <p className="nw-en nw-sap">{d.en}</p>
        </div>
      </div>

      <p className="nw-lede nm-rise">{d.lede}</p>

      {/* ---------------------------------------------------- where to start.
          Three destinations, ranked, all of them real generated routes. The
          primary one is not an editorial pick: it is the table the dictionary
          models the most neighbours for, and it says so. */}
      <nav className="nw-go nm-rise" aria-label="נקודות כניסה למודול">
        {d.entry ? (
          <OriginLink className="nu-btn" href={d.entry.href} origin={() => origin(d.entry!.n)}>
            התחלה מ-<span className="nw-sap">{d.entry.n}</span>
            <ArrowLeft className="nu-arw" size={15} strokeWidth={2} aria-hidden="true" />
          </OriginLink>
        ) : null}
        <Link className="nu-btn2" href="/neo/erd/" prefetch={false}>
          <GitBranch size={15} strokeWidth={1.75} aria-hidden="true" />
          מודל הנתונים המלא
        </Link>
        <Link className="nu-link" href="/neo/transactions/" prefetch={false}>
          קטלוג הטרנזקציות
          <ArrowLeft className="nu-arw" size={14} strokeWidth={2} aria-hidden="true" />
        </Link>
        {d.entry ? (
          <span className="nw-go-why">
            הטבלה המקושרת ביותר במודול, עם <span className="nw-sap">{nf.format(d.entry.deg)}</span> טבלאות מקושרות ישירות בתיעוד.
          </span>
        ) : null}
      </nav>

      {/* The counts are one line of text, as on a record page ("8 שדות
          מתועדים · …"): every number stays, the strip of large figures goes
          (gate 10, round 2 M1 and round 3). A zero is a gap, said in words. */}
      <p className="nw-figs">
        {stats.map((s) =>
          s.n === 0 ? (
            <span key={s.l} className="nw-fig">
              <span>{s.l}:</span>
              <em>אין במאגר</em>
            </span>
          ) : (
            <span key={s.l} className="nw-fig">
              <b className="nw-sap">{nf.format(s.n)}</b>
              <span>{s.l}</span>
              {s.sub?.length ? (
                <em>
                  (
                  {s.sub.map((part, i) => (
                    <Fragment key={part}>
                      {i ? " · " : null}
                      <bdi>{part}</bdi>
                    </Fragment>
                  ))}
                  )
                </em>
              ) : null}
            </span>
          ),
        )}
      </p>
    </header>
  );
}
