"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Settings2, Type, Check, X } from "lucide-react";
import { useI18n } from "@/lib/i18n";

const SCALES = [
  { key: "s", he: "קטן", en: "S", value: 0.9 },
  { key: "m", he: "רגיל", en: "M", value: 1 },
  { key: "l", he: "גדול", en: "L", value: 1.12 },
  { key: "xl", he: "ענק", en: "XL", value: 1.25 },
] as const;

const KEY = "neo:font-scale";

export function UXSettings() {
  const { t, lang } = useI18n();
  const [open, setOpen] = useState(false);
  const [scale, setScale] = useState(1);

  // Hydrate + apply persisted scale
  useEffect(() => {
    const saved = Number(localStorage.getItem(KEY));
    const v = SCALES.some((s) => s.value === saved) ? saved : 1;
    setScale(v);
    document.documentElement.style.setProperty("--font-scale", String(v));
  }, []);

  function apply(v: number) {
    setScale(v);
    document.documentElement.style.setProperty("--font-scale", String(v));
    localStorage.setItem(KEY, String(v));
  }

  return (
    <div className="fixed bottom-5 end-5 z-40 flex flex-col items-end gap-3">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            transition={{ type: "spring", stiffness: 320, damping: 26 }}
            className="glass w-64 rounded-2xl p-4"
          >
            <div className="mb-3 flex items-center justify-between">
              <span className="flex items-center gap-2 text-sm font-semibold">
                <Type className="size-4 text-brand" />
                {t("ux.fontSize")}
              </span>
              <button onClick={() => setOpen(false)} aria-label="סגור" className="text-muted-foreground hover:text-foreground">
                <X className="size-4" />
              </button>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {SCALES.map((s) => {
                const isActive = scale === s.value;
                return (
                  <button
                    key={s.key}
                    onClick={() => apply(s.value)}
                    className={`relative flex flex-col items-center gap-1 rounded-xl border py-2.5 transition-all ${
                      isActive
                        ? "border-brand bg-brand/10 text-brand"
                        : "border-border bg-card hover:bg-muted"
                    }`}
                  >
                    <span style={{ fontSize: `${s.value}rem` }} className="font-bold leading-none">
                      Aa
                    </span>
                    <span className="text-[10px] text-muted-foreground">{lang === "he" ? s.he : s.en}</span>
                    {isActive && <Check className="absolute -top-1.5 -end-1.5 size-4 rounded-full bg-brand p-0.5 text-brand-foreground" />}
                  </button>
                );
              })}
            </div>
            <p className="mt-3 text-[11px] leading-relaxed text-muted-foreground">{t("ux.note")}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileTap={{ scale: 0.92 }}
        onClick={() => setOpen((v) => !v)}
        aria-label="הגדרות נגישות"
        className="flex size-12 items-center justify-center rounded-full bg-brand text-brand-foreground shadow-lg shadow-brand/30 ring-1 ring-white/20 transition-colors hover:bg-brand-dark"
      >
        <Settings2 className="size-5" />
      </motion.button>
    </div>
  );
}
