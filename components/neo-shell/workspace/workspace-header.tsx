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

import Link from "next/link";
import { ArrowLeft, FlaskConical, GitBranch, Wrench } from "lucide-react";
import { OriginLink } from "@/components/neo-shell/nav-context";
import type { WsData } from "./workspace-data";
import { useWsOrigin } from "./workspace-origin";

const nf = new Intl.NumberFormat("he-IL");

export function WorkspaceHero({ d }: { d: WsData }) {
  const origin = useWsOrigin();

  // Every figure is read straight off the server-built object. The four
  // "second numbers" sit next to their headline rather than instead of it,
  // because the dictionary genuinely holds two different counts.
  const stats: { n: number; l: string; sub?: string }[] = [
    { n: d.counts.topics, l: "נושאים" },
    { n: d.counts.rows, l: "שורות מילון", sub: `${nf.format(d.counts.tables)} טבלאות ייחודיות` },
    { n: d.counts.fields, l: "שדות מתועדים", sub: `${nf.format(d.counts.pk)} PK · ${nf.format(d.counts.fk)} FK` },
    {
      n: d.counts.funcEntries,
      l: "רשומות ממשק",
      // The kind split is over the NORMALISED objects, so when normalisation
      // actually collapses entries (PP-PI: 71 → 53) both numbers are stated
      // instead of one quietly standing in for the other.
      sub: [
        d.counts.funcObjects === d.counts.funcEntries
          ? null
          : `${nf.format(d.counts.funcObjects)} אובייקטים אחרי נרמול`,
        d.counts.bapis ? `${nf.format(d.counts.bapis)} BAPI` : null,
        d.counts.fms ? `${nf.format(d.counts.fms)} FM` : null,
        d.counts.idocs ? `${nf.format(d.counts.idocs)} IDoc` : null,
      ]
        .filter(Boolean)
        .join(" · "),
    },
    { n: d.counts.tcodes, l: "טרנזקציות" },
    { n: d.counts.edges, l: "קשרים ממודלים" },
    { n: d.counts.cds, l: "CDS Views" },
    { n: d.counts.fiori, l: "Fiori Apps" },
  ];

  return (
    <header className="nw-hero">
      <p className="nw-eye">
        CBC ISRAEL · PROJECT NEO
        <i aria-hidden="true" />
        סביבת עבודה · מודול
      </p>

      <div className="nw-id">
        <span className="nw-mark nw-sap" aria-hidden="true">{d.code}</span>
        <div className="nw-idtext">
          <h1 className="nw-title">
            {d.he}
            <span className="nw-code nw-sap">{d.code}</span>
          </h1>
          <p className="nw-en nw-sap">{d.en}</p>
        </div>
        <span className="nw-idicon" aria-hidden="true">
          {d.key === "PM" ? <Wrench size={22} strokeWidth={1.5} /> : <FlaskConical size={22} strokeWidth={1.5} />}
        </span>
      </div>

      <p className="nw-lede">{d.lede}</p>

      {/* ---------------------------------------------------- where to start.
          Three destinations, ranked, all of them real generated routes. The
          primary one is not an editorial pick: it is the table the dictionary
          models the most neighbours for, and it says so. */}
      <nav className="nw-go" aria-label="מאיפה מתחילים">
        {d.entry ? (
          <OriginLink className="nu-btn" href={d.entry.href} origin={() => origin(d.entry!.n)}>
            <i className="nw-cls" style={{ "--o": d.entry.obj } as React.CSSProperties} aria-hidden="true" />
            התחילו מ־<span className="nw-sap">{d.entry.n}</span>
            <ArrowLeft className="nu-arw" size={15} strokeWidth={2} aria-hidden="true" />
          </OriginLink>
        ) : null}
        <Link className="nu-btn2" href="/neo/erd/" prefetch={false}>
          <GitBranch size={15} strokeWidth={1.75} aria-hidden="true" />
          מודל הנתונים המלא
        </Link>
        <Link className="nu-link" href="/neo/transactions/" prefetch={false}>
          מרשם הטרנזקציות
          <ArrowLeft className="nu-arw" size={14} strokeWidth={2} aria-hidden="true" />
        </Link>
        {d.entry ? (
          <span className="nw-go-why">
            הטבלה הכי מקושרת במודול — <span className="nw-sap">{nf.format(d.entry.deg)}</span> שכנים ישירים במילון.
          </span>
        ) : null}
      </nav>

      <dl className="nw-figs">
        {stats.map((s) => (
          <div key={s.l} className="nw-fig">
            <dt>{s.l}</dt>
            <dd>
              <b className="nw-sap">{nf.format(s.n)}</b>
              {s.sub ? <em>{s.sub}</em> : null}
            </dd>
          </div>
        ))}
      </dl>
    </header>
  );
}
