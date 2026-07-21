"use client";

// Gentle, offline, hand-rolled confetti (§10). No CDN, no dependency. Deterministic
// spread by index (no hydration surprises). Respects reduced-motion.
import { motion, useReducedMotion } from "framer-motion";

const COLORS = ["#f97316", "#16a34a", "#6d28d9", "#0891b2", "#d62027", "#eab308"];

export function Confetti({ count = 90 }: { count?: number }) {
  const reduce = useReducedMotion();
  if (reduce) return null;
  const pieces = Array.from({ length: count }, (_, i) => ({
    left: (i * 37) % 100,
    delay: (i % 12) * 0.04,
    rot: (i * 53) % 360,
    color: COLORS[i % COLORS.length],
    dur: 2.2 + (i % 6) * 0.28,
    drift: ((i % 9) - 4) * 14,
    w: i % 3 === 0 ? 8 : 6,
    h: i % 4 === 0 ? 10 : 6,
  }));
  return (
    <div className="pointer-events-none fixed inset-0 z-[70] overflow-hidden" aria-hidden>
      {pieces.map((p, i) => (
        <motion.span
          key={i}
          className="absolute block rounded-[1px]"
          style={{ left: `${p.left}%`, width: p.w, height: p.h, background: p.color }}
          initial={{ y: "-8vh", opacity: 1, rotate: p.rot }}
          animate={{ y: "108vh", x: p.drift, opacity: [1, 1, 0.9, 0], rotate: p.rot + 420 }}
          transition={{ duration: p.dur, delay: p.delay, ease: "easeIn" }}
        />
      ))}
    </div>
  );
}
