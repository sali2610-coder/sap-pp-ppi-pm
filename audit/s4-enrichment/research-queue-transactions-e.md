# Research queue · transactions catalog, shard E (S/4HANA enrichment)

Kept by the single writer for `data/verification/transactions-e.ts`. One line per id that was
refuted or deferred at the adversarial-verification gate, and one line per repository
conflict the audited records surfaced.

Batch 1 written 2026-09-28 (research and adversarial audit 2026-09-25, access date stamped
2026-09-25): 8 drafts audited, 8 written, none refuted. Three are the simulation codes the item
'S4TWL - Current simulation functions in project system' lists (`tx:CJV4`, `tx:CJV5`,
`tx:CJV6`, each `changed`); two are codes the item 'S4TWL - Simplification of maintenance
transactions' lists (`tx:CN19`, `tx:CN21`, each `changed`; CN21 also cites 'S4TWL - Production
Resources and Tools functions for projects', which names it only as a PRT indicator); two are
`compatibility_scope` from 'S4TWL - Project texts (PS texts)' (`tx:CN04`, `tx:CN05`, no
successor, because no cited record prints a Fiori app id for 'Project Text'); and `tx:CMP9`
carries the authored status `verification_required`, because 'S4TWL - Workforce Planning' lists
CMP9 under the compatibility scope and says workforce planning is perpetual scope from 2023
without saying whether that covers CMP9. Seven were taken from `verdict.fixedRecord`;
`tx:CMP9` was written from the draft (the audit listed no problem and no downgrade). The records
were generated from the audited JSON, not retyped into TypeScript: every writer change was
applied as an exact-once substring replacement (a miss aborts the run), every row of the eight
generated records was checked to be either cited by the audited record (same URL or repoRef,
plus the item number for Simplification List rows) or carried, and the written module was
deep-compared against the expected objects, with `status.source` checked for identity with its
evidence row and every audited evidence row, xref list and status token checked unchanged
except the one declared CN19 wording fix.

Writer changes (also named in the file header): the pointer strings and copies in
`status.source` replaced by shared consts, each the record's own item row (the CMP9 and CN04
copies were identical to that row; the CJV6 and CN05 copies were placeholders carrying the row's
other fields); the empty `aliases` of CJV5 and CJV6 dropped; the CJV6 `status.he` reworded to
name the item instead of its bare number (HOUSE-RULES §3.5) and to keep its compatibility-scope
clause inside the item's own wording (see the audit inconsistency below); the CN19 repository
row no longer calls the catalog's English label 'רשמי' (official); Old → New lines added to
CJV4, CJV5, CJV6, CMP9, CN19 and CN21 (CN04 and CN05 already had one); nine rows of the
generated records that the audited records left out carried over as context rows with their
2026-09-24 access date (CJV4: its Fiori Apps Library row; CJV5: 'Maintaining and Displaying
Project Structures', S/4HANA 2025.001 and ECC 6.18.latest; CMP9: 'Evaluating Human Resources',
S/4HANA and ECC; CN04: 'Maintaining and Displaying Documents', S/4HANA and ECC; CN21: the
`data/tcode-catalog.ts#CN21` repository row and the 2023 FPS03 item 32.12 row, whose 'not yet
read' frame sentence was replaced, because the research read that item and the audit confirmed
its wording matches item 10.1.59). No record carries a `reviewer` field, a personal name or an
e-mail address.

Depth (`report-coverage.mjs --ids`, before and after): all eight moved from L1
`verification_required` (no authored status) to L1 `sap_official_verified` with the authored
status (five `changed`, two `compatibility_scope`, one `verification_required`). They stay at
depth L1: none has a tx-intel / tx-detail record, so the page structure (3 authored facts needed
for L2) is missing. Batch effect on the catalog totals (`npm run report:coverage -- --catalog
transactions`): verified +8, verification_required -8, s4-appl +7 (CMP9 is not applicable
while its status is `verification_required`), depth bands and conflict unchanged. Measured
totals: 12:16 L1 1279, L2 0, L3 424, L4 2, L5 113, verified 629, verif.req 1178, conflict 11,
s4-appl 632; 12:29 L1 1279, L2 1, L3 419, L4 2, L5 117, verified 637, verif.req 1168, conflict
13, s4-appl 640. The remainder, attributed by a per-id diff of the two `--ids` runs, is
concurrent work in other shards (VA23, VA41, VA42, VA43 L3 to L5; VD01 and VD02 to
`conflicting_sources`; VBO1 and VC/2 to `sap_official_verified`; ME23 changed its status token
only).

## refuted

- Batch 1 (audit 2026-09-25, written 2026-09-28): none refuted. All eight audited drafts
  (`tx:CJV4`, `tx:CJV5`, `tx:CJV6`, `tx:CMP9`, `tx:CN04`, `tx:CN05`, `tx:CN19`, `tx:CN21`)
  were written.

## conflicts

- `tx:CMP9` · repository vs official (batch 1): `data/tcode-catalog.ts#CMP9` (line 216) labels
  CMP9 'Workforce Planning: Project View' ('תכנון כוח אדם: מבט פרויקט'), while the item
  'S4TWL - Workforce Planning' prints 'CMP9 Workforce Planning - Reporting', the Fiori Apps
  Library (CMP9, S32OP) lists the app 'Workforce Planning - Reporting', and both carried
  'Evaluating Human Resources' search records print 'CMP9 Workforce Planning - Reporting' in
  their snippets. The researcher's note attributes 'Project View' to CMP2. Recorded by the
  researcher, passed by the auditor, not fixed (tcode-catalog.ts is outside this writer's
  files); the record's repository row quotes the catalog label, as a quote must. What settles
  it: a repository fix of the CMP9 label against the item and the library.
- `tx:CJV6` · label variance, no status conflict (batch 1): `data/tcode-catalog.ts#CJV6`
  (line 187) and the Fiori Apps Library (CJV6, S32OP) give 'Display Administration Data'
  ('הצגת נתוני ניהול'), while the item 'S4TWL - Current simulation functions in project
  system' prints 'CJV6 Maintenance: Version administration'. The auditor asked for both names
  in the record's notes rather than letting one silently override the other; the status does
  not depend on the label. What settles it: the transaction text in SE93 on a target system.
- `tx:CN19` · label variance, no status conflict (batch 1, found by the writer; not raised by
  the audit): `data/tcode-catalog.ts#CN19` (line 227) gives 'Display Activity Data (Network)'
  ('הצגת נתוני פעילות (רשת)'), while the item 'S4TWL - Simplification of maintenance
  transactions' prints 'CN19 Display Activity (From DMS)'. The draft's repository row called
  the catalog label the official English name; the writer dropped 'רשמי' so the row quotes the
  catalog without ranking it above the item. No Fiori Apps Library entry leads with CN19 at
  S32OP to arbitrate (fal-app --tcode CN19: none). What settles it: the transaction text in
  SE93 on a target system, then a catalog fix if the label is wrong.
- `tx:CJV4` / `tx:CJV6` · audit inconsistency on the scope framing (batch 1): the CJV4 auditor
  rejected wording that puts the compatibility-scope membership of the simulation functions in
  the past tense, because the item 'S4TWL - Current simulation functions in project system'
  states it in the present tense and then says 'With these enhancements the simulations
  overall are part of SAP S/4HANA perpetual scope'. The CJV6 fixedRecord kept that framing
  ('ולא בהיקף תאימות מוגבל' in status.he; 'עברה מהיקף תאימות ... להיקף קבע' in its item row
  claim), as does the approved shard C const `CJV3_SIMPL2025`. The writer reworded only the
  CJV6 status.he, which had to change anyway for §3.5, and left the audited evidence claims as
  approved. The CN19 and CN21 records (item 'S4TWL - Simplification of maintenance
  transactions', whose wording is 'with this enhancement they are part of SAP S/4HANA
  perpetual scope') use the same past-to-present framing and were approved as written. What
  settles it: one ruling on the framing for all codes of both items, applied in a later
  correction batch (wording only; the status tokens and the evidence stand).
