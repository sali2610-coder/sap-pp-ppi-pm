# NEO Cockpit — Design Advisory (frontend-slides as advisor)

Source: `zarazhangrui/frontend-slides` (cloned read-only at `.design-ref/`, git-ignored).
Scope: **visual/UX only**. No data logic. No push/merge until reviewed.
Hard constraint kept: **100% offline** — no Google Fonts/Fontshare. System `Segoe UI` stack stays.

## Principles taken from the skill (offline-safe)
1. **One orchestrated load > scattered micro-interactions.** Staggered reveal (`delay = i*step`) on a grid feels designed; per-card hover jitter does not.
2. **Dominant color + sharp accent** beats timid even palettes. NEO already does this (zinc ground + brand red + per-module accent). Keep committed.
3. **Deliberate oversized index numbers** as a layout signature (faint, large, mono).
4. **Purposeful shadow only** — no drop-shadows without depth intent.
5. **Avoid AI-slop**: generic centered hero, identical card grids, gratuitous glass. Vary rhythm and hierarchy instead.
6. **Strong typographic scale** — fewer sizes, bigger jumps between levels.

## Applied now (probe — Blueprint)
`components/technical-blueprint.tsx`, subtle polish:
- Core-objects table grid → **staggered fade-up** entrance (capped 0.4s) on section expand.
- Business-flow step index → **oversized faint accent number** (was ghost slate-200).
- Typecheck clean. No data/logic change.

## Recommended rollout (await pick)
### Blueprint / data-model (highest payoff)
- Stagger applied. Next: tighten `ECC→S/4` panel grid to one consistent 2-col card system; unify the 5 colored mini-panels under one `.panel` spec (same radius/padding/ring).
- Field tables (`fields-table.tsx`): zebra + sticky header + monospace tech column alignment.

### Module hubs (PM / PP-PI)
- `hub-cards` / `home-hero`: bigger KPI numbers (skill "large numbers"), one accent per module, load-stagger on card entrance.
- Section dividers between zones for scan-ability.

### Library / Academy
- Reading measure cap (~70ch), stronger heading scale, pull-quote + drop-cap treatment (Paper&Ink principle, system-font safe).

## Boldness ladder (per your call)
- **Subtle polish** (current probe): hierarchy, spacing, motion, card consistency. Low risk.
- **Noticeable refresh**: new unified card spec + typographic scale + section dividers.
- **Bold redesign**: Swiss-Modern/Bold-Signal layout rethink (visible grid, big numbers). Highest review.

## To register the skill itself (you run — interactive)
```
/plugin marketplace add https://github.com/zarazhangrui/frontend-slides
/plugin install frontend-slides@frontend-slides
```
(I can't type `/plugin` — harness-only. Repo already cloned so I can advise without it.)
