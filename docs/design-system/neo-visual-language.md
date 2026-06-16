# NEO Cockpit — Visual Language

The shared visual grammar for every NEO surface. Built on the existing `app/globals.css` tokens; codifies the patterns so new pages stay consistent and premium. **Offline-safe, system-font.**

---

## 1. Color discipline — dominant + accent, not rainbow
Committed palette beats timid even spread. NEO's system (keep):
- **Ground (dominant):** `--background #f8fafc` / `--background-2`, cards `--card #fff`. Most pixels are calm.
- **Brand accent (sparing):** `--brand #d62027` — used for emphasis, active state, focus ring. Not for large fills.
- **Per-module accent:** PM `#f97316`, PP-PI `#6d28d9`. One accent owns a module; don't mix.
- **Status palette (semantic only):** not-started `#94a3b8` · in-analysis `#f59e0b` · in-conversion `#3b82f6` · tested `#8b5cf6` · done `#10b981`. These colors mean status — never reuse them decoratively.

Rule: **a color must earn its meaning.** If a hue isn't brand, module-accent, or status, it's neutral gray. Avoid the multi-pastel-panel look (the ECC→S/4 block currently uses emerald/amber/fuchsia/teal at once — acceptable as *semantic* legend, but unify radius/padding/ring so it reads as one system, not confetti).

## 2. Emphasis through weight + space, not color
From restrained doc design: stress important rows/values with **type weight and a heavier rule**, not a new color.
- Table totals / key rows: `font-extrabold` + a 2px top border, not a colored fill.
- KPI value: large + `font-black`, label muted. Size carries the emphasis.
- Reserve colored fills for status and brand moments.

## 3. Typography scale (system stack)
Fewer sizes, bigger jumps. Suggested rhythm (rem):
| Role | Size | Weight | Notes |
|---|---|---|---|
| Page title | 1.75–2.25 | 800 | one per page |
| Section title | 1.25–1.5 | 800 | tracking only if Latin |
| Card title | 1.0–1.125 | 700 | |
| Body | 0.9375–1.0 | 400/500 | leading 1.6–1.8 (Hebrew) |
| Eyebrow (Latin) | 0.6875–0.75 | 700 | uppercase + tracking OK |
| Tech/mono code | 0.75–0.875 | 700 | `.tech`, LTR-isolated |

Rules: Hebrew headings get **no tracking**. Don't use gray text below comfortable size for primary content. Numbers in `.num`/`.tech` mono-ish, LTR-isolated.

## 4. Card system (one spec)
Unify NEO cards under one grammar so pages feel authored:
- Radius: `rounded-2xl` (inner), `rounded-3xl` (section shells). Matches `--radius`.
- Border: `border-slate-200`; hover → brand or accent border.
- Shadow: **purposeful only** — soft lift on interactive cards (`lift`), flat for static. No drop-shadow without depth intent.
- Padding: 1rem (compact card) / 1.25rem (section). Consistent.
- Accent expression: a top or inline-start accent bar (4px) in the owning color, not a full tint.
- Header pattern: icon chip (accent bg, white glyph) + title + small meta pills. (Blueprint already models this — make it the template.)

## 5. Spacing rhythm
- Section vertical gap: `space-y-4`/`space-y-5`.
- Card grid gap: `gap-3` (dense data) / `gap-4` (overview).
- Inside-card stack: `mt-2 / mt-2.5 / mt-3` steps — keep the ladder, don't freestyle pixel values.
- Generous negative space on executive/overview screens; tighter (but never cramped) on data-density screens. If a dense screen overflows, **split it**, don't shrink type.

## 6. Motion — one orchestrated load
- Prefer **one staggered entrance** per view (`delay = i * 0.035s`, capped ~0.4s) over scattered per-element hovers. Already applied to the blueprint table grid.
- Expansion (accordion) uses height+opacity with ease `[0.32,0.72,0,1]`, ~0.3s. Keep this single easing across NEO.
- Respect `prefers-reduced-motion`: gate non-essential motion.
- Hover = subtle lift/border, not bounce. Micro-interactions support, never distract.

## 7. Iconography
- lucide line icons, consistent stroke. Accent-colored inside accent chips.
- Direction/flow arrows = **SVG icons only** (bidi-safe), never text glyphs.

## 8. Anti-slop guardrails (NEO)
Avoid: everything centered, identical card grids with no hierarchy, gratuitous glass, purposeless shadows, multi-color confetti, generic indigo `#6366f1`, purple-on-white. Vary rhythm; let one accent lead; let whitespace breathe.

## 9. Offline / font
System `Segoe UI` Hebrew stack stays (CLAUDE.md hard rule). No Google Fonts/Fontshare/`next/font/google`. All rules here are font-independent. Optional future: one self-hosted OFL display woff2 in `/public` for page titles only.
