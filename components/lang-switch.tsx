"use client";

import { useEffect, useState } from "react";
import { Languages, Volume2, VolumeX } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { isMuted, setMuted, playClick } from "@/lib/sound";

export function LangSwitch() {
  const { lang, toggle } = useI18n();
  const [muted, setM] = useState(false);
  useEffect(() => setM(isMuted()), []);

  return (
    <div className="flex items-center gap-1.5">
      <button
        onClick={() => {
          playClick();
          toggle();
        }}
        className="flex items-center gap-1.5 rounded-xl border border-white/25 bg-white/15 px-2.5 py-1.5 text-sm font-semibold text-brand-foreground backdrop-blur-md transition-all hover:bg-white/25 active:scale-95"
        aria-label="Switch language"
      >
        <Languages className="size-4" />
        {lang === "he" ? "EN" : "עברית"}
      </button>
      <button
        onClick={() => {
          const next = !muted;
          setMuted(next);
          setM(next);
          if (!next) playClick();
        }}
        className="flex size-9 items-center justify-center rounded-xl border border-white/25 bg-white/15 text-brand-foreground backdrop-blur-md transition-all hover:bg-white/25 active:scale-95"
        aria-label={muted ? "Unmute" : "Mute"}
      >
        {muted ? <VolumeX className="size-4" /> : <Volume2 className="size-4" />}
      </button>
    </div>
  );
}
