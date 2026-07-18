import * as React from "react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { IconWell } from "./icon-well";
import { Eyebrow } from "./eyebrow";

/**
 * PageHeader — canonical page header (Design System v2).
 * Blueprint: component-catalog.md / design-blueprint.md §5 — eyebrow + title +
 * optional badge + subtitle + metrics row + actions. One header shape for every
 * portal / reference / explorer page.
 */
export interface Metric {
  label: string;
  value: React.ReactNode;
}

export interface PageHeaderProps extends React.HTMLAttributes<HTMLElement> {
  icon?: LucideIcon;
  accent?: string;
  eyebrow?: string;
  title: string;
  /** rendered mono + LTR (SAP object code header). */
  mono?: boolean;
  badge?: React.ReactNode;
  subtitle?: React.ReactNode;
  metrics?: Metric[];
  actions?: React.ReactNode;
}

export function PageHeader({
  icon,
  accent,
  eyebrow,
  title,
  mono,
  badge,
  subtitle,
  metrics,
  actions,
  className,
  ...props
}: PageHeaderProps) {
  return (
    <header
      className={cn("rounded-2xl border border-hairline bg-surface p-5 sm:p-6", className)}
      {...props}
    >
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex min-w-0 items-start gap-3.5">
          {icon && <IconWell icon={icon} accent={accent} size="xl" />}
          <div className="min-w-0">
            {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
            <div className="flex flex-wrap items-center gap-2">
              <h1
                className={cn(
                  "text-h1 text-ink-1",
                  mono && "tech font-mono !font-black break-all text-[19px] sm:text-[22px]",
                )}
                dir={mono ? "ltr" : "auto"}
              >
                {title}
              </h1>
              {badge}
            </div>
            {subtitle && (
              <p className="mt-1.5 max-w-2xl text-[13px] leading-relaxed text-ink-2" dir="auto">
                {subtitle}
              </p>
            )}
          </div>
        </div>
        {actions && <div className="flex shrink-0 items-center gap-2">{actions}</div>}
      </div>
      {metrics && metrics.length > 0 && (
        <dl className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
          {metrics.map((m) => (
            <div key={m.label} className="flex items-baseline gap-1.5">
              <dt className="font-mono text-[15px] font-extrabold tabular-nums text-ink-1">{m.value}</dt>
              <dd className="text-[11px] font-semibold text-ink-3" dir="auto">{m.label}</dd>
            </div>
          ))}
        </dl>
      )}
    </header>
  );
}
