"use client";

// Reset-progress affordance for SAP Academy (§6). Confirmation dialog before any
// reset: shows scope, how many lessons return to "not completed", and that ONLY
// personal progress is cleared — never course content. Updates are reactive (the
// store emits), so all screens refresh immediately with no manual reload.
import { useState, type ReactNode } from "react";
import { RotateCcw, AlertTriangle } from "lucide-react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";

export function ResetButton({
  label,
  title,
  scopeText,
  count,
  onConfirm,
  danger,
  className,
  details,
  confirmLabel,
  irreversible,
  icon,
  note,
}: {
  label: string;
  title: string;
  scopeText: string;
  count: number;
  onConfirm: () => void;
  danger?: boolean;
  className?: string;
  details?: string[];       // itemized reset scope (§3) — overrides the default bullets
  confirmLabel?: string;    // custom confirm-button text (e.g. "אפס קורס")
  irreversible?: boolean;   // append the "cannot be undone" warning
  icon?: ReactNode;         // custom trigger icon (defaults to RotateCcw)
  note?: string;            // muted reassurance line under the bullets
}) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={className ?? "tap inline-flex items-center gap-1.5 rounded-lg border border-hairline px-2.5 py-1 text-[11.5px] font-bold text-ink-3 transition-colors hover:border-brand/40 hover:text-brand"}
      >
        {icon ?? <RotateCcw className="size-3.5" aria-hidden />}{label}
      </button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-md" dir="rtl">
          <div className="flex items-start gap-3">
            <span className={`grid size-10 shrink-0 place-items-center rounded-xl ${danger ? "bg-brand-soft text-brand" : "bg-amber-50 text-amber-600"}`}><AlertTriangle className="size-5" aria-hidden /></span>
            <div className="min-w-0">
              <DialogTitle className="text-[15px] font-extrabold text-ink-1">{title}</DialogTitle>
              <DialogDescription className="mt-1 text-[13px] text-ink-2">{scopeText}</DialogDescription>
              <ul className="mt-2.5 space-y-1 text-[12px] text-ink-3">
                {(details ?? [`${count} שיעורים יחזרו למצב לא-הושלם.`, "מתאפסת רק ההתקדמות האישית שלך.", "תוכן הקורס לא נמחק."]).map((d, i) => <li key={i}>• {d}</li>)}
              </ul>
              {note && <p className="mt-2.5 text-[12px] text-ink-2">{note}</p>}
              {irreversible && <p className="mt-2.5 flex items-center gap-1.5 text-[12px] font-bold text-red-600"><AlertTriangle className="size-3.5" aria-hidden />לא ניתן לבטל פעולה זו.</p>}
            </div>
          </div>
          <div className="mt-4 flex justify-end gap-2">
            <button onClick={() => setOpen(false)} className="tap rounded-xl border border-hairline px-4 py-2 text-[12.5px] font-bold text-ink-2 transition-colors hover:bg-surface-2">ביטול</button>
            <button onClick={() => { onConfirm(); setOpen(false); }} className={`tap rounded-xl px-4 py-2 text-[12.5px] font-extrabold text-white transition-colors ${danger ? "bg-red-600 hover:bg-red-700" : "bg-ink-1 hover:bg-black"}`}>{confirmLabel ?? (danger ? "אפס הכל" : "אפס")}</button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
