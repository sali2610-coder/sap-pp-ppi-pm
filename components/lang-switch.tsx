"use client";

import { Globe } from "lucide-react";
import { useI18n } from "@/lib/i18n";

// Premium language selector — visually consistent with the header search bar
// (neutral v2 surface, hairline border, soft shadow, brand-red focus/hover).
// Shows the CURRENT language with a globe; toggles on click.
export function LangSwitch() {
  const { lang, toggle } = useI18n();
  const current = lang === "he" ? "HE" : "EN";
  const next = lang === "he" ? "English" : "עברית";
  return (
    <button
      onClick={toggle}
      dir="ltr"
      aria-label={`Language: ${current}. Switch to ${next}`}
      title={`Switch to ${next}`}
      className="group flex h-10 items-center gap-1.5 rounded-xl border border-hairline bg-surface px-2.5 shadow-[0_1px_2px_rgba(11,12,14,0.05)] transition-all hover:border-brand/40 hover:shadow-[0_8px_24px_-14px_rgba(214,32,39,0.30)] focus-visible:border-brand focus-visible:shadow-[0_0_0_4px_color-mix(in_srgb,var(--brand)_16%,transparent)] focus-visible:outline-none active:scale-95"
    >
      <Globe className="size-4 shrink-0 text-ink-3 transition-colors group-hover:text-brand" strokeWidth={2.2} />
      <span className="text-[13px] font-bold tracking-wide text-ink-1">{current}</span>
    </button>
  );
}
