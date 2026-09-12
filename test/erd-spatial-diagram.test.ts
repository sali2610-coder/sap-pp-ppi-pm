import test from "node:test";
import assert from "node:assert/strict";
import { trace, stagesFor, diagram, CARD } from "../components/neo-shell/erd/erd-spatial-diagram.ts";
import type { ErdCatalog } from "../components/neo-shell/erd/erd-types.ts";
const data = {
  tables: ["A","B","C","D","E","UNLISTED"].map((n)=>({n,m:n==="E"?"PM":"PP",ms:["PP"]})),
  modules: [{code:"PP",core:["A","B","C","D","UNLISTED"],objects:[
    {he:"First",en:"First",t:["A","B","MISSING"]},
    {he:"Second",en:"Second",t:["B","C"]},
    {he:"Third",en:"Third",t:["D"]},
  ],pos:["A","B","C","D","UNLISTED"].map((n,i)=>({n,x:i*300,y:100}))}],
  edges:[{i:"ab",p:"A",c:"B"},{i:"bc",p:"B",c:"C"},{i:"cb",p:"C",c:"B"},{i:"ad",p:"A",c:"D"},{i:"ce",p:"C",c:"E"}],
  union:{pos:["A","B","C","D","E","UNLISTED"].map((n,i)=>({n,x:i*300,y:100}))},
} as unknown as ErdCatalog;

test("impact follows children through cycles and across modules, excluding siblings",()=>{
  assert.deepEqual([...trace(data,"B","impact")].sort(),["B","C","E"]);
  assert.deepEqual([...trace(data,"B","lineage")].sort(),["A","B","C"]);
  assert.deepEqual([...trace(data,"B","dep")].sort(),["A","B","C","E"]);
});
test("business stages preserve catalogue order without inventing missing or duplicate assignments",()=>{
  assert.deepEqual(stagesFor(data,"PP").map((s)=>s.names),[["A","B"],["C"],["D"]]);
  assert.deepEqual(stagesFor(data,null),[]);
});
test("flow keeps unassigned tables visible, fields clear of overlap, and only actual joins",()=>{
  const before=JSON.stringify(data);
  const d=diagram(data,{module:"PP",selected:null,focus:false,motion:true,orbit:false,links:true,preset:"perspective",analysis:"flow",step:0});
  assert.equal(d.points.size,5);
  assert.deepEqual(d.edges.map((e)=>e.i).sort(),["ab","ad","bc","cb"]);
  const entries=[...d.points];
  for(let i=0;i<entries.length;i++)for(let j=i+1;j<entries.length;j++){
    const a=entries[i][1],b=entries[j][1];
    assert.ok(Math.abs(a.x-b.x)>=CARD.w||Math.abs(a.y-b.y)>=CARD.h,`${entries[i][0]} overlaps ${entries[j][0]}`);
  }
  assert.equal(JSON.stringify(data),before);
});
test("an impact picture contains second-hop and cross-module targets with no unrelated table",()=>{
  const d=diagram(data,{module:"PP",selected:"B",focus:false,motion:false,orbit:false,links:true,preset:"perspective",analysis:"impact"});
  assert.deepEqual([...d.points.keys()].sort(),["B","C","E"]);
  assert.deepEqual(d.edges.map((e)=>e.i).sort(),["bc","cb","ce"]);
});
