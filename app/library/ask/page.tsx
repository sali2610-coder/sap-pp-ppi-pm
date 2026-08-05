"use client";

/**
 * Legacy route. The book-scoped Ask experience now lives at /ai/.
 *
 * What used to be here was an earlier chat that called the v1 endpoint
 * (/api/ask) with no scope tree. /ai/ supersedes it: v2 endpoint, book →
 * chapter → section scoping, and real citations.
 *
 * This is a stub rather than a deletion so bookmarks and already-shared links
 * keep working. It cannot be a server redirect — the site builds with
 * `output: "export"`, where neither `redirect()` nor a next.config redirects
 * rule exists at runtime. The router call covers a normal visit; the meta
 * refresh covers JavaScript being unavailable and is what a plain static file
 * server honours.
 *
 * Retire once traffic here has stopped.
 */

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LegacyAskPage() {
  const router = useRouter();
  useEffect(() => { router.replace("/ai/"); }, [router]);

  return (
    <>
      <meta httpEquiv="refresh" content="0;url=/ai/" />
      <div className="py-20 text-center">
        <p className="text-sm text-ink-3">
          העמוד עבר אל{" "}
          <Link href="/ai/" className="font-bold text-brand hover:underline">
            שאל את הספרייה
          </Link>
        </p>
      </div>
    </>
  );
}
