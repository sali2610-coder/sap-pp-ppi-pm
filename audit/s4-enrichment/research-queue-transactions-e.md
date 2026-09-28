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

Batch 2 written 2026-09-28 (research and adversarial audit 2026-09-28, access date stamped
2026-09-25): 8 drafts audited, 7 written, 1 refuted (`tx:SOAMANAGER`, see below). `tx:VL60` is
`restricted` from the Restriction section of 'Extended Goods Receipt Process' (Delivery
Management LE-SHP, 2025.001: SAP replaced the process with Advanced Shipping and Receiving,
existing implementations can still use it, no successor code is named); `tx:OSS1` is
`restricted` from 'ABAPTWL - Removal of OSS1 (Logon to SAP Service Marketplace)' (2023 FPS03;
the item names no successor, so `not_available` cannot be written); `tx:/IWFND/MAINT_SERVICE`,
`tx:DBACOCKPIT`, `tx:SAINT`, `tx:SRT_MONI` and `tx:SXMB_MONI` are `unchanged`. All seven were
taken from `verdict.fixedRecord` and generated from the audited JSON as in batch 1: every writer
change applied as an exact-once replacement (a miss aborts), the written module deep-compared
with the expected objects, the eight batch 1 records checked unchanged, `status.source` checked
for identity with its row, and the diff against the audited records is exactly the writer
changes listed here (no status token, edition, release or xref changed).

Writer changes (also named in the file header): the `status.source` pointers ('evidence[2]',
'evidence[1]', 0) and copies replaced by shared consts, each the record's own row (the VL60 copy
carried a placeholder claim); `sapNote` dropped from the OSS1 item row ('2797047') and the SAINT
item row ('0002267427'), because `sap-note-format` accepts a note number only with a
me.sap.com/notes url or a repoRef, and 0002267427 is not 6 to 7 digits (the numbers stay in the
titles and claims, as in CN05); 'only' wording that describes what a source means removed
(VL60 sap_help claim 'ורק למימושים חדשים'; SRT_MONI, SXMB_MONI and SAINT status.he; DBACOCKPIT,
SRT_MONI and SXMB_MONI notes); bare item numbers in status copy replaced by the item name
(SRT_MONI and SXMB_MONI status.he; the /IWFND/MAINT_SERVICE recommendedAction now says 'the
first / second item' right after naming both); Old → New lines added or corrected
(/IWFND/MAINT_SERVICE: the audited line 's4_native → unchanged' described an unwritten
first-round draft, it now describes the generated record it replaces; SRT_MONI: the audited
notes still called the generated record current; VL60: 'five context rows' corrected to the
eight rows the generated record had); the writer instruction at the start of the SAINT notes
removed (notes render publicly); the empty SXMB_MONI alias list dropped; 16 rows of the
generated records that the audited records left out carried over as context rows with their
2026-09-24 access date (VL60: items 15.3.12 and 27.3; /IWFND/MAINT_SERVICE: 'App
Implementation for Rule Mining for Products' and item 19.30; SRT_MONI: 'Validation of Dealer
Demand', 'FI-CA Document - Return Status of Bulk Creation to Client System' and item 62.22;
SXMB_MONI: both repository rows, 'Analyzing the Online Detection Log', 'Handling Errors and
Conflicts' and the ECC 'Monitoring of the Credit Exposure' row; DBACOCKPIT: both MaxDB CCMS
rows; SAINT: 'Adjusting ABAP Dictionary Objects Using Transaction SPDD' and item 33.10). In the
carried item rows the 'not yet read' frame sentence was replaced by one saying the item's
wording on the code matches the cited 2025 FPS01 item, as the audited records state. No record
carries a `reviewer` field, a personal name or an e-mail address.

Depth (`report-coverage.mjs --ids`, before 12:50 and after 13:03): all seven moved from L1
`verification_required` (no authored status) to L1 `sap_official_verified` with the authored
status (five `unchanged`, two `restricted`); they stay at L1 (no tx-intel / tx-detail page
structure). Catalog totals: verified 647 → 654, verification_required 1156 → 1149, s4-appl
650 → 657; depth bands (L1 1279, L2 2, L3 414, L4 3, L5 120), conflict 15 and legacy 3
unchanged. The one other per-id change in that window is concurrent work in another shard
(`tx:ME22` status token `replaced` → `simplified`).

## refuted

- Batch 1 (audit 2026-09-25, written 2026-09-28): none refuted. All eight audited drafts
  (`tx:CJV4`, `tx:CJV5`, `tx:CJV6`, `tx:CMP9`, `tx:CN04`, `tx:CN05`, `tx:CN19`, `tx:CN21`)
  were written.
- `tx:SOAMANAGER` · refuted (batch 2, audit 2026-09-28, second round). The first-round problems
  were fixed (status.source is the S/4HANA 2025.001 sap_help row, loio
  3bf2452ec091434cae1384bdfce14ddd; the ERP row loio f39cf89678f04649bc9cb40c577778c9 and the
  'S4TWL - DFPS eSOA services' and 'S4TWL - Business User Management' quotes re-checked; four
  searches at 21 hits each; fal-app 'leading app(s): none; GUI app entry: none'). Open problems:
  (1) recommendedAction says to keep configuring web services and logical ports in SOAMANAGER
  on S/4HANA On-Premise, but no cited S/4HANA row mentions logical ports: the logical-port
  snippet is the ERP 6.18.latest row (HOUSE-RULES §3.2, §3.5); (2) content loss: the draft drops
  two official rows of the generated record, the S/4HANA 2025.001 sap_help row loio
  50cd7e6767074b1a99680bf58c9e5527 ('The inbound/outbound service must be attached to a port and
  configured using transaction SOAMANAGER. Create Outbound Service ...', still in the
  'SOAMANAGER' search, URL 200) and the 'S4TWL - Business User Management' row of the 2023 FPS03
  list (doc 1.35), which the notes mention but do not keep (§3.8); (3) gaps[3] says the ERP
  snippet changed without keeping the old text, 'Configure the client Web Service using
  transaction SOAMANAGER, and create the logical ports that are then bound to the corresponding
  end points.', which belongs in an Old → New note; (4) minor: the old 2023 row claim cannot be
  copied verbatim because it carries 'בלבד' and 'רק'; rewrite it from SIMPL_OP2023.pdf.txt
  lines 6164-6165. What closes it: a redraft that bounds the logical-port advice to the ECC row
  (or rests it on the S/4HANA row loio 50cd7e67, whose snippet prints 'attached to a port'),
  carries the two dropped rows as context rows, and keeps the old ERP snippet in Old → New.
  Until then the generated record in transactions-auto.ts stays in effect (no authored status).

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
- `tx:VL60` · label variance, no status conflict (batch 2, found by the writer; not raised by
  the audit): `data/tcode-catalog.ts#VL60` (line 1699) gives 'Inbound Delivery Purchasing
  Documents' ('מסמכי רכש למשלוח נכנס'), while the Fiori Apps Library (VL60, S32OP) lists the app
  'Extended Inbound Delivery Processing', and the page 'Extended Goods Receipt Process' names
  VL60, next to BORGR, as the transaction for calling up the user profiles of that process. The
  record's repository row quotes the catalog, as a quote must. Not fixed here
  (tcode-catalog.ts is outside this writer's files). What settles it: the transaction text in
  SE93 on a target system, then a catalog fix.
- `tx:OSS1` · open tension, no status conflict (batch 2, raised by the audit): the 2025.001
  search record 'Reading Documentation and Checking Technical Requirements' (Business Partner
  for Financial Services) still prints 'Use the Note Assistant in the Internet, or transaction
  OSS1 , to read composite note 398888', while the item 'ABAPTWL - Removal of OSS1 (Logon to SAP
  Service Marketplace)' (2023 FPS03) points to note 2797047, titled 'OSS1: Transaction is
  deactivated'. The snippet is cut off and procedural, so `conflicting_sources` was not set;
  the record's notes name the gap. What settles it: SE93 on a target system, or a read of note
  2797047 (me.sap.com, login required).
- Audit inconsistency on 'only' wording (batch 2): the DBACOCKPIT and /IWFND/MAINT_SERVICE
  audits rejected 'רק' / 'בלבד' under honesty rule 2, while the SRT_MONI, SXMB_MONI and SAINT
  fixedRecords kept 'רק ככלי איתור' / 'רק כמגבלה' in status.he and the VL60 fixedRecord kept
  'ורק למימושים חדשים' in its sap_help claim. The writer removed the 'only' that describes what
  a source means or recommends (listed above under the writer changes) and kept the literal
  location and limitation statements the audits verified: 'SM01 מופיע בשורת Other Terms בלבד'
  (OSS1), 'SAINT מוזכר רק בפעולה הנדרשת' (SAINT item row), 'VL32N בלבד' for batch and serial
  numbers (VL60 recommendedAction), 'צד ECC נשען על רשומת המאגר בלבד' (SAINT status.he). What
  settles it: one ruling on literal location statements, applied in a later correction batch.
