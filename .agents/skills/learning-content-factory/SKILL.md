---
name: learning-content-factory
description: >
  Turn a learning source (PDF, book, course material, PowerPoint, technical manual, or SAP book)
  into a complete set of study artifacts: chapter summaries, Hebrew learning notes, beginner and
  expert explanations, flashcards, knowledge tests (quizzes), presentations, practical exercises,
  glossary, and runbooks. Use this skill whenever the user wants to learn from or teach a document
  — "summarize this chapter", "make study notes in Hebrew", "explain this for a beginner",
  "build flashcards / a quiz from this PDF", "create exercises", "make a glossary", "turn this SAP
  book / course / manual into study material", "build me a runbook from this procedure", or asks to
  produce a full learning pack from a source. Triggers across SAP books, university courses, and
  technical manuals, even when the user names only one output (e.g. just "flashcards") — run the
  pipeline and produce what they asked for.
license: MIT
---

# Learning Content Factory

Convert one source into many teaching artifacts, fast and faithfully. The whole value is that every
artifact stays **anchored to the source** (no invented facts, codes, or numbers) and is **shaped for
its purpose** — a beginner explanation reads differently from an expert one; a runbook is steps, not
prose. Pick the outputs the user asked for and produce them to spec.

## Pipeline (same shape every time)

```
Ingest → Chapter/section map → Concept ledger → Produce requested outputs → Localize (Hebrew if asked) → Validate
```

1. **Ingest** every source to Markdown so you can read and quote it. `scripts/ingest.py <file>` handles
   PDF / DOCX / PPTX (markitdown); Markdown/txt pass through. Scanned PDFs (no text layer) are flagged —
   ask for OCR rather than guessing content.
2. **Chapter/section map** — list the chapters/sections with their scope. This is the backbone for
   chapter summaries and for slicing every other output by topic.
3. **Concept ledger** — a compact table of the key concepts, each with a one-line meaning, the source
   locator, and (for technical/SAP) any exact codes (tcodes, tables, FMs, commands). The ledger is what
   keeps outputs honest and powers the glossary. Template in [references/outputs.md](references/outputs.md).
4. **Produce outputs** — one template per artifact, below. Make only what's requested.
5. **Localize** — if Hebrew is asked for, follow [references/hebrew.md](references/hebrew.md). Core rule:
   translate the *explanation*, keep all SAP/technical identifiers in Latin script (VA01, EKKO, `kubectl`).
6. **Validate** — run the checklist at the bottom; run the scripts for flashcards/quiz.

## Choose the domain pack

The source's domain changes terminology, what counts as a "concept", and what a runbook looks like.
Read the matching section of [references/domains.md](references/domains.md):

- **SAP books** — preserve tcodes/tables/IMG paths/SPRO; runbooks are click-paths + tables touched.
- **University courses** — align to syllabus/learning objectives; tests mirror exam style; cite readings.
- **Technical manuals** — preserve commands/flags/config keys exactly; runbooks are copy-paste safe.

## The 10 outputs

Full templates (with a worked snippet each) live in [references/outputs.md](references/outputs.md).
Quick map:

| # | Output | One-line spec |
|---|--------|---------------|
| 1 | Chapter summaries | Per chapter: aim · 3–6 key points · takeaway. Faithful compression, no commentary. |
| 2 | Hebrew learning notes | RTL Hebrew explanation; SAP/technical terms stay Latin (see hebrew.md). |
| 3 | Beginner explanation | Plain language, analogy, no jargon until defined; "why it matters" first. |
| 4 | Expert explanation | Precise, assumes background; edge cases, internals, trade-offs, gotchas. |
| 5 | Flashcards | Atomic Q→A; `scripts/make_flashcards.py` → Anki TSV + printable MD. |
| 6 | Knowledge test | MCQ/TF/short with answer key + rationale; `scripts/make_quiz.py` → MD + GIFT. |
| 7 | Presentation | Slide outline with action titles → hand to `pptx`/`academic-pptx` to build the .pptx. |
| 8 | Practical exercises | Tasks with goal · steps · expected result · solution; graded by difficulty. |
| 9 | Glossary | Term → concise definition (+ exact code/command); from the concept ledger. |
| 10 | Runbook | Numbered, executable procedure: prerequisites · steps · verify · rollback. |

If the user says "make everything" / "full learning pack", produce all 10 and assemble them into one
folder with `scripts/build_pack.py` (writes an index.md linking each artifact).

## Scripts

| Script | Does | Call |
|--------|------|------|
| `scripts/ingest.py` | source → Markdown (PDF/DOCX/PPTX via markitdown; .md passthrough) | `python3 scripts/ingest.py in.pdf > in.md` |
| `scripts/make_flashcards.py` | cards JSON → Anki TSV + printable MD (validates) | `python3 scripts/make_flashcards.py cards.json out/` |
| `scripts/make_quiz.py` | quiz JSON → MD (answer key) + GIFT (validates MCQ keys) | `python3 scripts/make_quiz.py quiz.json out/` |
| `scripts/build_pack.py` | assemble produced artifacts into a pack with index.md | `python3 scripts/build_pack.py out/ --title "..."` |

JSON shapes are documented at the top of each script and in [references/outputs.md](references/outputs.md).

## Validation checklist (before delivering)

```
□ Every fact/code/number traces to the source (no fabrication of tcodes, tables, commands, page nums)
□ Chapter summaries cover every chapter in the source map; each has a takeaway
□ Beginner vs expert explanations are genuinely different in register (not the same text reworded)
□ Hebrew notes: explanation in Hebrew, all SAP/technical identifiers left in Latin script
□ Flashcards: one fact per card; answerable without seeing the answer; scripts exit 0
□ Knowledge test: each MCQ has exactly one defensible key + plausible distractors; key included
□ Runbook: steps are ordered, each verifiable; has prerequisites + a verify/rollback step
□ Glossary: every term defined; exact codes/commands preserved verbatim
□ Exercises: each has an expected result and a worked solution
□ build_pack.py (if used) produced index.md linking all artifacts
```

See [examples/](examples/) for a worked SAP run (source → summaries, Hebrew notes, beginner/expert,
flashcards, quiz, glossary, runbook, exercises) you can imitate.
