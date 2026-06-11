# SAP Architecture Map — Gap Analysis & Visual Review
**Date:** 2026-06-11 · **Reviewer pass:** pre-fix · **Scope:** 4 deliverables
**Status:** findings only — nothing fixed.

Preview screenshots: `exports/review/` (desk-*.png, mob-*.png) + `/tmp/pptx-*.png`, `/tmp/poster-1.png`.

Severity: 🔴 high · 🟠 medium · 🟡 low

---

## 0. Deliverable status (renders OK)
| Deliverable | Renders | Console errors | Note |
|---|---|---|---|
| sap-architecture-map-v2.html | ✅ all 7 views + side panel + presentation | **0** | desktop solid; mobile broken |
| sap-architecture-poster.pdf | ✅ | — | clean |
| sap-architecture-infographic.png | ✅ 3200×4524 | — | = poster content |
| sap-architecture-presentation.pptx | ✅ 8 slides | — | RTL OK; 1 cosmetic |

---

## 1. Missing SAP modules
- 🔴 **Batch Management** — required as a layer/module in the brief; exists only as fields (CHARG) + one table (MCH1). No module card in Layer 2. Missing core: **MCHA, MCHB, MCHA, MCSD, batch status**.
- 🔴 **Classification System** — required; **completely absent**. No KLAH, KSSK, AUSP, CABN, CAWN, KSML. No module node.
- 🟠 **ALE** — listed in integration set but only a label in the Integration hub; no ALE objects (EDIDC/EDIDS, partner profiles TBDLS, distribution model).
- 🟠 **PP (discrete)** — module card exists but holds only **1 table (OBJNR)**. Discrete PP shares PP-PI tables; no discrete-only objects (PLAF planned orders standalone, discrete routing distinction).
- 🟡 **WM / EWM** — not in brief, but Zetes WMS integration implies a warehouse module; absent (LTAK/LTAP / EWM).
- 🟡 Thin modules: **CO (3), QM (2), CS (1)** — too few tables to represent the module realistically.

## 2. Missing tables (canonical gaps)
Present already (good): MARC, MARD, MBEW, COSP, MCH1, RESB, AFRU, AFKO, VBFA.
Absent but expected:
- 🟠 **MM**: EKET (PO schedule lines), EBKN (PR acct assignment), T156 (movement types), MCHB (batch stock).
- 🟠 **SD**: VBEP (sched lines), VBKD (business data), KNVV (cust sales), KONV/PRCD_ELEMENTS (pricing), VBUK/VBUP (ECC status).
- 🟠 **FI**: BSID/BSAD (cust open/cleared), BSIK/BSAK (vendor), SKB1, FAGLFLEXA, KNB1/LFB1 (company-code views).
- 🟠 **CO**: CSKB (cost elements), COSS (internal totals), CSKA.
- 🟠 **QM**: QAMV, QAMB, PLMK (insp chars), QDPS, QPRS.
- 🟠 **Classification**: KLAH, KSSK, AUSP, CABN, CAWN — none.
- 🟡 **CS**: VEDA (contract data), only VIQMEL present.
- 🟡 **Integration**: EDIDC/EDIDS (IDoc control/status) not as tables.

## 3. Missing relationships
- 🟠 Cross-module links route almost entirely through shared hubs; several **real ECC FKs not modeled**:
  - QALS ↔ CHARG / MCH1 (batch ↔ inspection) — broken (no batch tables).
  - Classification KSSK ↔ OBJEK ↔ MARA (KLAH) — absent entirely.
  - Pricing: VBAP ↔ KONV / account determination — absent.
  - MATDOC ↔ FI (ACDOCA) goods-movement posting link — not shown.
- 🟠 **OBJNR status spine** added as a node but edges from OBJNR → AUFK/AFKO/QMEL/EQUI are partial (only JEST/JSTO modeled).
- 🟡 Document-flow chains (VBFA: order→delivery→billing) exist as nodes but flow not drawn as a directed chain in Database view.
- 🟡 34 cross-module edges total — light for a 9-module landscape; reflects PM/PP-PI-only real data.

## 4. Visual issues
- 🔴 **Filter rail overlaps right-edge content** in Landscape / Technical / Functional. `fit()` ignores the 248px rail → "Order to Cash" process card and the **CO module column** are clipped behind the rail.
- 🟠 **Shared-hub labels unreadable** in Landscape at fit-zoom — render as "—" dashes (text ~3px). Only legible after manual zoom.
- 🟠 **Database force graph** clusters small & central; large empty canvas, disconnected singletons drift to edges → weak first impression for the centerpiece view.
- 🟡 **Layer captions** clipped at canvas left edge (Landscape).
- 🟡 **PPTX title**: "NEO" logo text wraps to "NE / O" (textbox too narrow).
- 🟡 Table-dot layer (Layer 4) dots tiny/uniform; hubs barely distinguished.

## 5. Hebrew RTL issues
- 🟠 **English-only chrome** breaks the "entire UI in Hebrew" rule: top-bar live status `LANDSCAPE ONLINE`, `▶ הצג` mixes; bottom legend module names OK but layer/size legend partly English; side-panel section headers are bilingual (acceptable) but the EN half is uppercase Latin in an RTL block.
- 🟡 Stat chips: numbers in RTL flow render in visually-reversed order vs labels (cosmetic).
- 🟡 Tooltips mix LTR codes inside RTL sentences without explicit `dir` isolation → occasional punctuation drift.
- 🟢 Core RTL (titles, descriptions, side panel, PPTX) renders correctly.

## 6. UX issues
- 🔴 **Rail cannot be collapsed/hidden** — always open, always occluding. No toggle.
- 🟠 **No user "fit / reset zoom" control** — auto-fit only; after manual zoom the user is stranded.
- 🟠 **Click-to-isolate** in Database has no visible "clear" affordance (must click empty canvas — undiscoverable).
- 🟡 **Search** only dims nodes in structured views; doesn't pan/zoom to the hit.
- 🟡 **Presentation controls** (ESC / ← / →) undocumented in UI.
- 🟡 No in-canvas legend for node **size = degree** / **dashed = modeled** (only bottom bar, easily missed).

## 7. Readability issues
- 🟠 Hub + table labels disappear at default zoom (depend on hover) — Landscape & Database.
- 🟡 Muted text `#8493a6` on dark for small captions = low contrast (sub-WCAG-AA for small text).
- 🟡 Force-graph labels only for degree ≥ 4 → ~half the nodes anonymous until hovered.
- 🟡 Modeled-vs-real (dashed stroke, 0.5 opacity) too subtle at small node sizes.

## 8. Mobile issues (tested @390×844)
- 🔴 **Rail covers the screen on mobile.** `render()` sets inline `#rail{display:block}`, which **overrides** the `@media (max-width:820px){.rail{display:none}}` rule. Diagram is crushed to a left sliver — effectively unusable.
- 🔴 **Minimap** likewise re-appears on mobile in Database view (inline `display:block` beats media query).
- 🟠 **Top bar wraps** (brand + 0 stat chips + present button) into a cramped stack; present button shrinks.
- 🟠 **Side panel = 380px** on a 390px screen → covers ~100% (max-width:90vw helps but still full-screen, no easy dismiss target).
- 🟡 **Tabs overflow** horizontally with no scroll affordance (works, not obvious).
- 🟡 No touch guidance; drag-node vs pan gesture conflict on touch; pinch-zoom required to read anything.

---

## Priority fix list (when approved)
1. 🔴 Mobile: stop inline `display` overriding media query; collapse rail to a drawer; responsive top bar.
2. 🔴 Rail overlap: add right padding = rail width to `fit()`, or float rail over with content inset.
3. 🔴 Add Batch Management + Classification System as modules + core tables + relationships.
4. 🟠 Landscape hub-label readability (min font / always-on labels / larger nodes).
5. 🟠 Add rail collapse toggle + user fit/reset button + "clear isolation".
6. 🟠 Fill canonical table gaps (MM/SD/FI/CO/QM pricing, open items, sched lines).
7. 🟡 Hebraize remaining chrome; PPTX logo box; contrast bump; in-canvas legend.

*Built by Sali Halif — Web Coding · NEO Cockpit · 2026*
