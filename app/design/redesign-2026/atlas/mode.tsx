"use client";

/* Day/night for the board. The server always renders light; ?mode=dark is read from
   location.search after hydration (useSyncExternalStore's server snapshot is "light", so React
   hydrates light and then re-renders dark: no mismatch). window.__setMode(m) switches it too. */

import { createContext, useContext, useEffect, useState, useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";

type Mode = "light" | "dark";

declare global {
  interface Window { __setMode?: (m: string) => void }
}

const ModeCtx = createContext<{ mode: Mode; set: (m: Mode) => void }>({ mode: "light", set: () => {} });

const noSubscribe = () => () => {};
const urlMode = (): Mode => (new URLSearchParams(window.location.search).get("mode") === "dark" ? "dark" : "light");
const serverMode = (): Mode => "light";

export function ModeRoot({ className, children }: { className: string; children: React.ReactNode }) {
  const fromUrl = useSyncExternalStore(noSubscribe, urlMode, serverMode);
  const [chosen, setChosen] = useState<Mode | null>(null);
  const mode = chosen ?? fromUrl;

  useEffect(() => {
    window.__setMode = (m) => setChosen(m === "dark" ? "dark" : "light");
    return () => { delete window.__setMode; };
  }, []);

  return (
    <ModeCtx.Provider value={{ mode, set: setChosen }}>
      <div className={className} data-mode={mode} dir="rtl" lang="he">{children}</div>
    </ModeCtx.Provider>
  );
}

export function ModeToggle() {
  const { mode, set } = useContext(ModeCtx);
  return (
    <div className="at-mode" role="group" aria-label="מצב תצוגה">
      <button type="button" aria-pressed={mode === "light"} onClick={() => set("light")}>
        <Sun size={16} aria-hidden="true" />
        יום
      </button>
      <button type="button" aria-pressed={mode === "dark"} onClick={() => set("dark")}>
        <Moon size={16} aria-hidden="true" />
        לילה
      </button>
    </div>
  );
}
