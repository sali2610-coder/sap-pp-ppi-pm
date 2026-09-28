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

## refuted

- Batch 1 (2026-09-28): none refuted. All nine audited drafts (`tx:VA21`, `tx:VD03`, `tx:VD05`,
  `tx:VD06`, `tx:VK11`, `tx:VKM1`, `tx:VKM3`, `tx:VKM4`, `tx:VKM5`) were written.

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
