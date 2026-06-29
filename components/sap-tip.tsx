"use client";

import { useMemo, useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, AlertTriangle, Lightbulb, Target, Briefcase, GitBranch, Network, MapPin, PanelRight } from "lucide-react";
import { lookupEntity, type TipKind } from "@/lib/entity-lookup";
import { inspectEntity } from "@/lib/workspace";

const KIND_COLOR: Record<TipKind, string> = {
  table: "#0891b2", tcode: "#475569", bapi: "#2563eb", idoc: "#7c3aed", fm: "#0d9488", cds: "#16a34a",
};

/**
 * Hover Intelligence — "mini mentor". Wrap any entity chip/name. On hover/focus
 * shows a premium card: simple explanation · business purpose · consultant tip ·
 * common mistake · where it appears · related objects + Open/Graph actions.
 * If the name resolves to nothing, renders children untouched (zero overhead).
 */
export function SapTip({ name, children, linkless, bare }: { name: string; children: React.ReactNode; linkless?: boolean; bare?: boolean }) {
  const tip = useMemo(() => lookupEntity(name), [name]);
  const [open, setOpen] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  if (!tip) return <>{children}</>;
  const accent = KIND_COLOR[tip.kind];
  const relBase = tip.relatedKind === "tcode" ? "/tcode/" : "/object/";
  const show = () => { if (timer.current) clearTimeout(timer.current); timer.current = setTimeout(() => setOpen(true), 110); };
  const hide = () => { if (timer.current) clearTimeout(timer.current); timer.current = setTimeout(() => setOpen(false), 80); };

  const Row = ({ icon, color, label, text }: { icon: React.ReactNode; color: string; label: string; text: string }) => (
    <span className="block">
      <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wide" style={{ color }}>{icon}{label}</span>
      <span className="block text-[12px] leading-relaxed text-slate-600">{text}</span>
    </span>
  );

  return (
    <span className="relative inline-flex" onMouseEnter={show} onMouseLeave={hide} onFocus={show} onBlur={hide}>
      <span className={bare ? "cursor-help" : "cursor-help underline decoration-dotted decoration-slate-300 underline-offset-2"}>{children}</span>
      {open && (
        <span role="tooltip" dir="rtl" onMouseEnter={show} onMouseLeave={hide}
          className="absolute bottom-full start-0 z-[80] mb-1.5 block w-80 max-w-[90vw] space-y-2 rounded-2xl border border-slate-200 bg-white p-3.5 text-start shadow-2xl">
          {/* header */}
          <span className="flex items-center gap-2">
            <span className="rounded-full px-2 py-0.5 text-[10px] font-bold text-white" style={{ background: accent }}>{tip.kindHe}</span>
            <span className="tech text-sm font-extrabold text-slate-900" dir="ltr">{tip.name}</span>
            {tip.module && <span className="ms-auto text-[10px] font-bold text-slate-400">{tip.module}</span>}
          </span>

          {/* simple explanation */}
          {tip.he && <span className="block text-[12.5px] font-semibold leading-relaxed text-slate-700">{tip.he}</span>}

          {/* mini-mentor rows */}
          {tip.purpose && <Row icon={<Target className="size-3" />} color="#2563eb" label="למה צריך" text={tip.purpose} />}
          {tip.consultantTip && <Row icon={<Briefcase className="size-3" />} color="#7c3aed" label="מה היועץ עושה" text={tip.consultantTip} />}
          {tip.mistake && <Row icon={<AlertTriangle className="size-3" />} color="#dc2626" label="טעות נפוצה" text={tip.mistake} />}
          {tip.where && <Row icon={<MapPin className="size-3" />} color="#0d9488" label="איפה בפרויקט" text={tip.where} />}

          {/* ECC/S4 for objects that carry it (cds/fm) */}
          {(tip.ecc || tip.s4) && (
            <span className="block space-y-0.5 rounded-lg bg-slate-50 p-2 text-[11px] leading-relaxed">
              {tip.ecc && <span className="block text-slate-500"><b className="text-slate-400">ECC:</b> {tip.ecc}</span>}
              {tip.s4 && <span className="block text-slate-500"><b className="text-green-600">S/4:</b> {tip.s4}</span>}
            </span>
          )}

          {/* related */}
          {tip.related && tip.related.length > 0 && (
            <span className="block">
              <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wide text-slate-400"><GitBranch className="size-3" />קשור</span>
              <span className="mt-0.5 flex flex-wrap gap-1">{tip.related.map((r) => <Link key={r} href={`${relBase}${encodeURIComponent(r)}/`} className="tech rounded-md bg-slate-100 px-1.5 py-0.5 text-[10.5px] font-bold text-slate-600 hover:bg-brand/10 hover:text-brand" dir="ltr">{r}</Link>)}</span>
            </span>
          )}

          {/* footer */}
          <span className="flex items-center justify-between border-t border-slate-100 pt-2">
            {tip.verified
              ? <span className="inline-flex items-center gap-1 text-[10px] font-bold text-green-600"><CheckCircle2 className="size-3" />מאומת</span>
              : <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-600"><AlertTriangle className="size-3" />לא מאומת</span>}
            <span className="flex items-center gap-2.5">
              <button type="button" onClick={(e) => { e.preventDefault(); inspectEntity(tip.name); }} className="inline-flex items-center gap-0.5 text-[11px] font-bold text-slate-500 hover:text-brand" aria-label="שלח למפקח"><PanelRight className="size-3" />מפקח</button>
              {tip.graphHref && <Link href={tip.graphHref} className="inline-flex items-center gap-0.5 text-[11px] font-bold text-slate-500 hover:text-brand"><Network className="size-3" />גרף</Link>}
              {linkless
                ? <span className="inline-flex items-center gap-1 text-[11px] font-bold text-brand"><Lightbulb className="size-3" />פירוט מלא</span>
                : <Link href={tip.href} className="inline-flex items-center gap-1 text-[11px] font-bold text-brand hover:underline">פתח (Wiki)<ArrowLeft className="size-3" /></Link>}
            </span>
          </span>
        </span>
      )}
    </span>
  );
}
