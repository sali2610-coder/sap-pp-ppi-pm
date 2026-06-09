"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import { searchTables } from "@/lib/data";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

const HIT_LABEL: Record<string, string> = {
  table: "טבלה",
  field: "שדה",
  tcode: "T-Code",
  desc: "תיאור",
};

// Global search across BOTH modules — instant client-side filtering over the
// in-memory dataset (100+ tables). Results link into the relevant hub.
export function OmniSearch({ placeholder = "חיפוש טבלה, שדה, T-Code או תיאור…" }: { placeholder?: string }) {
  const [q, setQ] = useState("");
  const results = useMemo(() => (q.trim() ? searchTables(q).slice(0, 12) : []), [q]);
  const open = q.trim().length > 0;

  return (
    <div className="relative w-full max-w-xl">
      <Search className="pointer-events-none absolute top-1/2 size-4 -translate-y-1/2 text-muted-foreground end-3" />
      <Input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder={placeholder}
        className="pe-9"
        aria-label="חיפוש"
      />
      {open && (
        <div className="absolute z-40 mt-1 max-h-96 w-full overflow-y-auto rounded-md border border-border bg-card shadow-lg">
          {results.length === 0 ? (
            <p className="p-4 text-sm text-muted-foreground">לא נמצאו תוצאות.</p>
          ) : (
            <ul className="divide-y divide-border">
              {results.map(({ table, hit }) => (
                <li key={table.id}>
                  <Link
                    href={`/${table.module === "PM" ? "pm" : "pp-pi"}/?q=${encodeURIComponent(table.tableName)}`}
                    className="flex items-center justify-between gap-3 p-3 hover:bg-muted"
                    onClick={() => setQ("")}
                  >
                    <span className="min-w-0">
                      <span className="tech font-bold text-brand">{table.tableName}</span>
                      <span className="ms-2 text-sm text-muted-foreground">{table.descriptionHe}</span>
                    </span>
                    <span className="flex shrink-0 items-center gap-1.5">
                      <Badge className="bg-muted text-muted-foreground">{table.module}</Badge>
                      <Badge className="bg-brand/10 text-brand">{HIT_LABEL[hit]}</Badge>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
