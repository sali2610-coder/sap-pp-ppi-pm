"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Home, GraduationCap, GitBranch, Menu, X, Search, Gauge, Library, Workflow, Sparkles, BookOpen, HelpCircle, Wrench, Boxes, Compass } from "lucide-react";
import { CentersSheet } from "@/components/centers-sheet";

// light haptic where supported (Android/Chrome); no-op on iOS Safari — harmless.
const haptic = () => { try { navigator.vibrate?.(8); } catch { /* noop */ } };

const TABS = [
  { href: "/", icon: Home, label: "בית", match: (p: string) => p === "/" },
  { href: "/apps/", icon: Boxes, label: "אפליקציות", match: (p: string) => p.startsWith("/apps") },
  { href: "/sap-infrastructure/", icon: GitBranch, label: "גרף", match: (p: string) => p.startsWith("/sap-infrastructure") },
  { href: "/learn/", icon: GraduationCap, label: "למידה", match: (p: string) => p.startsWith("/learn") },
];
const MORE = [
  { href: "/pm/", icon: Wrench, label: "אחזקה (PM)" },
  { href: "/pp-pi/", icon: Boxes, label: "ייצור (PP-PI)" },
  { href: "/impact/", icon: Gauge, label: "השפעה ותלויות" },
  { href: "/story/", icon: Workflow, label: "סיורים מודרכים" },
  { href: "/library/", icon: Library, label: "ספרייה" },
  { href: "/knowledge/", icon: BookOpen, label: "מרכז ידע" },
  { href: "/chat/", icon: Sparkles, label: "צ'אט AI" },
];

function Tab({ active, icon: Icon, label, onClick, href }: { active: boolean; icon: typeof Home; label: string; onClick?: () => void; href?: string }) {
  const inner = (
    <motion.span whileTap={{ scale: 0.86 }} transition={{ type: "spring", stiffness: 500, damping: 28 }}
      className="relative flex h-full min-h-[44px] flex-col items-center justify-center gap-0.5">
      {active && <motion.span layoutId="tab-bg" transition={{ type: "spring", stiffness: 420, damping: 34 }}
        className="absolute inset-x-1.5 inset-y-1 -z-10 rounded-2xl bg-brand/10" />}
      <Icon className="size-[22px]" strokeWidth={active ? 2.5 : 2} />
      <span className={`text-[10px] leading-none ${active ? "font-extrabold" : "font-bold"}`}>{label}</span>
    </motion.span>
  );
  const cls = `tap relative flex items-center justify-center transition-colors ${active ? "text-brand" : "text-slate-400"}`;
  return href
    ? <Link href={href} onClick={haptic} className={cls} aria-current={active ? "page" : undefined}>{inner}</Link>
    : <button onClick={() => { haptic(); onClick?.(); }} className={cls}>{inner}</button>;
}

export function MobileTabBar() {
  const path = usePathname() || "/";
  const [more, setMore] = useState(false);
  const [centers, setCenters] = useState(false);
  const fire = (ev: string) => window.dispatchEvent(new Event(ev));

  return (
    <>
      {/* floating glass dock — fixed height (no resize / no scroll-jump), safe-area aware */}
      <div className="no-print pointer-events-none fixed inset-x-0 bottom-0 z-50 px-3 pb-[max(env(safe-area-inset-bottom),0.5rem)] xl:hidden" style={{ willChange: "transform" }}>
        <nav aria-label="ניווט תחתון" dir="rtl"
          className="pointer-events-auto mx-auto grid h-16 max-w-md grid-cols-5 rounded-[1.75rem] border border-white/50 bg-white/75 shadow-[0_10px_34px_-8px_rgba(15,23,42,0.28)] backdrop-blur-2xl">
          {TABS.map((t) => <Tab key={t.href} active={t.match(path)} icon={t.icon} label={t.label} href={t.href} />)}
          <Tab active={more} icon={Menu} label="עוד" onClick={() => setMore(true)} />
        </nav>
      </div>

      {/* "more" bottom sheet — drag-to-dismiss */}
      <AnimatePresence>
        {more && (
          <>
            <motion.div className="fixed inset-0 z-[70] bg-slate-900/40 backdrop-blur-sm xl:hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setMore(false)} />
            <motion.div dir="rtl" role="dialog" aria-label="ניווט" className="fixed inset-x-0 bottom-0 z-[71] rounded-t-[1.75rem] bg-white pb-[max(env(safe-area-inset-bottom),1rem)] shadow-2xl xl:hidden"
              initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }} transition={{ type: "spring", stiffness: 360, damping: 36 }}
              drag="y" dragConstraints={{ top: 0, bottom: 0 }} dragElastic={{ top: 0, bottom: 0.4 }} onDragEnd={(_, i) => { if (i.offset.y > 90) setMore(false); }}>
              <div className="mx-auto mt-2.5 h-1.5 w-11 rounded-full bg-slate-200" />
              <div className="flex items-center justify-between px-5 py-3">
                <span className="text-sm font-extrabold text-slate-900">ניווט</span>
                <button onClick={() => setMore(false)} aria-label="סגור" className="tap rounded-lg p-1 text-slate-400 active:bg-slate-100"><X className="size-5" /></button>
              </div>
              <div className="px-4 pb-2">
                <button onClick={() => { setMore(false); setCenters(true); }} className="tap flex w-full items-center gap-3 rounded-2xl border border-brand/30 bg-gradient-to-l from-brand/10 to-transparent p-3 text-right active:scale-[0.98]">
                  <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-brand text-white shadow-sm"><Compass className="size-5" /></span>
                  <span className="min-w-0 flex-1"><span className="block text-sm font-extrabold text-slate-900">מרכזי ייעוץ · Command Hub</span><span className="block text-[11px] text-slate-500">5 מרכזים — מסירה · אינטגרציה · אבטחה · ALM · Fiori</span></span>
                </button>
              </div>
              <div className="grid grid-cols-2 gap-2 px-4 pb-2">
                {MORE.map((m) => (
                  <Link key={m.href} href={m.href} onClick={() => setMore(false)} className="tap flex min-h-[52px] items-center gap-2.5 rounded-2xl border border-slate-200 bg-white p-3 text-sm font-bold text-slate-700 transition active:scale-95">
                    <m.icon className="size-5 text-brand" />{m.label}
                  </Link>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-2 border-t border-slate-100 px-4 pt-3">
                <button onClick={() => { setMore(false); fire("neo:open-palette"); }} className="tap flex min-h-[60px] flex-col items-center justify-center gap-1 rounded-2xl bg-slate-50 p-3 text-xs font-bold text-slate-600 active:scale-95"><Search className="size-5" />חיפוש</button>
                <button onClick={() => { setMore(false); fire("neo:open-guide"); }} className="tap flex min-h-[60px] flex-col items-center justify-center gap-1 rounded-2xl bg-slate-50 p-3 text-xs font-bold text-slate-600 active:scale-95"><HelpCircle className="size-5" />מדריך</button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <CentersSheet open={centers} onClose={() => setCenters(false)} />
    </>
  );
}
