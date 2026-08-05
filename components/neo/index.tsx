"use client";

/**
 * The Library design language, extracted so three screens can share it.
 *
 * These are lifted verbatim from app/library/page.tsx, which is the quality bar
 * for the platform. Digital Library, Ask the Library and AI Chat all render
 * through this kit so they read as one product.
 *
 * NOTE: this is deliberately separate from components/ui/*, which is an older
 * kit used by ~11 reference pages and contradicts this language at several
 * load-bearing points (boxed page headers, dashed empty states, different icon
 * tiles). Bending that kit to match would restyle those pages silently. Do not
 * mix the two within one screen.
 */

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import type { ReactNode } from "react";

/* ------------------------------------------------------------------ motion */

/** The Library's entrance. One per top-level region, never nested. */
export function Reveal({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay, ease: [0.2, 0.7, 0.2, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ header */

/**
 * The page/section header. A tinted tile, a letterspaced eyebrow and a display
 * title — no surrounding box. `as="h1"` makes it the page heading.
 */
export function PageHeader({
  icon, eyebrow, title, tint = "#0b0c0e", as = "h2", children,
}: {
  icon: ReactNode; eyebrow: string; title: string; tint?: string;
  as?: "h1" | "h2"; children?: ReactNode;
}) {
  const H = as;
  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div className="flex items-center gap-3">
        <span
          className="grid size-11 shrink-0 place-items-center rounded-2xl text-white"
          style={{ background: tint, boxShadow: `0 10px 24px ${tint}44` }}
        >
          {icon}
        </span>
        <div className="min-w-0">
          <div className="text-[10.5px] font-bold uppercase tracking-[0.22em]" style={{ color: tint }}>
            {eyebrow}
          </div>
          <H className="font-display text-xl text-ink-1 sm:text-2xl">{title}</H>
        </div>
      </div>
      {children && <div className="flex items-center gap-3">{children}</div>}
    </div>
  );
}

/** Editorial group label with a flexing rule — used between shelf sections. */
export function ShelfDivider({ label, count }: { label: string; count?: string }) {
  return (
    <div className="flex items-center gap-2.5">
      <span aria-hidden className="h-4 w-1 rounded-full bg-brand" />
      <h3 className="text-[13px] font-extrabold uppercase tracking-[0.14em] text-ink-2">{label}</h3>
      {count && <span className="text-[11px] font-semibold text-ink-3">· {count}</span>}
      <span aria-hidden className="h-px flex-1 bg-hairline" />
    </div>
  );
}

/* ------------------------------------------------------------------ surface */

const PAD = {
  panel: "p-4 sm:p-5",
  dialog: "p-5 sm:p-6",
  hero: "p-7 sm:p-9",
  none: "",
} as const;

/** The floating panel. One border level per region — never nest two. */
export function Panel({
  children, padding = "panel", className = "", as = "div",
}: {
  children: ReactNode; padding?: keyof typeof PAD; className?: string; as?: "div" | "section" | "aside";
}) {
  const C = as;
  return (
    <C className={`rounded-3xl border border-hairline bg-surface shadow-[0_12px_34px_-22px_rgba(15,23,42,0.5)] ${PAD[padding]} ${className}`}>
      {children}
    </C>
  );
}

/** The dark anchor. Max two per page — it is the loudest thing on screen. */
export function DarkPanel({
  children, padding = "panel", className = "", grid = false,
}: {
  children: ReactNode; padding?: keyof typeof PAD; className?: string; grid?: boolean;
}) {
  return (
    <div className={`relative overflow-hidden rounded-3xl border border-hairline bg-gradient-to-bl from-ink-1 via-[#15171b] to-[#0b0c0e] text-white shadow-[0_12px_34px_-22px_rgba(15,23,42,0.5)] ${PAD[padding]} ${className}`}>
      {grid && (
        <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{ backgroundImage: "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)", backgroundSize: "44px 44px" }} />
      )}
      <div aria-hidden className="pointer-events-none absolute -end-10 -top-10 size-48 rounded-full bg-brand/25 blur-3xl" />
      <div className="relative">{children}</div>
    </div>
  );
}

/* -------------------------------------------------------------------- atoms */

const TONE = {
  slate: "bg-surface-2 text-ink-2",
  green: "bg-emerald-50 text-emerald-700",
  amber: "bg-amber-50 text-amber-700",
  brand: "bg-brand-soft text-brand",
} as const;

export function NeoChip({ children, tone = "slate" }: { children: ReactNode; tone?: keyof typeof TONE }) {
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold ${TONE[tone]}`}>
      {children}
    </span>
  );
}

/** Primary pill CTA. Brightness on hover, never a colour swap. */
export function CTA({
  href, onClick, children, tint, icon,
}: {
  href?: string; onClick?: () => void; children: ReactNode; tint?: string; icon?: ReactNode;
}) {
  const cls =
    "group inline-flex items-center gap-2 rounded-2xl px-5 py-2.5 text-sm font-extrabold text-white transition hover:brightness-110 active:scale-95";
  const style = { background: tint || "var(--brand)" };
  const inner = (
    <>
      {children}
      {icon && (
        <span className="grid size-6 place-items-center rounded-full bg-white/20 transition group-hover:-translate-x-0.5">
          {icon}
        </span>
      )}
    </>
  );
  return href
    ? <Link href={href} className={cls} style={style}>{inner}</Link>
    : <button onClick={onClick} className={cls} style={style}>{inner}</button>;
}

/* ------------------------------------------------------------------ states */

/** Chrome-free empty state: generous space, one tile, one line, one action. */
export function EmptyState({
  icon, title, hint, action,
}: {
  icon: ReactNode; title: string; hint?: string; action?: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center gap-3 py-20 text-center">
      <span className="grid size-16 place-items-center rounded-3xl bg-surface-2 text-ink-3">{icon}</span>
      <p className="text-base font-bold text-ink-1">{title}</p>
      {hint && <p className="max-w-md text-xs leading-relaxed text-ink-3">{hint}</p>}
      {action}
    </div>
  );
}

/** Skeleton lines that reserve the incoming content's footprint. */
export function LoadingState({ lines = 4, width = "74ch" }: { lines?: number; width?: string }) {
  const w = [100, 96, 88, 70, 92, 64];
  return (
    <div className="space-y-2.5" style={{ maxWidth: width }} aria-hidden>
      {Array.from({ length: lines }, (_, i) => (
        <div key={i} className="h-3 rounded-full bg-surface-2 motion-safe:animate-[aiPulse_1.6s_ease-in-out_infinite]"
          style={{ width: `${w[i % w.length]}%`, animationDelay: `${i * 90}ms` }} />
      ))}
    </div>
  );
}

/** A failure the reader can act on. Never a status code or provider name. */
export function ErrorState({ message, onRetry, icon }: { message: string; onRetry?: () => void; icon?: ReactNode }) {
  return (
    <div role="alert" className="flex items-start gap-2.5 rounded-3xl bg-surface-2/70 p-4 sm:p-5">
      {icon && <span className="mt-px grid size-7 shrink-0 place-items-center rounded-2xl bg-surface text-ink-3">{icon}</span>}
      <div className="min-w-0 flex-1">
        <p className="text-[13px] leading-relaxed text-ink-2">{message}</p>
        {onRetry && (
          <button onClick={onRetry}
            className="mt-2 rounded-2xl bg-surface px-3 py-1.5 text-xs font-bold text-ink-2 ring-1 ring-hairline transition hover:text-brand hover:ring-brand/40 active:scale-95">
            נסה שוב
          </button>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ prompts */

/** Suggested / follow-up questions. One component, both roles. */
export function PromptSuggestions({
  items, onPick, title, icon,
}: {
  items: string[]; onPick: (q: string) => void; title?: string; icon?: ReactNode;
}) {
  if (!items.length) return null;
  return (
    <div>
      {title && (
        <div className="mb-1.5 flex items-center gap-1.5 text-[11px] font-bold text-ink-3">
          {icon}{title}
        </div>
      )}
      <div className="flex flex-wrap gap-1.5">
        {items.map((q, i) => (
          <button key={i} onClick={() => onPick(q)}
            className="rounded-2xl border border-hairline bg-surface px-3 py-1.5 text-start text-xs font-semibold text-ink-2 transition hover:-translate-y-0.5 hover:border-brand/40 hover:text-brand active:scale-95">
            {q}
          </button>
        ))}
      </div>
    </div>
  );
}

/** Row of answer-level actions: a few primaries, the rest behind a toggle. */
export function AIActionBar<T extends { id: string; label: string }>({
  actions, primaryIds, onPick, expanded, onToggle,
}: {
  actions: T[]; primaryIds: string[]; onPick: (a: T) => void;
  expanded: boolean; onToggle: () => void;
}) {
  const shown = expanded ? actions : actions.filter((a) => primaryIds.includes(a.id));
  return (
    <div className="flex flex-wrap items-center gap-1.5">
      {shown.map((a) => (
        <button key={a.id} onClick={() => onPick(a)}
          className="rounded-2xl bg-surface-2 px-3 py-1.5 text-xs font-bold text-ink-2 transition hover:-translate-y-0.5 hover:bg-brand-soft hover:text-brand active:scale-95">
          {a.label}
        </button>
      ))}
      {actions.length > shown.length || expanded ? (
        <button onClick={onToggle}
          className="rounded-2xl px-2.5 py-1.5 text-xs font-bold text-ink-3 transition hover:text-brand">
          {expanded ? "פחות" : "עוד פעולות"}
        </button>
      ) : null}
    </div>
  );
}
