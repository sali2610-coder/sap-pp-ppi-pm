"use client";

// Shared Academy micro-animations (§9). Subtle, spring-based, reduced-motion aware.
import { useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "framer-motion";

/** Number counter that springs from its previous value to the new one. */
export function AnimatedNumber({ value, className, format }: { value: number; className?: string; format?: (n: number) => string }) {
  const reduce = useReducedMotion();
  const mv = useMotionValue(0);
  const spring = useSpring(mv, { stiffness: 90, damping: 20, restDelta: 0.5 });
  const text = useTransform(spring, (n) => (format ? format(n) : String(Math.round(n))));
  useEffect(() => { mv.set(value); }, [value, mv]);
  if (reduce) return <span className={className}>{format ? format(value) : Math.round(value)}</span>;
  return <motion.span className={className}>{text}</motion.span>;
}
