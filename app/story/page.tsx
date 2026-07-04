import Link from "next/link";
import { STORIES } from "@/data/story/pppi-process-order";

export const metadata = { title: "סיורים מודרכים · Project NEO" };

export default function StoryHome() {
  const stories = Object.values(STORIES);
  return (
    <div className="mx-auto max-w-3xl space-y-6" dir="rtl">
      <header className="relative overflow-hidden rounded-3xl bg-gradient-to-l from-brand-dark via-brand to-brand p-7 text-white shadow-lg">
        <div className="pointer-events-none absolute -left-16 -top-16 size-56 rounded-full bg-white/10 blur-3xl" />
        <div className="relative">
          <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/70">NEO Story Mode</div>
          <h1 className="mt-1 text-3xl font-extrabold">סיור מודרך בתהליך</h1>
          <p className="mt-1.5 max-w-xl text-sm text-white/85">למד תהליך SAP אמיתי מקצה לקצה — שלב אחרי שלב, עם הסבר, טבלאות, T-Codes והשפעת S/4.</p>
        </div>
      </header>
      <div className="space-y-3">
        {stories.map((s) => (
          <Link key={s.id} href={`/story/${s.id}/`} className="group flex items-center gap-4 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-brand/40 hover:shadow-md active:scale-[.99]">
            <span className="grid size-12 shrink-0 place-items-center rounded-2xl text-lg font-extrabold text-white shadow-sm" style={{ background: s.accent }}>{s.module === "pm" ? "PM" : "PP"}</span>
            <span className="min-w-0 flex-1">
              <span className="block text-lg font-extrabold text-slate-900">{s.he}</span>
              <span className="block text-sm text-slate-500">{s.sub}</span>
              <span className="mt-1 block text-[11px] font-bold text-slate-400">{s.steps.length} שלבים</span>
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
