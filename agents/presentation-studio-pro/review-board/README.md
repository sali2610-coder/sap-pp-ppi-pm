# Presentation Review Board

Final pre-delivery gate. Scores any `.pptx` on **10 dimensions**, weighted per audience template,
emitting a scorecard + strengths + weaknesses + improvement plan + slide-by-slide review.

## Run
```bash
python3 review.py <deck.pptx> --template sap|university|executive|financial|technical_training [--out dir]
```
Writes `scorecard.json` + `review.md` next to the deck (or in `--out`).

## 10 dimensions (rubric.json)
Executive Quality · Academic Quality · Storytelling · Visual Design · Data Visualization ·
Infographics · Animation Usage · Accessibility · Audience Fit · Decision Readiness. Each 1–5 from
measurable signals; transparent + reproducible.

## Templates (weighting profiles, weights sum to 1.0)
| Profile | Heaviest weights |
|---------|------------------|
| `sap` | infographics 0.18, storytelling/data-viz 0.12 |
| `university` | academic 0.20, storytelling 0.15 |
| `executive` | executive 0.20, decision 0.16 |
| `financial` | data-viz 0.22, executive/decision 0.12 |
| `technical_training` | infographics 0.20, accessibility/animation 0.12/0.10 |

## How it scores (signals → dimension)
action titles, charts, tables, infographic images, words/slide, citations, References slide, decision
slide, native `<p:timing>`/`<p:transition>`, min font size → per-dimension 1–5 → template-weighted overall.

## Validated
Ran on the 5 studio decks, v1 vs v2 (same template): every upgraded deck scored higher, biggest gains
on the decks that added infographics + native animations (analytics +0.84, financial +0.62). The board
discriminates and is deterministic (same input → same scorecard).

## Use in the pipeline
Runs at the orchestration **QA / pre-delivery** gate. Weaknesses route to studio agents:
infographics→infographic-designer, weak titles→presentation-architect, no animation→`upgrades/pptx_animate.py`,
small text→visual-designer. Re-review after fixes.
