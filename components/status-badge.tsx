"use client";

import type { MigrationStatus } from "@/lib/types";
import { STATUS_META, statusColor } from "@/lib/status-meta";
import { useObjectStatus } from "@/lib/status-store";
import { useI18n } from "@/lib/i18n";

export function StatusBadge({ id, seed }: { id: string; seed: MigrationStatus }) {
  const [status] = useObjectStatus(id, seed);
  const { pick } = useI18n();
  const color = statusColor(status);
  const m = STATUS_META[status];
  return (
    <span
      className="glow inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold"
      style={{ "--glow": color, background: `color-mix(in srgb, ${color} 14%, transparent)`, color } as React.CSSProperties}
    >
      <span className="size-1.5 rounded-full" style={{ background: color, boxShadow: `0 0 6px ${color}` }} />
      {pick(m.he, m.en)}
    </span>
  );
}
