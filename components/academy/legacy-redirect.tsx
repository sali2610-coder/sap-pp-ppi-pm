"use client";

// Legacy Academy accordion routes → unified Lesson Reader. The old /library/*-academy
// readers are decommissioned after the content migration (PR-8/PR-9): every module now
// lives in one reader at /academy/path/*. This stub replaces the old page — client
// redirect (the app is client-rendered) plus a visible manual link as a no-JS fallback.
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { GraduationCap, ArrowLeft } from "lucide-react";

export function LegacyRedirect({ to, label }: { to: string; label: string }) {
  const router = useRouter();
  useEffect(() => { router.replace(to); }, [to, router]);
  return (
    <div dir="rtl" className="mx-auto flex max-w-md flex-col items-center gap-4 py-24 text-center">
      <span className="grid size-12 place-items-center rounded-2xl bg-brand-soft text-brand"><GraduationCap className="size-6" /></span>
      <div>
        <h1 className="text-lg font-bold text-ink-1">הקורס עבר ל-SAP Academy החדשה</h1>
        <p className="mt-1 text-sm text-ink-3">מעבירים אותך לקורא המאוחד…</p>
      </div>
      <Link href={to} className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-l from-brand to-brand-dark px-4 py-2 text-sm font-bold text-brand-foreground transition-opacity hover:opacity-90">
        {label}<ArrowLeft className="size-4 rtl:rotate-180" />
      </Link>
    </div>
  );
}
