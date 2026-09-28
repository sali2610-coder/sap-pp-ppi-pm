"use client";
/* Light/dark switch for the prototype root. Server snapshot is "light"; the client
   reads ?mode=dark once, so screenshots can pick a mode without a hydration mismatch.
   window.__setMode(m) lets a test switch it. */
import { useEffect, useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";

type Mode = "light" | "dark";
let current: Mode | null = null;
const listeners = new Set<() => void>();
const read = (): Mode => (current ??= new URLSearchParams(location.search).get("mode") === "dark" ? "dark" : "light");
const set = (m: Mode) => { current = m; listeners.forEach((l) => l()); };
const subscribe = (l: () => void) => { listeners.add(l); return () => { listeners.delete(l); }; };

export function ModeToggle({ target }: { target: string }) {
  const mode = useSyncExternalStore(subscribe, read, (): Mode => "light");
  useEffect(() => {
    document.getElementById(target)?.setAttribute("data-mode", mode);
    (window as unknown as { __setMode: (m: Mode) => void }).__setMode = set;
  }, [mode, target]);
  const next: Mode = mode === "light" ? "dark" : "light";
  return (
    <button type="button" className="ml-btn" onClick={() => set(next)} aria-label={next === "dark" ? "מעבר למצב לילה" : "מעבר למצב יום"}>
      {mode === "light" ? <Moon size={16} aria-hidden /> : <Sun size={16} aria-hidden />}
      <span>{mode === "light" ? "לילה" : "יום"}</span>
    </button>
  );
}
