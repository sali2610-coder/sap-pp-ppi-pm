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
`DATE24`); the `reviewer: "<personal address>"` field of the process-order draft was dropped
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
`reviewer: "<personal address>"` field of the reservation `fixedRecord` was dropped (no overlay
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

Batch 4 written 2026-09-24 (const `DATE24`): 4 drafts audited, 3 written, 1 refuted.
`obj:production-order`, `obj:material-bom` and `obj:work-center` superseded their seed records, each
written from its auditor's `fixedRecord`. `obj:master-recipe` was refuted at its second audit round
and keeps its 2026-09-22 seed record (see `## refuted`). Writer changes: `status.source` of
`obj:work-center` is the hoisted evidence const `WKC_API_MFG_2025` (the verdict carried the pointer
string 'evidence[2] (...)'); dates use the file's constants; the `reviewer` fields
('researcher-subagent' on material-bom, '<personal address>' on work-center) were dropped (no overlay
record carries one, and no human sign-off happened); the material-bom `aliases: null` was dropped
(the type takes a string array or nothing); the material-bom `fixedRecord` had re-stamped its
unchanged seed row 2026-09-24, and that row keeps `SEED_DATE`, as the production-order verdict
ordered for its own seed row and the work-center `fixedRecord` already did. One writer honesty fix,
no new SAP lookups: the material-bom notes had lost the seed findings (grouping source, 'STZU אינה
בקטלוג', CSAP_MAT_BOM_READ added as a member from the function registry), which house rule 8 keeps;
they are back as an Old → New sentence, re-checked against `lib/route-manifest.generated.ts`, where
`table:STZU` now resolves (see `## conflicts`). A round-trip check (module import, deep-equal against
the audited JSON with those changes applied; the 13 untouched records and the 16 registry entries
deep-equal their previous state; the three seed rows deep-equal the previous seed rows; every seed
xref kept) confirmed every field. Coverage (`npm run report:coverage -- --catalog objects`): before
16 records, L2 5 / L5 11, verified 16, S/4-applicable 11; after 16 records, L2 4 / L5 12, verified
16, S/4-applicable 12. work-center reached L5 (`released_api_available`, 2025.001). production-order
and material-bom now carry `sap_official_verified` evidence but stay at L2, because the audit
approved no status for either (`verification_required`). Gates: `tsc --noEmit`,
`tsc --noEmit -p tsconfig.test.json` and `npm test` (211/211) green.

Batch 5 written 2026-09-24 (const `DATE24`): 1 draft audited, 1 written, 0 refuted.
`obj:master-recipe`, refuted in batch 4, passed its re-audit and superseded its 2026-09-22 seed
record. The verdict carried no `fixedRecord`, so the record is the researcher draft with the
verdict's one downgrade applied: in `status.recommendedAction` the type-4 condition is credited to
the item's 'Business Process related information' section, followed by '(סעיף הפעולות הנדרשות מונה
אותם בלי התנאי)'. Writer changes: `status.source` is the hoisted evidence const `MRECIPE_MIGR_2025`
(the Data Migration page 'Master recipe', loio `aa818997f3524905ab7bb863aceddb81`; the draft carried
a copy of that row); dates use the file's constants; the `reviewer: "objects-pipeline"` field was
dropped (no overlay record carries one, and no human sign-off happened). The C201 repository row
keeps the draft's extended claim (C202 among the next and similar transactions). The writer
re-checked it in `data/tx-intel.ts`: after `C223, C202, COR1`, similar `CA01, C202`, together
`CRC1, C223, C202, COR1`. The claim changed and was read 2026-09-24, so the row takes `DATE24`; the
seed claim is contained in it word for word. Two writer honesty fixes, no new SAP lookups: (1)
applied as written, the downgrade would have stretched the section credit over the next clause
('וההחלפה משפיעה בעיקר על מתכוני האב והזמנות התהליך בשימוש', which renders 'This replacement mostly
affects the used master recipes and process orders.'), and the verdict does not say which section
that sentence sits in; the clause is now its own sentence credited to the item as a whole ('לפי
הפריט, ...'), as in `status.he` and `evidence[3]`; (2) the draft notes had lost two seed findings
(the grouping source, and BAPI_RECIPE_CREATE outside the function registry), which house rule 8
keeps; they are back as an Old → New sentence, re-checked against
`lib/route-manifest.generated.ts` (BAPI_RECIPE_CREATE is still not in `bapiFm`). A round-trip check
(module import, deep-equal against the audited JSON with exactly those changes applied;
`status.source` is the same object as `evidence[2]`; the 15 untouched records and the 16 registry
entries deep-equal their previous state; every seed xref kept; no em or en dash) confirmed every
field. Coverage (`npm run report:coverage -- --catalog objects`): before 16 records, L2 4 / L5 12,
verified 16, S/4-applicable 12; after 16 records, L2 3 / L5 13, verified 16, S/4-applicable 13
(master-recipe at L5: `unchanged`, 2025.001). Gates: `tsc --noEmit`,
`tsc --noEmit -p tsconfig.test.json` and `npm test` (211/211) green.

## refuted

- (none in this batch: all 4 audited drafts survived verification and were written from their auditors' `fixedRecord`.)
- (none in batch 2: all 4 audited drafts survived verification; 2 written from their `fixedRecord`, 2 from the draft with the verdict's downgrades.)
- (none in batch 3: all 4 audited drafts survived verification; 1 written from its `fixedRecord`, 3 from the draft with the verdict's downgrades.)
- `obj:master-recipe` (batch 4, refuted at the second audit round). The file keeps the 2026-09-22 seed record (one repository row, `data/tx-intel.ts#C201`); the draft was not handed to the writer, so nothing was written for this id. The auditor re-checked the seven first-round problems and found all of them fixed. Two new problems in the repair: (1) Blocking. `evidence[3].claim` (the item 'S4TWL - ABAP-List-Based PI-Sheets', Simplification List 2025 FPS01 item 9.3.14, PP-PI-PMA-MGT) and `status.recommendedAction` drop the release condition on control recipe destination type 4. The 'Business Process related information' section (`SIMPL_OP2025.pdf.txt`, around line 34165) reads 'Control recipe destinations of type 4 (browser-based PI sheets), if SAP S/4HANA release is lower than SAP S/4HANA 2023.' The draft keeps the qualifier for type X ('S/4HANA 2023 ומעלה') but not for type 4, and `recommendedAction` offers type 4 for a 2025.001 target with no limit. The Required Action(s) section lists type 4 under 'If you use browser-based PI Sheets' without the qualifier, so the source is mixed and the claim has to report both passages (honesty rule 2). (2) Minor. `recommendedAction` opens with 'לפני ההמרה לאתר במתכוני האב יעדי מתכון בקרה מסוג 1'. The item says neither 'before' nor that the destinations live inside master recipes; it says it applies when 'You are doing a system conversion' and that 'This replacement mostly affects the used master recipes and process orders.' The wording has to stay within those two sentences. Reusable for the next repair (the auditor checked these and found no problem): the three help.sap.com rows ('Master Recipe' d011b753 PLM-RM 2025.001, 'Master Recipe' 9741b753 PP-PI-MD 6.18.latest, 'Master recipe' aa818997 Data Migration 2025.001; loio, versionId and URL verbatim from the search records); the F5426 row (fal-app S32OP: PP-PI-MD-MRC, Transactional / SAP Fiori elements, SAP_BR_PRODN_ENG_PROC, V4 group UI_MASTERRECIPE on S4CORE 109, S21OP through S32OP plus PCE, no leading GUI transaction, no predecessor or successor); the S4TWL item (2025 FPS01 item 9.3.14 at `SIMPL_OP2025.pdf.txt` line 34094, note 0002268116 printed; 2023 item 30.8 at `SIMPL_OP2023.pdf.txt` line 39724); the restored C201 repository row; xrefs PLKO/PLPO/MAPL, C201/C202/C203 and `obj:process-order`, all resolving. The auditor accepted `unchanged` scoped to the business object definition and qualified by the S4TWL sentence, and noted that `fiori_alternative_available` (precedent `obj:maintenance-task-list`) would also fit. **Resolved 2026-09-24** (batch 5): the next repair fixed both problems, passed its re-audit and was written as `unchanged` (2025.001); see the batch 5 paragraph above.
- (none in batch 5: the one audited draft survived verification and was written from the draft with the verdict's downgrade.)

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
- `obj:production-order` (batch 4): AFVV (tx-intel CO01), JCDS (tx-intel CO02) and BAPI_PRODORD_CREATE / BAPI_PRODORD_CHANGE / BAPI_PRODORD_RELEASE / BAPI_PRODORD_COMPLETE_TECH are not in the id universe (catalog gap, unchanged from the seed). The record xrefs `fiori:F2336` (Manage Production Orders), which is not a registry member; the registry was left unchanged because no verdict ordered it. The registry members `tx:CO03`, `tx:CO11N` and `tx:CO15` are carried by no evidence row. Leads for the next pass, not checked by the writer: (1) BOR: the auditor ruled that 'BUS2005' may come back into this record only together with the Reference Objects row (Production Planning and Control, 2025.001, loio `62d3b65334e6b54ce10000000a174cb4`), whose snippet prints 'BUS2005 Production Order' and which is cited today in `obj:process-order`. (2) Status: the gap search did not grep the extracted Simplification Lists (`scratchpad/official/`, SIMPL_OP2025 / SIMPL_OP2023) for the production order; that grep comes before any status is authored.
- `obj:material-bom` (batch 4): F1813 (Maintain Bill Of Material; the library at S32OP prints leading GUI transaction CS01 and successor F1813A, and the official migration page names F1813 as its Fiori navigation target) is not in `data/fiori/apps.ts` (Fiori catalog gap). The seed gap 'STZU אינה בקטלוג' has closed: `table:STZU` now resolves in `lib/route-manifest.generated.ts`. STZU is printed only by the repository row (tx-intel CS02) and is a registry and xref candidate that no verdict ordered. Every other name the tx-intel CS01 / CS02 rows list also resolves now. The registry member `fm:CSAP_MAT_BOM_READ` is carried by no evidence row (the seed added it from the function registry), and `fm:BAPI_MATERIAL_BOM_GROUP_CREATE` is carried only by the repository row. CSAI_BOM_MAINTAIN, which the official migration page names next to CSAP_MAT_BOM_MAINTAIN, is not in the id universe.
- `obj:work-center` (batch 4): the record xrefs `fiori:F3289` (Manage Work Center Capacity, PP-CFS-CE), which is not a registry member; the registry was left unchanged because no verdict ordered it. No 'Manage Work Centers' app F-id was located in the searches the record lists (a documented negative). The registry member `tx:CR03` is carried by no evidence row. Leads, not ordered by a verdict: `cds:I_WorkCenterCostCenter`, `cds:I_WorkCenterCapacity` and `cds:I_WorkCenterText` resolve in the universe but are neither registry members nor xrefs (the official API_WORK_CENTERS row names the cost-center entity A_WorkCenterCostCenter); the function registry holds CR_WORKCENTER_READ, CR_WORK_CENTER_READ and CRAP_WORKCENTER_GET_DETAIL, and no cited row names any of them, so the seed finding 'no function member' still stands.
- `obj:master-recipe` (batch 5): F5426 (Manage Master Recipes; the library at S32OP prints PP-PI-MD-MRC, role SAP_BR_PRODN_ENG_PROC and V4 service group UI_MASTERRECIPE, and the official Data Migration page 'Master recipe' names it for checking migrated data) is not in `data/fiori/apps.ts` (Fiori catalog gap), so the record names it in prose and does not xref it. BAPI_RECIPE_CREATE (tx-intel C201) is not in the id universe (catalog gap, unchanged from the seed). C201 and C202 are carried only by the repository row; no official record read prints them (C203 is printed by the migration page). Source-internal mix, reported in the record and not settled: in 'S4TWL - ABAP-List-Based PI-Sheets' (Simplification List 2025 FPS01, item 9.3.14) the 'Business Process related information' section limits control recipe destinations of type 4 to releases lower than S/4HANA 2023, while the 'Required and Recommended Action(s)' section lists the exchange to type 4 under 'If you use browser-based PI Sheets' without that limit. The evidence row and the notes report both passages, and `recommendedAction` credits the condition to its section. Settling which reading holds for a 2025 target needs the related note the item prints (2268116), read on me.sap.com, or a check in the target system. No official record read prints a BOR id for the master recipe; the migration page prints Object Alias PP_MSTRRCP.
