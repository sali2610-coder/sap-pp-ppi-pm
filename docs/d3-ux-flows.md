# Wave D3 — UX Flows

Turns the Knowledge Center hub from a static grouped grid (D2) into an **interactive,
search-first experience**. UX layer only — every href unchanged, no SAP logic touched.
Offline, RTL, framer-motion (already in stack).

New: `components/knowledge-explorer.tsx` (client). Removed: `knowledge-finder.tsx` (superseded).

## The 10 focuses → what shipped
| # | Focus | Implementation |
|---|---|---|
| 1 | Search-first workflow | Live client-side filter over all 38 centers (he/title/desc/href). Type → instant results + count. `/` focuses, `Esc` clears. |
| 2 | Guided navigation | Sticky scroll-spy nav (IntersectionObserver, no scroll listener) — active journey pill follows the viewport via `layoutId` spring. |
| 3 | Progressive disclosure | Cards show title+tag+2-line desc; hover/focus expands desc to 5 lines + reveals accent edge. Search collapses journeys → flat results. |
| 4 | Premium micro-interactions | Card lift (D1 `.lift`), arrow slide, `.tap` press-scale, animated focus ring, clear-button. |
| 5 | Hover states | Edge accent grows (`scale-y`), arrow translate, shadow elevation, desc expand — all transform/opacity (GPU). |
| 6 | Motion design | Staggered entrance (`staggerChildren` + spring), `whileInView` once per section, `AnimatePresence` results↔journeys↔empty. Honors `useReducedMotion`. |
| 7 | Empty states | Dashed-border panel, search glyph, "לא נמצאו מרכזים עבור …" + 3 recovery actions (clear / business-need search / Copilot). |
| 8 | Contextual hints | Result-count badge, `נסה:` suggestion chips (אצווה/MRP/Fiori/תקלה/ECC/הרשאות), `/` + `↵` keyboard hints, "שאל את הקופיילוט". |
| 9 | Better hierarchy | Search hero leads; journey eyebrow+title+count+intent; muted EN labels; D1 type scale. |
| 10 | WOW factor | Ambient brand aurora, spring nav pill, live-highlight `<mark>` on matches, fluid state transitions. |

## Tool usage (honest)
- **ui-ux-pro-max** — search-accessible, primary-action, empty-states, progressive-disclosure, motion durations, focus-states.
- **design-taste-frontend** — staggered orchestration, spring physics (stiffness 120/damping 18), IntersectionObserver over scroll listener, isolated client leaf, full interaction states. *Deviation:* skill bans Inter / prefers Geist+Phosphor; project mandates **Segoe UI system stack (offline) + lucide** → kept per CLAUDE.md (user instruction wins).
- **high-end-visual-design** — search-first hero, eyebrow tags, ambient wash, nested radii. Adapted to light CBC system (not dark archetype).
- **interaction-motion** — *not installed*; intent fulfilled via design-taste-frontend + framer-motion.
- **magic MCP** — pulled search-input (RTL `ps/pe` + start-icon/end-action) and empty-state (dashed/icon/title/actions) patterns; **vendored locally, stripped `cva`/`@radix-ui/react-slot`/new npm deps** → offline-safe, design-system-matched.
- **Figma MCP** — connected (auth complete, `sali2610@gmail.com`); used as design-intelligence reference only. No file URL provided → no file-bound asset extraction performed (not fabricated).

## Verification
Build clean · **0 console errors · 0 page errors · 0 external requests** (offline intact) · RTL ✓ · responsive 1440/390 ✓ · reduced-motion path ✓ · CBC brand + footer + all functionality unchanged.

Out of scope (later): global Cmd+K command palette = **D6** (existing `command-palette.tsx` noted).
