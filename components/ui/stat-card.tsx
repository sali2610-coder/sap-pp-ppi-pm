import * as React from "react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * StatCard + StatGrid — canonical metric surface (Design System v2).
 * Blueprint: component-catalog.md — numbers always font-mono + tabular-nums;
 * 4-up grid. Accent tints the icon well only.
 */
export interface StatCardProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: LucideIcon;
  value: React.ReactNode;
  label: string;
  accent?: string;
}

export function StatCard({ icon: Icon, value, label, accent, className, ...props }: StatCardProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 rounded-2xl border border-hairline bg-surface p-4 shadow-[var(--elev-1)]",
        className,
      )}
      {...props}
    >
      {Icon && (
        <span
          aria-hidden
          className="grid size-10 shrink-0 place-items-center rounded-xl text-white shadow-sm [&_svg]:size-5"
          style={{ background: accent ?? "var(--brand)" }}
        >
          <Icon />
        </span>
      )}
      <div className="min-w-0">
        <div className="font-mono text-2xl font-extrabold tabular-nums text-ink-1">{value}</div>
        <div className="text-[11px] font-semibold text-ink-3" dir="auto">{label}</div>
      </div>
    </div>
  );
}

export function StatGrid({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("grid grid-cols-2 gap-3 sm:grid-cols-4", className)} {...props} />;
}
