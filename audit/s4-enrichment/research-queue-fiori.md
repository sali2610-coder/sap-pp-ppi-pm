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
