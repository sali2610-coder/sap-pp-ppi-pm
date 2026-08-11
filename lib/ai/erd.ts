/**
 * Entity-relationship diagrams, with real cardinality.
 *
 * The graph renderer could already draw boxes joined by lines, which is why an
 * ERD looked "supported". It was not: a line says two tables are related and
 * nothing more. Whether one material has many plants, or exactly one, or none —
 * the thing an ERD exists to state — was absent.
 *
 * So cardinality is the point of this parser, not decoration. Crow's foot is
 * used because it is what database tooling and SAP data models actually use,
 * and because the notation is readable at a glance rather than needing a key.
 *
 * Syntax follows Mermaid's erDiagram, so a model that knows it emits the right
 * thing without further instruction:
 *
 *   erDiagram
 *     MARA ||--o{ MARC : "has plant data"
 *     MARC }o--|| T001W : "belongs to"
 *     MARA {
 *       MATNR CHAR18 PK
 *       MTART CHAR4
 *     }
 */

/** One end of a relationship. Crow's foot has exactly four. */
export type Cardinality = "one" | "zero-or-one" | "zero-or-many" | "one-or-many";

export interface ErdAttribute {
  name: string;
  type?: string;
  /** Primary key. Rendered first and marked. */
  pk?: boolean;
  /** Foreign key. */
  fk?: boolean;
}

export interface ErdEntity {
  name: string;
  attributes: ErdAttribute[];
}

export interface ErdRelation {
  from: string;
  to: string;
  fromCard: Cardinality;
  toCard: Cardinality;
  label?: string;
  /** A dashed line means a non-identifying relationship, as in Mermaid. */
  identifying: boolean;
}

export interface Erd {
  kind: "erd";
  title?: string;
  entities: ErdEntity[];
  relations: ErdRelation[];
}

/**
 * Mermaid writes cardinality as a two-character token whose ORIENTATION differs
 * per side: `||--o{` is "exactly one" on the left, "zero or many" on the right.
 * Both spellings are accepted for each meaning so a mirrored token still reads
 * correctly rather than falling through to a default.
 */
const CARD: Record<string, Cardinality> = {
  "||": "one",
  "|o": "zero-or-one", "o|": "zero-or-one",
  "}o": "zero-or-many", "o{": "zero-or-many",
  "}|": "one-or-many", "|{": "one-or-many",
};

const clean = (s: string) => s.trim().replace(/^["']|["']$/g, "").trim();

/** `MARA ||--o{ MARC : "label"` */
const REL = /^([A-Za-z0-9_/]+)\s*(\|\||\|o|o\||\}o|o\{|\}\||\|\{)\s*(--|\.\.)\s*(\|\||\|o|o\||\}o|o\{|\}\||\|\{)\s*([A-Za-z0-9_/]+)\s*(?::\s*(.*))?$/;

/** `MATNR CHAR18 PK` — type and key markers are both optional. */
const ATTR = /^([A-Za-z0-9_/]+)(?:\s+([A-Za-z0-9_(),]+))?((?:\s+(?:PK|FK|UK))*)\s*(?:"[^"]*")?\s*$/i;

/**
 * @returns the diagram, or null when the source is not an ERD. Never throws — a
 *          malformed diagram must degrade to source, not take a page down.
 */
export function parseErd(src: string): Erd | null {
  const lines = src.split("\n").map((l) => l.trim()).filter(Boolean);
  if (!lines.length || !/^erd(iagram)?\b/i.test(lines[0])) return null;

  let title: string | undefined;
  const entities = new Map<string, ErdEntity>();
  const relations: ErdRelation[] = [];

  const ensure = (name: string) => {
    const key = name.trim();
    if (!entities.has(key)) entities.set(key, { name: key, attributes: [] });
    return entities.get(key)!;
  };

  let openEntity: ErdEntity | null = null;

  for (const raw of lines.slice(1)) {
    const t = raw.match(/^title\s+(.+)$/i);
    if (t) { title = clean(t[1]); continue; }

    // Closing an attribute block.
    if (openEntity && /^\}/.test(raw)) { openEntity = null; continue; }

    // Inside an attribute block.
    if (openEntity) {
      const a = raw.match(ATTR);
      if (a) {
        const flags = (a[3] || "").toUpperCase();
        openEntity.attributes.push({
          name: a[1],
          type: a[2] || undefined,
          pk: flags.includes("PK") || undefined,
          fk: flags.includes("FK") || undefined,
        });
      }
      continue;
    }

    // `ENTITY {` opens an attribute block.
    const open = raw.match(/^([A-Za-z0-9_/]+)\s*\{$/);
    if (open) { openEntity = ensure(open[1]); continue; }

    const r = raw.match(REL);
    if (r) {
      const [, from, fc, line, tc, to, label] = r;
      ensure(from); ensure(to);
      relations.push({
        from, to,
        // The token nearest an entity describes THAT entity's side.
        fromCard: CARD[fc] ?? "one",
        toCard: CARD[tc] ?? "one",
        label: label ? clean(label) : undefined,
        identifying: line === "--",
      });
    }
  }

  // An ERD with no relationship is a list of tables, which the reader already
  // has elsewhere. Two entities and one relation is the minimum that says
  // something a table list does not.
  if (entities.size < 2 || !relations.length) return null;

  return { kind: "erd", title, entities: [...entities.values()], relations };
}

/** Hebrew wording for each cardinality, for labels and screen readers. */
export const CARD_HE: Record<Cardinality, string> = {
  "one": "בדיוק אחד",
  "zero-or-one": "אפס או אחד",
  "zero-or-many": "אפס או יותר",
  "one-or-many": "אחד או יותר",
};

/** Compact notation, for a legend: 1, 0..1, 0..N, 1..N */
export const CARD_SHORT: Record<Cardinality, string> = {
  "one": "1",
  "zero-or-one": "0..1",
  "zero-or-many": "0..N",
  "one-or-many": "1..N",
};

export function isErdFence(text: string, lang?: string): boolean {
  if (lang && /^erd?(iagram)?$/i.test(lang)) return true;
  return /^\s*erd(iagram)?\b/im.test(text);
}
