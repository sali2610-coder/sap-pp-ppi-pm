# P3 — PM & PP Knowledge Center: Audit Gap Report + Proposed Architecture

_Read-only architect audit of production `main` (worktree `/tmp/neo-audit` @ `796444d1`). No code changed. This is the pre-implementation review gate — nothing gets built until this report + mockups are approved._

---

## 0. Headline findings (the 5 that matter)

1. **Content is stranded, not missing.** The richest PM/PP knowledge (what/why/when/CBC-example/common-mistakes) already exists in `data/domain-detail.ts` (18 PM + 21 PP-PI hand-authored domains) and `data/consultant-notes.ts` — but the `/pm` and `/pp-pi` **module portals never link to it**. The portal re-derives a shallower version from tables. Two parallel truths; the good one is hidden.
2. **Three transaction detail routes, three process surfaces.** `/tcode/[code]` (canonical, ~1900 codes) vs `/transactions/[code]` (60) vs `/tcode-dir/[code]` (254) — the last two are subsets. Process: `/process-explorer` (rich, authored) vs `/process/[slug]` (thin, derived) vs an embedded `ProcessWorkspace`. The owner's "make it ONE" applies to both.
3. **Broken / missing flow nodes.** PM business-process step 8 (AFRU confirmation) and PP-PI step 8 (COGI backflush) render as dead dashed placeholders because **those tables are not in the dataset**. PP-PI Configuration section renders an empty "coming soon" because `PPPI_DATA.config` doesn't exist.
4. **Structural data gaps.** All 280 PM fields have **empty type/length** (`dt`/`len`). Master-data facets (owner, when-created, number ranges, org levels) and SPRO config are **not modeled as data** — "master" is a runtime heuristic, config is a flat sheet dump. Zone mis-classification hides Routing/Recipe, Measuring Point, and Business Partner from their Master-Data sections.
5. **The module portal is documentation-grade, not a learning product.** Object pages + Architecture Studio are genuinely premium; the **section engine** (tables/relationships/config/master-data/business-process) has no scroll-spy, no reading-time/difficulty/prereqs, no in-context relationship diagrams, no hover glossary, no related-lessons.

---

## 1. MISSING (content + data)

### PM
| Item | Where | Severity | Verified |
|---|---|---|---|
| Table **AFRU** (order confirmation) | `data/sapData.pm.ts` | BLOCKER — breaks BP flow step 8 + confirmations + ER | ✓ |
| Tables **QMIH, IHPA, T357/T357G, AFFH, AFVV** (referenced by domains, absent from dataset) | `data/sapData.pm.ts` | MAJOR | ✓ referenced; scope needs verification |
| **Business Partner** master-data domain (only BUT000 table exists) | `data/domain-detail.ts` | MAJOR | ✓ |
| Master-data fields **owner** + explicit **when-created** | `DomainDetail`/`Domain` types | MAJOR | ✓ |
| **related-lessons** links from domains → Academy | `components/domain-view.tsx` | MAJOR | ✓ (zero links) |
| Config depth — only **6 config rows** for all of PM | `data/sapData.pm.ts` | MAJOR | ✓ |
| PM field **type/length empty on all 280 fields** | `data/sapData.pm.ts` | MAJOR | ✓ |

### PP-PI
| Item | Where | Severity | Verified |
|---|---|---|---|
| **`PPPI_DATA.config` missing** → Configuration renders empty | `data/sapData.pppi.ts` | BLOCKER | ✓ |
| BP flow missing **MRP / Release / Control Recipe / GR / Settlement**; step 8 **COGI** dead node | `lib/studio-graph.ts` | BLOCKER | ✓ |
| Missing tables **MCHB, PLAF, AFVV, AFVU, PLFH, AUFM, COGI/AFFW, KBED** | `data/sapData.pppi.ts` | MAJOR | ✓ |
| Master-Data section **excludes Routing/Recipe** (PLKO/PLPO mis-zoned "planning") | `lib/studio-graph.ts` | MAJOR | ✓ |
| `fnNotes` on only **12 / 52** tables (missing all CRxx resources, STKO/STPO, PLPO…) | `data/consultant-notes.ts` | MAJOR | ✓ |

---

## 2. DUPLICATED (the consolidation targets)

### Transaction surfaces
| Route | Coverage | Verdict |
|---|---|---|
| `/tcode/[code]` | whole registry ~1900, 3-tier fallback | **KEEP — canonical detail** |
| `/transactions/[code]` | 60 codes | remove → redirect to `/tcode` |
| `/tcode-dir/[code]` | 254 codes | remove → redirect to `/tcode` |
| `/transactions` page | 3 stacked widgets (`TransactionWorkspace` + `TransactionExplorer` + `TxSearch`) | **KEEP page, collapse to ONE center** = `TransactionWorkspace` |
| `components/transaction-explorer.tsx` | PM/PP-only table on `/transactions` | remove |

**Glue that keeps dupes alive:** `lib/tcode-search.ts` `tcodeHref()` + `allTcodesMerged()` still emit `/transactions/...` and `/tcode-dir/...`. Collapse both to always emit `/tcode/<code>/` — then the two legacy routes are dead and safe to delete.

### Process surfaces
| Surface | Data | Verdict |
|---|---|---|
| `/process-explorer` + `/process-explorer/[slug]` | `data/processes.ts` (6 authored E2E maps) | **KEEP — canonical** |
| `/process/[slug]` | derived `processIntel`, different slug scheme | remove → redirect to `/process-explorer/[slug]`; repoint links in `function-intelligence.tsx`, `object-workspace.tsx`, `object-intel.ts` |
| `ProcessWorkspace` (embedded in `/pm`,`/pp-pi`) | `data/process/process-data.ts` | reconcile: scope as "module tour" that deep-links into `/process-explorer`, or merge datasets |

### Data redundancy
- Relationships stored twice (per-table `SAPTable.relations` + module-level `SAPModuleData.relations`+`joins`); JOIN text triplicated.
- Process flows in two systems: `FLOWS` (studio-graph) vs `PROCESS_MAPS` (processes.ts).
- Near-duplicate PM domains: `pm-maintenance-execution` vs `pm-maintenance-orders`; `pm-preventive-maintenance` vs `pm-maintenance-planning` (4 thin `[base]` domains shadow their deep siblings).
- Orphaned components: `module-hub.tsx` / `module-directories.tsx` render `ppvs`/`tools`/`tcodesDir` sheets but are imported nowhere → the valuable "PP-discrete vs PP-PI" comparison never displays.

---

## 3. INCORRECT / NEEDS-VERIFICATION

- **Zone mis-classification** (`lib/studio-graph.ts` `zoneOf`/`Z_MASTER`): IMPTT (Measuring Point) & BUT000 (Business Partner) → "other" (dropped from PM master-data); PLKO/PLPO → "planning" (dropped from PP master-data); QMAT→"quality", T006→config. Skews Master-Data sections + swimlane graph. Fixable in code (heuristic), but should become explicit data.
- **PM BP flow incomplete** — Release/TECO/Settlement collapsed into JEST, not shown as nodes (correctness = incomplete vs canonical lifecycle, not wrong).
- **Hand-authored SAP facts** in `domain-detail.ts` (BAdI IDs like `IWO10009`, CDS names, "(אם מוגדר)" exits) are plausible but flagged in-source "אמת ב-SE18" → **Goal 2 cross-check required** against SAP sources / installed SAP skills before promoting trust badges.
- Curated field subsets (AFKO shows 6 of ~100 fields) — intentional "representative", not an error, but should be labeled.

---

## 4. Proposed final architecture

### 4.1 ONE master Transaction Center
- **Route:** `/transactions` renders only `TransactionWorkspace`. Delete `TransactionExplorer` + `TxSearch` stacks.
- **Detail:** `/tcode/[code]` is the single per-transaction page (each transaction keeps its own page — improved, not duplicated). Delete `/transactions/[code]` + `/tcode-dir/[code]`; collapse `tcodeHref()` to `/tcode/<code>/`.
- **Filters:** Module (PM/PP/PP-PI/QM/MM/SD/FI/WM/EWM/PS/CO/HR/Basis/Security/ABAP…) + **Topic** (Master Data/Orders/Notifications/Planning/Execution/MRP/Confirmations/Settlement/Costing/Printing/Reports/Monitoring/Interfaces/Administration/Customization/Analysis/Utilities/Favorites/Recent) + **Object** (Equipment/Material/Order/Notification/Work Center/Routing/Recipe/Batch/Resource…). Topic+Object are NEW facets (today only Module exists).
- **Search:** fuzzy, typo-tolerant, ranked. Haystack adds English title (`en`) — today unsearchable for 1732 catalog codes. Understands `IW31`, "Create Maintenance Order", "Order Creation", "פקודת אחזקה", partial input.

### 4.2 Process centers — CORRECTION (post-implementation finding)
Deeper inspection during PR-2 shows `/process/[slug]` and `/process-explorer/[slug]` are **not** clean duplicates:
- `/process/[slug]` slug = `module-topicIdx` (e.g. `PM-3`) — a **derived topic-bundle** (tables/tcodes/bapis of one module topic), linked from object-workspace, hub-zones, function-intelligence, object-intel search.
- `/process-explorer/[slug]` slug = authored map (e.g. `p2p`, `o2c`) — 6 hand-written **end-to-end business processes**.

They serve different content; the slugs don't correspond. A blind delete+redirect would 404/mislead and break 4 live link sites — so it is **not** a mechanical merge. Correct plan: (a) keep both but disambiguate naming (the derived one is a "topic view", the authored one the "process explorer"); (b) optionally, later, map each derived topic to its authored E2E map where one exists and fold `ProcessWorkspace` (the third, embedded surface) into `/process-explorer`. This is a design decision, deferred — not shipped as a breaking dedup.
- Rebuild PM + PP-PI BP flows to the true E2E chain; remove dead COGI/AFRU nodes by adding the missing tables (PR-4 data work).

### 4.3 Module portal = premium learning surface (Goal 3, no architecture change)
- **Wire `domain-detail.ts` into `/pm` + `/pp-pi`** master-data & business-process sections (cross-link the rich content instead of hiding it).
- Section engine gains: scroll-spy + sticky in-page nav (wire the already-built `object-section-nav.tsx`), reading-time/difficulty/prerequisites/related-lessons metadata, in-context relationship diagram (reuse the object-page `Graph()`), hover glossary, expandable cards, breadcrumb polish, "where am I / what is this / why it matters / where next / what depends on this".
- Interactive config (structured IMG-path objects) + master-data facet cards (owner/when-created/number-range/org-level) — requires small schema additions, not a rewrite.

### 4.4 Data model additions (backward-compatible)
- Add `AFRU`, `QMIH` (PM) and `config` sheet + `MCHB/PLAF/AFVV` (PP-PI) to datasets.
- Add explicit `zone: "master"|"planning"|...` per table (replace `zoneOf` heuristic).
- Add master-data facets (`owner`, `whenCreated`, `numberRange?`, `orgLevel?`) to `DomainDetail`.
- Populate PM field `dt`/`len`.
- **Goal 2:** cross-check every promoted fact against SAP Help / SAP Community / installed SAP skills; unverifiable → honest "בקרוב / needs-verification", never invented.

---

## 5. Execution gate

Per the P3 spec: **no code until this report + high-fidelity mockups are approved.** Next deliverable = mockups (desktop/tablet/mobile) for: (a) master Transaction Center, (b) redesigned section templates — Tables, Relationships, Business Process, Configuration, Master Data. Then wait for approval.
