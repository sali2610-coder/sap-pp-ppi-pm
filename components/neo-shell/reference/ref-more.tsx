/* ============================================================================
   PROJECT NEO · THE REFERENCE DIRECTORIES — a disclosure under a list.
   ----------------------------------------------------------------------------
   A SERVER component. Secondary material a directory carries in full (the
   BAPI/FM primer, the 1,450-app Fiori index) sits in a native <details>: it is
   in the HTML, it costs nothing until opened, and the list above stays calm.
   ========================================================================== */

import { ChevronDown } from "lucide-react";

export function RefMore({ title, lede, children }: { title: string; lede?: string; children: React.ReactNode }) {
  return (
    <details className="nxr-more">
      <summary>
        <ChevronDown size={15} strokeWidth={2} aria-hidden="true" />
        {title}
        {lede ? <em>{lede}</em> : null}
      </summary>
      <div className="nxr-more-b">{children}</div>
    </details>
  );
}

/** Two or more short columns of points, each under its own title. */
export function RefCols({ cols }: { cols: { title: string; rows: string[] }[] }) {
  return (
    <div className="nxr-cols">
      {cols.map((c) => (
        <div key={c.title}>
          <p className="nxr-cols-h" lang={/[֐-׿]/.test(c.title) ? undefined : "en"}>{c.title}</p>
          <ul className="nxt-ul">{c.rows.map((r) => <li key={r}>{r}</li>)}</ul>
        </div>
      ))}
    </div>
  );
}
