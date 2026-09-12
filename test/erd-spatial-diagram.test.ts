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

test("click focus isolates direct neighbours and explains their direction without duplicating reciprocal cards",()=>{
  const d=diagram(data,{module:null,selected:"B",focus:true,motion:true,orbit:false,links:true,preset:"perspective",analysis:"map"});
  assert.deepEqual([...d.points.keys()].sort(),["A","B","C"]);
  assert.deepEqual(d.direct,{sources:["A","C"],dependents:["C"],mutual:["C"]});
  assert.deepEqual(d.edges.map((e)=>e.i).sort(),["ab","bc","cb"]);
  assert.ok(d.points.get("A")!.x>d.points.get("B")!.x,"sources sit on the right in the RTL diagram");
  assert.ok(d.points.get("C")!.x>d.points.get("B")!.x,"reciprocal source keeps one card");
  assert.equal(d.points.get("A")!.x,d.points.get("C")!.x);
  assert.ok(Math.abs(d.points.get("A")!.y-d.points.get("C")!.y)>=CARD.h);
  const next=diagram(data,{module:"PP",selected:"C",focus:true,motion:true,orbit:false,links:true,preset:"perspective",analysis:"map"});
  assert.deepEqual([...next.points.keys()].sort(),["B","C","E"]);
  assert.ok(next.points.get("B")!.x>next.points.get("C")!.x);
  assert.ok(next.points.get("E")!.x<next.points.get("C")!.x,"dependent sits on the left, even across modules");
});
test("focus shows only incident relationships, excluding joins between neighbours",()=>{
  const linked={...data,edges:[...data.edges,{i:"ac",p:"A",c:"C"}]} as ErdCatalog;
  const d=diagram(linked,{module:"PP",selected:"B",focus:true,motion:false,orbit:false,links:true,preset:"top",analysis:"map"});
  assert.ok(!d.edges.some((e)=>e.i==="ac"));
  const lone=diagram(data,{module:null,selected:"UNLISTED",focus:true,motion:false,orbit:false,links:true,preset:"top",analysis:"map"});
  assert.equal(lone.points.size,1);
  assert.deepEqual(lone.direct,{sources:[],dependents:[],mutual:[]});
  assert.deepEqual(lone.edges,[]);
});
