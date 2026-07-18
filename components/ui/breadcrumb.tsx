import * as React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Breadcrumb — canonical RTL breadcrumb (Design System v2).
 * Blueprint: component-catalog.md — ArrowLeft separator (RTL-correct),
 * hover:text-brand. Last item is the current page (no link).
 */
export interface Crumb {
  label: string;
  href?: string;
}

export function Breadcrumb({ items, className }: { items: Crumb[]; className?: string }) {
  return (
    <nav
      aria-label="נתיב"
      className={cn("flex items-center gap-1.5 text-[12px] font-semibold text-ink-3", className)}
      dir="rtl"
    >
      {items.map((c, i) => (
        <React.Fragment key={`${c.label}-${i}`}>
          {i > 0 && <ArrowLeft className="size-3 shrink-0 opacity-60" aria-hidden />}
          {c.href && i < items.length - 1 ? (
            <Link
              href={c.href}
              className="rounded-md px-1.5 py-0.5 transition-colors hover:bg-surface-2 hover:text-brand"
            >
              {c.label}
            </Link>
          ) : (
            <span className={cn(i === items.length - 1 && "text-ink-2")} aria-current={i === items.length - 1 ? "page" : undefined}>
              {c.label}
            </span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
}
