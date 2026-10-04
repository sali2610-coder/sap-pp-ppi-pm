import test from "node:test";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

test("universal search reaches canonical catalogs and the complete Academy without a result ceiling", () => {
  execFileSync(process.execPath, ["--experimental-strip-types", "--no-warnings", "--loader", "./scripts/alias-loader.mjs", "--input-type=module", "-e", `
    import assert from 'node:assert/strict';
    import {shellData} from './components/neo-shell/nav-data.ts';
    import {commandIndex} from './components/neo-shell/search/command-index.ts';
    import {contentIndex} from './components/neo-shell/search/content-index.ts';
    import {buildIndex, runQuery, normalizeSearch, suggestQueries} from './components/neo-shell/search/build.ts';
    import {academyData} from './components/neo-shell/learn/academy-data.ts';
    import {sourceChapters, sourceNodes, sourceHref} from './components/neo-shell/learn/source-data.ts';
    import {registryCodes} from './lib/tx-registry.ts';
    import {bapiDir} from './components/neo-shell/reference/bapi-data.ts';
    import {allBookIds,getBook} from './lib/library/registry.ts';
    import {neoChapterHref,neoSectionHref} from './components/neo-shell/books/links.ts';
    import {ALL_TABLES} from './data/sapData.ts';
    const content = contentIndex();
    const index = buildIndex(shellData(), commandIndex(), content);
    assert.equal(new Set(index.map(r => r.id)).size, index.length, 'unique result identities');
    for (const r of index) if (r.href) assert.ok(r.href.startsWith('/neo/'), r.href);
    for (const code of registryCodes()) assert.ok(runQuery(index, code, 'tcode').flat.some(r => r.title === code && r.href), code);
    for (const t of ALL_TABLES) assert.ok(runQuery(index, t.tableName, 'table').flat.some(r => r.title === t.tableName && r.href), t.tableName);
    const byHref = new Set(index.filter(r => r.href).map(r => r.href));
    for (const r of bapiDir().rows) assert.ok(byHref.has(r.href), r.name);
    for (const id of allBookIds()) {
      assert.ok(byHref.has('/neo/books/' + id + '/'), id);
      for (const ch of getBook(id).chapters) {
        assert.ok(byHref.has(neoChapterHref(id,ch.n)), id + ':' + ch.n);
        for (const section of ch.sections) assert.ok(byHref.has(neoSectionHref(id,section.id)), id + ':' + section.id);
      }
    }
    for (const c of academyData().courses) {
      assert.ok(byHref.has(c.href));
      for (const ch of c.chapters) for (const l of ch.lessons) if (l.hasLesson) assert.ok(byHref.has(l.href), l.slug);
      for (const ch of sourceChapters(c.id)) {
        assert.ok(byHref.has(sourceHref(c.id, ch.n)));
        for (const n of sourceNodes(ch.subchapters)) assert.ok(byHref.has(sourceHref(c.id, ch.n, n.id)), n.id);
      }
    }
    assert.equal(index.filter(r => r.k === 'lesson').length, 460);
    assert.equal(index.filter(r => r.k === 'source').length, 108 + 2236);
    for (const q of ['i', 'א', 'E', '/', 'IW31', 'F.01', '/UI2/INVAL_CACHES', 'עץ מוצר']) assert.ok(runQuery(index, q, null).total > 0, q);
    const first = runQuery(index, '', 'tcode');
    const all = runQuery(index, '', 'tcode', null, index.length);
    assert.equal(first.flat.length, 60);
    assert.equal(all.flat.length, all.total);
    assert.ok(all.total > first.flat.length);
    const filtered = runQuery(index, 'i', 'tcode', null, index.length);
    assert.equal(filtered.flat.length, filtered.total);
    assert.equal(normalizeSearch('שָׁלוֹם'), 'שלום');
    assert.equal(runQuery(index, 'EQIU', 'table').total, 0);
    assert.ok(suggestQueries(index.filter(r => r.k === 'table'), 'eqiu').includes('EQUI'));
    assert.equal(runQuery(index, 'EQUI', 'table').flat[0].title, 'EQUI');
    for (const q of ['i','א','EQUI','עץ מוצר','zz-no-real-record-zz']) {
      const started = performance.now();
      for (let n=0;n<20;n++) runQuery(index,q,null);
      console.log(q + ': mean ' + ((performance.now()-started)/20).toFixed(2) + 'ms');
    }
    console.log(JSON.stringify({records:index.length,content:content.length,courses:8,lessons:460,sourceTopics:2236}));
  `], { cwd: fileURLToPath(new URL("..", import.meta.url)), encoding: "utf8", timeout: 120_000, stdio: "pipe" });
});
