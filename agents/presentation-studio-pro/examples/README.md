# Worked Example — design artifacts only (no deck built)

A single brief flowed through the pipeline's gated artifacts. These show the *contracts*, not output:
no PPTX is produced (design phase only).

Topic: "Why our ECC→S/4HANA cutover should be gated on field-mapping completeness" — a 6-slide
exec briefing.

Pipeline trace:
1. `brief.json`           — Brief Analyst (objective, audience=steering committee, 8 min)
2. `evidence_ledger.json` — Source Researcher (claims tied to the NEO blueprints)
3. `outline.json`         — Narrative Architect (answer-first spine; ghost-deck passes)
4. `deck_spec.excerpt.json` — Producers' joined slice (content + a chart exhibit + layout)
5. `theme.json`           — Visual Designer (navy/blue tokens, a11y)

Read the action titles in `outline.json` top to bottom — they alone tell the argument. That is the
Outline gate the orchestrator blocks on.
