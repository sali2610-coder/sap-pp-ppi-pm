"use client";

import { motion, useReducedMotion, type MotionProps } from "framer-motion";
import type { ReactNode } from "react";

// Subtle mount reveal for section bodies (GOAL-3 tasteful motion). Uses mount
// animate (not whileInView) so full-page static captures never leave content
// hidden, and it honors prefers-reduced-motion.
export function SectionReveal({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();
  const anim: MotionProps = reduce
    ? {}
    : { initial: { opacity: 0, y: 8 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.28, ease: "easeOut" } };
  return <motion.div {...anim}>{children}</motion.div>;
}
