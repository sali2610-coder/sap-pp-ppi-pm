"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ShieldAlert } from "lucide-react";
import { SearchField, FilterBar, FilterButton, EmptyState } from "@/components/ui";
import { INCIDENTS, type Incident } from "@/data/troubleshooting";
import { pillInk } from "@/lib/pill-ink";

const MOD_COLOR: Record<string, string> = { PM: "#f97316", PP: "#2563eb", "PP-PI": "#6d28d9", Cross: "#475569" };
const MODULES: (Incident["module"] | "ALL")[] = ["ALL", "PM", "PP", "PP-PI", "Cross"];
const MOD_HE: Record<string, string> = { ALL: "הכל", PM: "אחזקה", PP: "ייצור", "PP-PI": "תהליכי", Cross: "חוצה" };

// Troubleshooting / incidents — built on the production Design System (SearchField / FilterBar).
export function IncidentExplorer() {
  const [q, setQ] = useState("");
  const [mod, setMod] = useState<(typeof MODULES)[number]>("ALL");
  const rows = useMemo(() => {
    const t = q.trim().toLowerCase();
    return INCIDENTS.filter((i) => (mod === "ALL" || i.module === mod) &&
      (!t || i.he.includes(q) || i.symptom.includes(q) || (i.error || "").toLowerCase().includes(t) || i.analyzeTcodes.some((c) => c.toLowerCase().includes(t))));
  }, [q, mod]);
  return (
    <div dir="rtl">
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center">
        <SearchField value={q} onChange={(e) => setQ(e.target.value)} placeholder="חיפוש תקלה · תסמין · קוד שגיאה · T-Code…" aria-label="חיפוש תקלות" />
        <FilterBar>
          {MODULES.map((m) => <FilterButton key={m} active={mod === m} accent={m === "ALL" ? "#d62027" : MOD_COLOR[m]} onClick={() => setMod(m)}>{MOD_HE[m]}</FilterButton>)}
        </FilterBar>
      </div>
      <p className="mb-2 text-xs font-bold text-ink-3">{rows.length} תקלות</p>
      {rows.length === 0 ? (
        <EmptyState icon={ShieldAlert} title="לא נמצאו תקלות תואמות" hint="נסה מונח חיפוש אחר או נקה את הסינון" suggestions={[{ label: "נקה חיפוש", onClick: () => setQ("") }, { label: "כל המודולים", onClick: () => setMod("ALL") }]} />
      ) : (
        <div className="grid gap-3 sm:grid-cols-2">
          {rows.map((i) => (
            <Link key={i.slug} href={`/troubleshooting/${i.slug}/`} className="lift group rounded-2xl border border-hairline bg-surface p-4 shadow-sm">
              <div className="mb-1.5 flex items-center gap-2">
                <span className="grid size-7 place-items-center rounded-lg bg-red-50"><ShieldAlert className="size-4 text-red-500" /></span>
                <span className="rounded-full px-2 py-0.5 text-[10px] font-bold" style={{ background: MOD_COLOR[i.module], color: pillInk(MOD_COLOR[i.module]) }}>{i.module}</span>
                <ArrowLeft className="ms-auto size-3.5 text-ink-3 transition group-hover:-translate-x-1 group-hover:text-brand" />
              </div>
              <h3 className="text-sm font-extrabold tracking-tight text-ink-1">{i.he}</h3>
              <p className="mt-1 line-clamp-2 text-[12px] leading-snug text-ink-3">{i.symptom}</p>
              {i.error && i.error !== "—" && <p className="tech mt-1.5 rounded bg-red-50 px-2 py-0.5 text-[10px] font-bold text-red-600" dir="ltr">{i.error}</p>}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
