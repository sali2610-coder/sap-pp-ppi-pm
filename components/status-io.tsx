"use client";

import { useRef } from "react";
import { Download, Upload } from "lucide-react";
import { exportStatusMap, setStatusMap } from "@/lib/status-store";
import { MIGRATION_STATUSES, type MigrationStatus } from "@/lib/types";
import { Button } from "@/components/ui/button";

const VALID = new Set<string>(MIGRATION_STATUSES);

// Export / import the localStorage migration status as a JSON file — lets the
// team back up or share progress across machines (fully offline).
export function StatusIO() {
  const fileRef = useRef<HTMLInputElement>(null);

  function doExport() {
    const data = exportStatusMap();
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `neo-migration-status.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function doImport(file: File) {
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(String(reader.result)) as Record<string, string>;
        const clean: Record<string, MigrationStatus> = {};
        for (const [k, v] of Object.entries(parsed)) {
          if (VALID.has(v)) clean[k] = v as MigrationStatus;
        }
        setStatusMap(clean);
      } catch {
        alert("קובץ לא תקין — נדרש JSON של סטטוסים.");
      }
    };
    reader.readAsText(file);
  }

  return (
    <div className="flex items-center gap-2">
      <Button variant="outline" size="sm" onClick={doExport}>
        <Download />
        ייצוא סטטוס
      </Button>
      <Button variant="outline" size="sm" onClick={() => fileRef.current?.click()}>
        <Upload />
        ייבוא סטטוס
      </Button>
      <input
        ref={fileRef}
        type="file"
        accept="application/json,.json"
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) doImport(f);
          e.target.value = "";
        }}
      />
    </div>
  );
}
