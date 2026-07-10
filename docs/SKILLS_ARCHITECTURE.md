# Project NEO — Skills Architecture

The permanent AI review layer for Project NEO. **11 modular, single-purpose,
review-only Claude Code skills** under `.claude/skills/`. They inspect, score, and
block — they never write application code, redesign the UI, add pages, or invent
SAP data. Every skill enforces the standing guardrails (offline · PM/PP/PP-PI only ·
Design System v2 · never-invent-data · review-only).

This document is the canonical architecture reference. A quick in-place roster also
lives at `.claude/skills/NEO-REVIEWERS.md`.

---

## 1. What each skill does + when it activates

| # | Skill | What it does | Activates when | Output |
|---|-------|--------------|----------------|--------|
| 1 | **enterprise-adaptive-ui-reviewer** | **Flagship design authority** — no visual change merges without its PASS. Owns the Adaptive Layout Engine review — responsive geometry, breakpoints, `.container-app`/`.grid-adaptive`, cards, hero, tables, dashboards, Architecture Studio fit, sidebar/header/search, typography ramp, spacing, white space, alignment, hierarchy, RTL, Presentation Mode. Simulates 16 devices (iPhone → 86"/projector) + benchmarks vs Apple/Stripe/Linear/Vercel/Fiori/Microsoft/ServiceNow. | A diff touches `app/globals.css` engine tokens or any responsive shell (`module-section`, `object-workspace`, dashboards); "does this adapt?", "presentation mode", "wasted whitespace", "horizontal overflow", "adaptive score". | **6 scores** (Adaptive Layout · Enterprise UI · Responsive · Presentation · Accessibility · Visual Consistency) + Critical/High/Medium/Low + Pass/Fail |
| 2 | **enterprise-ux-reviewer** | Reviews UX through **10 personas** (SAP Consultant, Implementer, Functional Analyst, QA Tester, Factory Manager, Production Planner, Maintenance Engineer, Executive, New Employee, First-time Visitor): navigation, search, workflow, click-count, page hierarchy, labels, discoverability, consistency, info overload, error/empty states. | Flow/IA/navigation change; "review UX", "too many clicks", "is this discoverable", "onboarding path". | **UX Score** (+ per-persona ×10) + click-counts + Critical/High/Medium/Low + Recommendations + PASS/FAIL |
| 3 | **sap-knowledge-architect** | Protects knowledge-graph integrity: duplicate content, cross-links, ECC-vs-S/4 structure, business-flow & module-hierarchy consistency across Tables/Transactions/Objects/CDS/BAPIs/IDocs/Fiori/blueprints. | Content-structure/graph change; "duplicate concept?", "missing cross-link", "is the ER consistent". | **Knowledge Report** + Missing Relationships + Cross-link Suggestions |
| 4 | **enterprise-performance-reviewer** | Reviews technical quality: performance, bundle size, rendering, lazy loading, search speed, memory, caching, Core Web Vitals, scalability, SmartLink lightweight-guard. | Perf-sensitive change; "bundle too heavy?", "slow page", "will it scale to 4373 pages", "next/dynamic?". | **Performance Report** + Warnings + Optimization Suggestions |
| 5 | neo-sap-content-quality-reviewer | Prose accuracy: no invented info, ECC vs S/4 wording, terminology, Hebrew style. | Article/section proofing. | Severity-ranked content report |
| 6 | neo-sap-visual-designer | Aesthetics: icons, colors, spacing, cards, tables, diagrams, animations, branding. | Visual/component change. | DSv2 findings + fixes |
| 7 | neo-architecture-studio-reviewer | Diagram/graph structure + large-display legibility (ERDs, flows, object graphs, blueprints). | Diagram/graph change. | Diagram review + fixes |
| 8 | neo-search-experience-reviewer | Search UX: palette/omni/hero, ranking, suggestions, shortcuts, empty/no-result, coverage. | Search change. | Search-UX findings |
| 9 | neo-documentation-guardian | Keeps README/AGENTS/CLAUDE.md/docs/plans/changelogs/skills in sync with code. | Any change touching documented behavior. | Doc-drift report |
| 10 | neo-accessibility-reviewer | WCAG AA: keyboard, contrast, screen readers, focus, semantic headings, RTL, presentation readability. | Interactive UI change. | A11y report (BLOCKER/MAJOR/MINOR) |
| 11 | **neo-enterprise-ux-auditor** | **Final merge gate.** Runs all automated gates + the four ship-tests (SAP / Microsoft / Apple / enterprise customer); synthesizes 1–10. | Before merging any UI PR; "ready to merge?", "final review". | APPROVE / BLOCK + prioritized fix list |

---

## 2. How they work together

```
                 ┌── enterprise-adaptive-ui-reviewer ──┐
UI / layout ─────┤   neo-sap-visual-designer            │
                 │   neo-accessibility-reviewer         │
                 │   neo-architecture-studio-reviewer   │
Flow / IA ───────┤   enterprise-ux-reviewer             ├──► neo-enterprise-ux-auditor ──► APPROVE / BLOCK
Content ─────────┤   sap-knowledge-architect            │        (one verdict + fix list)
                 │   neo-sap-content-quality-reviewer   │
Search ──────────┤   neo-search-experience-reviewer     │
Perf-sensitive ──┤   enterprise-performance-reviewer    │
Any change ──────┴── neo-documentation-guardian ────────┘
```

- **Specialists run first, the gate runs last.** Route a change to the relevant specialists (by file/topic), collect their scores/findings, then run `neo-enterprise-ux-auditor` as the single go/no-go before `main`.
- **Triggers are disjoint.** Each skill's `description` states what it *owns* vs what it *defers* (e.g. adaptive-ui owns geometry but defers WCAG contrast to accessibility and aesthetics to visual-designer), so Claude Code auto-invokes exactly one.
- **Scores feed the gate.** enterprise-adaptive-ui-reviewer supplies an Adaptive + Viewport score; enterprise-ux-reviewer a UX score; enterprise-performance-reviewer a perf report — the auditor consolidates them.

### Deduplication
The three `enterprise-*` reviewers **superseded and replaced** earlier duplicates (`neo-adaptive-ui-reviewer`, `neo-sap-knowledge-architect`, `neo-performance-scalability-reviewer`), which were deleted. No two skills own the same responsibility.

---

## 3. Shared quality gates every reviewer relies on
- `npx tsc --noEmit` → 0 errors · `npx eslint . --ext .ts,.tsx` → 0 errors
- `npm run build` (static export, ~4373 pages) · `npm run gen:routes` + `scripts/check-route-manifest.mjs` (M1) · `scripts/crawl-dead-links.mjs` (M2)
- Headless multi-viewport screenshots (`localStorage['neo:onboarded']='1'`): iPhone/Android → Presentation → 0 console errors, 0 horizontal overflow.
- CI (`.github/workflows/ci.yml`) enforces tsc → eslint → build → M1 → M2 on every push/PR.

## 4. Standing guardrails (enforced by every skill)
Never invent SAP data (verified datasets or honest "בקרוב / Coming Soon") · 100% offline (no CDN / `next/font/google` / remote assets) · flagship modules PM · PP · PP-PI only · Design System v2 (neutral-first, brand red as accent) · review-only (no redesign, no scope creep) · keep footer credit "Built by Sali Halif" and brand lockup ("SAP by Sali" primary / "PROJECT NEO" secondary).

## 5. Future recommended skills
- **neo-i18n-rtl-reviewer** — deep RTL/bidi + Hebrew/English parity (today split across adaptive-ui + content-quality).
- **neo-security-reviewer** — CSP, dependency/supply-chain, no secrets in the static bundle.
- **neo-data-integrity-reviewer** — dataset-level checks (dup objects, dangling relations, PM↔PP-PI parity) as a standalone gate.
- **neo-offline-compliance-reviewer** — dedicated external-load scanner over `out/`.
- **neo-motion-reviewer** — framer-motion performance + `prefers-reduced-motion` compliance.
- **Scored-rubric persistence** — promote the auditor's four ship-tests into a per-PR scored rubric for trend tracking.

## How to invoke
Reference a skill by name ("run the enterprise-adaptive-ui-reviewer on this diff") or let Claude Code auto-activate it from the trigger phrases in each skill's `description`.
