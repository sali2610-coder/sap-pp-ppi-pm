# Animation Catalog — 8 categories × 3 targets

Motion serves the argument: it paces attention and stages information. Each category below has a clear
**when to use**, plus how it maps to **RevealJS · Frontend Slides · PPTX**. `mapper.py` emits the
target-specific config from one plan, so the same intent renders natively everywhere (and degrades
gracefully where a target can't express it). Default durations 0.3–0.6s; never encode information in
motion alone (accessibility).

## Plan shape (input to mapper.py)
```json
{"slide": 4, "category": "kpi_build_up", "elements": ["title","tileA","tileB"],
 "delivery": "live|recorded|web", "duration_s": 0.4}
```
`delivery` sets triggers: **live** → on-click; **recorded/web** → after-previous / timed / in-view.

## Categories

### 1. Fade — *when:* default for almost everything; calm entrance, no spatial meaning.
- RevealJS: `.fragment.fade-in`. Frontend: opacity 0→1. PPTX: fade effect, fade transition.

### 2. Zoom — *when:* one hero element (image/statement) deserves emphasis on entry, or to focus into detail.
- RevealJS: `.fragment.zoom-in` + `data-auto-animate`. Frontend: scale 0.92→1 + fade. PPTX: zoom effect, morph transition.

### 3. Progressive Reveal — *when:* a list/argument should appear one point at a time so the audience reads with the speaker, not ahead.
- RevealJS: sequential `.fragment` with `data-fragment-index`. Frontend: staggered children. PPTX: appear per element, on-click (live).

### 4. Scroll Driven — *when:* web/embedded decks consumed by scrolling (not clicking); elements reveal as they enter the viewport.
- RevealJS: scroll view (Reveal 5) + reveal-on-scroll. Frontend: `whileInView` + `IntersectionObserver(0.3)`.
- PPTX: **no scroll** → degrades to a timed progressive build (auto-advance). Flagged `degraded` in output.

### 5. KPI Build Up — *when:* a metrics slide should land impact: tiles appear in sequence and numbers count up.
- RevealJS: `.fragment.fade-up` per tile (count-up via a small script). Frontend: staggered tiles + animated counter (0→value). PPTX: tiles wipe/appear staggered (no native count-up → value appears).

### 6. Timeline Animation — *when:* a timeline/roadmap should build left→right so the sequence reads as progression.
- RevealJS: fragments `fade-right`, slide transition. Frontend: slide-x (−24→0) in order. PPTX: wipe L→R per node, push transition.

### 7. Process Walkthrough — *when:* a flow/diagram is explained step by step; the current step is highlighted, prior steps dim.
- RevealJS: fragment per step + connector. Frontend: step-glow (dim 0.4 → 1 on active). PPTX: sequential appear per step shape.

### 8. Dashboard Animation — *when:* a multi-panel dashboard should assemble panel-by-panel (or chart series stagger) rather than dumping everything at once.
- RevealJS: fragment per panel. Frontend: grid stagger (y 12→0). PPTX: panels/chart-series fade in staggered.

## Target capability notes
| Capability | RevealJS | Frontend | PPTX |
|------------|----------|----------|------|
| Click-paced build | fragments | mount-sequence | on-click steps |
| Timed/auto build | data-autoslide | sequence timers | auto-advance |
| Scroll reveal | scroll view | IntersectionObserver | ✗ (degrade to timed) |
| Count-up numbers | script | counter | ✗ (value appears) |
| Auto-animate/morph | data-auto-animate | layout animation | morph transition |

## Accessibility
- Keep durations short; honor `prefers-reduced-motion` (Frontend/RevealJS) — fall back to instant show.
- Motion is never the only signal: the content is fully present/readable without it.
- Avoid spinning/bouncing entrances on body text — they slow the talk and distract.
