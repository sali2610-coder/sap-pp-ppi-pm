import { forWhiteText } from "@/lib/contrast";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function Crumb({ trail }: { trail: { href?: string; label: string }[] }) {
  return (
    <nav className="no-print mb-5 flex flex-wrap items-center gap-2 text-xs font-semibold text-ink-3" dir="rtl">
      <Link href="/" className="hover:text-ink-2">ראשי</Link>
      {trail.map((t, i) => (
        <span key={i} className="flex items-center gap-2">
          <ArrowRight className="size-3 rotate-180" />
          {t.href ? <Link href={t.href} className="hover:text-ink-2">{t.label}</Link> : <span className="text-ink-2">{t.label}</span>}
        </span>
      ))}
    </nav>
  );
}

export function CenterHeader({ eyebrow, title, sub, accent }: { eyebrow: string; title: string; sub: string; accent: string }) {
  return (
    <header className="relative mb-5 scroll-mt-24 overflow-hidden rounded-3xl border border-hairline bg-surface p-5 shadow-[var(--elev-2)] before:pointer-events-none before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-surface/60 sm:mb-7 sm:p-7" dir="rtl">
      <span className="absolute inset-y-0 end-0 w-1.5" style={{ background: accent }} />
      <span className="pointer-events-none absolute -left-10 -top-10 size-40 rounded-full opacity-[0.06] blur-2xl" style={{ background: accent }} aria-hidden />
      <span className="eyebrow mb-2 inline-flex items-center rounded-full px-2.5 py-1" style={{ color: accent, background: accent + "12" }}>{eyebrow}</span>
      <h1 className="text-balance text-[26px] font-extrabold leading-[1.12] tracking-tight text-ink-1 sm:text-3xl">{title}</h1>
      <p className="mt-2 max-w-3xl text-[13.5px] leading-relaxed text-ink-3 sm:text-sm">{sub}</p>
    </header>
  );
}

export function Block({ title, accent = "#475569", children }: { title: string; accent?: string; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl border border-hairline bg-surface p-5 shadow-sm" dir="rtl">
      <h2 className="mb-2.5 flex items-center gap-2 text-sm font-extrabold tracking-tight text-ink-1">
        <span className="size-2 rounded-full" style={{ background: accent }} />{title}
      </h2>
      <div className="text-sm leading-relaxed text-ink-2">{children}</div>
    </section>
  );
}

export function TwoCol({ a, b, aTitle, bTitle, aAccent = "#64748b", bAccent = "#16a34a" }: { a: React.ReactNode; b: React.ReactNode; aTitle: string; bTitle: string; aAccent?: string; bAccent?: string }) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Block title={aTitle} accent={aAccent}>{a}</Block>
      <Block title={bTitle} accent={bAccent}>{b}</Block>
    </div>
  );
}

export function Chips({ items, render }: { items: string[]; render?: (s: string) => React.ReactNode }) {
  if (!items.length) return <span className="text-ink-3">—</span>;
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((s, i) => render ? <span key={i}>{render(s)}</span> : (
        <span key={i} className="tech rounded-lg border border-hairline bg-surface-2 px-2.5 py-1 text-xs font-bold text-ink-2" dir="ltr">{s}</span>
      ))}
    </div>
  );
}

export function Bullets({ items }: { items: string[] }) {
  if (!items.length) return <span className="text-ink-3">—</span>;
  return (
    <ul className="space-y-1.5">
      {items.map((s, i) => (
        <li key={i} className="flex gap-2"><span className="mt-2 size-1.5 shrink-0 rounded-full bg-brand" /><span>{s}</span></li>
      ))}
    </ul>
  );
}

// Card grid for the center index pages
export function CardGrid({ children }: { children: React.ReactNode }) {
  return <div className="grid-adaptive" dir="rtl">{children}</div>;
}

export function IndexCard({ href, title, he, tag, tagColor, desc }: { href: string; title: string; he: string; tag?: string; tagColor?: string; desc?: string }) {
  return (
    <Link href={href} className="lift card-premium group relative block overflow-hidden p-5" dir="rtl">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="text-base font-extrabold tracking-tight text-ink-1">{he}</h3>
          <p className="tech text-xs font-bold text-ink-3" dir="ltr">{title}</p>
        </div>
        {tag && <span className="shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold text-white" style={{ background: forWhiteText(tagColor || "#64748b")}}>{tag}</span>}
      </div>
      {desc && <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-ink-3">{desc}</p>}
      <span className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-brand">פתח<ArrowRight className="size-3.5 rotate-180 transition-transform group-hover:-translate-x-1" /></span>
    </Link>
  );
}
