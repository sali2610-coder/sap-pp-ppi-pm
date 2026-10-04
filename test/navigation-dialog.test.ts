import test from "node:test";
import assert from "node:assert/strict";
import { bindNavigationDialog } from "../components/neo-shell/navigation-dialog.ts";

// A small DOM contract double. These are keyboard lifecycle unit tests, not
// rendered-browser acceptance tests or a substitute for the mobile audit.
function fixture() {
  const listeners = new Map<string, Set<(event: never) => void>>();
  const doc = {
    activeElement: null as unknown,
    location: { href: "https://example.test/neo/" },
    defaultView: { getComputedStyle: (node: { visibility: string }) => ({ visibility: node.visibility }) },
    addEventListener(name: string, fn: (event: never) => void) {
      if (!listeners.has(name)) listeners.set(name, new Set());
      listeners.get(name)!.add(fn);
    },
    removeEventListener(name: string, fn: (event: never) => void) { listeners.get(name)?.delete(fn); },
  };
  const emit = (name: string, event: unknown) => {
    for (const fn of listeners.get(name) || []) fn(event as never);
  };
  const element = () => ({
    tabIndex: 0, disabled: false, concealed: false, rendered: true,
    visibility: "visible", isConnected: true,
    matches: function () { return this.disabled; },
    closest: function () { return this.concealed ? {} : null; },
    getClientRects: function () { return this.rendered ? [{}] : []; },
    focus: function () { doc.activeElement = this; emit("focusin", { target: this }); },
  });
  const opener = element();
  const close = element();
  const group = element();
  const link = element();
  const nodes = [close, group, link];
  const dialog = {
    ...element(), ownerDocument: doc, querySelectorAll: () => nodes,
    contains: (node: unknown) => node === dialog || nodes.includes(node as typeof close),
  };
  opener.focus();
  let dismissed = 0;
  const release = bindNavigationDialog(dialog as unknown as HTMLElement, () => { dismissed++; });
  const key = (key: string, shiftKey = false) => {
    const event = {
      key, shiftKey, defaultPrevented: false, stopped: false,
      preventDefault() { this.defaultPrevented = true; },
      stopPropagation() { this.stopped = true; },
    };
    emit("keydown", event);
    return event;
  };
  return { doc, opener, close, group, link, dialog, nodes, release, key, element, dismissed: () => dismissed };
}

test("opening navigation enters the dialog; dismissal restores its trigger", () => {
  const f = fixture();
  assert.equal(f.doc.activeElement, f.close);
  f.release();
  assert.equal(f.doc.activeElement, f.opener);
  f.link.focus();
  assert.equal(f.doc.activeElement, f.link, "focus trap was removed on cleanup");
});

test("Tab wraps in both directions but leaves ordinary interior Tab native", () => {
  const f = fixture();
  assert.equal(f.key("Tab").defaultPrevented, false);
  assert.equal(f.key("Tab", true).defaultPrevented, true);
  assert.equal(f.doc.activeElement, f.link);
  assert.equal(f.key("Tab").defaultPrevented, true);
  assert.equal(f.doc.activeElement, f.close);
  f.release();
});

test("collapsing a group removes its links from the next keyboard cycle", () => {
  const f = fixture();
  f.link.concealed = true;
  f.group.focus();
  f.key("Tab");
  assert.equal(f.doc.activeElement, f.close);
  f.key("Tab", true);
  assert.equal(f.doc.activeElement, f.group);
  f.release();
});

test("disabled, untabbable and visually hidden controls cannot trap focus", () => {
  const f = fixture();
  for (const state of [
    { disabled: true }, { tabIndex: -1 }, { rendered: false }, { visibility: "hidden" },
  ]) {
    const hidden = Object.assign(f.element(), state);
    f.nodes.push(hidden);
  }
  f.close.focus();
  f.key("Tab", true);
  assert.equal(f.doc.activeElement, f.link);
  f.release();
});

test("Escape dismisses once and is consumed before page focus listeners", () => {
  const f = fixture();
  const escape = f.key("Escape");
  assert.equal(f.dismissed(), 1);
  assert.equal(escape.defaultPrevented, true);
  assert.equal(escape.stopped, true);
  f.release();
  f.key("Escape");
  assert.equal(f.dismissed(), 1, "dismiss listener was removed");
});

test("search shortcut keys remain available to the persistent shell", () => {
  const f = fixture();
  const event = f.key("k");
  assert.equal(event.defaultPrevented, false);
  assert.equal(event.stopped, false);
  assert.equal(f.dismissed(), 0);
  f.release();
});

test("focus cannot escape to background controls while navigation is open", () => {
  const f = fixture();
  f.opener.focus();
  assert.equal(f.doc.activeElement, f.close);
  f.release();
});

test("navigation and removed triggers do not steal the destination's focus", () => {
  for (const kind of ["link", "history", "removed"] as const) {
    const f = fixture();
    if (kind === "history") f.doc.location.href = "https://example.test/neo/pm/";
    if (kind === "removed") f.opener.isConnected = false;
    f.release(kind !== "link");
    assert.equal(f.doc.activeElement, f.close, kind);
  }
});

test("an empty or temporarily collapsed dialog keeps a safe focus target", () => {
  const f = fixture();
  f.nodes.splice(0);
  assert.equal(f.key("Tab").defaultPrevented, true);
  assert.equal(f.doc.activeElement, f.dialog);
  f.release();
});
