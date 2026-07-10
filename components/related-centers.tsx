"use client";

import Link from "next/link";
import { centersExcept } from "@/lib/centers";

// Cross-link strip surfacing the platform centers from anywhere (PM/PP-PI/S4/
// Migration hubs etc). Prevents "isolated island" centers. Pass `exclude` with
// the current center id to drop self.
export function RelatedCenters({ exclude, title = "מרכזים קשורים" }: { exclude?: string; title?: string }) {
  const items = centersExcept(exclude);
  return (
    <section dir="rtl" className="mt-6 rounded-2xl border border-slate-200 bg-slate-50/60 p-4">
      <div className="mb-2.5 text-[11px] font-bold uppercase tracking-wide text-slate-400">{title}</div>
      <div className="grid-adaptive-sm">
        {items.map((c) => { const Ic = c.Icon; return (
          <Link key={c.id} href={c.href} className="group flex items-start gap-2.5 rounded-xl border border-slate-200 bg-white p-3 transition hover:-translate-y-0.5 hover:border-brand/40 hover:shadow-sm">
            <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-brand/10 text-brand"><Ic className="size-4" /></span>
            <span className="min-w-0">
              <span className="block text-[13px] font-extrabold text-slate-800 group-hover:text-brand">{c.he}</span>
              <span className="block text-[11px] leading-snug text-slate-500">{c.desc}</span>
            </span>
          </Link>
        ); })}
      </div>
    </section>
  );
}
