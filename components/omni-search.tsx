"use client";

import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { useI18n } from "@/lib/i18n";

// Header trigger for the ⌘K Command Palette (the real search UI lives in
// <CommandPalette/>). Styled as a Spotlight-style search field.
export function OmniSearch() {
  const { t } = useI18n();
  const [mac, setMac] = useState(true);
  useEffect(() => {
    setMac(/Mac|iPhone|iPad/.test(navigator.platform));
  }, []);

  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event("neo:open-palette"))}
      className="group flex h-10 w-full max-w-md items-center gap-2.5 rounded-xl border border-white/25 bg-white/15 px-3.5 text-start text-brand-foreground/90 shadow-sm backdrop-blur-md transition-all hover:bg-white/25 active:scale-[0.99]"
      aria-label="Search"
    >
      <Search className="size-4 shrink-0 opacity-80" />
      <span className="flex-1 truncate text-sm opacity-80">{t("search.placeholder")}</span>
      <kbd className="hidden items-center gap-0.5 rounded-md border border-white/30 bg-white/15 px-1.5 py-0.5 text-[11px] font-semibold sm:flex">
        {mac ? "⌘" : "Ctrl"} K
      </kbd>
    </button>
  );
}
