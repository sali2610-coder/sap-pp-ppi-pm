# Research queue · objects catalog (S/4HANA enrichment)

Kept by the single writer for `data/verification/objects.ts` (export `OBJECT_VERIFICATION`;
the `OBJECT_REGISTRY` groupings live in the same file). One line per id that was refuted or
deferred at the adversarial-verification gate, and one entry per repository-vs-official
discrepancy that a written record surfaced in a file this pipeline does not own.

Batch 1 written 2026-09-24 (access date stamped 2026-09-24, const `DATE24`): 4 drafts audited,
4 written, 0 refuted. `obj:material-document`, `obj:maintenance-notification`,
`obj:maintenance-order` and `obj:process-order` superseded their seed records; each was written
from its auditor's `fixedRecord`, and a round-trip check (module import, deep-equal against the
audited JSON) confirmed every field. Writer changes, nothing else: `status.source` is the
hoisted evidence const (house style) instead of the pointer string or copy in the verdict (for
`obj:process-order` the verdict's copy of the F4587 row carried the claim 'ראו evidence[2]'; the
record now points at the row itself); dates use the file's constants (`DATE`, `SEED_DATE`,
`DATE24`); the `reviewer: "sali2610@gmail.com"` field of the process-order draft was dropped
(no overlay record in `data/verification/**` carries one, and no human sign-off happened).
Registry members were not changed. No new SAP lookups were run by the writer. The catalog left
the repository-only foundation guard in `test/evidence-schema.test.ts` in the same change: it
was the last catalog under that guard, so the guard was removed and `OBJECT_VERIFICATION` joined
the graduated repoRef test. Coverage (`npm run report:coverage -- --catalog objects`): before 16
records, L2 16, verified 16, S/4-applicable 0; after 16 records, L2 12 / L5 4, verified 16,
S/4-applicable 4 (the four records above, all `sap_official_verified`). Gates: `tsc --noEmit`,
`tsc --noEmit -p tsconfig.test.json` and `npm test` (211/211) green.

Batch 2 written 2026-09-24 (const `DATE24`): 4 drafts audited, 4 written, 0 refuted.
`obj:batch`, `obj:maintenance-plan`, `obj:equipment` and `obj:functional-location` superseded
their seed records. `obj:equipment` and `obj:functional-location` are their auditors'
`fixedRecord`; `obj:batch` and `obj:maintenance-plan` (no fixedRecord) are the researcher drafts
with every listed downgrade applied (batch: 'אובייקט עסקי' instead of 'סוג אובייקט עסקי' in
`status.he`, the Reference Objects wording in `recommendedAction`, the notes sentence on the
registry, and the optional repository product 'SAP ECC / SAP S/4HANA'; maintenance-plan: the
What's New 2023 FPS01 wording for W0026 in `recommendedAction`, and the restored seed row kept at
`SEED_DATE` with its claim byte-identical). A round-trip check (module import, deep-equal against
the audited JSON with those downgrades applied; the 12 untouched records and the 15 untouched
registry entries deep-equal their previous state) confirmed every field. Writer changes, nothing
else: `status.source` is the hoisted evidence const (`BATCH_F2462_FAL`, `MPLAN_F5325_FAL`,
`FLOC_DEF_S4_2025`); dates use the file's constants; the `reviewer` field of the maintenance-plan
draft was dropped (no overlay record carries one, and no human sign-off happened). One registry
change, ordered by the batch verdict: the `obj:batch` member `fiori:F1576` became `fiori:F2462`.
No new SAP lookups were run by the writer. `obj:equipment` carries no authored status (it stays
`verification_required`): no official record read so far states the S/4HANA status of the
equipment object as a whole; the method that settled `obj:functional-location` (the Technical
Objects definition page read in both SAP_S4HANA_ON-PREMISE and SAP_ERP) is a possible next lead.
Coverage (`npm run report:coverage -- --catalog objects`): before 16 records, L2 12 / L5 4,
verified 16, S/4-applicable 4; after 16 records, L2 9 / L5 7, verified 16, S/4-applicable 7
(batch, maintenance-plan and functional-location at L5; equipment at L2). Gates: `tsc --noEmit`,
`tsc --noEmit -p tsconfig.test.json` and `npm test` (211/211) green.

Batch 3 written 2026-09-24 (const `DATE24`): 4 drafts audited, 4 written, 0 refuted.
`obj:measuring-point`, `obj:maintenance-task-list`, `obj:reservation` and `obj:planned-order`
superseded their seed records. `obj:reservation` is its auditor's `fixedRecord`; the other three are
the researcher drafts with every listed downgrade applied (measuring-point: 'ליצור נקודות מדידה
ב-IK01 ולרשום מסמכי מדידה ב-IK11' in `recommendedAction`, matching the repository descriptions
'Create Measuring Point' and 'Create Measurement Document'; maintenance-task-list: the optional
release '2025 FPS01' on the Simplification List row, as in `obj:batch` and `enhancements.ts`;
planned-order: no downgrades listed). Writer changes: `status.source` is the hoisted evidence const
(`MPOINT_DEF_S4_2025`, `TASKLIST_F2660_FAL`, `RESV_F4839_FAL`, `PLORD_API_WN2021`; the planned-order
draft carried the pointer string 'evidence[1]'); dates use the file's constants; the
`reviewer: "sali2610@gmail.com"` field of the reservation `fixedRecord` was dropped (no overlay
record carries one, and no human sign-off happened); all four restored seed rows keep `SEED_DATE`
and their text (the planned-order draft had re-stamped its unchanged seed row 2026-09-24; it now
equals the seed row, as the sibling verdicts required for theirs). Three writer honesty fixes, no
new SAP lookups: (1) planned-order `status.he` read 'אפליקציית Fiori מסוג Fact Sheet בלבד (F2260)';
'בלבד' was dropped (house rule 2, never "only"; the record's own notes name a 'Manage Planned
Orders' app located in search, What's New 1909, F-id unverified); (2) the planned-order notes had
lost the seed finding that PLAF and BAPI_PLANNEDORDER_CHANGE are not in the id universe (house
rule 8); it is kept as an Old → New sentence, re-checked against `lib/route-manifest.generated.ts`;
(3) the task-list notes said in the present tense that BAPI_TASKLIST_CREATE has a research-queue
record and so is not a member; `fm:BAPI_TASKLIST_CREATE` now has a record in
`data/verification/functions.ts` and resolves in the universe, so the sentence is in the past
tense with the current state, and the registry was left unchanged. A round-trip check (module
import, deep-equal against the audited JSON with those changes applied; the 12 untouched records
and the 16 registry entries deep-equal their previous state; the four seed rows deep-equal the
previous seed rows) confirmed every field. Coverage (`npm run report:coverage -- --catalog
objects`): before 16 records, L2 9 / L5 7, verified 16, S/4-applicable 7; after 16 records, L2 5 /
L5 11, verified 16, S/4-applicable 11. Gates: `tsc --noEmit`, `tsc --noEmit -p tsconfig.test.json`
and `npm test` (211/211) green.

## refuted

- (none in this batch: all 4 audited drafts survived verification and were written from their auditors' `fixedRecord`.)
- (none in batch 2: all 4 audited drafts survived verification; 2 written from their `fixedRecord`, 2 from the draft with the verdict's downgrades.)
- (none in batch 3: all 4 audited drafts survived verification; 1 written from its `fixedRecord`, 3 from the draft with the verdict's downgrades.)

## conflicts

- `obj:process-order`: `data/bapi-enrichment.pppi.ts` (the BAPI_PROCORD_* rows) still carries `bor: "BUS2116"` for the process order. The official Reference Objects page (Production Planning and Control, 2025.001, loio `62d3b65334e6b54ce10000000a174cb4`) lists BUS0001 Process Order, BUS2016 Process Order Confirmation and BUS2116 Production Order Confirmation. The fix belongs to that file's owner. In this file, the registry members `fiori:F3577` and `fiori:F3364` were left unchanged: the Fiori Apps Library returned an empty result for both at S32OP / S27OP / S24OP / S30OP (a documented negative), and at S31OP F3577 is 'Yard Logistics - Yard Task Execution'. The library prints F4587 (Manage Process Orders) and F5323 (Manage Process Order Operations), both in the catalog and in the record's xrefs. Whether F3577 becomes an alias of F4587 is a product decision (see `fiori:F3577`). **Resolved 2026-09-24** (`77c729b6`, SAP-FIXES FIX-13): the enrichment, the PP-PI lesson and the best practice now carry BUS0001 (and BUS2016 for the confirmation).
- `obj:maintenance-order`: registry members `fiori:F2731` and `fiori:F2730` returned an empty library result at S24OP, S27OP, S30OP, S31OP and S32OP (documented negative); the record xrefs F5241 instead and the members were left unchanged. BUS2007 appears in the `bor` field of the three BAPI_ALM_ORDER_* rows in `data/bapi-enrichment.pm.ts` and is still unverified against an official record (SWO1 / BAPI Explorer).
- `obj:maintenance-notification`: `data/fiori/apps.ts` titles F1511 'Create Maintenance Request'; the library (S32OP) prints 'Request Maintenance' for F1511 and names F1511A 'Create Maintenance Request' as its successor. The fix belongs to the Fiori catalog. (The F1511 OData name drift is already queued in `research-queue-cds.md`.) **Resolved 2026-09-24** (`812d5b66`, `258c628f`): apps.ts, the Fiori center, lifecycle and the best practice now name F1511 'Request Maintenance' and F1511A 'Create Maintenance Request'.
- `obj:material-document`: `data/s4-impact.ts#MATDOC` cites SAP Note 1976487; the official item 'S4TWL - DATA MODEL IN INVENTORY MANAGEMENT (MM-IM)' (Simplification List 2025 FPS01, item 15.3.1) prints 2206980 as its related note. 1976487 stays a repository reference and has not been checked against me.sap.com. The registry member and xref `cds:I_MaterialDocumentItem` has a released successor, I_MaterialDocumentItem_2, on the official VDM page (loio `14305f6e8cb842bbb1647ffd5a30ca31`), but that successor is not in the id universe (already queued in `research-queue-cds.md`). No official record located for the material document's BOR id.
- `obj:batch` (batch 2): `data/fiori/apps.ts` still carries the curated F1576 entry titled 'Manage Batches' (slug `manage-batches`, OData `API_BATCH`). The library (S32OP) prints F1576 as 'Supplier Evaluation Response' (SLC-EVL, OData SLC_QUESTIONNAIRE_RESPONSE_SRV) and Manage Batches as F2462 (LO-BM-FIO, OData LO_BM_BATCH_SRV). Already queued by the Fiori pipeline (`research-queue-fiori.md`, `fiori:F1576`); the fix belongs to the Fiori catalog. In this file the record's xrefs and the registry member now point at `fiori:F2462`.
- `obj:maintenance-plan` (batch 2): the registry member `fm:BAPI_MAINTENANCEPLAN_CREATE` (this file) against `data/bapi-enrichment.pm.ts#BAPI_MAINTENANCEPLAN_CREATE`, which reads 'אינו קיים. השתמש ב-FM MPLAN_CREATE / MPLAN_CHANGE (או IP01/IP41/IP42)'. No official record read prints an FM or a BAPI that creates a maintenance plan (a documented negative, not a verdict). The member was left unchanged because no verdict ordered a change; settling it needs an official BAPI/FM record or an SE37 check in a live system. BUS2093, which the brief names for the maintenance plan, is still unverified: in the repository it is the `bor` of BAPI_RESERVATION_CREATE1 (reservation) and no maintenance-plan record carries it.
- `obj:equipment` (batch 2): `data/tx-intel.ts#IE01` / `#IE02` list EQBS, BAPI_EQMT_CREATE, BAPI_EQMT_MODIFY and BAPI_EQUI_DISMANTLE, which are not in the id universe (a catalog gap, unchanged from the seed). The record's xrefs add `fiori:F2072` (Find Technical Object), which is not a registry member; the registry was left unchanged because no verdict ordered it.
- `obj:functional-location` (batch 2): `data/tx-intel.ts#IL01` / `#IL02` list IFLOTX, IHPA and BAPI_FUNCLOC_CHANGE, which are not in the id universe (a catalog gap, unchanged from the seed). Auditor lead, not a record claim and not checked by the writer: the 2025 FPS01 Simplification List item 'S4TWL - Batch Input for Enterprise Asset Management (EAM)' prints BAPI_FUNCLOC_* names; a later pass may cite it for the BAPI names in `recommendedAction` (which still asks for a check in the SAP system) and compare the spelling with the registry member `fm:BAPI_FUNCLOC_GETDETAIL`.
- `obj:measuring-point` (batch 3): the repository conflict is unchanged. `data/tx-intel.ts#IK01` lists BAPI_MEASUREMENTPOINT_CREATE, while `data/bapi-enrichment.pm.ts` marks that name 'Does not exist. Use BAPI_MPID_CREATE'; the registry member is `fm:BAPI_MPID_CREATE`. The id universe still carries `fm:BAPI_MEASUREMENTPOINT_CREATE`, which has its own verification record in `data/verification/functions.ts`. Settling it needs an official BAPI record or an SE37 check in a live system. Catalog gaps (not SAP claims): IHPA (tx-intel IK01), W0030 (Display Measuring Point, printed by the library at S32OP) and IK06 are not in the id universe. The registry members `tx:IK02` and `tx:IK12` are carried by no evidence row. Lead, not ordered by a verdict: `cds:I_MeasuringPoint` and `cds:I_MeasurementDocument` resolve in the universe but are neither registry members nor xrefs of this record.
- `obj:maintenance-task-list` (batch 3): F2660 (Find Maintenance Task List, printed by the library at S32OP) is not in `data/fiori/apps.ts` (Fiori catalog gap). PLFH and BAPI_TASKLIST_GET_DETAIL (tx-intel IA05) are not in the id universe; of the codes the official sources name in text, IA07 resolves and IA29 / IBIP do not. Registry candidate, not ordered by a verdict: `fm:BAPI_TASKLIST_CREATE` now resolves (record in `data/verification/functions.ts`, functions batch 11); the seed kept it out of the members only because it was then in the research queue.
- `obj:reservation` (batch 3): F4839 (Manage Manual Reservations) and F5601 (Manage Reservation Items), both printed by the library at S32OP with the leading GUI transaction MB21, are not in `data/fiori/apps.ts` (Fiori catalog gap). RKPF and BAPI_RESERVATION_CREATE (tx-intel MB21) are not in the id universe. BUS2093 is still unverified: `data/bapi-enrichment.pppi.ts` tags BAPI_RESERVATION_CREATE1 with `bor: BUS2093`, the brief had named it for the maintenance plan (batch 2), and no official record read so far prints it.
- `obj:planned-order` (batch 3): F2260 (Planned Order Object Page) is not in `data/fiori/apps.ts` (Fiori catalog gap); PLAF and BAPI_PLANNEDORDER_CHANGE (tx-intel MD11 / MD12) are not in the id universe. Lead for the next pass, not checked by the writer: the record's notes say no official record read prints a BOR id for the planned order, but the Reference Objects page (Production Planning and Control, 2025.001, loio `62d3b65334e6b54ce10000000a174cb4`), already cited as official evidence in `obj:process-order` and `obj:batch`, prints 'BUS2004 Planned Order' in its snippet. The 'Manage Planned Orders' app (What's New 1909) was located in search, but its F-id was not confirmed through fal-app.mjs.
