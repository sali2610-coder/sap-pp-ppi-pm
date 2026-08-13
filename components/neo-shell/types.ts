// Project NEO · Concept D — shell contract.
//
// Deliberately free of any `@/data/*` import. lib/module-portal.ts and the SAP
// datasets are pulled at module scope by their own dependencies, so a client
// component that imported them for a *type* would drag the whole knowledge base
// into the browser bundle — the exact reason components/knowledge-sidebar.tsx
// hand-copies its section list today. Everything below is plain structural
// types, so both the server builder and the client rail can import it freely.

export type RailMode = "expanded" | "compact" | "hidden" | "peek" | "search" | "context";
export type ShelfTab = "recent" | "pinned" | "context";
export type ModuleKey = "PM" | "PP-PI";

/** A single navigation destination. `count` is null when the project dataset
 *  does not back one — the rail then renders an explicit em-dash rather than a
 *  guessed number. Never fabricate a count to fill the column. */
export interface NavItem {
  id: string;
  href: string;
  label: string;
  icon: string;
  count: number | null;
  countLabel: string;
  mod?: ModuleKey;
  group: string;
}

export interface NavGroup {
  id: string;
  label: string;
  items: NavItem[];
}

/** Object-class hue, as a `var(--obj-*)` string. Visualisation surfaces only. */
export type ObjVar = string;

export interface PreviewTable {
  name: string;
  he: string;
  fields: number;
  obj: ObjVar;
}

export interface ModulePreview {
  kind: "module";
  label: string;
  he: string;
  mod: ModuleKey;
  nums: { value: number; label: string }[];
  tables: PreviewTable[];
  book: string | null;
}

export interface PlainPreview {
  kind: "plain";
  label: string;
  group: string;
  count: number | null;
  countLabel: string;
  sample: string[];
}

export type Preview = ModulePreview | PlainPreview;

/** Compact record for every table in the dictionary — lets the shelf resolve a
 *  name held in localStorage without shipping the full dataset. */
export interface ObjectMeta {
  name: string;
  he: string;
  mods: ModuleKey[];
  fields: number;
  obj: ObjVar;
  zone: string;
}

export interface CtxModuleContext {
  module: string;
  topic: string;
  tcodes: string;
}

export interface CtxRelation {
  table: string;
  card: string;
  join: string;
}

export interface ObjectContext {
  name: string;
  he: string;
  mods: ModuleKey[];
  shared: boolean;
  contexts: CtxModuleContext[];
  tcodes: string[];
  relations: CtxRelation[];
}

export type SearchKindId = "table" | "tcode" | "func" | "cds" | "fiori" | "book" | "incident";

export interface SearchRecord {
  k: SearchKindId;
  /** Title — a real SAP identifier or a real title. Rendered mono when `m`. */
  t: string;
  /** Subtitle — the Hebrew description that already exists in the dataset. */
  s: string;
  /** true when the title is a technical identifier (mono, LTR). */
  m: boolean;
  /** In-namespace destination for Stage 1, or null when the record is only a
   *  dictionary hit with no /neo page yet. */
  href: string | null;
  /** Table name this record can open in the context shelf, when applicable. */
  obj?: string;
}

/** Everything the shell needs, computed once at build time by the server
 *  layout and handed to the client rail as plain serialisable props. */
export interface ShellData {
  groups: NavGroup[];
  navItemCount: number;
  previews: Record<string, Preview>;
  objects: Record<string, ObjectMeta>;
  contexts: Record<string, ObjectContext>;
  search: SearchRecord[];
  /** Default object for the context shelf — the busiest table in the dictionary. */
  defaultContext: string;
}

/* --------------------------------------------------- per-page (hub) content */

export interface HubStat { value: number; label: string }

export interface HubTable {
  name: string;
  he: string;
  fields: number;
  /** Object-class hue as a `var(--obj-*)` reference. */
  obj: ObjVar;
  /** First real transaction on the table, or "" when the dataset has none. */
  tcode: string;
}

export interface HubContent {
  id: string;
  label: string;
  group: string;
  mod?: ModuleKey;
  lede: string;
  stats: HubStat[];
  tables: HubTable[];
  /** Real records with no dedicated Stage-1 surface yet — listed, not invented. */
  list: { t: string; s: string; m: boolean }[];
  listTitle: string;
}
