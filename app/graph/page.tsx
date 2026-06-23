import { Suspense } from "react";
import { GlobalGraph } from "@/components/global-graph";

export const metadata = { title: "Global Knowledge Graph · NEO" };

export default function GraphPage() {
  return <Suspense fallback={<div className="flex h-[60vh] items-center justify-center text-slate-400" dir="rtl">טוען גרף…</div>}><GlobalGraph /></Suspense>;
}
