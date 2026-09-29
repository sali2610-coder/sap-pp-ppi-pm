// Every name the object registry generates a page for must resolve to a view
// (knowledge gate 2, finding 19): 27 mixed-case HR/BW names (EC_Position,
// BEx_Query) used to render "not found" because the lookup upper-cased them.
import "./app-modules.mjs";
import test from "node:test";
import assert from "node:assert/strict";

const { objectNames, hasObjectPage } = await import("../components/neo-shell/object/object-names.ts");
const { objectView } = await import("../components/neo-shell/object/object-data.ts");
const { auxView } = await import("../components/neo-shell/object/object-aux.ts");

test("every generated object page has a view", () => {
  const unresolved = objectNames().filter((n: string) => !objectView(n) && !auxView(n));
  assert.deepEqual(unresolved, []);
});

test("a mixed-case registry name resolves in any case", () => {
  const mixed = objectNames().filter((n: string) => n !== n.toUpperCase());
  assert.ok(mixed.length > 0, "the registry still carries mixed-case names");
  for (const n of mixed) {
    assert.ok(hasObjectPage(n.toUpperCase()), n);
    assert.equal(auxView(n.toUpperCase())?.name, n, n);
  }
});
