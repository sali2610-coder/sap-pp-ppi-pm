"use client";

import { useSyncExternalStore } from "react";

/* The search shortcut as the reader's keyboard writes it: ⌘K on a Mac, Ctrl K
   everywhere else. The server cannot know the platform, so it renders the Ctrl
   form, and a Mac swaps in ⌘K right after hydration (the server snapshot of
   useSyncExternalStore: no hydration mismatch, no setState in an effect). The
   key handler in search/shell-client.tsx already accepts both modifiers. */
const subscribe = () => () => {};
const isMac = () => {
  const n = navigator as Navigator & { userAgentData?: { platform?: string } };
  return /mac|iphone|ipad/i.test(n.userAgentData?.platform || n.platform || "");
};

export function CmdKey() {
  const mac = useSyncExternalStore(subscribe, isMac, () => false);
  return <>{mac ? "⌘K" : "Ctrl K"}</>;
}
