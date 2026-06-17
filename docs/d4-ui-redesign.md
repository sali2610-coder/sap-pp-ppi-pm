# Wave D4 — UI Redesign (executive-grade)

Premium SaaS pass (Linear / Stripe / Datadog quality) over hero, navigation, and
homepage/knowledge cards. Visual only — no href, no SAP logic, no data touched.
RTL, offline, CBC brand red preserved.

## Changes
### Premium navigation (`components/app-shell.tsx`)
- Active tab → **shared-element pill** (`layoutId="nav-active-{group}"`, spring) that
  *slides* between tabs on client navigation (Linear-style) instead of a hard bg jump.
- Top **hairline highlight** (`before` white/25) + tinted brand shadow for depth.
- `aria-current="page"` on the active link. Namespaced per nav group (desktop/mobile) so pills don't fight.

### Executive hero (`components/home-hero.tsx`)
- Stat tiles → **double-bezel**: inner top highlight, hover lift (`y:-3, scale:1.025`, spring), sweep hairline on hover.
- Eyebrow gets a **live status dot** (emerald ping, reduced-motion safe).
- Deeper **tinted elevation** (`0 34px 70px -24px brand`) + `ring-white/10`.

### Homepage cards (`components/command-center.tsx`)
- Search affordance → icon in brand chip, hover border, ⌘K kbd.
- Quick-access tiles → growing **accent edge** + hover **arrow** translate, better hierarchy.

### Knowledge cards
- Already premium from D3 (lift, accent edge, progressive disclosure) — carried unchanged; sit on D1 elevation tokens.

## Tool usage (honest)
- **ui-ux-pro-max** — elevation-consistent, primary-action, visual-hierarchy, state-clarity, number-tabular.
- **high-end-visual-design** — double-bezel/nested architecture, eyebrow tags, tinted depth, button-in-button (existing CTA). Adapted to light CBC brand (not dark archetype).
- **design-taste-frontend** — spring physics, shared-element `layoutId`, tinted shadows over neon glows, transform/opacity only. *Deviation:* Segoe UI + lucide kept (CLAUDE.md offline mandate overrides skill's Geist/Phosphor).
- **magic MCP** — pulled dashboard-stats + nav patterns; confirmed our stack already matches (staggered motion, `whileHover` lift, animated counts, ⌘K). External deps (recharts/react-countup/radix) **not** added — principles applied, offline kept.
- **Figma MCP** — connected (`sali2610@gmail.com`); design-intelligence reference only, no file → no asset extraction fabricated.

## Verification
Build clean · **0 console errors · 0 page errors · 0 external requests (offline intact)** · responsive 1440/390 ✓ · reduced-motion safe ✓ · CBC brand + footer + functionality unchanged.

Next: **D5 Motion & Micro-interactions** (pending approval).
