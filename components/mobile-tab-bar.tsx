"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Home, Library, Search, Menu, X, ChevronDown, Boxes, Wrench, GraduationCap, BookOpen, Sparkles, Workflow, Network, Compass, HelpCircle, Table2, Terminal, Braces, Database, LayoutGrid } from "lucide-react";
import { CentersSheet } from "@/components/centers-sheet";

// light haptic where supported (Android/Chrome); no-op on iOS Safari — harmless.
const haptic = () => { try { navigator.vibrate?.(8); } catch { /* noop */ } };
const fire = (ev: string) => window.dispatchEvent(new Event(ev));

type Row = { href?: string; icon: typeof Home; label: string; onClick?: () => void };

/* ============ primary bottom destinations (single nav system) ============ */
const MODULE_RE = /^\/(pm|pp-pi|apps|domain-model|domain|tables|transactions|tcode|bapi|idoc|cds|fiori|enhancements|impact|exits|authorizations)/;

/* ============ Modules sheet — the SAP module portals ============ */
const MODULES: Row[] = [
  { href: "/pm/", icon: Wrench, label: "אחזקה — PM" },
  { href: "/pp-pi/", icon: Boxes, label: "ייצור — PP / PP-PI" },
  { href: "/apps/", icon: LayoutGrid, label: "אפליקציות Fiori" },
  { href: "/domain-model/", icon: Network, label: "מודל נתונים" },
];

/* ============ More sheet — grouped, progressive disclosure ============ */
const GROUPS: { key: string; label: string; open: boolean; items: Row[] }[] = [
  { key: "main", label: "ראשי", open: true, items: [
    { href: "/", icon: Home, label: "בית" },
    { href: "/library/", icon: Library, label: "ספרייה" },
    { href: "/knowledge/", icon: BookOpen, label: "מרכז ידע" },
    { href: "/academy/", icon: GraduationCap, label: "SAP Academy" },
  ] },
  { key: "ref", label: "עיון", open: false, items: [
    { href: "/tables/", icon: Table2, label: "טבלאות" },
    { href: "/transactions/", icon: Terminal, label: "טרנזקציות" },
    { href: "/bapi/", icon: Braces, label: "BAPIs / FMs" },
    { href: "/idoc/", icon: Network, label: "IDocs" },
    { href: "/cds/", icon: Database, label: "CDS Views" },
    { href: "/fiori-apps/", icon: LayoutGrid, label: "Fiori Apps" },
  ] },
  { key: "tools", label: "כלים", open: false, items: [
    { href: "/sap-infrastructure/", icon: Workflow, label: "Architecture Studio" },
    { href: "/story/", icon: Compass, label: "סיורים מודרכים" },
    { href: "/chat/", icon: Sparkles, label: "צ'אט AI" },
    { icon: HelpCircle, label: "עזרה ומדריך", onClick: () => fire("neo:open-guide") },
  ] },
];

/* ---------- bottom tab ---------- */
function Tab({ active, icon: Icon, label, onClick, href }: { active: boolean; icon: typeof Home; label: string; onClick?: () => void; href?: string }) {
  const inner = (
    <motion.span whileTap={{ scale: 0.86 }} transition={{ type: "spring", stiffness: 500, damping: 28 }}
      className="relative flex h-full min-h-[48px] flex-col items-center justify-center gap-0.5">
      {active && <motion.span layoutId="tab-bg" transition={{ type: "spring", stiffness: 420, damping: 34 }}
        className="absolute inset-x-1.5 inset-y-1 -z-10 rounded-2xl bg-brand/10" />}
      <Icon className="size-[22px]" strokeWidth={active ? 2.5 : 2} />
      <span className={`text-[11px] leading-none ${active ? "font-extrabold" : "font-bold"}`}>{label}</span>
    </motion.span>
  );
  const cls = `tap relative flex items-center justify-center transition-colors ${active ? "text-brand" : "text-ink-3"}`;
  return href
    ? <Link href={href} onClick={haptic} className={cls} aria-current={active ? "page" : undefined}>{inner}</Link>
    : <button onClick={() => { haptic(); onClick?.(); }} className={cls} aria-current={active ? "page" : undefined}>{inner}</button>;
}

/* ---------- reusable accessible bottom sheet ---------- */
function BottomSheet({ open, onClose, title, children }: { open: boolean; onClose: () => void; title: string; children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden"; // prevent background scroll
    ref.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { onClose(); return; }
      if (e.key === "Tab") {
        const nodes = ref.current?.querySelectorAll<HTMLElement>('a[href],button,[tabindex]:not([tabindex="-1"])');
        if (!nodes || !nodes.length) return;
        const first = nodes[0], last = nodes[nodes.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = prev; window.removeEventListener("keydown", onKey); };
  }, [open, onClose]);
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div className="fixed inset-0 z-[70] bg-slate-900/40 backdrop-blur-sm xl:hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} />
          <motion.div ref={ref} tabIndex={-1} dir="rtl" role="dialog" aria-modal="true" aria-label={title}
            className="fixed inset-x-0 bottom-0 z-[71] flex max-h-[85dvh] flex-col rounded-t-[1.75rem] bg-surface shadow-2xl outline-none xl:hidden"
            initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }} transition={{ type: "spring", stiffness: 360, damping: 36 }}
            drag="y" dragConstraints={{ top: 0, bottom: 0 }} dragElastic={{ top: 0, bottom: 0.4 }} onDragEnd={(_, i) => { if (i.offset.y > 90) onClose(); }}>
            <div className="shrink-0 rounded-t-[1.75rem] bg-surface">
              <div className="mx-auto mt-2.5 h-1.5 w-11 rounded-full bg-hairline" />
              <div className="flex items-center justify-between px-5 py-3">
                <span className="text-base font-extrabold text-ink-1">{title}</span>
                <button onClick={onClose} aria-label="סגור" className="tap grid size-9 place-items-center rounded-xl text-ink-3 active:bg-surface-2"><X className="size-5" /></button>
              </div>
            </div>
            <div className="min-h-0 flex-1 overflow-y-auto pb-[max(env(safe-area-inset-bottom),1rem)]">{children}</div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function NavRow({ row, onNav }: { row: Row; onNav: () => void }) {
  const Icon = row.icon;
  const cls = "tap flex min-h-[48px] w-full items-center gap-3 px-5 text-[15px] font-bold text-ink-1 transition active:bg-surface-2";
  const inner = <><span className="grid size-9 shrink-0 place-items-center rounded-xl bg-surface-2 text-brand"><Icon className="size-5" /></span>{row.label}</>;
  return row.href
    ? <Link href={row.href} onClick={onNav} className={cls}>{inner}</Link>
    : <button onClick={() => { row.onClick?.(); onNav(); }} className={`${cls} text-right`}>{inner}</button>;
}

function NavGroup({ label, items, defaultOpen, onNav }: { label: string; items: Row[]; defaultOpen: boolean; onNav: () => void }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-t border-hairline first:border-0">
      <button onClick={() => setOpen((o) => !o)} aria-expanded={open} className="tap flex min-h-[44px] w-full items-center justify-between px-5 text-[11px] font-extrabold uppercase tracking-[0.14em] text-ink-3">
        {label}
        <ChevronDown className={`size-4 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && <div className="pb-1.5">{items.map((it) => <NavRow key={it.href || it.label} row={it} onNav={onNav} />)}</div>}
    </div>
  );
}

export function MobileTabBar() {
  const path = usePathname() || "/";
  const [more, setMore] = useState(false);
  const [modules, setModules] = useState(false);
  const [centers, setCenters] = useState(false);

  const modActive = MODULE_RE.test(path);
  const TABS = [
    { key: "home", active: path === "/", icon: Home, label: "בית", href: "/" },
    { key: "mod", active: modActive, icon: Boxes, label: "מודולים", onClick: () => setModules(true) },
    { key: "lib", active: path.startsWith("/library"), icon: Library, label: "ספרייה", href: "/library/" },
    { key: "search", active: false, icon: Search, label: "חיפוש", onClick: () => fire("neo:open-palette") },
    { key: "more", active: more, icon: Menu, label: "עוד", onClick: () => setMore(true) },
  ];

  return (
    <>
      <div data-shell="mobile-only" className="no-print pointer-events-none fixed inset-x-0 bottom-0 z-50 px-3 pb-[max(env(safe-area-inset-bottom),0.5rem)] xl:hidden" style={{ willChange: "transform" }}>
        <nav aria-label="ניווט ראשי" dir="rtl"
          className="pointer-events-auto mx-auto grid h-16 max-w-md grid-cols-5 rounded-[1.75rem] border border-white/50 bg-surface/75 shadow-[0_10px_34px_-8px_rgba(15,23,42,0.28)] backdrop-blur-2xl">
          {TABS.map((t) => <Tab key={t.key} active={t.active} icon={t.icon} label={t.label} href={t.href} onClick={t.onClick} />)}
        </nav>
      </div>

      {/* Modules sheet — SAP module portals */}
      <BottomSheet open={modules} onClose={() => setModules(false)} title="מודולים">
        <div className="pb-2">{MODULES.map((m) => <NavRow key={m.href} row={m} onNav={() => setModules(false)} />)}</div>
      </BottomSheet>

      {/* More sheet — grouped IA with collapsible sections */}
      <BottomSheet open={more} onClose={() => setMore(false)} title="ניווט">
        <div className="px-4 pb-1">
          <button onClick={() => { setMore(false); setCenters(true); }} className="tap flex min-h-[56px] w-full items-center gap-3 rounded-2xl border border-brand/25 bg-gradient-to-l from-brand/10 to-transparent p-3 text-right active:scale-[0.98]">
            <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-brand text-white shadow-sm"><Compass className="size-5" /></span>
            <span className="min-w-0 flex-1"><span className="block text-[15px] font-extrabold text-ink-1">מרכזי ייעוץ</span><span className="block text-[12px] text-ink-3">מסירה · אינטגרציה · אבטחה · ALM · Fiori</span></span>
          </button>
        </div>
        {GROUPS.map((g) => <NavGroup key={g.key} label={g.label} items={g.items} defaultOpen={g.open} onNav={() => setMore(false)} />)}
      </BottomSheet>

      <CentersSheet open={centers} onClose={() => setCenters(false)} />
    </>
  );
}
