"use client";

// A list of real dictionary tables that talks to the rail.
//
// Selecting a row does not navigate anywhere: it announces the object on a
// window event that components/neo-shell/neo-shell.tsx listens for, which loads
// the full context into the shelf and pushes the name onto the product's real
// recents list (neo:obj:recent — the same one /object pages write). That keeps
// every /neo page a plain static server component with no shell coupling.

import type { HubTable } from "./types";

export function NeoTableList({ rows }: { rows: HubTable[] }) {
  return (
    <div className="nx-tablelist">
      {rows.map((t) => (
        <button
          key={t.name}
          type="button"
          className="nx-tablerow"
          style={{ "--o": t.obj } as React.CSSProperties}
          onClick={() => window.dispatchEvent(new CustomEvent("neo:nx:object", { detail: t.name }))}
        >
          {/* object-class hue — a visualisation encoding, never the module hue */}
          <span className="nx-dot" aria-hidden="true" />
          <span className="nx-sap">{t.name}</span>
          <span className="nx-he">{t.he}</span>
          <span className="nx-n">{t.tcode || "—"}</span>
          <span className="nx-n">{t.fields} שדות</span>
        </button>
      ))}
    </div>
  );
}
