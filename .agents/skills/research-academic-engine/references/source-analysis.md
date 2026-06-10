# Source Analysis — Ingest & Evidence Ledger

## Ingest by format
Convert every source to Markdown first; reason over the Markdown, not your memory of the file.

| Format | How |
|--------|-----|
| PDF | `python3 scripts/ingest.py paper.pdf > paper.md` (markitdown). Scanned/image PDF → no text layer; say so, request OCR. |
| DOCX | `python3 scripts/ingest.py doc.docx > doc.md` |
| PPTX | `python3 scripts/ingest.py deck.pptx > deck.md` (slide text + notes) |
| Markdown / txt | read directly (ingest passes it through) |

`ingest.py` prints Markdown to stdout and a one-line stderr note with char count so you can confirm it
actually extracted text (near-zero chars on a PDF = scanned/needs OCR).

## Build the evidence ledger (do this before writing anything)
A compact table that every downstream output draws from. It prevents fabrication and makes citations
trivial. Columns:

| # | Claim (what the source asserts) | Evidence (number/quote/figure) | Locator (file · section/page) | Cite key |
|---|--------------------------------|-------------------------------|------------------------------|----------|
| 1 | Early skills raise later returns | "skills beget skills" | smith.md · §2 | Cunha & Heckman 2007 |

Rules:
- One row per discrete claim. Quote sparingly and exactly; otherwise paraphrase.
- If the source doesn't state a number/page, leave the cell blank — don't fill from assumption.
- The cite key maps to a full record in your `refs.json` for `scripts/cite.py`.

## Multi-source jobs
For literature reviews / multi-paper assignments, ingest each source, build one ledger across all of
them, then add a **theme** column so you can synthesize by theme (see academic-outputs.md §Literature
Review) rather than summarizing paper-by-paper.

## Integrity guards
- Never quote or cite a source you did not ingest.
- Never invent authors, years, DOIs, page numbers, or quotations.
- Distinguish what the source *reports* (neutral) from what you *infer* (hedged).
- If sources conflict, surface the conflict rather than averaging it away.
