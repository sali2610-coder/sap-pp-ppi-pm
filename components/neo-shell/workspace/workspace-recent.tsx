"use client";

// Project NEO · Stage 2B — "objects you opened recently, in THIS module".
//
// The list is not a new store. It reads `neo:obj:recent` through the shell's
// own store, which is the same key components/object-workspace.tsx writes and
// the rail's shelf reads — so a table opened on a legacy /object page shows up
// here, and a table opened here shows up there.
//
// Two honesty rules this panel keeps:
//   · it shows only names that this module's dictionary actually documents, so
//     a PP-PI table can never appear under PM;
//   · a row renders a time only when a real timestamp was stored for it. There
//     is no plausible-looking fallback.

import { History } from "lucide-react";
import { relTime, useRecent } from "../store";
import type { WsRow } from "./workspace-data";

export function WorkspaceRecent({ names, rows }: { names: Set<string>; rows: WsRow[] }) {
  const { names: recent, seen } = useRecent();

  // First occurrence wins: a table documented under two topics is one object.
  const byName = new Map<string, WsRow>();
  for (const r of rows) if (!byName.has(r.n)) byName.set(r.n, r);

  const list = recent.filter((n) => names.has(n)).slice(0, 6);

  return (
    <section className="nw-panel" aria-labelledby="nw-recent-h">
      <h2 className="nw-panel-h" id="nw-recent-h">
        <History size={14} strokeWidth={1.75} aria-hidden="true" />
        אובייקטים אחרונים במודול
      </h2>
      {list.length ? (
        <ul className="nw-rclist">
          {list.map((n) => {
            const r = byName.get(n)!;
            const ts = seen[n];
            return (
              <li key={n} style={{ "--o": r.obj } as React.CSSProperties}>
                <button
                  type="button"
                  onClick={() => window.dispatchEvent(new CustomEvent("neo:nx:object", { detail: n }))}
                >
                  <i className="nw-cls" aria-hidden="true" />
                  <b className="nw-sap">{n}</b>
                  <span className="nw-rc-he">{r.he}</span>
                  {ts ? <em>{relTime(ts)}</em> : null}
                </button>
              </li>
            );
          })}
        </ul>
      ) : (
        <p className="nw-fine">
          עדיין לא נפתח כאן אובייקט מהמודול הזה. לחיצה על שורה בטבלת העבודה פותחת את ההקשר המלא שלה
          ומוסיפה אותה לרשימה.
        </p>
      )}
    </section>
  );
}
