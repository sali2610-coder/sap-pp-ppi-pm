// app/tailwind-sources.css keeps the pre-NEO sources out of the shared
// stylesheet's Tailwind scan. It is generated from the import graph of every
// page still served; if a served page starts importing a module the list
// excludes, that module's classes would silently stop being generated. The
// generator's --check mode recomputes the list and fails on any difference.
import test from "node:test";
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");

test("the Tailwind exclusion list matches what the served pages import", () => {
  const r = spawnSync(process.execPath, [path.join(ROOT, "scripts", "gen-tailwind-sources.mjs"), "--check"], { encoding: "utf8" });
  assert.equal(r.status, 0, r.stderr || r.stdout);
});
