import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Eyebrow — canonical small-caps section label (Design System v2).
 * Blueprint: design-principles.md §2. Uses the `eyebrow-2` token utility
 * (0.6875rem · w700 · tracking .08em · uppercase · ink-3).
 */
export function Eyebrow({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn("eyebrow-2", className)} dir="auto" {...props} />;
}
