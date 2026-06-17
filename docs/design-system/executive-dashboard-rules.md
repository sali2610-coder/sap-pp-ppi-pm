# NEO Cockpit — Executive Dashboard & Data-Page Rules

How to lay out NEO's high-density, decision-grade screens: PM, PP-PI, Architecture Explorer, Knowledge Centers, Blueprint pages, Data Model pages. Applies the RTL patterns + visual language to dense SAP data.

---

## 1. KPI / stat blocks
- Value = **large `font-black`, LTR-isolated** (`.num`), label muted Hebrew below.
- Emphasis by size, not color. Brand red only for the single hero metric, if any.
- Group KPIs in equal cards, one accent per module. Counts/percent isolated (`90%`, `~4,350`, `6`).
- 3–5 KPIs per row max; more → second row, never shrink below readable.

## 2. Data tables (fields, structures)
- **Header row:** light fill (`--muted`/`#f3f3f8`), `font-semibold`, sticky on scroll.
- **Tech columns LTR-isolated** (`.tech dir="ltr"`): field name, type, length, PK/FK.
- Zebra or hairline rows for scan-ability; align numeric columns end, keep content LTR.
- Total/summary row: 2px top border + bold — weight, not color.
- Key flags as small pills: `PK` amber, `FK` blue (status-distinct, consistent everywhere).
- Long tables: virtualize or expand-on-demand (blueprint's expand-to-fields pattern), don't dump 300 rows.

## 3. Blueprint pages (`technical-blueprint.tsx`)
Reference implementation — keep and propagate its grammar:
- Sticky knowledge-center nav (topic pills) + expand/collapse all.
- Section shell `rounded-3xl`, icon chip in module accent, title + meta pills (`N טבלאות`, `N שינויי S/4`).
- On expand: **executive summary** (תקציר מנהלים) → business flow → core tables (cards) → linked objects (chips) → ECC→S/4 → consultant notes → troubleshooting.
- **Orchestrated stagger** on the table-card grid (applied). One easing.
- Flow steps: oversized faint accent index number + Hebrew step + LTR `dir="ltr"` step code.
Improvements to roll out: unify the ECC→S/4 mini-panels under one `.panel` spec (same radius/padding/ring) so the multi-color legend reads as one system; keep colors as semantic legend only.

## 4. Data Model pages (object / domain / cds)
- Lead with identity: object name (large, LTR `.tech`), Hebrew description, type badge.
- Relationships as a small graph/breadcrumb (parent→child), arrows = SVG icons.
- Fields table per §2. PK/FK pills consistent.
- ECC→S/4 delta panel: "נשאר ללא שינוי N" vs "השתנה/הוחלף N" — two-card, weight-based emphasis, alt-table shown LTR.

## 5. Knowledge Centers / Architecture Explorer
- Treat as **executive overview**: dominant calm ground, one module accent, big section titles, generous space.
- Entry cards = unified card spec (§4 visual-language), icon chip + title + one-line Hebrew + meta pills.
- Single orchestrated load-stagger on the card grid.
- Section dividers between zones (thin rule + eyebrow) for scan-ability.
- Search/filter sticky; results animate in with the same stagger, not per-item fl: keep one motion language.

## 6. Module hubs (PM / PP-PI)
- Hero: module name, Hebrew tagline, 3–4 KPIs (tables/fields/changes), module accent owns the page.
- Below: zone cards → blueprint, data model, processes, academy. One card spec.
- PM = orange `#f97316`, PP-PI = violet `#6d28d9`. Never cross accents.

## 7. Density modes (pick per screen)
| Mode | Screens | Behavior |
|---|---|---|
| **Overview / low-density** | hubs, architecture explorer, knowledge-center landing | big type, few ideas, whitespace, KPIs, stagger |
| **Reference / high-density** | blueprint, data model, field tables | structured grids/tables, expand-on-demand, tight-but-readable, still hierarchical |

Never let high-density become clutter: overflow → split into sections/tabs, don't shrink.

## 8. RTL + numbers (carry from rtl-presentation-patterns.md)
Every dashboard number, code, date isolated LTR. No text-arrow glyphs (SVG only). No tracking on Hebrew. Dates DD/MM/YYYY. Currency after isolated number.

## 9. Verify-before-ship (dashboards)
1. Hebrew RTL correct; all SAP codes/numbers LTR-isolated, no reordering.
2. One accent per module; status colors only semantic.
3. Tables: sticky header, aligned numerics, consistent PK/FK pills.
4. One orchestrated motion language; reduced-motion respected.
5. No overflow at 1280-wide and one narrow viewport; dense screens split, not shrunk.
