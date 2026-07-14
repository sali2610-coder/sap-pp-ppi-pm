# BAPI / FM Catalog — UX, Clarity & Data-Trust Redesign

**Status:** Awaiting approval. No product code will be written until this plan is approved.
**Date:** 2026-07-14 · **Author:** Sali Halif (Web Coding) · **Branch:** `bapi-catalog-redesign`
**Scope guard:** PM / PP / PP-PI only. 100% offline. Design System v2. Hebrew RTL.

---

## 0. Ground truth (measured, not assumed)

The rich UI in the review screenshots (3-icon cluster, COMMIT pill, מתחיל/בינוני/מתקדם,
verification chips, filter toolbar) **does not exist in current `main`**. PR #34 already
simplified the catalog. What exists today:

| Area | Current reality |
|---|---|
| Catalog `app/bapi/page.tsx` | Server-rendered two-group list. 45 BAPIs + 86 FMs = **131 objects**. Tiny cards, no filters, no badges, no icon cluster. |
| Data `data/function-intel.ts` | **133 curated entries** (hand-authored from standard SAP knowledge) covering all 131 objects. Fields: what/why/module/processArea/flow/inputs/outputs/ecc/s4/qa/related/`inferred`. |
| Trust today | **52 of 131** flagged `inferred:true` (version-dependent, not bench-verified). No structured trust tier, date, source, or method. |
| Classification | `classifyFunc` = "BAPI if name starts `BAPI_`, else FM" — **prefix-only** (the §7 bug). |
| Invalid names | `Control Recipe` (has a space — not a valid ABAP name), `BOMMAT` (a BOM structure, not an FM), `PPCC1` (a transaction code, not an FM). |
| Missing structured fields | trust tier · COMMIT flag · complexity+reason · learning time · release status · remote-enabled · obsolete · replacement · ECC/S4 compat flag · real type classification. **None exist.** |

**This is a build-forward, not a patch.** Everything the catalog renders will come from a
new, honest, re-verifiable data foundation.

---

## 1. Overall strategy

### Architecture in one diagram

```
              data/function-intel.ts        data/function-trust.ts          lib/complexity.ts
              (existing curated intel)       (NEW — trust records)           (NEW — pure rule engine)
                      │                              │                               │
                      └──────────────┬───────────────┴───────────────┬───────────────┘
                                     ▼                                ▼
                             lib/func-profile.ts  ── composes ──►  FuncProfile
                             (NEW — single read model: intel + trust + computed complexity + type + commit)
                                     │
             ┌───────────────────────┼────────────────────────┐
             ▼                        ▼                         ▼
   app/bapi/page.tsx        components/bapi-catalog.tsx   app/bapi/[name]/page.tsx
   (thin server shell)      (NEW client: filters/views)   + components/function-intelligence.tsx
                            components/bapi-card.tsx       (enriched detail)
```

The **single seam** is `FuncProfile`. The UI never reads raw data; it reads `FuncProfile`.
Re-verifying an object later = editing `function-trust.ts` only. The UI architecture never
changes. This directly satisfies "build the trust system so it can be re-verified in the
future without changing the UI architecture."

### Why this execution order is the safest

1. **PR-A first (data foundation).** Every card, badge, filter and detail block renders from
   the trust + complexity model. Building the UI before the model would mean rebuilding the UI
   when the model lands. Foundation first = no rework, and you get to review the *truth claims*
   in isolation before any pixels depend on them.
2. **PR-B second (catalog UX).** Consumes a stable, reviewed `FuncProfile`. Pure presentation
   risk, no data risk.
3. **PR-C third (detail pages).** Deepest per-object content; benefits from both the model and
   the catalog patterns being settled.

### Expected benefit after each PR

- **After PR-A:** every object has an honest, explained trust level, a computed complexity with
  a reason, a correct type, and a COMMIT flag. Invalid names fixed/removed. *No visual change yet
  beyond honest labels* — but the data is now trustworthy and re-verifiable.
- **After PR-B:** the catalog reads like a consultant workbench — full names, clear hierarchy,
  one obvious primary action, real filters, three view modes, clean mobile.
- **After PR-C:** each object opens to a complete, trustworthy reference with evidence.

---

## 2. PR-A — Data foundation

### 2.1 Trust model (your 5 levels, verbatim)

```ts
// data/function-trust.ts  (NEW)
export type TrustLevel =
  | "official"      // אומת מול תיעוד SAP רשמי / Help Portal / API Hub / SAP Note — מקור מאוחסן
  | "community"     // אומת ע"י מספר מקורות קהילה מהימנים — מקור מאוחסן
  | "curated"       // ידע SAP מבוסס וסטנדרטי, ללא ציטוט רשמי מאוחסן
  | "needs-review"  // ככל הנראה נכון, ממתין לאימות
  | "invalid";      // שם שגוי / מיושן / כפילות / להסרה

export interface TrustSource { label: string; url?: string; note?: string } // real citations only

export interface TrustRecord {
  level: TrustLevel;
  reason: string;            // WHY this level — drives the badge tooltip
  method: string;            // e.g. "ידע SAP סטנדרטי (curated)", "SAP Help fetch", "SE37 metadata"
  sources: TrustSource[];    // [] for curated/needs-review; ≥1 real entry required for official/community
  verifiedOn?: string;       // ISO — when the claim was established
  lastReviewed: string;      // ISO — last time a human/agent looked
}
```

**Hard rules encoded as build-time asserts** (`scripts/check-bapi-trust.mjs`, added to CI):
- `level === "official" || level === "community"` ⇒ `sources.length ≥ 1` **and** every source has a non-empty `label`. Build fails otherwise. *This makes it structurally impossible to show "Official" without a stored source.*
- No SAP Note number may appear in any `reason`/`source` unless it also appears as a real stored `TrustSource`. (regex guard for `SAP Note \d+` / KBA patterns.)
- Every catalog object must have exactly one `TrustRecord`. Build fails on gaps or orphans.

### 2.2 Type classification (fixes §7)

```ts
export type FuncType =
  | "released-bapi"      // BAPI רשמי
  | "bapi-like-fm"       // FM דמוי-BAPI, לא משוחרר רשמית
  | "released-fm"        // FM רשמי (RFC/מתועד)
  | "internal-fm"        // FM פנימי
  | "remote-fm"          // FM עם RFC
  | "obsolete"           // מיושן
  | "replaced";          // הוחלף (עם replacement)
export interface TypeRecord { type: FuncType; remoteEnabled?: boolean; replacement?: string; obsolete?: boolean }
```

A curated `TYPE_OVERRIDE: Record<string, TypeRecord>` replaces the prefix-only guess. Default
fallback stays prefix-based **but is flagged `needs-review`** so nothing silently claims BAPI
status. The red "BAPI" badge appears **only** for `released-bapi`.

### 2.3 Verification process (honest, bounded — Option 1)

1. **Baseline map:** all 79 non-inferred entries → `curated` (`method: "ידע SAP סטנדרטי"`, `sources: []`).
   All 52 `inferred:true` entries → `needs-review`.
2. **Invalid sweep:** `Control Recipe`, `BOMMAT`, `PPCC1` and any other non-conforming
   name (regex `^[A-Z][A-Z0-9_/]*$`) → investigated: **rename** to the correct object if one
   exists (with a stored source), else mark `invalid` and **remove from the catalog listing**
   (kept in a `REMOVED` ledger with the reason). See §2.5.
3. **Targeted web upgrade:** for a **bounded, high-value set** (the ~20 core write BAPIs:
   `BAPI_ALM_ORDER_MAINTAIN`, `BAPI_EQUI_CREATE`, `BAPI_PROCORD_CREATE`, `BAPI_ALM_NOTIF_CREATE`,
   `BAPI_GOODSMVT_CREATE`, `BAPI_MATERIAL_SAVEDATA`, `CSAP_MAT_BOM_*`, …), attempt a **real**
   fetch from SAP Help / API Business Hub. If a page is found and stored → upgrade to `official`
   with the exact URL. If not → stays `curated`. **No invented citations.** Expected realistic
   outcome: a modest number reach `official`; most stay honestly `curated`. That is the correct,
   trustworthy result — not a failure.
4. **Every upgrade stores:** `verifiedOn`, `method`, `sources[]`, `lastReviewed`.

> Honesty note kept from the standing constraint: *a smaller verified dataset is better than a
> large unreliable one.* The UI will proudly show "Curated Knowledge" as a first-class,
> well-explained level — not a euphemism for "unverified."

### 2.4 COMMIT flag (feeds §5 + complexity)

```ts
export type Commit = "required" | "not-required" | "n-a";
```
Derived by a documented rule + explicit overrides:
- write verbs (`CREATE|CHANGE|MAINTAIN|SAVE|POST|CANCEL|CONF|ADD|UPDATE|DELETE|SET`) ⇒ `required`
- read verbs (`READ|GET|GETLIST|GETDETAIL|CHECK|EXPL|SELECT`) ⇒ `not-required`
- overrides map for exceptions. Every value is explainable on the detail page (sequence,
  ROLLBACK behavior, RETURN handling, common mistake).

### 2.5 Fixing invalid names, duplicates, aliases

- **Invalid:** `Control Recipe` → concept, not an FM → **remove** (ledger reason). `BOMMAT` →
  BOM structure → investigate correct read FM (`CSAP_MAT_BOM_READ`), rename if confirmed else
  remove. `PPCC1` → transaction code → remove from FM list (belongs in the T-code catalog).
- **Aliases/duplicates:** `CRAP_WORKCENTER_GET_DETAIL` ↔ `CR_WORK_CENTER_READ` (the data itself
  cross-references). Canonicalize to one, store the other as an `alias` (still searchable, not a
  duplicate card).
- **Ledger:** `REMOVED_OR_RENAMED` array with `{ was, action, to?, reason, source? }` — surfaced
  in the verification summary deliverable, never silently dropped.

### 2.6 Complexity engine (computed, documented — your factors)

```ts
// lib/complexity.ts  (NEW, pure, unit-tested)
export interface ComplexityResult {
  level: "basic" | "intermediate" | "advanced"; // בסיסי/בינוני/מורכב
  score: number;
  reasons: string[];        // human-readable, shown on detail page
  learnMinutes: [number, number]; // [min,max] → 5-15 / 20-45 / 60-120
}
```
Documented rule (each factor adds weight; thresholds fixed and shown in the plan + a doc block):

| Signal | Source | Weight |
|---|---|---|
| COMMIT required | commit flag | +2 |
| Rollback-relevant (write to production/inventory) | verb + process | +2 |
| # required input structures | `inputs.filter(req)` | +1 each (cap 3) |
| # mandatory parameters | inputs | +0.5 each (cap 2) |
| Status / validation handling | keyword in what/qa | +1 |
| Cross-module dependency (e.g. PP+MM) | module + related | +2 |
| # related BAPIs/FMs | related | +0.5 each (cap 2) |
| Authorization complexity | qa.failures auth hits | +1 |
| Customizing prerequisites | qa.deps config hits | +1 |

Thresholds: `score < 3` → basic (🟢 5–15m) · `3–6` → intermediate (🟡 20–45m) · `> 6` →
advanced (🔴 60–120m). The detail page renders the exact `reasons[]` that produced the level.
**No manual assignment.** Learning time is a function of level, shown as a hint to prioritize
learning — explicitly *not* a skill judgment.

### 2.7 Performance impact

All new data is static and tree-shakeable; `FuncProfile` is computed at module load (131 objects
— negligible). Complexity is pure and memoizable. **No runtime cost on navigation**, no new
network. Static export page count unchanged (still one page per object). Expected build-time
delta: negligible (<1s).

### 2.8 Files — PR-A

| File | Change |
|---|---|
| `data/function-trust.ts` | **NEW** — TrustRecord + TypeRecord + Commit maps for 131 objects; REMOVED ledger. |
| `lib/complexity.ts` | **NEW** — pure complexity engine + doc block. |
| `lib/func-profile.ts` | **NEW** — composes intel+trust+complexity+type+commit → `FuncProfile`; `listProfiles()`, `profile(name)`. |
| `lib/complexity.test.ts` | **NEW** — unit tests for the rule engine (TDD). |
| `lib/object-intel.ts` | `classifyFunc` delegates to TypeRecord; invalid names excluded from `listFuncs`. |
| `data/function-intel.ts` | Fix/remove the 3 invalid entries; add `commit`/`inferred` alignment where needed. |
| `scripts/check-bapi-trust.mjs` | **NEW** CI gate — the hard rules in §2.1. |
| `data/function-intel.ts` consumers | untouched (backward-compatible). |

### 2.9 PR-A risks / regression / rollback

- **Risk:** removing invalid names changes `generateStaticParams` → their routes 404. *Mitigation:*
  they were never valid; add redirects only if a rename target exists; dead-link crawler (M2)
  confirms no internal links break.
- **Regression prevention:** existing detail pages already read `funcIntel`; `FuncProfile` is
  additive. Route-manifest gate (M1) + dead-link crawl (M2) + `check-bapi-trust` must pass.
- **Rollback:** PR-A is pure data + one classifier delegation. Revert = revert the commit; UI
  falls back to today's behavior with zero coupling.

---

## 3. PR-B — Catalog UX redesign

### 3.1 Pattern comparison (§11 — grounded now, refined live at PR-B start)

Concise read of strong technical catalogs (to be re-validated with Mobbin / Figma / Browser MCP
before implementation, per your instruction):

| Product | Pattern worth taking | What to avoid |
|---|---|---|
| **Stripe docs / API ref** | Calm hierarchy, mono identifiers, generous line-height | Their density is too text-heavy for cards |
| **Postman** | Method chips (verb color-coding) → maps to our type/COMMIT | Cluttered right rail |
| **Linear** | Restrained color, one accent, fast keyboard nav, command-K | Too minimal for trust metadata |
| **Raycast** | List rows with trailing metadata + quick actions on hover | N/A |
| **SAP Fiori object page / API Business Hub** | Object header + status pill + grouped facts; the trust "chip + tooltip" idiom | Their cards can feel heavy |
| **GitHub Marketplace** | Card = icon + bold name + one-line + tags footer | Too marketing-y |
| **Algolia DocSearch** | Fast filter + result count feedback | N/A |

**Synthesis (not a copy):** full mono name is the hero · one accent (brand red) reserved for
type/primary · trust as a chip-with-tooltip (Fiori idiom) · quick actions revealed on
hover/focus but always keyboard-reachable · footer tags for scanning · a Table view for expert
comparison (our differentiator).

### 3.2 Card redesign (fixes §1, §2, §3)

```
┌──────────────────────────────────────────────────────────┐
│ [BAPI רשמי ●]  [PM]                                  [☆]  │  top row: type+trust dot · module · favorite(40/44px,tooltip)
│                                                            │
│ BAPI_ALM_ORDER_MAINTAIN                            [⧉]     │  full mono name (wraps at _ if needed) · copy(tooltip→הועתק)
│ יצירה/שינוי של פקודת אחזקה דרך ממשק מרכזי                  │  one-line purpose
│                                                            │
│ פקודות אחזקה · Maintenance Order                           │  context: process · object type
│ ──────────────────────────────────────────────────────    │
│ ✔ Curated   ·   נדרש COMMIT   ·   ECC ✓ / S4 ✓            │  trust row: level(tooltip) · commit(tooltip) · compat
│ 🟡 בינוני                                                  │  computed complexity chip (tooltip → learn time)
│ ──────────────────────────────────────────────────────    │
│ [ פתח פרטים → ]                              [ העתק שם ]    │  footer: primary CTA + secondary
└──────────────────────────────────────────────────────────┘
Whole card is the click target for "פתח פרטים". Favorite + copy stop propagation.
```

Rules honored: full name always readable (2-line, wrap at `_`, tooltip full) · one obvious
primary CTA · single favorite control top-corner with hover label (הוסף/הסר ממועדפים) · **no
tiny stacked icon cluster** · every icon-only control has a tooltip · 40×40 desktop / 44×44 touch
· visible hover/focus/pressed · full keyboard nav · never color-only (trust also has icon+text).

### 3.3 Views (§10) + grouping

- **View switch:** קבוצות / רשימה / טבלה.
- **Group-by switch:** תהליך עסקי (Equipment, FuncLoc, Notification, Order, Task List, Measurement,
  Production/Process Order, Batch, BOM, Routing, Goods Movement, Reservation, Material, Work Center,
  Status) · or טכני (BAPI / FM / Released / Internal / Deprecated).
- **Table view:** columns = name · type · module · process · trust · COMMIT · ECC/S4 · complexity —
  sortable, for expert comparison.

### 3.4 Filters + search (§9)

- **Primary bar:** הכל · BAPI · FM · מאומת · דורש בדיקה · מועדפים.
- **Secondary drawer:** module · process · object type · ECC/S4 · release · COMMIT · complexity · A→Z.
- **Chrome:** active-filter count · result count · "נקה הכל" · saved presets (PM BAPIs · PP-PI ייצור ·
  מאומתים בלבד · שינויי ECC→S/4 · נדרש COMMIT · תהליך ציוד · תהליך הודעות).
- **Search:** sticky, mono-aware, matches name + purpose + process; debounced; result-count feedback.

### 3.5 Favorites

Reuse the existing `lib/status-store.ts` localStorage + `useSyncExternalStore` pattern → new
`neo:bapi:favorites` key. One control per card + a "מועדפים" primary filter. SSR-safe.

### 3.6 Mobile / tablet (§13)

- **Mobile:** 1 card/row · full name · large open target · filter **bottom-sheet** (reuse
  `BottomSheet` from the mobile-nav work) · sticky search · compact module/process badges · no
  tiny icons · no truncation · no horizontal overflow.
- **Tablet:** max 2 columns · larger spacing · full names · filter **drawer** not crowded toolbar.

### 3.7 Files — PR-B

| File | Change |
|---|---|
| `app/bapi/page.tsx` | Becomes thin server shell → passes `listProfiles()` to the client catalog. |
| `components/bapi-catalog.tsx` | **NEW** client — search/filters/views/grouping/presets/favorites. |
| `components/bapi-card.tsx` | **NEW** — the redesigned card (+ list-row + table-row variants). |
| `components/bapi-filters.tsx` | **NEW** — primary bar + secondary drawer/bottom-sheet. |
| `lib/bapi-favorites.ts` | **NEW** — status-store-style favorites. |
| `app/globals.css` | Card/table/chip utilities within DSv2 tokens. |

### 3.8 PR-B risks / regression / perf / rollback

- **Risk:** client-side filtering of 131 rows — trivial; virtualization not needed (<200 rows).
- **Perf:** `FuncProfile[]` serialized once; memoized filter/sort; transform/opacity-only hover
  animations; no layout-triggering props. Target: 0 CLS, interaction <100ms.
- **Regression:** multi-viewport puppeteer harness (390/768/1024/1440/2560 × views) → 0 overflow,
  0 console errors; keyboard + SR labels checked.
- **Rollback:** page shell revert restores the current simple list; card/catalog components are
  additive and isolated.

---

## 4. PR-C — Detail pages

Enrich `function-intelligence.tsx` + `app/bapi/[name]/page.tsx` into the full 22-section reference:

1. Technical header (full name, type badge, trust chip) · 2. Plain-language explanation ·
3. Business object · 4. Business process · 5. Module · 6. Type & release status ·
7. ECC / S4 compatibility · 8. **COMMIT behavior** (required? sequence · ROLLBACK · RETURN
handling · common mistake · example flow — fixes §5) · 9. Parameters · 10. Structures ·
11. Return messages · 12. Common errors · 13. Authorization · 14. Related T-Codes · 15. Related
tables · 16. Related IDocs · 17. Related BAPIs/FMs · 18. Example flow · 19. Implementation
warnings · 20. **SAP Notes & official links** (only real stored sources; empty state if none) ·
21. **Source evidence** (trust level + method + sources[] + verifiedOn + lastReviewed) ·
22. **Complexity explanation** (level + computed `reasons[]` + learning-time).

**Files — PR-C:** `components/function-intelligence.tsx` (enrich), `app/bapi/[name]/page.tsx`
(pass `FuncProfile`), maybe `components/trust-evidence.tsx` + `components/complexity-explainer.tsx`
(NEW, reused on the card tooltip too). Risks: content-only, lowest regression; rollback = revert.

---

## 5. Success criteria (measurable)

**PR-A:** every one of the 131 objects has `{trust level + reason + method + sources + dates,
type, commit, complexity+reasons+learnMinutes}` · 0 non-conforming names remain in the listing ·
`check-bapi-trust` + M1 + M2 green · complexity engine unit tests pass · no "Official" without a
stored source (asserted).

**PR-B:** acceptance §14 met on every card (full name readable · obvious primary action · one
clear favorite · no icon cluster · module/process/type/trust/complexity/COMMIT visible &
explained · no false BAPI badge · keyboard nav · SR labels · never color-only) · 3 views work ·
filters+presets+counts work · 0 overflow & 0 console errors at 5 breakpoints · interaction <100ms.

**PR-C:** all 22 sections render (with honest empty states) · COMMIT explained · complexity
reasoned · trust evidence shown with dates/sources · SAP Notes shown only when real.

---

## 6. Deliverables per PR (per your review policy)

Before each PR opens (and none auto-merges): before/after screenshots (desktop/tablet/mobile) ·
changed-files list · perf comparison · what's done / what remains / risks discovered. **PR-A also:**
verification summary (totals per level), corrected-names list, removed-entries list, reclassified
list, official-sources list. **PR-B also:** one BAPI card + one FM card + the pattern-comparison.
**PR-C also:** one full detail-page screenshot + complexity-model + trust-model explainers.

---

## 7. Review policy

Wait for explicit approval of **this plan** before any code. Then implement **PR-A only**, present
its deliverables, and **wait for approval again** before PR-B, and again before PR-C. No
auto-merge at any stage.

---

## 8. Mandatory cross-cutting requirements (approved additions)

These apply to **every** screen and PR. Non-negotiable acceptance gates.

1. **North star:** not "a catalog" — the best SAP reference platform available. Every decision judged against that bar.
2. **Benchmark before redesign:** no layout invented from scratch. Before redesigning any screen, compare against Stripe Dashboard · Linear · Postman · Figma · Apple HIG · SAP Fiori · Mobbin references, and record the comparison in the PR. (Live inspection via Mobbin / Figma / Browser MCP.)
3. **Four form factors flawless:** desktop · laptop · tablet · mobile. Every component verified at 390 / 768 / 1024 / 1440 / 2560 with 0 overflow, 0 console errors.
4. **Performance is a top priority (budget below).** Feels instantaneous.
5. **Accessibility:** keyboard nav · visible focus · readable type · consistent spacing · correct RTL. Never color-only.
6. **SAP.com-grade cards:** pixel-perfect spacing, balanced typography, clear hierarchy, zero clutter.
7. **Scale to thousands from day one** — see §9.
8. **High-fidelity mockups before PR-B.** Realistic mockups (Figma MCP or Browser MCP — **no ASCII wireframes**) produced and **approved** before any catalog UI code is written.
9. **Every PR:** before/after (desktop+tablet+mobile) · perf comparison · files changed · risks · rollback.
10. **Merge bar:** visually polished + fully responsive + production-ready, or it does not merge.

### Performance budget (enforced, measured in each UI PR)
- First interaction < 100 ms · list scroll 60 fps · 0 CLS.
- **Virtualized rendering** for any list/grid/table that can exceed ~150 rows (windowed; only visible rows in the DOM).
- Lazy-load heavy detail content; **intelligent prefetch** of a card's detail route on hover/focus/viewport-idle.
- Memoized filtering/sorting; transform/opacity-only animation; no layout-triggering props.
- Dependency check before adding any virtualization lib (verify `package.json`; offline-bundled only, no CDN).

---

## 9. Scalability architecture (thousands of objects, many kinds)

Today ≈ 131 BAPI/FM. Tomorrow: 1,000+ BAPIs, FMs, IDocs, Tables, CDS Views, Transactions,
Classes, Enhancements, BAdIs, User Exits, RAP objects, OData services. **The model is designed
generic now; only the BAPI/FM adapter is populated in this initiative.**

### Kind-agnostic core (PR-A builds this)
```ts
// lib/catalog/types.ts (NEW — the platform's universal object model)
export type ObjectKind =
  | "bapi" | "fm" | "idoc" | "table" | "cds" | "tcode"
  | "class" | "enhancement" | "badi" | "user-exit" | "rap" | "odata";

export interface CatalogObject {
  id: string;               // stable slug (kind + name)
  name: string;             // exact technical identifier
  kind: ObjectKind;
  module: string;
  process?: string;
  purpose: string;          // one-line
  type: TypeRecord;         // released/internal/obsolete/… (kind-appropriate)
  trust: TrustRecord;       // §2.1 — universal
  commit?: Commit;          // BAPI/FM only; undefined for read-only kinds
  complexity?: ComplexityResult; // computed where signals exist
  aliases?: string[];
  detailHref: string;
}
```
- **Trust + complexity + type** are cross-kind concerns → defined once, reused by every future kind.
- **Adapters** turn a source into `CatalogObject[]`: `lib/catalog/adapters/bapi-fm.ts` now; `tables.ts`,
  `cds.ts`, … later. A registry (`lib/catalog/index.ts`) concatenates adapters → one `listObjects()`.
- The **catalog UI (PR-B)** is a generic virtualized object browser keyed on `CatalogObject`, not on
  BAPI/FM specifically — so adding a kind later is a data adapter, **no UI rewrite**.
- **Indexing for scale:** a prebuilt in-memory index (by kind / module / process / trust / first-letter)
  so filtering thousands of rows stays O(bucket), and a lightweight tokenized search index (name +
  purpose) instead of linear scans. Built once at module load, memoized.
- **Static export at scale:** per-object detail pages already use `generateStaticParams`; the pattern
  scales. If object counts later make full prerender heavy, the plan allows a hybrid (prerender
  high-traffic kinds, lazily hydrate the long tail) — flagged, not needed at 131.

### Impact on PR-A scope
PR-A now delivers the **generic core + the BAPI/FM adapter**, not a BAPI-only model. Same effort,
future-proof seam. PR-B's catalog is built generic + virtualized from the first line.
