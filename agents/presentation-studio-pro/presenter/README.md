# AI Presenter

Turns a `.pptx` into a delivery kit for a given audience.

## Run
```bash
python3 present.py <deck.pptx> --profile academic|sap|executive|training|financial [--minutes N] [--out dir]
```
Writes `presenter_kit.md` (6 artifacts) + `timing.json` next to the deck.

## 6 artifacts
1. Speaker notes (per slide) · 2. Presentation script · 3. Q&A preparation ·
4. Audience objections (+ rebuttals) · 5. Timing plan (per slide + total vs target) · 6. Executive summary.

## 5 audience profiles (profiles.json)
| Profile | wpm | register | Q&A focus / objections |
|---------|:--:|----------|------------------------|
| academic | 130 | hedged, evidence-led | validity, generalizability / single-case, causation |
| sap | 135 | tcode/table-accurate | which tcode, S/4 impact / effort, CBO, downtime |
| executive | 120 | answer-first, minimal | ROI, the ask / too expensive, why now |
| training | 125 | step-by-step | how-to, errors / too fast, hands-on |
| financial | 130 | number-anchored | assumptions, sensitivity / optimistic, one-off |

## How timing works
per-slide minutes = words/wpm + dwell (0.4–0.6); total vs `--minutes` → over/under verdict (what to cut/add).

## Validated
Ran on the 5 studio decks with matched profiles; all 6 artifacts produced, profile-differentiated,
timing exact. Deterministic (same deck + profile → same kit).

## Pipeline fit
Runs after the review board passes a deck — the last step before delivery. Refine the scaffold with the
agent prompt in `agents/ai-presenter.md`.
