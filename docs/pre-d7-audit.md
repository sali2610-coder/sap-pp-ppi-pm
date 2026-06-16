# Pre-D7 Audit — Data Validation + PP/PM Visual Consistency

Verified screen-by-screen against `data/sapData.ts` and the rendering components.
No assumptions — every number below was counted from source.

---

## AUDIT 1 — Data validation

### Scope reality (important)
The NEO dataset contains **exactly two table-backed SAP modules**: **PM** and **PP-PI**
(generated from the two blueprints). There is **no PP, SD, MM, QM, FI, CO, CS module
with its own table catalog.** Those labels appear only as **auxiliary tags** on
enhancement / QA / incident / process-map records, not as table datasets.

### Authoritative counts (counted from source)
| Module | Surface | Displayed | Actual (source) | Diff | Explanation |
|---|---|---|---|---|---|
| **PM** | `/pm/` hub header | 58 טבלאות · 12 נושאים | 58 tables · 12 topics · 280 fields | 0 | Correct. Matches blueprint assertion (58/280). |
| **PP-PI** | `/pp-pi/` hub header | 68 טבלאות · 7 נושאים | 68 tables · 7 topics · 326 fields | 0 | Correct. Matches blueprint assertion (68/326). |
| **PP** (aux tag) | qa-testing / exit / incident filters | "PP" bucket small (qa-testing = **1**, exits = 12, OIC = 0, **0 tables**) | same | 0 (by design) | **This is the "PP shows 1" symptom.** "PP" is not a table module — production tables live under **PP-PI**. The "PP" tag is reserved for discrete-production enhancement/QA records. |
| **Home hero** | `/` "מודולים" stat | **12** | functional modules = **2** (PM, PP-PI) | **+10 — MISMATCH** | Hardcoded `modules: 12` in `app/page.tsx`. Misleading label; 12 ≈ knowledge hubs, not SAP modules. **Flagged for correction.** |
| Home hero | "טבלאות" | 126 | 126 (58+68) | 0 | Correct (ALL_TABLES.length). |

### Counting logic (the business rules in effect)
1. **Tables are counted per module, from that module's topics.** Each table is assigned
   to exactly one topic inside exactly one module. Verified: total distinct `tableName`
   = **126 = 58 (PM) + 68 (PP-PI)**, with no table appearing in both modules → **no global
   dedup needed and none double-counted.**
2. **Shared tables:** none are shared across the two modules in the dataset, so "counted
   once globally" vs "per module" is moot here — the partition is clean.
3. **Cross-module objects** (records tagged `Cross`) are **excluded** from per-module
   buckets — they only show under the "All / חוצה-מודול" filter.
4. **T-Codes / BAPIs on home** are de-duplicated via `Set` before counting.
5. **Processes** = module `topics` (PM 12, PP-PI 7). The separate **Process Explorer**
   counts `PROCESS_MAPS` (6 E2E maps, tagged by domain MM/SD/PP-PI/QM/PM) — a different,
   cross-functional artifact, not the per-module process count.

### PP / PP-PI / PM verdict
- **PM** ✓ correct (58 / 12 / 280).
- **PP-PI** ✓ correct (68 / 7 / 326).
- **PP** "1 process / 1 table" is **not** a bug in the PP-PI catalog — it is an aux "PP"
  tag bucket. The 68 production tables are correctly under **PP-PI**. If a single
  unified "Production (PP/PP-PI)" view is desired, that's a product decision, not a
  count fix.
- **One real inconsistency found:** home hero "**12 מודולים**" (should read 2, or be
  relabeled). Recommend correction before D7.

---

## AUDIT 2 — Visual consistency: did D4/D5/D6 reach PP & PM pages?

Verified by inspecting each rendering component for wave markers
(D4 = premium cards/elevation/nav pill; D5 = motion/reveal/skeleton/layout;
D6 = yellow `Highlight` / deep-link / search).

| Page / surface | Component | D4 | D5 | D6 | Notes |
|---|---|:--:|:--:|:--:|---|
| `/pm/`, `/pp-pi/` header + toolbar | `module-hub` | ✓ | ✓ | ◐ | Premium header card + accent edge; `layoutId` tab pill + `AnimatePresence`. In-module `?q=` search; global ⌘K reachable. No yellow highlight in the header itself (n/a). |
| **Cockpit tab (default)** | `migration-cockpit` | ✗ | ✗ | ✓ | **OLD UI PATTERN.** Flat table, **no motion**, minimal premium styling — yet it IS the first thing shown on a module page. Has D6 yellow `Highlight` in rows. **Primary gap.** |
| Blueprint tab | `technical-blueprint` | ✓ | ✓ | ✓ | Fully on-wave (14 motion refs, 6 premium, Highlight). |
| Guides tab | `module-directories` | ✓ | ✓ | ✗ | Premium + motion; no highlight (nav lists — low value). |
| Hub zones | `hub-zones` | ✓ | ✓ | n/a | Premium nav tiles + motion. |
| Object pages `/object/[name]` | `object-workspace` | ✓ | ✓ | ◐ | Premium (9) + motion (6). D6 arrival via `.find-flash` (D6.2); no in-content yellow highlight yet. |
| Progress chart | `progress-chart` | n/a | n/a | n/a | D3/canvas chart. |

### Pages still on old UI patterns (flagged)
- **Migration Cockpit tab** — `migration-cockpit.tsx`: flat, motion-less, pre-D4 styling.
  This is the **default tab** on both `/pm/` and `/pp-pi/`, so the module pages *read* as
  un-redesigned even though Blueprint/Guides/Object pages were upgraded. **This matches
  the reviewer's suspicion.**
- **Object workspace** — D4/D5 present; D6 in-content yellow highlight not yet wired
  (relies on arrival flash). Minor.

### Why some surfaces were left unchanged
- `progress-chart` is a data-viz canvas — motion/highlight not applicable.
- Directory/guide lists skipped yellow highlight (navigation, not search results).
- The cockpit tab gap was **not intentional** — it's a genuine miss to fix.

---

## Gate
PM / PP-PI counts are **verified correct**. Two action items surfaced:
1. **Count fix:** home hero "12 מודולים" → 2 (or relabel).
2. **Visual gap:** bring **Migration Cockpit** tab to D4/D5 parity (it already has D6).

Recommend resolving both **before** D7, then proceeding to the Executive Wow Layer.
