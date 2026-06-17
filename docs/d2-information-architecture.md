# Wave D2 — Information Architecture

Reorganizes the Knowledge Center from a **flat 38-center grid** into **task-based journeys**
with a **search-first** entry. No center removed, no href changed, no SAP logic touched.

## Problem (before)
- 38 centers, one flat grid, zero grouping → user scans all 38 to decide what's relevant.
- Ordered by technical type / build history, not by what a consultant is trying to *do*.
- Search was not the primary entry; it was one card among 38.

## Solution (after)
**Search-first** band leads the page (two existing surfaces: Solution Finder = business-need
search, Copilot = free-text Q&A) + fast journey jumps. Centers then grouped into **7 task
journeys + 1 governance tier** (~5 cards each → lower scan cost).

| # | Journey (he / en) | Intent | Centers |
|---|---|---|---|
| 1 | שאל ומצא · Ask & Find | start: ask or search | Copilot, Solution Finder, Object Intelligence |
| 2 | הבן תהליך · Understand the Process | learn E2E flow | Process Explorer, Guides, Blueprints, Concepts, MRP/MPS |
| 3 | בנה והגדר · Build & Configure | implement | Playbooks, Config, ABAP, Enhancements, Exits/BAdIs, Integration |
| 4 | פתור תקלה · Troubleshoot & Resolve | symptom→fix | Resolution, Troubleshooting, SAP Notes, Notes Graph, Debugging, QA |
| 5 | נדוד ל-S/4HANA · Migrate | ECC↔S/4 change | Migration, ECC vs S/4, Transaction Evolution, Fiori, Impact |
| 6 | נתונים והפניות · Reference & Data | quick lookup | Transactions, Tables, Security, Authorizations, Workbenches |
| 7 | הקשר CBC · CBC Context | plant domain | CBC Domain Model, CBC Manufacturing |
| 8 | ממשל ומערכת · Governance & System | admin/meta (secondary) | Architect, Verification, Quality Audit, Connector, Import, Toolkit |

Totals: 3+5+6+6+5+5+2+6 = **38** (every center placed once).

## Cognitive-load wins (ui-ux-pro-max: visual-hierarchy, content-priority, search-accessible)
- Scan unit: 38 → ~5 per journey.
- One clear primary action per band (search) before browsing — `primary-action`.
- Color-coded journey accents reinforce grouping without relying on color alone (dot + he + en label) — `color-not-only`.
- Journey anchors (`#j-*`) = deep-linkable, keyboard-reachable jumps.

## Files
- `app/knowledge/page.tsx` — centers gain a `group` key; rendered as grouped sections.
- `components/knowledge-finder.tsx` — search-first hero (server component, offline, RTL).
- `docs/d2-ia-diagram.html` — standalone before/after IA diagram (offline).

## Verification
Build clean · 0 console errors · internal routes 200 · 0 external requests (offline) · RTL intact · responsive (single column < 768px) · CBC brand + all functionality unchanged.

Out of scope (later): global Cmd+K command palette + live filtering = **D6**.
