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
  | "object"
  | "field"
  | "tcode"
  | "bapi"
  | "func"
  | "idoc"
  | "cds"
  | "fiori"
  | "enh"
  | "book"
  | "chapter"
  | "flow"
  | "guide"
  | "center"
  | "topic"
  | "bp"
  | "incident";

/** A record the rail's own `ShellData.search` index does not carry, produced at
 *  build time by search/command-index.ts. Short keys: this payload is inlined
 *  into the HTML of every page in the namespace. */
export interface CmdExtraRecord {
  k: "chapter" | "flow" | "guide" | "bp" | "book" | "enh" | "object" | "center" | "topic";
  /** Title — always a real title from the dataset. */
  t: string;
  /** Short context — the Hebrew line the dataset already carries. */
  s: string;
  href: string | null;
  /** Module identity, only when the source record really declares one. */
  mod?: string;
  /** Relationship line, only when the source record really has one. */
  rel?: string;
  /** 1 when the title is a SAP identifier (mono, LTR-isolated). */
  m?: 1;
  /** Canonical S/4HANA status key, when the record's page renders one. */
  st?: string;
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
 *  there are ~500 of them and this payload is inlined into the HTML of every
 *  page in the namespace, so repeating five key names 500 times is not free.
 *  [technical name, Hebrew name, owning table, type+length]. */
export type CmdFieldTuple = [string, string, string, string];

/** One transaction, as a tuple (1,818 of them, so the same reasoning as fields):
 *  [code, the registry's Hebrew line, index into `txMods`, index into `txSts`
 *  (-1: no status), the tables it is documented on ("" when none), page (1|0)].
 *  The page flag stands for `/neo/transactions/<code>/`, and it is 1 only when
 *  that route generates the code (search/command-index.ts, gated by ref-links). */
export type CmdTxTuple = [string, string, number, number, string, number];

/** One function object with a page of its own: [clean identifier, Hebrew line,
 *  modules, canonical status key, destination (/neo/bapi/… or /neo/idoc/…),
 *  the blueprint table it is documented on ("" when none), and the page's own
 *  class word when it is neither a BAPI nor a function module ("מושג תהליכי")]. */
export type CmdFnTuple = [string, string, string, string, string, string, string?];

/** Every transaction the project knows (the registry /neo/transactions is
 *  generated from, plus the blueprint codes that have no page). Served apart,
 *  as the static file /neo/search-tx.json, and fetched once per visit: inline,
 *  its ~24 KB gzip rode in the HTML of every page (gate 6, major 9). */
export interface CommandTx {
  txs: CmdTxTuple[];
  txMods: string[];
  txSts: string[];
}

/** The build-time supplement handed to the client shell. It carries ONLY what
 *  ShellData cannot already answer — never a second copy of the same records. */
export interface CommandExtra {
  recs: CmdExtraRecord[];
  /** The modules the project documents. Two of them, and both are real. */
  mods: CmdModuleRecord[];
  /** Every dictionary field, with the table that owns it. */
  fields: CmdFieldTuple[];
  /** Every BAPI, function module and IDoc message type with a page, one row per
   *  page (gate 6, major 11). */
  fns: CmdFnTuple[];
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
  /** Families with pages that the index does not carry. Stated in the UI
   *  instead of being left for the reader to notice. */
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
  /** The canonical S/4HANA status key of the record, when it has one — drawn
   *  as the same pill its page renders (design audit ACC-3). */
  st?: string;
  /** The record's own class word when its page names one other than its
   *  family's (a process concept kept on a /neo/bapi page). */
  kindHe?: string;
  /** Lowercased title. Built once on the client, never shipped. */
  lt: string;
  /** Lowercased everything else (context, relationship, module). */
  hay: string;
  /** The title and the context with Hebrew forms folded (search/hebrew.ts),
   *  space-padded so a word start is " " + token. Built once on the client. */
  nt: string;
  nh: string;
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
  /** What the keyboard reaches after the rows when the family has more:
   *  "all" narrows the surface to this family, "next" shows the next page of
   *  it. Absent when every match is already listed. */
  more?: "all" | "next";
}

/** One stop of the keyboard walk: a record, or the "more" row that ends a
 *  section. Both are options of the listbox, so nothing interactive sits
 *  outside the list the arrow keys walk (gate 6, blocker 7). */
export type CmdItem =
  | { rec: CmdRecord; more?: undefined }
  | { rec?: undefined; more: CmdKind; next: boolean; total: number; shown: number };
