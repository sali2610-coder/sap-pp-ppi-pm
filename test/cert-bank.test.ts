// The assessment banks: their size is a property of the data, not of the
// shuffle. The PM blueprint lists QMEL and AUFK twice, and a distractor draw
// from the raw pool could return one name twice; the question was then dropped
// and /neo/certification/ printed 618 or 619 depending on the run.
import test from "node:test";
import { execFileSync } from "node:child_process";

test("every bank builds to the same size on every run, and no question offers a choice twice", () => {
  execFileSync(process.execPath, ["--experimental-strip-types", "--no-warnings", "--loader", "./scripts/alias-loader.mjs", "--input-type=module", "-e", `
    import assert from 'node:assert/strict';
    import { buildBank } from './lib/cert/generate.ts';
    for (const m of ['PM', 'PP-PI', 'PP']) {
      const sizes = new Set();
      for (let i = 0; i < 12; i++) {
        const bank = buildBank(m);
        sizes.add(bank.length);
        for (const q of bank) {
          assert.equal(q.choices.length, 4, q.id);
          assert.equal(new Set(q.choices).size, 4, q.id + ' repeats a choice');
          assert.equal(q.choices[q.answer] !== undefined, true, q.id);
        }
      }
      assert.equal(sizes.size, 1, m + ' built to ' + [...sizes].join(' / '));
    }
  `], { stdio: "inherit" });
});
