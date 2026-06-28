# NEO Cockpit — UX Architecture & Premium-Workspace Proposal

Status: **PROPOSAL (design only — no experimental UI implemented yet).**
Goal: evolve NEO from a knowledge base into a **premium SAP consultant workspace**
(Apple / Linear / Notion quality) while keeping the 100% offline, static-export,
RTL, verified-knowledge constraints.

This document is the architecture + design spec the team approves before any of
the experimental UX is built. Each section: what it is, where it lives, the data
it consumes (all already in the repo — no fabrication), and effort.

---

## 0. Design principles (the "feel")
- **One canonical surface per entity.** An object or transaction has exactly one
  workspace; every other surface links into it (no duplicate, divergent pages).
- **Progressive disclosure.** Beginner sees the essentials; Consultant unfolds the
  deep technical layer. Never a wall of data.
- **Context always answerable.** Every screen can answer "what am I looking at?"
  in one tap.
- **Motion communicates, never decorates.** 150–250ms, spring, transform/opacity
  only. Respects `prefers-reduced-motion`.
- **Verified-only, visibly tiered.** Curated vs derived vs breadth always labeled.

---

## 1. Rich Object Workspace (evolve the existing `/object/<name>`)
The Wiki tab already aggregates the facets. The upgrade:
- **Left sticky rail** (desktop) with the section anchors + a live "reading
  position" indicator; collapses to the existing chip-nav on tablet/mobile.
- **Beginner / Consultant toggle** (see §7) that hides/show the technical grid
  (classes/BAdIs/exits/auth) and tightens prose.
- **Hover intelligence** (§6) on every object/tcode/CDS/BAPI chip.
- **"Connected map" mini-graph** inline (reuse `kgraph`) instead of a separate tab.
- Data: `knowledgeFor`, `OBJECT_INTEL`, `CONSULTANT_NOTES`, `INCIDENTS`,
  `interviewFor`, `cdsForTable`, `objectConnections`, `kgraph`. All present.
- Effort: **M** (mostly recomposition + the rail + toggle wiring).

## 2. Rich Transaction Workspace (evolve `/tcode/<code>`)
- Same rail + Beginner/Consultant toggle as the object workspace (shared shell).
- **Inline visual process flow** (§4) replacing the flat relationship rows.
- **Recommendation dock** already shipped — promote it to a sticky side panel on
  desktop ("most consultants continue to…").
- Data: `TX_INTEL`, `txRecommend`, `txLeadingInto`, `tcodeIntel`. Present.
- Effort: **M**.

## 3. Interactive relationship navigation (shared component)
- A reusable `<RelationshipRail>` rendering before → THIS → after as a horizontal
  **rail with directional edges**, plus grouped drawers for similar / alternative
  / obsolete / together. Click = navigate; hover = preview (§6).
- Keyboard: arrow-walk the chain; Enter opens.
- Data: the relationship arrays already in `TX_INTEL` / object relations.
- Effort: **M**.

## 4. Visual process flow between transactions
- A horizontal, scroll-snapping **flow strip**: nodes = transactions in the
  `before→after` chain, colored by module, with the current node elevated.
- Built from the relationship graph by walking `after`/`before` transitively
  (depth-capped, cycle-guarded) — a real derived chain, not authored art.
- Lives at the top of the Transaction Workspace and inside process pages.
- Tech: CSS grid + transform (no canvas) to stay offline/light; optional dagre
  layout reuse for branched flows.
- Effort: **M–L** (transitive walk + layout + snap interactions).

## 5. "What am I looking at?" contextual help (everywhere)
- A global `<WhatIsThis>` affordance (small `?` in section headers + a `⌘/`
  shortcut) opening a popover: one-paragraph plain-Hebrew explanation of the
  current entity *kind* (table / tcode / CDS / BAdI / role …) and how to read the
  page, sourced from `KIND_INTEL` (`data/kind-intel`, already kind-level true
  knowledge) + the entity's own `knowledgeFor`/`TX_INTEL`.
- Effort: **S–M** (one popover component + a kind→copy map that mostly exists).

## 6. Hover intelligence
- A single `<EntityHoverCard>` used by every chip platform-wide. On hover/focus
  (200ms delay), shows: kind, one-line purpose, module, top relations, and a
  "open" CTA. Reuses the command-palette intel resolvers (`objectIntel`,
  `tcodeIntel`, `txIntel`).
- Accessibility: focus-triggered too; dismiss on blur/Esc; never traps.
- Performance: pure data lookup (no fetch), memoized; renders in a portal.
- Effort: **M** (one component, then swap chip call-sites incrementally).

## 7. Beginner Mode / Consultant Mode (global)
- A persisted global preference (`localStorage neo:ux:mode`, SSR-safe
  `useSyncExternalStore`) with a header switch.
- **Beginner**: plain-Hebrew explanations, hides technical grids, larger type,
  more whitespace, "start here" cues.
- **Consultant**: full technical density, mono numerals, compact spacing, all
  facets expanded.
- Implementation: a `useUxMode()` hook + a few `mode === "beginner"` conditionals
  in the two workspaces (data already split: `beginner` vs `consultant` fields in
  `TX_INTEL`; `role/why` vs technical grids in objects).
- Effort: **S–M** (hook + conditionals; content already authored).

## 8. Better recommendations
- Generalize `txRecommend` into a cross-entity engine: from an object →
  "consultants also open" (related objects + their tcodes + incidents); from a
  transaction → next steps + config tcodes + Fiori equivalent + modern S/4 path.
- Add lightweight **personalization** from `neo:tx:recent` / object recents
  (already tracked): "based on what you viewed".
- Effort: **M**.

## 9. Guided learning paths
- Promote the per-object/tcode `learningPath` arrays into a first-class
  **Journey** surface: an ordered, progress-tracked path (intro → master data →
  objects → transactions → Fiori → integration → incidents → quiz → interview),
  with a persistent "you are here" indicator.
- Reuses existing `learn` store + the authored `learningPath` data + the
  Delivery/Academy scaffolding.
- Effort: **L** (new journey runner + progress + linking).

## 10. Modern UX polish (cross-cutting)
- Shared **workspace shell** (rail + header + mode switch + hover layer) so object
  and transaction pages are visually identical in chrome.
- Motion tokens, spacing scale, and a single elevation system applied platform-wide.
- Skeleton loaders, composed empty states, tactile `:active` feedback.
- Effort: **M**, incremental.

---

## Canonical Transaction Registry (this phase — implemented)
The data foundation for the Transaction Workspace is now a **single canonical
registry** (`lib/tx-registry.ts`) merging every verified source, deduped + normalized:

| Tier   | Source                         | Page                         |
|--------|--------------------------------|------------------------------|
| deep   | `TX_INTEL` (499) + `TRANSACTIONS` | full Transaction Intelligence (`/tcode/<c>`) |
| light  | `TCODE_DIRECTORY` + `TCODE_CATALOG` | verified breadth page (derived-only, no fabrication) |

Light entries show only **known facts** (real code/title/module) + **dataset-derived**
relations (tables, incidents, exits, same-module codes) and explicitly state that
deep intelligence is not yet authored. No facet is ever invented.

---

## Rollout order (proposed)
1. Shared workspace shell + Beginner/Consultant mode (§7, §10) — unlocks the rest.
2. Hover intelligence (§6) + "What am I looking at?" (§5) — platform-wide lift, low risk.
3. Relationship rail + visual process flow (§3, §4).
4. Better recommendations (§8).
5. Guided learning paths (§9).

Each step ships independently behind QA (desktop/tablet/mobile, tsc 0, eslint 0,
0 console errors) — no big-bang rewrite.
