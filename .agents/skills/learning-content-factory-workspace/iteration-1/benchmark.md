# Benchmark — learning-content-factory (iteration 1, eval-0)

Prompt: Israeli SAP trainee — turn an SD source into 8 study artifacts (summaries, Hebrew notes,
beginner, expert, flashcards, quiz, glossary, runbook).

| Config | Pass rate | Notes |
|--------|-----------|-------|
| with_skill | 5/5 | scripts → Anki TSV + printable MD + Moodle GIFT; flagged missing reversal tcodes |
| without_skill | 3/5 | no importable GIFT; expert added material "beyond the source" |

## Discriminating findings
- **Importable/validated formats:** the skill's `make_quiz.py`/`make_flashcards.py` emit Moodle-GIFT +
  Anki-TSV + printable MD with a built-in validity gate (exit 0). Baseline hand-built a TSV and a
  quiz MD only — usable, but not importable and not validated.
- **Source-anchoring discipline:** with-skill explicitly flagged that the source defines no reversal
  transaction (didn't invent VL09/VF11 confidence beyond source); baseline padded the expert
  explanation with standard SD context "beyond the source."
- **Non-discriminating (easy here):** both kept SAP codes in Latin inside Hebrew, and both covered all
  3 chapters — the small clean SAP source made code-preservation easy for both. On messier/technical-
  manual sources the skill's preserve-verbatim + script discipline should separate more.
