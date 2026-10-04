"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

/** The corrected detail is already rendered on the server. Replace only the
 *  historical URL, retaining history position, filters and section anchors. */
export function TxRouteAlias({ code }: { code: string }) {
  const router = useRouter();
  useEffect(() => {
    router.replace(`/neo/transactions/${encodeURIComponent(code)}/${window.location.search}${window.location.hash}`, { scroll: false });
  }, [code, router]);
  return null;
}
