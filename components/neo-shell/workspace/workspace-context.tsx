"use client";

// Project NEO · WHERE THE MODULE TOUCHES THE REST OF THE SYSTEM.
//
// The relationship read used to share a block with the transaction list, which
// made two unrelated questions look like one topic. The transactions now have
// their own chapter (workspace-ops.tsx) with the blueprint's own directory
// behind them, so this chapter is about ONE thing: the modelled edges.
//
// Three readings, in descending abstraction:
//   · how many edges there are, and how many stay inside the module;
//   · the cardinality mix EXACTLY as the blueprint states it, including how many
//     edges it states nothing for — PP-PI states nothing for any of them, and
//     the sentence says so rather than quietly printing a shorter list;
//   · the busiest tables, each a route to its own object page.
//
// Every name in here is a route. Nothing is a decorative pill.

import Link from "next/link";
import { ArrowLeft, GitBranch, Network, Share2 } from "lucide-react";
import { OriginLink } from "@/components/neo-shell/nav-context";
import { pushRecentObject } from "../store";
import type { WsData } from "./workspace-data";
import { Chapter, Sub, type ChapterMeta } from "./workspace-chapter";
import { useWsOrigin } from "./workspace-origin";

const nf = new Intl.NumberFormat("he-IL");

export function WorkspaceContext({ d, meta }: { d: WsData; meta: ChapterMeta }) {
  const maxDeg = Math.max(1, ...d.rel.hubs.map((h) => h.deg));
  const origin = useWsOrigin();

  return (
    <Chapter
      meta={meta}
      icon={<Share2 size={17} strokeWidth={1.75} />}
      lede={
        <>
          <b className="nw-sap">{nf.format(d.rel.edges)}</b> קשרים ממודלים במילון של המודול,{" "}
          <b className="nw-sap">{nf.format(d.rel.inside)}</b> מהם אל טבלה שהמודול עצמו מתעד. השאר יוצאים
          החוצה, וזה בדיוק המקום שבו המודול נוגע בשאר המערכת.
        </>
      }
      lead={
        <Link className="nu-btn2" href="/neo/erd/" prefetch={false}>
          <GitBranch size={15} strokeWidth={1.75} aria-hidden="true" />
          מודל הנתונים המלא
        </Link>
      }
    >
      <Sub
        id="nw-rl-card"
        icon={<Network size={13} strokeWidth={1.75} />}
        title="עוצמת הקשרים כפי שנרשמה"
      >
        <p className="nw-relline">
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
            <>
              המילון של המודול אינו מציין קרדינליות לאף אחד מ-{nf.format(d.rel.edges)} הקשרים. הקשר נרשם,
              העוצמה שלו לא, וכך זה מוצג כאן, בלי להשלים בניחוש.
            </>
          )}
        </p>
      </Sub>

      <Sub
        id="nw-rl-hubs"
        icon={<Share2 size={13} strokeWidth={1.75} />}
        title="הצמתים העמוסים ביותר"
        note="מספר השכנים הישירים שהמילון מחזיק לכל טבלה. שם של טבלה פותח את עמוד האובייקט המלא שלה."
      >
        <ul className="nw-rank nw-rank--tight">
          {d.rel.hubs.map((h) => (
            <li key={h.n} style={{ "--o": h.obj } as React.CSSProperties}>
              <OriginLink
                className="nu-card nw-hubrow"
                href={h.href}
                origin={() => origin(h.n)}
                onClick={() => pushRecentObject(h.n)}
              >
                <i className="nw-cls" aria-hidden="true" />
                <b className="nw-sap">{h.n}</b>
                <span className="nw-bar nw-bar--obj nm-grow" aria-hidden="true">
                  <i style={{ "--p": h.deg / maxDeg } as React.CSSProperties} />
                </span>
                <em className="nw-sap">
                  {nf.format(h.deg)}
                  <span>שכנים</span>
                </em>
                <ArrowLeft className="nu-arw nw-steparw" size={13} strokeWidth={2} aria-hidden="true" />
              </OriginLink>
            </li>
          ))}
        </ul>
        <p className="nw-links">
          <Link className="nu-link" href="/neo/erd/" prefetch={false}>
            תרשים ה-ER המלא
            <ArrowLeft className="nu-arw" size={14} strokeWidth={2} aria-hidden="true" />
          </Link>
          <Link className="nu-link" href="/neo/erd/" prefetch={false}>
            מודל התחומים
            <ArrowLeft className="nu-arw" size={14} strokeWidth={2} aria-hidden="true" />
          </Link>
        </p>
      </Sub>
    </Chapter>
  );
}
