"use client";

import { MIGRATION_STATUSES, type MigrationStatus } from "@/lib/types";
import { STATUS_META, statusColor } from "@/lib/status-meta";
import { useObjectStatus } from "@/lib/status-store";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function StatusSelect({ id, seed }: { id: string; seed: MigrationStatus }) {
  const [status, setStatus] = useObjectStatus(id, seed);
  return (
    <Select value={status} onValueChange={(v) => setStatus(v as MigrationStatus)}>
      <SelectTrigger
        className="w-36"
        style={{ borderColor: statusColor(status), color: statusColor(status) }}
        aria-label="שינוי סטטוס מיגרציה"
      >
        <span className="flex items-center gap-1.5">
          <span
            className="inline-block size-2 rounded-full"
            style={{ background: statusColor(status) }}
          />
          <SelectValue />
        </span>
      </SelectTrigger>
      <SelectContent>
        {MIGRATION_STATUSES.map((s) => (
          <SelectItem key={s} value={s}>
            <span className="flex items-center gap-2">
              <span className="inline-block size-2 rounded-full" style={{ background: statusColor(s) }} />
              {STATUS_META[s].he}
            </span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
