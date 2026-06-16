# HTML Interaction Plan

The interactive web/RevealJS-style layer (`build_html_v2.py`).

## Interaction model
- **Build / advance:** click, → / Space — one step at a time (fragment-style).
- **Back:** ← .
- **Autoplay:** `A` key or the ▶/⏸ button (2.5s cadence; stops at the end).
- **Scroll:** wheel advances/reverses (threshold debounced).
- **Touch:** horizontal swipe (mobile).
- **Progress:** top progress bar + `n / N` counter.

## Animation per slide
Each slide gets an entrance class from its `animation_plan.json` category:
`fade · zoom (scale .94) · kpi_build_up (translateY) · timeline (translateX) · scroll (translateY)`.
Active slide animates to rest; transitions are GPU-friendly (opacity/transform only).

## Accessibility
- `prefers-reduced-motion` → transitions disabled, content shown instantly.
- Keyboard-navigable; large hit targets; high-contrast HUD.

## Offline & portability
Self-contained: relative PNG refs, inline CSS/JS, **no CDN** — matches the project's offline constraint.
Open `index.html` directly in any browser.

## RevealJS parity
This image-backed layer mirrors RevealJS semantics (fragments, transitions, autoslide, progress). A
future native-RevealJS export (live text + inline charts) reuses the same `animation_plan.json` →
`mapper.py` RevealJS config (fragments + data-transition + scroll view).
