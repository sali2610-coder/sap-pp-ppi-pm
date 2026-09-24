# Research queue · transactions catalog, shard C (S/4HANA enrichment)

Kept by the single writer for `data/verification/transactions-c.ts`. One line per id that was
refuted or deferred at the adversarial-verification gate, and one line per repository
conflict the audited records surfaced.

Batch 1 written 2026-09-25 (access date stamped 2026-09-25): 8 drafts audited, 7 written,
1 refuted (`tx:KSV5`). Five were taken from `verdict.fixedRecord` (`tx:KSU5`, `tx:KSV1`,
`tx:CJ01`, `tx:CJ02`, `tx:CJ03`) and two were re-derived from the draft with the listed
downgrades applied (`tx:OKB9`, `tx:OKKP`). No record carries a `reviewer` field (house
convention across the overlay files). The records were generated from the audited JSON, not
retyped, and deep-compared against it after insertion.

Depth (`report-coverage.mjs --ids`, before and after): `tx:KSU5` moved from L3
`repository_verified` with the derived status 'changed' to L5 `sap_official_verified` with the
authored `unchanged`; `tx:KSV1` from L3 `repository_verified` (derived 'unchanged') to L5
`sap_official_verified` (authored `unchanged`). `tx:OKB9`, `tx:CJ01`, `tx:CJ02` and `tx:CJ03`
moved from `verification_required` to `sap_official_verified` with the authored `changed`, and
`tx:OKKP` from `verification_required` to `sap_official_verified` with the authored status
`verification_required`. These five stay at depth L1: none has a tx-intel / tx-detail record,
so the page structure (3 authored facts needed for L2) is missing. Batch effect on the catalog
totals (`npm run report:coverage -- --catalog transactions`): L3 -2, L5 +2, verified +5,
verification_required -5, s4-appl +4, conflict 0. Measured totals: 00:54 L3 451, L5 86,
verified 583, verif.req 1225, conflict 10, s4-appl 589; 01:05 L3 444, L5 93, verified 591,
verif.req 1216, conflict 11, s4-appl 597. The remainder is chain B's concurrent batch in
`transactions-b.ts` (MSC1N, MSC2N, MSC3N, MSC4N, QA32, MCXA, MCXX, QC20, QC21).

Batch 2 written 2026-09-25 (access date stamped 2026-09-25): 8 drafts audited, 8 written, none
refuted. The eight are the PS project-definition, WBS-element and structure-planning codes the
item 'S4TWL - Simplification of maintenance transactions' lists (`tx:CJ06`, `tx:CJ07`,
`tx:CJ08`, `tx:CJ11`, `tx:CJ12`, `tx:CJ13`, `tx:CJ14`, `tx:CJ20`), each written as `changed`.
Five were taken from `verdict.fixedRecord` (`tx:CJ08`, `tx:CJ11`, `tx:CJ12`, `tx:CJ14`,
`tx:CJ20`) and three were re-derived from the draft with the listed downgrades (`tx:CJ06`,
`tx:CJ07`, `tx:CJ13`). The records were generated from the audited JSON, not retyped: every
downgrade was applied as an exact-once substring replacement (a miss aborts the run), and the
written module was deep-compared against the expected objects, with `status.source` checked for
identity with its evidence row.

Depth (`report-coverage.mjs --ids`, before and after): all eight moved from L1
`verification_required` (no authored status) to L1 `sap_official_verified` with the authored
`changed`. They stay at depth L1: none has a tx-intel / tx-detail record, so the page structure
(3 authored facts needed for L2) is missing. Batch effect on the catalog totals
(`npm run report:coverage -- --catalog transactions`): verified +8, verification_required -8,
s4-appl +8, depth bands and conflict unchanged. Measured totals: 01:25 L1 1279, L3 443, L4 2,
L5 94, verified 596, verif.req 1211, conflict 11, s4-appl 600; 01:35 L1 1279, L3 437, L4 2,
L5 100, verified 605, verif.req 1202, conflict 11, s4-appl 609. The remainder (L3 -6, L5 +6,
verified +1, verification_required -1, s4-appl +1) is chain B's concurrent batch in
`transactions-b.ts` (QDV3, QE51N, QGA1, QGP1, QI03, QM10, QM50).

Batch 3 written 2026-09-25 (access date stamped 2026-09-25): 8 drafts audited, 8 written, none
refuted. Four are the planning-board and structure-planning codes the item 'S4TWL -
Simplification of maintenance transactions' lists (`tx:CJ27`, `tx:CJ2A`, `tx:CJ2B`, `tx:CJ2D`,
each `changed`); three are the payment-planning and period-close codes the item 'S4TWL -
Selected project financial planning and control functions' lists under 'Modernized topics'
(`tx:CJ48`, `tx:CJ49`, `tx:CJ8V`, each `changed`); and `tx:CJ30` carries no status, because the
item 'S4TWL - Hierarchy Graphics in Project Systems' names CJ30 only as an indicator and says
the transactions themselves are not part of it, so all six CJ30 rows are context rows. Seven
were taken from `verdict.fixedRecord` (`tx:CJ27`, `tx:CJ2A`, `tx:CJ2B`, `tx:CJ30`, `tx:CJ48`,
`tx:CJ49`, `tx:CJ8V`) and one was re-derived from the draft with the two listed downgrades
(`tx:CJ2D`). The records were generated from the audited JSON, not retyped: every change was
applied as an exact-once substring replacement (a miss aborts the run), every URL was matched
against the generated shard and the generator's cached search records, the two CJ2B context
rows the auditor carried were deep-compared with their generated twins, and the written module
was deep-compared against the expected objects, with `status.source` checked for identity with
its evidence row and the 15 batch-1 and batch-2 records checked unchanged.

Depth (`report-coverage.mjs --ids`, before and after): seven moved from L1
`verification_required` (no authored status) to L1 `sap_official_verified` with the authored
`changed`; `tx:CJ30` stays L1 `verification_required` (no status, context rows only, as
audited). All eight stay at depth L1: none has a tx-intel / tx-detail record, so the page
structure (3 authored facts needed for L2) is missing. Batch effect on the catalog totals
(`npm run report:coverage -- --catalog transactions`): verified +7, verification_required -7,
s4-appl +7, depth bands and conflict unchanged. Measured totals: 01:53 L1 1279, L3 434, L4 2,
L5 103, verified 608, verif.req 1199, conflict 11, s4-appl 612; 02:09 L1 1279, L3 432, L4 2,
L5 105, verified 621, verif.req 1186, conflict 11, s4-appl 624. The remainder (L3 -2, L5 +2,
verified +6, verification_required -6, s4-appl +5) is chain B's concurrent batch in
`transactions-b.ts` (LS24, VA01, FD31, FD32, FD33, QS34, QS42, UKM_BP).

## refuted

- `tx:KSV5` (batch 1, 2026-09-25): refuted at the adversarial gate, not written; the generated
  record in `transactions-auto.ts` stays live (L3 `repository_verified`, derived 'changed').
  Auditor problems, verbatim:
  1. The status token contradicts its own source and its own he text. The record says status
     'unchanged' (the page shows 'ללא שינוי ב-S/4HANA' in the 'keeps' group). But status.he and
     the cited item (SIMPL_OP2025.pdf.txt lines 17625-17639, p. 322) say KSV5 changes only when
     version 0 is used; with a delta version the system issues an error, and parallel ABC
     allocations are no longer supported. The item is typed 'Business Impact' and adds a
     conversion-check error (FI_GL_08) for ABC delta versions. That is a restriction on how
     KSV5 works in S/4HANA, so the right token is 'restricted' ('מוגבל ב-S/4HANA'). 'unchanged'
     only fits the version-0 case.
  2. recommendedAction adds a step the item never states: 'להעביר את מחזורי החלוקה לגרסה 0 לפני
     ההסבה'. The item (lines 17614-17623 and the Required Action) offers only these options: if
     you can work without delta versions, delete the delta-version data in ECC according to
     note 3126356, or skip the error in the conversion check and do not map the delta versions
     to a ledger. Its required action is 'Activate Operational Activity Based Costing. Check
     existing roles and adjust assigned transactions if necessary.' Moving cycles to version 0
     does not appear in the item.
  3. recommendedAction misstates the TKA09 check. It says 'השדה TKA09-REFVS מפנה לגרסת ייחוס
     (גרסת דלתא)', which reads as if the reference version is the delta version. The item
     (lines 17597-17599) says a CO version whose TKA09-REFVS points to a reference version is
     the delta version, and that an empty TKA09-REFVS means delta versions are not in use. The
     TKA00-COABC wording should also give the values the item prints (1 or 2, 'Component Active
     for Parallel Calculation' / '... and Integrated Calcluation').
  4. This repeats the round-1 problem of citing an uncited source, now inside the
     simplification row. The claim (and its copy in status.source) ends with 'המשפט על CPV5
     ו-KSV5 מופיע באותו נוסח גם ברשימת 2023 FPS03, פריט 12.11 (עמ' 360)', but the row's url is
     the 2025 PDF only. The 2023 fact is correct (SIMPL_OP2023.pdf.txt line 19682 '12.11S4TWL -
     ACTIVITY-BASED COSTING', line 19777 'transaction CPV5 has been replaced by KSV5
     (distribution),', page 360). The 2023 URL
     https://help.sap.com/doc/c34b5ef72430484cb4d8895d5edd12af/2023/en-US/SIMPL_OP2023.pdf
     returns 206 application/pdf. Still, a claim must be bounded by the source its own row cites.
  5. Verified OK in that round (keep on re-draft): the search record re-ran (KSV5, S4
     on-premise scope) with title 'Controlling and Project System', deliverable Public Sector
     Management, versionId 2025.001, loio a4e7cc53a8b77214e10000000a174cb4, URL identical, and
     the quoted snippet is present verbatim. FAL KSV5 S32OP re-ran: SAP GUI, Published,
     CO-OM-CCA, technical catalog SAP_TC_FIN_CO_BE_APPS:S4FIN, intent
     CostCenter-executeActlDistribution, predecessors and successors '-'. All three quotes from
     item 6.5.2 are verbatim on p. 322, and TKA00-COABC and TKA09-REFVS are printed on p. 321.
     The 2025 PDF URL returns application/pdf. tx:KSV1 is in ROUTE_MANIFEST.
     data/tcode-catalog.ts line 707 matches. No em dashes, no certainty words and no SAP Note
     field in the record. There is no duplicate-id issue, because data/verification/index.ts
     filters tx:KSV5 out of transactions-auto.ts once a researched record exists.
  Re-draft: take the token from the auditor ('restricted', see also the status-token conflict
  below), limit recommendedAction to the item's own options and required action, state the
  TKA09-REFVS / TKA00-COABC checks as the item prints them, and move the 2023 FPS03 sentence
  to its own 2023 row.
- Batch 2 (2026-09-25): none refuted. All eight audited drafts (`tx:CJ06`, `tx:CJ07`,
  `tx:CJ08`, `tx:CJ11`, `tx:CJ12`, `tx:CJ13`, `tx:CJ14`, `tx:CJ20`) were written.
- Batch 3 (2026-09-25): none refuted. All eight audited drafts (`tx:CJ27`, `tx:CJ2A`,
  `tx:CJ2B`, `tx:CJ2D`, `tx:CJ30`, `tx:CJ48`, `tx:CJ49`, `tx:CJ8V`) were written.

## conflicts

- `tx:KSU5` · repository vs official (batch 1): `data/tx-intel.ts#KSU5` (line 298) describes
  KSU5 as 'ביצוע חלוקה (Distribution) בפועל' that keeps the original cost element, while the
  official topic 'Controlling and Project System' (2025.001) lists KSU5 under Assessment and
  KSV5 under Distribution, the item 'S4TWL - ACTIVITY-BASED COSTING' prints 'transaction CPP5
  by KSU5 (assessment)', and `data/tcode-catalog.ts#KSU5` ('Execute Actual Assessment') and
  `data/tcode-directory.ts#KSU5` ('Run assessment cycle.') agree with the official sources.
  Recorded by the researcher, confirmed by the auditor, not fixed (tx-intel.ts is outside this
  writer's files). What settles it: a repository fix of the tx-intel.ts KSU5 entry against
  the official topic.
- `tx:KSV1` · repository vs official (batch 1, found by the writer while carrying over the
  tx-intel context row; not audited): `data/tx-intel.ts#KSV1` (line 299) describes KSV1 as
  'הגדרת מחזור הקצאה (Create Assessment Cycle)', while the official topic 'Controlling and
  Project System' lists KSV1 under Distribution, the item 'S4TWL - ACTIVITY-BASED COSTING'
  prints 'CPV1-3 are covered by KSV1-3', and `data/tcode-catalog.ts#KSV1` gives 'Create Actual
  Distribution Cycle'. With the KSU5 entry above, the tx-intel.ts content for the assessment
  (KSU*) and distribution (KSV*) families looks swapped. Not fixed; the KSV1 notes say so. What
  settles it: the same repository fix, checked code by code against the official topic.
- `tx:KSU5` / `tx:KSV1` / `tx:KSV5` · status token, audit inconsistency (batch 1): all three
  rest on the same wording of 'S4TWL - ACTIVITY-BASED COSTING' ('Where version 0 is used, there
  will be no change. Where a delta version is used, the system will issue an error message.').
  The KSU5 and KSV1 auditors accepted `unchanged` with that qualifier in status.he; the KSV5
  auditor refuted `unchanged` for the same wording and asked for `restricted`. KSU5 and KSV1
  are written as audited. What settles it: one ruling at the KSV5 re-audit that applies to all
  three codes; if `restricted` wins, KSU5 and KSV1 are re-pointed in a later batch (status
  token only, the evidence stands).
- `tx:CJ01` / `tx:CJ02` / `tx:CJ03` · repository wording (batch 1): `data/tcode-catalog.ts`
  (lines 113-115) labels the three codes 'יצירת / שינוי / הצגת מבנה תחתית עבודה (WBS)'. The
  CJ01 auditor flagged 'מבנה תחתית עבודה' as a mistranslation of WBS (the standard Hebrew term
  is 'מבנה פירוק עבודה'). The CJ01 record uses 'מבנה פירוק עבודה' in its own words; the CJ02
  and CJ03 repository rows quote the catalog label verbatim, as a quote must. Not fixed
  (tcode-catalog.ts is outside this writer's files).
- `tx:CJ01` / `tx:CJ02` / `tx:CJ03` · label variance, no status conflict (batch 1): the item
  'S4TWL - Simplification of maintenance transactions' lists 'Create / Change / Display Work
  Breakdown Structure'; the Fiori Apps Library lists the SAP GUI apps as 'Create Project' /
  'Change Project' / 'Display Project'. Both labels are official; the CJ01 notes record it.
- `tx:CJ20` · official snippet not yet read, possible conflict (batch 2): the generated record
  cited the search record 'Commercial Project Inception & Lean Staffing 2 | SAP Professional
  Services' (2025.001, loio 951512968e16425a91953f6a25e2e769), whose snippet reads
  'Transaction CJ20 replaced with the addition of User Fields. ...'. The researcher left it out
  of the evidence because the snippet alone does not show what was replaced (a field addition
  or the transaction itself); the auditor accepted the record without it. The writer carried
  it over as a context row (verbatim, access date 2026-09-24) so the source stays visible; it
  does not decide the status, which rests on item 10.1.60 ('changed', perpetual scope from
  2020 FPS2). What settles it: read the body with `sap-help-body.mjs` and bound a claim to it.
  If the body says CJ20 itself is replaced, the status goes back to audit
  (`conflicting_sources` against item 10.1.60 until one reading wins).
- `tx:CJ14` · repository vs official label (batch 2, raised by the auditor):
  `data/tcode-catalog.ts#CJ14` (line 122) labels CJ14 'הצגת אלמנט WBS (קלטי עלות/פעילות)' /
  'Display WBS Element (Cost/Activity Inputs)', while the item 'S4TWL - Simplification of
  maintenance transactions' prints 'CJ14 Display WBS Element (From DMS)'. The status uses the
  official label; the repository row quotes the catalog verbatim, as a quote must. Not fixed
  (tcode-catalog.ts is outside this writer's files). What settles it: a separate FIX pass on
  the catalog entry against the item.
- `tx:CJ2A` / `tx:CJ2D` · repository vs official label (batch 2, raised by the CJ20 auditor;
  these two records are not in this batch): `data/tcode-catalog.ts` (lines 126 and 128) labels
  CJ2A 'הצגת לוח תכנון פרויקט' / 'Display Project Planning Board' and CJ2D 'לוח תכנון פרויקט
  (יצירה)' / 'Project Planning Board (Create)', while the PFCG search record 'Maintaining and
  Displaying Project Structures' (2025.001 and 6.18.latest, loio
  2606b753128eb44ce10000000a174cb4) prints 'CJ2D Structure Planning: Create Project' and 'CJ2A
  Structure Planning: Display Project' in the snippet the CJ20 record cites. For the CJ2A and
  CJ2D records to settle when the chain reaches them.
- `tx:CJ03` / `tx:CJ06` / `tx:CJ07` · status wording, audit inconsistency (batch 2): the CJ14
  auditor ruled that 'פעיל ב-S/4HANA' and 'ללא סילוק או החלפה של הפונקציונליות' go beyond the
  item, which prints neither, and replaced them with 'הפריט אינו קובע הסרה או החלפה של הקוד'.
  The CJ07 status.he carries both phrases (as does the batch-1 CJ03 record), and the CJ06
  status.he says 'ללא החלפה או הסרה'; their auditors passed them, so they are written as
  audited. For CJ03 and CJ07, 'פעיל' has some support in the Fiori Apps Library (Published in
  S32OP), which CJ14 lacks. What settles it: one wording ruling for the family. If the CJ14
  ruling applies, re-word the CJ03, CJ06 and CJ07 status.he in a later batch (text only, the
  evidence stands).
- `tx:CJ08` · label variance, no status conflict (batch 2): the search record 'Project
  Period-End Closing: Individual Processing' (Single and Composite Roles (PFCG), 2025.001)
  prints 'CJ08 Overhead: Individual Commitment Processing', while the item, the Fiori Apps
  Library and the repository give 'Display Project Definition'. Not cited and not checked; the
  CJ08 notes record it.
- `tx:CJ20` · label variance, no status conflict (batch 2): the repository gives 'Special
  Maintenance Functions: Structure'; the official labels are 'Structure Planning: Change
  Project' (PFCG snippet), 'Change Structure Planning' (Fiori Apps Library) and 'Structure
  planning' (item). The CJ20 notes record it.
- `tx:CJ2A` / `tx:CJ2D` · repository vs official label (batch 3; the batch-2 entry above is now
  recorded on the record side): both records state the difference in their notes and rest on
  the official labels. The repository label of CJ2A ('הצגת לוח תכנון פרויקט' / 'Display Project
  Planning Board', `data/tcode-catalog.ts` line 126) is, in the same official sources, the label
  of CJ2C (PFCG snippet 'CJ2C Project Planning Board: Display Project', item line 'CJ2C Display
  project planning board'); CJ2A's official labels are 'Structure Planning: Display Project'
  (PFCG), 'Display Structure Planning' (Fiori Apps Library) and 'Display structure planning'
  (item). The repository label of CJ2D ('לוח תכנון פרויקט (יצירה)' / 'Project Planning Board
  (Create)', line 128) matches the label the PFCG snippet gives CJ27 ('Project Planning Board:
  Create Project'); CJ2D's official labels are 'Structure Planning: Create Project' (PFCG),
  'Create Project' (Fiori Apps Library) and 'Structure planning' (item). The repository rows
  quote the catalog verbatim, as a quote must. CJ2C has no entry in `data/tcode-catalog.ts` and
  is not in the route manifest, so no record can carry it as an xref (CJ27 and CJ2B name it in
  prose only). Not fixed (tcode-catalog.ts is outside this writer's files). What settles it: a
  FIX pass on tcode-catalog.ts lines 126 and 128 against those sources.
- `tx:CJ2A` · PFCG role name without a cited source (batch 3, found by the writer, not raised
  in the audit): the audited rows for the search record 'Display Project Structures'
  (2025.001 and 6.18.latest, loio b705b753128eb44ce10000000a174cb4) named the role technical
  name 'SAP_PS_STRUCT_DISPL'. The quoted snippet does not print it, the record's notes say no
  body was read, and the generator's cached search record for the same loio (2026-09-24)
  carries the same snippet without it. That breaks HOUSE-RULES §3.1 (the pattern the CJ49
  auditor removed for 'SAP_PS_PAYMENTS_PLAN'). The name was dropped from both rows and the
  CJ2A notes say it remains to be checked. What settles it: read the body with
  `sap-help-body.mjs`; if the body prints the technical name, a later batch may cite it with
  the body as its source.
- `tx:CJ30` · label variance, no status (batch 3): the PFCG search record 'Project Budgeting'
  prints 'CJ30 Create Original Budget' (the auditor notes the snippet columns may be mixed),
  the Fiori Apps Library gives 'Edit Original Budget - Projects' with intent
  'Project-changeOriginalProjectBudget', and `data/tcode-catalog.ts#CJ30` gives 'שינוי תקציב
  מקורי של פרויקט' / 'Change Project Original Budget'. The CJ30 notes record that the PFCG
  label is unconfirmed. What settles it: read the 'Project Budgeting' body.
- `tx:CJ30` · no status source yet (batch 3): the Simplification List index
  (`audit/master-completion/simpl-tcode-index.json`) lists one item that names CJ30, 'S4TWL -
  Hierarchy Graphics in Project Systems' (2025, line 50781), and that item says the
  transaction itself is not part of it; the search record 'Central Budgeting for Projects | Central Finance'
  (2025.001) prints 'Therefore, you can only use transaction CJ30 in display mode in the source
  system.', a Central Finance scenario sentence kept as a context row, not a status. CJ30 stays
  without an authored status. What settles it: an official record that states the S/4HANA
  status of CJ30, or SE93 in the target system.
- `tx:CJ27` / `tx:CJ8V` · status wording, audit inconsistency (batch 3, continues the batch-2
  entry for CJ03, CJ06 and CJ07): CJ27's status.he ends 'ללא החלפה או הסרה של הפונקציונליות'
  and CJ8V's says 'ללא החלפה או הסרה', the wording the CJ14 auditor ruled beyond the item. The
  CJ27 and CJ8V auditors passed it (both item rows say the item names no replacement or
  removal), so both are written as audited. The same family ruling applies.

## writer deviations (batch 1, 2026-09-25)

1. Status sources. The KSU5 and CJ01 verdict copies were deep-equal to evidence[0] and now
   reference it by identity. The KSV1 verdict carried a shortened re-typed copy of the 2025
   item row with a different claim; it is replaced by evidence[2] itself (the full row, which
   also carries the pre-check text the verdict added). The OKB9 pointer string "evidence[2]",
   the CJ02 pointer string "evidence[3] (simplification_item, item 10.1.60)" and the CJ03
   placeholder object (claim "(same object as evidence[3]; ...)") are replaced by the rows they
   name. Shared consts: KSU5_SIMPL2025, KSV1_SIMPL2025, OKB9_SIMPL2025, CJ01_SIMPL2025,
   CJ02_SIMPL2025, CJ03_SIMPL2025.
2. Reviewer fields dropped from KSV1, OKB9 and CJ03 (house convention; the audit trail lives in
   the notes and in this file).
3. CJ02 evidence[3] `sapNote: "2270246"` dropped: the sap-note-format rule needs a
   me.sap.com/notes url or a repoRef. The number stays in the row title and in status.he, as
   the item prints it (0002270246); same as the CM31 precedent in transactions.ts batch 9.
4. Content preservation. Context rows of the generated records that the audited records left
   out were carried over verbatim (`context: true`, access date 2026-09-24): KSU5 (Fiori Apps
   Library 'Run Overhead Allocation - Cost Centers - Actual', the SAP_ERP 6.18.latest
   'Controlling and Project System' record, tx-intel.ts#KSU5), KSV1 (Fiori Apps Library 'Create
   Distribution Cycles - Cost Centers - Actual', the SAP_ERP 6.18.latest record,
   tx-intel.ts#KSV1), OKB9 ('CO Account Determination' 2025.001, 'Clearing of Open Items from
   Previous Year(s)' 6.18.latest, the 2025 item 'S4TWL - Profitability Analysis',
   tcode-catalog.ts#OKB9) and CJ03 (the SAP_ERP 6.18.latest PFCG record). This is the rule the
   CJ01 and CJ02 auditors applied; context rows never count toward level or depth. In the OKB9
   Profitability Analysis row only the generator's frame sentence ('... טרם נקרא במחקר') was
   replaced, by 'הפריט מובא כאן כהקשר ולא שימש מקור למעמד ברשומה זו.', because the
   researcher's notes record that the item mentions OKB9 incidentally. No lookup was re-run.
5. OKB9 downgrades: (1) applied, the notes quote reads 'e. g. from OKB9'; (3) optional,
   applied, status.he cut to two sentences with the verdict's content; (2) optional, not
   applied: evidence[3].release stays '2025.001', like the Fiori library rows of CJ01, CJ02 and
   CJ03 in this batch and the generated records.
6. OKKP downgrade (optional tightening of the ECC row) applied verbatim.
7. Notes: a superseded-record sentence (Old → New, HOUSE-RULES §3.8) was appended to KSU5,
   KSV1, OKB9 and CJ03; the CJ01, CJ02 and OKKP notes already carry their history. The KSV1
   notes also record the tx-intel.ts#KSV1 conflict above.
8. No foundation-guard change: `transactions-c.ts` is already covered by the graduated
   repoRef test in `test/evidence-schema.test.ts` and has no FOUNDATION_RECORDS entry.

## writer deviations (batch 2, 2026-09-25)

1. Status sources. Shared consts CJ06_SIMPL2025, CJ07_SIMPL2025, CJ08_SIMPL2025,
   CJ11_SIMPL2025, CJ12_SIMPL2025, CJ13_SIMPL2025, CJ14_SIMPL2025 and CJ20_SIMPL2025, each the
   record's own item-10.1.60 row, used by identity in evidence[] and in status.source. They
   replace the CJ07 and CJ12 pointer strings, the CJ08 and CJ11 objects whose claim was an
   instruction to the writer, and the CJ06, CJ13, CJ14 and CJ20 full copies (deep-equal to
   their evidence rows). All access and verification dates use DATE25; the carried context
   rows keep DATE24.
2. Reviewer fields dropped (CJ07 carried 'researcher'; the CJ11, CJ12 and CJ14 drafts carried a
   personal address). House convention, and records may carry no personal name or address.
3. Handoff text kept out of the records. The CJ12 fixedRecord notes ("Same notes as the draft.
   Writer: ...") were not copied: the draft notes were used, with the closing sentence (which
   said status.source stayed null until a writer replaced it) rewritten to describe the shared
   const. The CJ13 notes sentence addressed to the writer ('לכותב: ...') was rewritten the same
   way.
4. CJ07 notes corrected against the repository (local file checks, no research lookup). The
   notes said CJ07 is in the route-manifest `apps` list; `lib/route-manifest.generated.ts`
   lists CJ07 under `tcodes` only. They also said no earlier VerificationRecord exists for
   tx:CJ07; the generated record exists in `transactions-auto.ts`. Both statements were
   corrected, and an Old → New sentence (HOUSE-RULES §3.8) was added before the closing
   sentence.
5. CJ12 notes: 'הסניפט הנגיש עוצר אחרי CJ03 ולפני שהוא מגיע ל-CJ11/CJ12/CJ13 ברשימה'
   presupposed that the unread page body lists CJ11 to CJ13. Reworded to 'עוצר אחרי CJ03 ואינו
   נוקב ב-CJ11/CJ12/CJ13' (honesty rule 2).
6. Content preservation. Rows of the generated records whose source (URL or repoRef, plus the
   item number for Simplification List rows) the audited record does not cite were carried
   over verbatim (`context: true`, access date 2026-09-24): CJ12 (Fiori Apps Library F0292
   'Change WBS Element Status', its own deep link) and CJ20 (the 'SAP Professional Services'
   search record, see conflicts). The CJ20 notes sentence that said the snippet was not
   included now says it was carried as context only and points at this file. The other six
   generated records are fully covered by the audited rows. The CJ08 F0290A row supersedes the
   generated F0290A row (same deep link); the generated claim's 'Published' is not repeated in
   the audited claim.
7. Optional downgrades. Applied: the CJ06 anchoring sentence (the item row now also quotes the
   list lines for CJ01, CJ02, CJ03, CJ07 and CJ08, so every CJ06 xref is tied to a cited row)
   and the CJ13 recommendedAction wording. Not applied: the CJ07 release option; the item row
   keeps '2025 FPS01' like the sibling item rows, and status.release stays '2025.001' as
   audited, like CJ03 and CJ06.
8. Not applied across the batch: citing PDF pages instead of the scratch path and line numbers
   was asked only by the CJ20 auditor. The CJ06, CJ07, CJ11, CJ13 and CJ14 item rows keep the
   scratch path and line range as audited, like the batch-1 CJ03 row.
9. No foundation-guard change: `transactions-c.ts` is already covered by the graduated
   repoRef test in `test/evidence-schema.test.ts` and has no FOUNDATION_RECORDS entry.

## writer deviations (batch 3, 2026-09-25)

1. Status sources. Shared consts CJ27_SIMPL2025, CJ2A_SIMPL2025, CJ2B_SIMPL2025,
   CJ2D_SIMPL2025, CJ48_SIMPL2025, CJ49_SIMPL2025 and CJ8V_SIMPL2025, each the record's own
   Simplification List row, used by identity in evidence[] and in status.source. They replace
   the CJ27 and CJ8V placeholder objects (claim '(same object as evidence[N]; ...)'), the CJ2A
   pointer string 'evidence[0] (CJ2A_SIMPL2025)', the CJ2B object {"$ref": "evidence[4]"}, the
   CJ49 placeholder string '<evidence[1]: ...>', and the CJ2D and CJ48 re-typed copies (same
   fields and claim text as their rows). CJ30 has no status, so it has no const.
2. CJ2A PFCG role name dropped (see conflicts): 'תפקיד PFCG בשם טכני SAP_PS_STRUCT_DISPL' in
   evidence[1] became 'Single and Composite Roles (PFCG)' (the record's deliverable), and
   ', SAP_PS_STRUCT_DISPL' left evidence[2]. One notes sentence says the role name remains to be
   checked. No lookup was re-run: the check used the quoted snippet, the record's own notes and
   the generator's cached search record.
3. CJ30 notes. The fixedRecord listed the searches as 'CJ30' (21 records), 'Project Budgeting'
   and 'CJ30 original budget'. The researcher's log (the draft) lists 'CJ30 Change Original
   Budget', 'CJ30' and 'Project Budgeting Fiori app CJ30' (S/4HANA on-premise) and 'CJ30
   original budget' (SAP_ERP). The record now lists the logged query strings, keeps the one
   count the audit gave (21) and says the other three counts were not logged.
4. CJ49 evidence[3].sourceTitle: 'Planned Payments · Single and Composite Roles (PFCG) · SAP
   ERP 6.0 EHP8 Latest' became 'Planned Payments | Single and Composite Roles (PFCG)', the search
   record title in house style (HOUSE-RULES §1: the title verbatim) and the same title as the
   carried CJ48 row with the same URL. Product, release and claim still name SAP ERP 6.0 EHP8.
5. CJ48: the fixedRecord's empty `aliases: []` dropped (an empty list carries nothing; no other
   record in this file has aliases). Its notes had no history line, so an Old → New sentence
   (HOUSE-RULES §3.8) was added together with the carried-row sentence below.
6. Content preservation. Rows of the generated records whose source (URL or repoRef, plus the
   item number for Simplification List rows) the audited record does not cite were carried
   over verbatim (`context: true`, access date 2026-09-24): CJ2A (`tcode-catalog.ts#CJ2A` and
   the S/4HANA and SAP_ERP search records 'Maintaining and Displaying Project Structures', loio
   2606b753128eb44ce10000000a174cb4, now evidence[4]-[6]; the CJ2A notes say so) and CJ48 (the
   SAP_ERP 'Planned Payments' search record, 6.18.latest, now evidence[4]). The CJ2B
   fixedRecord already carried its two generated context rows ('Maintaining Dates in Projects'
   S/4HANA, 'Disabling the Automatic Cost Determination in Maintenance Orders'); both were
   deep-compared with the generated rows and match. The other five generated records are fully
   covered by the audited rows.
7. As audited, not normalized: release notation. CJ2A's item row carries release '2025.001'
   where the sibling item rows carry '2025 FPS01', and CJ8V's status.release is '2025.001'
   while its source row says '2025 FPS01' (the CJ8V auditor kept it 'as in the siblings'); the
   CJ48 and CJ49 auditors set status.release to the source row's '2025 FPS01'. Both notations
   name S/4HANA 2025 FPS01. Also as audited: the CJ30 fixedRecord stamps 2026-09-25 on all six
   rows, including the three kept from the generated record (repository, Central Finance, Fiori
   Apps Library); the researcher's 'CJ30' search and the auditor's re-runs of fal-app.mjs and
   the 'Project Budgeting' records are dated that day.
8. No foundation-guard change: `transactions-c.ts` is already covered by the graduated repoRef
   test in `test/evidence-schema.test.ts` and has no FOUNDATION_RECORDS entry.
