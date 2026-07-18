import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * Pill — canonical status / trust / verification chip (Design System v2).
 * Blueprint: component-catalog.md — "rounded-full border px-2 py-0.5 text-[11px]
 * font-bold, colour-coded". Tone maps to the semantic palettes in
 * design-principles.md §1.
 */
const pillVariants = cva(
  "inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] font-bold [&_svg]:size-3 [&_svg]:shrink-0",
  {
    variants: {
      tone: {
        neutral: "border-hairline bg-surface-2 text-ink-3",
        good: "border-emerald-200 bg-emerald-50 text-emerald-700",
        warn: "border-amber-200 bg-amber-50 text-amber-700",
        bad: "border-brand/25 bg-brand-soft text-brand",
        info: "border-indigo-200 bg-indigo-50 text-indigo-700",
      },
    },
    defaultVariants: { tone: "neutral" },
  },
);

export interface PillProps
  extends Omit<React.HTMLAttributes<HTMLSpanElement>, "color">,
    VariantProps<typeof pillVariants> {}

export function Pill({ className, tone, ...props }: PillProps) {
  return <span className={cn(pillVariants({ tone }), className)} dir="auto" {...props} />;
}

export { pillVariants };
