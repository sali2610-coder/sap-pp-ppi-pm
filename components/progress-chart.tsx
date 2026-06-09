"use client";

import { useMemo } from "react";
import { MIGRATION_STATUSES, type MigrationStatus, type SAPTable } from "@/lib/types";
import { STATUS_META, statusColor } from "@/lib/status-meta";
import { useStatusMap } from "@/lib/status-store";

function useCounts(tables: SAPTable[]) {
  const map = useStatusMap();
  return useMemo(() => {
    const counts: Record<MigrationStatus, number> = {
      "Not started": 0,
      "In analysis": 0,
      "In conversion": 0,
      Tested: 0,
      Done: 0,
    };
    for (const t of tables) counts[(map[t.id] ?? t.migrationStatus) as MigrationStatus]++;
    return counts;
  }, [tables, map]);
}

// Pure SVG donut — no chart lib, no canvas (offline + light).
function Donut({ counts, total }: { counts: Record<MigrationStatus, number>; total: number }) {
  const R = 52;
  const C = 2 * Math.PI * R;
  let offset = 0;
  const done = counts["Done"];
  const pct = total ? Math.round((done / total) * 100) : 0;

  return (
    <svg viewBox="0 0 130 130" className="size-32 shrink-0 -rotate-90 rtl:rotate-90">
      <circle cx="65" cy="65" r={R} fill="none" stroke="var(--muted)" strokeWidth="13" />
      {MIGRATION_STATUSES.map((s) => {
        const val = counts[s];
        if (!val) return null;
        const len = (val / total) * C;
        const seg = (
          <circle
            key={s}
            cx="65"
            cy="65"
            r={R}
            fill="none"
            stroke={statusColor(s)}
            strokeWidth="13"
            strokeDasharray={`${len} ${C - len}`}
            strokeDashoffset={-offset}
          />
        );
        offset += len;
        return seg;
      })}
      <text
        x="65"
        y="65"
        textAnchor="middle"
        dominantBaseline="central"
        className="rotate-90 rtl:-rotate-90 fill-foreground"
        style={{ transformOrigin: "65px 65px", fontSize: "22px", fontWeight: 700 }}
      >
        {pct}%
      </text>
    </svg>
  );
}

export function ProgressChart({ tables, title }: { tables: SAPTable[]; title?: string }) {
  const counts = useCounts(tables);
  const total = tables.length;

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
      <Donut counts={counts} total={total} />
      <div className="flex-1 space-y-2">
        {title && <p className="text-sm font-semibold">{title}</p>}
        {/* stacked bar */}
        <div className="flex h-3 w-full overflow-hidden rounded-full bg-muted">
          {MIGRATION_STATUSES.map((s) =>
            counts[s] ? (
              <div
                key={s}
                style={{ width: `${(counts[s] / total) * 100}%`, background: statusColor(s) }}
                title={`${STATUS_META[s].he}: ${counts[s]}`}
              />
            ) : null,
          )}
        </div>
        {/* legend */}
        <ul className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs sm:grid-cols-3">
          {MIGRATION_STATUSES.map((s) => (
            <li key={s} className="flex items-center gap-1.5">
              <span className="inline-block size-2.5 rounded-sm" style={{ background: statusColor(s) }} />
              <span className="text-muted-foreground">{STATUS_META[s].he}</span>
              <span className="font-semibold tabular-nums">{counts[s]}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
