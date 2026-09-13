import test from "node:test";
import assert from "node:assert/strict";
import {fitSpatial} from "../components/neo-shell/erd/erd-spatial-viewport.ts";

test("the full graph fits mobile, laptop and presentation viewports without cropped corners",()=>{
  for(const [width,height] of [[360,240],[760,360],[980,520],[1440,720],[3000,1500]]) {
    for(const [w,h] of [[348,398],[2132,888],[3840,2300]]) {
      const bounds={x:56,y:24,w,h},c=fitSpatial(bounds,width,height);
      assert.ok(Number.isFinite(c.scale)&&c.scale>0);
      assert.ok(bounds.x*c.scale+c.x>=0);
      assert.ok(bounds.y*c.scale+c.y>=0);
      assert.ok((bounds.x+w)*c.scale+c.x<=width);
      assert.ok((bounds.y+h)*c.scale+c.y<=height);
    }
  }
});
test("presentation displays enlarge the map beyond the former desktop cap",()=>{
  const bounds={x:56,y:24,w:1800,h:850};
  const laptop=fitSpatial(bounds,1100,520),display=fitSpatial(bounds,3000,1500);
  assert.ok(display.scale>1.2);
  assert.ok(display.scale>laptop.scale*2);
});
