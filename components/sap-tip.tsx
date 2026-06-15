"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, AlertTriangle } from "lucide-react";
import { lookupEntity, type TipKind } from "@/lib/entity-lookup";

const KIND_COLOR: Record<TipKind, string> = {
  table: "#0891b2", tcode: "#475569", bapi: "#2563eb", idoc: "#7c3aed", fm: "#0d9488", cds: "#16a34a",
};

/**
 * Hover Intelligence wrapper. Wrap any entity chip/name; shows a tooltip with
 * what / module / ECC↔S4 + "פתח פירוט מלא". If the name resolves to nothing,
 * renders children untouched (zero overhead).
 */
export function SapTip({ name, children, linkless }: { name: string; children: React.ReactNode; linkless?: boolean }) {
  const tip = useMemo(() => lookupEntity(name), [name]);
  const [open, setOpen] = useState(false);
  if (!tip) return <>{children}</>;
  const accent = KIND_COLOR[tip.kind];
  return (
    <span className="relative inline-flex"
      onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)} onBlur={() => setOpen(false)}>
      <span className="cursor-help underline decoration-dotted decoration-slate-300 underline-offset-2">{children}</span>
      {open && (
        <span role="tooltip" dir="rtl"
          className="absolute bottom-full start-0 z-[70] mb-2 w-72 max-w-[88vw] rounded-2xl border border-slate-200 bg-white p-3.5 text-start shadow-xl">
          <span className="mb-1.5 flex items-center gap-2">
            <span className="rounded-full px-2 py-0.5 text-[10px] font-bold text-white" style={{ background: accent }}>{tip.kindHe}</span>
            <span className="tech text-sm font-extrabold text-slate-900" dir="ltr">{tip.name}</span>
            {tip.module && <span className="ms-auto text-[10px] font-bold text-slate-400">{tip.module}</span>}
          </span>
          <span className="block text-xs leading-relaxed text-slate-600">{tip.he}</span>
          {(tip.ecc || tip.s4) && (
            <span className="mt-2 block space-y-1 border-t border-slate-100 pt-2 text-[11px] leading-relaxed">
              {tip.ecc && <span className="block text-slate-500"><b className="text-slate-400">ECC:</b> {tip.ecc}</span>}
              {tip.s4 && <span className="block text-slate-500"><b className="text-green-600">S/4:</b> {tip.s4}</span>}
            </span>
          )}
          <span className="mt-2.5 flex items-center justify-between border-t border-slate-100 pt-2">
            {tip.verified
              ? <span className="inline-flex items-center gap-1 text-[10px] font-bold text-green-600"><CheckCircle2 className="size-3" />אומת ידנית</span>
              : <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-600"><AlertTriangle className="size-3" />לא מאומת</span>}
            {linkless
              ? <span className="inline-flex items-center gap-1 text-[11px] font-bold text-brand">לחץ לפירוט מלא<ArrowLeft className="size-3" /></span>
              : <Link href={tip.href} className="inline-flex items-center gap-1 text-[11px] font-bold text-brand hover:underline">פתח פירוט מלא<ArrowLeft className="size-3" /></Link>}
          </span>
        </span>
      )}
    </span>
  );
}
