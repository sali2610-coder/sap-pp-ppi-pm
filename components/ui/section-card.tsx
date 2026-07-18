import * as React from "react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { IconWell } from "./icon-well";
import { Eyebrow } from "./eyebrow";

/**
 * SectionCard — canonical content section container (Design System v2).
 * Blueprint: component-catalog.md — "rounded-2xl border-hairline bg-surface
 * p-5 sm:p-6 scroll-mt, icon-well + eyebrow + heading". One structure for every
 * knowledge/reference section so the whole platform reads the same.
 */
export interface SectionCardProps extends React.HTMLAttributes<HTMLElement> {
  icon?: LucideIcon;
  /** Accent colour for the icon well (module colour / hex / token). */
  accent?: string;
  eyebrow?: string;
  title?: string;
  /** heading level for a11y (default h2). */
  level?: 2 | 3;
  action?: React.ReactNode;
}

export function SectionCard({
  icon,
  accent,
  eyebrow,
  title,
  level = 2,
  action,
  className,
  children,
  ...props
}: SectionCardProps) {
  const Heading = (level === 3 ? "h3" : "h2") as "h2" | "h3";
  return (
    <section
      className={cn("rounded-2xl border border-hairline bg-surface p-5 scroll-mt-28 sm:p-6", className)}
      {...props}
    >
      {(title || eyebrow || action) && (
        <header className="mb-4 flex items-start gap-3">
          {icon && <IconWell icon={icon} accent={accent} size="sm" />}
          <div className="min-w-0 flex-1">
            {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
            {title && (
              <Heading className="text-[15px] font-extrabold tracking-tight text-ink-1" dir="auto">
                {title}
              </Heading>
            )}
          </div>
          {action && <div className="shrink-0">{action}</div>}
        </header>
      )}
      {children}
    </section>
  );
}
