# Reader Finalization — design blueprint (from research + recon)

## Canonical location (build first)
Single source of truth = { sectionId, chapter, ratioWithinSection }. Both modes,
rail thumb, resume, bookmarks read/write it. Never fake pagination over scroll.

## Reading modes
- Continuous scroll (default): one column max-width ~68ch, IO scroll-spy → location.
- Real pagination: CSS multicol into fixed-height viewport; page = translateX of
  -(N-1)*(pageW+gap) (RTL: positive X). pageCount = scrollWidth/(pageW+gap),
  recompute on ResizeObserver + font change (debounced). Spread (2 col) tablet+/desktop.
  Inputs: ←/→ (RTL forward=left), Space, swipe w/ velocity, tap-zones, wheel→page step.
  Footer: עמוד N מתוך M + chapter. Chapter boundary = red top-rule + centered next title.
  Switch preserves location via offsetLeft/pageStride (page) / scrollIntoView (scroll).

## Progress rail (desktop, leading edge = RTL right)
Slim vertical 6→10px hover. Book% fill (brand red 70%), chapter ticks, current-section
dot, bookmark flags, figure markers (lucide Image — NEO-specific), draggable thumb
(role=slider, aria-valuetext Hebrew), hover label chip (chapter/section + %),
est time remaining ("~12 דק׳ עד סוף הפרק", Kindle phrasing). Auto-hide with chrome.
Mobile: horizontal bottom scrubber + TOC sheet w/ per-chapter %.

## BookCover + shelf open transition
All books = full BookCover (face-out, 3:4, module cloth, foil title, spine, depth).
Open: shelf dims to ~0.5 (context stays), cover lifts (scale 1.06, y-8), moves forward
via layoutId="book-<id>", de-rotate rotateY 4→0, content emerges from behind (y24→0,
60ms delay). spring 260/30, ~420ms, tiny end-bounce. Close reverses. reduced-motion=crossfade.
Currently-open state: "פתוח" pill + chevron on cover + spine.

## Reader settings (popover desktop / bottom-sheet mobile)
Groups: תצוגה (scroll/pages, spread) · מראה (בהיר/ספיה/לילה swatches) ·
טקסט (A-/A+, spacing, weight) · רוחב (צר/רגיל/רחב = 58/68/82ch). Live preview. Reset link.

## Module colors (existing, book-cover.tsx)
PP #d62027 · PM #f97316 · PP-PI #6d28d9 · QM #059669 · MM #d97706 · WM #7c3aed ·
IBP #0891b2 · Fiori #db2777 · Foundation #475569

## 11 books (data/library.ts + book{N}-full.json)
1 config-pm PM SAP-PRESS 729p/8ch/206fig · 2 production-planning PP-PI 1087/17 ·
3 sourcing MM 709/15 · 4 pp-ds PP-PI 639/11 · 5 quality QM 939/15 ·
6 warehouse WM 1341/6/83fig (FEATURED) · 7 fiori Fiori 685/12 · 8 academy PM ·
9 pm-business PM 669/10 · 10 ibp IBP 923/11 · 11 s4-foundation Foundation ZaranTech 193/9

## Bugs
§6 selector: book-reader ~527 select value={active} option value={ch.n}; IO sets active
from dataset.chapter (~368). Reproduce; ensure ch.n consistent everywhere; ch1 selectable.
§7 בעמוד זה: sections via MutationObserver on [data-section] (~322); ChapterReader
open=ch.n===1 default → only ch1 sections in DOM. Fix: force scan on open OR keep mounted.
§8 remove knowledge panel = code left grid col (chapter tree+score+notes+search) → toolbar.
