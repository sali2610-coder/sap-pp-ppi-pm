# Research queue · fiori catalog (S/4HANA enrichment)

Kept by the single writer for `data/verification/fiori.ts`. One line per id that was
refuted or deferred at the adversarial-verification gate, with the evidence still missing.
Written 2026-09-02 during the fiori data commit (19 drafts audited: 18 written from their
auditors' `fixedRecord` or, for `fiori:F2730` and `fiori:F1576` (no fixedRecord), from the
draft with every listed downgrade applied; 1 refuted; the foundation worked example
`fiori:F0843` was superseded by its audited record). The catalog graduated out of the
repository-only guard in `test/evidence-schema.test.ts` in the same change (the "honest
fiori path" test now asserts that any level above `verification_required` is carried by an
official library/help URL, and that every `sap_official_verified` row cites an official host).
Writer policy applied uniformly: `accessedAt` / `lastVerifiedAt` stamped 2026-09-02 per the
orchestrator (live loio + versionId re-checks ran 2026-09-05 and 2026-09-07, disclosed in the
records' notes where the auditor asked for it); no `reviewer` field (no overlay record in
`data/verification/**` carries one; the audited drafts' reviewer strings, several still
reading "awaiting sign-off", were dropped); `status.source` hoisted into a shared const
wherever it duplicates an evidence entry; stale sentences describing the pre-graduation test
gate were removed from the notes of F0843, F0251 and F2023; the two Confirm Jobs What's New
URLs carry the deliverable GUID the search JSON returned on 2026-09-07 (2022 deprecation under
`f5d3e1005efd4e86acf9a65abf428082`, 2023 deletion under `f296651f454c4284ade361292c633d69`).
Coverage (`npm run report:coverage -- --catalog fiori`): before 20 records, all L3, 19
verified / 1 verification_required / 0 conflicting; after 20 records, L2 2 / L3 7 / L5 11,
12 verified / 0 verification_required / 8 conflicting / 18 S/4-applicable / 2 edition-specific.

## refuted

- `fiori:F3289` — RESOLVED 2026-09-22 (entry below kept for history). Rewritten draft passed the
  audit (not refuted) and was written with both auditor downgrades applied: an evidence row was
  added for What's New 2023 (loio `ce274262f5584b0f9049022063100935`, 2023.000, URL taken from the
  search JSON under deliverable `f296651f454c4284ade361292c633d69`, claim quoting only 'App Changed
  3LQ PP-CFS-CE SAP S/4HANA 2023'), and "או במקומן בתרחישים חדשים" was removed from
  recommendedAction. Still open: role SAP_BR_PRODN_PLNR, catalog SAP_SCM_BC_CFS, CRHD/KAKO link,
  Cloud 2002 availability and the "PP work centers only, not PM" claim in apps.ts; scope item
  31L vs 3LQ disagrees across SAP records.
- `fiori:F3289` (Manage Work Center Capacity) — REFUTED, not written. (1) evidence[0] and
  status.source quote 'View the capacity requirement and available capacity for work centers.
  Reschedule the operation start and end date if required' as text of loio
  `74e3356c89914b1495667e7d1f76eb23` (2025.001); the sentence appears in no help.sap.com
  search snippet for SAP_S4HANA_ON-PREMISE or SAP_S4HANA_CLOUD, and the topic body is a JS
  shell that was not read, so it is an unsupported quotation attributed to an official page
  (the other three fragments in that claim are in the snippet). (2) status.he asserts for
  On-Premise "רכיב PP-CFS-CE, פריט היקף 31L" from a source whose snippet names neither; the
  only On-Premise records carrying "31L PP-CFS-CE" are What's New 2020 (loio
  `2acb634615974535b4fabdc710937599`, 2020.000) and 2021 (loio
  `7b61621545224d24be7b20624523dcdf`, 2021.000), not cited; What's New 2023 (loio
  `ce274262f5584b0f9049022063100935`) lists the app under "3LQ PP-CFS-CE" and Cloud What's New
  2408.2 (loio `a16c230ccde2438c93f700e0e5565124`) labels "3LQ (Production Capacity Leveling)
  31L (Production Capacity Evaluation)", so SAP's own scope-item label disagrees and the record
  must say so. (3) status.he leans on the repository ("ב-ECC ... CM01/CM07"; "אין מקבילה ב-ECC")
  without a `repository` evidence row + repoRef, and the second clause goes beyond
  `data/fiori/apps.ts#F3289`. What unlocks a rewrite: drop the unsupported quotation, add the
  2020/2021 What's New records as the source for component + scope item with the 31L/3LQ caveat,
  add a repository row with repoRef for the CM01/CM07 pairing. Confirmed OK in the draft: all
  four URLs on allowlisted hosts, loios/versionIds live, library title 'Manage Work Center
  Capacity - Fiori Apps Library' at Apps('F3289')/S21OP, 2602 Technical Details (App ID F3289,
  PP-CFS-CE-2CL), s4_native token, xrefs resolve. `fiori:F3289` stays derived from apps.ts
  (`fiori:F3951` still xrefs it, which resolves through the universe).
- 2026-09-24 · batch 1 of the Fiori depth run (F2731, F1511, F2730, F2730A, F4072, F2774):
  none refuted, none queued; all six written from their audited drafts and verdicts. The
  F4072 and F2774 verdicts judged edits an interrupted run had left in the working tree
  (reverted on 2026-09-24 and kept as `quarantine/fiori-partial-writer.diff` in the session
  scratchpad); those edits were
  rebuilt from that diff and the verdicts' downgrades applied on top.
- 2026-09-24 · batch 2 of the Fiori depth run (F5325, F2336, F3577, F3364, F1576, F0843):
  none refuted, none queued. F3577 was written from its auditor's `fixedRecord`; the other
  five from their drafts with every listed downgrade applied (the optional ones included,
  after the writer re-ran `scripts/fal-app.mjs` and `scripts/sap-help-body.mjs` for the
  values they add). Writer normalisations beyond the lists: the F3364 library rows carry
  `release` 2025.001 / 2023.000 instead of S32OP / S27OP (HOUSE-RULES §1, as the F3577
  verdict required for the same rows), and its two empty-result rows sit at
  `verification_required` like the F2731 and F3577 empty-result rows; `reviewer` was dropped
  from F5325 and F0843 (house policy above); F2336 `recommendedAction` says the patch "was
  applied" instead of "apply it". Commit 8f7273dd (another session, 19:56:40, message about
  F4072 only) swept these overlay and catalog edits into history before the gates ran; its
  content equals the writer's tree byte for byte.
- 2026-09-24 · batch 3 of the Fiori depth run (F4604, F0251, F0247A, F3951, F2176, F3289):
  none refuted, none queued. F0247A, F3951 and F3289 were written from their auditors'
  `fixedRecord`; F4604, F0251 and F2176 from their drafts with every listed downgrade applied
  (the optional ones included). No lookup was re-run. Writer normalisations beyond the lists:
  (1) the catalog patches were applied in the same change, so every repository row and
  `recommendedAction` that described the curated values in the present tense is dated
  ('עד 2026-09-24 ...', 'ה-catalogPatch הוחל ...'), the defect class the F4604 auditor flagged,
  applied also to F0247A, F2176, F0251 and F3289; (2) the F3951 and F0251 library rows carry
  `release` 2025.001 / 2023.000 (HOUSE-RULES §1, as for F3364 in batch 2) instead of '2025 FPS01
  (S32OP)' / '2023 (S27OP)' / '2025 FPS01 (On-Premise)' / '2023'; (3) `reviewer` dropped from
  F0247A, F3951 and F3289 (house policy); (4) F0247A keeps all four existing inline sap_help
  rows (the verdict named three; 'Deprecated Apps in Material Requirements Planning', 2021, is
  the fourth) and its xrefs follow the draft and the downgrade text (MD04, MD06, MD07, F0251,
  F0251A): the fixedRecord's `tx:MD01N` was not added, because the kept notes of that record
  say no F0247A source names MD01N; (5) F3289 and F2176 keep their previous notes after the new
  text (§3.8), F3289 with 'פקודות תחזוקה' for the older term; (6) the F4604 notes now date the
  F4072 name sentence (the curated F4072 was corrected on 2026-09-22); (7) `F3951_APP_TOPIC`
  carries the body-read claim (DATE24) and the record notes keep the old snippet quote as
  Old → New; (8) catalog `role` / `odata` strings hold bare names (F0247A roles and three OData
  services, F2176 PPDS_RES_SCHEDULE), with R-ids and versions kept in the record and in the
  entry comment; (9) the F3289 auditor's §3.2 reading ('only' wording) was applied to the rest
  of that record (notes, repository row) and to 'יחיד' in the F2176 status; the F0251 notes say
  the secondary roles and the retail catalog were not copied to apps.ts, instead of 'not
  verified' (the library rows print them).
- 2026-09-24 · batch 4 of the Fiori depth run (F5104A, F1339, F2023, F2828, F5241, F2072):
  none refuted, none queued. F5104A, F2023 and F5241 were written from their auditors'
  `fixedRecord` (the rows it marks unchanged were kept byte for byte from the file); F1339,
  F2828 and F2072 from their drafts with every listed downgrade applied (the optional F2072
  sourceTitle included). No lookup was re-run. Each status source is a new const used as an
  evidence row too: `F5104A_FAL_S32OP`, `F1339_FAL_S32OP`, `F2023_LIBRARY_S32OP`,
  `F2828_FAL_S32OP`, `F5241_FAL_S32OP` (the F5241 verdict suggested `F5241_FAL`),
  `F2072_FAL_S32OP`; `F1339_APP_TOPIC` now carries the re-read claim (DATE24), as its verdict
  asked. Writer normalisations beyond the lists: (1) the catalog patches were applied in the
  same change, so the `recommendedAction` of F5104A, F2023 and F2072 and the notes of F5104A,
  F1339, F2023 and F2828 that described curated values in the present tense are dated ('עד
  2026-09-24 ...', 'ה-catalogPatch הוחל ...'), and every record's notes name the fields that
  were patched; (2) em dashes the verdicts did not list were replaced as well (F5104A notes
  'לא נמחק — נשמר', two more in the F2828 notes, one in the F5241 library claim); (3) the
  F5104A draft notes quoted the curated technical text including a word PLACEHOLDER_RE rejects;
  the sentence now says the OData field was empty with a 'טרם אומת' note; (4) `reviewer` was
  dropped from F5104A, F1339 and F2828 too (house policy; the F5241 verdict required it);
  (5) the F2828 notes reframe 'אין successor/predecessor רשמי' as what the library shows (the
  F2023 verdict's §3.2 reading), and the F2828 and F5104A notes record the status-source move
  as Old → New (§3.8), F5104A also the Define Control Parameters advice its old
  `recommendedAction` carried; (6) `explain` text in `data/fiori/apps.ts` was rewritten outside
  the patch field list: F5104A (technical), F2828 (consultant, technical, commonErrors) and
  F5241 (technical) as their verdicts required, F2023 and F2072 (technical) and F1339
  (consultant, technical) because they named what the patch replaced ('טרם אומת' OData notes,
  SAP_BR_MRP_CONTROLLER, "not read from the library"); the new text uses only values printed
  in the audited records; (7) `LV2` in `data/fiori/apps.ts` became unused and was removed. Kept
  verbatim although it uses the older term for maintenance: the F2828 Maintenance Management
  2025.001 evidence row, which its verdict required unchanged. Coverage (`npm run
  report:coverage -- --catalog fiori`): before 34 records, L1 12 / L2 3 / L3 5 / L5 14; after
  L1 10 / L2 3 / L3 5 / L5 16 (F5241 and F2072 went from L1 to L5 once apps.ts carried role,
  catalog, OData and GUI transactions); 26 verified / 0 verification_required / 8 conflicting
  unchanged.

## conflicts

- `fiori:F2731` — no official record names F2731 (help.sap.com On-Premise + Public Cloud,
  classic library externalViewer, domain-restricted search); the curated title "Manage
  Maintenance Orders" belongs officially to F5241 (Maintenance Management 2025.001 loio
  `55828a51fe634affb76fe4283f71c1d9`; What's New 2025 FPS01 loio
  `ec6bf626bf8246439f2795f31e7f07c3`). Three names inside the repo for the same id: Manage
  Maintenance Orders (`data/fiori/apps.ts`, `data/centers/fiori.ts:20`, tx-intel IW32 / IW33 /
  IW37N / IW38 / IW39 / IW40), Create Maintenance Order (`data/lifecycle.ts#IW31`,
  `data/solutions.ts:42`), Manage Usage Decisions (`data/library/qm-textbook/ch18.ts:1363`;
  officially F2345, loio `85fae2574096f432e10000000a441470`). Product decision: re-key the
  curated record to F5241 (then the What's New 2025 loio `e765a4541f49412b9508fdab1ecaf2c9`
  scope items 4HH/4HI/BH1/BJ2 and component PM-FIO-WOC-MO become citable); `fiori:F5241` is not
  in the universe, so no alias was set and no successor written. `cds:C_MaintOrderListReport`
  from the curated record is not in the route manifest.
- `fiori:F1511` — official name is "Request Maintenance" (library title Apps('F1511'); Feature
  Comparison loio `5d2fbff31efc440b8200fbad95a68dfe` and app topic loio
  `e0a05d562fc7f64ee10000000a44538d`, 2025.001); the curated name "Create Maintenance Request"
  is the separate app F1511A, which is not in `data/fiori/apps.ts` (cannot be xref/successor).
  Same name-id pairing to fix in `data/centers/fiori.ts`, `data/lifecycle.ts` (IW21),
  `data/tx-intel.ts` (IW21, IW25). Role / catalog / OData in the curated record unverified.
- `fiori:F2730` — the app called Confirm Jobs is W0020 in every official record (deprecated
  2022 loio `af315b2ddb3e488eb3999f4ae144f0ed`, deleted 2023 loio
  `22fd7c9f368f454fad5b3acfa5a26b6d`, library Apps('W0020')/S11OP); F2730 appears in no
  official record. Written as `not_available` with successor `fiori:F5104A` and alias W0020.
  Curated OData `API_MAINTENANCEORDERCONF` vs the documented `API_MAINTORDERCONFIRMATION`
  ("APIs for Maintenance Management", 2023.latest and 2025.001 snippets). Repo consumers of the
  wrong pairing: `data/tx-intel.ts` IW41 s4Delta, `data/centers/fiori.ts` confirm-jobs row.
- `fiori:F2730A` — "Manage Technical Objects" exists in no official record under any id; the
  repo uses three ids for the name (F2730A apps.ts + centers/fiori.ts; F2079 in
  `data/sapData.pm.ts` on IFLOT/IFLOS/ILOA/EQUI/EQKT/EQUZ/OBJK; F1827 in tx-intel IE01). The
  documented technical-object apps for On-Premise 2025.001 are Find Technical Object (F2072),
  Process Technical Object (W0029, Web Dynpro), Display Technical Object (W0028) and Manage
  Technical Object Structures (F8669); none is in `data/fiori/apps.ts`. No authored status
  (the derived s4_native pill stands over conflicting evidence; notes disclose it). Origin of
  the curated id is undocumented.
- `fiori:F4072` — official: Screen Maintenance Requests (Maintenance Management 2025.001 loio
  `5ae0d3b492dc4df3a0eb1b8cad02cda3`; library appId=F4072; What's New 2021 marks it App New);
  curated: "Schedule Maintenance Plans" with IP10 / IP30 / API_MAINTENANCEPLAN, repeated in
  `data/centers/fiori.ts` and tx-intel IP01 / IP10 / IP41 s4Delta, while
  `data/library/fiori-apps.json` already says Screen Maintenance Requests. Scheduling apps found
  officially: Mass Schedule Maintenance Plans (F2774, loio
  `12f60922946c4ec49807c81ad93d5ba4`) and Manage Maintenance Plans (F5325, What's New 2022 loio
  `a784971bbee742b2bc491a97583a3621`); neither in the universe. Public Cloud 2608 titles F4072
  "(Old Version)" and recommends Manage Maintenance Notifications (F5777); no On-Premise
  record for F5777, so no successor. After the curated fix the record can drop
  conflicting_sources.
- `fiori:F2336` — id/name official; curated role `SAP_BR_PRODN_OPERATOR_DISC` contradicts the
  official "Production Supervisor - Discrete Manufacturing" (technical template name
  `SAP_BR_PRODN_SUPERVISOR_DISC` seen only on the Schedule Order Release Runs page, not in F2336
  context); curated OData `API_PRODUCTION_ORDER_2` is the released integration API, not the UI
  service the PLM snippet places beside the app (`PP_MPE_ORDER_MANAGE`). Catalog
  `SAP_PP_BC_PRODN_ORDER` and `cds:I_ProductionOrder` repository-only.
- `fiori:F3577` — official id for Manage Process Orders is F4587 (Feature Comparison
  2025.001 loio `0af42d30f5654313ac5d7a0ff9f36094`; What's New 2021 FPS01 loio
  `77ff56ba8e584f4cb537b660e7810fd7`; Retail 2025.001); F3577 in no official record. Repo drift:
  F4587 in `data/library/fiori-apps.json` and book7 ch5, F4512 in `data/sapData.pppi.ts` (which
  the index maps to Manage Launchpad Pages; fix in the xlsx, not the generated file). Curated
  OData `API_PROCESSORDER_2` matches neither documented service (`API_PROCESS_ORDERS`,
  `API_PROCESS_ORDER_2_SRV`). F4587 / F5323 not in the universe. Recommended: re-key to F4587
  with F3577 as alias; fix tx-intel COR1/COR2/COR3/COR7/C202, `data/solutions.ts`,
  `data/centers/fiori.ts`.
- `fiori:F3364` — the app called Confirm Process Order carries App ID CORK (Public Cloud
  2608.500 loio `d50388eb8dbd469db5f36f7ad71bc585`; classic library Apps('CORK')); On-Premise
  2025.001 documents the confirmation path as "Confirm Process Order Operation (COR6N)" inside
  F4587 / F5323. F3364 in no official record (dedicated searches returned F3464 / F3384 / F3346
  / F3664 / F8364 and Infotype 3364). Authored `verification_required`, source null. Curated
  OData `API_PROCORDCONF` unsupported; documented name is `API_PROC_ORDER_CONFIRMATION_2_SRV`
  (What's New 2023 FPS03 loio `fe27113cd73e4219ac8dd23a4db1ef16`). CORK is not a valid
  `fiori:` id shape, so a product/schema decision is needed before representing it.
- `fiori:F1576` — every official source names Manage Batches as F2462 (LO-BM 2025.001 loios
  `34b021588aee0a02e10000000a44147b`, `006de05317e74e5399d82fb88f21810d`; PLM loio
  `ed8ef9ad029a421d829e5d393873d741`; library Apps('F2462')/S16OP); F1576 in no official record.
  Written under F1576 (the universe id) with alias F2462. Curated OData `API_BATCH` unsupported
  (official: `LO_BM_BATCH_SRV` as the app's data source, `API_BATCH_SRV` as the Batch API). Same
  id in `data/centers/fiori.ts`, `data/solutions.ts`, tx-intel MSC1N / MSC3N, and in
  pp-textbook ch10, qm-textbook ch18, mm-textbook ch04 and academy lessons (not touched).
- `fiori:F0843` — official: Post Goods Receipt for Purchasing Document (MM-IM 2025.001 loio
  `9ddf815494758c4ce10000000a4450e5`; library Apps('F0843')/S23OP); "Post Goods Movement" is the
  Web GUI app whose official id is MIGO (loio `ed827c12afa7489d90b0013fd2733b3e`; Public Cloud
  loio `38b1ba53422bb54ce10000000a174cb4`). Wrong pairing lives in `data/fiori/apps.ts`,
  `data/lifecycle.ts` (MB1A, MB1C, MIGO), `data/solutions.ts` (goods-movement),
  `data/tx-intel.ts` (IW3K, MB1A, MB1B, MB31 s4Delta; ME23N fiori field "Display Purchase Order
  — F0843", a third name; MIGO fiori field "... F0843A", an id no official record returned),
  `data/sapData.pppi.ts` ("(אמת ID)" marker), and `data/verification/transactions.ts` tx:MB1B
  (xref fiori:F0843 as MB1B's Fiori alternative) and tx:ME23N (Tier-2 quote). MIGO does not fit
  the `fiori:` id syntax; product/schema decision required. Role / catalog / OData /
  I_MaterialDocumentItem link repository-only. Optional extra evidence not yet cited: Feature
  Comparison for Goods Movement loio `de29287f0c0840caacbbc6f79c8d6242` (snippet 'App ID MIGO
  F0843 F2502 ...').
- `fiori:F4604` — id/name official. Official snippets pair the app with Manage Maintenance
  Orders (F5241), Find Maintenance Orders (F2175), Find Maintenance Orders and Operations
  (F2173): none in the universe. BAdI `EAM_CROSS_APP_NAV_CONTROL` (What's New 2023 FPS02) absent
  from `data/exits.ts`. `data/library/fiori-apps.json` truncates the name to "Orders" (index
  defect). Role / catalog / OData repository-only.
- `fiori:F0251` — written `changed` (predecessor of F0251A since 2023, "will remain available
  until further notice"; documented already in SAP Fiori 1.0 for SAP ERP 2017-07, so the
  derived s4_native overstated). `fiori:F0251A` not in the universe (add it to apps.ts to point
  a successor). Curated OData `PP_MRP_COCKPIT` vs documented `PP_MRP_COCKPIT_SRV`.
  `data/sapData.pppi.ts` rows CO24 / MD04 call F0251 "Monitor Material Coverage - Net Segments"
  (officially F0247A): fix in the xlsx. Public Cloud 2608.500 also documents F0251 (loio
  `31c16f543e0de830e10000000a44538d`), not added as evidence. Role, I_MRPMaterial link,
  MDKP/MDTB unverified.
- `fiori:F0247A` — official id F0247A (What's New 2025 loios `3720a102615c4e409d545c039c60837d`,
  `cd777a64504842beaefc7b491cb0dc5f`; Feature Comparison 2025.001 loio
  `f8323a1b1ddb4d538bce5c3aa3588e1b`; Public Cloud 2608.500). The same PP-MRP 2025.001 guide
  still titles "App Extensibility: Monitor Material Coverage - Net Segments (F0247)" (loio
  `35dd4a56c4139d21e10000000a44538d`) and the classic library lists appId=F0247; no snippet
  ties F0247 to F0247A as predecessor/successor, so alias F0247 is a reading, not a fact. Repo
  uses F0247 in `data/centers/fiori.ts`, `data/lifecycle.ts`, `data/solutions.ts`;
  `data/sapData.pppi.ts` pairs the name with F0251. The curated `explain.technical` carries a
  provisional "טרם אומת" wording about CDS to reword. First release of F0247A undetermined
  (What's New 1809 loio `b2aafd49b9b44300b624e5f99be72a90` names the app without an id).
- `fiori:F3951` — id/name official. Repo tags the app "(PP-DS)" in `data/lifecycle.ts#CM21`,
  `data/transactions.ts` (CM01), `data/pppi-master-data-facets.ts`,
  `data/academy/lessons/pp-generated.ts`, while official records place it under PP-CFS (scope
  item 3LQ); `data/domain-detail.ts` names "PP-DS Planning/Scheduling Board" without the app
  name. No official statement replaces CM21/CM25 by the app (repository advice only). Role
  `SAP_BR_PRODN_PLNR` / catalog `SAP_SCM_BC_CFS` / OData unverified; book7 ch5 section F3951
  names no role.
- `fiori:F2176` — id/name official (PP/DS 2025.001; What's New 1610). Curated `cloud: yes`
  unverified (no Public Cloud topic found). Advanced Scheduling Board (library F5460, new in
  2022) is not in the universe; no replacement/deprecation record found for F2176.
  `data/library/wm-textbook/ch09.ts:39` and `data/academy/lessons/wm-generated.ts` place F2176
  in a PM/EWM spare-parts chapter (official: PP/DS). `explain.technical` in apps.ts phrases the
  OData/CDS layer as a future item instead of "unverified".
- `fiori:F5104A` — id/name official; xref `fiori:F2730` kept only to navigate to the Confirm
  Jobs conflict (F2730 = Confirm Jobs is unconfirmed; official id W0020). The library row is
  recorded at `verification_required` to match the tx:IW41 precedent for the same URL. Curated
  Public Cloud availability "2105" unchecked (official document says "SAP S/4HANA and SAP S/4HANA
  Cloud Private Edition"). Role / catalog / OData repository-only.
- `fiori:F1339` — id/name official. Curated role `SAP_BR_MRP_CONTROLLER` contradicts the
  official roles `SAP_BR_MATL_PLNR_EXT_PROC` / `SAP_BR_PRODN_PLNR` (PP-MRP 2025.001 loio
  `fdd11356c16b8222e10000000a44147b`): fix apps.ts. MDKP / MDTB not in the universe. MDBT link
  rests on the CBP transaction overview (loio `757db6535fe6b74ce10000000a174cb4`, not cited as
  evidence) and tx-intel. Business catalog for On-Premise, OData/CDS, first release unverified.
- `fiori:F2023` — id/name official (Report and Repair Malfunction; Manage Malfunction Reports
  and Report Malfunction are tiles). `data/library/fiori-apps.json` and book7 ch6 use tile names
  as app names (index defect, not an id conflict). `data/sapData.pm.ts` pairs "Report
  Malfunction" with F2215, an id no official record names (not added as alias). Book 1 ch8 names
  OData `EAM_MALFUNCTION_MANAGE` (Tier-2 only). Role / catalog unverified; Cloud 1708 not
  checked (On-Premise 1709 What's New loio `b2faa84553414ac5b45c58e003824990` found). Aliases
  are the two tile names (resolve only through the alias map).
- `fiori:F2828` — id/name official, the only library page actually read in a browser this
  batch. Role `SAP_BR_MAINTENANCE_PLANNER` / catalog `SAP_EAM_BC_ORD_MC` / OData / target
  mappings show "No data" without sign-in. Curated guiTx IP10/IP30/IW38 and tables
  MPLA/MHIS/AUFK describe maintenance plans, while the official description is about
  notifications, orders and non-stock purchasing; the record's xrefs are navigation aids, not an
  official mapping. Navigation targets F2827/F2175/F2071/F2173/F3065 (book7 ch6) not in the
  universe.
- Cross-cutting — (a) the F5241 / F2072 / W0029 / W0028 / F8669 / F4587 / F5323 / F2462 /
  F1511A / F0251A / F2774 / F5325 / F5777 / F5460 / CORK / MIGO / W0020 ids surface repeatedly
  as the official identity or successor and none is in `data/fiori/apps.ts`; a curated-catalog
  pass (product decision) unblocks successors and xrefs for at least eight records. (b) The
  F2730A auditor found six URLs already committed in `data/verification/*.ts` that cite a
  2023.000 loio under the 2025 FPS01 What's New deliverable `f5d3e1005efd4e86acf9a65abf428082`
  (for example the tx:IW41 'Deletion of Confirm Jobs App' row); help.sap.com answers HTTP 200 for
  any shell path, so those should be re-keyed to the deliverable the search JSON returns
  (`f296651f454c4284ade361292c633d69`) in a separate cleanup. (c) `data/fiori/apps.ts` marks
  every record `trust: curated` with the source string 'SAP Fiori Apps Library (curated)' and no
  URL; eight records now carry official evidence contradicting the curated id or name. The
  curated file is outside this overlay's write scope.
- 2026-09-24 · library re-check through its public OData service (`scripts/fal-app.mjs`,
  S32OP = 2025 FPS01, S27OP = 2023), audited and written:
  - `fiori:F2731`: still open. `F2731` returns empty Results on S32OP and S27OP; `--tcode IW31`
    on S32OP lists F2023, F2953, F5241 (Manage Maintenance Orders), IW31 and W0017, not F2731.
    Re-keying or retiring the curated id stays a product decision.
  - `fiori:F2730`: still open (conflicting_sources). `F2730` is empty on S32OP and S27OP;
    `--tcode IW41` lists F5104A (Perform Maintenance Jobs) and IW41. `data/fiori/apps.ts#F2730`
    unchanged.
  - `fiori:F2730A`: still open (conflicting_sources). `F2730A` is empty on S32OP and S27OP;
    `--tcode IE01` lists IE01 and W0029; W0028 was read directly (Display Technical Object, Web
    Dynpro, SAP_BR_MAINTENANCE_TECHNICIAN, SAP_EAM_BC_TO_MW, leading IQ09) and added as evidence.
    The draft's catalogPatch for F2730A (the curated role, catalog and OData) was not applied:
    the id is not in the library, so the entry keeps its fields.
  - `fiori:F1511`: curated side fixed in `data/fiori/apps.ts#F1511` from S32OP: name Request
    Maintenance, role SAP_BR_EMPLOYEE_MAINTENANCE, catalog SAP_EAM_BC_MREQ, OData
    EAM_NTF_CREATE, guiTx IW21 / IW22 / IW23 / IW26 / IW27 / IW28, trust verified-docs; Hebrew
    name and slug kept. This settles the rename that the 2026-09-23 note left as a product
    decision. `explain.technical` named API_MAINTENANCENOTIFICATION and now names
    EAM_NTF_CREATE. Still open: the old name/id pairing in `data/centers/fiori.ts`
    (create-maintenance-request row), `data/lifecycle.ts#IW21` and `data/tx-intel.ts` IW21 /
    IW25; the library's successor link F1511 to F1511A (rows S32PCE and S37) has an undecided
    On-Premise scope; `cds: C_MaintNotificationListReport` and `explain.consultant` (M1/M2)
    stay curated and unverified.
  - `fiori:F4072`: role SAP_BR_MAINT_SUPERVISOR, catalog SAP_EAM_BC_MREQ_DSP, OData
    UI_MAINTWORKREQUESTOVW_V2 and guiTx IW21 / IW22 / IW23 / IW28 / IW29 filled in
    `data/fiori/apps.ts#F4072` (same on S27OP); Hebrew name now 'סינון וקבלת בקשות תחזוקה'.
    `purpose`, `explain.beginner` and `explain.consultant` still use the older term for
    maintenance (outside the patch fields).
  - `fiori:F2774`: role SAP_BR_MAINTENANCE_PLANNER, catalogs SAP_EAM_BC_MPLAN and
    SAP_EAM_BC_SHMP_MNG, OData APJ_JOB_MANAGEMENT_SRV, guiTx IP30 (leading) and IP30H
    (related) filled; `status.source` now points to the Maintenance Management 2025.001 row
    (it was null). `cloud: unknown` is unchanged; the library's release list also names 2602
    and 2608, which this pass did not assess.
  - UI follow-up, not data: `components/neo-shell/reference/fiori-data.ts` renders any
    non-empty guiTx as "יישום S/4HANA המחליף את ... ב-SAP GUI". The library's leading and
    related transaction codes do not by themselves say "replaces" (F2774 and IP30H in
    particular).
- 2026-09-24 · batch 2, same channel (`scripts/fal-app.mjs` on S32OP and S27OP), audited and
  written:
  - `fiori:F5325`: curated side filled in `data/fiori/apps.ts#F5325` from S32OP: roles
    SAP_BR_MAINTENANCE_PLANNER (lead) and SAP_BR_MD_SPECIALIST_EAM, catalogs SAP_EAM_BC_MPLAN
    and SAP_EAM_BC_MP_MNG, OData /SSB/SMART_BUSINESS_RUNTIME_SRV, C_MAINTPLANACTVSYSTSTATUSQ_CDS
    and UI_MAINTENANCE_PLAN (S27OP prints the lead role and UI_MAINTENANCE_PLAN only), guiTx
    IP01 (leading) to IP06 and IP16; `status.source` now points to the library row. Still open:
    F5356 (Manage Maintenance Items) and the predecessors F3622 / F5009 / W0026 are not in the
    catalog (no xref or successor possible); `cloud: unknown` unchanged although the library's
    release list also names S36 = 2602 and S37 = 2608. `explain.technical` and
    `explain.consultant` were rewritten with the audited text, outside the patch field list,
    because the old technical text said role, catalog and OData "are not displayed".
  - `fiori:F2336`: the 2026-09-02 conflict above (role, OData) is settled on the curated side:
    `data/fiori/apps.ts#F2336` now carries SAP_BR_PRODN_SUPERVISOR_DISC,
    SAP_SCM_BC_PRODN_ORD_MNTR, PP_MPE_ORDER_MANAGE and the library's twelve GUI transactions
    (CO02 leading; CO01 is not in the library list), trust verified-docs. Still open:
    `explain.consultant` there still says "מבוסס API_PRODUCTION_ORDER_2" and now contradicts
    the odata field (outside the patch fields, no audited replacement text); `cds:
    I_ProductionOrder`, `relatedTables` and the `problem` / `ecc` mentions of CO01 stay curated;
    `data/centers/fiori.ts#manage-production-orders` still carries SAP_PP_BC_PRODN_ORDER /
    SAP_BR_PRODN_OPERATOR_DISC / API_PRODUCTION_ORDER_2 / 'CO01 / CO02 / COOIS'. CO05, CO0R5,
    CO20, CO21, CO22, CO23 and CO26 have no route in the manifest, so they are in guiTx but not
    in xrefs.
  - `fiori:F3577`: `F3577` is empty on S32OP and S27OP. F4587 on S32OP prints role
    SAP_BR_PRODN_SUPERVISOR_PROC, catalog SAP_SCM_BC_PROC_ORD_MGMT, OData
    PP_PROCESS_ORDER_MANAGE_SRV (with PP_MPE_AOR) and no GUI transactions; the curated F3577
    fields (SAP_BR_PRODN_OPERATOR_PROC, SAP_PP_BC_PROCESS_ORDER, API_PROCESS_ORDER_2_SRV) match
    none of them. `data/fiori/apps.ts#F4587` still has empty role / catalog (not patched in this
    batch, its own record was not re-audited). `--tcode COR2` and `--tcode COID` not run.
    Re-keying F3577 to F4587 stays a product decision.
  - `fiori:F3364`: `F3364` is empty on S32OP and S27OP; `--tcode COR6N` on S32OP leads only
    with the GUI entry 'Confirm Process Order Phase' (ProcessOrderConfirmation /
    createTimeTicket). The related TransactionCodes list is searchable per app only: F4587 on
    S32OP prints no GUI transactions (leading and related '-'); F5323 was not run. CORK still
    does not fit the `fiori:` id shape.
  - `fiori:F1576`: the library assigns F1576 to Supplier Evaluation Response (SLC-EVL,
    SLC_QUESTIONNAIRE_RESPONSE_SRV) on S32OP and S27OP; Manage Batches is F2462 (leading MSC1N,
    related MSC2N / MSC3N, LO_BM_BATCH_SRV). The record now authors `verification_required`
    (source null), so the derived s4_native no longer shows; depth went L3 to L2. Re-keying
    F1576 to F2462 in apps.ts, `data/centers/fiori.ts`, `data/solutions.ts`, tx-intel MSC1N /
    MSC3N and the textbooks is a product decision. `data/fiori/apps.ts#F2462` still has empty
    role / catalog although the library prints 19 roles and 5 business catalogs for it.
  - `fiori:F0843`: the library confirms F0843 = Post Goods Receipt for Purchasing Document
    (roles incl. SAP_BR_WAREHOUSE_CLERK, catalogs SAP_MM_BC_IM_GR_PROCESS /
    SAP_MM_BC_IM_PROCESS, OData MMIM_GR4PO_DL_SRV / MMIM_MATERIAL_DATA_SRV, leading MB01,
    related MB0A / MB1A / MB1C / MIGO / MIGO_GR) and MIGO = 'Goods Movement, Post Goods
    Movement' (SAP GUI). Library values not copied to `data/fiori/apps.ts#F0843` (the entry
    still describes Post Goods Movement; product decision, as for F2730A). MB0A has no route in
    the manifest. SAP_MM_BC_GOODS_MVT, API_MATERIAL_DOCUMENT_SRV and I_MaterialDocumentItem are
    printed by none of the three library records read. The three em dashes in the repository
    row are verbatim quotes of tx-intel strings, kept as quotes.
- 2026-09-24 · batch 3, same channel (`scripts/fal-app.mjs` on S32OP and S27OP), audited and
  written; library values copied into `data/fiori/apps.ts` for all six (trust verified-docs,
  lastReviewed 2026-09-24, provenance comment on each entry):
  - `fiori:F0247A`: now `conflicting_sources` (depth L5 to L3). Name: help.sap.com (What's New
    2025, Feature Comparison 2025.001, Public Cloud 2608, and the documentation page the library
    links, loio `5d0feac5e1c447f2a2bab0976215f3b2`, 'Monitor Material Coverage - Net Segments
    (Fashion and Segmentation)') against the library's catalog name 'Monitor Material Coverage
    (Version 2)'; the library prints 'Monitor Material Coverage - Net Segments' for the
    predecessor F0247. The curated name was not changed (product decision). Role: the curated
    SAP_BR_MRP_CONTROLLER appears in neither official source read (library:
    SAP_BR_MATL_PLNR_EXT_PROC and SAP_BR_PRODN_PLNR; documentation page: SAP_BR_PRODN_PLNR and
    SAP_BR_DEMAND_PLANNER_RFM); settled on the curated side, `data/fiori/apps.ts#F0247A` now
    carries the two library roles, the three S32OP OData services and guiTx MB53 (leading),
    MD04, MD06, MD07, MS06, MS07. Still open: the name decision; F0247 has no catalog entry
    (alias only); MB53, MS06 and MS07 have no route in the manifest (guiTx only, no xref);
    `explain.technical` keeps its provisional CDS wording.
  - `fiori:F4604`: catalog SAP_EAM_BC_MNTWRK_MNG and OData UI_MAINTWRKREQ_ORD_MANAGE (the
    library's primary service; the other three are in the record) in `data/fiori/apps.ts#F4604`;
    guiTx emptied because the library prints '-' for leading and related GUI transactions (as
    the F4604 audit approved). For the lead: the F3951 and F0251 audits of the same batch kept
    the curated GUI transactions where the library prints '-' (absence is not a verdict, §3.3),
    so one policy should be chosen for all three. Still open: `explain.consultant` names
    API_MaintenanceOrder and now contradicts odata; `explain.technical` keeps its provisional CDS
    wording; the Hebrew name, `purpose` and `problem` use the older term for maintenance (outside
    the patch fields); F2175 / F2173 not in the catalog; BAdI EAM_CROSS_APP_NAV_CONTROL not in
    `data/exits.ts`; F4072 (Screen Maintenance Requests, curated name fixed 2026-09-22) is not
    linked from F4604 yet.
  - `fiori:F0251`: role SAP_BR_MRP_CONTROLLER to SAP_BR_PRODN_PLNR (library lead) and OData
    PP_MRP_COCKPIT to PP_MRP_COCKPIT_SRV in `data/fiori/apps.ts#F0251`; guiTx MD04 / MD07 kept
    (library '-'). Still open: secondary roles SAP_BR_MATL_PLNR_EXT_PROC /
    SAP_BR_RPLNMT_SPCLST_DC_RFM and catalog SAP_RFM_BC_DC_RPLNMT not copied; `explain` still
    names gateway project PP_MRP_COCKPIT; `process` and `commonErrors` call the monitor app
    F0247; the `data/sapData.pppi.ts` CO24 / MD04 rows (xlsx fix) unchanged; I_MRPMaterial and
    MDKP / MDTB unverified.
  - `fiori:F3951`: OData PP_MNTR_WRKCTR_SRV, PP_MRP_AOR_SRV filled in
    `data/fiori/apps.ts#F3951`; role and catalog confirmed. Open conflict: the library prints no
    GUI transaction (leading and related '-') on S32OP and S27OP while the curated guiTx
    CM21 / CM25 stays (product decision). Still open: the '(PP-DS)' labels in
    `data/lifecycle.ts#CM21`, `data/transactions.ts` (CM01), `data/pppi-master-data-facets.ts`
    and `data/academy/lessons/pp-generated.ts`; `explain.technical` provisional wording.
  - `fiori:F2176`: catalog SAP_SCM_BC_CFS to SAP_SCM_BC_CAPA_PLAN, OData PPDS_RES_SCHEDULE and
    guiTx CM21 / CO03 to /SAPAPO/CDPS0 (leading), /SAPAPO/CDPS1, /SAPAPO/CDPS2, /SAPAPO/CDPS3,
    /SAPAPO/RPT in `data/fiori/apps.ts#F2176`; tx:CM21 and tx:CO03 left the record's xrefs (the
    /SAPAPO/ codes have no route in the manifest, so no xref). Still open: `cloud: yes`
    unverified; the WM textbook and academy lesson that place F2176 under PM/EWM; `ecc` and
    `explain.technical` curated; the fiori-data.ts UI line shows the /SAPAPO/ codes as related
    SAP GUI transactions (UI follow-up above).
  - `fiori:F3289`: OData PP_CFS_CAPEVAL_SRV / PP_MRP_AOR_SRV and guiTx CM01 in
    `data/fiori/apps.ts#F3289` (CM07 is not in the library list; it stays in `ecc` and in the
    xrefs); type stays Transactional although the library prints 'Transactional, Analytical'
    (FioriType takes one value; a schema decision if both should show). Still open: scope item
    31L (library, What's New 2020 / 2021) against 3LQ (What's New 2023); CRHD / KAKO, Cloud 2002
    and the PP-only claim in `explain.consultant` / `commonErrors` unverified.
- 2026-09-24 · batch 4, same channel (`scripts/fal-app.mjs` on S32OP and S27OP), audited and
  written; library values copied into `data/fiori/apps.ts` for all six (trust verified-docs,
  lastReviewed 2026-09-24, provenance comment on each entry):
  - `fiori:F5104A`: catalog SAP_EAM_BC_MAINT_WORKER ('סביר') to SAP_EAM_BC_MNTJOB_MNG, OData
    API_MAINTNOTIFICATION / API_MAINTORDERCONFIRMATION / UI_MAINTENANCEJOB_MANAGE (was empty),
    guiTx IW41 plus IW21 / IW22 / IW23 / IW32; the lead role was already the library's. Still
    open: SAP_BR_MAINT_SUPERVISOR (R0198) is not in the `role` field (the patch carried the lead
    role only); predecessor W0016 (Display Job List) has no catalog entry; the curated F2730
    'Confirm Jobs' conflict is unchanged; `releaseInfo` / `explain.consultant` 'Cloud 2105' and
    `cloud: yes` unverified; the Hebrew name and `purpose` use the older term for maintenance.
  - `fiori:F1339`: role SAP_BR_MRP_CONTROLLER to the library's three roles
    (SAP_BR_MATL_PLNR_EXT_PROC, SAP_BR_PRODN_PLNR, SAP_BR_RPLNMT_SPCLST_DC_RFM), catalog
    'SAP_SCM_MRP (Job Catalog)' to SAP_RFM_BC_DC_RPLNMT, SAP_SCM_BC_MRPRUN (the job catalog
    entry stays named in `explain`), OData APJ_JOB_MANAGEMENT_SRV (was empty), guiTx MD01N to MD01
    (leading) and ten related codes. Open conflict between official sources: the 'App
    Implementation: Schedule MRP Runs' page names SAP_BR_MATL_PLNR where the app topic and the
    library print SAP_BR_MATL_PLNR_EXT_PROC with the same description; the sources do not say
    whether it is a typo or a separate role, PFCG in a live system would settle it. Still open:
    F1240 (Application Jobs, a Required app) has no catalog entry; MD40, MD42, MPBT and MSBT
    have no route in the manifest (guiTx only, no xref); the scope items (1BM and more) are not
    detailed; `explain.consultant` 'MD01N authorization' and `commonErrors` unverified;
    SAP_SCM_BC_MRPRUN_MC (Public Edition 2508) not assessed for On-Premise.
  - `fiori:F2023`: catalog SAP_EAM_BC_MAINT_WORKER to SAP_EAM_BC_CORRMAINT_MW, OData
    EAM_MALFUNCTION_MANAGE (was empty), guiTx IW21 / IW26 to IW31 (leading) and IW21 / IW22 /
    IW32 / IW41; technical catalog SAP_TC_EAM_COMMON named in `explain.technical`. Still open:
    'Report Malfunction (F2215)' in `data/sapData.pm.ts` (no official record names F2215);
    `releaseInfo` 'S/4HANA Cloud 1708/1709+' unverified (What's New 1709 On-Premise names the
    app; Cloud 1708 not checked); `ecc` curated.
  - `fiori:F2828`: roles SAP_BR_MAINTENANCE_PLANNER (lead) and SAP_BR_MAINT_TECH_OFFICER,
    catalog SAP_EAM_BC_ORD_MC to SAP_DFS_BC_MAINTENANCE, SAP_EAM_BC_ORD, OData EAM_ORDER_MONITOR
    (was empty), guiTx IP10 / IP30 / IW38 to IW29 (leading) and IW38; `explain.consultant`,
    `explain.technical` and `commonErrors` no longer name SAP_EAM_BC_ORD_MC, so the verdict's
    condition for applying the patch is met. This settles the researcher's two conflicts
    (catalog, GUI transactions) on the curated side. Still open: `ecc` (IP10 / IP30 + IW38),
    `problem` (IW38 / IP10) and `relatedTables` (MPLA / MHIS / AUFK) still describe maintenance
    plans while the documented Key Features are notifications, orders and purchasing;
    Related_Apps F2071 / F2173 / F2175 and Required F2827 / F3065 have no catalog entries;
    `cloud: yes` against the library's S36 / S37 rows not assessed; the kept 2025.001 evidence
    row and the Hebrew name use the older term for maintenance.
  - `fiori:F5241`: role SAP_BR_MAINTENANCE_PLANNER, catalog SAP_EAM_BC_WORKORD_MNG, OData V4
    group UI_MAINTENANCEORDER_MANAGE and guiTx IW31 filled (all were empty); the related IW32 /
    IW33 / IW37N / IW38 / IW39 are xrefs of the record, not guiTx (optional per the verdict).
    Still open: predecessor F2175 and Required W0017 have no catalog entries; `cloud: unknown`
    (PredecessorDetails also shows S37, Public Cloud); re-keying the curated F2731 to F5241
    stays a product decision.
  - `fiori:F2072`: eleven roles (lead SAP_BR_MAINTENANCE_PLANNER), ten business catalogs, OData
    EAM_OBJPG_TECHNICALOBJECT_SRV and guiTx IE03 (leading), IH06, IH08, IL03 filled (all were
    empty). Still open: S27OP prints a different 14-role list (not represented in `role`);
    predecessors F0226 / F0227 / W0011 / W0012 have no catalog entries; `releaseInfo` empty and
    `cloud: unknown` (S36 / S37 appear in All_Rel only); SAP_EAM_BC_TO carries a title on S27OP
    ('EAM - Technical Object') but not on S32OP, so the two releases match by catalog ID only.
- 2026-09-24 · batch 5, same channel (`scripts/fal-app.mjs` on S32OP and S27OP), audited and
  written; library values copied into `data/fiori/apps.ts` for all six (lastReviewed
  2026-09-24, provenance comment on each entry, the SAP Help `source` string kept with the
  library appended, `explain.technical` rewritten where it said the values were not read):
  - `fiori:W0029`: role SAP_BR_MAINTENANCE_PLANNER and guiTx IE01 (leading), IE02 / IE03 / IL01
    / IL02 / IL03 filled; catalog SAP_EAM_BC_TO confirmed; the library prints no OData service
    (NumberofOdataServices=0), so `odata` stays empty. Status stays `verification_required`: the
    library's release list names S/4HANA releases (1511 to 2025 FPS01, plus 2602 / 2608 in
    group SC) and does not say whether W0029 is the SAP ERP 6.0 EHP8 Web Dynpro app of the
    Business Package for Generic EAM Functions 1.61. What would settle it: a system comparison
    of Web Dynpro EAMS_WDA_TECHOBJ_OIF and PFCG role SAP_COCKPIT_EAMS_GENERIC_FUNC2 with the ERP
    business package apps. Still open: Public Cloud (S36 / S37 not read), first release; `type`
    stays Transactional while the library prints Web Dynpro (schema decision).
  - `fiori:W0028`: role SAP_BR_MAINTENANCE_TECHNICIAN and guiTx IQ09 (leading, no related)
    filled; catalog SAP_EAM_BC_TO_MW confirmed; no OData service printed. Status stays
    `verification_required` on the same ERP question (iView
    com.sap.pct.erp.eam.gen.eam_technical_object_display). Still open: Public Cloud (S36 / S37
    in All_Rel, not read); S17OP (1909 FPS02) is absent from All_Rel; first release; `type` as
    for W0029.
  - `fiori:F8669`: role SAP_BR_MD_SPECIALIST_EAM, catalog SAP_ASM_BC_REFTO_MNG and the V4 service
    group UI_DRFTTECHOBJSTRUCTURE_MANAGE filled; empty Results on S27OP (new in 2025 FPS01);
    status source moved from the app topic to the What's New 2025 FPS01 row (Type New). Still
    open: Public Cloud (the library prints S32OP and S32PCE for this release); authorization
    object I_DRTOS is not tied to the app by the snippet.
  - `fiori:F4587`: the audited record carried no `catalogPatch` object, but its approved
    recommendedAction named the library values; role SAP_BR_PRODN_SUPERVISOR_PROC, catalog
    SAP_SCM_BC_PROC_ORD_MGMT and OData PP_MPE_AOR, PP_PROCESS_ORDER_MANAGE_SRV were copied,
    guiTx stays empty (library '-'). This settles the batch 2 line "F4587 still has empty role
    / catalog". The recommendedAction no longer says F3577 is in no official source; it is
    bounded to the searches run. The S32OP library row is one const (F4587_FAL_S32OP) shared by
    fiori:F4587 and fiori:F3577. Re-keying F3577 to F4587 stays a product decision. Still open:
    Public Cloud (S36 / S37 in the release list, not read); CDS views.
  - `fiori:F5323`: role, catalog and OData filled with the same library values as F4587; the id
    is now named by the library record itself, not only by the value order of the Feature
    Comparison. Still open: `explain.consultant` in `data/fiori/apps.ts#F5323` still calls the
    Feature Comparison the only official record found that names F5323 (outside the patch
    fields, no audited replacement text; the provenance comment now adds the library); Public
    Cloud (S36 / S37 in the release list, not read).
  - `fiori:F2462`: lead role SAP_BR_INVENTORY_MANAGER, the five business catalogs and guiTx
    MSC1N (leading), MSC2N / MSC3N filled; OData LO_BM_BATCH_SRV confirmed. Still open: the 18
    non-leading roles are not in `role` (the patch carried the lead role); the curated F1576
    'Manage Batches' conflict is unchanged (the library assigns F1576 to Supplier Evaluation
    Response; product decision); Private Cloud (S32PCE) not read as a row, Public Cloud not
    checked; first release not set beyond S9OP = 1709. The UI follow-up above (a non-empty
    guiTx rendered as "replaces") now also applies to W0029, W0028 and F2462.

### Resolved 2026-09-21 (design audit round 2 · audit/ux-2026-09/SAP-FIXES.md)
- F3364 `odata: API_PROCORDCONF` → `API_PROC_ORDER_CONFIRMATION_2_SRV` (also `data/centers/fiori.ts`). F3577 `API_PROCESSORDER_2` → `API_PROCESS_ORDER_2_SRV`. The app-id conflicts (F3364 vs CORK, F3577 vs F4587) remain open as recorded.

## decision · F4072 curated fix applied (2026-09-22)

The curated record `data/fiori/apps.ts#F4072` was corrected to Screen Maintenance Requests (slug `screen-maintenance-requests`, trust verified-docs, unread fields emptied), `data/centers/fiori.ts` and the six `data/tx-intel.ts` s4Delta lines (IP01 / IP02 / IP03 / IP10 / IP30 / IP41) no longer name F4072 for scheduling, and `fiori:F4072` dropped `conflicting_sources` (repository evidence re-levelled to repository_verified with the fix dated). F2774 / F5325 remain without records; they are the next Fiori batch's first two ids together with the nine on the brief's list (F2731, F2730, F2730A, F4072 re-verify, F3577, F3364, F1576, F0843, F3289).

### Resolved 2026-09-23 · official ids added to the catalog
Twelve official ids named by the evidence above are now catalog entries (`data/fiori/apps.ts`, trust verified-docs, unread fields empty) with verification records (`data/verification/fiori.ts`): F5241 (Manage Maintenance Orders), F2072 (Find Technical Object), W0029 (Process Technical Object, Web Dynpro) and W0028 (Display Technical Object), both `verification_required` because SAP ERP 6.0 EHP8 already documents same-named Web Dynpro apps, F8669 (Manage Technical Object Structures), F4587 (Manage Process Orders), F5323 (Manage Process Order Operations, paired by the parallel order of "Manage Process Orders / Manage Process Order Operations … F4587/ F5323" in the 2025.001 Feature Comparison, re-run 2026-09-23), F2462 (Manage Batches), F1511A (Create Maintenance Request), F0251A, F5460 (Advanced Scheduling Board) and W0020 (Confirm Jobs, `not_available` from 2023, successor F5104A). Sources: 59 saved search results; 60 quoted fragments checked against them independently of the drafting agent.
Not added: F5777 (only SAP_S4HANA_CLOUD records name it); CORK and MIGO (not valid `fiori:` id shapes, schema decision).
Existing records linked, not re-keyed: F2731→F5241, F1511→F1511A, F2730A→F2072/W0029/W0028/F8669, F3577 and F3364→F4587/F5323, F0251→F0251A, F2176→F5460, F4072→F1511A, F4604 and F2828→F5241, F5104A and F2023→W0020; tx:IW31 / IW32 / IW38→F5241. Aliases W0020 (on F2730) and F2462 (on F1576) became xrefs to the new ids. Retiring or re-keying the curated ids F2731, F1511, F2730A, F3577, F1576 stays a product decision (it would change routes and identifiers).
