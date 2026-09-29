"use client";

import Link from "next/link";
import { RotateCcw } from "lucide-react";

/** "Try again" on /neo/offline/: the address that was asked for, which the
 *  service worker passes as ?from= (public/sw.js), read when it is pressed.
 *  Only a NEO address is taken; otherwise the link is the home page. A full
 *  load, not a client navigation: the point is to ask the network again. */
export function OfflineRetry() {
  return (
    <Link
      href="/neo/"
      prefetch={false}
      className="nu-btn2"
      onClick={(e) => {
        const from = new URLSearchParams(window.location.search).get("from");
        if (from && from.startsWith("/neo/") && !from.startsWith("/neo/offline/")) {
          e.preventDefault();
          window.location.assign(from);
        }
      }}
    >
      <RotateCcw size={16} strokeWidth={1.75} aria-hidden="true" />ניסיון נוסף
    </Link>
  );
}
