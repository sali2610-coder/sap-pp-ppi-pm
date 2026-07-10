# Project NEO — Permanent AI Review Layer

Eleven reusable Claude Code skills that act as permanent specialists/reviewers for
Project NEO (offline SAP PM · PP · PP-PI knowledge platform). Each lives in its own
`<name>/SKILL.md`, is auto-discoverable by Claude Code, and is **review-only** — it
inspects, scores, and blocks; it never redesigns, adds features, or invents SAP data.

Tiers:
- **Enterprise reviewers** (rich, canonical) — the primary quality reviewers.
- **NEO specialists** — focused domain reviewers.
- **Final gate** — one skill that consolidates the rest into a go/no-go.

## Roster & routing — when each activates

| Skill | Activates on | Reviews | Owns / defers |
|---|---|---|---|
| **enterprise-adaptive-ui-reviewer** | any UI/layout change; "responsive?", "presentation mode?", "wasted whitespace?", "does it scale on a projector?" | **Flagship design authority** (no visual change merges without its PASS): Adaptive Layout Engine, breakpoints, `.grid-adaptive`, whitespace, cards/tables/dashboards/diagrams layout, 16-device sim, type scaling, presentation readability, header/sidebar/search/nav/breadcrumbs, icons/colors, layout a11y & hierarchy, premium benchmark (Apple/Stripe/Linear/Vercel/Fiori/MS/ServiceNow) | Owns the visual gate + Visual Consistency & Accessibility scores; delegates deep WCAG → accessibility, icon/color micro → visual-designer. **Supersedes** old `neo-adaptive-ui-reviewer`. Feeds its 6 scores to the final gate. |
| **enterprise-ux-reviewer** | flow/IA/navigation change; "review UX", "too many clicks", "is this discoverable", "onboarding" | UX through 6 personas (SAP Consultant, Implementer, QA Tester, Factory Manager, New Employee, Executive): navigation, search, workflow, discoverability, info overload, click-count, consistency, labels, hierarchy, error/empty states | Owns persona UX critique. Defers final merge verdict → enterprise-ux-auditor. |
| **sap-knowledge-architect** | content structure / graph change; "duplicate concept?", "missing cross-link", "is the ER consistent" | duplicate content, missing links, ECC-vs-S/4 structure, cross-references, business-flow & module-hierarchy consistency across Tables/Transactions/Objects/CDS/Fiori/IDocs/BAPIs/blueprints | Owns structure/graph. Defers prose accuracy → content-quality; diagram rendering → architecture-studio. **Supersedes** old `neo-sap-knowledge-architect`. |
| **enterprise-performance-reviewer** | perf-sensitive change; "bundle too heavy?", "slow page", "will it scale to 4373 pages", "next/dynamic?" | performance, bundle/dataset weight, SmartLink lightweight-guard, lazy loading, search speed, rendering/memoization, memory, Core Web Vitals, scalability | Owns technical perf. **Supersedes** old `neo-performance-scalability-reviewer`. |
| neo-sap-content-quality-reviewer | article/section proofing | no invented info, ECC vs S/4 wording, terminology, Hebrew style | Owns prose accuracy/style. |
| neo-sap-visual-designer | visual/component change | icons, colors, spacing, cards, tables, diagrams, animations, branding aesthetics | Owns DSv2 aesthetics. |
| neo-architecture-studio-reviewer | diagram/graph change | Architecture Studio graph, ERDs, flows, object graphs, blueprints; large-display legibility | Owns diagram rendering. |
| neo-search-experience-reviewer | search change | palette/omni/hero search, ranking, suggestions, shortcuts, empty/no-result | Owns search UX. |
| neo-documentation-guardian | any change touching documented behavior | README / AGENTS / CLAUDE.md / docs / plans / changelogs / skills sync | Owns doc/impl drift. |
| neo-accessibility-reviewer | interactive UI change | WCAG AA, keyboard, contrast, screen readers, focus, RTL, presentation readability | Owns a11y. |
| **neo-enterprise-ux-auditor** | before merging any UI PR; "ready to merge?", "final review" | runs all gates + SAP/Microsoft/Apple/enterprise ship-tests | **Final gate** — synthesizes all above into APPROVE / BLOCK. |

## How the skills collaborate

```
                 ┌── enterprise-adaptive-ui-reviewer ──┐
UI / layout ─────┤   neo-sap-visual-designer            │
                 │   neo-accessibility-reviewer         │
                 │   neo-architecture-studio-reviewer   │
Flow / IA ───────┤   enterprise-ux-reviewer             ├──► neo-enterprise-ux-auditor ──► APPROVE / BLOCK
Content ─────────┤   sap-knowledge-architect            │        (final gate, one verdict + fix list)
                 │   neo-sap-content-quality-reviewer   │
Search ──────────┤   neo-search-experience-reviewer     │
Perf-sensitive ──┤   enterprise-performance-reviewer    │
Any change ──────┴── neo-documentation-guardian ────────┘
```

- Run the relevant specialists first; **enterprise-ux-auditor is always the last gate** for a UI PR and consolidates the specialists' findings into a single go/no-go with a prioritized fix list.
- Triggers are written to be **disjoint** — each skill's `description` states what it owns and what it defers, so Claude Code auto-invokes the correct one. Overlap with the earlier set was removed: the three `enterprise-*` reviewers **supersede** and replace `neo-adaptive-ui-reviewer`, `neo-sap-knowledge-architect`, and `neo-performance-scalability-reviewer` (deleted).

## Standing guardrails (every skill enforces)
Never invent SAP data · 100% offline · PM/PP/PP-PI only · Design System v2 (neutral-first, red as accent) · review-only (no redesign / scope creep).

## Shared quality gates every reviewer relies on
- `npx tsc --noEmit` → 0 errors · `npx eslint . --ext .ts,.tsx` → 0 errors
- `npm run build` (static export, ~4373 pages) · `npm run gen:routes` + `scripts/check-route-manifest.mjs` (M1) · `scripts/crawl-dead-links.mjs` (M2)
- Headless multi-viewport screenshots (`localStorage['neo:onboarded']='1'`): Compact · Medium · Large · XL · XXL · Presentation → 0 console errors, 0 horizontal overflow.

## Future expansion (recommended next reviewers)
- **neo-i18n-rtl-reviewer** — deep RTL/bidi + Hebrew/English parity (currently folded into adaptive-ui + content-quality).
- **neo-security-reviewer** — CSP, dependency/supply-chain, no secret leakage in the static bundle.
- **neo-data-integrity-reviewer** — dataset-level checks (dup objects, dangling relations, PM↔PP-PI parity) as a standalone gate.
- **neo-offline-compliance-reviewer** — dedicated 100%-offline auditor (external-load scanner over `out/`).
- **neo-motion-reviewer** — framer-motion performance + reduced-motion compliance.
- Consider promoting the auditor's four ship-tests into a scored rubric persisted per PR for trend tracking.

## How to invoke
Reference a skill by name ("run the enterprise-adaptive-ui-reviewer on this diff") or let Claude Code auto-activate it from the trigger phrases in each skill's `description`.
