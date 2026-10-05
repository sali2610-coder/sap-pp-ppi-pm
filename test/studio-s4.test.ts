// Architecture Studio's S/4HANA verdict is the blueprint's own, read through
// lib/s4-class.ts like every other surface. It used to be "has an alternative
// table => replaced", and the PM blueprint fills that column on every table,
// so EQUI ("EQUI (זהה)", "ללא שינוי במודל הנתונים") was drawn as replaced.
import test from "node:test";
import { execFileSync } from "node:child_process";

test("every Studio table takes its verdict from s4ClassOf, and an undecided row gets none", () => {
  execFileSync(process.execPath, ["--experimental-strip-types", "--no-warnings", "--loader", "./scripts/alias-loader.mjs", "--input-type=module", "-e", `
    import assert from 'node:assert/strict';
    import { buildHetero } from './lib/studio-graph.ts';
    import { s4ClassOf } from './lib/s4-class.ts';
    import { ALL_TABLES } from './data/sapData.ts';
    const want = (k) => k === 2 ? 'replaced' : k === 3 ? 'removed' : k === 0 || k === 1 ? 'kept' : undefined;
    for (const m of ['PM', 'PP-PI']) {
      const h = buildHetero(m);
      for (const [id, n] of h.nodes) {
        if (n.kind !== 'table') continue;
        const t = ALL_TABLES.find((x) => x.module === m && x.tableName === id);
        // a table the graph reaches but the module's blueprint does not list
        // (VEKP, VEPO in PP-PI) has no row to decide it, so no verdict
        if (!t) { assert.equal(n.s4, undefined, m + ' ' + id); assert.equal(n.s4k, undefined, m + ' ' + id); continue; }
        assert.equal(n.s4, want(s4ClassOf(t)), m + ' ' + id);
        // the class itself travels too, so "מותאם" is never drawn as "ללא שינוי"
        assert.equal(n.s4k, s4ClassOf(t) ?? undefined, m + ' ' + id);
      }
    }
    assert.equal(buildHetero('PM').nodes.get('EQUI').s4, 'kept');
    assert.equal(buildHetero('PM').nodes.get('BUT000').s4, 'replaced');
  `], { stdio: "inherit" });
});
