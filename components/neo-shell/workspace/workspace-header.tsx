// Project NEO · the module HERO.
//
// 2026-10 · THE ROUTE. The hero now carries the module's own business process as
// its signature: the steps of lib/studio-graph's FLOWS for this module, drawn as
// a line of stations, each one the table the step lives in and each one a route
// to that table's object page. A step the module's dictionary does not document
// is drawn hollow and says so, and is not a link to nowhere. The identity is one
// lockup (plate, name, code and English name) and the counts are a ledger.
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
  // Each count is also the door to the chapter that holds what it counts.
  const stats: { n: number; l: string; sub?: string[]; to: string }[] = [
    { n: d.counts.topics, l: "נושאים", to: "#nw-map" },
    { n: d.counts.rows, l: "רשומות תיעוד", sub: [`${nf.format(d.counts.tables)} טבלאות ייחודיות`], to: "#nw-tbl" },
    { n: d.counts.fields, l: "שדות מתועדים", sub: [`${nf.format(d.counts.pk)} PK`, `${nf.format(d.counts.fk)} FK`], to: "#nw-tbl" },
    {
      to: "#nw-if",
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
        .filter((x): x is string => !!x),
    },
    { n: d.counts.tcodes, l: "טרנזקציות", to: "#nw-ops" },
    { n: d.counts.edges, l: "קשרים ממודלים", to: "#nw-rel" },
    { n: d.counts.cds, l: "CDS Views", to: "#nw-if" },
    { n: d.counts.fiori, l: "יישומי Fiori", to: "#nw-if" },
  ];

  const gaps = d.flow.filter((s) => !s.exists).length;

  return (
    <header className="nw-hero">
     <div className="nw-hero-main">
      <p className="nw-eye">
        <span>CBC ISRAEL · PROJECT NEO</span>
        <i aria-hidden="true" />
        <span lang="he">סביבת עבודה · מודול</span>
      </p>

      <div className="nw-id">
        {/* The plate: the module's tool and its code, one fixed footprint for
            every module so PM and PP-PI get the same stature. */}
        <span className="nw-mark" aria-hidden="true">
          {d.key === "PM" ? <Wrench size={26} strokeWidth={1.6} /> : <FlaskConical size={26} strokeWidth={1.6} />}
          <b className="nw-sap">{d.code}</b>
        </span>
        <div className="nw-idtext">
          <h1 className="nw-title">{d.he}</h1>
          <p className="nw-en">
            <span className="nw-sap">{d.code}</span>
            <i aria-hidden="true" />
            <bdi dir="ltr">{d.en}</bdi>
          </p>
        </div>
      </div>

      <p className="nw-lede">{d.lede}</p>

      {/* ---------------------------------------------------- where to start.
          Three destinations, ranked, all of them real generated routes. The
          primary one is not an editorial pick: it is the table the dictionary
          models the most neighbours for, and it says so. */}
      <nav className="nw-go nm-rise" aria-label="נקודות כניסה למודול">
        {d.entry ? (
          <OriginLink className="nu-btn" href={d.entry.href} origin={() => origin(d.entry!.n)}>
            <i className="nw-cls" style={{ "--o": d.entry.obj } as React.CSSProperties} aria-hidden="true" />
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
            <span className="nw-sap">{d.entry.n}</span> היא הטבלה המקושרת ביותר במודול, עם{" "}
            <span className="nw-sap">{nf.format(d.entry.deg)}</span> טבלאות מקושרות ישירות בתיעוד.
          </span>
        ) : null}
      </nav>

      <ul className="nw-figs" aria-label="המודול במספרים">
        {stats.map((s) => (
          <li key={s.l}>
            <a className="nw-fig" href={s.to}>
              <b className="nw-sap">{nf.format(s.n)}</b>{" "}
              <span className="nw-fig-l">{s.l}</span>
              {/* Each part isolates its own direction: "106 PK" stays a Latin run
                  and "53 אובייקטים אחרי נרמול" a Hebrew one, in reading order. */}
              {s.sub?.length ? (
                <em>
                  {s.sub.map((x, i) => (
                    <Fragment key={x}>
                      {i ? " · " : ""}
                      <bdi>{x}</bdi>
                    </Fragment>
                  ))}
                </em>
              ) : null}
            </a>
          </li>
        ))}
      </ul>
     </div>

      {/* ------------------------------------------------------- the route */}
      {d.flow.length ? (
        <nav className="nw-route" aria-labelledby="nw-route-h">
          <p className="nw-route-k" id="nw-route-h">
            <span>התהליך העסקי של <span className="nw-sap">{d.code}</span></span>
            <em>
              {nf.format(d.flow.length)} צעדים{gaps ? ` · ${nf.format(gaps)} ללא טבלה בתיעוד המודול` : ""}
            </em>
          </p>
          <ol>
            {d.flow.map((s) => (
              <li key={s.code} data-gap={s.exists ? undefined : "1"} style={{ "--o": s.obj } as React.CSSProperties}>
                {s.href ? (
                  <OriginLink className="nw-stop" href={s.href} origin={() => origin(s.code)}>
                    <i className="nw-stop-dot" aria-hidden="true" />
                    <b className="nw-sap">{s.code}</b>
                    <span className="nw-stop-t">{s.label}</span>
                    <ArrowLeft className="nu-arw" size={13} strokeWidth={2} aria-hidden="true" />
                  </OriginLink>
                ) : (
                  <span className="nw-stop">
                    <i className="nw-stop-dot" aria-hidden="true" />
                    <b className="nw-sap">{s.code}</b>
                    <span className="nw-stop-t">
                      {s.label}
                      <em> · לא מתועד במודול</em>
                    </span>
                  </span>
                )}
              </li>
            ))}
          </ol>
        </nav>
      ) : null}


    </header>
  );
}
