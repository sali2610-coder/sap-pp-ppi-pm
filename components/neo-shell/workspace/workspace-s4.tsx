"use client";

// Project NEO · ECC → S/4HANA. The FORWARD CONTEXT of the whole module page.
//
// The brief moved this from a comparison footnote to the primary frame: "Where a
// table or object materially changes in S/4, make it one of the most visually
// noticeable things on the page… Do NOT hide this inside a small paragraph."
// So the chapter sits directly under the module map, ABOVE the dictionary table,
// and a table that moves gets a full callout of its own rather than a cell.
//
// FOUR READINGS OF ONE COLUMN, in descending certainty:
//
//   1  THE RISK MIX        lib/s4.ts resolves each table to high / medium / low
//                          and says HOW it knows: `verified` is curated
//                          Simplification-List knowledge, `partial` is derived
//                          from the blueprint's own S/4 column, `needs` is
//                          "nobody checked". The mix is printed with its trust,
//                          never as a bare number.
//   2  WHAT MOVES          every table lib/s4 marks high or medium, each as a
//                          callout: what changes, why it matters, the SAP Note
//                          the PROJECT holds (never one invented here), the
//                          replacement table/transaction the blueprint states,
//                          the SUM note, the Fiori successor.
//   3  THE VERDICT SPLIT   kept / replaced / removed, straight out of
//                          lib/module-portal's eccS4() — the same bucketing the
//                          working table shows, so the two can never disagree.
//   4  THE SAP REFERENCES  the distinct note / simplification ids behind the
//                          curated entries, listed once so they are auditable.
//
// COLOUR FORM RULE (app/globals.css, above --mod-pm), obeyed literally. A risk
// level is a STATE, so it may only ever be a small filled dot immediately
// followed by its word — which is exactly .nu-status, and the ONLY place
// RISK_COLOR is allowed to land. The callout gets its weight from size, type
// and a MODULE edge instead, because a coloured border would put a status hue
// into line form and break the rule the whole product is held to.

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft, BadgeCheck, ChevronDown, FileText, Layers, TriangleAlert } from "lucide-react";
import { OriginLink } from "@/components/neo-shell/nav-context";
import { RISK_COLOR } from "@/lib/s4";
import { pushRecentObject } from "../store";
import type { S4Class, WsData, WsS4Row } from "./workspace-data";
import { Chapter, Sub, type ChapterMeta } from "./workspace-chapter";
import { useWsOrigin } from "./workspace-origin";
import { WorkspaceSheet } from "./workspace-sheet";
import { s4He, s4Dot } from "@/lib/s4-class";

const nf = new Intl.NumberFormat("he-IL");

const FIRST = 4;

/** Trust is not a risk level and must not borrow its dot. It is rendered as a
 *  worded line — a VALUE — because that is what it is: a statement about the
 *  provenance of the sentence next to it. */
const TRUST_WHY: Record<string, string> = {
  verified: "מבוסס על Simplification List המתוחזק בפרויקט",
  partial: "נגזר מעמודת S/4HANA בתיעוד; נדרש אימות נוסף מול SAP",
  needs: "לא קיימת הכרעה בתיעוד לטבלה זו",
};

export function WorkspaceS4({ d, meta }: { d: WsData; meta: ChapterMeta }) {
  const [all, setAll] = useState(false);

  // Five buckets, not three. "לא הוכרע במקור" is a real state in this dataset
  // — 11 PP-PI rows carry an S/4 note with no leading verdict — and folding it
  // into "ללא שינוי" is what made PP-PI read as 68 unchanged / 0 replaced.
  const split = ([
    { k: 0, n: d.s4.kept },
    { k: 1, n: d.s4.changed },
    { k: 2, n: d.s4.replaced },
    { k: 3, n: d.s4.removed },
    { k: null, n: d.s4.undecided },
  ] as { k: S4Class | null; n: number }[]).filter((x) => x.n > 0);
  const total = split.reduce((a, s) => a + s.n, 0) || 1;

  const changed = d.s4x.changed;
  const shown = all ? changed : changed.slice(0, FIRST);

  // PM's blueprint carries a Simplification Item List of its own, with real SAP
  // Note ids. PP-PI's does not, and the chapter simply does not grow a section
  // it has no data for.
  const sic = d.sheets.find((s) => s.key === "simplification") || null;

  // Every dictionary row the blueprint does NOT mark as kept, first occurrence
  // wins. This is the verdict view of the same column the risk view reads, and
  // the two are shown side by side rather than merged into one flattering list.
  const notKept = useMemo(() => {
    const seen = new Set<string>();
    return d.rows.filter((r) => r.s4 !== 0).filter((r) => (seen.has(r.n) ? false : (seen.add(r.n), true)));
  }, [d.rows]);

  const riskRows = (
    [
      { k: "high", he: "סיכון גבוה", n: d.s4x.risk.high },
      { k: "medium", he: "סיכון בינוני", n: d.s4x.risk.medium },
      { k: "low", he: "יציב", n: d.s4x.risk.low },
      { k: "none", he: "לא ידוע", n: d.s4x.risk.none },
    ] as { k: "high" | "medium" | "low" | "none"; he: string; n: number }[]
  ).filter((r) => r.n > 0);

  return (
    <Chapter
      meta={meta}
      icon={<TriangleAlert size={17} strokeWidth={1.75} />}
      lede={
        <>
          מתוך <b className="nw-sap">{nf.format(d.counts.tables)}</b> הטבלאות הייחודיות של המודול,{" "}
          <b className="nw-sap">{nf.format(changed.length)}</b> מסומנות כמשתנות מהותית במעבר ל-S/4HANA.
          כל אחת מהן מוצגת כאן במלואה, עם מקור ההכרעה.
        </>
      }
      lead={
        <Link className="nu-link" href="/neo/tables/" prefetch={false}>
          כל טבלאות SAP של הפרויקט
          <ArrowLeft className="nu-arw" size={14} strokeWidth={2} aria-hidden="true" />
        </Link>
      }
    >
      {/* ============================================== 1 · the headline band

          THE ONE PLACE ON A MODULE PAGE THAT CHANGES GROUND. app/neo/ground.css
          reserves the `deep` scene for "a moment that is meant to feel like a
          held breath", and this is that moment: the single sentence the whole
          product exists to deliver, on a full-bleed warm-dark band that reads
          identically in both themes. It is the BAND and not the chapter, because
          everything under it is reference material somebody has to study, and a
          study surface does not belong in a dark tunnel.

          The scene rebinds --surface / --ink-* / --hairline locally, so every
          component inside keeps its own code and simply comes out legible. */}
      <div className="nw-s4stage nm-scene" data-scene="deep">
        <div className="nw-s4top">
          <p className="nw-s4big nm-rise">
            <b className="nw-sap">{nf.format(changed.length)}</b>
            <span>טבלאות משתנות מהותית</span>
            <em>
              מתוך {nf.format(d.counts.tables)}: {nf.format(d.s4x.risk.high)} בסיכון גבוה,{" "}
              {nf.format(d.s4x.risk.medium)} בסיכון בינוני
            </em>
          </p>

          <ul className="nw-s4mix nm-seq" aria-label="פילוח הסיכון">
            {riskRows.map((r) => (
              <li key={r.k} className="nm-fade">
                {/* STATUS form: a small filled dot, immediately followed by its
                    word. RISK_COLOR appears here and nowhere else on the page. */}
                <span className="nu-status" style={{ "--s": RISK_COLOR[r.k] } as React.CSSProperties}>
                  {r.he}
                </span>
                {/* The bar draws itself in against the scroll (.nm-grow, scaleX
                    only — width is a layout property and is never animated). */}
                <span className="nw-bar nw-bar--ink nm-grow" aria-hidden="true">
                  <i style={{ "--p": r.n / (d.counts.tables || 1) } as React.CSSProperties} />
                </span>
                <b className="nw-sap">{nf.format(r.n)}</b>
              </li>
            ))}
          </ul>

          {/* The blueprint's own verdict, the same column read the other way: kept,
              changed, replaced, removed, undecided. Side by side with the risk
              mix rather than a second set of bars a screen further down. */}
          <div className="nw-s4verdict">
            <p className="nw-s4verdict-h">
              <Layers size={13} strokeWidth={1.75} aria-hidden="true" />
              הכרעת התיעוד לפי עמודת S/4HANA
            </p>
            <ul className="nw-verdicts">
              {split.map((sp) => (
                <li key={sp.k}>
                  <span className="nu-status" style={{ "--s": s4Dot(sp.k) } as React.CSSProperties}>
                    {s4He(sp.k)}
                  </span>
                  <span className="nw-bar nw-bar--ink nm-grow" aria-hidden="true">
                    <i style={{ "--p": sp.n / total } as React.CSSProperties} />
                  </span>
                  <b className="nw-sap">{nf.format(sp.n)}</b>
                  <em className="nw-sap">{Math.round((sp.n / total) * 100)}%</em>
                </li>
              ))}
            </ul>
            <p className="nw-fine">
              {notKept.length
                ? `${nf.format(notKept.length)} טבלאות אינן מסומנות "ללא שינוי". כולן מופיעות בטבלת העבודה, עם אותה הכרעה.`
                : "התיעוד מסמן את כל טבלאות המודול ללא שינוי."}
            </p>
          </div>

          <div className="nw-s4foot">
            <p className="nw-s4trust">
              <BadgeCheck size={13} strokeWidth={1.75} aria-hidden="true" />
              מקור ההכרעה: <b className="nw-sap">{nf.format(d.s4x.trust.verified)}</b> מאומת ·{" "}
              <b className="nw-sap">{nf.format(d.s4x.trust.partial)}</b> נגזר מהתיעוד ·{" "}
              <b className="nw-sap">{nf.format(d.s4x.trust.needs)}</b> נדרש אימות SAP
            </p>
            {/* The references the project holds: only ids that exist in its own
                Simplification List, never one written here. */}
            {d.s4x.notes.length ? (
              <div className="nw-s4refs">
                {/* The curated field holds a Simplification item or an SAP Note,
                    whichever the project recorded; the label names neither alone. */}
                <span className="nw-s4refs-k">
                  <FileText size={13} strokeWidth={1.75} aria-hidden="true" />
                  הפניות SAP שבפרויקט
                </span>
                <ul className="nw-notes" aria-label="הפניות SAP שבפרויקט">
                  {d.s4x.notes.map((n) => (
                    <li key={n}>
                      <span className="nu-chip is-sap">{n}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </div>
      </div>

      {/* ============================================ 2 · what actually moves */}
      <Sub
        id={`${meta.id}-moves`}
        icon={<TriangleAlert size={13} strokeWidth={1.75} />}
        title="הטבלאות שמשתנות מהותית"
        note="כל שורה היא טבלה שהפרויקט מסמן בסיכון גבוה או בינוני במעבר. הניסוח מובא מהמקור כלשונו."
      >
        {changed.length ? (
          <>
            <ul className="nw-moves nm-seq">
              {shown.map((r) => (
                <Move key={r.n} r={r} />
              ))}
            </ul>
            {changed.length > FIRST ? (
              <button type="button" className="nu-btn2" aria-expanded={all} onClick={() => setAll((v) => !v)}>
                {all ? "הצגת הראשונות בלבד" : `הצגת כל ${nf.format(changed.length)} הטבלאות המשתנות`}
              </button>
            ) : null}
          </>
        ) : (
          <p className="nw-fine">הפרויקט אינו מסמן אף טבלה של המודול כמשתנה מהותית ב-S/4HANA.</p>
        )}
      </Sub>

      {/* ============================ 2b · the blueprint's Simplification List */}
      {sic ? (
        <Sub
          id={`${meta.id}-sic`}
          icon={<FileText size={13} strokeWidth={1.75} />}
          title={sic.title}
          note={`${nf.format(sic.rows.length)} פריטי Simplification מתיעוד המודול, עם מספרי SAP Note כפי שנרשמו במקור. מוצג כלשונו.`}
        >
          <WorkspaceSheet
            sheet={sic}
            lede="כל פריט מובא מהגיליון המקורי של הפרויקט: הקטגוריה, ה-SAP Note וההמלצה, כלשונם."
          />
        </Sub>
      ) : null}

      {/* ------------------------------------- what the blueprint left empty */}
      <p className="nw-fine">
        עמודות המקור במודול זה: הערת S/4HANA על {nf.format(d.s4x.has.note)} טבלאות · טבלה או טרנזקציה חלופית
        על {nf.format(d.s4x.has.alt)} · הערת SUM על {nf.format(d.s4x.has.sum)} · יישום Fiori על{" "}
        {nf.format(d.s4x.has.fiori)}. עמודה ריקה במקור מוצגת כריקה.
      </p>
    </Chapter>
  );
}

/** One table that materially moves. A compact callout (2026-10): the verdict,
 *  the table, and the one sentence that says what changes are always on screen;
 *  the evidence behind it (the blueprint's note, the replacement, SUM, Fiori,
 *  transactions, compatibility views) opens in place. Nothing is dropped. */
function Move({ r }: { r: WsS4Row }) {
  const origin = useWsOrigin();
  const [more, setMore] = useState(false);
  const detailsId = `nw-mv-${r.n}`;
  return (
    <li className="nw-move" data-risk={r.risk} data-open={more ? "1" : undefined}>
      <div className="nw-move-h">
        <span className="nu-status" style={{ "--s": RISK_COLOR[r.risk] } as React.CSSProperties}>
          {r.riskHe}
        </span>
        <OriginLink
          className="nu-link nw-move-n"
          href={r.href}
          origin={() => origin(r.n)}
          onClick={() => pushRecentObject(r.n)}
        >
          <b className="nw-sap">{r.n}</b>
          <ArrowLeft className="nu-arw" size={14} strokeWidth={2} aria-hidden="true" />
        </OriginLink>
        <span className="nu-status" style={{ "--s": s4Dot(r.s4) } as React.CSSProperties}>
          {s4He(r.s4)}
        </span>
        {r.note ? <span className="nu-chip is-sap">{r.note}</span> : null}
      </div>

      {r.he ? <p className="nw-move-he">{r.he}</p> : null}

      {/* What changes. The loudest sentence in the block, on purpose. */}
      <p className="nw-move-w">
        {r.changed || r.s4Note || "לא קיים בתיעוד ניסוח של השינוי בטבלה זו."}
      </p>
      <p className="nw-move-t">
        <BadgeCheck size={12} strokeWidth={1.75} aria-hidden="true" />
        {r.trustHe} · {TRUST_WHY[r.trust]}
      </p>

      <button
        type="button"
        className="nu-ghost nw-move-x"
        aria-expanded={more}
        aria-controls={detailsId}
        onClick={() => setMore((v) => !v)}
      >
        {more ? "הסתרת פרטי ההכרעה" : "פרטי ההכרעה"}
        <ChevronDown size={14} strokeWidth={2} aria-hidden="true" />
      </button>

      <div className="nw-move-more" id={detailsId} hidden={!more}>
        {r.why ? <p className="nw-move-y">{r.why}</p> : null}

        <dl className="nw-move-kv">
          {r.changed && r.s4Note && r.changed !== r.s4Note ? (
            <div>
              <dt>הערת התיעוד</dt>
              <dd>{r.s4Note}</dd>
            </div>
          ) : null}
          {r.s4Alt ? (
            <div>
              <dt>חלופה לפי התיעוד</dt>
              <dd className="nw-sap">{r.s4Alt}</dd>
            </div>
          ) : null}
          {r.sum ? (
            <div>
              <dt>המרה ב-SUM</dt>
              <dd>{r.sum}</dd>
            </div>
          ) : null}
          {r.fiori ? (
            <div>
              <dt>יישום Fiori עוקב</dt>
              <dd className="nw-sap">{r.fiori}</dd>
            </div>
          ) : null}
          {r.tcodes.length ? (
            <div>
              <dt>טרנזקציות לבדיקה</dt>
              <dd>
                {r.tcodes.map((c) => (
                  <span key={c} className="nu-chip is-sap">{c}</span>
                ))}
              </dd>
            </div>
          ) : null}
          {r.cds.length ? (
            <div>
              <dt>תצוגות תאימות</dt>
              <dd>
                {r.cds.map((c) => (
                  <span key={c} className="nu-chip is-sap">{c}</span>
                ))}
              </dd>
            </div>
          ) : null}
        </dl>
      </div>
    </li>
  );
}
