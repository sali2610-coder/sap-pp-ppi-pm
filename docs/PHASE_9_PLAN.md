# Phase 9 — Content Expansion Roadmap (DRAFT — do not start)

**Status:** proposal only. Phase 9 begins **after Phase 8 (M1–M6) is complete**.
No implementation now.

## Overall objective
Make this the **most complete SAP PP / PP-PI / PM knowledge base** — then extend
the same engine to additional SAP modules. Phase 8 hardens the machine; Phase 9
fills it with verified SAP knowledge, breadth and depth.

## Deliberate scope change vs Phases 1–8
Phases 1–8 froze scope to flagship **PM / PP / PP-PI** and forbade new modules.
**Phase 9 intentionally lifts the "no new modules" rule** — controlled, one module
at a time, each on the existing reusable `module-portal` engine. The
**never-invent-SAP-data** rule stays absolute: every object, field, playbook,
config step, BAPI/IDoc, CDS view and authorization object must come from a verified
source (SAP DDIC, Help Portal, OSS Notes, Simplification Item Catalog, or a
reviewed SME/blueprint). No fabrication, ever. Gaps show honest "Coming Soon".

## Content dimensions to expand (all listed items, mapped to milestones)
New SAP modules · additional SAP objects · more Playbooks · business-process flows ·
configuration guides · real-world implementation examples · ECC vs S/4 comparisons ·
Fiori apps · BAPIs / IDocs / Enhancements · CDS Views · authorization documentation ·
integration scenarios · troubleshooting guides.

## Milestones (priority order)

| ID | Milestone | Priority | Scope | Est. |
|----|-----------|----------|-------|------|
| **C1** | Deepen PM/PP-PI object coverage | **P1** | Add missing verified tables/objects to PM & PP-PI; fill every flagship object's 8 sections (Business Usage, Lifecycle, Functional Behavior, Dependencies, Assets, Examples, Troubleshooting, QA) where source data exists | **L** |
| **C2** | Playbooks + troubleshooting library | **P1** | Expand `data/troubleshooting*` with more verified incident playbooks (symptom→root cause→tables/tcodes→fix) for PM & PP-PI; retire remaining "Coming Soon" where data exists | **M–L** |
| **C3** | Business-process flows + real-world examples | **P1** | End-to-end verified process flows (e.g. plan→order→confirm→settle) and anonymized real implementation scenarios per flagship area | **M** |
| **C4** | Configuration guides (SPRO) | **P2** | Verified config paths + key nodes for PM & PP-PI; extend the `configuration` section beyond current rows | **M** |
| **C5** | ECC↔S/4 comparison depth | **P2** | Per-object ECC vs S/4 deltas from the Simplification Item Catalog (by name); enrich the ecc-s4 section beyond kept/replaced/removed | **M** |
| **C6** | Fiori + technical assets breadth | **P2** | More verified Fiori apps, BAPIs, IDocs, Enhancements, CDS Views per object; close the PM/PP-PI asset asymmetry with real data | **M** |
| **C7** | Authorization documentation | **P2** | Auth objects / roles per transaction & object (verified) — a new consistent facet across flagship modules | **M** |
| **C8** | Integration scenarios | **P3** | Cross-system flows (IDoc/ALE, PI/PO, EWM/Zetes/Daymax) documented from verified interfaces | **M** |
| **C9** | New module onboarding (1st: QM or MM) | **P3** | Onboard one adjacent module onto the existing engine from a verified blueprint — proves the "any module inherits the portal" design at content scale | **L** |

Scope legend: **M** 1–2 wk of sourcing+authoring · **L** 3 wk+. Cost is dominated by
**verified content sourcing**, not code — the render engine already exists.

## Dependencies
```
Phase 8 (M1–M6) ─ must be complete (drift guards + parity + CI gates) ─┐
                                                                        v
C1 (object depth) ──> C2 (playbooks) ──> C3 (flows/examples)
        │                                     │
        └──> C4 (config) ─ C5 (ECC/S4) ─ C6 (assets) ─ C7 (auth)  [parallelizable]
                                                            │
                                                            └──> C8 (integration)
C9 (new module) depends on: a verified blueprint + the C1–C7 facets proven on flagship first.
```
- Phase 8 **M3 (PM data parity)** and **M2/M4 (CI dead-link gates)** are prerequisites:
  content expansion must not reintroduce data gaps or dead links.
- C1 is the spine; C2–C8 enrich facets on top; C9 (new module) is last and reuses everything.

## Expected deliverables
- Regenerated/extended datasets (`data/sapData.*`, `troubleshooting*`, `consultant-notes`,
  `cds-map`, `exits`, config sheets) — all from cited sources.
- Every flagship object: 8 sections populated or an honest, tracked gap.
- A verified content-provenance note per new dataset (source + date).
- (C9) one new module portal live via the existing engine, same quality bar.
- No engine/redesign work — Phase 9 is content, not infrastructure.

## Risks & assumptions
**Assumptions**
- Verified SAP sources (DDIC access, Help Portal, OSS, SME review) are available for
  each content area. **Without a source, the item stays "Coming Soon" — never invented.**
- Phase 8 delivered the drift guards + CI crawl so content churn is safe.
- The `module-portal` engine needs no changes to absorb new content/modules.

**Risks**
- **Provenance risk (High):** the core hazard is fabricated/incorrect SAP facts.
  Mitigation: mandatory source citation per item; SME review gate; honest gaps.
- **Volume/consistency risk (M):** large content additions can drift in tone/structure.
  Mitigation: the Academy 18-facet standard + shared section engine enforce uniformity;
  Phase 8's consistency gates run per PR.
- **Scope-creep risk (M):** "new modules" can explode effort. Mitigation: one module at a
  time (C9), only after flagship depth is done; each behind the full validation gate.
- **Data-integrity risk (M):** new relations/objects could create orphans/dead links.
  Mitigation: Phase 8 CI dead-link + data-integrity gates block regressions.

## Out of scope (Phase 9)
Redesign of the portal · non-static runtime · invented business data · engine rewrites.

## Approval gate
Phase 9 starts only after (a) Phase 8 is complete and (b) this roadmap is approved
with content sources identified per milestone.
