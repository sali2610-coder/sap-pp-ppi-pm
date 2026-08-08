/**
 * Legacy path. The product has exactly two AI surfaces now — Ask the Library
 * (grounded) and AI Chat (consultant) — and /ai was a third route rendering the
 * same workspace, linked from nowhere.
 *
 * It redirects to the grounded surface rather than the consultant one: that is
 * the stricter of the two, and sending an old link somewhere that may answer
 * beyond the books would silently change what the destination promises.
 *
 * A static export cannot answer with a 30x, so the redirect is a client
 * navigation with a meta-refresh fallback for anything without JavaScript.
 */
"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const TARGET = "/library/ask/";

export default function AiRedirect() {
  const router = useRouter();
  useEffect(() => { router.replace(TARGET); }, [router]);

  return (
    <main className="mx-auto w-full max-w-2xl px-4 py-16 text-center">
      <meta httpEquiv="refresh" content={`0; url=${TARGET}`} />
      <h1 className="text-lg font-extrabold text-ink-1">שאל את הספרייה</h1>
      <p className="mt-2 text-[13px] text-ink-3">מעביר אותך לעמוד המעודכן…</p>
      <Link href={TARGET} className="mt-4 inline-block text-[13px] font-semibold text-brand hover:underline">
        המשך
      </Link>
    </main>
  );
}
