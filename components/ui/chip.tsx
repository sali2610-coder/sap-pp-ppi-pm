import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * Chip / CodeChip — canonical reference chip (Design System v2).
 * Blueprint: component-catalog.md — SAP codes always mono + LTR isolation.
 * Presentational only: dead-link gating stays at the call site (wrap with the
 * app's SmartLink when a route exists — never render a bare dead link here).
 * `code` variant applies `.tech` (mono + LTR bidi-isolate) from globals.css.
 */
const chipVariants = cva(
  "inline-flex items-center gap-1 rounded-lg border px-2 py-1 text-[11.5px] font-bold [&_svg]:size-3 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        code: "tech border-hairline text-ink-1",
        label: "border-hairline bg-surface text-ink-2",
      },
      interactive: {
        true: "transition-colors hover:border-brand/40 hover:text-brand cursor-pointer",
        false: "",
      },
      muted: { true: "bg-surface-2 text-ink-3", false: "" },
    },
    defaultVariants: { variant: "code", interactive: false, muted: false },
  },
);

export interface ChipProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof chipVariants> {}

export function Chip({ className, variant, interactive, muted, ...props }: ChipProps) {
  return <span className={cn(chipVariants({ variant, interactive, muted }), className)} {...props} />;
}

export { chipVariants };
