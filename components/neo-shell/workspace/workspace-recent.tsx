"use client";

// Project NEO · "objects you opened recently, in THIS module".
//
// The list is not a new store. It reads `neo:obj:recent` through the shell's
// own store, which is the same key components/object-workspace.tsx writes and
// the rail's shelf reads — so a table opened on a legacy /object page shows up
// here, and a table opened from the working table shows up there.
//
// Three honesty rules this panel keeps:
//   · it shows only names that this module's dictionary actually documents, so
//     a PP-PI table can never appear under PM;
//   · a row renders a time only when a real timestamp was stored for it. There
//     is no plausible-looking fallback;
//   · a row is a LINK to the object page it names — the same destination the
//     working table sends you to, so "recent" and "open" mean one thing.

import { ArrowLeft, History } from "lucide-react";
import { OriginLink } from "@/components/neo-shell/nav-context";
import { relTime, useRecent } from "../store";
import type { WsRow } from "./workspace-data";
import { useWsOrigin } from "./workspace-origin";

export function WorkspaceRecent({ names, rows }: { names: Set<string>; rows: WsRow[] }) {
  const { names: recent, seen } = useRecent();
  const origin = useWsOrigin();

  // First occurrence wins: a table documented under two topics is one object.
  const byName = new Map<string, WsRow>();
  for (const r of rows) if (!byName.has(r.n)) byName.set(r.n, r);

  const list = recent.filter((n) => names.has(n)).slice(0, 6);

  return (
    <section className="nw-sub" aria-labelledby="nw-recent-h">
      <h3 className="nw-sub-h" id="nw-recent-h">
        <span className="nw-sub-ico" aria-hidden="true">
          <History size={13} strokeWidth={1.75} />
        </span>
        אובייקטים אחרונים במודול
      </h3>
      {list.length ? (
        <ul className="nw-rank nw-rank--tight">
          {list.map((n) => {
            const r = byName.get(n)!;
            const ts = seen[n];
            return (
              <li key={n} style={{ "--o": r.obj } as React.CSSProperties}>
                <OriginLink className="nu-card nw-rcrow" href={r.href} origin={() => origin(n)}>
                  <i className="nw-cls" aria-hidden="true" />
                  <b className="nw-sap">{n}</b>
                  <span className="nw-rc-he">{r.he}</span>
                  {ts ? <em>{relTime(ts)}</em> : null}
                  <ArrowLeft className="nu-arw nw-steparw" size={13} strokeWidth={2} aria-hidden="true" />
                </OriginLink>
              </li>
            );
          })}
        </ul>
      ) : (
        <p className="nw-fine">
          טרם נפתח אובייקט מהמודול הזה. שם טבלה בטבלת העבודה פותח את עמוד האובייקט ומוסיף אותו לרשימה.
        </p>
      )}
    </section>
  );
}
