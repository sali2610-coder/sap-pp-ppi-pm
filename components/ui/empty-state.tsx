import type { LucideIcon } from "lucide-react";
import { SearchX } from "lucide-react";

export function EmptyState({
  icon: Icon = SearchX,
  title,
  hint,
  className = "",
}: {
  icon?: LucideIcon;
  title: string;
  hint?: string;
  className?: string;
}) {
  return (
    <div className={`flex flex-col items-center justify-center gap-3 px-6 py-14 text-center ${className}`}>
      <span className="grid size-14 place-items-center rounded-2xl bg-slate-100 text-slate-400">
        <Icon className="size-7" />
      </span>
      <div>
        <p className="text-sm font-bold text-slate-700">{title}</p>
        {hint && <p className="mt-1 text-xs text-slate-400">{hint}</p>}
      </div>
    </div>
  );
}
