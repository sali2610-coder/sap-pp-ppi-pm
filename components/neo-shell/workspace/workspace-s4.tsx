"use client";

// Project NEO · ECC → S/4HANA, and what needs attention in the move.
//
// One block, two readings of the SAME column of the dictionary:
//   · the verdict split — how many rows the blueprint marks kept / replaced /
//     removed;
//   · the rows that are not "kept", listed with the blueprint's own wording.
//
// The second list is DERIVED in front of the user from the first: it is every
// row whose verdict is not "נשמר". It is not an incident feed, it is not a
// support queue, and the block says so out loud rather than implying a source
// the project does not have.
//
// The list is collapsed to a first screenful and opens on demand — the whole
// point of this pass is that detail is available, not permanently on screen.
//
// COLOUR FORM RULE: the verdict is a STATUS, so it appears only as .nu-status
// (a small filled dot immediately followed by its word). The proportion bars
// are neutral ink, never a status hue, because a bar is a surface.

import { useMemo, useState } from "react";
import Link from "next/link";
import { AlertTriangle, ArrowLeft } from "lucide-react";
import { pushRecentObject } from "../store";
import type { S4Class, WsData } from "./workspace-data";
import { S4_HE, s4Dot } from "./workspace-table";

const nf = new Intl.NumberFormat("he-IL");

const FIRST = 5;

export function WorkspaceS4({ d }: { d: WsData }) {
  const [all, setAll] = useState(false);

  const split: { k: S4Class; n: number }[] = [
    { k: 0, n: d.s4.kept },
    { k: 1, n: d.s4.replaced },
    { k: 2, n: d.s4.removed },
  ];
  const total = split.reduce((a, s) => a + s.n, 0) || 1;

  // Derived from the rows on this page: every dictionary row the blueprint
  // does NOT mark as kept, removed first, then replaced. First occurrence of a
  // table wins, so a table documented under two topics is one entry.
  const attention = useMemo(() => {
    const seen = new Set<string>();
    return d.rows
      .filter((r) => r.s4 !== 0)
      .filter((r) => (seen.has(r.n) ? false : (seen.add(r.n), true)))
      .sort((a, b) => b.s4 - a.s4 || a.n.localeCompare(b.n));
  }, [d.rows]);

  const shown = all ? attention : attention.slice(0, FIRST);

  return (
    <section className="nw-block" aria-labelledby="nw-s4-h">
      <div className="nw-block-h">
        <p className="nw-block-k">
          <AlertTriangle size={14} strokeWidth={1.75} aria-hidden="true" />
          מעבר ל-S/4HANA
        </p>
        <h2 className="nw-block-t" id="nw-s4-h">מה משתנה במודול, ומה דורש תשומת לב</h2>
        <p className="nw-block-s">
          חלוקת ההכרעות מתוך עמודת ה-S/4HANA של המילון, על {nf.format(d.counts.tables)} הטבלאות הייחודיות של
          המודול. הרשימה שמתחתיה היא כל מה שאינו &quot;נשמר&quot; — נגזרת של אותה עמודה, ולא רשימת תקלות
          ממערכת חיה.
        </p>
      </div>

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

      {attention.length ? (
        <>
          <ul className="nw-issues">
            {shown.map((r) => (
              <li key={r.n}>
                <div className="nw-issue-h">
                  <span className="nu-status" style={{ "--s": s4Dot(r.s4) } as React.CSSProperties}>
                    {S4_HE[r.s4]}
                  </span>
                  <Link
                    className="nu-link"
                    href={r.href}
                    prefetch={false}
                    onClick={() => pushRecentObject(r.n)}
                  >
                    <b className="nw-sap">{r.n}</b>
                    <ArrowLeft className="nu-arw" size={13} strokeWidth={2} aria-hidden="true" />
                  </Link>
                  <span className="nw-issue-he">{r.he}</span>
                </div>
                {/* Verbatim. The blueprint's wording is never paraphrased. */}
                <p className="nw-issue-n">{r.s4Note || "המילון אינו מחזיק הערת S/4HANA לשורה הזאת."}</p>
                {r.s4Alt ? (
                  <p className="nw-fine">
                    חלופה כפי שהמילון מנסח אותה: <span className="nw-sap">{r.s4Alt}</span>
                  </p>
                ) : null}
                {r.sum ? <p className="nw-fine">SUM · {r.sum}</p> : null}
              </li>
            ))}
          </ul>
          {attention.length > FIRST ? (
            <button type="button" className="nu-btn2" aria-expanded={all} onClick={() => setAll((v) => !v)}>
              {all
                ? "הצג רק את הראשונות"
                : `הצג את כל ${nf.format(attention.length)} הטבלאות שדורשות תשומת לב`}
            </button>
          ) : null}
        </>
      ) : (
        <p className="nw-fine">
          המילון אינו מסמן אף טבלה של המודול כמוחלפת או כמוסרת ב-S/4HANA.
        </p>
      )}
    </section>
  );
}
