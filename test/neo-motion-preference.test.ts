import test from "node:test";
import assert from "node:assert/strict";
import { motionIsReduced, setMotionPreference, subscribeMotion } from "../components/neo-shell/motion/preferences.ts";

test("explicit motion choice overrides the OS and survives storage changes", () => {
  const media = Object.assign(new EventTarget(), { matches: true });
  const browser = Object.assign(new EventTarget(), { matchMedia: () => media });
  const values = new Map<string, string>([["neo:motion:v1", "full"]]);
  const storage = { getItem: (key: string) => values.get(key) ?? null, setItem: (key: string, value: string) => values.set(key, value) };
  const oldWindow = Object.getOwnPropertyDescriptor(globalThis, "window");
  const oldStorage = Object.getOwnPropertyDescriptor(globalThis, "localStorage");
  Object.defineProperty(globalThis, "window", { configurable: true, value: browser });
  Object.defineProperty(globalThis, "localStorage", { configurable: true, value: storage });
  let unsubscribe = () => {};
  try {
    assert.equal(motionIsReduced(), false, "saved full choice works when the OS reduces motion");
    let changes = 0;
    unsubscribe = subscribeMotion(() => { changes++; });
    for (const osReduced of [true, false]) {
      media.matches = osReduced;
      setMotionPreference("system");
      assert.equal(motionIsReduced(), osReduced);
      setMotionPreference("full");
      assert.equal(motionIsReduced(), false);
      assert.equal(values.get("neo:motion:v1"), "full");
      setMotionPreference("reduce");
      assert.equal(motionIsReduced(), true);
    }
    media.matches = true;
    values.set("neo:motion:v1", "full");
    browser.dispatchEvent(Object.assign(new Event("storage"), { key: "neo:motion:v1" }));
    assert.equal(motionIsReduced(), false, "another tab's saved full choice is respected");
    values.set("neo:motion:v1", "unknown");
    browser.dispatchEvent(Object.assign(new Event("storage"), { key: "neo:motion:v1" }));
    assert.equal(motionIsReduced(), true, "unknown values safely follow the OS");
    media.matches = false;
    media.dispatchEvent(new Event("change"));
    assert.equal(motionIsReduced(), false);
    assert.equal(changes, 9);
    unsubscribe();
    media.dispatchEvent(new Event("change"));
    assert.equal(changes, 9, "unmounted subscribers are removed");
  } finally {
    unsubscribe();
    if (oldWindow) Object.defineProperty(globalThis, "window", oldWindow); else Reflect.deleteProperty(globalThis, "window");
    if (oldStorage) Object.defineProperty(globalThis, "localStorage", oldStorage); else Reflect.deleteProperty(globalThis, "localStorage");
  }
});
