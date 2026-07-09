"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home, Wrench, FlaskConical, GitBranch, Table, Terminal, Plug, Cable, Sigma,
  LayoutGrid, Puzzle, BrainCircuit, Library, AlertTriangle, Award, GraduationCap,
  Compass, Sparkles, PanelLeftClose, PanelLeftOpen, ChevronDown, X,
} from "lucide-react";
import { playClick } from "@/lib/sound";

type Item = { href: string; icon: typeof Home; label: string };
type Group = { id: string; label: string; items: Item[] };

// Docs-portal information architecture — knowledge tree, not a workbook.
// Grouped sections instead of nested tab bars. Real routes only.
const NAV: Group[] = [
  { id: "modules", label: "מודולים", items: [
    { href: "/pm/", icon: Wrench, label: "אחזקה · PM" },
    { href: "/pp-pi/", icon: FlaskConical, label: "ייצור · PP-PI" },
    { href: "/sap-infrastructure/", icon: GitBranch, label: "מודל נתונים" },
  ]},
  { id: "reference", label: "עיון · Reference", items: [
    { href: "/tables/", icon: Table, label: "טבלאות" },
    { href: "/tcode-dir/", icon: Terminal, label: "טרנזקציות" },
    { href: "/bapi/", icon: Plug, label: "BAPIs / FMs" },
    { href: "/idoc/", icon: Cable, label: "IDocs" },
    { href: "/cds/", icon: Sigma, label: "CDS Views" },
    { href: "/fiori-apps/", icon: LayoutGrid, label: "Fiori Apps" },
    { href: "/enhancements/", icon: Puzzle, label: "Enhancements" },
  ]},
  { id: "knowledge", label: "ידע", items: [
    { href: "/knowledge/", icon: BrainCircuit, label: "מרכז ידע" },
    { href: "/library/", icon: Library, label: "ספרייה" },
    { href: "/incidents/", icon: AlertTriangle, label: "תקלות" },
    { href: "/certification/", icon: Award, label: "הסמכה" },
    { href: "/learn/", icon: GraduationCap, label: "למידה" },
  ]},
  { id: "tools", label: "כלים", items: [
    { href: "/studio/", icon: Compass, label: "Architecture Studio" },
    { href: "/chat/", icon: Sparkles, label: "צ'אט AI" },
  ]},
];

const isActive = (path: string, href: string) => (href === "/" ? path === "/" : path === href || path.startsWith(href));

function Tree({ collapsed, onNavigate }: { collapsed: boolean; onNavigate?: () => void }) {
  const path = usePathname() || "/";
  const [open, setOpen] = useState<Record<string, boolean>>({});
  useEffect(() => {
    try { const s = JSON.parse(localStorage.getItem("neo:nav:open") || "null"); if (s) setOpen(s); } catch { /* noop */ }
  }, []);
  const toggle = (id: string) => setOpen((o) => { const n = { ...o, [id]: o[id] === false ? true : false }; try { localStorage.setItem("neo:nav:open", JSON.stringify(n)); } catch { /* noop */ } return n; });

  const Row = ({ it }: { it: Item }) => {
    const active = isActive(path, it.href);
    const Ic = it.icon;
    return (
      <Link href={it.href} onClick={() => { playClick(); onNavigate?.(); }} title={collapsed ? it.label : undefined}
        aria-current={active ? "page" : undefined}
        className={`group relative flex items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-[13.5px] font-medium transition-colors ${collapsed ? "justify-center" : ""} ${active ? "bg-brand/8 text-brand" : "text-ink-2 hover:bg-black/[0.04] hover:text-ink-1"}`}>
        {active && <span aria-hidden className="absolute inset-y-1 start-0 w-[3px] rounded-full bg-brand" />}
        <Ic className={`size-[17px] shrink-0 ${active ? "text-brand" : "text-ink-3 group-hover:text-ink-2"}`} />
        {!collapsed && <span className="truncate">{it.label}</span>}
      </Link>
    );
  };

  return (
    <nav aria-label="עץ ידע" className="flex flex-col gap-0.5 px-2 py-3">
      <Link href="/" onClick={() => { playClick(); onNavigate?.(); }} title={collapsed ? "בית" : undefined}
        aria-current={path === "/" ? "page" : undefined}
        className={`group relative mb-1 flex items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-[13.5px] font-semibold transition-colors ${collapsed ? "justify-center" : ""} ${path === "/" ? "bg-brand/8 text-brand" : "text-ink-1 hover:bg-black/[0.04]"}`}>
        {path === "/" && <span aria-hidden className="absolute inset-y-1 start-0 w-[3px] rounded-full bg-brand" />}
        <Home className={`size-[17px] shrink-0 ${path === "/" ? "text-brand" : "text-ink-3"}`} />
        {!collapsed && <span>בית</span>}
      </Link>

      {NAV.map((g) => {
        const isOpen = open[g.id] !== false;
        return (
          <div key={g.id} className="mt-2">
            {!collapsed ? (
              <button onClick={() => toggle(g.id)} className="flex w-full items-center justify-between rounded-md px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-ink-3 hover:text-ink-2">
                {g.label}
                <ChevronDown className={`size-3.5 transition-transform ${isOpen ? "" : "-rotate-90"}`} />
              </button>
            ) : (
              <div className="mx-2 my-1 h-px bg-hairline" aria-hidden />
            )}
            {(collapsed || isOpen) && <div className="mt-0.5 flex flex-col gap-0.5">{g.items.map((it) => <Row key={it.href} it={it} />)}</div>}
          </div>
        );
      })}
    </nav>
  );
}

export function KnowledgeSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [drawer, setDrawer] = useState(false); // mobile slide-over
  useEffect(() => {
    try { setCollapsed(localStorage.getItem("neo:sidebar:collapsed") === "1"); } catch { /* noop */ }
    const openDrawer = () => setDrawer(true);
    window.addEventListener("neo:open-sidebar", openDrawer);
    return () => window.removeEventListener("neo:open-sidebar", openDrawer);
  }, []);
  const toggleCollapse = () => setCollapsed((c) => { const n = !c; try { localStorage.setItem("neo:sidebar:collapsed", n ? "1" : "0"); } catch { /* noop */ } return n; });

  return (
    <>
      {/* desktop — persistent rail */}
      <aside className={`sticky top-14 z-30 hidden h-[calc(100dvh-3.5rem)] shrink-0 flex-col border-e border-hairline bg-surface/80 backdrop-blur-sm lg:flex ${collapsed ? "w-16" : "w-[17rem]"}`}>
        <div className="min-h-0 flex-1 overflow-y-auto">
          <Tree collapsed={collapsed} />
        </div>
        <button onClick={toggleCollapse} title={collapsed ? "הרחב" : "כווץ"} aria-label="כווץ/הרחב סרגל"
          className="flex items-center gap-2 border-t border-hairline px-3 py-2.5 text-[12px] font-semibold text-ink-3 hover:bg-black/[0.03] hover:text-ink-1">
          {collapsed ? <PanelLeftOpen className="size-4" /> : <><PanelLeftClose className="size-4" />כווץ</>}
        </button>
      </aside>

      {/* mobile — slide-over drawer */}
      {drawer && (
        <div className="fixed inset-0 z-[80] lg:hidden" role="dialog" aria-modal="true">
          <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-sm" onClick={() => setDrawer(false)} />
          <aside className="absolute inset-y-0 end-0 flex w-[82vw] max-w-[20rem] flex-col bg-surface shadow-2xl">
            <div className="flex items-center justify-between border-b border-hairline px-3 py-2.5">
              <span className="eyebrow-2">ניווט</span>
              <button onClick={() => setDrawer(false)} aria-label="סגור" className="rounded-lg p-1.5 text-ink-3 hover:bg-black/[0.05]"><X className="size-5" /></button>
            </div>
            <div className="min-h-0 flex-1 overflow-y-auto"><Tree collapsed={false} onNavigate={() => setDrawer(false)} /></div>
          </aside>
        </div>
      )}
    </>
  );
}
