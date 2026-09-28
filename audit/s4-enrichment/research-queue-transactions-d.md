# Research queue · transactions catalog, shard D (S/4HANA enrichment)

Kept by the single writer for `data/verification/transactions-d.ts`. One line per id that was
refuted or deferred at the adversarial-verification gate, and one line per repository or
official-source conflict the audited records surfaced.

Batch 1 written 2026-09-28 (research and adversarial audit the same day; access and
verification dates stamped 2026-09-25, as the chain arguments set them): 9 drafts audited, 9
written, none refuted. The nine are SD quotation, customer-master, pricing and
credit-management codes: `tx:VA21` is `changed` from the item 'S4TWL - Fast entry of
characteristic values in sales document'; `tx:VD03`, `tx:VD05` and `tx:VD06` are `replaced`
(successor `tx:BP`) from 'S4TWL - Business Partner Approach', VD06 resting on the What's New
2022 page 'Re-direction to Business Partner (BP) Transaction' with the 2023 FPS03 item kept as
a `conflicting_sources` row; `tx:VK11` is `unchanged` from its Fiori Apps Library row (S32OP);
from 'S4TWL - Credit Management' and the Sales guide page 'Credit Block Release and Recheck',
`tx:VKM1` is `restricted`, `tx:VKM5` is `legacy_ecc_only`, `tx:VKM4` is `verification_required`
(level `conflicting_sources`), and `tx:VKM3` carries no authored status. Seven were taken from
`verdict.fixedRecord` (`tx:VD03`, `tx:VD05`, `tx:VD06`, `tx:VK11`, `tx:VKM1`, `tx:VKM3`,
`tx:VKM5`) and two were re-derived from the draft with the listed downgrades (`tx:VA21`,
`tx:VKM4`). Both of those went through a repair round first: `tx:VA21` is the id chain B
refuted in its batch 10 (`research-queue-transactions-b.md`, `## refuted`); the repaired draft
does what that entry asked (authored `changed` from the 2025 FPS01 item row as `tx:VA01` does,
both 'Characteristic Values in Application Documents' rows kept, the generated record described
correctly, the Hebrew fixed) and passed re-verification, so the shard B entry can be closed by
its writer. `tx:VKM4` was refuted in round one for the status token `conflicting_sources`,
which is not an `S4Status`, and passed after the repair to `verification_required`.

The records were generated from the audited JSON (this run's workflow journal, the same objects
the writer task relays), not retyped: every downgrade and writer change was applied as an
exact-once substring replacement (a miss aborts the run); every row of the nine generated
records was checked to be either cited by the audited record (same URL or repoRef, plus the
item number for Simplification List rows) or carried; every carried row was deep-compared with
its generated twin; and the written module was deep-compared against the expected objects, with
`status.source` checked for identity with its evidence row and every changed field listed
against the audited JSON (only the planned changes below). The rule engine
(`validateRecords`) reports no problem for the nine records.

Depth (`report-coverage.mjs --ids`, before 12:26 and after 12:38):

| id | before | after |
|---|---|---|
| `tx:VA21` | L3 `repository_verified`, derived 'changed' | L5 `sap_official_verified`, authored `changed` |
| `tx:VD03` | L3 `repository_verified`, derived 'replaced' | L5 `sap_official_verified`, authored `replaced` |
| `tx:VK11` | L3 `repository_verified`, derived 'unchanged' | L5 `sap_official_verified`, authored `unchanged` |
| `tx:VKM3` | L3 `repository_verified`, derived 'changed' | L4 `sap_official_verified`, still derived 'changed' (see conflicts) |
| `tx:VKM4` | L3 `repository_verified`, derived 'changed' | L2 `conflicting_sources`, authored `verification_required` |
| `tx:VD05` | L1 `verification_required` | L1 `sap_official_verified`, authored `replaced` |
| `tx:VD06` | L1 `verification_required` | L1 `conflicting_sources`, authored `replaced` |
| `tx:VKM1` | L1 `verification_required` | L1 `sap_official_verified`, authored `restricted` |
| `tx:VKM5` | L1 `verification_required` | L1 `sap_official_verified`, authored `legacy_ecc_only` |

VD05, VD06, VKM1 and VKM5 stay at depth L1: none has its own entry in `data/tx-intel.ts`, so
the page structure (3 authored facts needed for L2) is missing. Batch effect on the catalog
totals (`npm run report:coverage -- --catalog transactions`): L2 +1, L3 -5, L4 +1, L5 +3,
verified +2, verification_required -4, conflict +2, legacy +1, s4-appl +2. Measured totals:
12:26 L1 1279, L2 0, L3 424, L4 2, L5 113, verified 637, verif.req 1170, conflict 11, legacy 2,
s4-appl 639; 12:38 L1 1279, L2 2, L3 414, L4 3, L5 120, verified 647, verif.req 1156, conflict
15, legacy 3, s4-appl 650. The remainder (L2 +1, L3 -5, L5 +4, verified +8,
verification_required -10, conflict +2, s4-appl +9), attributed by a per-id diff of the two
`--ids` runs, is concurrent work in other shards: chain B batch 8 in `transactions-b.ts`
(VA23, VA41, VA42, VA43 L3 to L5; VD01 stays L3 at `conflicting_sources`; VD02 L3 to L2 at
`conflicting_sources`; VBO1 and VC/2 from `verification_required` to `sap_official_verified`)
and a chain C batch in `transactions-c.ts` (CN22, CN23, CN24, CN24N, CN41, CN60, CN65, CNMM,
each from `verification_required` to `sap_official_verified`).

Batch 2 written 2026-09-28 (research and adversarial audit the same day; access and verification
dates stamped 2026-09-25, as the chain arguments set them): 8 drafts audited, 7 written, 1
refuted (`tx:AFAB`, see `## refuted`). Customer-master codes from 'S4TWL - Business Partner
Approach': `tx:XD05` is `replaced` (successor `tx:BP`); it is named only in the redirect list of
the 2025 FPS01 item, and the 2023 FPS03 item does not name it (a documented absence, not a
conflict). `tx:XD06` is `replaced` (successor `tx:BP`) on the What's New 2022 page 'Re-direction
to Business Partner (BP) Transaction' and the 2025 item, with the 2023 FPS03 item, which lists
XD06 as obsolete, kept as a `conflicting_sources` row (the VD06 shape). `tx:XD07` is
`legacy_ecc_only` (listed under 'Transactions that are obsolete', no successor).
Asset-accounting codes from 'S4TWL - ASSET ACCOUNTING': `tx:AB08` is `changed` (the Constraints
sentence on derived depreciation areas at reversal); `tx:ABST2` is `legacy_ecc_only` ('The
following transactions are no longer available: ABST, ABST2, ABSTL', no successor, the VKM5
precedent); `tx:AFAR` is `changed` (Depreciation Posting Run: calculation and posting at
different points in time, and the What's New 2025 change under 'Technical Object Name
Transaction AFAR'); `tx:AB01` carries no authored status (the item replaces it by AB01L, which
is not in the id universe; see conflicts). Five were taken from `verdict.fixedRecord`
(`tx:XD05`, `tx:XD07`, `tx:AB01`, `tx:AB08`, `tx:ABST2`) and two were re-derived from the draft
with the listed downgrades (`tx:XD06`, `tx:AFAR`).

Same generation discipline as batch 1: the audited objects were transcribed once from the writer
task into a scratch JSON and generated from there; every downgrade and writer change was applied
as an exact-once substring replacement (a miss aborts the run); every row of the seven generated
records was classified as cited (same URL or repoRef, plus the item number for Simplification
List rows), carried (deep-equal apart from the frame sentence) or superseded by a corrected row
with the same URL; the written module was deep-compared with the generated objects,
`status.source` checked for identity with its evidence row, and the nine batch 1 records checked
unchanged. `tsc --noEmit` (app and test configs) and `npm test` (211 of 211) pass.

Depth (`report-coverage.mjs --ids`, before 13:12 and after 13:26):

| id | before | after |
|---|---|---|
| `tx:AB01` | L3 `repository_verified`, derived 'unchanged' | L4 `sap_official_verified`, still derived 'unchanged' (see conflicts) |
| `tx:XD05` | L1 `verification_required` | L1 `sap_official_verified`, authored `replaced` |
| `tx:XD06` | L1 `verification_required` | L1 `conflicting_sources`, authored `replaced` |
| `tx:XD07` | L1 `verification_required` | L1 `sap_official_verified`, authored `legacy_ecc_only` |
| `tx:AB08` | L1 `verification_required` | L1 `sap_official_verified`, authored `changed` |
| `tx:ABST2` | L1 `verification_required` | L1 `sap_official_verified`, authored `legacy_ecc_only` |
| `tx:AFAR` | L1 `verification_required` | L1 `sap_official_verified`, authored `changed` |
| `tx:AFAB` (refuted) | L3 `repository_verified`, derived 'unchanged' | no change (the generated record stays) |

The six L1 records stay at depth L1 for the batch 1 reason: none has an entry in
`data/tx-intel.ts`, so the page structure (3 authored facts needed for L2) is missing. Batch
effect on the catalog totals (`npm run report:coverage -- --catalog transactions`): L3 -1, L4
+1, verified +5, verification_required -6, conflict +1, legacy +2, s4-appl +4. Measured totals:
13:12 L1 1279, L2 2, L3 414, L4 3, L5 120, verified 654, verif.req 1149, conflict 15, legacy 3,
s4-appl 657, edition 3; 13:26 L1 1279, L2 2, L3 410, L4 4, L5 123, verified 667, verif.req 1133,
conflict 18, legacy 5, s4-appl 668, edition 5. The remainder (L3 -3, L5 +3, verified +8,
verification_required -10, conflict +2, s4-appl +7, edition +2), attributed by a per-id diff of
the two `--ids` runs, is concurrent work in other shards: chain C batch 6 (commit a4b452bb,
`transactions-c.ts`: SARA, SCC4, SCC5, SCMA, SE16, SE43, SE95 from `verification_required` to
`sap_official_verified`; SCC4 and SE16 are the two new edition-specific rows) and chain B work
in progress in `transactions-b.ts` (XD01 and XD02 from L3 `repository_verified` to
`conflicting_sources`; XD03, VL09 and VOV8 from L3 to L5; VL06I, VL32N and VOFM from
`verification_required` to `sap_official_verified`).

Batch 3 written 2026-09-28 (research and adversarial audit the same day; access and verification
dates stamped 2026-09-25, as the chain arguments set them): 8 drafts audited, 8 written, none
refuted. FI document, posting and customer-master codes: `tx:FB03` is `unchanged` from its Fiori
Apps Library row (S32OP), with 'S4TWL - Currencies in Universal Journal' naming it as a display
channel for the Universal Journal currencies (the item does not address its status); `tx:FB50`,
`tx:FB50L`, `tx:FB60`, `tx:FB65`, `tx:FB70` and `tx:FB75` are `changed` from 'S4TWL - Removal of
D/C Indicator from Editing Options' (the 'D/C indicator as +/- sign' editing option can no longer
be used in Enjoy transactions after a conversion or upgrade to S/4HANA 1809 or higher), and
`tx:FB65` keeps the 2025.001 page 'Editing Options – Single-Screen Transaction' as
`conflictingEvidence`; `tx:FD01` is `replaced` (successor `tx:BP`) from 'S4TWL - Business Partner
Approach', with the 2025.001 page 'Settings in Customer/Vendor Master Data' kept as a
`conflicting_sources` row. Six were taken from `verdict.fixedRecord` (`tx:FB03`, `tx:FB50`,
`tx:FB50L`, `tx:FB60`, `tx:FB70`, `tx:FB75`) and two were re-derived from the draft with the
listed downgrades (`tx:FB65`, one downgrade; `tx:FD01`, seven). `tx:FB60` and `tx:FB65` went
through a repair round first: `tx:FB60` was refuted in round one for the status token `s4_native`
(rendered 'חדש ב-S/4HANA', while FB60 exists in ECC), an 'אך ורק' claim, two em dashes and two
country labels that no title or snippet prints; `tx:FB65` for a 2023 FPS03 PDF URL that returns
403, a status source that was a context row, a conflicting official page named in the notes but
not recorded as evidence, and wording and title fixes. Both passed re-verification.

Same generation discipline as batches 1 and 2: the drafts and verdicts were read from this run's
workflow journal (the research, repair, verify and re-verify results the writer task relays) and
generated from there; every downgrade and writer change was applied as an exact-count substring
replacement (a miss aborts the run); every row of the eight generated records was checked to be
either cited by the audited record (same URL or repoRef, plus the item number for Simplification
List rows) or carried; the written module was deep-compared with the generated objects,
`status.source` checked for identity with its evidence row and for an equal release, and the
sixteen batch 1 and 2 records checked unchanged. The rule engine (`validateRecords`) reports no
problem for the eight records. `tsc --noEmit` (app and test configs) and `npm test` (211 of 211)
pass.

Depth (`report-coverage.mjs --ids`, before 14:01 and after 14:09, unchanged at 14:16):

| id | before | after |
|---|---|---|
| `tx:FB03` | L3 `repository_verified`, derived 'unchanged' | L5 `sap_official_verified`, authored `unchanged` |
| `tx:FB50` | L3 `repository_verified`, derived 'changed' | L5 `sap_official_verified`, authored `changed` |
| `tx:FB60` | L3 `repository_verified`, derived 'changed' | L5 `sap_official_verified`, authored `changed` |
| `tx:FB70` | L3 `repository_verified`, derived 'changed' | L5 `sap_official_verified`, authored `changed` |
| `tx:FB75` | L3 `repository_verified`, derived 'changed' | L5 `sap_official_verified`, authored `changed` |
| `tx:FB65` | L3 `repository_verified`, derived 'changed' | L3 `conflicting_sources`, authored `changed` |
| `tx:FD01` | L3 `repository_verified`, derived 'replaced' | L3 `conflicting_sources`, authored `replaced` |
| `tx:FB50L` | L1 `verification_required` | L1 `sap_official_verified`, authored `changed` |

FB65 and FD01 stay at L3 because L4 needs a record without a conflict. FB50L stays at L1 for the
batch 1 reason: it has no entry in `data/tx-intel.ts`, so the page structure (3 authored facts
needed for L2) is missing. Batch effect on the catalog totals (`npm run report:coverage --
--catalog transactions`): L3 -5, L5 +5, verified -1, verification_required -1, conflict +2,
s4-appl +1. Measured totals: 14:01 L1 1279, L2 2, L3 410, L4 4, L5 123, verified 683, verif.req
1117, conflict 18, legacy 5, s4-appl 679, edition 5; 14:09 (and 14:16) L1 1279, L2 2, L3 401, L4
4, L5 132, verified 685, verif.req 1113, conflict 20, legacy 5, s4-appl 683, edition 5. The
remainder (L3 -4, L5 +4, verified +3, verification_required -3, s4-appl +3), attributed by a
per-id diff of the two `--ids` runs, is concurrent work in another shard: chain B batch 10
(`transactions-b.ts`, in progress at 14:09 and committed as e90b8f2c at 14:13; AS91, F110,
FAGLB03 and FAGLL03 from L3 `repository_verified` to L5; AJAB, F111 and FAGLFLEXT from
`verification_required` to `sap_official_verified`). After the batch 3 write, `tsc --noEmit`
(both configs) and `npm test` (211 of 211) were re-run on the tree with that commit and pass.

Batch 4 written 2026-09-28 (research and adversarial audit the same day; access and verification
dates stamped 2026-09-25, as the chain arguments set them): 8 drafts audited, 8 written, none
refuted. Vendor-master, parked-document, asset year-end, currency, account-determination and
project-system codes: `tx:FK03` is `replaced` (successor `tx:BP`) from 'S4TWL - Business Partner
Approach', with 'S4TWL - Specific fields on Business Partner' as context and the 2025.001 page
'Settings in Customer/Vendor Master Data' kept as context (its body names FK01/FK02 on the vendor
side and does not name FK03); `tx:FV50`, `tx:FV60` and `tx:FV70` are `changed` from 'S4TWL -
Removal of D/C Indicator from Editing Options', like the batch 3 FB50 family; `tx:OAAQ` is
`changed` from the What's New 1909 page 'Execute/Undo Year-End Closing' (OAAQ is redirected to
FAA_CMP), which 'S4TWL - ASSET ACCOUNTING' repeats in both lists; `tx:OB22` is
`verification_required` (a Revenue and Cost Accounting page names it as a prerequisite, 'S4TWL -
Currencies in Universal Journal' describes it as the ECC situation, and neither decides its
status); `tx:OBYC` is `fiori_alternative_available` from its Fiori Apps Library row (F1273
'Account Determination' leads with OBYC at S32OP); `tx:CJ20N` is `unchanged` from 'S4TWL -
Navigation to Project Builder instead of special maintenance functions'. Six were taken from
`verdict.fixedRecord` (`tx:FV50`, `tx:FV60`, `tx:FV70`, `tx:OAAQ`, `tx:OBYC`, `tx:CJ20N`) and two
were re-derived from the draft with the listed downgrades (`tx:FK03`, seven; `tx:OB22`, one).
`tx:OB22` went through a repair round first: the research draft authored `unchanged` from the
Revenue and Cost Accounting page and was refuted (the token goes beyond what the sources
support); the repaired draft (`verification_required`, both sides quoted, the 2023 FPS03 item row
added) passed re-verification with one minor downgrade.

Same generation discipline as batches 1 to 3, with one addition: the new module was generated
and gated in the scratchpad before it touched the repository. The drafts and verdicts were read
from this run's workflow journal and generated from there; every downgrade and writer change was
applied as an exact-count substring replacement (a miss aborts the run); every row of the eight
generated records was checked to be either cited by the audited record (same URL or repoRef,
plus the item number for Simplification List rows) or carried; the rule engine
(`validateRecords`, with the test's own record composition and shard D swapped for the new
module) reported 0 problems; the eight records were deep-compared with the generated objects,
`status.source` checked for identity with its evidence row and for an equal release, and the 24
batch 1 to 3 records checked deep-equal to HEAD; an isolated `tsc` run on the new module passed
(a negative control with a numeric release failed as expected). In place, `tsc --noEmit` (app and
test configs) and `npm test` (211 of 211) pass.

Depth (`report-coverage.mjs --ids`, before 14:34 and after 14:50):

| id | before | after |
|---|---|---|
| `tx:FK03` | L3 `repository_verified`, derived 'replaced' | L5 `sap_official_verified`, authored `replaced` |
| `tx:CJ20N` | L3 `repository_verified`, derived 'unchanged' | L5 `sap_official_verified`, authored `unchanged` |
| `tx:FV50` | L1 `verification_required` | L1 `sap_official_verified`, authored `changed` |
| `tx:FV60` | L1 `verification_required` | L1 `sap_official_verified`, authored `changed` |
| `tx:FV70` | L1 `verification_required` | L1 `sap_official_verified`, authored `changed` |
| `tx:OAAQ` | L1 `verification_required` | L1 `sap_official_verified`, authored `changed` |
| `tx:OBYC` | L1 `verification_required` | L1 `sap_official_verified`, authored `fiori_alternative_available` |
| `tx:OB22` | L1 `verification_required` | L1 `sap_official_verified`, status `verification_required` |

FV50, FV60, FV70, OAAQ, OB22 and OBYC stay at L1 for the batch 1 reason: none has an entry in
`data/tx-intel.ts` (checked: FV50 appears inside the FBV0 entry, FV60 inside FBV0 and MIR7), so the
page structure (3 authored facts needed for L2) is missing; FK03 and CJ20N have one. Batch effect
on the catalog totals (`npm run report:coverage -- --catalog transactions`): L3 -2, L5 +2,
verified +6, verification_required -6, s4-appl +5. Measured totals: 14:34 L1 1279, L2 2, L3 401,
L4 4, L5 132, verified 693, verif.req 1105, conflict 20, legacy 5, s4-appl 691, edition 5; 14:50
L1 1279, L2 2, L3 396, L4 4, L5 137, verified 708, verif.req 1089, conflict 21, legacy 5, s4-appl
703, edition 5. The remainder (L3 -3, L5 +3, verified +9, verification_required -10, conflict +1,
s4-appl +7), attributed by a per-id diff of the two `--ids` runs, is concurrent work in other
shards: chain C batch 8 (`transactions-c.ts`, committed as bbcd5884 at 14:44; SCI, SD11, SE11,
SE16N, SE24 and SE71 from `verification_required` to `sap_official_verified`) and a chain B batch
in progress (`transactions-b.ts`, uncommitted at 14:50; FD02, FD03 and FK02 from L3
`repository_verified` to L5, FK01 from L3 `repository_verified` to L3 `conflicting_sources`, FI01,
FI02, FI03 and FI12 from `verification_required` to `sap_official_verified`). The gates above ran
on the tree with both.

## refuted

- Batch 1 (2026-09-28): none refuted. All nine audited drafts (`tx:VA21`, `tx:VD03`, `tx:VD05`,
  `tx:VD06`, `tx:VK11`, `tx:VKM1`, `tx:VKM3`, `tx:VKM4`, `tx:VKM5`) were written.
- `tx:AFAB` (batch 2, 2026-09-28; refuted at re-verification after a repair round). The
  auditor's problems: (1) Unsourced softening added by the repair: evidence[2].claim says
  'העיבוד המקבילי מופעל כברירת מחדל של התוכנית' and status.recommendedAction 'עיבוד מקבילי
  כברירת מחדל של התוכנית', while the item (2023 FPS03 sub-section 10.2.20; 2025 FPS01 lines 9848
  and 11855) prints 'The program always carries out parallel processing.' and the help body 'the
  program always performs parallel processing.'; a default implies it can be switched off, which
  no source says, and the only related option the item prints is a server group ('If you specify
  a server group, the system behaves as it has until now'; otherwise parallel processing runs
  'on all available servers'). Removing 'תמיד' swapped a certainty-language hit for a change of
  meaning. (2) History rule 8 and content loss: the draft replaces the generated record
  (`transactions-auto.ts` line 1608) but drops three of its official sap_help rows without a
  trace: 'Calculate Initial Depreciation | General Ledger Accounting (FI-GL)' (loio
  8a69fb5789641070e10000000a44147b, 2025.001), 'Repost Asset Accounting Documents to the New
  Accounting Principle | General Ledger Accounting (FI-GL)' (loio
  4768fb5789641070e10000000a44147b, 2025.001) and 'Carry Out Asset Impairment | Russia'
  (SAP_ERP, loio 1fdf4e422cff4504adb183b2500cb773, 6.18.latest, edition ecc); the notes carry no
  Old → New line (old: no status decision; new: `changed`). House practice carries such rows
  verbatim with their 2026-09-24 date. (3) The evidence[5] (fiori_library) claim ends with
  internal meta no source prints ('F1914 אינו ביקום ה-xrefs ולכן אינו מצוטט כ-successor.'); it
  belongs in notes. The rest of the claim matches fal-app ('AFAB @ S32OP: leading app(s): F1914
  Schedule Asset Accounting Jobs [SAP Fiori: Generic Job Scheduling Framework]; GUI app entry:
  none'). (4) status.recommendedAction still frames F1914 as a background-scheduling tool for
  AFAB runs; fal-app prints only that AFAB is the leading GUI transaction of F1914 ('GUI
  transactions: leading AFAB; related AFABN, AFAR, AJAB, S_ALR_87012026'). Verified and reusable
  in the next draft, per the auditor: items 6.1.9 and 6.1.16 'S4TWL - ASSET ACCOUNTING' (2025
  FPS01, document version 1.36) print the AFAB sentence and the BSEG / 1809 / SAP Note 2383115
  sentence under 'Depreciation Posting Run', with smoothing, the three statuses and the
  1000-asset test-run limit located; status.source equal to the item row; the 2023 row named
  'S4TWL - ASSET ACCOUNTING (item 10.2)'; the repository rows split (`tx-intel.ts` AFAB;
  `tcode-catalog.ts` line 51); the 'Post Depreciation' body (loio
  970ed25320cd4608e10000000a174cb4, 2025.001); F1914 exists at S32OP and is not in
  `data/fiori/apps.ts`, so the xrefs are `tx:AFAR` and `table:BSEG` only. Until a re-draft
  passes, AFAB keeps its generated record (L3 `repository_verified`, derived 'unchanged' from
  `data/tx-intel.ts`).
- Batch 3 (2026-09-28): none refuted. All eight audited drafts (`tx:FB03`, `tx:FB50`, `tx:FB50L`,
  `tx:FB60`, `tx:FB65`, `tx:FB70`, `tx:FB75`, `tx:FD01`) were written; `tx:FB60` and `tx:FB65`
  after a repair round (see the batch 3 summary above).
- Batch 4 (2026-09-28): none refuted. All eight audited drafts (`tx:FK03`, `tx:FV50`, `tx:FV60`,
  `tx:FV70`, `tx:OAAQ`, `tx:OB22`, `tx:OBYC`, `tx:CJ20N`) were written; `tx:OB22` after a repair
  round (the research draft's `unchanged` was refuted; see the batch 4 summary above).

## conflicts

- `tx:VD06` · official vs official (batch 1, recorded by the researcher, confirmed by the
  auditor): the item 'S4TWL - Business Partner Approach' in the 2023 FPS03 list (item 3.19,
  document version 1.35) prints VD06 under 'Transactions that are obsolete: FD06, FK06, MK06,
  MK12, MK18, MK19, VD06, XD06, V+21, V+22, V+23', while the same item in the 2025 FPS01 list
  (item 5.1.27, document version 1.36) prints it under 'Transactions that get redirected to
  transaction BP', and the What's New 2022 page 'Re-direction to Business Partner (BP)
  Transaction' (loio 220bd05aa56c49318c4fae0173cc10d4) says the classical codes including VD06
  are deprecated and redirect to BP ('Valid as Of SAP S/4HANA 2022'). The 2023 row is kept as
  `conflicting_sources`; the status (`replaced`, successor `tx:BP`) rests on the What's New page
  and the 2025 item. What settles it: running VD06 or SE93 on an SAP S/4HANA 2023 On-Premise
  system, or an official correction of the 2023 FPS03 document (the check `tx:MK06` in
  `transactions-b.ts` also names).
- `tx:VKM1` / `tx:VKM4` · official vs official, resolved two ways in the audit (batch 1): the
  item 'S4TWL - Credit Management' (2025 FPS01 items 6.3.1 and 11.1.5, 2023 FPS03 items 18.1
  and 39.12) lists VKM1 and VKM4 under 'Transactions not available in SAP S/4HANA' and prints
  'For releasing credit-blocked sales orders, transaction VKM1 is replaced by transaction
  UKM_MY_DCDS.'; the Sales guide pages of the same release ('Credit Block Release and Recheck',
  loio ab7f7d00ce2f4d0ea8838e11a1ee6388; 'Known Issues', loio 34c4620502144cd4afc1f20f11d34d11;
  both 2025.001) print 'only transactions VKM1 and VKM4 are available as workarounds for credit
  block release if there are issues with DCDs' and 'transactions obsolete (except VKM1, VKM4)';
  the Fiori Apps Library lists VKM4 as a Published SAP GUI app through S32OP. The VKM1 auditor
  accepted `restricted` with both sides as separate official rows (level
  `sap_official_verified`); the VKM4 record is `verification_required` with the item row as
  `conflictingEvidence` (level `conflicting_sources`). Both written as audited. What settles
  it: SE93 or running VKM1 and VKM4 in an S/4HANA 2025 On-Premise system, or the text of SAP
  Note 2270544, which the item names (S-user login, outside the permitted channels); then one
  ruling that applies to both codes.
- `tx:VKM3` / `tx:VKM5` · status token, audit inconsistency (batch 1): both rest on the same
  evidence. The item lists them under 'Transactions not available in SAP S/4HANA' ('VKM3 -
  Sales Documents', 'VKM5 - Deliveries') with no named successor, and the Sales guide page names
  only VKM1 and VKM4 as workarounds. The VKM5 auditor accepted `legacy_ecc_only`, which needs no
  successor; the VKM3 record leaves the status empty until Manage Documented Credit Decisions
  (F5587A on the help page) is registered in `data/fiori/apps.ts`, so that `not_available` can
  name it as successor. What settles it: one ruling for the family at the next audit; if
  `legacy_ecc_only` holds for VKM5, VKM3 can take the same token (status only, the evidence
  stands).
- `tx:VKM3` · derived status shown beside an official tier (batch 1, found by the writer in the
  coverage run, not raised in the audit): with no authored status, the page shows the mapper's
  claim from the repository transaction record (derived 'changed', text 'לפי רשומת הטרנזקציה
  במאגר (tx-intel) ...'). Before this batch it rendered at `repository_verified` (L3); the
  record's official rows now lift the tier to `sap_official_verified` (L4), while those same rows
  mark VKM3 obsolete and not available. Researched records without a status and with deciding
  official rows already exist (`tx:COPC`, `tx:CM05`, `tx:COR4` in `transactions.ts`, `tx:FD31`
  in `transactions-b.ts`), so the shape is house practice; the writer did not author a status
  the audit left open. What settles it: the family ruling in the entry above, or a repository
  FIX of the `data/tx-intel.ts` VKM3 entry the derived claim comes from (next entry).
- `tx:VKM3` · repository vs official (batch 1, recorded by the researcher, confirmed by the
  auditor): `data/tx-intel.ts#VKM3` (line 536) says in its s4 field 'זמין ב-S/4HANA עם FSCM
  Credit Management (UKM). VKM1/VKM3 עדיין בשימוש לשחרור; FD32 הוחלף ב-UKM_BP.', while the item
  and both Sales guide pages mark VKM3 not available or obsolete. The record's repository row
  states the contradiction. Not fixed (tx-intel.ts is outside this writer's files). What settles
  it: a FIX pass on that entry against the item and the two pages.
- `tx:VKM4` · repository wording vs official (batch 1, recorded by the researcher):
  `data/tx-intel.ts#VKM4` (line 537) says 'מוחלף ב-S/4HANA ע"י SAP Credit Management
  (FIN-FSCM-CR). VKM4 חלק מבקרת האשראי הקלאסית שעוברת functional obsolescence; עיבוד ב-UKM_CASE /
  Fiori.' and lists VKM4 under `obsolete`, while the 2025 FPS01 Sales guide calls VKM4 an
  available workaround and the Fiori Apps Library lists it Published through S32OP. The record's
  repository row says the wording does not fully match. Not fixed. What settles it: the VKM1 /
  VKM4 ruling above, then a FIX pass on tx-intel.ts.
- `tx:VKM1` / `tx:VKM3` / `tx:VKM5` · replacement names outside the id universe (batch 1): the
  item names UKM_MY_DCDS as VKM1's replacement, and the Sales guide page names UKM_CASE, SCASE,
  UKM_MY_DCDS and the app 'Manage Documented Credit Decisions (F5587A)'. None of the three codes
  is in `lib/route-manifest.generated.ts`, and the Fiori Apps Library shows no F5587A in S24OP,
  S27OP, S30OP, S31OP or S32OP but F5587 (Manage Documented Credit Decisions) as the app that
  leads with UKM_MY_DCDS (the VKM5 notes); neither app id is in `data/fiori/apps.ts`. That is why
  VKM1 is `restricted` and not `replaced`, and why VKM3 carries no `not_available`. What settles
  it: catalog entries for UKM_MY_DCDS and for the app once the F5587 / F5587A naming is settled
  from the library; then the three statuses go back to audit.
- `tx:VD03` vs `tx:VD01` / `tx:VD02` · help pages that name a redirected code, possible audit
  inconsistency across chains (batch 1, found by the writer from chain B batch 8): the VD03
  auditor ruled that the 2025.001 page 'Creation of Price Lists' ('You can select e-mail
  addresses saved for sold-to parties from the following (transaction VD03 )') is a
  data-location reference that does not tell users to run VD03, so it stays a context row and
  the record is not `conflicting_sources`. Chain B batch 8 (`transactions-b.ts`) marks the 2025
  pages that name VD01 or VD02 ('Sales Documents with SEPA Mandate', 'Service Notifications in
  the Internet (CS-CM-SN)', 'Maintaining Customer Tax Indicator') as `conflicting_sources` rows
  against the same item. The pages may differ in kind (the chain B VD02 record says they still
  point to VD02 for maintaining customer data), so both rulings can hold. What settles it: one
  rule for the Business Partner family on when a help page that names a redirected code counts
  as a conflicting source.
- `tx:XD06` · official vs official (batch 2, recorded by the researcher, confirmed by the
  auditor): the split recorded for `tx:VD06` in batch 1. The item 'S4TWL - Business Partner
  Approach' in the 2023 FPS03 list (item 3.19, document version 1.35) prints XD06 under
  'Transactions that are obsolete: FD06, FK06, MK06, MK12, MK18, MK19, VD06, XD06, V+21, V+22,
  V+23'; the same item in the 2025 FPS01 list (item 5.1.27, document version 1.36) prints it
  under 'Transactions that get redirected to transaction BP', and the What's New 2022 page
  'Re-direction to Business Partner (BP) Transaction' (loio 220bd05aa56c49318c4fae0173cc10d4)
  lists 'XD06 Mark customer for deletion (centr.)' among the classical codes that are deprecated
  and redirect to BP. The 2023 row is kept as `conflicting_sources`; the status (`replaced`,
  successor `tx:BP`) rests on the What's New page and the 2025 item. What settles it: the VD06
  check (run XD06 or SE93 on an SAP S/4HANA 2023 On-Premise system, or an official correction of
  the 2023 FPS03 document); one check settles VD06, XD06 and MK06 (`transactions-b.ts`).
- `tx:AB01` · derived status shown beside an official tier, successor outside the id universe
  (batch 2; the successor gap recorded by the researcher and the auditor, the derived status
  found by the writer in the coverage run): the item 'S4TWL - ASSET ACCOUNTING' (2025 FPS01
  items 6.1.9 and 6.1.16; 2023 FPS03 item 10.2, sub-section 10.2.34 User Interface) prints 'The
  previous transaction AB01 (Create Asset Transactions) is replaced by the new transaction
  AB01L.' and 'If you enter the transaction familiar from classic Asset Accounting (that does
  not end in L), you are automatically transferred to the new transaction (that ends in L).'
  AB01L is not in `lib/route-manifest.generated.ts`, and fal-app shows no app for it at S32OP,
  so the audit left the status empty rather than author `replaced` without a resolvable
  successor. With no authored status, the page shows the mapper's claim from the repository
  transaction record (derived 'unchanged', text 'לפי רשומת הטרנזקציה במאגר (tx-intel); רמת אמון:
  חלקי: זמינה ב-S/4HANA', from the s4 field of `data/tx-intel.ts#AB01`: 'זמינה ב-S/4HANA עם New
  Asset Accounting; לרוב מומלצות טרנזקציות/Fiori ייעודיות לכל תהליך.'), now at
  `sap_official_verified` (L4, was L3 `repository_verified`), beside official rows that say the
  code is replaced and redirected. Same shape as `tx:VKM3` in batch 1. What settles it: a
  catalog entry for AB01L, after which `replaced` with successor `tx:AB01L` goes to audit; or a
  FIX pass on the s4 field of `data/tx-intel.ts#AB01` against the item.
- `tx:XD07` · official help page vs item (batch 2, recorded by the auditor): the item lists XD07
  under 'Transactions that are obsolete' (both lists sit under 'Transactions not available in
  SAP S/4HANA on-premise edition'), while the 2025 FPS01 Sales guide page 'Changing an Account
  Group' (loio b1dfbe532789b44ce10000000a174cb4, 2025.001) still describes changing the account
  group through the SD master data menu and the screen 'Change Account Group Customer: Initial
  Screen', without naming a transaction code. Kept as a context row
  (`supported_secondary_source`, `context: true`); status `legacy_ecc_only`. What settles it:
  SE93 in the target system (whether XD07 exists, and which program and screen it calls).
- `tx:XD07` / `tx:ABST2` · status token family (batch 2, continues the `tx:VKM3` / `tx:VKM5`
  entry above): both are listed by their items as not available ('Transactions that are
  obsolete'; 'The following transactions are no longer available') with no successor, and both
  were audited as `legacy_ecc_only`, the VKM5 ruling, while VKM3 keeps no status. Three records
  now use `legacy_ecc_only` for "not available, no successor". What settles it: the one family
  ruling asked for above; `not_available` needs a resolvable successor
  (`replacement-no-successor`).
- Generated records · 2023 FPS03 sub-sections cited as items (batch 2, found by the auditors,
  counted by the writer): `transactions-auto.ts` cites sub-sections of item 10.2 'S4TWL - ASSET
  ACCOUNTING' as items ('item 10.2.29 Legacy Data Transfer', 'item 10.2.34 User Interface',
  'item 10.2.20 Depreciation Posting Run', 'item 10.2.26 Year-End Closing', 'item 10.2.25 Fiscal
  Year Change/Balance Carryforward'), against HOUSE-RULES §3.5; for AB08 the sub-section was
  also wrong (its sentence sits under 10.2.31 Constraints, not 10.2.29). The nine rows belonged
  to AB01, AB08, ABST2, AFAB, AFAR, AJAB, AJRW, AS91 and OAAQ; this batch supersedes the AB01,
  AB08, ABST2 and AFAR rows with rows that name item 10.2 and the sub-section; the AFAB, AJAB,
  AJRW, AS91 and OAAQ rows remain. Origin: the item mapping in
  `audit/master-completion/simpl-tcode-index.json` that `scripts/qa/gen-tx-evidence.mts` reads.
  Not fixed (outside this writer's files). What settles it: map sub-section headings to their
  S4TWL item in the index and regenerate, or correct each row when its code is researched.
- `tx:VD06` (batch 1 record) · quote normalization (batch 2, raised by the XD06 auditor): the
  2025 FPS01 redirect-list quote ('... MAP1, MAP2, MAP3, V-03,V-04, ...') is normalized; the
  extracted text reads 'MAP1, MAP2,MAP3, V03,V-04' (a hyphen most likely lost at a line break).
  The XD06 row now carries 'לאחר נרמול רווחים ומקפים מהטקסט שחולץ' after the quote; the VD06 row
  carries the same quote without it and was not touched (an existing record outside this batch).
  What settles it: the same words added to the VD06 2025 FPS01 row at its next audit.
- `tx:XD07` vs `tx:XD05` · code ranges, audit inconsistency (batch 2, found by the writer): the
  XD05 auditor refused 'FD01-FD06' and 'XK01-XK06' in the item paraphrase because the item
  prints no FD04 or XK04; the XD07 fixedRecord kept 'FD01-FD06, VD01-VD06, ..., FK01-FK06,
  MK01-MK06 ו-XK01-XK06'. The writer replaced the ranges with the list as printed, the one the
  XD06 auditor confirmed (FD01, FD02, FD03, FD05, FD06, VD01, VD02, VD03, VD05, VD06, ..., FK01,
  FK02, FK03, FK05, FK06, MK01, MK02, MK03, MK05, MK06, XK01, XK02, XK03, XK05, XK06). No lookup
  was repeated. What settles it: the next XD07 audit confirms the row.
- `tx:AFAR` vs `tx:AFAB` · repository meta inside a claim, audit inconsistency (batch 2, found
  by the writer): the AFAB auditor ruled that a sentence about the id universe inside a claim
  ('F1914 אינו ביקום ה-xrefs ...') belongs in notes; the AFAR FAQ row carried the same kind of
  sentence ('לאפליקציה זו אין מזהה Fiori רשום ב-data/fiori/apps.ts, ולכן לא ניתן להצביע עליה
  כ-xref.') and passed. The writer moved it to the AFAR notes; the claim now stops at what the
  page prints.
- `tx:XD07` · screen name in the notes (batch 2, found by the writer): the fixedRecord claim of
  the context row names the screen 'Change Account Group Customer: Initial Screen' (the auditor
  re-fetched the body: 'body matches the claim'), while the notes the auditor wrote named it
  'Change Customer Account Group: Initial Screen'. The writer aligned the notes with the claim.
  What settles it: a re-read of the page body at the next XD07 audit, if the word order is in
  doubt.
- `tx:FD01` · official vs official (batch 3, recorded by the researcher, confirmed by the
  auditor): 'S4TWL - Business Partner Approach' (2023 FPS03 item 3.19, document version 1.35; 2025
  FPS01 item 5.1.27, document version 1.36) lists FD01 under 'Transactions that get redirected to
  transaction BP' and not under 'Transactions that are obsolete', and 'S4TWL - Specific fields on
  Business Partner' (2023 FPS03 item 59.7, 2025 FPS01 item 13.14.1, component PSM-FG) lists it
  under 'Transaction not available in SAP S/4HANA'. The 2025.001 help page 'Settings in
  Customer/Vendor Master Data' (loio e1d2a810235c4f1dbd215011729d4d48, body read; deliverable
  Invoicing, and the same loio is published under the Hungary deliverable at 2025.001 and as an
  SAP ERP 6.18.latest page) tells users to open customer master data from SAP Easy Access,
  'Create/Change (transaction code FD01 or FD02)'. The page row is kept as `conflicting_sources`;
  the status (`replaced`, successor `tx:BP`) rests on the 2025 FPS01 item. The auditor notes that
  the menu path may be text carried forward from ECC and that a redirect to BP would reconcile
  both. What settles it: running FD01 or SE93 on an SAP S/4HANA On-Premise system, or an official
  update of the page. This is the question of the `tx:VD03` vs `tx:VD01` / `tx:VD02` entry above:
  FD01 now marks such a page as conflicting, as chain B does for VD01, VD02, XD01 and XD02, while
  the VD03 audit kept one as context; the one Business Partner family rule asked for there covers
  FD01 too.
- `tx:FD01` · repository vs official (batch 3, recorded by the researcher and the auditor):
  `data/lifecycle.ts#FD01` (line 46) gives FD01 `status: "Obsolete"`, `s4: false`, `alt: "BP"`,
  while both items list FD01 among the codes redirected to BP and not under 'Transactions that are
  obsolete'. The record's repository row (context) states the mismatch; the file header says its
  rows are authored from Simplification knowledge, with no per-row source. Not fixed (outside this
  writer's files). What settles it: a FIX pass on the lifecycle.ts FD01 entry against the item.
- `tx:FB65` and the D/C-indicator family · official vs official (batch 3, raised by the FB65
  auditor in round one, confirmed at re-verification): the item 'S4TWL - Removal of D/C Indicator
  from Editing Options' (2025 FPS01 item 6.1.13, Note Number 0002865285; 2023 FPS03 item 15.8,
  2865285) says the 'D/C indicator as +/- sign' cannot be used in Enjoy transactions after a
  conversion or upgrade to S/4HANA 1809 or higher and that the correction removes it from the
  editing options screen, while the 2025.001 search record 'Editing Options – Single-Screen
  Transaction' (General Ledger Accounting (FI-GL), loio 4a60d7531a4d424de10000000a174cb4; snippet
  only, body not read) still lists 'D/C indicator as +/- sign' among the special options for
  single-screen transactions, without naming a code. Kept on `tx:FB65` as `conflictingEvidence`
  (level `conflicting_sources`). The same page bears on the five other records of the batch that
  rest on the item (`tx:FB50`, `tx:FB50L`, `tx:FB60`, `tx:FB70`, `tx:FB75`); their audits did not
  raise it, so they stay `sap_official_verified`: an audit inconsistency within the family. What
  settles it: the page body (sap-help-body.mjs), then SAP Note 2865285 (S-user login, outside the
  permitted channels) or the Editing Options screen of an Enjoy transaction on an S/4HANA system
  at 1809 or later with the correction applied; then one ruling for the six records.
- `tx:FB50` · notes vs item text, audit inconsistency (batch 3, found by the writer): the FB50
  fixedRecord notes said the 2023 FPS03 item 15.8 lists the affected transactions without FB70,
  FB75, FV70 and FV75. The FB50L, FB60, FB65, FB70 and FB75 auditors each checked the 2023 list
  against the extracted text and quote all twelve codes, and the generated index rows
  (`transactions-auto.ts`, item 15.8) show where the line breaks: FB50's row quotes 'The affected
  transactions are: FB50, FB50L, FV50, FV50L, FB60, FB65, FV60, FV65,' and the FB70 and FB75 rows
  quote the next line, 'FB70, FB75, FV70, FV75.'. The writer replaced the parenthetical with
  '(אותו Symptom/Solution ואותה רשימת טרנזקציות מושפעות)'. No lookup was repeated. What settles
  it: the next FB50 audit confirms the notes.
- `tx:FB03` · repository wording vs official (batch 3, raised by the auditor):
  `data/tx-intel.ts#FB03` (line 157) places FB03 under 'ניהול ספר ראשי / הצגת מסמכים', while the
  Fiori Apps Library (S32OP) lists FB03 for AP, AR, AA and other roles besides GL; the record's
  status text uses the module FI instead, and the tx-intel row is carried as context. The same
  entry names 'Display Journal Entries - In T-Account View (F3664)' as its Fiori app; no official
  source read in this batch confirms it, so the record names it in the notes and not as a
  successor or in recommendedAction. Not fixed. What settles it: a FIX pass on the tx-intel.ts
  FB03 area, and fal-app.mjs F3664 if a Fiori alternative is to be named.
- `tx:FB03` vs `tx:FB60` · recommendedAction firmness, audit inconsistency (batch 3, found by the
  writer): the FB03 auditor refused 'ניתן להמשיך להשתמש ב-FB03 ... ללא צורך בהמרה' and asked for
  the hedged `tx:VK11` wording ('המקורות שנקראו אינם מצביעים על פעולת המרה'), while the FB60
  fixedRecord opens its recommendedAction with 'להמשיך להשתמש ב-FB60 לרישום חשבוניות ספק ללא הזמנת
  רכש' (and the batch 2 `tx:AB08` record with 'ניתן להמשיך להשתמש ב-AB08'). Written as audited.
  What settles it: one wording rule for records whose sources show continued availability.
- D/C-indicator family · SAP Note number padding, audit inconsistency (batch 3, found by the
  writer): the 2025 FPS01 item prints 'Note Number 0002865285' and the 2023 FPS03 item '2865285'
  (the FB70 auditor's finding, applied to FB70). FB50 and FB70 print the padded form on their 2025
  rows; FB50L (evidence[0], status.he) and FB65 (evidence[4], status.he) write '2865285' for the
  2025 row; FB60 writes 'SAP Note 0002865285' in its 2025 row and '2865285' in recommendedAction.
  Each auditor accepted its form. Written as audited; no record sets `sapNote`. What settles it:
  one convention (the number as the cited source prints it) at the next audit of the family.
- `tx:OB22` · official sources on different aspects (batch 4, recorded by the repairer; the
  re-verifier: not an official disagreement under HOUSE-RULES rule 4, so no `conflicting_sources`
  row): the 2025.001 page 'Supporting Multiple Currencies' (Revenue and Cost Accounting, loio
  1432a2ce6e594ecdbe8ff13cc8a050ec, body read) says the second and third local currencies 'are
  defined in the additional local currency data of the company code using transaction code OB22'
  and lists that as a prerequisite, while 'S4TWL - Currencies in Universal Journal' (2025 FPS01
  item 6.1.12, 2023 FPS03 item 15.5) names 'table T001A / tx OB22' as the situation in ECC and the
  view cluster FINSC_LEDGER as the central currency configuration in S/4HANA. The record stays
  `verification_required`, as `tx:OKKP` (`transactions-c.ts`), which rests on the same item. What
  settles it: SE93 and a run of OB22 on an S/4HANA On-Premise system next to FINSC_LEDGER, or an
  official source that decides OB22's status; one ruling for OB22 and OKKP.
- D/C-indicator family, continued (batch 4): `tx:FV50`, `tx:FV60` and `tx:FV70` rest on the same
  item 'S4TWL - Removal of D/C Indicator from Editing Options'; their audits did not raise the
  2025.001 page 'Editing Options – Single-Screen Transaction', so they stay
  `sap_official_verified`. The family now has nine records (FB50, FB50L, FB60, FB65, FB70, FB75,
  FV50, FV60, FV70), and `tx:FB65` is still the only one carrying that page as
  `conflictingEvidence`. Note-number padding in the new records: FV50 writes 0002865285 (2025 row
  and status.he); FV60 writes 'SAP Note 0002865285' in its 2025 row and '2865285' in
  recommendedAction; FV70 writes 0002865285 on the 2025 row and 2865285 on the 2023 row (as each
  list prints it). Written as audited. What settles it: as the batch 3 entries above, one ruling
  for the nine records.
- `tx:FK03` and the page 'Settings in Customer/Vendor Master Data' (batch 4, researcher and
  auditor): the 2025.001 page (loio e1d2a810235c4f1dbd215011729d4d48, deliverable Invoicing, body
  read and re-fetched by the auditor) names FD01/FD02 for the customer side and FK01/FK02 for the
  vendor side through SAP Easy Access, and not FK03. `tx:FD01` (batch 3) keeps the page as a
  `conflicting_sources` row; `tx:FK03` keeps it as context, because the body does not name the
  code. Chain B's batch in progress marks `tx:FK01` conflicting on the same page (working tree at
  14:50, uncommitted). What settles it: the one Business Partner family rule the `tx:VD03` entry
  asks for; it would also say how a page that names a sibling code, and not this one, is carried.
- `tx:OAAQ` · official name outside the id universe (batch 4, researcher and auditor): the
  redirect target FAA_CMP is printed by the What's New 1909 and 2020 pages, by 'S4TWL - ASSET
  ACCOUNTING' in both lists, and by the Fiori Apps Library (S32OP: 'FAA_CMP Execute/Undo Year-End
  Closing, Make Company Code Settings (Old Version) - Asset Accounting-Specific', SAP GUI). It is
  not in `lib/route-manifest.generated.ts`, so the record names it in prose, carries no successor
  and is `changed`, not `replaced`, as `tx:AJAB` (`transactions-b.ts`) does with
  FAA_CLOSE_FISC_YEARS. Not fixed (outside this writer's files). What settles it: adding FAA_CMP
  to the transaction catalog, then a successor or an xref.
- `tx:OBYC` · official app outside the Fiori catalog (batch 4, researcher and auditor): F1273
  'Account Determination' (Fiori Apps Library S32OP, leading transaction OBYC; What's New page
  loio d23c04422172498382d5c0b352755542) is not in `data/fiori/apps.ts`, so the record carries no
  `fiori:F1273` xref and names the app in prose. Not fixed. What settles it: adding F1273 to the
  Fiori catalog.
- FV50, FV60, FV70, OAAQ, OB22, OBYC · repository gap (batch 4, found by the writer from the depth
  run): none has an entry in `data/tx-intel.ts`, so all six stay at L1 although five now carry an
  authored status from an official source (the batch 1 reason, as for FB50L in batch 3). Not
  fixed (outside this writer's files). What settles it: a `tx-intel.ts` entry for each code.

## writer deviations (batch 1, 2026-09-28)

1. Source of the audited JSON. The drafts and verdicts were read from this run's workflow
   journal (research, repair, verify and re-verify results), the objects the writer task relays;
   the VA21 draft status.he, the VKM4 downgrade, the VD06 placeholder source and the VKM1 extra
   keys were matched against the relayed text before generating.
2. Status sources. Shared consts VA21_SIMPL2025, VD03_SIMPL2025, VD05_SIMPL2025,
   VD06_WHATSNEW2022, VK11_FAL_S32OP, VKM1_SIMPL2025 and VKM5_SIMPL2025, each the record's own
   row, used by identity in evidence[] and in status.source. They replace the pointer strings
   'evidence[0]' (VD03, VD05, VK11), 'evidence[1] (Simplification List 2025 FPS01 item 6.3.1
   S4TWL - Credit Management)' (VKM1) and 'evidence[2] (simplification_item, S4TWL - Credit
   Management, 2025 FPS01)' (VKM5), and the VD06 placeholder '<REFERENCE evidence[1] object
   (...), not a string>'. The VA21 draft's copy was deep-equal to its evidence[5]. Each
   status.release equals its source row's release. VKM4 keeps `source: null`
   (`verification_required`); VKM3 has no status.
3. VKM1 `gaps` (5 entries) and `conflicts` (1 entry) are not `VerificationRecord` fields (a tsc
   excess-property error) and were dropped from the record. Four gaps were already stated in its
   notes or recommendedAction; the fifth (SAP Note 2270544 needs an S-user login on me.sap.com,
   outside the permitted channels) and the conflicts entry (item vs Sales guide, what settles
   it) were added to the notes and are recorded above. The other drafts' `gaps`, `summary` and
   `conflicts` lists never ship with records; the downgrades aimed at them (VD03 gaps[1], VD05
   gaps[3], VD06 gaps[3], VK11 gaps[2] and summary, VKM1 gaps[0], VKM3 gaps 2 and 3 and summary)
   have no target in the records.
4. VKM1 recommendedAction: the mistyped word in 'הנוטה לא נקראה כאן' corrected to 'ה-Note לא
   נקראה כאן'.
5. VD06 status.he cited the two items by bare number ('פריט הפישוט 5.1.27 של 2025 FPS01', 'פריט
   הפישוט 3.19 של 2023 FPS03'), against HOUSE-RULES §3.5. Now 'פריט הפישוט 'S4TWL - Business
   Partner Approach' ברשימת 2025 FPS01 (פריט 5.1.27)' and 'אותו פריט ברשימת 2023 FPS03 (פריט
   3.19)'; the content is unchanged.
6. VA21: the optional downgrade applied (status.he in two sentences, 'ואינו נוקב במחליף ל-VA21'
   folded into the first). The auditor's second non-blocking point (the Manage Sales Quotations -
   Version 2 sentence in recommendedAction rests on the What's New 2022 page but follows a 2025
   FPS01 statement) closed by naming the page: 'לצדה, לפי What's New in SAP S/4HANA 2022, מתועד
   מסלול יצירה ...'.
7. VKM4: the listed downgrade applied ('תוכן זהה' to 'תוכן תואם' in the conflicting row title).
8. Content preservation. Rows of the generated records whose source (URL or repoRef, plus the
   item number for Simplification List rows) the audited record does not cite were carried over
   verbatim (`context: true`, access date 2026-09-24), 16 rows: VD03 (`tcode-catalog.ts#VD03`;
   the SAP_ERP search record 'Creation of Price Lists | Sales and Distribution (SD)'); VK11
   (`tx-intel.ts#VK11`, `tcode-catalog.ts#VK11`, the second 'Integration with Sales and
   Distribution Pricing' record, loio fd1d2eacfb764d8e85ba1410e1ac98a5, and item 4.1 'S4TWL - CPM
   - Rate Card' in the 2023 FPS03 list); VKM1 (item 11.1.5); VKM3 (`tcode-catalog.ts#VKM3`, item
   11.1.5, 2023 FPS03 item 18.1); VKM4 (`tcode-catalog.ts#VKM4`, 'Known Issues | Sales', 'Sales
   and Distribution, Optimization of Lists | Logistics', item 11.1.5, 2023 FPS03 item 18.1);
   VKM5 (item 11.1.5). In the seven Simplification List rows only the generator's frame sentence
   ('... טרם נקרא במחקר') was replaced, by 'הפריט מובא כאן כהקשר ולא שימש מקור למעמד ברשומה זו.'
   (the chain C OKB9 and CJI3N precedent), because the audited records document that the item
   text was read and that item 11.1.5 repeats 6.3.1 (the VKM1, VKM3 and VKM5 item rows). The VKM1
   ECC context row the auditor carried is deep-equal to its generated twin; the generated VD03
   'Creation of Price Lists' 2025.001 row is superseded by the audited context row with the same
   URL. VA21, VD05 and VD06 were fully covered by their audited rows.
9. Old → New lines (HOUSE-RULES §3.8) added where the notes lacked the generated record's
   finding: VD03, VD05, VKM3 and VKM4, each naming the derived status and tier that
   `report-coverage.mjs --ids` measured before the write, where one existed. VA21, VD06, VK11,
   VKM1 and VKM5 already carried their history; VK11, VKM1 and VKM5 got one sentence on the
   carried rows.
10. Taken as audited, not normalized: release notation ('2025.001' and '2025 FPS01' both name
    S/4HANA 2025 FPS01; VD05's item row and status use the first, VD03's the second); the
    2026-09-25 access and verification dates, although the research ran on 2026-09-28 (the VKM5
    notes say so); the VKM5 aliases ('VKM5 (Deliveries)', 'VKM5 (אספקות - ניהול אשראי)'), which
    collide with no id; VA21's three help.sap.com rows and its tx-intel row as deciding rows with
    their 2026-09-24 date, as the chain B auditor asked. No record carries `reviewer`, a personal
    name or an e-mail address.
11. No foundation-guard change: `transactions-d.ts` is already imported by the graduated repoRef
    test in `test/evidence-schema.test.ts` and has no FOUNDATION_RECORDS entry.

## writer deviations (batch 2, 2026-09-28)

1. Source of the audited JSON. No workflow journal for this run was found on disk, so the seven
   audited objects (`verdict.fixedRecord` for XD05, XD07, AB01, AB08 and ABST2; the draft for
   XD06 and AFAR) were transcribed once from the writer task into a scratch JSON and generated
   from there. Transcription cross-checks: the XD05 and AFAR `status.source` objects, typed
   separately, are deep-equal to their evidence rows; the XD07 placeholder source matches its
   row in every field but the claim; every downgrade anchor in the XD06 and AFAR drafts matched
   exactly once.
2. Status sources. Shared consts XD05_SIMPL2025, XD06_WHATSNEW2022, XD07_SIMPL2025,
   AB08_SIMPL2025, ABST2_SIMPL2025 and AFAR_SIMPL2023, each the record's own row, used by
   identity in evidence[] and in status.source. They replace the pointer strings 'evidence[1]'
   (XD06), 'evidence[2]' (AB08) and 'evidence[1] (item 6.1.9 S4TWL - ASSET ACCOUNTING, 2025
   FPS01)' (ABST2), the XD07 placeholder object (claim '(same object as evidence[1]; in the TS
   file use the shared const)'), and the XD05 and AFAR copies. Each status.release equals its
   source row's release. AB01 has no status.
3. Downgrades applied. XD06: the What's New const; 'לאחר נרמול רווחים ומקפים מהטקסט שחולץ' after
   the 2025 FPS01 list quote (the second option the auditor offered, so no text was re-read);
   the 2023 FPS03 line range 9103-9115; DATE25 in every row, the nested conflicting row
   included. AFAR: the recommendedAction sentence with both What's New conditions. The
   fixedRecords already carried their downgrades.
4. XD07 item row (writer correction, see conflicts): the code ranges replaced by the list as
   printed.
5. XD07 notes (writer correction, see conflicts): the screen name aligned with the audited
   claim.
6. XD06 notes (writer correction): the description of the generated record said it had three
   context rows, all with the frame sentence ('כולן עם משפט מסגרת'); the generated record has
   four (tcode-catalog.ts#XD06, the What's New 2022 page, items 5.1.27 and 3.19) and the frame
   sentence only on the two item rows. Now '(שורות הקשר בלבד: tcode-catalog.ts#XD06, עמוד What's
   New 2022, פריט 2025 FPS01 5.1.27 ופריט 2023 FPS03 3.19; בשתי שורות הפריטים משפט המסגרת 'טרם
   נקרא במחקר')'. All four rows are covered by the record's own rows.
7. AFAR FAQ row (writer correction, see conflicts): the sentence about `data/fiori/apps.ts`
   moved from the claim to the notes.
8. Content preservation. Rows of the generated records whose source the audited record does not
   cite were carried over verbatim (`context: true`, access date 2026-09-24), 7 rows: AB01
   (`tx-intel.ts#AB01`; the search records 'Subsequently Post Periodic Depreciation/Input Tax on
   Assets | Treasury and Risk Management', 2023.latest, and 'Defining Transaction Types for
   Depreciation Write-Back | United Kingdom', SAP_ERP 6.18.latest); AB08 (item 6.1.16); AFAR
   ('Preparation | Asset Accounting (FI-AA)', loio 137fc054afc1aa09e10000000a423f68; items 6.1.9
   and 6.1.16). In the three Simplification List rows only the generator's frame sentence was
   replaced: AB08 6.1.16 by the batch 1 sentence 'הפריט מובא כאן כהקשר ולא שימש מקור למעמד
   ברשומה זו.' (the AB08 notes say its sentence is identical in all three occurrences); AFAR
   6.1.9 and 6.1.16 by 'הפריט מובא כאן כהקשר; הקטע 'Depreciation Posting Run' שבו מצוטט בשורת
   רשימת 2025 FPS01 ברשומה זו.', because the same 2025 item is a deciding row of the AFAR record
   (evidence[1], not the status source) and the batch 1 sentence could read as a contradiction.
   Not carried, superseded by a corrected row with the same URL: the generated 2023 FPS03 rows
   labelled 'item 10.2.29 Legacy Data Transfer' (AB01; AB08, whose sentence sits under 10.2.31
   Constraints), 'item 10.2.34 User Interface' (ABST2) and 'item 10.2.20 Depreciation Posting
   Run' (AFAR). XD05, XD06, XD07 and ABST2 were fully covered by their audited rows.
9. Old → New lines and history (HOUSE-RULES §3.8). AB01: the derived status measured before the
   write ('unchanged', `repository_verified`, from tx-intel), a sentence on the carried rows and
   one on the covered rows. AB08: a sentence on the carried 6.1.16 row, and 'כשורת ראיה נפרדת'
   became 'כשורת ראיה נספרת', since the occurrence now appears as an uncounted context row.
   AFAR: the generated record's finding (context rows only, frame sentence, no status) and the
   carried and superseded rows. XD05, XD06, XD07 and ABST2 already carried their history.
10. Taken as audited, not normalized: release notation ('2025.001' for the XD05 and AB01 item
    rows, '2025 FPS01' elsewhere); the 2026-09-25 access and verification dates although the
    research ran on 2026-09-28 (the XD06, ABST2 and AFAR notes say so); scratchpad paths and
    line ranges inside the XD06 item claims (the XD06 downgrade edits one of them, the VD06
    record keeps the same shape, while the AFAB auditor asked for them out of claims); the
    What's New 2022 URL in XD06 (deliverable e296651f454c4284ade361292c633d69, the URL of the
    'XD06' search record the auditor re-ran), which differs from the VD06 const (deliverable
    f5d3e1005efd4e86acf9a65abf428082) for the same loio and version; the XD07 aliases; the AFAR
    Old → New sentence about its pre-audit draft. No record carries `reviewer`, a personal name
    or an e-mail address.
11. No foundation-guard change: `transactions-d.ts` is in the graduated repoRef test in
    `test/evidence-schema.test.ts`, and the FOUNDATION_RECORDS guard no longer exists (removed
    when the objects catalog graduated on 2026-09-24).
12. The first `report-coverage.mjs --ids` run wrote `coverage-ids.json` to the repository root
    (the script's default path); it was moved to the scratchpad, and the later run used
    `IDS_OUT`.

## writer deviations (batch 3, 2026-09-28)

1. Source of the audited JSON. The drafts and verdicts were read from this run's workflow journal
   (the research results for FB03, FB50, FB50L, FB70, FB75 and FD01 and the repair results for
   FB60 and FB65; the verify results, and the re-verify results for FB60 and FB65), the objects
   the writer task relays, and matched against the relayed text before generating (problem and
   downgrade counts per id, the two ids without `fixedRecord`, the pointer strings in
   `status.source`).
2. Status sources. Shared consts FB03_FAL_S32OP, FB50_SIMPL2025, FB50L_SIMPL2025, FB60_SIMPL2025,
   FB65_SIMPL2025, FB70_SIMPL2025, FB75_SIMPL2025 and FD01_SIMPL2025, each the record's own row,
   used by identity in evidence[] and in status.source. They replace the pointer strings
   'evidence[1] (Fiori Apps Library, App FB03, release S32OP)' (FB03), 'evidence[3]' (FB50),
   'evidence[0]' (FB50L), 'evidence[4] (simplification_item, item 6.1.13, 2025 FPS01)' (FB65),
   'evidence[5]' (FB70), 'evidence[2]' (FB75) and 'evidence[1] (FD01_SIMPL2025, item 5.1.27 S4TWL
   - Business Partner Approach)' (FD01, downgrade 0), and the FB60 copy, which was deep-equal to
   its evidence[3]. Each status.release equals its source row's release.
3. FB65 `sapNote` (writer correction; the auditor had not raised it). The draft set `sapNote:
   "2865285"` on both item rows (help.sap.com PDF URLs, no repoRef); the rule engine reports
   `sap-note-format` twice for that shape ('carries neither a me.sap.com/notes url nor a repoRef',
   checked on the generated object before writing). The two fields were removed; the number stays
   in the claim prose, as FB50, FB50L, FB60 and FB70 carry it, and the FB65 notes say why.
4. FB50 notes (writer correction, see conflicts): the 2023 FPS03 list parenthetical.
5. 'Only' words (writer correction, HOUSE-RULES §3.2). The FB60 round-one auditor ('אך ורק'), the
   FB65 auditor ('בלבד') and the FB70 auditor ('אך ורק') removed exclusivity words from sentences
   that describe what an item says. The same pattern stood in three places the FB03 and FB50L
   audits did not flag: the FB03 notes ('שניהם מזכירים FB03 רק כערוץ תצוגה', 'המוזכר ברשומת המאגר
   tx-intel.ts בלבד') and the FB50L notes ('שניהם עוסקים אך ורק בהסרת'). The word was dropped and
   nothing else in those sentences changed. Left as written where the word describes the research
   or the record's own use of a source ('לא רק כותרת', 'רק כהקשר מצוטט', 'נבדק רק דרך', 'FB50
   בלבד' for a snippet that names FB50 and not FB50L, 'רק בחלופה BP' in the FD01 downgrade).
6. FD01, beyond the seven downgrades: (a) notes: '(deliverable Hungary, loio
   e1d2a810235c4f1dbd215011729d4d48, versionId 2025.001)' became '(deliverable Invoicing, ...;
   אותו loio מופיע גם תחת deliverable Hungary)', following the auditor's finding that the search
   record for the cited URL prints deliverable 'Invoicing' (downgrade 1 corrected only the row
   title and claim); (b) notes: the sentence saying the Portugal and security-guide pages were not
   included as evidence rows now says they did not serve as status evidence, that the Portugal
   page is a carried context row (downgrade 6) and that the other page is not cited; (c)
   evidence[6].claim: after downgrade 5 the audited tail ', אך אינה מהווה כשלעצמה מקור רשמי'
   followed the new clause about the item and read as if it described the item, so the claim was
   re-punctuated into three sentences ('... 'Business Partner Approach'. הרשומה תואמת את המסקנה רק
   בחלופה BP; ... ולא ברשימת ה-obsolete. הרשומה אינה מהווה כשלעצמה מקור רשמי.') and the spaced
   hyphen before 'תואמת' dropped, with the auditor's words kept; (d) a third generated row carried
   beyond the two that downgrade 6 names: 'Settings in Customer/Vendor Master Data | Hungary'
   (2025.001, deliverable path d266c51af49d463abcc0b6603fddd13c), the same loio as the conflicting
   row under a different URL; by the shard rule (a row counts as cited when its URL or repoRef is)
   it is not cited, and it backs the 'Hungary' wording that status.he and recommendedAction keep;
   as a context row it lifts nothing; (e) the downgrade 2 sentence was appended after the claim's
   last sentence.
7. FB60: the carried-rows sentence in the notes quotes the carried rows' titles verbatim ('Title |
   Deliverable'), because the round-one auditor objected to country labels in the FB60 notes; the
   carried rows are verbatim generated rows.
8. Content preservation. Rows of the generated records whose source the audited record does not
   cite were carried over verbatim (`context: true`, access date 2026-09-24), 25 rows: FB03 7
   (`tx-intel.ts#FB03`, `tcode-catalog.ts#FB03`; the search records 'Feature Comparison for
   Managing G/L Journal Entries', 'Supplier Invoice in Finance' and 'Processing Assignments'
   (SAP_ERP); the Fiori Apps Library rows for F2935 and F5236); FB50 4 (`tx-intel.ts#FB50`;
   'Feature Comparison for Posting G/L Journal Entries'; 'Screen Variant' (Financial Operations,
   2025.001); item 15.8); FB50L 3 (the two 'FI - Ledger group specific open item (tax line)
   (Customer-specific)' Data Migration records; 'Replacement of Parallel Accounts' (SAP_ERP));
   FB60 4 ('BAdI: ODN Based on Reporting Country for Invoices in Financial Accounting
   (BADI_ODN_FI_PLANTS_ABROAD)'; the two 'Transactions Prepared for the Use of QR-Bills' records;
   item 15.8); FB65 2 ('BAdI: Modify ODN Value and Legal Timestamp for Scenarios in Financial
   Accounting (BADI_FI_AD_ODN_MODIFY)', 'Branch Code Assignments' (Thailand)); FB75 2 ('Branch
   Code Assignments' (Thailand), 'Including Sub-Business Unit IDs of Government Agencies in B2G
   Invoices' (Singapore)); FD01 3 (`tx-intel.ts#FD01`, 'Master Data in FI Outgoing Invoices and SD
   Billing Documents' (Portugal), and the row in 6d). In the two Simplification List rows (FB50
   and FB60, item 15.8) only the generator's frame sentence ('... טרם נקרא במחקר') was replaced,
   by 'הפריט מובא כאן כהקשר ולא שימש מקור למעמד ברשומה זו.' (the batch 1 sentence), because both
   records document that the item text was read. The three rows the FB70 fixedRecord carried are
   deep-equal to their generated twins. Every other generated row shares its URL or repoRef (and
   item number) with an audited row.
9. Old → New lines and history (HOUSE-RULES §3.8). FB65 and FB75 lacked an explicit line; each now
   names the derived status and tier measured before the write ('changed', `repository_verified`)
   and the carried rows. FD01 got the downgrade 6 line verbatim plus a carried-rows sentence.
   FB03, FB50, FB50L and FB60 already carried their history and got one sentence on the carried
   rows; FB70 already carried both.
10. Taken as audited, not normalized: release notation ('2025.001' for the FB03 and FB60 status,
    '2025 FPS01' elsewhere); note-number padding (see conflicts); the 2026-09-25 access and
    verification dates, although the research ran on 2026-09-28 (several notes say so); FB60's
    'להמשיך להשתמש' (see conflicts); the SE93 check in the FB75 recommendedAction, a name the FB70
    auditor removed from FB70's recommendedAction because no cited record prints it and the FB75
    auditor left; scratchpad paths and line ranges inside notes and some claims; the FB03 notes'
    mention of F3664, which the carried repository row backs and no official source read here does
    (the notes say so); the en dash in 'Editing Options – Single-Screen Transaction' (SAP's title,
    not an em dash); the spaced hyphens in the FD01 notes. No record carries `reviewer`, a
    personal name or an e-mail address.
11. No foundation-guard change: `transactions-d.ts` is in the graduated repoRef test in
    `test/evidence-schema.test.ts`, and the FOUNDATION_RECORDS guard no longer exists.
12. Both `report-coverage.mjs --ids` runs wrote to the scratchpad through `IDS_OUT`; nothing was
    written to the repository root.

## writer deviations (batch 4, 2026-09-28)

1. Source of the audited JSON. The drafts and verdicts were read from this run's workflow journal
   (the research results for FK03, FV50, FV60, FV70, OAAQ, OBYC and CJ20N and the repair result
   for OB22; the verify results, and the re-verify result for OB22), the objects the writer task
   relays, and matched against the relayed text before generating (problems / downgrades per id:
   FK03 10/7, FV50 5/5, FV60 6/9, FV70 6/7, OAAQ 7/6, OB22 2/1, OBYC 6/5, CJ20N 8/8; the six ids
   with `fixedRecord`; the pointer strings in `status.source`).
2. Status sources. Shared consts FK03_SIMPL2025, FV50_SIMPL2025, FV60_SIMPL2025, FV70_SIMPL2025,
   OAAQ_WHATSNEW1909, OBYC_FAL_S32OP and CJ20N_SIMPL2025, each the record's own row, used by
   identity in evidence[] and in status.source. They replace 'evidence[1] (item 5.1.27 S4TWL -
   Business Partner Approach, 2025 FPS01)' (FK03, downgrade 7), the writer instruction
   'FV50_SIMPL2025 (the same object as evidence[3]; ...)' (FV50), 'evidence[1] (simplification_item,
   item 6.1.13 S4TWL - Removal of D/C Indicator from Editing Options)' (FV60), '__WIRE_TO_CONST__
   FV70_SIMPL2025 = evidence[2] ...' (FV70), 'evidence[2]' (OBYC) and 'evidence[3]' (CJ20N), and
   the OAAQ copy, which was deep-equal to its evidence[1]. Each status.release equals its source
   row's release. OB22 keeps `source: null` (`verification_required`).
3. Dates. The FV60 fixedRecord wrote accessedAt and lastVerifiedAt as the strings "DATE25" and
   "DATE24" (the constant names); written as the constants. Every other date was "2026-09-25" or
   "2026-09-24" and was written as DATE25 or DATE24; no other date occurs.
4. OB22 `successor: null` removed (writer correction). `S4StatusClaim.successor` is optional and
   not nullable (`successor?: CanonicalId`), so tsc rejects null; a missing successor reads the
   same to the rule engine and the page.
5. FK03: downgrades 1 to 5 applied as exact replacements, the key `catalogPatch_note` dropped
   (downgrade 6), the source wired (downgrade 7); the summary half of downgrade 4 is not a record
   field.
6. 'Only' words (writer correction, HOUSE-RULES rule 3.2, as batch 3 did). Three sentences that
   describe what an item says carried one the audits did not flag: the FV50 notes (', רק שינוי UI
   (' became '; הוא מתאר שינוי UI ('), the FV70 status.he ('בתוך הטרנזקציה בלבד;' became 'בתוך
   הטרנזקציה;') and the OBYC status.he ('ככלי תצורה בלבד.' became 'ככלי תצורה.'). Left as
   written: the CJ20N status.he 'בלבד', because the item itself says 'only used as an indicator',
   and the words that describe the research or the record's own use of a row (FK03 'כהקשר בלבד',
   FV60 '(tx:FV60 בלבד)', FV70 'כתצפית מחקר בלבד', OB22 'בפרוזה בלבד', the carried-row sentences).
7. FV50 notes (writer correction): '(evidence שלא נכלל ברשומה הסופית מטעמי צמצום ל-4 ראיות)'
   became '(evidence שהמחקר לא כלל ברשומה מטעמי צמצום)', because the written record has six rows
   once the carried rows are in.
8. Content preservation. Rows of the generated records whose source the audited record does not
   cite were carried over verbatim (`context: true`, access date 2026-09-24), 6 rows: FV50 2 (the
   search record 'Screen Variant | General Ledger Accounting (FI-GL)' at SAP S/4HANA 2025.001,
   the same loio the audited SAP_ERP row cites, and the 2023 FPS03 item 15.8 row); OAAQ 1 (item
   6.1.16 'S4TWL - ASSET ACCOUNTING', 2025 FPS01, which the audited 6.1.9 row names in prose);
   OB22 1 (the second 'Supporting Multiple Currencies | Revenue and Cost Accounting' record, loio
   ba45b553c45e831ce10000000a423f68, same snippet); OBYC 2 ('Maintain Revaluation Reasons |
   Sourcing and Procurement', 2025.001, and the 2023 FPS03 item 12.4 'S4TWL - Technical Changes in
   Material Ledger with Actual Costing' row: the auditor moved the 2023 wording out of the 2025
   row's claim and named 'its own row with the 2023 URL' as the right place). In the three
   Simplification List rows only the generator's frame sentence ('... טרם נקרא במחקר') was
   replaced, by 'הפריט מובא כאן כהקשר ולא שימש מקור למעמד ברשומה זו.' (the batch 1 sentence),
   because each record documents that the item text was read or checked. The rows the FV60 (2)
   and CJ20N (7) fixedRecords carried are deep-equal to their generated twins apart from the
   auditor's replacement of the frame sentence in their two Simplification List rows. Every other
   generated row shares its URL or repoRef (and item number) with an audited row; FK03 and FV70
   had nothing to carry.
9. Old → New lines and history (HOUSE-RULES rule 3.8). FV50 lacked one; it now names the measured
   before-state (L1, `verification_required`), the new status and the carried rows. OAAQ, OB22
   and OBYC had theirs and got one sentence on the carried rows. FK03, FV60, FV70 and CJ20N carry
   theirs as audited; the OBYC line reads 'ישן → חדש' (the auditor's Hebrew), kept.
10. Taken as audited, not normalized: release notation ('2025.001' for the FV60 and OBYC status,
    '2025 FPS01' for FK03, FV50, FV70 and CJ20N, '1909.000' for OAAQ); note-number padding (see
    conflicts); the 2026-09-25 access and verification dates, although the research ran on
    2026-09-28 (several notes say so); recommendedAction firmness ('להמשיך להשתמש' in FV60 and
    CJ20N, 'ניתן להמשיך להשתמש' in OBYC; see the batch 3 FB03 vs FB60 entry); SE93 named in the
    FK03, FV50 and OB22 recommendedAction, a name no cited record prints (the batch 3 FB70 auditor
    removed it, others left it); the FK03 repository row quotes the `tx-intel.ts` s4 field with a
    comma where the repository text has an em dash (downgrade 1 chose rule 3.7 over a verbatim
    quote); FAA_CLOSE_FISC_YEARS named in the OAAQ recommendedAction, as the `tx:AJAB` precedent
    does; scratchpad paths and line ranges inside notes and some claims; en dashes inside SAP
    document titles (FV50, FV60); the F4670 mention in the FV50 notes (a Feature Comparison row,
    not a successor, as the notes say). No record carries `reviewer`, a personal name or an e-mail
    address.
11. No foundation-guard change: `transactions-d.ts` is in the graduated repoRef test in
    `test/evidence-schema.test.ts`, and the FOUNDATION_RECORDS guard no longer exists.
12. The module was generated into the scratchpad and gated there (rule engine, deep compare,
    source identity, the earlier 24 records deep-equal to HEAD, isolated tsc with a negative
    control) before one copy into `data/verification/transactions-d.ts`; both
    `report-coverage.mjs --ids` runs wrote to the scratchpad through `IDS_OUT`. Nothing was
    written to the repository root.
