# QA Checklist (QA Critic gate)

## Content
- [ ] Every content slide has an action title (complete sentence stating the takeaway)
- [ ] Ghost-deck: action titles in order tell the full argument
- [ ] One idea / one exhibit per slide; key finding annotated on the exhibit
- [ ] Every borrowed fact/figure has an in-text citation (maps to evidence ledger)
- [ ] References slide present; Conclusions is the last non-appendix slide
- [ ] Body text ≤ ~40 words/slide; nothing is a wall of text
- [ ] No fabricated numbers/quotes/codes; inference is hedged, results are neutral

## Visual (render to image, then inspect)
- [ ] No clipped / overflowing / overlapping text
- [ ] Arrows/connectors land on the intended element
- [ ] Even spacing; balanced composition; no large voids or crowding
- [ ] Body ≥ 20pt; readable at export size; contrast ≥ WCAG AA
- [ ] Theme tokens applied consistently (palette, type scale, margins)

## Build / export
- [ ] deck_spec validates against deck-spec.schema.json
- [ ] Native PPTX (editable shapes/charts/tables), not flat images
- [ ] PDF opens; page count == slide count
- [ ] Localization (if used): explanation translated, SAP/tech identifiers left in Latin

## Loop rule
Route each defect to the responsible agent; re-render; repeat until a clean pass (2–4 iters).
Same defect twice → escalate to the user with the rendered screenshot.
