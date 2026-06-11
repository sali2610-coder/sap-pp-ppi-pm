# Animation Director System

Maps one animation plan to **RevealJS · Frontend Slides · PPTX** across 8 categories, so a deck
animates natively on every target. Agent spec: `../agents/animation-director.md`.

## Pieces
- `animation-catalog.md` — 8 categories, when to use each, per-target mapping, accessibility.
- `mapper.py` — plan → {revealjs, frontend, pptx} config. `python3 mapper.py plan.json --target all`.
- `examples/plans.json` — one plan per category; `examples/out_all.json` — mapped output.

## Categories
Fade · Zoom · Progressive Reveal · Scroll Driven · KPI Build Up · Timeline Animation ·
Process Walkthrough · Dashboard Animation.

## Targets & degradation
- RevealJS: fragments / transitions / scroll view / auto-animate.
- Frontend: framer-motion-style variants + IntersectionObserver (scroll) + counters (KPI).
- PPTX: native steps via `ppt-master scripts/pptx_animations.py` / pptxgenjs transitions. Scroll-driven
  and count-up have no PPTX equivalent → mapper degrades to a timed build and flags it.

## Delivery → trigger
live → on-click · recorded → after-previous/auto-advance · web → in-view/timed.
Source of truth: `deck_spec.slides[].animation`; the animation-director writes the plan, mapper renders it.
