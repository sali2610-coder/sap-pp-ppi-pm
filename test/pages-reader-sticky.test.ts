// The reader's sticky bars (components/neo-shell/reader/env.ts, stickyBars):
// a bar stays pinned only while it covers at most a quarter of the reading area
// (gate 4, blocker 2). The cases are the gate's own measurements, in px:
// header height, dock height, the reading area's height.
import test from "node:test";
import assert from "node:assert/strict";
import { stickyBars } from "../components/neo-shell/reader/env.ts";

test("a desktop reader keeps both bars pinned and reserves the header's height", () => {
  assert.deepEqual(stickyBars(98, 64, 848), { flow: "", cover: 98 });
});

test("the header that hid the text on a phone or at 200% zoom scrolls with the page", () => {
  for (const [head, dock, room] of [[367, 60, 460], [286, 60, 736], [151, 64, 282], [286, 64, 416]]) {
    const r = stickyBars(head, dock, room);
    assert.equal(r.flow, "head", `${head}/${room}`);
    assert.equal(r.cover, 0, "a header that scrolls away covers nothing");
    assert.ok(dock <= room / 4, "the one-row dock stays within the budget");
  }
});

test("at 400% zoom (a 204px reading area) the dock scrolls too", () => {
  assert.deepEqual(stickyBars(367, 60, 204), { flow: "head dock", cover: 0 });
});

test("whatever stays pinned never covers more than half of the reading area", () => {
  for (let room = 150; room <= 2200; room += 25) {
    for (let head = 20; head <= 600; head += 20) {
      for (const dock of [44, 60, 64, 90]) {
        const r = stickyBars(head, dock, room);
        const pinned = (r.flow.includes("head") ? 0 : head) + (r.flow.includes("dock") ? 0 : dock);
        assert.ok(pinned <= room / 2, `${head}+${dock} in ${room}`);
      }
    }
  }
});
