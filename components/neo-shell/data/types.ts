// Project NEO · the Tables surface — contract.
//
// Deliberately free of any `@/data/*` import, exactly like components/neo-shell/
// types.ts. The build-time server builder (tables-data.ts) and the client
// surface (tables-surface.tsx) both import this file, so it has to stay
// structural — a client component that imported the dataset for a *type* would
// drag the whole knowledge base into the browser bundle.
//
// HONESTY. Every optional string is "" and every list is empty when the
// dictionary is silent about it. Nothing here is ever filled with a plausible
// value so a column can look complete; the surface prints "אין בנתונים" instead.

/** One relation the ER map really declares, from this table's point of view. */
export interface NeoRelRef {
  /** The related table. */
  table: string;
  /** Cardinality as the blueprint writes it ("1:N", "N:1"), or "". */
  card: string;
  /** Whether THIS table is the parent or the child of the relation. */
  role: "parent" | "child";
  /** true when the far end is itself a documented table with its own page. */
  known: boolean;
}

/** One row of the dictionary, deduplicated across the two modules exactly the
 *  way the production explorer does it (app/tables/page.tsx). */
export interface NeoTableRow {
  name: string;
  he: string;
  /** Real module membership. Two entries means the table is documented in both. */
  mods: string[];
  /** Blueprint topic titles the table is documented under. */
  topics: string[];
  /** Object-class hue as a `var(--obj-*)` reference — visualisation only. */
  obj: string;
  /** Functional-zone id and its Hebrew label, from lib/studio-graph. */
  zone: string;
  zoneHe: string;
  fields: number;
  /** Fields the blueprint marks as key. */
  keys: number;
  tcodes: string[];
  rels: NeoRelRef[];
  /** BAPIs / IDocs / FMs documented on the table. */
  funcs: number;
  /** CDS views the S/4 map really associates with the table. */
  cds: string[];
  /** Fiori app string as the blueprint writes it, or "". */
  fiori: string;
  /** S/4 gap note, replacement table and replacement transaction, or "". */
  s4: string;
  s4Alt: string;
  s4Tcode: string;
  /** SUM conversion note (PM blueprint only), or "". */
  sum: string;
  /** The table's own detail page — /neo/tables/<NAME>/ — or null when
   *  app/neo/tables/[name] does not generate one for this row.
   *
   *  A NULL IS NOT AN OVERSIGHT, IT IS THE CONTRACT. scripts/crawl-dead-links
   *  .mjs exits 1 on the first internal href in out/ with no page behind it, so
   *  a row the route did not generate must render as a VALUE and not as a link,
   *  and the surface does exactly that. The two lists agree today — the detail
   *  route generates from the same dictionary this builder reads — and this
   *  type is what keeps them agreeing if either ever narrows. */
  href: string | null;
  /** The deep object screen for the same table, on the same rule. */
  objHref: string | null;
  /** Lowercased haystack, built once at build time so the client never rebuilds
   *  it per keystroke. */
  hay: string;
}

export interface NeoFacet {
  id: string;
  he: string;
  n: number;
}

export interface NeoTablesData {
  rows: NeoTableRow[];
  /** Module facets with their real counts. */
  mods: NeoFacet[];
  /** Object-class facets — only zones that really occur. */
  zones: NeoFacet[];
  /** Blueprint topics, in dictionary order, with their real counts. */
  topics: NeoFacet[];
  totals: {
    tables: number;
    /** Rows that really have a generated detail page. Derived, never asserted:
     *  the surface prints this number rather than claiming "every row opens". */
    linked: number;
    fields: number;
    keys: number;
    rels: number;
    tcodes: number;
    shared: number;
    s4: number;
    cds: number;
    fiori: number;
  };
}
