import type { LucideIcon } from "lucide-react";
import { SearchX } from "lucide-react";

// D7 · Premium empty state — branded, composed (icon halo + guidance + optional
// suggestion chips) instead of a bare line.
export function EmptyState({
  icon: Icon = SearchX,
  title,
  hint,
  suggestions,
  className = "",
}: {
  icon?: LucideIcon;
  title: string;
  hint?: string;
  suggestions?: { label: string; onClick: () => void }[];
  className?: string;
}) {
  return (
    <div className={`flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-slate-200 bg-gradient-to-b from-slate-50/60 to-transparent px-6 py-14 text-center ${className}`}>
      <span className="relative grid size-16 place-items-center">
        <span className="absolute inset-0 rounded-2xl bg-brand/10 blur-md" aria-hidden />
        <span className="relative grid size-14 place-items-center rounded-2xl bg-white text-brand shadow-[var(--elev-1)] ring-1 ring-slate-100">
          <Icon className="size-7" />
        </span>
      </span>
      <div>
        <p className="text-sm font-extrabold text-slate-800">{title}</p>
        {hint && <p className="mt-1 text-xs text-slate-400">{hint}</p>}
      </div>
      {suggestions && suggestions.length > 0 && (
        <div className="flex flex-wrap justify-center gap-1.5">
          {suggestions.map((s) => (
            <button key={s.label} onClick={s.onClick} className="rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-xs font-bold text-slate-700 shadow-sm transition-all hover:-translate-y-px hover:border-brand/40 hover:text-brand" dir="auto">{s.label}</button>
          ))}
        </div>
      )}
    </div>
  );
}
