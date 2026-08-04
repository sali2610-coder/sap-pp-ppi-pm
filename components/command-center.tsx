"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Clock, ArrowLeft } from "lucide-react";
import { Reveal } from "@/components/reveal";

const HREF_LABEL: Record<string, string> = { "/pm/": "SAP PM", "/pp-pi/": "SAP PP-PI", "/sap-infrastructure/": "SAP Architecture", "/library/": "ספריית SAP", "/studio/": "Architecture Studio", "/transactions/": "טרנזקציות" };

function useList(key: string) {
  const [list, setList] = useState<string[]>([]);
  useEffect(() => { try { const r = JSON.parse(localStorage.getItem(key) || "[]"); if (Array.isArray(r)) setList(r); } catch { /* noop */ } }, [key]);
  return list;
}

// "Continue where you left off" — the only homepage section that needs the
// client store. Renders nothing until the user has real history (no empty box).
export function CommandCenter() {
  const recentPages = useList("neo:home:recent");
  const [recentObj, setRecentObj] = useState<string[]>([]);
  const [mounted, setMounted] = useState(false);
  useEffect(() => { try { const r = JSON.parse(localStorage.getItem("neo:obj:recent") || "[]"); if (Array.isArray(r)) setRecentObj(r.slice(0, 8)); } catch { /* noop */ } setMounted(true); }, []);

  const pages = recentPages.filter((h) => HREF_LABEL[h]);
  if (!mounted || (recentObj.length === 0 && pages.length === 0)) return null;

  return (
    <Reveal className="space-y-3">
      <div dir="rtl" className="space-y-3">
      <h2 className="flex items-center gap-2 text-sm font-extrabold tracking-tight text-ink-3"><Clock className="size-4 text-brand" />המשך מהיכן שעצרת</h2>
      <div className="flex flex-wrap gap-2">
        {recentObj.map((n) => (
          <Link prefetch={false} key={"o" + n} href={`/object/${encodeURIComponent(n)}`} className="card-interactive inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm">

            <span className="size-2 rounded-full bg-brand" /><span className="tech font-bold text-ink-2" dir="ltr">{n}</span><ArrowLeft className="size-3.5 text-ink-3" />
          </Link>
        ))}
        {pages.map((h) => (
          <Link prefetch={false} key={"p" + h} href={h} className="card-interactive inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm">

            <span className="size-2 rounded-full bg-slate-300" /><span className="font-bold text-ink-2">{HREF_LABEL[h]}</span><ArrowLeft className="size-3.5 text-ink-3" />
          </Link>
        ))}
      </div>
      </div>
    </Reveal>
  );
}
