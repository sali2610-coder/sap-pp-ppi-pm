# Animation Upgrade

Closes gaps #3 (PPTX-native animations) and #4 (HTML/RevealJS interactivity).

## PPTX-native (was: transitions-only via pptxgenjs)
- New injector `upgrades/pptx_animate.py` adds, per slide:
  - a `<p:transition>` (fade default; push for exec) and
  - a `<p:timing>` **entrance sequence** over the slide's shapes (after-previous, staggered, semantic:
    title→fade, chart→wipe, image→zoom).
- Reuses ppt-master's `create_transition_xml` / `create_sequence_timing_xml` (imported, **not** modified).
- Result: **25/25 slides carry native `<p:timing>` + `<p:transition>`**; decks still open in PowerPoint
  (zip-valid, python-pptx opens, LibreOffice renders to PDF).

## HTML/RevealJS interactive layer (was: scroll-only image deck)
- New `build_html_v2.py` produces a self-contained interactive deck:
  - **click-to-advance builds**, **progress bar**, **autoplay toggle** (A key / button),
  - **keyboard** (←/→/Space), **scroll**, and **touch-swipe** navigation, **slide counter**,
  - per-slide entrance from the animation plan (fade/zoom/up/right/scroll), **reduced-motion safe**.
- Offline (relative PNGs, no CDN).

## One plan, three targets
The animation-engine plan still maps to RevealJS / Frontend / PPTX via `mapper.py` (5/5 plans clean);
the two upgrades make the PPTX and HTML targets render the plan for real instead of degrading.
