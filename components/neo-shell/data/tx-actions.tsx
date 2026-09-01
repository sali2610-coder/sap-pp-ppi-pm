"use client";

/* ============================================================================
   PROJECT NEO · the transaction detail screen's interactive island.
   ----------------------------------------------------------------------------
   Two real behaviours, both wired to the product's EXISTING keys rather than to
   a second private store:

     neo:tx:favorites   the same list /neo/transactions, the live Transaction
                        Center and every /tcode page already read and write.
     neo:tx:recent      likewise. Opening a NEO detail page therefore shows up
                        in the list's «נצפו לאחרונה» tab, which is what makes
                        that tab true rather than decorative.

   Everything else on the page is server-rendered. This file exists so a screen
   of static SAP facts does not have to become a client component to carry two
   buttons.
   ========================================================================== */

import { useEffect } from "react";
import { Star } from "lucide-react";
import { pushRecentTx, toggleTxFavorite, useTxFavorite } from "@/lib/tx-prefs";

export function TxActions({ code }: { code: string }) {
  const fav = useTxFavorite(code);

  useEffect(() => { pushRecentTx(code); }, [code]);

  return (
    <button
      type="button"
      className="nu-btn2 nxt-fav"
      aria-pressed={fav}
      aria-label={fav ? `הסרת ${code} מהמועדפים` : `הוספת ${code} למועדפים`}
      onClick={() => toggleTxFavorite(code)}
    >
      <Star size={14} strokeWidth={1.75} aria-hidden="true" />
      {fav ? "במועדפים" : "הוספה למועדפים"}
    </button>
  );
}
