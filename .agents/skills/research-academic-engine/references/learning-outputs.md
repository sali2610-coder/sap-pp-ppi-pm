# Learning Outputs — Flashcards, Quizzes, Study Guides

Goal: testable, honest study material derived only from the source. Tag difficulty by Bloom level so
the set spans recall → understanding → application → analysis, not just trivia.

## Bloom levels (use as tags)
`remember` (define/list) · `understand` (explain/summarize) · `apply` (use in a new case) ·
`analyze` (compare/why) · `evaluate` (judge) · `create` (design). A good set is mostly
remember/understand with a meaningful minority of apply/analyze.

## Flashcards
Atomic Q→A pairs. One fact per card. The question must be answerable from memory and unambiguous;
the answer is the shortest correct response. Avoid "list everything about X" mega-cards — split them.

JSON shape for `scripts/make_flashcards.py`:
```json
{
  "deck": "Skill formation — core concepts",
  "cards": [
    {"q": "What is skill complementarity?",
     "a": "Early skills raise the return to later skill investment (skills beget skills).",
     "tag": "understand", "source": "Cunha & Heckman 2007"}
  ]
}
```
Outputs: `flashcards.tsv` (Anki: `front<TAB>back<TAB>tags`) + `flashcards.md` (printable). Good cards:
- front tests one idea; back is one fact
- no "it/this" with no referent on the front
- include the source tag so learners can verify

## Quiz / Exam
Mix item types: MCQ (single best answer), true/false, short-answer. Each item carries a Bloom tag and a
rationale for the key. **MCQ rules:** exactly one defensible correct option; 3 plausible distractors
(common misconceptions, not absurd fillers); options parallel in length/grammar; no "all/none of the
above" unless deliberate; key position varied.

JSON shape for `scripts/make_quiz.py`:
```json
{
  "title": "Skill formation quiz",
  "items": [
    {"type": "mcq", "tag": "remember",
     "question": "Skill complementarity means…",
     "options": ["early skills raise returns to later investment",
                 "skills decay without practice",
                 "only genetics determine skills",
                 "schooling fully mediates earnings"],
     "answer": 0,
     "rationale": "Cunha & Heckman: early skills raise the productivity of later investment.",
     "source": "Cunha & Heckman 2007"},
    {"type": "short", "tag": "apply",
     "question": "Give one policy implication of skill complementarity.",
     "answer": "Invest early; early gains compound, raising the payoff of later investment.",
     "source": "Cunha & Heckman 2007"}
  ]
}
```
Outputs: `quiz.md` (questions + separate answer key with rationale) + `quiz.gift` (Moodle GIFT import).
`make_quiz.py` checks every MCQ has a valid single `answer` index and ≥3 options — it errors otherwise,
which is your validation that the set is well-formed.

## Study Guide
Condensed revision doc, organized by theme:
`Theme → key definitions → 2–4 must-know facts → one worked example → self-test prompts`.
End with a "you should be able to…" list (learning objectives) mapped to Bloom levels.
