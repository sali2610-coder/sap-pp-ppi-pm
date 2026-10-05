import test from "node:test";
import assert from "node:assert/strict";
import { afterAnimation } from "../components/neo-shell/motion/animation-completion.ts";

function fakeAnimation(playState = "running"): Animation {
  return { playState, onfinish: null, oncancel: null } as unknown as Animation;
}

test("a stalled closing animation still releases the modal", (t) => {
  t.mock.timers.enable({ apis: ["setTimeout"] });
  const animation = fakeAnimation();
  let closed = 0;
  afterAnimation(animation, () => { closed++; }, 470);
  const lateFinish = animation.onfinish!;
  t.mock.timers.tick(469);
  assert.equal(closed, 0);
  t.mock.timers.tick(1);
  assert.equal(closed, 1);
  lateFinish.call(animation, {} as AnimationPlaybackEvent);
  assert.equal(closed, 1, "late browser events cannot close a second time");
});

for (const event of ["onfinish", "oncancel"] as const) {
  test(`${event} releases the modal without waiting for the timeout`, (t) => {
    t.mock.timers.enable({ apis: ["setTimeout"] });
    const animation = fakeAnimation();
    let closed = 0;
    afterAnimation(animation, () => { closed++; }, 470);
    animation[event]!.call(animation, {} as AnimationPlaybackEvent);
    assert.equal(closed, 1);
    t.mock.timers.tick(1000);
    assert.equal(closed, 1);
  });
}

test("unmount cancels the callback and detaches animation handlers", (t) => {
  t.mock.timers.enable({ apis: ["setTimeout"] });
  const animation = fakeAnimation();
  let closed = 0;
  const cleanup = afterAnimation(animation, () => { closed++; }, 470);
  cleanup();
  t.mock.timers.tick(1000);
  assert.equal(closed, 0);
  assert.equal(animation.onfinish, null);
  assert.equal(animation.oncancel, null);
});

test("an already finished animation releases the modal immediately", () => {
  let closed = 0;
  afterAnimation(fakeAnimation("finished"), () => { closed++; }, 470);
  assert.equal(closed, 1);
});
