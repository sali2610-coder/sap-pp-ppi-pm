import * as React from "react";
import type { LucideIcon } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * IconWell — canonical accented icon container (Design System v2).
 * Blueprint: component-catalog.md — "grid size-{8-11} place-items-center
 * rounded-{lg,xl}, bg {accent}1f, text accent". Pass `accent` as any token/hex
 * for module colouring; default = brand on surface-2.
 */
const wellVariants = cva("grid place-items-center shrink-0", {
  variants: {
    size: {
      sm: "size-8 rounded-lg [&_svg]:size-4",
      md: "size-9 rounded-xl [&_svg]:size-4",
      lg: "size-10 rounded-xl [&_svg]:size-5",
      xl: "size-11 rounded-xl [&_svg]:size-5",
    },
  },
  defaultVariants: { size: "lg" },
});

export interface IconWellProps
  extends Omit<React.HTMLAttributes<HTMLSpanElement>, "color">,
    VariantProps<typeof wellVariants> {
  icon: LucideIcon;
  /** Accent colour (CSS colour or token var). When set, tints bg 12% + icon full. */
  accent?: string;
}

export function IconWell({ icon: Icon, accent, size, className, style, ...props }: IconWellProps) {
  const tinted = accent
    ? { background: `color-mix(in srgb, ${accent} 12%, transparent)`, color: accent, ...style }
    : style;
  return (
    <span
      aria-hidden
      className={cn(wellVariants({ size }), !accent && "bg-surface-2 text-brand", className)}
      style={tinted}
      {...props}
    >
      <Icon />
    </span>
  );
}
