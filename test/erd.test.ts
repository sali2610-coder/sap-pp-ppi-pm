import test from "node:test";
import assert from "node:assert/strict";
import { parseErd, isErdFence, CARD_SHORT } from "../lib/ai/erd.ts";

const SAMPLE = `erDiagram
  title מודל נתוני חומר
  MARA ||--o{ MARC : "מנוהל במפעל"
  MARC }o--|| T001W : "שייך למפעל"
  MARA {
    MATNR CHAR18 PK
    MTART CHAR4
    MEINS UNIT3
  }
  MARC {
    MATNR CHAR18 PK FK
    WERKS CHAR4 PK FK
  }`;

test("parses entities, relations and title", () => {
  const d = parseErd(SAMPLE)!;
  assert.ok(d);
  assert.equal(d.title, "מודל נתוני חומר");
  assert.deepEqual(d.entities.map((e) => e.name), ["MARA", "MARC", "T001W"]);
  assert.equal(d.relations.length, 2);
});

test("cardinality is read per side, not shared", () => {
  const d = parseErd(SAMPLE)!;
  // `MARA ||--o{ MARC` — exactly one MARA, zero or many MARC.
  assert.equal(d.relations[0].fromCard, "one");
  assert.equal(d.relations[0].toCard, "zero-or-many");
  // The mirrored spelling on the other line must read the same way.
  assert.equal(d.relations[1].fromCard, "zero-or-many");
  assert.equal(d.relations[1].toCard, "one");
});

test("every crow's foot token maps to a cardinality", () => {
  for (const [tok, expect] of [
    ["||", "one"], ["|o", "zero-or-one"], ["o|", "zero-or-one"],
    ["}o", "zero-or-many"], ["o{", "zero-or-many"],
    ["}|", "one-or-many"], ["|{", "one-or-many"],
  ] as const) {
    const d = parseErd(`erDiagram\n  A ${tok}--|| B : x`)!;
    assert.ok(d, `token ${tok} failed to parse`);
    assert.equal(d.relations[0].fromCard, expect, `token ${tok}`);
  }
});

test("attributes carry type and key flags", () => {
  const d = parseErd(SAMPLE)!;
  const mara = d.entities.find((e) => e.name === "MARA")!;
  assert.equal(mara.attributes.length, 3);
  assert.deepEqual(mara.attributes[0], { name: "MATNR", type: "CHAR18", pk: true, fk: undefined });
  assert.equal(mara.attributes[1].pk, undefined);

  // A column can be both — the classic composite key on a plant-level table.
  const marc = d.entities.find((e) => e.name === "MARC")!;
  assert.equal(marc.attributes[0].pk, true);
  assert.equal(marc.attributes[0].fk, true);
});

test("an entity named only in a relation still exists", () => {
  // T001W has no attribute block. It must still be drawn, or the relation
  // points at nothing.
  const d = parseErd(SAMPLE)!;
  const t = d.entities.find((e) => e.name === "T001W")!;
  assert.deepEqual(t.attributes, []);
});

test("dashed line means non-identifying", () => {
  const d = parseErd(`erDiagram\n  A ||..o{ B : soft`)!;
  assert.equal(d.relations[0].identifying, false);
  const d2 = parseErd(`erDiagram\n  A ||--o{ B : hard`)!;
  assert.equal(d2.relations[0].identifying, true);
});

test("labels are optional and unquoted", () => {
  const d = parseErd(`erDiagram\n  A ||--o{ B\n  B ||--o{ C : owns`)!;
  assert.equal(d.relations[0].label, undefined);
  assert.equal(d.relations[1].label, "owns");
});

test("rejects what is not an ERD", () => {
  assert.equal(parseErd("flowchart TD\n A --> B"), null);
  assert.equal(parseErd(""), null);
  // Entities with no relationship are a table list, which the reader already
  // has — not a diagram worth drawing.
  assert.equal(parseErd("erDiagram\n  MARA {\n    MATNR CHAR18 PK\n  }"), null);
});

test("never throws on malformed input", () => {
  for (const bad of [
    "erDiagram\n  }}}}",
    "erDiagram\n  A ||--",
    "erDiagram\n  {\n  }",
    "erDiagram\n  A {\n    \n  }\n  A ||--|| B : x",
    "erDiagram\n" + "  A ||--o{ B : x\n".repeat(500),
  ]) {
    assert.doesNotThrow(() => parseErd(bad));
  }
});

test("an unclosed attribute block does not swallow relations silently", () => {
  // Missing `}`. Everything after is read as attributes, so no relation is
  // found and the diagram is rejected rather than half-drawn.
  const d = parseErd(`erDiagram\n  A {\n    X CHAR1 PK\n  A ||--o{ B : x`);
  assert.equal(d, null);
});

test("fence detection", () => {
  assert.equal(isErdFence("", "erd"), true);
  assert.equal(isErdFence("", "erDiagram"), true);
  assert.equal(isErdFence("erDiagram\n A ||--|| B : x"), true);
  assert.equal(isErdFence("flowchart TD\n A --> B"), false);
});

test("the syntax the backend prompt teaches is the syntax this parses", () => {
  // Copied verbatim from the erd example in SYSTEM_PROMPT (sap-books-api,
  // lib/answer.mjs, rule 11). The two halves ship from different repos, so a
  // silent drift here means the model emits a fence the reader renders as a
  // code block — the feature disappears without any error. That has already
  // happened once with node provenance; this test is the guard.
  const FROM_PROMPT = `erDiagram
      MARA ||--o{ MARC : "מנוהל במפעל"
      MARA {
        MATNR CHAR18 PK
        MTART CHAR4
      }
      MARC {
        MATNR CHAR18 PK FK
        WERKS CHAR4 PK FK
      }`;
  const d = parseErd(FROM_PROMPT);
  assert.ok(d, "backend prompt teaches syntax the client cannot parse");
  assert.deepEqual(d.entities.map((e) => e.name), ["MARA", "MARC"]);
  assert.equal(d.relations[0].fromCard, "one");
  assert.equal(d.relations[0].toCard, "zero-or-many");
  assert.equal(d.relations[0].label, "מנוהל במפעל");
  const marc = d.entities[1];
  assert.equal(marc.attributes[0].pk, true);
  assert.equal(marc.attributes[0].fk, true);
});

test("short notation covers every cardinality", () => {
  assert.deepEqual(Object.values(CARD_SHORT).sort(), ["0..1", "0..N", "1", "1..N"]);
});
