/* ============================================================================
   PROJECT NEO · SMART RETURN — the fallback parent.
   ----------------------------------------------------------------------------
   A return control must never be dead and must never be blank. When the session
   carries no origin — the user opened the URL directly, pasted a link, reloaded
   after a crash — the control still has to go somewhere true. That "somewhere"
   is the page's own parent in the navigation, which is a property of the route
   and not of the SAP data.

   These labels are NAVIGATION labels, copied from the rail's own seeds() in
   components/neo-shell/nav-data.ts. They are not SAP facts and nothing here
   describes a transaction, a table or a module's behaviour — this file cannot
   invent SAP data because it does not contain any.

   nav-data.ts is not imported: it reads the whole knowledge base at module
   scope, and this map is consumed by a client component.
   ========================================================================== */

export interface ParentRef { href: string; label: string }

/** Longest-prefix wins, so `/neo/transactions/IW31/` resolves to the
 *  transactions registry rather than to the NEO root. */
const PARENTS: [prefix: string, parent: ParentRef][] = [
  ["/neo/transactions/", { href: "/neo/transactions/", label: "טרנזקציות" }],
  ["/neo/tables/", { href: "/neo/tables/", label: "טבלאות" }],
  ["/neo/object/", { href: "/neo/tables/", label: "טבלאות" }],
  ["/neo/erd/", { href: "/neo/erd/", label: "מודל הנתונים" }],
  ["/neo/books/", { href: "/neo/library/", label: "מדף הספרים" }],
  ["/neo/library/", { href: "/neo/library/", label: "מדף הספרים" }],
  ["/neo/pm/", { href: "/neo/pm/", label: "אחזקה · PM" }],
  ["/neo/pp-pi/", { href: "/neo/pp-pi/", label: "ייצור · PP-PI" }],
  ["/neo/", { href: "/neo/", label: "מסך הבית" }],
];

const NEO_ROOT: ParentRef = { href: "/neo/", label: "מסך הבית" };

/** The parent of a page, ignoring the page itself: `/neo/transactions/` returns
 *  the NEO root, `/neo/transactions/IW31/` returns the registry. */
export function parentOf(path: string): ParentRef {
  const p = path.endsWith("/") ? path : `${path}/`;
  for (const [prefix, parent] of PARENTS) {
    if (!p.startsWith(prefix)) continue;
    if (p === parent.href) continue;      // a page is not its own parent
    return parent;
  }
  return NEO_ROOT;
}
