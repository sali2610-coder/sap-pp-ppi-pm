import * as React from "react";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * SearchField — canonical inline search input (Design System v2).
 * Blueprint: component-catalog.md — rounded-2xl border-hairline bg-surface,
 * Search icon, 16px input on mobile (anti-zoom). Controlled by the caller.
 */
export interface SearchFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  accent?: string;
  containerClassName?: string;
}

export const SearchField = React.forwardRef<HTMLInputElement, SearchFieldProps>(
  ({ accent, className, containerClassName, ...props }, ref) => (
    <div
      className={cn(
        "flex flex-1 items-center gap-2 rounded-2xl border border-hairline bg-surface px-4 py-2.5 shadow-sm transition-colors focus-within:border-brand/40",
        containerClassName,
      )}
    >
      <Search className="size-4 shrink-0" style={{ color: accent ?? "var(--brand)" }} aria-hidden />
      <input
        ref={ref}
        type="search"
        className={cn(
          "w-full bg-transparent text-sm text-ink-1 outline-none placeholder:text-ink-3",
          className,
        )}
        dir="auto"
        {...props}
      />
    </div>
  ),
);
SearchField.displayName = "SearchField";
