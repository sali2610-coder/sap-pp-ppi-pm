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
      className="group flex h-10 w-full max-w-md items-center gap-2.5 rounded-xl border border-hairline bg-surface px-3.5 text-start shadow-[0_1px_2px_rgba(11,12,14,0.05)] transition-all hover:border-brand/40 hover:shadow-[0_8px_24px_-14px_rgba(214,32,39,0.30)] focus-visible:border-brand focus-visible:shadow-[0_0_0_4px_color-mix(in_srgb,var(--brand)_16%,transparent)] focus-visible:outline-none active:scale-[0.99]"
      aria-label="Search"
    >
      <Search className="size-4 shrink-0 text-ink-1 transition-colors group-hover:text-brand" strokeWidth={2.4} />
      <span className="flex-1 truncate text-sm font-medium text-ink-2">{t("search.placeholder")}</span>
      <kbd className="hidden items-center gap-0.5 rounded-md border border-hairline bg-surface-2 px-1.5 py-0.5 text-[11px] font-semibold text-ink-3 sm:flex">
        {mac ? "⌘" : "Ctrl"} K
      </kbd>
    </button>
  );
}
