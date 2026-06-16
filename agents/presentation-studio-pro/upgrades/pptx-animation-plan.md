# PPTX Animation Plan

How native PowerPoint animation is produced (no manual PowerPoint work).

## Tooling
`upgrades/pptx_animate.py <deck.pptx> [--transition fade|push|wipe] [--effect fade|wipe|zoom] [--dur 0.35]`
- Imports ppt-master's `pptx_animations` (XML generators) — read-only reuse, no skill change.
- Walks `ppt/slides/slideN.xml`, collects shape ids (`<p:cNvPr id=…>`), injects `<p:transition>` and a
  `<p:timing>` after-previous entrance sequence before `</p:sld>`. Rewrites the zip.

## Per-slide-type effect mapping (semantic, automatic)
| Shape role (by name) | Entrance |
|----------------------|----------|
| title / subtitle | fade |
| chart / graphicFrame | wipe |
| image / picture | zoom |
| other (bullets, tiles, shapes) | fade (configurable base) |

## Trigger / pacing
- `after-previous` by default: first element on slide entry, rest chain with a 0.6× stagger.
- Duration 0.3–0.45s (crisp, not sluggish). Transition 0.5s.
- Delivery override: a `live` plan can be re-emitted as `on-click` (the engine supports it).

## Template → transition
academic/sap/financial/analytics → fade · executive → push (or morph where supported).

## Validation
25/25 slides across the 5 decks carry `<p:timing>` + `<p:transition>`; all decks remain zip-valid and
open in python-pptx and LibreOffice. Animations are authored, not hand-clicked.

## Limits / next
PPTX `<p:timing>` covers entrance + transition. Motion paths, emphasis, and exit effects are out of
scope for this pass; add via the same generator if a deck needs them.
