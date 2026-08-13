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
  | "table"
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

/** The build-time supplement handed to the client shell. It carries ONLY what
 *  ShellData cannot already answer — never a second copy of the same records. */
export interface CommandExtra {
  recs: CmdExtraRecord[];
  /** function / BAPI name -> [owning table, module]. Real ownership, from the
   *  same `t.funcs` lists the dictionary pages render. */
  fn: Record<string, [string, string]>;
  /** transaction code -> [tables it appears on, modules]. */
  tx: Record<string, [string, string]>;
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
}
