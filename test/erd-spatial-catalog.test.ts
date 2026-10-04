import test from "node:test";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

test("production spatial renderer preserves Astra's complete real catalogue and module joins", () => {
  execFileSync(process.execPath, ["--experimental-strip-types", "--no-warnings", "--loader", "./scripts/alias-loader.mjs", "--input-type=module", "-e", `
    import assert from 'node:assert/strict';
    import {erdCatalog} from './components/neo-shell/erd/erd-catalog.ts';
    import {diagram,groupsFor,stagesFor} from './components/neo-shell/erd/erd-spatial-diagram.ts';
    const data=erdCatalog(),before=JSON.stringify(data);
    const view={module:null,selected:null,focus:false,motion:false,orbit:false,links:true,preset:'perspective',analysis:'map'};
    assert.deepEqual([...diagram(data,view).points.keys()].sort(),data.tables.map(t=>t.n).sort());
    for(const m of data.modules) {
      const map=diagram(data,{...view,module:m.code});
      assert.deepEqual([...map.points.keys()].sort(),[...m.core].sort(),m.code);
      assert.deepEqual(map.edges.map(e=>e.i).sort(),data.edges.filter(e=>m.core.includes(e.p)&&m.core.includes(e.c)).map(e=>e.i).sort(),m.code);
      for(const point of map.points.values()) assert.ok(Number.isFinite(point.x)&&Number.isFinite(point.y));
      for(const group of [...groupsFor(data,m.code),...stagesFor(data,m.code)])
        for(const name of group.names) assert.ok(m.core.includes(name)&&data.tables.some(t=>t.n===name));
    }
    assert.equal(JSON.stringify(data),before,'presentation may not mutate any source fact');
  `], { cwd: fileURLToPath(new URL("..", import.meta.url)), encoding: "utf8", timeout: 60_000 });
});
