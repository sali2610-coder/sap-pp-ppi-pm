"use client";

import type { MigrationStatus } from "@/lib/types";
import { STATUS_META } from "@/lib/status-meta";
import { useObjectStatus } from "@/lib/status-store";
import { Badge } from "@/components/ui/badge";

export function StatusBadge({ id, seed }: { id: string; seed: MigrationStatus }) {
  const [status] = useObjectStatus(id, seed);
  return <Badge className={STATUS_META[status].badge}>{STATUS_META[status].he}</Badge>;
}
