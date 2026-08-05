"use client";

import { useEffect, useState } from "react";
import { Monitor, Moon, Sun } from "lucide-react";
import { applyTheme, getTheme, setTheme, watchSystem, type Theme } from "@/lib/theme";

/**
 * Theme selector. Cycles light → dark → system.
 *
 * Deliberately built like LangSwitch so the header reads as one control group.
 * The current theme is read in an effect, never during render: this site
 * prerenders under output:"export", and reading localStorage at render time
 * would produce a hydration mismatch on every page.
 */
const ORDER: Theme[] = ["light", "dark", "system"];
const META: Record<Theme, { icon: typeof Sun; he: string }> = {
  light: { icon: Sun, he: "בהיר" },
  dark: { icon: Moon, he: "כהה" },
  system: { icon: Monitor, he: "מערכת" },
};

export function ThemeSwitch() {
  // Start at "system" so server and client agree on the first render.
  const [theme, setLocal] = useState<Theme>("system");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setLocal(getTheme());
    setReady(true);
    // Keep "system" honest if the OS flips while the tab is open.
    return watchSystem(() => applyTheme("system"));
  }, []);

  function cycle() {
    const next = ORDER[(ORDER.indexOf(theme) + 1) % ORDER.length];
    setLocal(next);
    setTheme(next);
  }

  const Icon = META[theme].icon;
  const nextLabel = META[ORDER[(ORDER.indexOf(theme) + 1) % ORDER.length]].he;

  return (
    <button
      onClick={cycle}
      aria-label={`ערכת נושא: ${META[theme].he}. החלף ל${nextLabel}`}
      title={`החלף ל${nextLabel}`}
      className="group flex h-10 items-center gap-1.5 rounded-xl border border-hairline bg-surface px-2.5 shadow-[0_1px_2px_rgba(11,12,14,0.05)] transition-all hover:border-brand/40 hover:shadow-[0_8px_24px_-14px_rgba(214,32,39,0.30)] focus-visible:border-brand focus-visible:outline-none active:scale-95"
    >
      <Icon className="size-4 shrink-0 text-ink-3 transition-colors group-hover:text-brand" strokeWidth={2.2} />
      <span className="hidden text-[13px] font-bold tracking-wide text-ink-1 sm:inline">
        {ready ? META[theme].he : " "}
      </span>
    </button>
  );
}
