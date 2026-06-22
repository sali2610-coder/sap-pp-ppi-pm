"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Sparkles } from "lucide-react";

// Tasteful milestone feedback. Fire from anywhere:
//   window.dispatchEvent(new CustomEvent("neo:wow", { detail: { title, sub } }))
// Professional satisfaction — not gamified. Auto-dismiss, reduced-motion safe.
interface Wow { id: number; title: string; sub?: string }

export function WowToast() {
  const reduce = useReducedMotion();
  const [toasts, setToasts] = useState<Wow[]>([]);

  useEffect(() => {
    let n = 0;
    const onWow = (e: Event) => {
      const d = (e as CustomEvent).detail || {};
      if (!d.title) return;
      const id = ++n;
      setToasts((t) => [...t, { id, title: d.title, sub: d.sub }].slice(-3));
      setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3400);
    };
    window.addEventListener("neo:wow", onWow);
    return () => window.removeEventListener("neo:wow", onWow);
  }, []);

  return (
    <div className="no-print pointer-events-none fixed inset-x-0 top-[5.5rem] z-[80] flex flex-col items-center gap-2" dir="rtl">
      <AnimatePresence>
        {toasts.map((t) => (
          <motion.div key={t.id}
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: -16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -10, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 360, damping: 28 }}
            className="pointer-events-auto flex max-w-[88vw] items-center gap-3 rounded-2xl border border-white/15 bg-gradient-to-l from-brand-dark to-brand px-4 py-2.5 text-white shadow-xl shadow-brand/30">
            <span className="grid size-8 shrink-0 place-items-center rounded-xl bg-white/20"><Sparkles className="size-4" /></span>
            <span className="min-w-0"><span className="block text-sm font-extrabold">{t.title}</span>{t.sub && <span className="block truncate text-xs text-white/80">{t.sub}</span>}</span>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
