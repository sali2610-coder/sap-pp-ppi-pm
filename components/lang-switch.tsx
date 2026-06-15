"use client";

import { Languages } from "lucide-react";
import { useI18n } from "@/lib/i18n";

export function LangSwitch() {
  const { lang, toggle } = useI18n();
  return (
    <button
      onClick={toggle}
      className="flex items-center gap-1.5 rounded-xl border border-white/25 bg-white/15 px-2.5 py-1.5 text-sm font-semibold text-brand-foreground backdrop-blur-md transition-all hover:bg-white/25 active:scale-95"
      aria-label="Switch language"
    >
      <Languages className="size-4" />
      {lang === "he" ? "EN" : "עברית"}
    </button>
  );
}
