---
name: research-academic-engine
description: >
  Transform academic sources (PDF, DOCX, PPTX, Markdown) into scholarly and study outputs —
  summaries, literature reviews, university assignments, seminar papers, presentations, flashcards,
  and quizzes — with correct APA 7 / IEEE / Harvard citations. Use this skill whenever the user
  uploads or points to a paper, article, thesis chapter, lecture deck, or reading and wants it
  summarized, reviewed, turned into an assignment or seminar paper, made into slides, or converted
  into study material (flashcards, MCQs, exam questions, study guide). Trigger on phrases like
  "summarize this paper", "write a literature review", "turn these readings into an essay",
  "make flashcards from this", "create a quiz", "draft my seminar paper", "cite this in APA/IEEE/Harvard",
  even when the user does not name a format explicitly but provides academic source material.
license: MIT
---

# Research Academic Engine

Turn source material into trustworthy academic and study artifacts. The value of this skill is
**fidelity + structure + citations**: every claim traces to a source, every output follows the
genre's expected structure, and citations are correctly formatted. Do not invent findings, page
numbers, DOIs, or quotations — if a source lacks the detail, say so rather than fabricate.

## Pipeline (always the same shape)

```
Ingest source(s) → Extract evidence ledger → Pick output genre(s) → Draft to template → Cite → Validate
```

1. **Ingest** — convert every source to Markdown so you can read and quote it. See [references/source-analysis.md](references/source-analysis.md). Use `scripts/ingest.py <file>` (handles PDF/DOCX/PPTX; passes Markdown through).
2. **Extract an evidence ledger** — before writing anything, build a compact table of claims,
   evidence, and where each came from (file + section/page). This is the spine that keeps every
   downstream output honest. Template in [references/source-analysis.md](references/source-analysis.md).
3. **Pick genre(s)** — the user asks for one or more academic or learning outputs (below). Each has a
   fixed structure; match it.
4. **Draft to template** — follow the genre template exactly. Academic prose is concise and hedged
   appropriately ("suggests", "is consistent with"), never overclaiming.
5. **Cite** — in-text + a reference list in the requested style. See [references/citations.md](references/citations.md)
   and `scripts/cite.py`. Default to APA 7 if the user doesn't specify.
6. **Validate** — run the checklist at the bottom. For flashcards/quizzes, validate with the scripts.

## Step 1 — Identify what the user wants

| User intent | Output | Guide |
|-------------|--------|-------|
| "summarize", "TL;DR", "key points" | Summary (abstract / executive / structured) | [academic-outputs.md](references/academic-outputs.md) §Summary |
| "literature review", "synthesize these papers" | Literature review (thematic synthesis) | [academic-outputs.md](references/academic-outputs.md) §Literature Review |
| "assignment", "essay", "term paper", "report" | University assignment | [academic-outputs.md](references/academic-outputs.md) §Assignment |
| "seminar paper", "conference paper", "manuscript" | Seminar paper (IMRaD) | [academic-outputs.md](references/academic-outputs.md) §Seminar Paper |
| "slides", "presentation", "defense deck" | Presentation | hand to the `academic-pptx` + `pptx` skills; supply the outline + action titles |
| "flashcards", "Anki", "revision cards" | Flashcards | [learning-outputs.md](references/learning-outputs.md) §Flashcards + `scripts/make_flashcards.py` |
| "quiz", "MCQ", "exam questions", "test me" | Quiz / exam | [learning-outputs.md](references/learning-outputs.md) §Quiz + `scripts/make_quiz.py` |
| "study guide", "revision notes" | Study guide | [learning-outputs.md](references/learning-outputs.md) §Study Guide |

If the user asks for several (e.g., "summary + flashcards"), run the pipeline once and branch at step 3.

## Step 2 — Source analysis (PDF / DOCX / PPTX / Markdown)

Read [references/source-analysis.md](references/source-analysis.md). Core rule: **never quote or cite
what you have not ingested**. Convert first, read the Markdown, then build the evidence ledger. For
scanned PDFs (image-only), say so and request a text layer or OCR — do not guess content.

## Step 3 — Citations (APA 7 / IEEE / Harvard)

Read [references/citations.md](references/citations.md) for the rules, in-text patterns, and worked
examples per style. Use `scripts/cite.py` to format a reference from structured fields — it keeps
punctuation and ordering consistent so you don't have to remember every comma. Ask the user which
style if they haven't said; default APA 7. Flag missing fields (no DOI, no page) rather than inventing.

## Step 4 — Academic outputs

Each genre has a required skeleton. The full templates (with section-by-section guidance and an
example) live in [references/academic-outputs.md](references/academic-outputs.md):

- **Abstract** — 150–250 words: context, aim, method, key result, implication.
- **Introduction** — funnel: broad context → gap → aim/RQ → contribution + roadmap.
- **Literature review** — thematic synthesis (not paper-by-paper), with a gap statement.
- **Findings** — report results neutrally; one claim per paragraph, each tied to evidence.
- **Discussion** — interpret, compare to prior work, state limitations.
- **Conclusions** — restate contribution + 2–4 takeaways + future work. No new evidence.
- **References** — full list in the chosen style, alphabetical (APA/Harvard) or by citation order (IEEE).

## Step 5 — Learning outputs

Read [references/learning-outputs.md](references/learning-outputs.md). Key ideas:

- **Flashcards** — atomic Q→A pairs, one fact each, testing recall not recognition. Export TSV (Anki) +
  printable Markdown via `scripts/make_flashcards.py`.
- **Quizzes / exams** — tag each item with a Bloom level (recall → apply → analyze) and provide an
  answer key with rationale. MCQs need one unambiguous key and plausible distractors. Export Markdown +
  GIFT (Moodle-importable) via `scripts/make_quiz.py`.
- **Study guide** — condensed outline + definitions + self-test prompts, organized by theme.

## Scripts

| Script | Does | Call |
|--------|------|------|
| `scripts/ingest.py` | source → Markdown (markitdown for PDF/DOCX/PPTX; passthrough for .md) | `python3 scripts/ingest.py in.pdf > out.md` |
| `scripts/cite.py` | structured fields → formatted reference (apa7/ieee/harvard) | `python3 scripts/cite.py refs.json --style apa7` |
| `scripts/make_flashcards.py` | cards JSON → Anki TSV + printable MD | `python3 scripts/make_flashcards.py cards.json out/` |
| `scripts/make_quiz.py` | quiz JSON → MD (with key) + GIFT | `python3 scripts/make_quiz.py quiz.json out/` |

Data shapes for the JSON inputs are documented at the top of each script and in the reference files.

## Validation checklist (run before delivering)

```
□ Every claim in the output traces to the evidence ledger (no orphan assertions)
□ No fabricated quotes, page numbers, DOIs, author names, or years
□ In-text citations present wherever a source is used
□ Reference list complete, in the requested style, internally consistent
□ Genre structure matches the template (e.g., IMRaD for seminar paper)
□ Flashcards: one fact per card; question answerable without seeing the answer
□ Quiz: each MCQ has exactly one correct key + plausible distractors; answer key included
□ Scripts ran clean (cite.py / make_flashcards.py / make_quiz.py exit 0, files non-empty)
□ Hedged language for inference; neutral language for reported results
```

See [examples/](examples/) for a full worked run (source → evidence ledger → summary, literature
review, flashcards, quiz, references) you can imitate.
