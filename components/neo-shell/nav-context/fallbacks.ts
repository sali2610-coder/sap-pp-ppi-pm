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
 *  transactions registry rather than to the NEO root.
 *
 *  EVERY href here is a route the export really generates: the one-segment hubs
 *  come from app/neo/[hub]/generateStaticParams (NEO_HUBS), and the four
 *  hand-written directories — /neo/tables/, /neo/transactions/, /neo/erd/,
 *  /neo/books/ — have their own page.tsx. A fallback that pointed at a page
 *  nobody generates would be a dead link the moment the session forgot its
 *  origin, which is precisely the case this file exists to cover. */
const PARENTS: [prefix: string, parent: ParentRef][] = [
  // --- reference directories and the detail pages that hang off them -------
  ["/neo/transactions/", { href: "/neo/transactions/", label: "טרנזקציות" }],
  ["/neo/tables/", { href: "/neo/tables/", label: "טבלאות" }],
  // An object page is the deep face of a dictionary table, so its parent is the
  // table's own detail page family — /neo/tables/ is the honest landing when the
  // session has no memory of which one.
  ["/neo/object/", { href: "/neo/tables/", label: "טבלאות" }],
  ["/neo/erd/", { href: "/neo/erd/", label: "מודל הנתונים" }],
  ["/neo/cds/", { href: "/neo/cds/", label: "תצוגות CDS" }],
  ["/neo/bapi/", { href: "/neo/bapi/", label: "מרשם BAPI ו-FM" }],
  ["/neo/idoc/", { href: "/neo/idoc/", label: "מרשם ה-IDoc" }],
  ["/neo/fiori-apps/", { href: "/neo/fiori-apps/", label: "אפליקציות Fiori" }],
  ["/neo/enhancements/", { href: "/neo/enhancements/", label: "Enhancements" }],
  // --- library and learning -----------------------------------------------
  ["/neo/books/", { href: "/neo/books/", label: "מדף הספרים" }],
  ["/neo/library/", { href: "/neo/library/", label: "ספרייה דיגיטלית" }],
  ["/neo/academy/", { href: "/neo/academy/", label: "SAP Academy" }],
  ["/neo/knowledge/", { href: "/neo/knowledge/", label: "מרכז הידע" }],
  ["/neo/incidents/", { href: "/neo/incidents/", label: "תקלות" }],
  ["/neo/certification/", { href: "/neo/certification/", label: "הסמכה" }],
  // --- modules --------------------------------------------------------------
  ["/neo/pm/", { href: "/neo/pm/", label: "אחזקה · PM" }],
  ["/neo/pp-pi/", { href: "/neo/pp-pi/", label: "ייצור · PP-PI" }],
  // --- tools and assistant ---------------------------------------------------
  ["/neo/studio/", { href: "/neo/studio/", label: "Architecture Studio" }],
  ["/neo/chat/", { href: "/neo/chat/", label: "צ׳אט AI" }],
  ["/neo/ai/", { href: "/neo/ai/", label: "שאל את הספרייה" }],
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
