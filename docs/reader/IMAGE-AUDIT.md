# Figure image-quality audit (§10) — by book

Resolution buckets by natural width: high ≥1200px · med 600–1199px · low <600px.

| book | total | high | med | low | minW | maxW | verdict |
|------|------:|-----:|----:|----:|-----:|-----:|---------|
| book1 (PM config) | 521 | 31 | 444 | 46 | 224 | 2143 | ok |
| book2 (PP) | 861 | 479 | 374 | 8 | 354 | 1919 | ok |
| book3 (MM) | 495 | 262 | 224 | 9 | 358 | 2926 | ok |
| book4 (PP/DS) | 486 | 97 | 369 | 20 | 392 | 1906 | ok |
| book5 (QM) | 835 | 473 | 345 | 17 | 373 | 1918 | ok |
| **book6 (WM/EWM)** | **657** | **0** | **0** | **657** | **231** | **400** | **SOURCE-LIMITED — all figures ≤400px** |
| book7 (Fiori) | 0 | – | – | – | – | – | no figures |

## Finding
book6 (the featured WM/EWM book) was extracted at thumbnail resolution — every one
of its 657 figures is ≤400px wide, while all other books carry sharp 600–2900px
figures. When previously displayed with `max-w-full`, book6 figures upscaled and
blurred. No higher-resolution source exists in the extracted asset set — these are
genuinely source-limited (do not invent detail).

## Fix applied (presentation, no re-extraction / no invented detail)
- Viewer + inline figures now cap display to the source's NATURAL pixel size
  (`min(viewport/column, naturalW)`), so a 400px figure renders crisp at 400px in a
  neutral frame instead of being stretched across the screen.
- Figures with natural width <600px are flagged "מקור ברזולוציה מוגבלת" (source-
  limited) inline + "מקור מוגבל · עמ׳ N" in the viewer, with the page reference.
- High-res books are unaffected — they still fill the viewport (capped at natural).
- The viewer already loads the full `fig.file` (the largest available asset); the
  filmstrip uses the same asset (no separate low-res thumbnail exists to mistakenly show).
