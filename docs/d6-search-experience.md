# Wave D6 — Search Experience (primary entry point)

Elevates the ⌘K Command Palette from a lookup box into the portal's primary
entry point — a Raycast/Linear-class launcher. Visual + UX only, offline, RTL,
reduced-motion safe. All existing search logic (object-intel, T-code card,
grouped object results) preserved.

## Shipped
| Focus | Implementation |
|---|---|
| Launcher empty state | Replaces the single hint line. Three zones: **Recent searches** (persisted), **Suggested** quick-prompts, **Jump to** page tiles. Palette now answers "where do I start?". |
| Recent searches | `localStorage['neo:search:recent']` — last 6, deduped, saved on every navigate (`pushRecent`, ≥2 chars). Chips re-run the query; **Clear** wipes them. |
| Pages as results | New `page` kind: 10 launcher destinations (PM, PP-PI, Knowledge, Library, Troubleshooting, Process Explorer, Evolution, Copilot…) matched by he/en/keywords and shown as a **עמודים** group above data results — search is also navigation. |
| Suggested prompts | Curated entries (`EQUI`, `AUFK`, `MRP`, `אצווה`, `IW31`, `Fiori`, `תקלה`, `ECC`) seed first-time use and the no-results fallback. |
| No-results state | Composed empty state (icon + echoed query + suggestion chips) instead of a bare line — always offers a next step. |
| Polish | Page rows get an icon chip + arrow affordance; jump tiles lift on hover; chips spring on hover; bilingual via i18n (`search.recent/suggested/jump/pages…`). |

## Notes (honest)
- **Reuses** the existing palette engine — no new search backend, no new deps. `searchAll`/`objectIntel`/`searchObjects`/`lookupTCode` untouched.
- **design-taste / high-end-visual**: launcher tiles, spotlight-free hover lift, transform/opacity only, IntersectionObserver not needed (palette is modal). Segoe UI + lucide kept (CLAUDE.md offline mandate; skill's Geist/Phosphor preference overridden by user instruction).
- **magic MCP / Figma MCP**: reference only this wave — no generation/deps.

## Verification
Build clean · **0 console errors · 0 page errors · 0 external requests (offline intact)** · responsive 1440 + 390 ✓ (launcher collapses to single column) · recent-search persistence verified via navigate→reopen. Screenshots: `d6-launcher`, `d6-results`, `d6-pages`, `d6-empty`, `d6-recent`, `d6-mobile`. CBC brand + footer + functionality unchanged.

Next: **D7 Executive Wow Layer** — pending approval.
