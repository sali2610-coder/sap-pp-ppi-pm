# The 10 Outputs — Templates

Fill each from the **concept ledger**, not from memory. Keep faithful to the source; never invent
codes, commands, page numbers, or facts.

## Concept ledger (build first)
| # | Concept | One-line meaning | Locator (file · ch/§/page) | Exact code/cmd (if any) |
|---|---------|------------------|----------------------------|--------------------------|
| 1 | Sales order | Customer request to deliver goods | book.md · Ch.3 | VA01 · table VBAK |

The ledger feeds the glossary (9) and keeps every other output honest.

## Table of contents
1. [Chapter summaries](#1-chapter-summaries) · 2. [Hebrew notes](#2-hebrew-notes) ·
3. [Beginner](#3-beginner-explanation) · 4. [Expert](#4-expert-explanation) ·
5. [Flashcards](#5-flashcards) · 6. [Knowledge test](#6-knowledge-test) ·
7. [Presentation](#7-presentation) · 8. [Exercises](#8-practical-exercises) ·
9. [Glossary](#9-glossary) · 10. [Runbook](#10-runbook)

## 1. Chapter summaries
Per chapter: `### Ch.N — Title` → **Aim** (1 line) → 3–6 **key points** (bullets) → **Takeaway** (1 line).
A summary is faithful compression, not opinion. Cover every chapter in the source map.

## 2. Hebrew notes
RTL Hebrew study notes. Translate the *explanation*; keep all SAP/technical identifiers in Latin.
See [hebrew.md](hebrew.md). Structure: `## נושא` → הסבר קצר → נקודות מפתח → מונחים (term — הגדרה).

## 3. Beginner explanation
Plain language. Lead with "why it matters", then a everyday analogy, then the idea — introduce each
jargon term only after defining it. Short sentences. Aim: a motivated novice gets it on first read.

## 4. Expert explanation
Assumes background. Precise terminology, internals, edge cases, performance/trade-offs, common
gotchas, and how it connects to adjacent concepts. No hand-holding; density is the point.
(Tests #3 vs #4: they must differ in register, not be the same text reworded.)

## 5. Flashcards
Atomic Q→A. JSON for `scripts/make_flashcards.py`:
```json
{"deck":"Ch.3 — Sales orders","cards":[
  {"q":"Which tcode creates a sales order?","a":"VA01.","tag":"remember","source":"Ch.3"}]}
```
→ `flashcards.tsv` (front⇥back⇥tags, Anki) + `flashcards.md`. One fact per card.

## 6. Knowledge test
MCQ/TF/short with Bloom tags + answer key + rationale. JSON for `scripts/make_quiz.py`:
```json
{"title":"Ch.3 quiz","items":[
 {"type":"mcq","tag":"remember","question":"Tcode to create a sales order?",
  "options":["VA01","VA03","VL01N","ME21N"],"answer":0,
  "rationale":"VA01 = create; VA03 = display.","source":"Ch.3"}]}
```
→ `quiz.md` (+ separate answer key) + `quiz.gift` (Moodle). MCQ: one defensible key, plausible distractors.

## 7. Presentation
Produce a slide **outline** with action titles (each title states the takeaway), then hand to the
`pptx` / `academic-pptx` skills to build the .pptx. Outline row: `Slide N — <action title> — <exhibit>`.

## 8. Practical exercises
Per exercise: **Goal** · **Difficulty** (intro/core/stretch) · **Steps** · **Expected result** ·
**Solution** (worked). For SAP/technical, steps use exact tcodes/commands. Every exercise has a
checkable expected result so the learner knows if they succeeded.

## 9. Glossary
Alphabetical `**Term** — definition` straight from the ledger; append the exact code/command verbatim
where relevant (`**Sales order** — customer request to deliver goods. Create: VA01; header table VBAK.`).

## 10. Runbook
An executable procedure, not prose:
```
# Runbook: <task>
## Prerequisites: <roles/auth, data, system>
## Steps
1. <action> (tcode/command) → <what you see>
2. ...
## Verify: <how to confirm success>
## Rollback: <how to undo / who to call>
```
Each step is ordered and individually checkable. Preserve codes/commands exactly.

---
For a full learning pack, after producing artifacts run
`python3 scripts/build_pack.py out/ --title "<source> — Learning Pack"` to write `index.md` linking them.
