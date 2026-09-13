import test from "node:test";
import assert from "node:assert/strict";
import { selectSpatialTable, returnSpatialSelection } from "../components/neo-shell/erd/erd-spatial-navigation.ts";
import type { DiagramView } from "../components/neo-shell/erd/erd-spatial-diagram.ts";
import type { ErdCatalog } from "../components/neo-shell/erd/erd-types.ts";

const data={tables:[{n:"A"},{n:"B"},{n:"C"}],modules:[{code:"PP",core:["A","B"]},{code:"PM",core:["C"]}]} as ErdCatalog;
const overview:DiagramView={module:"PP",selected:null,expanded:false,focus:false,motion:true,orbit:false,links:true,preset:"perspective",analysis:"map",group:"object:0",step:null};
const visible=new Set(["A","B"]);

test("a second click collapses the table and restores the filtered module",()=>{
  const open=selectSpatialTable(data,overview,null,"A",visible)!;
  assert.equal(open.view.expanded,true);
  assert.equal(open.detailsOpen,true);
  assert.equal(open.previous,overview);
  const close=selectSpatialTable(data,open.view,open.previous,"A",visible)!;
  assert.equal(close.view.selected,null);
  assert.equal(close.view.expanded,false);
  assert.equal(close.view.module,"PP");
  assert.equal(close.view.group,"object:0");
  assert.equal(close.detailsOpen,false);
  assert.equal(close.previous,null);
});
test("opening from a business step returns to that same step on a repeated click or zoom out",()=>{
  const flow:DiagramView={...overview,group:null,analysis:"flow",step:3};
  const open=selectSpatialTable(data,flow,null,"A",visible)!;
  assert.equal(open.view.analysis,"map");
  const close=selectSpatialTable(data,open.view,open.previous,"A",visible)!;
  assert.equal(close.view.analysis,"flow");
  assert.equal(close.view.step,3);
  assert.deepEqual(returnSpatialSelection(open.view,open.previous),close.view);
});
test("analysis can be armed before picking and keeps a compact selected anchor",()=>{
  for(const analysis of ["impact","lineage","dep"] as const) {
    const mode={...overview,analysis};
    const first=selectSpatialTable(data,mode,null,"A",visible)!;
    assert.equal(first.view.analysis,analysis);
    assert.equal(first.view.expanded,false);
    assert.equal(first.detailsOpen,false);
    const next=selectSpatialTable(data,first.view,first.previous,"B",visible)!;
    assert.equal(next.view.analysis,analysis);
    assert.equal(next.previous,mode);
    const close=selectSpatialTable(data,next.view,next.previous,"B",visible)!;
    assert.equal(close.view.analysis,analysis);
    assert.equal(close.view.selected,null);
  }
});
test("following a related table preserves the original return context",()=>{
  const first=selectSpatialTable(data,overview,null,"A",visible)!;
  const next=selectSpatialTable(data,first.view,first.previous,"B",visible)!;
  assert.equal(next.previous,overview);
  const close=returnSpatialSelection(next.view,next.previous);
  assert.equal(close.group,overview.group);
  assert.equal(close.selected,null);
});
test("global search changes the module but a return restores the original filter",()=>{
  const other=selectSpatialTable(data,overview,null,"C",visible)!;
  assert.equal(other.view.module,"PM");
  assert.equal(other.view.group,null);
  const close=returnSpatialSelection({...other.view,motion:false,preset:"top"},other.previous);
  assert.equal(close.module,"PP");
  assert.equal(close.group,"object:0");
  assert.equal(close.motion,false,"the user's current pause preference is retained");
  assert.equal(close.preset,"top");
});
test("an explicit cross-module analysis keeps its original scope when following a result",()=>{
  const mode:DiagramView={...overview,analysis:"impact",selected:"A",crossModule:true,expanded:false};
  const next=selectSpatialTable(data,mode,null,"C",new Set(["A","B","C"]))!;
  assert.equal(next.view.module,"PP");
  assert.equal(next.view.crossModule,true);
  assert.equal(next.view.analysis,"impact");
  assert.equal(next.view.links,true);
  assert.equal(selectSpatialTable(data,overview,null,"UNKNOWN",visible),null);
});
