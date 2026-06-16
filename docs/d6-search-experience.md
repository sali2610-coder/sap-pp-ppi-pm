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

---

## D6.2 — Enterprise search expansion (per follow-up spec)

| Requirement | Implementation | Status |
|---|---|---|
| Search reachable everywhere | Header `OmniSearch` + global ⌘K + new **floating search FAB** (`SearchFab` in `app-shell.tsx`, every page, opposite the UX dock) | ✓ |
| Instant results while typing | `useMemo` over each keystroke (already) | ✓ |
| Synonyms / fuzzy / SAP awareness | `lib/search-intel.ts` — `planQuery()` maps natural language → canonical SAP tokens (Process Order→COR, Batch→MCH1/MCHA, Material Master→MARA, IDoc→MATMAS, MRP, BOM…), strips trailing numbers ("IDOC 51"), `within()` Levenshtein≤1 helper | ✓ |
| Bright-yellow + bold highlight | `Highlight` `<mark bg-yellow-400 font-bold text-black>` across labels **and** descriptions; alias term highlighted too (`plan.highlight`) | ✓ |
| Match counts | Sticky **"נמצאו N תוצאות"** bar (spring-pops on change) + per-category `· N` (counts result rows + intel/T-Code cards) | ✓ |
| Jump to exact location + auto-scroll | Results navigate with `?find=<term>`; `FindHighlighter` (in `app-shell.tsx`) locates the tightest element containing the term, `scrollIntoView({block:"center"})`, flashes `.find-flash` (bright-yellow pulse). Event + URL-param paths, render-poll retry | ✓ |
| Synonym hint | Yellow "→" chip ("פק\"ע ייצור → COR") shows when a query is expanded | ✓ |

### Spec query smoke test (count of matches returned)
`MARA` 3 · `MRP` 3 · `Process Order` 13 · `COR6N` 1 (T-Code card) · `IDOC 51` 1 · `Batch Management` 3 · `PP-PI` 13 — all return ≥1.

### Honest notes
- **No fabricated data**: synonyms only re-point queries at tokens that already exist in the real dataset. `COR6N` has no owning table, so it surfaces as the derived **T-Code intelligence card** (count = 1), not a table row.
- **Jump flash visibility**: flashes the tightest element containing the term. On heavily-styled headers (e.g. a red H1) the yellow pulse is subtler than on body rows; the in-result yellow highlight remains the primary "impossible to miss" surface. Element-level only — no text-node surgery → zero React/hydration risk.
- **Fuzzy** is intentionally light (Levenshtein≤1 helper) — not a full fuzzy engine. Substring + synonym expansion carries the listed queries.

### Verification (D6.2)
Build clean · **0 console errors · 0 page errors · 0 external requests (offline intact)** · deep-link `.find-flash` confirmed present on destination · FAB on every page, no overlap with UX dock · RTL + bilingual. CBC brand + footer + functionality unchanged.
