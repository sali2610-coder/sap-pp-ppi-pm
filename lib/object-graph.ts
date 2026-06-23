// Central object-relationship resolver — the single place that connects ANY
// object to every layer of the platform (data model, S/4 simplification,
// migration object, BW, architecture, interfaces). Foundation for a future
// global object graph; today it powers the "Connected Object" panel so nothing
// is an isolated card. All links resolve to real, verified sources.

import { catalogByName } from "@/lib/s4-catalog";
import { S4_OBJECTS } from "@/data/s4-objects";
import { MIG_OBJECTS } from "@/data/migration-cockpit";
import { BW_TABLES } from "@/data/bw-module";

export interface ConnLink { label: string; sub?: string; href?: string }
export interface ObjectConnections {
  s4?: ConnLink;            // S/4 simplification / impact
  migration: ConnLink[];    // migration objects that load from this table
  bw: ConnLink[];           // BW objects sourced from this table
  interfaces: ConnLink[];   // IDoc / interface objects referencing it
  hasAny: boolean;
}

const U = (s: string) => s.toUpperCase();

export function objectConnections(name: string): ObjectConnections {
  const up = U(name);

  // S/4 simplification (from the unified catalog)
  const cat = catalogByName(name) || S4_OBJECTS.find((o) => U(o.name) === up || (o.replaces || []).some((r) => U(r) === up));
  const s4 = cat ? { label: cat.status === "removed" ? "בוטל ב-S/4" : cat.status === "replaced" ? "הוחלף ב-S/4" : cat.status === "changed" ? "השתנה ב-S/4" : "נשאר ב-S/4", sub: cat.s4 || cat.he, href: "/s4hana/" } : undefined;

  // migration objects whose source ECC tables include this table
  const migration = MIG_OBJECTS.filter((m) => m.ecc.some((t) => U(t) === up)).map((m) => ({ label: m.he, sub: `אובייקט הגירה · ${m.name}`, href: "/migration-cockpit/" }));

  // BW objects sourced from this table (cross-module relations)
  const bw = BW_TABLES.filter((b) => b.rel.some((r) => U(r.table) === up)).map((b) => ({ label: b.he, sub: `BW · ${b.name}`, href: "/sap-infrastructure/" }));

  // interfaces — IDoc objects referencing this table (from migration/IDoc heuristics + BW extractors)
  const interfaces: ConnLink[] = [];
  if (MIG_OBJECTS.some((m) => m.id === "matmas") && up === "MARA") interfaces.push({ label: "MATMAS (IDoc אב חומר)", sub: "ממשק הפצת אב חומר", href: "/idoc/" });

  return { s4, migration, bw, interfaces, hasAny: !!s4 || migration.length > 0 || bw.length > 0 || interfaces.length > 0 };
}
