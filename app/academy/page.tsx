import { AcademyHome, type AcademyTrack } from "@/components/academy-home";
import { BOOKS, bookStats } from "@/data/library/academy-index";

export const metadata = { title: "SAP Academy · Project NEO" };

/**
 * Track cards for the academy home, resolved here on the server.
 *
 * Each entry in `BOOKS` carries that book's full `data` (the entire textbook),
 * and `bookStats()` walks that data to count chapters, subchapters, nodes and
 * words. While the client component imported them directly, roughly 10 MB of
 * textbook content was bundled into the browser so the page could render five
 * integers per card. This page is a server component, so the walk happens at
 * build time and only the resulting numbers cross into the client.
 *
 * `data` is dropped deliberately: the academy home never reads it, and keeping
 * it would put the textbooks straight back into the payload. Every other BookDef
 * field is passed through untouched, so the cards keep exactly the data they had
 * — no content, ordering or link behaviour changes.
 */
const TRACKS: AcademyTrack[] = BOOKS.map(({ data: _data, ...meta }) => ({
  ...meta,
  ...bookStats(meta.id),
}));

// SAP Academy — premium learning home (P2 redesign). The old dashboard (quality
// reports / book management) moved to /academy/dashboard.
export default function AcademyPage() {
  return <AcademyHome tracks={TRACKS} />;
}
