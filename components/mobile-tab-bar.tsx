"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Home, GraduationCap, GitBranch, BrainCircuit, Menu, X, Search, Gauge, Library, Workflow, Sparkles, BookOpen, HelpCircle, Wrench, Boxes, Compass } from "lucide-react";
import { CentersSheet } from "@/components/centers-sheet";

const TABS = [
  { href: "/", icon: Home, label: "בית", match: (p: string) => p === "/" },
  { href: "/learn/", icon: GraduationCap, label: "למידה", match: (p: string) => p.startsWith("/learn") },
  { href: "/sap-infrastructure/", icon: GitBranch, label: "גרף", match: (p: string) => p.startsWith("/sap-infrastructure") },
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

export function MobileTabBar() {
  const path = usePathname() || "/";
  const [more, setMore] = useState(false);
  const [centers, setCenters] = useState(false);
  const fire = (ev: string) => window.dispatchEvent(new Event(ev));

  const Item = ({ active, icon: Icon, label, onClick, href }: { active: boolean; icon: typeof Home; label: string; onClick?: () => void; href?: string }) => {
    const inner = (
      <span className={`flex flex-col items-center justify-center gap-0.5 py-1.5 transition-colors ${active ? "text-brand" : "text-slate-400"}`}>
        <Icon className="size-[22px]" strokeWidth={active ? 2.4 : 2} />
        <span className="text-[10px] font-bold">{label}</span>
      </span>
    );
    return href
      ? <Link href={href} className="tap relative">{active && <motion.span layoutId="tab-dot" className="absolute inset-x-3 top-0 h-0.5 rounded-full bg-brand" />}{inner}</Link>
      : <button onClick={onClick} className="tap relative">{inner}</button>;
  };

  return (
    <>
      <nav aria-label="ניווט תחתון" dir="rtl"
        className="no-print fixed inset-x-0 bottom-0 z-50 grid grid-cols-5 border-t border-slate-200 bg-white/90 pb-[env(safe-area-inset-bottom)] shadow-[0_-4px_20px_-8px_rgba(15,23,42,0.15)] backdrop-blur-xl xl:hidden">
        {TABS.map((t) => <Item key={t.href} active={t.match(path)} icon={t.icon} label={t.label} href={t.href} />)}
        <Item active={false} icon={BrainCircuit} label="מנטור" onClick={() => fire("neo:open-mentor")} />
        <Item active={more} icon={Menu} label="עוד" onClick={() => setMore(true)} />
      </nav>

      <AnimatePresence>
        {more && (
          <>
            <motion.div className="fixed inset-0 z-[70] bg-slate-900/40 backdrop-blur-sm xl:hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setMore(false)} />
            <motion.div dir="rtl" className="fixed inset-x-0 bottom-0 z-[71] rounded-t-3xl bg-white pb-[max(env(safe-area-inset-bottom),1rem)] shadow-2xl xl:hidden"
              initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }} transition={{ type: "spring", stiffness: 340, damping: 34 }}>
              <div className="mx-auto mt-2 h-1 w-10 rounded-full bg-slate-200" />
              <div className="flex items-center justify-between px-5 py-3">
                <span className="text-sm font-extrabold text-slate-900">ניווט</span>
                <button onClick={() => setMore(false)} className="rounded-lg p-1 text-slate-400 hover:bg-slate-100"><X className="size-5" /></button>
              </div>
              {/* Centers Command Hub launcher — opens the premium centers sheet */}
              <div className="px-4 pb-2">
                <button onClick={() => { setMore(false); setCenters(true); }} className="tap flex w-full items-center gap-3 rounded-2xl border border-brand/30 bg-gradient-to-l from-brand/10 to-transparent p-3 text-right active:scale-[0.98]">
                  <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-brand text-white shadow-sm"><Compass className="size-5" /></span>
                  <span className="min-w-0 flex-1"><span className="block text-sm font-extrabold text-slate-900">מרכזי ייעוץ · Command Hub</span><span className="block text-[11px] text-slate-500">5 מרכזים — מסירה · אינטגרציה · אבטחה · ALM · Fiori</span></span>
                </button>
              </div>
              <div className="grid grid-cols-2 gap-2 px-4 pb-2">
                {MORE.map((m) => (
                  <Link key={m.href} href={m.href} onClick={() => setMore(false)} className="tap flex items-center gap-2.5 rounded-2xl border border-slate-200 bg-white p-3 text-sm font-bold text-slate-700 transition active:scale-95">
                    <m.icon className="size-5 text-brand" />{m.label}
                  </Link>
                ))}
              </div>
              <div className="grid grid-cols-3 gap-2 border-t border-slate-100 px-4 pt-3">
                <button onClick={() => { setMore(false); fire("neo:open-palette"); }} className="tap flex flex-col items-center gap-1 rounded-2xl bg-slate-50 p-3 text-xs font-bold text-slate-600"><Search className="size-5" />חיפוש</button>
                <button onClick={() => { setMore(false); fire("neo:open-guide"); }} className="tap flex flex-col items-center gap-1 rounded-2xl bg-slate-50 p-3 text-xs font-bold text-slate-600"><HelpCircle className="size-5" />מדריך</button>
                <button onClick={() => { setMore(false); fire("neo:open-mentor"); }} className="tap flex flex-col items-center gap-1 rounded-2xl bg-slate-50 p-3 text-xs font-bold text-slate-600"><BrainCircuit className="size-5" />מנטור</button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <CentersSheet open={centers} onClose={() => setCenters(false)} />
    </>
  );
}
