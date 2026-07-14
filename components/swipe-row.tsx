"use client";

/**
 * MOBILE APP — swipe-to-favorite row wrapper.
 * Native list gesture: drag a full-width row horizontally to (un)favorite the
 * object; a star action is revealed behind and fills as you pull, snaps back on
 * release, toggles past threshold with haptic feedback. Direction-agnostic so it
 * is RTL-safe. Tap still passes through to the row's own navigation. Coarse
 * pointers only (guarded) — on a trackpad/desktop the row behaves normally and
 * favoriting stays available via the object page / peek sheet.
 */
import { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useTransform, useReducedMotion } from "framer-motion";
import { Star } from "lucide-react";
import { toggleFavorite, useIsFavorite } from "@/lib/prefs";

const haptic = () => { try { navigator.vibrate?.(11); } catch { /* noop */ } };
const THRESHOLD = 68;

export function SwipeRow({ name, children, className = "" }: { name: string; children: React.ReactNode; className?: string }) {
  const reduce = useReducedMotion();
  const fav = useIsFavorite(name);
  const x = useMotionValue(0);
  const bgOpacity = useTransform(x, [-THRESHOLD, -12, 0, 12, THRESHOLD], [1, 0.15, 0, 0.15, 1]);
  const starScale = useTransform(x, [-THRESHOLD, 0, THRESHOLD], [1.15, 0.7, 1.15]);
  const armed = useRef(false);
  const [coarse, setCoarse] = useState(false);
  useEffect(() => { try { setCoarse(window.matchMedia("(pointer: coarse)").matches); } catch { /* noop */ } }, []);

  if (reduce || !coarse) return <>{children}</>; // no swipe on fine pointers / reduced-motion

  return (
    <div className={`relative overflow-hidden rounded-2xl ${className}`}>
      <motion.div style={{ opacity: bgOpacity }} className={`pointer-events-none absolute inset-0 flex items-center justify-between px-6 ${fav ? "bg-surface-2" : "bg-amber-50"}`}>
        {[0, 1].map((i) => (
          <motion.span key={i} style={{ scale: starScale }} className={fav ? "text-ink-3" : "text-amber-500"}>
            <Star className={`size-5 ${fav ? "" : "fill-amber-400"}`} />
          </motion.span>
        ))}
      </motion.div>
      <motion.div
        drag="x" dragDirectionLock dragConstraints={{ left: 0, right: 0 }} dragElastic={0.55}
        style={{ x }}
        onDrag={(_, info) => { armed.current = Math.abs(info.offset.x) > THRESHOLD; }}
        onDragEnd={() => { if (armed.current) { toggleFavorite(name); haptic(); armed.current = false; } }}
        className="relative">
        {children}
      </motion.div>
    </div>
  );
}
