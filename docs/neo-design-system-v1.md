# NEO Design System v1

Codifies the visual language for the NEO SAP consultant platform. Benchmarks: Linear, Stripe,
Vercel, Raycast, Apple. Source of truth = `app/globals.css` (tokens) + `components/*`.
Constraints: **RTL-first (Hebrew)**, **100% offline** (no remote fonts/assets), **CBC brand red `#d62027`**.

## 1. Color
| Role | Token | Value |
|---|---|---|
| Brand (accent only) | `--brand` | `#d62027` (CBC) · dark `--brand-dark #a3171c` · soft `--brand-soft #fef2f2` |
| Ground | `--background` / `--background-2` | `#f8fafc` → `#eef1f6` (aurora gradient) |
| Surface | `--card` | `#ffffff` |
| Text | `--foreground` / `--muted-foreground` | slate-900 / slate-500 |
| Border | `--border` | slate-200 `#e2e8f0` |
| Status (migration) | `--status-*` | not-started/in-analysis/in-conversion/tested/done |
| Trust | green `#16a34a` · amber `#b45309` · red `#dc2626` |
**Rule:** brand red = accent/CTA/active only — never large fills (keeps it premium, not loud).

## 2. Elevation (D1)
`--elev-1..4` — soft, layered, low-contrast. Cards rest at `elev-2`, hover `elev-3`, modals/palette `elev-4`. Focus = `--ring-soft` (4px brand 14%).

## 3. Typography
System stack (`Segoe UI`) — offline. Scale (1.20): `--text-2xs .69 · xs .75 · sm .875 · base 1 · lg 1.125 · xl 1.375 · 2xl 1.75 · 3xl 2.25 · display 3rem`. Tracking: tight `-.02em`, display `-.03em`. Mono: Cascadia/JetBrains for tech (`.tech` isolates LTR inside RTL).

## 4. Motion (D1)
`--ease-out-expo (0.16,1,0.3,1)` default · `--ease-spring` for playful · durations `fast 120 / base 220 / slow 360`. All transitions transform+shadow+opacity only (GPU). `prefers-reduced-motion` disables transforms.

## 5. Radius & spacing
`--radius .75rem` → sm/md/lg/xl/2xl. Container `container-app` (max 1800, adaptive padding). Density via `--font-scale` (rem-based global scale).

## 6. Components (specs)
- **surface / card-premium** — bg card, border, `elev-2`→`elev-3` hover, `translateY(-2px)`, expo ease. Accent top-bar 4px for category.
- **Chip** — rounded-lg, `tech` LTR for codes; linked = border+hover-brand; non-linked = dashed (info, never a broken link).
- **TrustBadge** — GREEN/YELLOW/RED + source tag.
- **CenterHeader** — eyebrow (brand, uppercase, tracked) + title (2xl-3xl, tight) + sub (sm, muted) + accent edge.
- **Command palette / search** — elevation-4, fuzzy, scoped groups, keyboard-first (Raycast model). *(D6 target.)*
- **Nav** — sticky, brand gradient header, RTL; primary nav = task groups *(D2 target)*.

## 7. RTL
`dir="rtl"` app-wide; logical props (`start`/`end`, `ms-/me-`); `.tech`/code isolate LTR; icons mirror via flex order, arrows use `rotate-180` where directional.

## 8. Accessibility
Focus-ring on all interactive; AA contrast (brand on white passes for text-on-light only as accent); reduced-motion safe; keyboard nav for palette/nav; semantic headings.

## 9. Offline
No CDN/remote fonts/images. Any `magic`-generated component is vendored into `components/` and stripped of remote deps before commit.

## Roadmap (waves)
D1 Foundation ✅ · D2 Information Architecture · D3 UX Flows · D4 UI Redesign · D5 Motion/Micro · D6 Search Experience · D7 Executive Wow.
