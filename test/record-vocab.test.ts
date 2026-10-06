// The record pages (2026-10) draw from shared vocabularies. Three things this
// round fixed must stay fixed: every S/4HANA dimension a work topic records is
// drawn (the page showed two of eight); the incident impact dots carry no
// violet; and a code written "IWO10009 verify SE93" reads as the code plus the
// transaction to verify it in.
import test from "node:test";
import { execFileSync } from "node:child_process";

test("every S/4HANA dimension a work topic records has a row on its page", () => {
  execFileSync(process.execPath, ["--experimental-strip-types", "--no-warnings", "--loader", "./scripts/alias-loader.mjs", "--input-type=module", "-e", `
    import assert from 'node:assert/strict';
    import { CENTER_FAMILIES, CENTER_S4_ROWS } from './components/neo-shell/centers/centers-data.ts';
    const drawn = new Set(CENTER_S4_ROWS.map((r) => r.key));
    let items = 0;
    for (const f of CENTER_FAMILIES) for (const it of f.items) {
      items++;
      for (const [k, v] of Object.entries(it.eccS4 ?? {})) if (v) assert.ok(drawn.has(k), it.slug + ': ' + k + ' is recorded but not drawn');
    }
    assert.ok(items > 80);
  `], { stdio: "inherit" });
});

test("incident impact dots carry no violet, and verify-codes split into code and place", () => {
  execFileSync(process.execPath, ["--experimental-strip-types", "--no-warnings", "--input-type=module", "-e", `
    import assert from 'node:assert/strict';
    import { IMPACT_DOT, IMPACT_HE, impactDot, splitCode } from './components/neo-shell/learn/incident-vocab.ts';
    for (const [k, v] of Object.entries(IMPACT_DOT)) assert.ok(!v.includes('--status-tested'), k + ' is violet');
    assert.deepEqual(Object.keys(IMPACT_DOT).sort(), Object.keys(IMPACT_HE).sort());
    assert.equal(impactDot('UNKNOWN TAG'), 'var(--status-not-started)');
    assert.deepEqual(splitCode('IWO10009 verify SE93'), { code: 'IWO10009', at: 'SE93' });
    assert.deepEqual(splitCode('CO_RU verify se18'), { code: 'CO_RU', at: 'SE18' });
    assert.deepEqual(splitCode('IW32'), { code: 'IW32', at: '' });
    assert.deepEqual(splitCode('C2 144 verify SE91'), { code: 'C2 144', at: 'SE91' });
  `], { stdio: "inherit" });
});
