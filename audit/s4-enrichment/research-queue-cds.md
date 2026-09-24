# Research queue · cds catalog (S/4HANA enrichment)

Kept by the single writer for `data/verification/cds.ts`. One line per id that was
refuted or deferred at the adversarial-verification gate, with the evidence still missing.
Written 2026-09-02 during the cds data commit (13 drafts audited: 13 written from their
auditors' `fixedRecord` with every downgrade applied; 0 refuted; the foundation worked
example `cds:I_MaterialDocumentItem` was superseded by its audited record). The catalog
graduated out of the repository-only guard in `test/evidence-schema.test.ts` in the same
change. Writer policy applied uniformly: `accessedAt` / `lastVerifiedAt` stamped 2026-09-02
per the orchestrator (the live loio + versionId re-checks ran 2026-09-05, disclosed in the
records' notes where the auditor asked for it); no `reviewer` field (no overlay record in
`data/verification/**` carries one); `status.source` hoisted into a shared const whenever
it duplicates an evidence entry; `repoRef` kept to a single `file#anchor`.

## refuted

- (none in this batch — all 13 audited drafts survived verification and were written with their auditors' fixes applied.)

## conflicts

- `cds:I_MaintenancePlan` — DEFERRED STATUS, needs an orchestrator decision outside the overlay: official What's New 2021 FPS01 (PDF read, pages 6–7; loio `6ffb8fb9aee1469b9d4c506e1790da34`, 2021.001) deprecates the view as of S/4HANA 2021, "no longer available by default", deleted as of 2023, successor `I_MaintenancePlanBasic` (VDM 2023.latest, loio `048dd3513ed34ccc8ffc1a51bc906f7c`, Status Released). The record is written WITHOUT an authored status because `deprecated` requires a resolving successor and `cds:I_MaintenancePlanBasic` is not in the universe (no row in `data/cds-map.ts`, the source of the route manifest's cds family). Consequence today: the block shows the derived pill "חדש ב-S/4HANA" (from `data/cds-enrichment.ts` verified) next to `sap_official_verified` sources that say the opposite; the notes disclose this. Do NOT author `verification_required` as a stopgap (`lib/evidence/resolve.ts:196` would flip the block into the needs-verification state over official evidence). Preferred fix: add `{ view: "I_MaintenancePlanBasic", he: "תוכנית אחזקה (תצוגה יורשת)", module: "PM", tables: ["MPLA"] }` to `data/cds-map.ts` (table mapping is repository inference; say so in that view's own overlay record), run `npm run gen:routes`, then author `status: deprecated`, edition on-premise, release 2021.001, source = the PDF evidence, successor `cds:I_MaintenancePlanBasic`. Also unverified: `C_MaintenancePlan` (cds-map consumption layer) appears in no official record; the maintenance-plan pages found are I_MaintenancePlanBasic, I_MaintenancePlanStdVH, C_MaintenancePlanDEX, I_MAINTENANCEPLANSCHEDULE, C_MaintPlanSchedgOvwQuery.
- `cds:I_MaterialDocumentItem` — successor written as `obj:material-document` (MSEG precedent) because `cds:I_MaterialDocumentItem_2` is not in the universe; a `data/cds-map.ts` row for `I_MaterialDocumentItem_2` (official VDM 2023.latest, loio `14305f6e8cb842bbb1647ffd5a30ca31`, "successor view for I_MaterialDocumentItem", Status Released) would let the record point at the real successor. `data/cds-enrichment.ts#I_MaterialDocumentItem` (Interface Composite, key, associations, still "verified") does not mention the 2021 deprecation; the consumption view `C_MaterialDocumentItem` and the F0843 link are repository-only. Release year of the original view could not be confirmed (the 1809 "CDS Views for Inventory Management" snippet names no views).
- `cds:I_MaintenanceOrder` — no official page names the bare view (15 query variants, On-Premise 2023.latest / 2025.001 and Public Cloud 2608.500; the 2025 FPS01 What's New PDF read in full). Documented maintenance-order views: I_MaintenanceOrderStdVH (value help), I_MaintenanceOrderDEX (Developer Extensibility, 2023), I_MaintOrderTechObjCube, and I_MaintenanceOrderBasic (Public Cloud). Internal conflict: `data/academy/lessons/pm-generated.ts:608` labels I_MaintenanceOrder trust `verified-docs` sourced to "SAP Help Portal", a label the official searches cannot reproduce; fix the trust label or add the citation. What unlocks an upgrade: an official topic with CDS View Name I_MaintenanceOrder, an api.sap.com cdsviews page, or a live ADT/SE11 check (sc4sap MCP failed to connect).
- `cds:I_Equipment` — `data/cds-enrichment.ts:40` viewType "Interface (Composite)" contradicts the official "View Type Basic" / "Data Category Basic" (VDM 2023.latest, loio `b3f9876bb0eb4141ab9f5dea73e5db4a`); associations and annotations in the enrichment are unsupported by any snippet. Fiori id drift for Manage Technical Objects: `data/fiori/apps.ts` F2730A vs `data/tx-intel.ts` (IE01) F1827; neither verified against the Fiori library this pass. The on-premise VDM topic is indexed only under 2023.latest (absent at 2025.000/2025.001 although the VDM deliverable exists there); the same loio is published for Public Cloud 2608.500.
- `cds:I_FunctionalLocation` — same Composite-vs-Basic conflict in `data/cds-enrichment.ts#I_FunctionalLocation` (official: View Type Basic, loio `bb72281d5569412e9d1721cc89209f42`, 2023.latest); key and associations repository-only; F2730A unverified against the Fiori library; no VDM topic for the view at 2025.x in the search index (only API_FUNCTIONALLOCATION pages and the What's New text-view entry).
- `cds:I_MaintenanceNotification` — in the scanned Help records the exact name appears only in the Public Cloud VDM (2608.500, loio `45fdea6e43724a349ecd4a9f3e993030`, written I_MAINTENANCENOTIFICATION); On-Premise records 2022 to 2025 FPS01 document I_PMNotifMaintenanceData and I_MaintenanceNotificationTP_3 (TP_2 deprecated) instead, so the on-premise status stays `verification_required`. Fiori catalog conflict: `data/fiori/apps.ts` F1511 names OData `API_MAINTENANCENOTIFICATION`; the official on-premise 2025.001 name is `API_MAINTNOTIFICATION` (entity A_MaintenanceNotification), while the Public Cloud OData V4 service is `api_maintenancenotification`. Fix belongs in the Fiori catalog.
- `cds:I_MaintNotificationItem` — no official record names the bare view; documented: I_MaintNotificationItemData (BW extraction, Released) and I_MaintNotificationItemTP_3 (Developer Extensibility 2025, replacing TP_2, marked Deprecated on the same page). Repository layer (`data/cds-enrichment.ts`, `data/cds-map.ts`, `data/tx-intel.ts` IW66/IW69) uses the exact name with fields/associations from textual sources only. Same F1511 `API_MAINTENANCENOTIFICATION` vs official `API_MAINTNOTIFICATION` drift as above.
- `cds:I_MeasuringPoint` — the only official page naming the view is the Public Cloud VDM (2608.500, loio `74c87e7895bb47bdacf20b1dfe3848f2`), so the authored status carries `edition: public-cloud`; do not relabel on-premise (On-Premise searches at 2025 FPS01 / 2023 return only API_MEASURINGPOINT pages; the on-premise VDM documents I_MeasuringPointData and I_MsrgPointProdnRsceTool). Fiori: repository says "Manage Measuring Points"; official 2025 FPS01 "Process Measuring Point" names Create/Display Measuring Point apps and the library search title shows W0031, which is not in `data/fiori/apps.ts` (kept out of xrefs). Enrichment field names (TechnicalObject, MeasrmtReadingUnit, MeasuringPointIsCounter) and associations unverified; MeasuringPointIsCounter / TechnicalObjectType / MeasuringPointCategory in snippets belong to the API, not the view.
- `cds:I_MeasurementDocument` — same Public-Cloud-only VDM page (2608.500, loio `3c7e53273aab410dbc5d9ab3e18c42ff`) → `edition: public-cloud`; on-premise existence needs SE11 / View Browser. `data/cds-map.ts` consumption view `C_MeasurementDocument` and Fiori "Manage Measurement Documents" found in no official record; no measurement-document app exists in `data/fiori/apps.ts`. Auditor corrections applied: the 1809 FPS01 BW-extraction quote, the 2021 create-for-order/operation statement, the API_MEASUREMENTDOCUMENT no-deletion constraint and the 2025 FPS01 Linear Asset Management entity now each cite their own official record (the draft had folded them into other URLs and mis-cited a 2021 FPS01 PDF section that contains no measurement-document passage).
- `cds:I_ProductionOrder` — `data/cds-map.ts` tags the view module "PP-PI", but the official records place it under Discrete Manufacturing (application component PP-VDM in the What's New 2025 snippet, loio `4d82c97578ab4e33be28f60a2163a4c6`); no official VDM page for a process-order header was found, so PP-PI coverage stays unverified. `data/cds-enrichment.ts#I_ProductionOrder` keyField/ABAP sample use ManufacturingOrder / ManufacturingOrderType while the official snippet names ProductionOrder / ProductionOrderType (evidence kept at verification_required). Sister-view name drift: official "Production Order Operation" page (2023 Latest) is I_ProductionOrderOperation_2; the repository holds I_ProductionOrderOperation. F2336 link is repository-only. Release timing undecided: What's New 2025 says New, yet the same VDM loio is indexed under 2023 Latest. SAP Note 3593337 appears in the snippet only in the Data Products / Business Data Cloud context and is deliberately not recorded as a note of the view.
- `cds:I_ProductionOrderConfirmation` — `data/cds-map.ts` module "PP-PI" vs the object ProductionOrderConfirmation (production orders, PP-SFC); process-order confirmations are covered officially by I_MfgOrderConfirmation (Basic/Dimension/Full) and, for Developer Extensibility 2025 FPS01, I_PROCESSORDERCONFIRMATIONTP, neither of which is an id in the dataset. Consumption view C_ProductionOrderConf, Fiori "Confirm Production Operation", view type Interface (Basic), key Confirmation + ConfirmationCounter and the enrichment associations are repository-only. No VDM page for the view at 2025.001 in the search index (2023 Latest only).
- `cds:I_ProductionVersion` — Manage Production Versions app has no Fiori id in the universe (see also the F2568 vs F2703 drift logged in research-queue-functions.md under fm:CM_FV_PROD_VERS_READ), so it stays out of xrefs. Enrichment associations (_Product, _Plant, _Routing, _BillOfMaterial) unverified; api.sap.com/cdsviews/I_PRODUCTIONVERSION returns an application shell identical to a nonexistent-view control path (HTTP code varied between checks: 401 on 2026-09-02, 200 on 2026-09-05), so it is not cited. The `_ProductionVersion` association is marked deprecated on the Planned Order (2025.001) and Manufacturing Order (2023.latest) VDM pages with successors `_ProductionVersion_2` / `_ProductionVersion2`; this is not evidence against I_ProductionVersion itself (its page says Status Released). VDM page indexed at 2023.latest only.
- `cds:I_WorkCenterCostCenter` — `data/cds-map.ts` maps the view to CRCO + CSLA; the official snippet names CRCO only (CSLA is the activity-type master, not a confirmed source). Enrichment field/association names (e.g. CostCtrActivityType, _ActivityType) unverified. The Update Work Center Cost Center service exists as an official 2025.001 record (loio `32ab5c8d33d64aab98a0331fef23cd86`, PATCH on WorkCenterCostCenter) and "Cost Center Allocation | APIs for Manufacturing" (loio `a7a039e8090545198fd8b734a1b71eda`, technical name WorkCenterCostCenter) also exists, but neither is cited here nor in `table:CRCO` (which cites only Create Work Center Cost Center); cite them before naming the entity in a recommendation. VDM page indexed at 2023.latest only; existence at 2025 rests on the What's New 2025 page.
- Cross-cutting — `data/cds-enrichment.ts` marks every one of these views "verified" with templated source strings and no URL; four records (I_Equipment, I_FunctionalLocation, I_MaintenancePlan, I_MaterialDocumentItem) now carry official evidence that contradicts or post-dates that marking (Basic vs Composite; deprecation not mentioned). The enrichment file itself is outside this overlay's write scope; align it in a separate data pass.

---

# Batch 2 · 2026-09-14 (PP / PP-PI master data and production views)

13 drafts audited, 13 written into `data/verification/cds.ts` (12 from their auditors'
`fixedRecord`, `cds:I_ProductionOrderOperation` from the researcher's draft with the auditor's
three optional downgrades applied: the Manufacturing Order Operation deprecation constraint
quoted from its own snippet, the 2023 What's New application components PP-PI-POR / PP-SFC /
PP-VDM, and the "CDS Views for Discrete and Process Manufacturing" negative finding); 0 refuted.
Writer policy as in batch 1: `accessedAt` / `lastVerifiedAt` stamped 2026-09-14 (`DATE14`),
no `reviewer` field, `status.source` hoisted into a shared const wherever it duplicates an
evidence entry (PRODUCT_VDM_2023, PRODUCT_PLANT_VDM_2023, BOM_VDM_2023, BOM_ITEM_VDM_2023,
WORKCENTER_VDM_2023, DISCRETE_MFG_CDS_WN2025_ITEM, PRODORDER_OPERATION_VDM_2023,
DISCRETE_MFG_CDS_WN2025_PRODORDERCOMP, BATCH_VDM_2023, MATERIAL_STOCK_VDM_2023). One writer-side
reword beyond the verdicts: `cds:I_Batch` repository claim "(ועוד MCHB למלאי)" became
"(ועוד MCHB לנתוני מלאי)" because `PLACEHOLDER_RE` matches the substring "למלא" (same trap the
I_MaterialStock auditor caught); meaning unchanged. The catalog was already graduated (batch 1),
so `test/evidence-schema.test.ts` needed no change.

## refuted

- (none in this batch — all 13 audited drafts survived verification.)

## conflicts

- `cds:I_Product` — `data/cds-enrichment.ts#I_Product` viewType "Interface (Composite)" contradicts the official "Data Category Dimension" (VDM 2023.latest, loio `af5c379f422e495c825802fcb9b0731f`); enrichment associations unverified. Name drift: official Data Quality cube snippet (loio `cda6e078b53544f98076b02719a3519c`, 2025.001) says `I_ProductUnitsOfMeasure` (plural) while the project id / xref is `I_ProductUnitOfMeasure`; undecided, needs a live check. Fiori: F1602 (Manage Product Master Data) is named in the official "Change Documents" snippet (loio `4715c453f57eb44ce10000000a174cb4`) but is absent from `data/fiori/apps.ts`, so no xref. Related-text-view drift: On-Premise 2023 says `I_ProductDescription`, Cloud 2608.500 says `I_ProductText`. VDM topic indexed at 2023.latest only (2025.001 existence rests on the What's New FPS01 SegmentationStructure item).
- `cds:I_ProductPlant` — Cloud Public Edition 2608.500 marks the view for deprecation with successor `I_ProductPlantBasic` (same loio `e63ceee015814892862d40af7688aff1`; list page loio `5fbc1f91f9b246dd9208245f96ba7021` says "This view is deprecated"); no On-Premise deprecation text found, so the on-premise status stays `s4_native` with a warning. `I_ProductPlantBasic` is not in the universe (no `data/cds-map.ts` row), so it cannot be a `successor`; add a row if the on-premise deprecation is ever confirmed. Enrichment viewType "Interface (Composite)" vs official "Data Category Dimension"; key/associations repository-only. Documentation anomaly not used: Cloud topic "Product Active Core Entity" (loio `02db5f685832426bae1aaf60c6d9a7ff`) shows "CDS View Name I_ProductPlant" for a product list.
- `cds:I_BillOfMaterial` — On-Premise VDM snippet (2023.latest, loio `e46cc75700eebc38e10000000a44147b`) shows no Release Status; the separate Cloud topic (2608.500, loio `064e64c0283b4230a27ee6f75ee205a2`) shows "Status Released" for Cloud only. Enrichment viewType "Interface (Composite)" vs official "View Type Basic". F1813 (Maintain Bill of Material) absent from `data/fiori/apps.ts`. Whether the view covers equipment BOMs (category E, IB01) is not stated by any snippet.
- `cds:I_BillOfMaterialItem` — no Release Status in the snippet (VDM 2023.latest only; 2025.001 existence rests on the Last Mile Distribution access-control page, loio `55511b38c25241019e5d005e92079ddc`). Enrichment key (`BillOfMaterialItemNodeNumber`) and associations unverified. `cds:I_BillOfMaterialItemAssgmt` left out of xrefs: `data/cds-map.ts` maps it to MAPL while `data/cds-enrichment.ts` places it over MAST, and no official topic names it (see table:MAST). F1813 absent from `data/fiori/apps.ts`.
- `cds:I_Routing` — NO OFFICIAL PAGE names the view (exact-name and related searches, On-Premise 2023.latest / 2025.001 / Public Cloud 2608.500; What's New 2023 SPS04 PDF read in full, 100 pages, zero occurrences). Official routing-header views are `I_MfgBillOfOperationsChgSt` (PLKO) and `I_MfgBillOfOperations` (PLKZ) plus the `I_ProductionRouting*DEX` family (PP-VDM, 2023 SPS04 / 2025); none is a project id, so no successor. Written without an authored status; evidence level `verification_required` (the block now shows the needs-verification state instead of the enrichment's "verified"). Internal drift: `data/domain-detail.ts:306` and `data/transactions.ts:103` write `I_RoutingHeader / I_RoutingOperation`; `data/cds-enrichment.ts#I_Routing` sources are template strings. api.sap.com/cdsviews/I_ROUTING returns the same login shell as a nonexistent view. What unlocks an upgrade: an official topic with CDS View Name I_Routing, a read api.sap.com cdsviews page, or a live SE11/ADT check.
- `cds:I_RoutingOperation` — same negative finding (eight query variants; no record with CDS View Name I_RoutingOperation). Documented operation views: `I_MfgBillOfOperationsOperation` (2025.001, loio `dac9192d15f04901b3e92f979831f7ed`, Released, table PLAS per snippet), `I_MfgBOOOperationChangeState`, `I_MfgBOOSubOperationChgSt` (PLPO + PLAS). Authored `verification_required` (edition on-premise, release null). Enrichment maps the view to PLPO while the documented operation view names PLAS. tx-intel drift: CA01/CA02/C201/IA01 cite `I_Routing / I_RoutingOperation`, CA03 cites `I_Routing` only.
- `cds:I_WorkCenter` — enrichment viewType "Interface (Composite)" vs official "View Type Basic, Dimension" (loio `c90e05a792674f7d8bbae247c5200999`); key/associations unverified; CRTX/CRCA/KAKO not confirmed as direct sources (official Work Center by Semantic Key snippet names CRHD only). `data/cds-map.ts` tags the view PP-PI only although PM uses it (IR01..IR03). F6175 (Manage Work Centers) absent from `data/fiori/apps.ts`; `cds:I_WorkCenterBySemanticKey` not in the universe. VDM topic indexed at 2023.latest; What's New 2025 page is under 2025.000, not 2025.001.
- `cds:I_ProductionOrderItem` — `data/cds-map.ts` module "PP-PI" vs official Discrete Manufacturing (PP-VDM); no official VDM page for a process-order item; whether `I_ManufacturingOrderItem` covers process orders is unverified. Enrichment field names (ManufacturingOrder…) vs official (ProductionOrder…). F2336 is bound in `data/fiori/apps.ts` to `I_ProductionOrder`, not to the item view (xref kept by header/item proximity, as in the sibling). Release timing undecided (What's New 2025 "New" vs VDM loio indexed at 2023.latest).
- `cds:I_ProductionOrderOperation` — the documented view is `I_ProductionOrderOperation_2` (loio `60ade555aa3742b58cf83828022b6eac`; the value-help page and What's New 2025 point at `_2`); no record deprecates or replaces a version-1 name, so no successor and `verification_required` authored over official evidence. Enrichment maps AFFL to the operation view; officially AFFL belongs to `I_ProductionOrderSequence` (loio `7b47cbb4384c497b993c670138aec9c7`) and the operation view reads AFVC/AFVV/AFVU (AFVV/AFVU not in the universe). Module tag PP-PI vs Discrete Manufacturing; F2336 link repository-only. `I_ManufacturingOrderOperation` snippet carries "At least one element of this CDS view was deprecated".
- `cds:I_ProductionOrderComponent` — official Important Fields are Reservation / ReservationItem / ReservationRecordType, not the enrichment key "ManufacturingOrder + Reservation Item". Module tag PP-PI vs Discrete Manufacturing; relation to `I_MfgOrderComponent` (RESB + AFFH per enrichment, BASELINE.md) unverified. House-wide: the shared const DISCRETE_MFG_CDS_WN2025_PRODORDER (batch 1) and the I_ProductionOrderItem record quote a table heading "New CDS Views Released for Discrete Manufacturing" that no snippet reproduces verbatim (visible text: "The following table summarizes the new CDS views that were released"); the component record uses the visible wording, the other two are untouched here and should be aligned in a hygiene pass.
- `cds:I_Batch` — Cloud Public Edition 2608.500 marks the view "Successor available" with successor `I_BatchWithPlant_2` (loio `e12c475aafa74089bfa01d85ea277f66`; replacement statement in loio `b0dacd62027e4f92849a6153b34ab367`); no On-Premise record does, so on-premise stays `s4_native` and `I_BatchWithPlant_2` (not in the universe) is text-only. `data/cds-map.ts` consumption view `C_BatchMaster` found in no official record. Fiori id drift: repository F1576 vs official Manage Batches F2462 (alias, see fiori:F1576). API_BATCH_SRV scope on the Batch entity unverified (only the Create Batch Text POST was seen).
- `cds:I_MRPMaterial` — NO OFFICIAL PAGE names the view (21 On-Premise / 8 Public Cloud results, all about the OData entity `A_MRPMaterial` of API_MRP_MATERIALS_SRV_01; Simplification List 2025 FPS01 p. 604 read, no occurrence). Documented MRP-parameter views: `I_ProductMRPArea` (Released, loio `aac8ab3626db4020bd4fae921e203515`), `I_PRODUCTPLANTMRP` (loio `b4fead8797184f348b28738097c73ba6`), Cloud `I_PRODUCTPLANTSUPPLYPLANNING`. Written without an authored status (evidence level stays `sap_official_verified` on the negative-finding records, so the block still shows the enrichment-derived pill; the notes disclose that). `data/cds-enrichment.ts#I_MRPMaterial` sources are template strings with em dashes; perfNotes cites F0247 while the dataset id is F0247A; `C_MaterialCoverageNetwork` and `C_MRPMaterials` unverified.
- `cds:I_MaterialStock` — snippet shows "View type Interface" + "Dimension" but no Release Status; `released_api_available` rests on the What's New 2022 IAM list (DDLS + BDEF "Material Stock Calculation"). `data/cds-map.ts` consumption view `C_MaterialStock` and app "Manage Stock" vs official `C_MaterialStockActual` / `C_MaterialStockByKeyDate`; MCHB link marked needs-verification in BASELINE.md and MCHB is not a universe id. `I_MaterialStock_2` (Interface Cube, New in 2022) is not declared a successor by any record. Validator trap: the Hebrew word "למלאי" matches `PLACEHOLDER_RE` ("למלא"); write "בתחום המלאי" / "של מלאי" instead.
- Cross-cutting — every one of the 13 views is marked "verified" in `data/cds-enrichment.ts` with templated sources and no URL; eight now carry official evidence contradicting the viewType (Composite vs Basic/Dimension) or the field/association names, and three (I_Routing, I_RoutingOperation, I_MRPMaterial) have no official page at all. `data/cds-map.ts` tags every production view PP-PI while the official records place them under Discrete Manufacturing. Both files are outside this overlay's write scope; align them in a separate data pass.

---

# Batch 3 · 2026-09-15 (PP-PI / PM master data, work center, routing and status views)

13 drafts audited. **11 written** into `data/verification/cds.ts` (10 from their auditors'
`fixedRecord`; `cds:I_ProductPlantIntlTrd` had no `fixedRecord` and was re-derived from the
researcher's draft with all seven listed downgrades applied). **2 refuted** at the gate and
NOT written (below). Writer policy as in batches 1 and 2: `accessedAt` / `lastVerifiedAt`
stamped 2026-09-15 (`DATE15`, added next to DATE2/DATE14); no `reviewer` field on any record
(zero of the 26 pre-existing records carry one, and five of the eleven auditors asked for it
explicitly); every non-null `status.source` hoisted into a named `Evidence` const, because the
file had 21 hoisted consts and zero inline duplicates before this batch
(PRODVALUATION_VDM_2023, PRODUCT_UOM_VDM_2023, PRODDESC_VDM_2023, PRODPLANT_INTLTRD_VDM_2023,
WORKCENTER_CAPACITY_VDM_2023, WORKCENTER_TEXT_VDM_2023, EQUIP_TIMESEG_VDM_CLOUD_2608,
MAINTNOTIF_ACTYDATA_VDM_2023). The catalog was already graduated in batch 1, so
`test/evidence-schema.test.ts` needed no change.

Three writer-side wordings deviate from the verdicts, each to avoid shipping a statement the
repository contradicts; all three are disclosed in the records themselves:

1. "כדי לשמור על ארבע ראיות" / "(מגבלת ארבע ראיות)" in the notes of `cds:I_ProductUnitOfMeasure`,
   `cds:I_WorkCenterText` and `cds:I_ProductPlantIntlTrd` became "לא נכללו כראיה נפרדת". The
   `cds:I_ProductValuation` auditor established that the four-evidence cap is not a repo rule
   (`Evidence[]` has no cap); leaving the phrase would have shipped a false rule claim, and the
   same batch registers six evidence entries on one record.
2. `cds:I_ProductPlantIntlTrd` BASELINE wording. The auditor asked for "שלוש סתירות טבלה מול
   טבלה" in BASELINE.md. Measured: `audit/s4-enrichment/baseline-inventories.json` labels
   exactly **two** as "outright base-table conflicts" (I_BillOfMaterialItemAssgmt MAPL vs MAST,
   I_ProductPlantIntlTrd MLAN vs MARC) inside a list of 8 views whose enrichment text
   contradicts or omits map tables. The record now names both files, the 8-view list and the
   2-conflict subset, so every number is checkable. (`cds:I_BillOfMaterialItemAssgmt` keeps its
   "אחת משתי סתירות" wording — it cites `baseline-inventories.json`, where that count is verbatim.)
3. `cds:I_WorkCenterText` notes: the sentence "tx:IR02 ו-tx:IR03 … אין להם דף באפליקציה" was
   replaced. Measured: both codes resolve in `lib/route-manifest.generated.ts`, which is the
   mirror of `app/tcode/[code]`'s `generateStaticParams`, so pages DO exist. This is the same
   defect the `cds:I_ObjectStatus` auditor proved. The wrong wording is inherited from
   `data/verification/tables.ts` (`table:CRHD` line 2098, `table:CRTX` line 2206) and is flagged
   in both new records for correction there; those two records are outside this overlay's scope.

Gates after the merge: `tsc --noEmit` exit 0; `tsc --noEmit -p tsconfig.test.json` exit 0;
`npm test` 201/201 pass (all 14 schema rules, no dangling xref, graduated-repoRef test);
`npm run report:coverage -- --catalog cds` 39 rows, L5 17→23, L2 5→9, L3 15→5, verified 38→37,
verification_required 1→2, s4-applicable 34→30, edition-specific 9→13. The three drops are the
honest ones: `cds:I_BillOfMaterialItemAssgmt` now resolves at level `verification_required`
(all four evidence items are), and four records author `status: verification_required`, which
`coverageOf` excludes from `s4Applicable`.

## refuted

- `cds:I_MfgOrderComponent` — **primary refutation: a negative finding that the record's own cited page disproves.** The draft says in three places (status.recommendedAction, gaps[2], notes) that the quantity fields `RequiredQuantity` / `WithdrawnQuantity` were not found in any VDM snippet and belong to the OData entities only. Measured against the draft's own evidence[1] (`I_MfgOrderComponentWithStatus`, loio `775ef9dc39f848348e7b2a4930f4dced`): the snippet returns "BaseUnit Base Unit of Measure RequiredQuantity Requirement Quantity WithdrawnQuantity Withdrawn Quantity ConfirmedAvailableQuantity Available Quantity … WithdrawnQuantityAmount Value Withdrawn", and the VDM page for `I_ProductionOrderComponent` (loio `fdbbfc2cda1e4c12bff09946e22ed8cb`) returns the same pair. Both are VDM views. Secondary: `status.he` asserts "I_ProductionOrderComponent (Fact, הזמנת ייצור בדידה)" and recommendedAction recommends that view, but no evidence entry in the record cites its page (the fact is true and that loio is already cited by the existing `cds:I_ProductionOrderComponent` record in `data/verification/cds.ts`, at line 2275 after this batch); the summary claims three help.sap.com records "verify" a negative at official tier, which three pages about other views cannot do; the summary misreads the resolved tier (`levelOfEvidence` takes the MAX, so three `sap_official_verified` items resolve the record to `sap_official_verified` — only `needsVerification` flips, via `lib/evidence/resolve.ts:196`); house style breach (`reviewer: "neo-s4-enrichment/cds"` — zero occurrences in the overlays); one notes quote about a Cloud snippet fragment ("Manufacturing Order Item" after `I_MfgOrderOperationComponent`) could not be reproduced; and `evidence[3].repoRef` points only at `data/cds-map.ts` while half the claim describes `data/cds-enrichment.ts:336`. **What unlocks a rewrite:** drop the false negative finding and state the opposite (the two quantity fields ARE in VDM snippets, naming which view each came from); register the `I_ProductionOrderComponent` VDM page as its own evidence before status.he or recommendedAction leans on it; split the repository evidence into a cds-map entry and a cds-enrichment entry, each with its own repoRef; drop `reviewer`; restate the tier correctly.
- `cds:I_ProductSalesData` — **fatal: the record has no `status` block at all.** `lib/evidence/resolve.ts#evidenceBlock` does `status = pickStatus(rec?.status, derived)` and `level = evidence.length ? levelOf(evidence) : derivedLevel(status)`, so with no authored status the page would render the DERIVED claim `s4_native` ("חדש ב-S/4HANA") next to level `sap_official_verified` — for a view name that not one official record names. The draft's own notes admit this and do nothing about it. The house pattern for exactly this case is an authored `status: "verification_required"` with `release: null, source: null` (`data/verification/cds.ts` at `cds:I_MaintenanceOrder`, `cds:I_RoutingOperation`, and two more). Second refutation: gap #8 claims the MATMAS IDoc page (loio `5f1d9c221c1841e0b202c5536fc1fa87`) lists "E1MARAM, E1MARA1, E1MAKTM, E1MARCM ו-E1MARMM בלבד". Re-pulled: one snippet window of that loio reads "MATMAS IDoc Technical name: MATMAS05 … E1MVKEM Master material sales data (MVKE) E1MLANM … E1MTXHM …", another adds E1MBEWM and E1MLGNM, and `data/verification/idocs.ts` (committed, `sap_official_verified`, same loio) already records E1MVKEM. The exclusion of `idoc:basic:MATMAS05` therefore rests on a false premise — that id exists in the registry (`data/verification/idocs.ts:26`) and `cds:I_Product` already xrefs it. Also: gap #4 writes a non-existent table token "MVHE"; `evidence[0].claim` closes an `sap_official_verified` claim with "כלומר בגרעיניות המפתח של MVKE", which no cited source states (the key is only in `data/table-enrichment.ts#MVKE`, i.e. repository tier); the exact-name search count is not reproducible (claimed 7 results incl. "Product Master A2X"; re-run returns 5, without it — the negative finding itself IS reproducible); the official topic literally titled "Product Sales Data" (APIs for Product Lifecycle Management, 2025.001, loio `f8d07ba126fd422aa276fbe621e3cb21`), which is the best explanation of where the project's name came from, is missing; and `evidence[2]` presents a Consolidation/Mass-Processing extensibility page as generic S/4HANA documentation while joining two separate snippet windows into one table-row sequence. **What unlocks a rewrite:** author `status: "verification_required"` with `release: null, source: null`; delete or correct the MATMAS segment gap and add `idoc:basic:MATMAS05` to xrefs; fix "MVHE"; move the MVKE key statement to the repository evidence; re-run and restate the search counts; register the "Product Sales Data" API topic; scope the extensibility claim to what the page says.

## conflicts

- `cds:I_ProductValuation` — LIFECYCLE SPLIT BETWEEN EDITIONS, deliberately not resolved. The same loio `8714b71e39c74e5282995db629c8749c` reads "Status Released" in On-Premise 2023.latest and "Status Deprecated … switch to the following successor CDS view immediately: I_ProductValuationBasic" in Cloud Public Edition 2608.500. Written `s4_native` with an explicit lifecycle warning, following the `cds:I_ProductPlant` precedent, because `I_ProductValuationBasic` is not in the universe (no `data/cds-map.ts` row) and `deprecated` would fail rule 3. The successor's own On-Premise VDM topic (loio `77706ca5eeff454fb20c3464fd3799b7`) IS registered as evidence but shows no Status line, so the successor's release state is undecided. Also unverified: the consumption layer `C_ProductValuation` (the string appears only as an extension entity on the App Extensibility page, never as a VDM view); the enrichment's viewType "Interface (Composite)" contradicts the official "This CDS view is a basic view"; no Fiori id exists for "Manage Material Valuations" (20 ids in `data/fiori/apps.ts`, none for material valuation). The On-Premise VDM topic is indexed under 2023.latest only.
- `cds:I_ProductUnitOfMeasure` — NAME DECIDED, PROJECT ID LEFT ALONE. The batch-2 open item ("plural vs singular, undecided") is decided here for the plural: the VDM topic in both scopes, the Cloud "CDS Views for Product Master" list page and the on-prem 2025.001 data-quality cube association all print `I_ProductUnitsOfMeasure`. The singular is documented only as the OData entity `ProductUnitOfMeasure` and as the different views `I_ProductUnitOfMeasureEAN`, `I_ProductUnitOfMeasureTP_2`, `I_ProductUnitOfMeasureEANTP_2` and `I_ProdUnitOfMeasureTextBasic`. The record keeps the project id and adds the official name as an alias; renaming `data/cds-map.ts` / `data/cds-enrichment.ts` is a separate data pass. Quote-fidelity note applied: the purpose sentence "Provides the information about Units of Measure of Product to the customer" is verbatim only in the Cloud records; the On-Premise snippet truncates it. F1602 absent from `data/fiori/apps.ts`, so no Fiori xref.
- `cds:I_ProductDescription` — the On-Premise VDM topic is indexed at 2023.latest only; in the Cloud set the same loio returns at 2602.500 but not at 2608.500, where the search returns `I_ProductDescriptionTP_2` and `I_ProductVH_2` instead. `I_ProductDescriptionTP_2` is NOT a successor: its own snippet says "For read scenario, Kindly use the CDS view Product Descriptions (I_ProductDescription)." The `cds:I_Product` text-view drift (I_ProductDescription on-prem 2023 vs `I_ProductText` in Cloud 2608.500) stays open. `C_ProductMaster` (cds-map consumption layer) appears in no official record. Enrichment viewType "Interface (Basic)" vs official Data Category "Dimension" — neither confirmed nor denied, the official page names no view type.
- `cds:I_ProductPlantIntlTrd` — BASE TABLE UNRESOLVED: `data/cds-map.ts` says MLAN, `data/cds-enrichment.ts` says the foreign-trade fields in MARC. Both tables are xrefed so the conflict is navigable; no official record names a base table for this view. The only official hint is the App Extensibility row ending "PLNT_INCL_EEW_PS MARC NA", and the record states explicitly that reading MARC off it is a column-order inference, not a source statement. METHOD NOTE recorded in the record: help.sap.com's search service returns highlight fragments joined by ellipsis, so row adjacency inside a list-page snippet proves nothing about deprecation — the not-deprecated verdict rests on the dedicated VDM topic in both scopes, not on the Cloud list page. The OData entity name differs across four official topics (`A_ProductPlantIntlTrade`, `A_ProductPlantIntlTrd`, `ProductPlantInternationalTrade`, `ProdPlantInternationalTrade`), so entity attributes are not evidence for the view's field names. Module tag PP-PI vs the official product-master role/catalog.
- `cds:I_RoutingOperationComponent` — NO OFFICIAL PAGE names the view (13 query variants, On-Premise default + 2025.001, Public Cloud; exact-name search returns 11 on-prem records with empty snippets, seven API-guide topics plus four unrelated Malaysia localization topics, and 16 Public Cloud API-guide records). The documented view for the same content is `I_ProdnRoutingCompAllocDEX` (VDM 2023.latest; What's New 2025 "New CDS Views Released for Basic Routing Data"), which is not a project id, so no successor. Written with an authored `verification_required` (edition on-premise, release null, source null). Enrichment/base-table separation between PLMZ (component assignments) and PLAS (operation-to-sequence assignments) is still undocumented in the enrichment text.
- `cds:I_BillOfMaterialItemAssgmt` — NO OFFICIAL PAGE names the view, and the two repository layers disagree on its meaning: `data/cds-map.ts` (MAPL, "שיוך רשימת פעולות לחומר") vs `data/cds-enrichment.ts` (MAST throughout). Official coverage exists on both sides under other names: `I_MaterialBOMLink` (Material Link for Bill of Material, Basic / Released) for the MAST side, `I_MfgBOOMaterialAssignment` + `I_MfgBOOMaterialAssgmtChgSt` (table MAPL, Released) for the MAPL side; a third routing-side topic, "Production Routing Material Assignment" (loio `81c41224038545279b9ddb5d331d057c`), names neither a technical name nor a table and was not cited. None of them is a project id, so no successor and no `replaced` status. **Written with NO authored status on purpose** (the auditor's explicit instruction): all four evidence items are `verification_required`, so the block renders the needs-verification state instead of the enrichment's "verified". The Hebrew name is undecided as a consequence. F1813 absent from `data/fiori/apps.ts`.
- `cds:I_WorkCenterCapacity` — the enrichment places the view over KAKO; the official VDM page says it returns the capacities assigned to a work center from **CRCA**, and KAKO belongs to the separate `I_Capacity` view. The archiving page (PP_WKC) corroborates the CRCA/KAKO split but says nothing about CDS views, and the record marks that tie-up as its own inference. Enrichment viewType "Interface (Basic)" vs official "View Type Basic, Dimension"; `CapacityCategory` / `CapacityActiveVersion` and the associations `_WorkCenter` / `_CapacityCategory` unverified; KAZT unverified as a direct source. `cds:I_Capacity` and `cds:I_CapacityText` are NOT in the universe, so both stay prose-only (never xrefs). `C_WorkCenterCapacity` found in no official record; "Monitor Capacity Utilization" has no app id, and F3289/F3951 are repository-only links. VDM topic indexed at 2023.latest only.
- `cds:I_WorkCenterText` — module tag PM only in `data/cds-map.ts` vs the official application component PP-VDM / Production Engineering; enrichment viewType "Interface (Basic)" vs official "View Type Basic, Text"; the enrichment key "WorkCenter + Language" does not match the official attributes (object type + internal ID + language). CRTX is NOT named by any official snippet — the tie is repository inference plus structural match, as already recorded in `table:CRTX`. Sister view `I_WorkCenterTextBySemanticKey` (loio `d57a2aef115541f98048607053d67787`) is real and its technical name IS in the snippet, but it is absent from `lib/route-manifest.generated.ts`, so it is named in prose and not xrefed; its own record is a separate task. F6175 absent from `data/fiori/apps.ts`. VDM topic indexed at 2023.latest only; 2025 existence rests on the What's New page at 2025.000.
- `cds:I_EquipmentTimeSegment` — NAME MISMATCH unresolved: the only official topic is the Cloud Public Edition VDM page (2602.500 / 2608.500), and it prints `I_EQUIPMENTTIMESEG`, not `I_EquipmentTimeSegment`. The same booklet prints some names in mixed case and others in upper case, so the casing cannot be inferred — only that the string differs. `I_EQUIPMENTTIMESEG` is therefore NOT registered as an alias and NOT treated as a successor. Status authored `verification_required` with `edition: public-cloud`, `release: 2608.500` (the one scope that has a page). No On-Premise VDM topic exists; the nearest is `I_EquipmentData`, which by its own Constraints returns only the last valid equipment version of a day. Fiori id drift recorded: `data/sapData.pm.ts` (EQUZ) says Manage Technical Objects F2079, `data/fiori/apps.ts` says F2730A; neither checked against the Fiori library, so no Fiori xref.
- `cds:I_MaintNotifActivity` — NO OFFICIAL PAGE names the view. Documented instead: `I_MaintNotificationActyData` (Fact / Released, BW DataSource) and `I_MaintNotifItemActivityTP_3` (Developer Extensibility 2025, replacing TP_2 which the same page marks Deprecated); SAP also keeps activities, tasks and causes in three separate views (`I_MaintNotificationTaskData`, `I_MaintNotificationCauseData`) while `data/cds-map.ts` folds them into one row titled "פעולות/משימות בהודעה". Base-table conflict inside the repo: enrichment says QMSM (tasks), map says QMMA + QMSM + QMUR; the archiving page PM_QMEL settles the TABLE meanings (QMMA activities, QMSM tasks, QMUR causes) but not the view's base table, and the record says so explicitly rather than instructing the reader. Authored `verification_required` with edition on-premise and release 2023.latest (bounded by the `I_MaintNotificationActyData` page). IW65 comes from the official page; IW22/IW66/IW67/IW69 are repository-layer xrefs.
- `cds:I_ObjectStatus` — NO OFFICIAL PAGE names the view (15 On-Premise + 1 Public Cloud query; the exact-name search returns 21 unrelated on-prem records — Real Estate data migration with the migration object `S_OBJECTSTATUS`, empty-snippet Malaysia localization topics, and reinsurance topics — and 2 Public Cloud APIs-for-Warehousing records). Documented status views: `I_ManufacturingOrderStatus` (Fact), `I_MfgOrderWithStatus` (JEST + AUFK/AFKO) and `I_MfgOrderOperationWithStatus` (JEST + AFVC/AFVV/AFVU); a fourth sibling, `I_MfgOrderComponentWithStatus`, has a snippet truncated before its table list, so the record says "two views observed" rather than "two views exist". None is a project id → no successor. Authored `verification_required` (release null, source null). Repo conflicts kept open: map says JEST + JSTO, enrichment text says JEST only; enrichment viewType "Interface (Basic)" vs the three official categories; the enrichment's T-code "BSVX" is not in the dataset transaction manifest and was not verified. `AFVV` / `AFVU` are not universe ids and stay out of xrefs. `api.sap.com/cdsviews/I_ObjectStatus` returns a 666-byte login shell identical in size to a control path for a nonexistent view, so it is evidence for nothing.
- Cross-cutting (batch 3) — all 11 views are marked "verified" in `data/cds-enrichment.ts` with templated sources and no URL. Five of them now carry an authored `verification_required` because no official page names the project's view name at all (I_RoutingOperationComponent, I_EquipmentTimeSegment, I_MaintNotifActivity, I_ObjectStatus) or because every evidence item is `verification_required` (I_BillOfMaterialItemAssgmt, no authored status). Six carry official evidence that contradicts the enrichment's `viewType`: Composite/Basic vs the official "basic view" (I_ProductValuation), "Basic, Dimension" (I_WorkCenterCapacity), "Basic, Text" (I_WorkCenterText) or "Dimension" (I_ProductDescription, I_ProductUnitOfMeasure, I_EquipmentTimeSegment). `data/cds-map.ts` tags eight of the eleven PP-PI while the official records place them under product master or Production Engineering. Both files are outside this overlay's write scope; align them in a separate data pass. Cosmetic inconsistency inherited from the audited drafts and left as written: the enrichment source labels are quoted with an em dash in `cds:I_BillOfMaterialItemAssgmt` (matching the file byte for byte) and with a hyphen in the other records.

---

# Batch 4 · 2026-09-22 (re-research of the two batch-3 refutations)

2 drafts audited, **2 written** into `data/verification/cds.ts` (`DATE22`), 0 refuted. Neither
verdict carried a `fixedRecord`; both records were re-derived from the researchers' drafts with
every listed downgrade applied. `status.source` of `cds:I_MfgOrderComponent` is hoisted into
`MFGORDERCOMP_WITHSTATUS_VDM_2023` (house style). No `reviewer` field. The catalog was already
graduated, so `test/evidence-schema.test.ts` needed no change.

Writer-side deviations, both disclosed here:

1. `cds:I_ProductSalesData` evidence[0] tail "ולכן הספירה נכונה לתאריך הגישה בלבד" and the notes
   phrase "ספירות החיפוש ברשומה נכונות להרצה ב-2026-09-22 בלבד" were reworded ("מספר התוצאות
   והרכבן משתנים בין הרצות, גם באותו תאריך" / "אינן יציבות בין הרצות"). The auditor's same-day
   re-runs disproved both, and the verdict says only the negative finding is reproducible.
2. The `gaps` downgrade for `cds:I_ProductSalesData` has no target: `VerificationRecord` has no
   `gaps` field and the draft carried none. The intent (counts 5 to 7, titles vary) is in the notes.

Gates: `tsc --noEmit` 0; `tsc -p tsconfig.test.json` 0; `npm test` 212/212;
`report:coverage --catalog cds` 39 rows, L2 9→11, L3 5→3, s4-applicable 30→28 (both records author
`verification_required`, which `coverageOf` excludes), verified 37 and verif.req 2 unchanged.

## refuted

- (none in this batch.)

## conflicts

- `cds:I_MfgOrderComponent` — NO OFFICIAL PAGE names the bare view (about 12 query variants, On-Premise default / 2025.001 / 2022.latest, Public Cloud). Documented siblings: `I_MfgOrderComponentWithStatus` (loio `775ef9dc39f848348e7b2a4930f4dced`, New in 2023), `I_MfgOrderOperationComponent` (loio `d821563df8ef4ecb9a5fedc2bacda6fe`, Dimension), `I_MfgOrderComponentLongText` (loio `701eda41fac8429e939290e3a2a401f9`); none is in the id universe, so none is an xref. Enrichment key, associations and the AFFH mapping are unsupported; module tag PP-PI neither supported nor refuted. Needs SE11 / ADT / View Browser.
- `cds:I_ProductSalesData` — NO OFFICIAL PAGE names the view (8 variants, both scopes); search counts are unstable (5 to 7 on-prem, varying titles), only the negative finding reproduces. Documented neighbour `I_ProductSalesDelivery` (loio `dede052460194546a9ac1ceb4a983738`) has no `data/cds-map.ts` row; adding one would make it xref-able. `data/cds-map.ts` module tag PP-PI and the Fiori-id-less "Manage Product Master Data" remain repository drift. Needs a VDM topic, a read api.sap.com cdsviews page, or a live system check.

---

# Batch 5 · 2026-09-24 (re-verification of four verification_required views)

4 drafts audited, **4 written** into `data/verification/cds.ts` (`DATE24`), 0 refuted. All four
ids already existed, so each was merged in place over its own record (no new id, no duplicate).
`cds:I_ProductSalesData` was written from its auditor's `fixedRecord` (status.he reworded, one
re-verification paragraph appended with the auditor's count downgrade already applied). The other
three verdicts carried no `fixedRecord`; they were re-derived from the researchers' drafts with
every listed downgrade applied:

- `cds:I_MfgOrderComponent`: only `lastVerifiedAt` and one appended notes sentence changed;
  `status.source` and evidence[0] stay the `MFGORDERCOMP_WITHSTATUS_VDM_2023` const and every
  `accessedAt` stays `DATE22`. The optional downgrade (single quotes around both queries) was applied.
- `cds:I_Routing`: evidence[0] re-stamped `DATE24` (body of loio 8c9e297f read through
  `scripts/sap-help-body.mjs`; Public Cloud exact-name search Old → New, 2 records on 2026-09-14,
  0 on 2026-09-24); two new `verification_required` search rows (loio 8573b810, loio 32d6ac68);
  the three 2026-09-14 rows keep `DATE14`. The optional header-comment line was added, since this
  record is now the one exception to the header's "body text is never quoted (JS shell)".
- `cds:I_RoutingOperation`: one new 2026-09-24 negative-search row (`DATE24`) that lists the hit
  count of every query (5, 21, 21; HOUSE-RULES §3.3) and names the PM views without the misleading
  "Maintenance Task List Operation:" label; the notes paragraph was reworded the same way.

Every earlier finding, evidence row, status and xref is kept (history rule 8). A structural diff
against HEAD shows the other 35 records deep-equal. No `reviewer` field. The catalog was already
graduated, so `test/evidence-schema.test.ts` needed no change.

Gates: `tsc --noEmit` 0; `tsc -p tsconfig.test.json` 0; `npm test` 211/211;
`report:coverage --catalog cds` unchanged at 39 rows (L2 11, L3 3, L4 2, L5 23, verified 37,
verif.req 2, s4-applicable 28): all four records stay at `verification_required`.

## refuted

- (none in this batch.)

## conflicts

- `cds:I_Routing`: still no official page names the view (four more queries on 2026-09-24, On-Premise and Public Cloud). The Public Cloud exact-name result went from 2 records to 0 between runs, so that count depends on the index state. The batch 2 items stand.
- `cds:I_RoutingOperation`: same negative finding on 2026-09-24 (three queries). The repository drift noted in batch 2 (`data/domain-detail.ts` and `data/transactions.ts` write "I_RoutingHeader / I_RoutingOperation") was not re-checked this round.
- `cds:I_MfgOrderComponent`: evidence[2] attributes "Application Component PP-VDM (Virtual Data Model in PP) Valid as Of SAP S/4HANA 2023" and "CDS View New BJ5 BJ8 PP-PI-POR PP-SFC PP-VDM" to the snippet; the auditor found both strings in the page body (`scripts/sap-help-body.mjs`, 2026-09-24). The claim is supported and was left worded as a snippet claim; a later pass may cite the body instead.
- `cds:I_ProductSalesData`: the exact-name hit count keeps moving (6 in two auditor runs on 2026-09-24, 7 in earlier runs, varying titles), so the record gives a range, not a number. The batch 4 items stand.

---

# Batch 6 · 2026-09-24 (re-verification of I_WorkCenter, I_ProductionOrderOperation, I_MaintenanceOrder, I_MaintenanceNotification)

4 drafts audited, **4 written** into `data/verification/cds.ts` (`DATE24`), 0 refuted. All four
ids already existed, so each was merged in place over its own record (no new id, no duplicate).
`cds:I_ProductionOrderOperation` was written from its auditor's `fixedRecord` (one new
APIs-for-Manufacturing row after the Manufacturing Order Operation row, status.he tail extended,
release `2023.latest` and source `PRODORDER_OPERATION_VDM_2023` kept, notes appended). The other
three had no `fixedRecord` and were re-derived from the drafts with every listed downgrade applied:

- `cds:I_WorkCenter`: the snippet-only duplicate row was dropped; the body claim (em dash and
  "סוג ותקן שכר עובד" fixed) now lives in the shared const `WORKCENTER_VDM_2023` (`DATE24`), which
  is both evidence[0] and `status.source`; status.he separates the Purpose questions from the
  attribute list and restores the plant-maintenance sentence; the F6175 row lists On-Premise,
  Private Cloud and Public Cloud releases separately; OData V2/V4 labels replaced by the printed
  paths; the 2026-09-14 notes are kept and the re-check is appended after a blank line.
- `cds:I_MaintenanceOrder`: the five preserved rows keep `DATE2`; two new rows (`DATE24`): the
  2026-09-24 negative-search row with hit counts, and the What's New 2025 FPS01 body row (loio
  `d118d076`). Terminology אחזקה → תחזוקה across the record, as the draft and verdict agreed.
- `cds:I_MaintenanceNotification`: evidence[1] stays the const `MAINT_MGMT_DEVEXT_WN2025_NOTIF`;
  the other three rows re-stamped `DATE24`; the Old/New field-list detail and the auditor's
  OData-type correction are in the notes.

Writer-side deviations, all disclosed in the records:

1. `cds:I_WorkCenter` content kept where the draft shortened it: the What's New 2025 row and the
   repository row keep their full 2026-09-14 claims plus the draft's additions (the re-check
   sentence; the two qualifiers "סותר את 'View Type Basic, Dimension' הרשמי" and "שלא אומתו
   במקור רשמי"). The repository row was re-read locally before its `DATE24` stamp
   (`data/cds-map.ts:23`, `data/cds-enrichment.ts` I_WorkCenter, `data/transactions.ts`,
   `data/domain-detail.ts`).
2. `cds:I_WorkCenter` PDF row (What's New 2023 SPS04) left at `DATE14` with its full claim: the
   draft re-stamped it `DATE24` with a shorter claim, but no re-read of the PDF is recorded.
3. `cds:I_WorkCenter` old notes kept verbatim except one terminology fix ("בהזמנת אחזקה" →
   "בהזמנת תחזוקה", the precedent the I_MaintenanceOrder auditor accepted). The V2/V4 inference was
   also removed from the appended notes paragraph, not only from evidence and recommendedAction.
   In recommendedAction "מפרט מאפיינים עסקיים בלבד וללא שמות שדה טכניים" became "מפרט מאפיינים
   עסקיים ואינו נוקב בשמות שדה טכניים", and the 2026-09-14 reason "והתצוגה עודכנה בתוספות שדות
   ב-2023 SPS04" was kept.
4. `gaps` (I_WorkCenter, I_MaintenanceNotification) is not a `VerificationRecord` field. Its
   content is in the notes: the auditor's gaps[3] rewrite is item (6) of the I_MaintenanceNotification
   notes; the I_WorkCenter open items quoted by the verdict are in the appended paragraph.

Gates: `tsc --noEmit` 0; `tsc -p tsconfig.test.json` 0; `npm test` 211/211;
`report:coverage --catalog cds` unchanged at 39 rows (L2 11, L3 3, L4 2, L5 23, verified 37,
verif.req 2, s4-applicable 28, edition-specific 13), and the per-id rows of all 39 ids match the
pre-merge run. A structural diff against HEAD shows the other 35 records deep-equal. No `reviewer`
field. The catalog was already graduated, so `test/evidence-schema.test.ts` needed no change.

## refuted

- (none in this batch.)

## conflicts

- `cds:I_WorkCenter`: the Composite-vs-Basic conflict with `data/cds-enrichment.ts` stands, now against a body read (loio `c90e05a792674f7d8bbae247c5200999`). The body names no technical field, association or source table, so CRTX/CRCA/KAKO stay repository mapping. F6175 (Manage Work Centers, PP-BD-WKC, OData UI_WORKCENTERS) is in the Fiori library but not in `data/fiori/apps.ts`, and nothing shows that it reads I_WorkCenter. Depth stays L3: `tx:IR02` and `tx:IR03` are in `lib/route-manifest.generated.ts` (so `dangling-xref` passes) but `txHref` in `components/neo-shell/reference/ref-links.ts` returns null for both, and `resolvesInApp` feeds depth. That drift predates this batch and belongs to the transactions catalog, not to this overlay.
- `cds:I_ProductionOrderOperation`: the documented name is still `I_ProductionOrderOperation_2`. The new row (loio `b23319e138664f8b85a1a26de7ef3fed`, snippet only, body not read) names the OData entity `A_ProductionOrderOperation_2` and the extensibility data source `I_PRODUCTIONORDEROPERATIONTP`; how that TP view relates to the VDM views is open. The batch 2 items stand.
- `cds:I_MaintenanceOrder`: the negative finding held for six more queries (On-Premise across versions, Public Cloud 2608.500) and for the 2025 FPS01 What's New body, which lists only new and changed views and so settles nothing about an older view. `I_MaintenanceOrderBasic` (Public Cloud) is carried from 2026-09-02/05; no 2026-09-24 result set prints it. The `pm-generated.ts` trust-label item from batch 1 stands.
- `cds:I_MaintenanceNotification`: `status.source` moved from `MAINT_MGMT_DEVEXT_WN2025_NOTIF` to `null` (valid for `verification_required`, disclosed Old → New). The F1511 `API_MAINTENANCENOTIFICATION` vs official `API_MAINTNOTIFICATION` drift remains for the Fiori catalog; the 2025.001 Extensibility snippet spells the entity `A_MAINTENANCENOTIFICATION`.
