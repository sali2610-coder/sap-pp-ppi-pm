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
import { ArrowLeft, BadgeCheck, FileText, Layers, TriangleAlert } from "lucide-react";
import { OriginLink } from "@/components/neo-shell/nav-context";
import { RISK_COLOR } from "@/lib/s4";
import { pushRecentObject } from "../store";
import type { S4Class, WsData, WsS4Row } from "./workspace-data";
import { Chapter, Sub, type ChapterMeta } from "./workspace-chapter";
import { useWsOrigin } from "./workspace-origin";
import { WorkspaceSheet } from "./workspace-sheet";
import { S4_HE, s4Dot } from "./workspace-table";

const nf = new Intl.NumberFormat("he-IL");

const FIRST = 4;

/** Trust is not a risk level and must not borrow its dot. It is rendered as a
 *  worded line — a VALUE — because that is what it is: a statement about the
 *  provenance of the sentence next to it. */
const TRUST_WHY: Record<string, string> = {
  verified: "ידע Simplification List מתוחזק בפרויקט",
  partial: "נגזר מעמודת ה-S/4 של המילון — מומלץ אימות מול SAP",
  needs: "הפרויקט אינו מחזיק הכרעה לטבלה הזאת",
};

export function WorkspaceS4({ d, meta }: { d: WsData; meta: ChapterMeta }) {
  const [all, setAll] = useState(false);

  const split: { k: S4Class; n: number }[] = [
    { k: 0, n: d.s4.kept },
    { k: 1, n: d.s4.replaced },
    { k: 2, n: d.s4.removed },
  ];
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
          S/4HANA היא ההקשר הקדימה של המודול, ולא הערת שוליים להשוואה. מתוך{" "}
          <b className="nw-sap">{nf.format(d.counts.tables)}</b> הטבלאות הייחודיות של המודול,{" "}
          <b className="nw-sap">{nf.format(changed.length)}</b> מסומנות כמשתנות מהותית — וכל אחת מהן
          מופיעה כאן במלואה, עם המקור שממנו ההכרעה מגיעה.
        </>
      }
      lead={
        <Link className="nu-btn2" href="/neo/tables/" prefetch={false}>
          <Layers size={15} strokeWidth={1.75} aria-hidden="true" />
          מילון הטבלאות המלא של הפרויקט
        </Link>
      }
    >
      {/* ============================================== 1 · the headline band */}
      <div className="nw-s4top">
        <p className="nw-s4big">
          <b className="nw-sap">{nf.format(changed.length)}</b>
          <span>טבלאות משתנות מהותית</span>
          <em>
            מתוך {nf.format(d.counts.tables)} — {nf.format(d.s4x.risk.high)} בסיכון גבוה,{" "}
            {nf.format(d.s4x.risk.medium)} בסיכון בינוני
          </em>
        </p>

        <ul className="nw-s4mix" aria-label="פילוח הסיכון">
          {riskRows.map((r) => (
            <li key={r.k}>
              {/* STATUS form: a small filled dot, immediately followed by its
                  word. RISK_COLOR appears here and nowhere else on the page. */}
              <span className="nu-status" style={{ "--s": RISK_COLOR[r.k] } as React.CSSProperties}>
                {r.he}
              </span>
              <span className="nw-bar nw-bar--ink" aria-hidden="true">
                <i style={{ "--p": r.n / (d.counts.tables || 1) } as React.CSSProperties} />
              </span>
              <b className="nw-sap">{nf.format(r.n)}</b>
            </li>
          ))}
        </ul>

        <p className="nw-s4trust">
          <BadgeCheck size={13} strokeWidth={1.75} aria-hidden="true" />
          מקור ההכרעה: <b className="nw-sap">{nf.format(d.s4x.trust.verified)}</b> מאומת ·{" "}
          <b className="nw-sap">{nf.format(d.s4x.trust.partial)}</b> נגזר מהמילון ·{" "}
          <b className="nw-sap">{nf.format(d.s4x.trust.needs)}</b> נדרש אימות SAP
        </p>
      </div>

      {/* ============================================ 2 · what actually moves */}
      <Sub
        id={`${meta.id}-moves`}
        icon={<TriangleAlert size={13} strokeWidth={1.75} />}
        title="הטבלאות שמשתנות מהותית"
        note="כל שורה כאן היא טבלה שהפרויקט מסמן כבעלת סיכון גבוה או בינוני במעבר. הניסוח הוא של המקור — לא נוסח מחדש, ולא הושלם היכן שהמקור שותק."
      >
        {changed.length ? (
          <>
            <ul className="nw-moves">
              {shown.map((r) => (
                <Move key={r.n} r={r} />
              ))}
            </ul>
            {changed.length > FIRST ? (
              <button type="button" className="nu-btn2" aria-expanded={all} onClick={() => setAll((v) => !v)}>
                {all ? "הצג רק את הראשונות" : `הצג את כל ${nf.format(changed.length)} הטבלאות המשתנות`}
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
          note={`${nf.format(sic.rows.length)} פריטי Simplification שהתכנון של המודול רשם בעצמו, עם מספרי ה-SAP Note שלו. מוצג מילה במילה.`}
        >
          <WorkspaceSheet
            sheet={sic}
            lede="כל פריט כאן נכתב בגיליון המקורי של הפרויקט. הקטגוריה, ה-Note וההמלצה הם של המקור — לא נוסחו מחדש ולא הושלמו."
          />
        </Sub>
      ) : null}

      {/* ==================================== 3 · the blueprint's own verdict */}
      <Sub
        id={`${meta.id}-verdict`}
        icon={<Layers size={13} strokeWidth={1.75} />}
        title="ההכרעה של התכנון עצמו"
        note={`חלוקת עמודת ה-S/4HANA של המילון על ${nf.format(d.counts.tables)} הטבלאות הייחודיות. זו קריאה שנייה של אותה עמודה — היא נשמרת לצד פילוח הסיכון, ולא ממוזגת אליו.`}
      >
        <ul className="nw-verdicts">
          {split.map((s) => (
            <li key={s.k}>
              <span className="nu-status" style={{ "--s": s4Dot(s.k) } as React.CSSProperties}>
                {S4_HE[s.k]}
              </span>
              <span className="nw-bar nw-bar--ink" aria-hidden="true">
                <i style={{ "--p": s.n / total } as React.CSSProperties} />
              </span>
              <b className="nw-sap">{nf.format(s.n)}</b>
              <em className="nw-sap">{Math.round((s.n / total) * 100)}%</em>
            </li>
          ))}
        </ul>
        <p className="nw-fine">
          {notKept.length
            ? `${nf.format(notKept.length)} טבלאות אינן מסומנות כ"נשמר". כולן מופיעות בטבלת העבודה שמתחת, ומסומנות שם באותה הכרעה.`
            : "המילון אינו מסמן אף טבלה של המודול כמוחלפת או כמוסרת."}
        </p>
      </Sub>

      {/* ================================= 4 · the references the project holds */}
      {d.s4x.notes.length ? (
        <Sub
          id={`${meta.id}-notes`}
          icon={<FileText size={13} strokeWidth={1.75} />}
          title="הפניות SAP שהפרויקט מחזיק"
          note="אלה המזהים שנרשמו בידע ה-Simplification המתוחזק של הפרויקט עבור טבלאות המודול. מספר Note שאינו קיים בפרויקט אינו מומצא כאן, ולכן הרשימה קצרה מהמלאי האמיתי של SAP."
        >
          <ul className="nw-notes">
            {d.s4x.notes.map((n) => (
              <li key={n}>
                <span className="nu-chip is-sap">{n}</span>
              </li>
            ))}
          </ul>
        </Sub>
      ) : null}

      {/* ------------------------------------- what the blueprint left empty */}
      <p className="nw-fine">
        עמודות המקור במודול הזה: הערת S/4 על {nf.format(d.s4x.has.note)} טבלאות · טבלה או טרנזקציה חלופית
        על {nf.format(d.s4x.has.alt)} · הערת SUM על {nf.format(d.s4x.has.sum)} · אפליקציית Fiori על{" "}
        {nf.format(d.s4x.has.fiori)}. עמודה שהתכנון השאיר ריקה מוצגת כריקה, ולא מושלמת ממקור אחר.
      </p>
    </Chapter>
  );
}

/** One table that materially moves. Deliberately the heaviest unit on the page
 *  after the hero: the brief asks for a callout, not a cell. */
function Move({ r }: { r: WsS4Row }) {
  const origin = useWsOrigin();
  return (
    <li className="nw-move" data-risk={r.risk}>
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
          {S4_HE[r.s4]}
        </span>
        {r.note ? <span className="nu-chip is-sap">{r.note}</span> : null}
      </div>

      {r.he ? <p className="nw-move-he">{r.he}</p> : null}

      {/* What changes. The loudest sentence in the block, on purpose. */}
      <p className="nw-move-w">
        {r.changed || r.s4Note || "הפרויקט אינו מחזיק ניסוח למה שמשתנה בטבלה הזאת."}
      </p>
      {r.why ? <p className="nw-move-y">{r.why}</p> : null}

      <dl className="nw-move-kv">
        {r.changed && r.s4Note && r.changed !== r.s4Note ? (
          <div>
            <dt>הערת המילון</dt>
            <dd>{r.s4Note}</dd>
          </div>
        ) : null}
        {r.s4Alt ? (
          <div>
            <dt>חלופה כפי שנוסחה</dt>
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
            <dt>יורש Fiori</dt>
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

      <p className="nw-move-t">
        <BadgeCheck size={12} strokeWidth={1.75} aria-hidden="true" />
        {r.trustHe} · {TRUST_WHY[r.trust]}
      </p>
    </li>
  );
}
