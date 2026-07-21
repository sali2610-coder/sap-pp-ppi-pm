"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";

// Logical-parent fallback when there is no in-app history (direct deep link).
function parentOf(path: string): string {
  const p = path.replace(/\/+$/, "");
  const map: [RegExp, string][] = [
    [/^\/object\//, "/sap-infrastructure/"],
    [/^\/tcode\//, "/transactions/"],
    [/^\/cds\//, "/s4hana/"],
    [/^\/troubleshooting\//, "/incidents/"],
    [/^\/process\//, "/knowledge/"],
    [/^\/impact\/[^/]+/, "/impact/"],
  ];
  for (const [re, parent] of map) if (re.test(p)) return parent;
  const seg = p.split("/").filter(Boolean);
  if (seg.length <= 1) return "/";
  return "/" + seg.slice(0, -1).join("/") + "/";
}

// Global "Back one step" — mounted once in the app shell, shown on every page
// except Home. Goes back exactly one in-app step; falls back to the logical
// parent on a fresh deep link. Sticky under the header (in-flow, never overlaps
// content), RTL, keyboard accessible.
export function GlobalBack() {
  const pathname = usePathname() || "/";
  const router = useRouter();
  const count = useRef(0);
  const last = useRef<string | null>(null);
  const [top, setTop] = useState(64);

  useEffect(() => { if (last.current !== null && last.current !== pathname) count.current += 1; last.current = pathname; }, [pathname]);
  useEffect(() => {
    const measure = () => { const hh = document.querySelector("header"); if (hh) setTop(hh.getBoundingClientRect().height + 8); };
    measure(); window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const back = () => { if (count.current > 0 && typeof window !== "undefined" && window.history.length > 1) router.back(); else router.push(parentOf(pathname)); };

  // Alt+← keyboard shortcut (ignored while typing)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const el = e.target as HTMLElement;
      if (el && (el.tagName === "INPUT" || el.tagName === "TEXTAREA" || el.isContentEditable)) return;
      if (e.altKey && e.key === "ArrowLeft" && pathname !== "/") { e.preventDefault(); back(); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  if (pathname === "/") return null;
  // §P0.2 — these routes render their own breadcrumb, the single clearer "go up"
  // affordance. A second generic "Back" is redundant noise, so suppress it here.
  const HAS_BREADCRUMB = [/^\/academy\//, /^\/object\//, /^\/tcode\//, /^\/bapi\//, /^\/cds\//, /^\/idoc\//, /^\/troubleshooting\//, /^\/fiori\//];
  if (HAS_BREADCRUMB.some((re) => re.test(pathname))) return null;

  return (
    <div className="no-print sticky z-30 mb-3 flex" style={{ top }} dir="rtl">
      <button onClick={back} aria-label="חזור אחורה" title="חזור אחורה (Backspace)"
        className="group inline-flex items-center gap-1.5 rounded-full border border-hairline bg-surface/90 px-3.5 py-2 text-[13px] font-bold text-ink-2 shadow-sm backdrop-blur transition hover:-translate-x-0.5 hover:border-brand/40 hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40 active:scale-95">
        <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />חזור אחורה
      </button>
    </div>
  );
}
