import Link from "next/link";
import { ArrowRight, ArrowLeft } from "lucide-react";
import type { EccS4 } from "@/components/ecc-s4-block";
import { EccS4Block } from "@/components/ecc-s4-block";
import { SapTip } from "@/components/sap-tip";

// Normalized model reused by every Wave-4 center → thin routes.
export interface CenterSection {
  title: string;
  tone?: string;
  type: "text" | "bullets" | "chips" | "linkchips" | "steps";
  text?: string;
  items?: string[];
}
export interface CenterItem {
  slug: string;
  module?: string;
  eyebrow: string;
  he: string;
  title: string;
  sub: string;
  accent: string;
  tag?: string;
  sections: CenterSection[];
  eccS4?: EccS4;
}

function LinkChip({ text }: { text: string }) {
  return <SapTip name={text}><span className="tech rounded-lg border border-hairline bg-surface-2 px-2.5 py-1 text-xs font-bold text-ink-2" dir="ltr">{text}</span></SapTip>;
}

function SectionView({ s }: { s: CenterSection }) {
  const tone = s.tone || "#475569";
  return (
    <section className="rounded-2xl border border-hairline bg-surface p-5 shadow-sm" dir="rtl">
      <h2 className="mb-2.5 flex items-center gap-2 text-sm font-extrabold tracking-tight text-ink-1"><span className="size-2 rounded-full" style={{ background: tone }} />{s.title}</h2>
      <div className="text-[13px] leading-relaxed text-ink-2">
        {s.type === "text" && <p>{s.text}</p>}
        {s.type === "bullets" && <ul className="space-y-1.5">{(s.items || []).map((it, i) => <li key={i} className="flex gap-2"><span className="mt-1.5 size-1.5 shrink-0 rounded-full" style={{ background: tone }} />{it}</li>)}</ul>}
        {s.type === "steps" && <ol className="space-y-2">{(s.items || []).map((it, i) => <li key={i} className="flex gap-2.5"><span className="grid size-6 shrink-0 place-items-center rounded-lg text-[11px] font-extrabold text-white" style={{ background: tone }}>{i + 1}</span><span className="pt-0.5">{it}</span></li>)}</ol>}
        {s.type === "chips" && <div className="flex flex-wrap gap-1.5">{(s.items || []).map((it) => <span key={it} className="tech rounded-lg border border-dashed border-hairline bg-surface px-2.5 py-1 text-xs font-bold text-ink-3" dir="ltr">{it}</span>)}</div>}
        {s.type === "linkchips" && <div className="flex flex-wrap gap-1.5">{(s.items || []).map((it) => <LinkChip key={it} text={it} />)}</div>}
      </div>
    </section>
  );
}

export function CenterDetail({ item, base, backLabel }: { item: CenterItem; base: string; backLabel: string }) {
  return (
    <div dir="rtl">
      <nav className="no-print mb-5 flex flex-wrap items-center gap-2 text-xs font-semibold text-ink-3">
        <Link href="/" className="hover:text-ink-2">ראשי</Link><ArrowRight className="size-3 rotate-180" />
        <Link href="/knowledge/" className="hover:text-ink-2">מרכז הידע</Link><ArrowRight className="size-3 rotate-180" />
        <Link href={base} className="hover:text-ink-2">{backLabel}</Link><ArrowRight className="size-3 rotate-180" />
        <span className="text-ink-2">{item.he}</span>
      </nav>
      <header className="relative mb-5 overflow-hidden rounded-3xl border border-hairline bg-surface p-7 shadow-sm">
        <span className="absolute inset-y-0 end-0 w-1.5" style={{ background: item.accent }} />
        <p className="eyebrow mb-1.5" style={{ color: item.accent }}>{item.eyebrow}</p>
        <h1 className="text-2xl font-extrabold tracking-tight text-ink-1">{item.he} · <span className="tech" dir="ltr">{item.title}</span></h1>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-ink-3">{item.sub}</p>
      </header>
      <div className="grid gap-4 lg:grid-cols-2">
        {item.sections.map((s, i) => <SectionView key={i} s={s} />)}
      </div>
      {item.eccS4 && <div className="mt-4"><EccS4Block data={item.eccS4} title={`ECC6 → S/4HANA · ${item.he}`} /></div>}
      <Link href={base} className="mt-6 inline-flex items-center gap-1.5 text-sm font-bold text-brand hover:underline">→ חזרה ל{backLabel}</Link>
    </div>
  );
}

export function CenterIndexGrid({ items, base }: { items: CenterItem[]; base: string }) {
  return (
    <div className="grid-adaptive" dir="rtl">
      {items.map((it) => (
        <Link key={it.slug} href={`${base}${it.slug}/`} className="lift card-premium group relative block overflow-hidden p-5">
          <span className="absolute inset-x-0 top-0 h-1" style={{ background: it.accent }} />
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="text-base font-extrabold tracking-tight text-ink-1">{it.he}</h3>
              <p className="tech text-xs font-bold text-ink-3" dir="ltr">{it.title}</p>
            </div>
            {(it.tag || it.module) && <span className="shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold text-white" style={{ background: it.accent }}>{it.tag || it.module}</span>}
          </div>
          <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-ink-3">{it.sub}</p>
          <span className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-brand">פתח<ArrowLeft className="size-3.5 rotate-180 transition-transform group-hover:-translate-x-1" /></span>
        </Link>
      ))}
    </div>
  );
}
