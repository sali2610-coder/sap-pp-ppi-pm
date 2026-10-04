// The blueprint's free-text T-code column has one tokenisation for every
// surface (lib/tcode-split.ts). Without ";" the code before it was dropped:
// 20 of PM's 110, e.g. IW41 ("IW41; IW42") and BP ("BP; (ECC: XK01/MK01 ...)").
import "./app-modules.mjs";
import test from "node:test";
import assert from "node:assert/strict";
import { splitTcodes } from "../lib/tcode-split.ts";

const { PM_DATA } = await import("../data/sapData.ts");
const { transactions } = await import("../lib/module-portal.ts");

test("a semicolon separates codes, and a note in brackets yields only its codes", () => {
  assert.deepEqual(splitTcodes("IW41; IW42"), ["IW41", "IW42"]);
  assert.deepEqual(splitTcodes("BP; (ECC: XK01/MK01 לספקים)"), ["BP", "XK01", "MK01"]);
  assert.deepEqual(splitTcodes("CFC1/CFC2/CFC3, CFM1"), ["CFC1", "CFC2", "CFC3", "CFM1"]);
});

test("PM's transaction list counts every code its blueprint cells name", () => {
  const codes = transactions(PM_DATA).map((t) => t.code);
  for (const c of ["IW41", "BP", "IL03", "ME51N", "SARA"]) assert.ok(codes.includes(c), `${c} missing`);
  assert.equal(codes.length, 110);
});
