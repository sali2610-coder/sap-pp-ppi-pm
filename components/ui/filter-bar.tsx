import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * FilterButton + FilterBar — canonical filter chips (Design System v2).
 * Blueprint: component-catalog.md — inactive: surface-2/ink-3; active: white on
 * accent (module colour). Presentational; state owned by the caller.
 */
export interface FilterButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "color"> {
  active?: boolean;
  /** active background colour (module accent). Default = brand. */
  accent?: string;
}

export function FilterButton({ active, accent, className, style, ...props }: FilterButtonProps) {
  // An active chip without an explicit accent sits on --brand, which the dark
  // palette lightens from #d62027 to #ff5a5f so the red survives a dark surface.
  // White text on that is 3.05:1 — the palette already ships --brand-foreground
  // (#ffffff light, #1a0b0c dark) for exactly this pairing, so the default now
  // uses the token instead of a hardcoded white. Light mode is unchanged.
  //
  // An explicit accent keeps white: those are module colours passed by callers,
  // not theme tokens, and --brand-foreground would be the wrong ink on them.
  const onBrand = active && !accent;
  return (
    <button
      type="button"
      aria-pressed={active}
      className={cn(
        "tap rounded-xl px-3 py-2 text-xs font-bold transition-colors",
        active ? (onBrand ? "text-brand-foreground shadow-sm" : "text-white shadow-sm") : "bg-surface-2 text-ink-3 hover:bg-hairline",
        className,
      )}
      style={active ? { background: accent ?? "var(--brand)", ...style } : style}
      {...props}
    />
  );
}

export function FilterBar({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex flex-wrap items-center gap-1.5", className)} {...props} />;
}
