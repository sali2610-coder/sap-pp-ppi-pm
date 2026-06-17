# Magic MCP (21st.dev) — Presentation Design Layer

Permanent design assistant for presentation + UI work. Installed user-scope (all projects).

```
server: magic   cmd: npx -y @21st-dev/magic@latest   scope: user   status: ✓ Connected
```
Tools: `21st_magic_component_builder`, `21st_magic_component_inspiration`, `logo_search`, `21st_magic_component_refiner`.

> ⚠ The install API key was pasted in chat — **rotate it at 21st.dev**, then re-run `claude mcp add` with the new key.

## What Magic is — and isn't (for our decks)
- Magic emits **React + Tailwind + shadcn/ui** components.
- The CBC deck (`presentations/cbc-crm/out/cbc_crm.html`) is **vanilla HTML/CSS, RTL, single-file, 100% offline**.
- → Magic is an **inspiration / pattern layer**, NOT a drop-in. Use it to see premium layout/hierarchy/spacing, then **hand-translate the structure into the deck's vanilla RTL CSS** (`.kpi`, `.gc`, `.sf`, `.wallband`, etc.).
- `logo_search` only has tech/SaaS logos — **no beverage brands** (Coca-Cola/Sprite/Fuze/Monster returned notFound). Keep the hand-built SVG brand marks + the real 68-product wall.

## Hard rules (every presentation)
1. **Do not redesign content.** Text/numbers/sources come from approved academic materials. Magic touches visuals only.
2. **Keep the narrative** (5-act story, 4 chapter dividers). Visual upgrade only.
3. **Keep Hebrew RTL** — apply `docs/design-system/rtl-presentation-patterns.md`: every Latin/number run LTR-isolated, no text-arrow glyphs, no tracking on Hebrew, dates DD/MM/YYYY.
4. **Keep CBC branding** — red `#E1121D`, white, system font, CBC heart signature, product wall.
5. **Additional layer, not replacement** — current native deck engine (`show()`, `.slide.on`, `.b` builds, count-up) stays.

## When to call Magic (and which tool)
| Need | Tool | Then |
|---|---|---|
| Layout inspiration | `component_inspiration` | translate grid/hierarchy → vanilla RTL |
| Premium card design | `component_inspiration` | map to `.gc`/`.kpi` card spec |
| KPI / stat block | `component_inspiration` | big LTR-isolated number + Hebrew label |
| Timeline | `component_inspiration` | build as RTL flow (SVG arrows) |
| Infographic section | `component_inspiration` | reproduce as CSS/SVG, no React |
| Section divider concept | `component_inspiration` | apply to `.divider` heroes |
| Executive dashboard | `component_inspiration` | map to `.sf` Salesforce chrome / KPI grid |
| CRM / Salesforce viz | `component_inspiration` | strengthen `.sf*` Lightning mockups |
| Tech/SaaS logo | `logo_search` (SVG) | NOT for beverages |

## Translation checklist (Magic React → CBC deck)
For each borrowed pattern:
1. Extract **structure + hierarchy + spacing**, drop the React/Tailwind/shadcn code.
2. Rebuild with deck primitives: `.kpi .n/.t`, `.gc`, `.sf/.sftop/.sftabs`, `.wallband`, `.chip`, `.anc`.
3. Convert physical → logical: right-align, `dir="rtl"`, isolate `.num`/`.tech`.
4. Recolor to CBC tokens (`--red #E1121D`, `--ink`, `--soft`). Drop indigo/violet shadcn defaults.
5. Keep one motion language (`.b` staggered builds); no new JS libs.
6. Verify headless (Playwright 1920×1080): 0 console errors, 0 overflow, RTL correct, CBC DNA present.

## Per-deck flow
1. Lock content from approved source (no edits).
2. Per slide type, query Magic for inspiration (table above).
3. Translate → vanilla RTL CSS per checklist.
4. Re-inject deck-edit-mode (`inject_editor.py`) — global rule.
5. Rebuild PDF + editable, verify, report.
