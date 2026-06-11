# Worked Example — full pipeline

Source → evidence ledger → outputs (summary, literature review, flashcards, quiz, references).
Run from the skill root.

## 1. Ingest
```bash
python3 scripts/ingest.py examples/source.md > examples/out/ingested_source.md
# (PDF/DOCX/PPTX work the same: python3 scripts/ingest.py paper.pdf > paper.md)
```

## 2. Evidence ledger (built by reading the Markdown)
| # | Claim | Evidence | Locator | Cite key |
|---|-------|----------|---------|----------|
| 1 | Early skills raise later returns | "skills beget skills" | source.md §2 | Cunha & Heckman 2007 |
| 2 | Perry effects persist to adulthood | earnings + crime outcomes | source.md §3 | Heckman et al. 2013 |

## 3. Academic output — Literature review excerpt (APA 7 in-text)
See `out/literature_review.md`. Note thematic synthesis + hedged inference + gap statement.

## 4. Learning outputs
```bash
python3 scripts/make_flashcards.py examples/cards.json examples/out
python3 scripts/make_quiz.py       examples/quiz.json  examples/out
```
→ `out/flashcards.tsv` (Anki) + `out/flashcards.md`; `out/quiz.md` + `out/quiz.gift` (Moodle).

## 5. References (any style)
```bash
python3 scripts/cite.py examples/refs.json --style apa7    # or ieee | harvard
```

All four scripts exit 0 on valid input and non-zero with a clear message on malformed input
(e.g., an MCQ whose answer index is out of range) — that non-zero exit is the validation signal.
