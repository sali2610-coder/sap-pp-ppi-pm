// The canvas label floor (P0, 2026-10-01): a label is drawn only at a zoom where
// it reads at 12px or more, and a slash-joined run gets a break opportunity
// without gaining a character.
import test from "node:test";
import assert from "node:assert/strict";
import { lodBand } from "../components/neo-shell/erd/graph.ts";
import { slashBreaks } from "../components/neo-shell/lang.ts";

test("every band keeps its labels at 12px or more", () => {
  // the smallest label each band draws, in picture px (erd.css)
  const smallest = { "0": Infinity, "1": 32, "2": 16, "3": 15, "4": 12 } as const;
  for (let k = 0.05; k <= 2.5; k += 0.005) {
    const band = lodBand(k);
    assert.ok(smallest[band] * k >= 12 - 1e-9, `k=${k.toFixed(3)} band ${band} draws ${smallest[band]}px at ${(smallest[band] * k).toFixed(2)}px`);
  }
});

test("the bands are the documented thresholds", () => {
  assert.equal(lodBand(0.374), "0");
  assert.equal(lodBand(0.375), "1");
  assert.equal(lodBand(0.75), "2");
  assert.equal(lodBand(0.8), "3");
  assert.equal(lodBand(1), "4");
});

test("slashBreaks adds a <wbr> after every slash and nothing else", () => {
  assert.equal(slashBreaks("ללא לוכסן"), "ללא לוכסן");
  assert.equal(slashBreaks(""), "");
  assert.equal(slashBreaks(null), null);
  const out = slashBreaks("items/causes/tasks") as unknown[];
  assert.ok(Array.isArray(out));
  const text = out.map((p) => (typeof p === "string" ? p : "")).join("");
  assert.equal(text, "items/causes/tasks", "the text itself is unchanged");
  const wbr = out.filter((p) => typeof p === "object" && p !== null && (p as { type?: unknown }).type === "wbr");
  assert.equal(wbr.length, 2);
});
