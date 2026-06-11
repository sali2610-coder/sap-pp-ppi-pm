# Benchmark — research-academic-engine (iteration 1, eval-0)

Prompt: ingest a reading → 180-word abstract + 5 Anki flashcards + IEEE references (exam prep).

| Config | Pass rate | Key difference |
|--------|-----------|----------------|
| with_skill | 5/5 | correct IEEE ref, 3-col Anki tsv, scripts used |
| without_skill (baseline) | 3/5 | **fabricated** the Heckman 2013 reference; tsv missing tags |

## Discriminating findings
- **Citation fidelity (the skill's core value):** baseline invented a real-but-different paper
  (AER 103(6):2052–2086) in place of the source's Heckman et al. 2013 (J. Public Economics 94(1)).
  The skill's integrity guard + cite.py produced the correct entry. This is exactly the failure mode
  the skill exists to prevent.
- **Format correctness:** skill's make_flashcards.py emits Anki-correct 3-column TSV (front/back/tags);
  baseline emitted 2-column without Bloom/source tags.
- Non-discriminating: both hit the abstract word count and 5-card count (easy targets).
