/* ============================================================================
   PROJECT NEO · READER — where a scanned figure belongs.
   ----------------------------------------------------------------------------
   A figure that lives in a strip at the top of the chapter has been taken OUT of
   the passage it illustrates. This module puts it back.

   WHAT THE DATA ACTUALLY GIVES US, AND WHAT IT DOES NOT
     public/books/<id>/fig<n>.json   { page, file, w, h } per scan. The SOURCE
                                     PAGE is real and it is the only anchor
                                     there is.
     data/books/<id>.json            chapters and subchapters, in the book's own
                                     order. NOT ONE of the 4,314 subchapters in
                                     this corpus carries a page number, and no
                                     chapter carries a page band. Verified, not
                                     assumed.

   So an exact "this figure sits inside subchapter 3.2.4" mapping does not exist
   in the project and is not invented here. What DOES exist is order: within a
   chapter the scans are in page order and the subchapters are in reading order,
   and both run the same way through the same pages.

   THE RULE, WHICH IS THE PLATFORM'S OWN. components/chapter-reader.tsx has
   placed figures this way in production since the library shipped: order the
   scans by page, take the chapter's page band, and drop each scan after the
   subchapter whose proportional share of the band contains it. This module
   reproduces that rule rather than inventing a second one, with one difference
   that the NEO payload forces — the canonical reader is handed a page band per
   chapter and this one is not, so the band is taken from the scans themselves.

   IT IS AN APPROXIMATION AND THE SURFACE SAYS SO. Every placed figure is
   rendered with its real source page beside it and a plain sentence that the
   position is derived from that page rather than recorded in the book. A scan
   that cannot be placed at all is not dropped: it goes to the chapter tail,
   which is the strip this replaced, so nothing is ever lost to a tidier screen.
   ========================================================================== */

import type { ViewerFigure } from "@/components/figure-viewer";

/** A scan, carrying the index it holds in the chapter's own ordered list —
 *  which is what the figure viewer's filmstrip is indexed by. */
export interface PlacedFigure {
  fig: ViewerFigure;
  /** Index into the ordered list, so the viewer opens on the right scan. */
  index: number;
  /** 1-based number within the chapter, for the caption. */
  n: number;
}

export interface FigurePlan {
  /** The scans in page order. This is what the viewer is handed. */
  ordered: ViewerFigure[];
  /** Placed scans, keyed by the index of the subchapter they render after. */
  bySection: Map<number, PlacedFigure[]>;
  /** Scans with no usable page, or with no subchapter to sit in. Never hidden. */
  tail: PlacedFigure[];
}

const EMPTY: FigurePlan = { ordered: [], bySection: new Map(), tail: [] };

/**
 * Distributes one chapter's scans across its subchapters.
 *
 * @param figs      the chapter's scans, in any order.
 * @param sections  how many subchapters the chapter has. 0 is a real state.
 */
export function planFigures(figs: ViewerFigure[], sections: number): FigurePlan {
  if (!figs.length) return EMPTY;

  const ordered = [...figs].sort((a, b) => a.page - b.page);
  const bySection = new Map<number, PlacedFigure[]>();
  const tail: PlacedFigure[] = [];

  const pages = ordered.map((f) => f.page).filter((p) => typeof p === "number" && p > 0);
  const lo = pages.length ? Math.min(...pages) : 0;
  const hi = pages.length ? Math.max(...pages) : 0;
  const span = hi - lo + 1;

  // No subchapters to place into, or every scan on one page: the honest answer
  // is the chapter tail. A single-page chapter has no order to spread along.
  if (sections <= 0 || span <= 1) {
    ordered.forEach((fig, index) => tail.push({ fig, index, n: index + 1 }));
    return { ordered, bySection, tail };
  }

  ordered.forEach((fig, index) => {
    const row: PlacedFigure = { fig, index, n: index + 1 };
    if (!(typeof fig.page === "number" && fig.page >= lo && fig.page <= hi)) {
      tail.push(row);
      return;
    }
    const si = Math.min(sections - 1, Math.max(0, Math.floor(((fig.page - lo) / span) * sections)));
    const bucket = bySection.get(si);
    if (bucket) bucket.push(row);
    else bySection.set(si, [row]);
  });

  return { ordered, bySection, tail };
}
