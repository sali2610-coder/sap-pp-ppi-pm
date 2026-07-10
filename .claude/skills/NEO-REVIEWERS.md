# Project NEO — Permanent AI Reviewer Skills

Ten reusable Claude Code skills that act as permanent specialists / reviewers for
Project NEO (offline SAP PM · PP · PP-PI knowledge platform). Each lives in its
own `neo-*/SKILL.md` and is auto-discoverable by Claude Code. They are
**review-only** — they inspect, score, and block; they do not redesign or invent.

## Roster

| # | Skill | Reviews |
|---|-------|---------|
| 1 | `neo-adaptive-ui-reviewer` | Responsive + adaptive layout across all 6 viewport classes, spacing, typography scaling, screen utilization, presentation mode, hierarchy. |
| 2 | `neo-sap-knowledge-architect` | Content structure, navigation, duplicate concepts, cross-module links, knowledge-graph/ER consistency. |
| 3 | `neo-sap-content-quality-reviewer` | No invented info, ECC vs S/4 separation, terminology, Project NEO writing style. |
| 4 | `neo-sap-visual-designer` | Icons, colors, spacing, cards, tables, diagrams, animations, branding — premium enterprise look. |
| 5 | `neo-architecture-studio-reviewer` | Diagrams, relationships, ERDs, business flows, object graphs, blueprints; large-display readability. |
| 6 | `neo-performance-scalability-reviewer` | Bundle size, render perf, lazy loading, search speed, large datasets, scalability. |
| 7 | `neo-search-experience-reviewer` | Search UX, ranking, suggestions, shortcuts, empty & no-result states, discoverability. |
| 8 | `neo-documentation-guardian` | Keeps README / architecture docs / plans / playbooks / changelogs / skills in sync with code. |
| 9 | `neo-accessibility-reviewer` | WCAG AA, keyboard nav, contrast, screen readers, focus, RTL, presentation readability. |
| 10 | `neo-enterprise-ux-auditor` | **Final merge gate.** Runs all gates + the four ship-tests (SAP / Microsoft / Apple / enterprise). Synthesizes 1–9. |

## Review pipeline (suggested)

```
Content change ──► #2 Knowledge Architect ─┐
                   #3 Content Quality ──────┤
UI / layout change ► #1 Adaptive UI ────────┤
                     #4 Visual Designer ─────┤
                     #9 Accessibility ───────┼──► #10 Enterprise UX Auditor ──► APPROVE / BLOCK
Diagrams ──────────► #5 Architecture Studio ─┤        (final gate before main)
Perf-sensitive ────► #6 Performance ─────────┤
Search change ─────► #7 Search Experience ───┤
Any change ────────► #8 Documentation Guardian┘
```

- Run the relevant specialists first; **#10 is always the last gate** for any UI PR and consolidates their verdicts into one go/no-go with a prioritized fix list.
- Every skill enforces the standing guardrails: **never invent SAP data**, **100% offline**, **PM/PP/PP-PI only**, **Design System v2** (neutral-first, red as accent), and **no redesign / scope creep**.

## Shared quality gates every reviewer relies on
- `npx tsc --noEmit` → 0 errors · `npx eslint . --ext .ts,.tsx` → 0 errors
- `npm run build` (static export, ~4373 pages) · `npm run gen:routes` + `scripts/check-route-manifest.mjs` (M1) · `scripts/crawl-dead-links.mjs` (M2)
- Headless multi-viewport screenshots (set `localStorage['neo:onboarded']='1'`): Compact · Medium · Large · XL · XXL · Presentation → 0 console errors, 0 horizontal overflow.

## How to invoke
Reference a skill by name (e.g. "run the neo-enterprise-ux-auditor on this PR") or let Claude Code auto-activate it from the trigger phrases in each skill's `description`.
