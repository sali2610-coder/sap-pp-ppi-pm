import * as React from "react";
import type { LucideIcon } from "lucide-react";
import { AlertTriangle, Lightbulb, TrendingUp, Info } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * Callout — canonical semantic message box (Design System v2).
 * Blueprint: component-catalog.md — semantic palettes are frozen values from
 * design-principles.md §1 (warning / success / value / info / note).
 */
const calloutVariants = cva(
  "flex items-start gap-2.5 rounded-xl border p-3 text-[12.5px] leading-relaxed [&_svg]:mt-0.5 [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      tone: {
        warning: "border-s-4 border-[#f5e2bf] border-s-[#f59e0b] bg-[#fff8ec] text-[#92400e]",
        success: "border-[#cfe6e2] bg-[#f0f6f5] text-[#0f5e57]",
        value: "border-s-4 border-indigo-200/70 border-s-indigo-400 bg-indigo-50/40 p-4 text-[13px] text-indigo-700",
        info: "border-hairline bg-surface-2 text-ink-2",
        note: "border-s-[3px] border-s-brand bg-brand-soft text-ink-2",
      },
    },
    defaultVariants: { tone: "info" },
  },
);

const DEFAULT_ICON: Record<string, LucideIcon> = {
  warning: AlertTriangle,
  success: Lightbulb,
  value: TrendingUp,
  info: Info,
  note: Info,
};

export interface CalloutProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof calloutVariants> {
  icon?: LucideIcon | null;
  title?: string;
}

export function Callout({ className, tone, icon, title, children, ...props }: CalloutProps) {
  const Icon = icon === null ? null : icon ?? DEFAULT_ICON[tone ?? "info"];
  return (
    <div className={cn(calloutVariants({ tone }), className)} dir="auto" {...props}>
      {Icon && <Icon />}
      <div className="min-w-0 flex-1">
        {title && <p className="font-bold">{title}</p>}
        {children}
      </div>
    </div>
  );
}

export { calloutVariants };
