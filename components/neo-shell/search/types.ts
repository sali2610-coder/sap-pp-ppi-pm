// Project NEO · the command surface — contract.
//
// Deliberately free of any `@/data/*` import, exactly like components/neo-shell/
// types.ts: both the build-time server index and the client surface import this
// file, so it must stay structural.

import type { ModuleKey } from "../types";

/** Every result family the command surface can render. One kind == one section,
 *  and a section only ever exists when the project data really backs it. */
export type CmdKind =
  | "nav"
  | "module"
  | "table"
  | "field"
  | "tcode"
  | "bapi"
  | "func"
  | "cds"
  | "fiori"
  | "book"
  | "chapter"
  | "flow"
  | "guide"
  | "incident";

/** A record the rail's own `ShellData.search` index does not carry, produced at
 *  build time by search/command-index.ts. Short keys: this payload is inlined
 *  into the HTML of every page in the namespace. */
export interface CmdExtraRecord {
  k: "chapter" | "flow" | "guide";
  /** Title — always a real title from the dataset. */
  t: string;
  /** Short context — the Hebrew line the dataset already carries. */
  s: string;
  href: string | null;
  /** Module identity, only when the source record really declares one. */
  mod?: string;
  /** Relationship line, only when the source record really has one. */
  rel?: string;
}

/** A module the project really documents, as a first-class search result. */
export interface CmdModuleRecord {
  /** Module key exactly as the dataset writes it — "PM", "PP-PI". */
  key: string;
  /** The navigation label the rail already uses for it. */
  label: string;
  /** Hebrew name. */
  he: string;
  href: string;
  /** Real counts, joined — never an estimate. */
  rel: string;
}

/** One dictionary FIELD, as a tuple. Tuples rather than objects on purpose:
 *  there are ~600 of them and this payload is inlined into the HTML of every
 *  page in the namespace, so repeating five key names 600 times is not free.
 *  [technical name, Hebrew name, owning table, type+length]. */
export type CmdFieldTuple = [string, string, string, string];

/** The build-time supplement handed to the client shell. It carries ONLY what
 *  ShellData cannot already answer — never a second copy of the same records. */
export interface CommandExtra {
  recs: CmdExtraRecord[];
  /** The modules the project documents. Two of them, and both are real. */
  mods: CmdModuleRecord[];
  /** Every dictionary field, with the table that owns it. */
  fields: CmdFieldTuple[];
  /** function / BAPI name -> [owning table, module, real destination or ""].
   *  Ownership is read from the same `t.funcs` lists the dictionary pages
   *  render; the destination is resolved at build time against the routes that
   *  are really generated, so a row never offers a link to a page that does not
   *  exist. */
  fn: Record<string, [string, string, string]>;
  /** transaction code -> [tables it appears on, modules, real destination]. */
  tx: Record<string, [string, string, string]>;
  /** Fiori app id -> its FULL resolved /neo/ destination, or "" when the build
   *  generates no page for it. Resolved on the server against the very set the
   *  route generates from, because this map used to carry a bare slug that the
   *  client turned into a LEGACY `/fiori-apps/<slug>/` href — sending a reader
   *  out of NEO from inside NEO's own command surface. */
  fiori: Record<string, string>;
  /** CDS view -> its FULL resolved /neo/ destination, or "" when there is none.
   *  Same reason: the client used to build `/cds/<view>/` by hand. */
  cds: Record<string, string>;
  /** functional-zone id -> Hebrew label (lib/studio-graph's own ZONES). */
  zone: Record<string, string>;
  /** Result families the client asked for that have NO build-time index in this
   *  stage. Stated in the UI instead of being filled with plausible rows. */
  gaps: { he: string; why: string }[];
}

/** One row in the command surface, after the client merges ShellData with the
 *  build-time supplement. Every optional field is absent — not blank, not
 *  guessed — when the dataset has no answer for it. */
export interface CmdRecord {
  id: string;
  k: CmdKind;
  title: string;
  /** true when the title is a SAP identifier: mono, LTR-isolated. */
  mono: boolean;
  sub: string;
  href: string | null;
  /** Module key, when the record's module is real. */
  mod?: ModuleKey | string;
  /** Relationship, when the dataset really has one ("PLKO · 1:N", "3 טבלאות"). */
  rel?: string;
  /** Object-class hue (`var(--obj-*)`) — visualisation encoding, tables only. */
  obj?: string;
  /** Object-class label in Hebrew. */
  objHe?: string;
  /** Table this row can load into the context shelf — the row's quick action. */
  ctx?: string;
  /** THE DESTINATION, printed on the row. It is the actual route Enter opens,
   *  not a description of it, so a reader can see where a result goes before
   *  committing to it. Absent when the project has no page for the record, in
   *  which case the row says so instead of pretending. */
  dest?: string;
  /** Lowercased title. Built once on the client, never shipped. */
  lt: string;
  /** Lowercased everything else (context, relationship, module). */
  hay: string;
}

/** A rendered section: one kind, its matches, and its real total. */
export interface CmdSection {
  k: CmdKind;
  he: string;
  icon: string;
  rows: CmdRecord[];
  total: number;
  /** The module most of this family's matches belong to — the section marker's
   *  hue. Absent when the family's records declare no module at all, in which
   *  case the section stays neutral rather than borrowing a colour. */
  mod?: string;
}
