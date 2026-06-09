"use client";

import type { MigrationStatus } from "@/lib/types";
import { STATUS_META, statusColor } from "@/lib/status-meta";
import { useObjectStatus } from "@/lib/status-store";

export function StatusBadge({ id, seed }: { id: string; seed: MigrationStatus }) {
  const [status] = useObjectStatus(id, seed);
  const color = statusColor(status);
  return (
    <span
      className="glow inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold"
      style={
        {
          "--glow": color,
          background: `color-mix(in srgb, ${color} 14%, transparent)`,
          color,
        } as React.CSSProperties
      }
    >
      <span className="size-1.5 rounded-full" style={{ background: color, boxShadow: `0 0 6px ${color}` }} />
      {STATUS_META[status].he}
    </span>
  );
}
