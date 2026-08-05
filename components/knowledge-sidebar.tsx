"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home, Wrench, FlaskConical, GitBranch, Table, Terminal, Plug, Cable, Sigma,
  LayoutGrid, Puzzle, BrainCircuit, Library, AlertTriangle, Award, GraduationCap,
  Compass, Sparkles, MessageSquare, PanelLeftClose, PanelLeftOpen, ChevronDown, X,
} from "lucide-react";
import { playClick } from "@/lib/sound";

type Child = { href: string; label: string };
type Item = { href: string; icon: typeof Home; label: string; children?: Child[] };
type Group = { id: string; label: string; items: Item[] };

// module documentation sections (kept in sync with lib/module-portal SECTIONS;
// inlined here so the heavy module dataset never enters the client bundle).
const MODULE_SECTIONS: [string, string][] = [
  ["business-process", "תהליך עסקי"], ["master-data", "נתוני אב"], ["transactions", "טרנזקציות"],
  ["tables", "טבלאות"], ["relationships", "קשרים"], ["configuration", "תצורה"], ["integration", "אינטגרציה"],
  ["bapis", "BAPIs / FMs"], ["cds", "CDS Views"], ["fiori", "Fiori Apps"], ["enhancements", "Enhancements"],
  ["troubleshooting", "תקלות"], ["related", "אובייקטים קשורים"], ["best-practices", "Best Practices"], ["ecc-s4", "ECC ↔ S/4HANA"],
];
const moduleChildren = (base: string): Child[] => MODULE_SECTIONS.map(([slug, label]) => ({ href: `${base}${slug}/`, label }));

// Docs-portal information architecture — knowledge tree, not a workbook.
// Grouped sections instead of nested tab bars. Real routes only.
const NAV: Group[] = [
  { id: "modules", label: "מודולים", items: [
    { href: "/pm/", icon: Wrench, label: "אחזקה · PM", children: moduleChildren("/pm/") },
    { href: "/pp-pi/", icon: FlaskConical, label: "ייצור · PP-PI", children: moduleChildren("/pp-pi/") },
    { href: "/sap-infrastructure/", icon: GitBranch, label: "מודל נתונים" },
  ]},
  { id: "reference", label: "עיון · Reference", items: [
    { href: "/tables/", icon: Table, label: "טבלאות" },
    { href: "/transactions/", icon: Terminal, label: "טרנזקציות" },
    { href: "/bapi/", icon: Plug, label: "BAPIs / FMs" },
    { href: "/idoc/", icon: Cable, label: "IDocs" },
    { href: "/cds/", icon: Sigma, label: "CDS Views" },
    { href: "/fiori-apps/", icon: LayoutGrid, label: "Fiori Apps" },
    { href: "/enhancements/", icon: Puzzle, label: "Enhancements" },
  ]},
  // Asking about the books is a feature OF the library, not a separate product,
  // so the two sit together and read as one destination.
  { id: "library", label: "ספרייה", items: [
    { href: "/library/", icon: Library, label: "ספרייה דיגיטלית" },
    { href: "/ai/", icon: Sparkles, label: "שאל את הספרייה" },
  ]},
  { id: "knowledge", label: "ידע ולמידה", items: [
    { href: "/knowledge/", icon: BrainCircuit, label: "מרכז ידע" },
    { href: "/academy/", icon: GraduationCap, label: "SAP Academy" },
    { href: "/incidents/", icon: AlertTriangle, label: "תקלות" },
    { href: "/certification/", icon: Award, label: "הסמכה" },
  ]},
  { id: "tools", label: "כלים", items: [
    { href: "/studio/", icon: Compass, label: "Architecture Studio" },
  ]},
  // Last by intent: a general SAP assistant, not scoped to the books.
  { id: "assistant", label: "עוזר SAP", items: [
    { href: "/chat/", icon: MessageSquare, label: "צ'אט AI" },
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
    const hasChildren = !collapsed && !!it.children?.length;
    const underHere = path.startsWith(it.href);
    const expanded = open[it.href] !== undefined ? open[it.href] : underHere; // auto-open when inside
    return (
      <div>
        <div className={`group relative flex items-center rounded-lg text-[13.5px] font-medium transition-colors ${active && path === it.href ? "bg-brand/8 text-brand" : "text-ink-2 hover:bg-black/[0.04] hover:text-ink-1"}`}>
          {active && path === it.href && <span aria-hidden className="absolute inset-y-1 start-0 w-[3px] rounded-full bg-brand" />}
          <Link prefetch={false} href={it.href} onClick={() => { playClick(); onNavigate?.(); }} title={collapsed ? it.label : undefined}
            aria-current={path === it.href ? "page" : undefined}
            className={`flex min-w-0 flex-1 items-center gap-2.5 px-2.5 py-1.5 ${collapsed ? "justify-center" : ""}`}>
            <Ic className={`size-[17px] shrink-0 ${active ? "text-brand" : "text-ink-3 group-hover:text-ink-2"}`} />
            {!collapsed && <span className="truncate">{it.label}</span>}
          </Link>
          {hasChildren && (
            <button onClick={() => toggle(it.href)} aria-label={`${expanded ? "כווץ" : "הרחב"} ${it.label}`} aria-expanded={expanded} className="me-1 rounded p-1 text-ink-3 hover:text-ink-1">
              <ChevronDown className={`size-3.5 transition-transform ${expanded ? "" : "-rotate-90"}`} />
            </button>
          )}
        </div>
        {hasChildren && expanded && (
          <div className="mt-0.5 flex flex-col gap-0.5 border-s border-hairline pe-2 ps-3.5">
            {it.children!.map((ch) => { const chActive = path === ch.href; return (
              <Link prefetch={false} key={ch.href} href={ch.href} onClick={() => { playClick(); onNavigate?.(); }} aria-current={chActive ? "page" : undefined}
                className={`relative rounded-lg px-2 py-1 text-[12.5px] transition-colors ${chActive ? "font-bold text-brand" : "text-ink-3 hover:bg-black/[0.04] hover:text-ink-1"}`}>
                {chActive && <span aria-hidden className="absolute inset-y-1 start-0 w-[2px] rounded-full bg-brand" />}
                {ch.label}
              </Link>
            ); })}
          </div>
        )}
      </div>
    );
  };

  return (
    <nav aria-label="עץ ידע" className="flex flex-col gap-0.5 px-2 py-3">
      <Link prefetch={false} href="/" onClick={() => { playClick(); onNavigate?.(); }} title={collapsed ? "בית" : undefined}
        aria-current={path === "/" ? "page" : undefined}
        className={`group relative mb-1 flex items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-[13.5px] font-semibold transition-colors ${collapsed ? "justify-center" : ""} ${path === "/" ? "bg-brand/8 text-brand" : "text-ink-1 hover:bg-black/[0.04]"}`}>
        {path === "/" && <span aria-hidden className="absolute inset-y-1 start-0 w-[3px] rounded-full bg-brand" />}
        <Home className={`size-[17px] shrink-0 ${path === "/" ? "text-brand" : "text-ink-3"}`} />
        {!collapsed && <span>בית</span>}
      </Link>

      {NAV.map((g) => {
        // Default-open the groups a newcomer needs first: the modules, the
        // library (browsing and asking are the primary entry points), and the
        // learning group. Reference + tools collapse so the rail isn't a 25-item
        // wall on first look. A user's manual toggle persists and always wins.
        const isOpen = open[g.id] !== undefined
          ? open[g.id]
          // ...and always open the group holding the current page, so the active
          // item can never be hidden behind a collapsed header. This also keeps
          // future groups correct without another hard-coded id.
          : (g.id === "modules" || g.id === "library" || g.id === "knowledge"
             || g.items.some((it) => path.startsWith(it.href)));
        return (
          <div key={g.id} className="mt-2">
            {!collapsed ? (
              <button onClick={() => toggle(g.id)} aria-expanded={isOpen} className="flex w-full items-center justify-between rounded-md px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-ink-3 hover:text-ink-2">
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
    const onEsc = (e: KeyboardEvent) => { if (e.key === "Escape") setDrawer(false); };
    window.addEventListener("neo:open-sidebar", openDrawer);
    window.addEventListener("keydown", onEsc);
    return () => { window.removeEventListener("neo:open-sidebar", openDrawer); window.removeEventListener("keydown", onEsc); };
  }, []);
  const toggleCollapse = () => setCollapsed((c) => { const n = !c; try { localStorage.setItem("neo:sidebar:collapsed", n ? "1" : "0"); } catch { /* noop */ } return n; });

  return (
    <>
      {/* desktop — persistent rail (hidden in reader focus-mode via globals.css) */}
      <aside data-knowledge-sidebar data-shell="desktop-only" className={`sticky top-14 z-30 hidden h-[calc(100dvh-3.5rem)] shrink-0 flex-col border-e border-hairline bg-surface/80 backdrop-blur-sm xl:flex ${collapsed ? "w-16" : "w-[17rem]"}`}>
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
        <div className="fixed inset-0 z-[80] lg:hidden" role="dialog" aria-modal="true" aria-label="ניווט">
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
