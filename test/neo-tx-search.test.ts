import test from "node:test";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

// Exercise the actual server payload and client matcher together. Most unit
// tests need no alias loader; this integration explicitly uses the repo's
// existing loader so a catalog can never silently drop out of the palette.
test("every catalog transaction is searchable and opens its own NEO detail", () => {
  execFileSync(process.execPath, [
    "--experimental-strip-types", "--no-warnings", "--loader", "./scripts/alias-loader.mjs",
    "--input-type=module", "-e", `
      import assert from 'node:assert/strict';
      import {shellData} from './components/neo-shell/nav-data.ts';
      import {commandIndex} from './components/neo-shell/search/command-index.ts';
      import {buildIndex, runQuery} from './components/neo-shell/search/build.ts';
      import {registryCodes, registryRouteCodes, registryTx} from './lib/tx-registry.ts';
      import {txDetail} from './components/neo-shell/data/tx-detail.ts';
      const index = buildIndex(shellData(), commandIndex());
      const codes = registryCodes();
      for (const code of codes) {
        const rows = runQuery(index, code, 'tcode').flat;
        const href = '/neo/transactions/' + encodeURIComponent(code) + '/';
        assert.ok(rows.some(r => r.title === code && r.href === href), code);
      }
      const old = '/UI2/INVALIDATE_GLOBAL_CACHES';
      const code = '/UI2/INVAL_CACHES';
      const rows = runQuery(index, old, 'tcode').flat;
      assert.ok(rows.some(r => r.title === code && r.href === '/neo/transactions/' + encodeURIComponent(code) + '/'));
      assert.equal(index.filter(r => r.k === 'tcode' && r.title === old).length, 0);
      assert.equal(registryRouteCodes().length, codes.length + 1);
      assert.equal(registryTx(old).code, code);
      assert.deepEqual(txDetail(old), txDetail(code));
      for (const id of ['F.01', code]) {
        const evidence = txDetail(id).evidence;
        assert.equal(evidence.status.key, 'verification_required');
        assert.ok(evidence.needsVerification);
        assert.equal(evidence.sources.length, 1);
      }
    `,
  ], { cwd: fileURLToPath(new URL("..", import.meta.url)), encoding: "utf8", timeout: 60_000 });
});
