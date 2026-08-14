"use client";

// Project NEO · TRANSACTIONS · RELATIONSHIPS · DATA MODEL — one block.
//
// These were three separate surfaces: a transaction list wedged into the
// header's context column, a relationship paragraph, and a hub chart. All
// three answer "how do I get from this module to the rest of the system", so
// they are now two columns of ONE block that sits directly under the working
// table, where that question actually gets asked.
//
// Every name in here is a route: a transaction leads to the shared registry, a
// hub table leads to its own object page. Nothing is a decorative pill.

import Link from "next/link";
import { ArrowLeft, GitBranch, Terminal } from "lucide-react";
import { pushRecentObject } from "../store";
import type { WsData } from "./workspace-data";

const nf = new Intl.NumberFormat("he-IL");

export function WorkspaceContext({ d }: { d: WsData }) {
  const maxTc = Math.max(1, ...d.tcodes.map((t) => t.n));
  const maxDeg = Math.max(1, ...d.rel.hubs.map((h) => h.deg));

  return (
    <section className="nw-block nw-block--split" aria-labelledby="nw-ctx-h">
      <div className="nw-block-h">
        <p className="nw-block-k">
          <GitBranch size={14} strokeWidth={1.75} aria-hidden="true" />
          מהמודול החוצה
        </p>
        <h2 className="nw-block-t" id="nw-ctx-h">טרנזקציות, קשרים ומודל הנתונים</h2>
        <p className="nw-block-s">
          שתי הדרכים שבהן המודול נוגע בשאר המערכת: הקודים שדרכם עובדים בו, והטבלאות שמחזיקות את רוב הקשרים.
        </p>
      </div>

      <div className="nw-cols">
        {/* --------------------------------------------------- transactions */}
        <section className="nw-sub" aria-labelledby="nw-tc-h">
          <h3 className="nw-sub-h" id="nw-tc-h">
            <Terminal size={13} strokeWidth={1.75} aria-hidden="true" />
            טרנזקציות נפוצות
          </h3>
          <ul className="nw-rank nw-rank--tight">
            {d.tcodes.map((t) => (
              <li key={t.code}>
                <span className="nw-tcrow">
                  <b className="nw-sap">{t.code}</b>
                  <span className="nw-bar" aria-hidden="true">
                    <i style={{ "--p": t.n / maxTc } as React.CSSProperties} />
                  </span>
                  <em className="nw-sap">
                    {nf.format(t.n)}
                    <span>טבלאות</span>
                  </em>
                </span>
              </li>
            ))}
          </ul>
          <p className="nw-fine">
            הדירוג הוא מספר הטבלאות במילון שמצביעות על הקוד, ולא תדירות שימוש בפועל. המילון של המודול מחזיק{" "}
            {nf.format(d.counts.tcodes)} קודים בסך הכול.
          </p>
          <Link className="nu-link" href="/neo/transactions/" prefetch={false}>
            המרשם המלא של הטרנזקציות
            <ArrowLeft className="nu-arw" size={14} strokeWidth={2} aria-hidden="true" />
          </Link>
        </section>

        {/* -------------------------------------------- relations + the ERD */}
        <section className="nw-sub" aria-labelledby="nw-rl-h">
          <h3 className="nw-sub-h" id="nw-rl-h">
            <GitBranch size={13} strokeWidth={1.75} aria-hidden="true" />
            קשרים ומודל הנתונים
          </h3>
          <p className="nw-relline">
            <b className="nw-sap">{nf.format(d.rel.edges)}</b> קשרים ממודלים,{" "}
            <b className="nw-sap">{nf.format(d.rel.inside)}</b> מהם אל טבלה שהמודול עצמו מתעד.{" "}
            {d.rel.cards.length ? (
              <>
                קרדינליות:{" "}
                {d.rel.cards.map((c, i) => (
                  <span key={c.label}>
                    {i > 0 ? " · " : ""}
                    <span className="nw-sap">{c.label}</span> ×{nf.format(c.n)}
                  </span>
                ))}
                {d.rel.none > 0 ? <> · ללא ציון ×{nf.format(d.rel.none)}</> : null}
              </>
            ) : (
              <>המילון אינו מציין קרדינליות לאף אחד מהם.</>
            )}
          </p>
          <ul className="nw-rank nw-rank--tight">
            {d.rel.hubs.map((h) => (
              <li key={h.n} style={{ "--o": h.obj } as React.CSSProperties}>
                <Link
                  className="nu-card nw-hubrow"
                  href={h.href}
                  prefetch={false}
                  onClick={() => pushRecentObject(h.n)}
                >
                  <i className="nw-cls" aria-hidden="true" />
                  <b className="nw-sap">{h.n}</b>
                  <span className="nw-bar nw-bar--obj" aria-hidden="true">
                    <i style={{ "--p": h.deg / maxDeg } as React.CSSProperties} />
                  </span>
                  <em className="nw-sap">
                    {nf.format(h.deg)}
                    <span>שכנים</span>
                  </em>
                  <ArrowLeft className="nu-arw nw-steparw" size={13} strokeWidth={2} aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
          <p className="nw-fine">הצמתים העמוסים ביותר — מספר השכנים הישירים שהמילון מחזיק לכל טבלה.</p>
          <p className="nw-links">
            <Link className="nu-link" href="/neo/erd/" prefetch={false}>
              תרשים ה-ER המלא
              <ArrowLeft className="nu-arw" size={14} strokeWidth={2} aria-hidden="true" />
            </Link>
            <Link className="nu-link" href="/neo/domain-model/" prefetch={false}>
              מודל התחומים
              <ArrowLeft className="nu-arw" size={14} strokeWidth={2} aria-hidden="true" />
            </Link>
          </p>
        </section>
      </div>
    </section>
  );
}
