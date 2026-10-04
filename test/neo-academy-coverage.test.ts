import test from "node:test";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

test("NEO retains every lesson and progress block while resolving real code and related-lesson destinations", () => {
  execFileSync(process.execPath, ["--experimental-strip-types", "--no-warnings", "--loader", "./scripts/alias-loader.mjs", "--input-type=module", "-e", `
    import assert from 'node:assert/strict';
    import {ALL_LESSONS} from './data/academy/lessons/index.ts';
    import {orderedBlocks} from './lib/academy/lesson-types.ts';
    import {neoLessonParams,neoLessonData} from './components/neo-shell/learn/lesson-data.ts';
    import {neoHrefOf,neoCodeHref} from './components/neo-shell/learn/lesson-neo-links.ts';
    import {academyData} from './components/neo-shell/learn/academy-data.ts';
    const strip = v => Array.isArray(v) ? v.map(strip) : v && typeof v === 'object'
      ? Object.fromEntries(Object.entries(v).filter(([k])=>k!=='href').map(([k,x])=>[k,strip(x)])) : v;
    const params = neoLessonParams();
    assert.equal(params.length, Object.keys(ALL_LESSONS).length);
    let links = 0;
    for (const p of params) {
      const d = neoLessonData(p.courseId,p.slug);
      assert.deepEqual(strip(d.lesson),strip(ALL_LESSONS[p.slug]),p.slug);
      assert.deepEqual(orderedBlocks(d.lesson).map(b=>b.kind),orderedBlocks(ALL_LESSONS[p.slug]).map(b=>b.kind));
      const walk = v => {
        if (!v || typeof v !== 'object') return;
        if (v.href?.startsWith('/')) { assert.ok(v.href.startsWith('/neo/'),v.href); links++; }
        for (const x of Object.values(v)) walk(x);
      }; walk(d.lesson);
    }
    assert.ok(links > 3000, 'all existing destinations must remain connected');
    for (const [course,slug,code,kind] of [['pm-user','pmu-1-1','IW21','tcodes'],['mm','mm-1-1','EBAN','tables'],['wm','wm-1-1','/SCWM/MON','tcodes']]) {
      const d=neoLessonData(course,slug);
      const block=d.lesson.blocks.find(b=>b.kind===kind);
      const ref=(block.refs||block.rows).find(r=>r.code===code);
      assert.equal(ref.href,neoCodeHref(kind,code)); assert.ok(ref.href);
    }
    const p=params[0];
    assert.equal(neoHrefOf('/academy/lesson/'+p.slug+'/?q=one#nxs-tcodes'),'/neo/academy/'+p.courseId+'/'+p.slug+'/?q=one#nxs-tcodes');
    assert.equal(neoHrefOf('/tcode/%2FSCWM%2FMON/'),'/neo/transactions/%2FSCWM%2FMON/');
    assert.equal(neoCodeHref('tables','DELIBERATELY_UNKNOWN'),null);
    assert.equal(neoCodeHref('odata','IW21'),null);
    const courses=academyData().courses;
    for (const code of ['IW21','BAPI_PROCORD_CREATE','/SCWM/MON']) {
      assert.ok(courses.some(c=>c.hay.includes(code.toLowerCase())),code);
      assert.ok(courses.some(c=>c.chapters.some(ch=>ch.lessons.some(l=>l.codes.some(r=>r.code===code)&&l.href))),code);
    }
  `], { cwd: fileURLToPath(new URL("..", import.meta.url)), encoding: "utf8", timeout: 60_000 });
});

test("complete academy sources and migrated flow notes retain exact source identities and order", () => {
  execFileSync(process.execPath, ["--experimental-strip-types", "--no-warnings", "--loader", "./scripts/alias-loader.mjs", "--input-type=module", "-e", `
    import assert from 'node:assert/strict';
    import {BOOKS} from './data/library/academy-index.ts';
    import {sourceParams,sourceBook,sourceChapter,sourceIndex,sourceNodes,lessonSource} from './components/neo-shell/learn/source-data.ts';
    const params=sourceParams();
    assert.equal(params.length,BOOKS.reduce((s,b)=>s+Object.keys(b.data).length,0));
    const walk=n=>[n,...(n.children??[]).flatMap(walk)];
    for (const p of params) {
      const book=sourceBook(p.courseId);
      const original=Object.values(book.data).find(c=>String(c.n)===p.chapter);
      assert.equal(sourceChapter(p.courseId,p.chapter),original);
      const expected=original.subchapters.flatMap(walk);
      assert.deepEqual(sourceNodes(original.subchapters),expected);
      const index=sourceIndex(p.courseId).find(ch=>ch.n===original.n);
      assert.deepEqual(index.rows.map(r=>r.id),expected.map(n=>n.id));
      for (const root of original.subchapters) {
        if (['pm','pp-pi','qm'].includes(p.courseId)) continue;
        const slug=book.id+'-'+root.id.replaceAll('.','-');
        const supplement=lessonSource(p.courseId,slug);
        assert.ok(supplement,slug);
        assert.equal(supplement.intro,original.introHe);
        assert.deepEqual(supplement.flows.map(f=>f.steps),walk(root).filter(n=>n.flow?.length).map(n=>n.flow));
      }
    }
    assert.equal(sourceChapter('pm','999'),null);
    assert.equal(lessonSource('pm','pm-maintenance-order'),null);
    const example=lessonSource('pm-user','pmu-1-1');
    assert.ok(JSON.stringify(example).includes('מפעיל / חיישן'));
    assert.ok(JSON.stringify(example).includes('מקור לניתוח'));
  `], { cwd: fileURLToPath(new URL("..", import.meta.url)), encoding: "utf8", timeout: 60_000 });
});
