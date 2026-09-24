# Research queue · enhancements catalog (S/4HANA enrichment)

Kept by the single writer for `data/verification/enhancements.ts`. One line per id that was
refuted or deferred at the adversarial-verification gate, with the evidence still missing, plus
the repository conflicts the audits surfaced. Written 2026-09-07 during the enhancements data
commit (14 drafts audited: 14 written, 12 from their auditor's `fixedRecord`, 2 (IWO10012,
QQMA0014) re-derived from the verdict text; 0 refuted). `accessedAt` is stamped 2026-09-02 per
the batch instruction; the audits re-verified on 2026-09-05/07 and the writer re-read the SAP
Library 4.6C "Develop Enhancements" page (EN and DE) on 2026-09-07.

## refuted / needs new evidence

- (none in this batch: all 14 audited drafts survived verification and were written with their downgrades applied.)

## conflicts

- `enh:exit:IWO10009` — `data/domain-detail.ts` lines 88/116/158/186/214 describe IWO10009 three different ways ('בדיקות בשמירה', 'העתקת פעולות לפקודה', 'בדיקות שחרור'); the official 4.6C list supports only 'Maintenance order: Customer check for "Saving"'. Hygiene fix outside the overlay. No official S/4HANA page names IWO10009 or EXIT_SAPLCOIH_009; status stays derived from the exits.ts ECC-vs-S/4 block.
- `enh:exit:IWO10012` — `data/exits.ts` ('ברירות מחדל לפעולת פקודה', inferred) and the PM workbook customCode row 26 ('בדיקת אישורי עבודה (Permits)') both contradict the official 4.6C short text 'Maintenance order: Priority treatment on central header' (permits are IWO10007). Suggested catalog name: 'הזמנת אחזקה: טיפול בעדיפות בכותרת המרכזית'. Function module and parameters unknown outside a live SMOD check.
- `enh:exit:IWO10018` — PM workbook customCode row 27 ('בדיקת/הרחבת רכיבים') and `data/workbenches-ext.ts` ('בדיקות בעת שחרור (REL)') contradict the official name 'User fields on order header'; `data/tx-intel.ts` wires IWO10018 into the task-list transactions IA01/IA02/IA06/IA08/IA11/IA12 (`userExits`) although it is an order-header exit (IW31/IW32). SAP PRESS book1 ch. 9 agrees with the official name (Tier-2, no status weight).
- `enh:exit:QQMA0001` — three descriptions: official 4.6C 'User subscreen for notification header'; `data/exits.ts` 'validation on save' (not marked inferred; the official save-check exit is QQMA0014); PM workbook customCode row 17 'general checks in catalogs/codes'. `data/domain-detail.ts` attributes 'default values' to QQMA0014 (official: QQMA0025). `data/academy/lessons/qm-generated.ts:388` presents QQMA0001 as returning a validation error on save. `data/workbenches-ext.ts` matches the official page.
- `enh:exit:QQMA0014` — `data/exits.ts` name 'ברירות מחדל להודעה' (inferred) and `data/domain-detail.ts` repeat 'default values'; the official 4.6C page (EN and DE), the KBA 2553412 title, workbook row 19, two SAP PRESS books and `data/workbenches-ext.ts` all say 'Checks before saving notification'. QQMA0025 (the real default-values exit) is absent from `data/exits.ts` and the route manifest (string only in `data/domain-detail.ts` line 74). EXIT_SAPMIWO0_020 is known only from the KBA title (public preview; Cause/Resolution behind S-user).
- `enh:exit:CONFPM01` — `data/exits.ts` and the derived records (domain-detail, transactions, consultant-notes, troubleshooting, centers/debugging, process-guides) present CONFPM01 as 'checks on confirmation'; official 4.6C: 'Determine customer-specific default values'; entry checks are CONFPM02/CONFPM04, save additions CONFPM05, none of which exist in the catalog. The 'Confirmation List' topic (loio fbdc468b...) belongs to the deliverable 'Business Package for Maintenance Worker 1.61', not 'Plant Maintenance (PM)'. WORKORDER_CONFIRM as Clean Core successor is unverified (repo ties it to PP CO11N/COR6N).
- `enh:exit:IPRM0001` — `data/exits.ts` (inferred), domain-detail, process-guides and troubleshooting attribute scheduling logic to IPRM0001; PM workbook rows 42/43 and the official 'Optimizing the Scheduling' page (2025.001) attribute planned dates to IPRM0002 (and IPRM0005). BADI_EAM_EXIT_DUE_DT named in domain-detail was not found officially; the official BAdIs IPRM_MCP_DATE_I_PAST / IPRM_CHECK_UPD_SCHED are not catalog ids. The exit does have its own page (/exits/IPRM0001/); only the overlay was missing.
- `enh:exit:ITOB0001` — successor-name drift: `data/exits.ts` BADI_EAM_TOB (inferred) vs PM workbook rows 3/8/13 BADI_EAM_TECHNICAL_OBJECT; neither found on help.sap.com. Workbook classifies 'User Exit', catalog 'Customer Exit'. The SMOD classification is a repository reading (the SAP ERP snippet says only 'enhancement', defined via IQ01).
- `enh:exit:IEQM0001` — `data/exits.ts` 'מסך נוסף לציוד' (subscreen, inferred), `data/domain-detail.ts:46`, `data/academy/lessons/pm-generated.ts:230` (trust 'verified-docs' with no matching Help page) and `data/workbenches-ext.ts:164` (calls it a BAdI) all contradict the official 'Additional checks when installing equipment at functional locations' (4.6C page, SAP ERP 6.0 EHP8 snippets, SAP PRESS appendix A.4). The EXIT_SAPLIEL2_002 pairing is inferred from list order only.
- `enh:exit:IMRC0001` — `data/exits.ts` (inferred) describes a blocking dialog validation in IK11 before save; the official title is 'Exit before update (after COMMIT WORK)' and range warnings/errors belong to Customizing. Recorded as verification_required, not a conflict, because the repo record is inferred. The equivalent BAdI title in LOG_EAM_CI_4 is truncated after 'Measuring Points and' in every snippet and its technical name never appeared. The 'IoT integration via APIs' change note in the eccS4 block is unsupported.
- `enh:badi:WORKORDER_UPDATE` — method IN_UPDATE and the 'Clean Core' recommendation exist only in `data/exits.ts`; official sources document BEFORE_UPDATE (R/3 4.70 release notes), AT_SAVE / AT_RELEASE (2025 FPS01 examples) and COMP_RQMT_DATE_TIME_SET (2022 SPS03). SAP uses both 'Business Add-In' and 'enhancement spot'; the classic-badi xref reflects the repo classification only. Aliases: two from `data/domain-detail.ts`, one from `data/concepts.ts`. No Public Cloud record names the BAdI.
- `enh:badi:NOTIF_EVENT_SAVE` — no public official page names the BAdI; method 'SAVE' in `data/exits.ts` is suspect (the sibling NOTIF_EVENT_POST uses CHECK_DATA_AT_POST per the public KBA 2302851 preview). KBA numbers 2302851 / 3127355 were seen only on userapps.support.sap.com (not an allowlisted evidence host) and are recorded in notes, not as evidence. An authored verification_required status was added so the derived 'changed' does not render beside an official pill. Cloud-ready BADI_QQM_NOTIF_EVENT_SAVE_CLD documented for Public Edition 2608 only.
- `enh:badi:BADI_EAM_TOB` — two unverified names for one idea (BADI_EAM_TOB in `data/exits.ts`, inferred; BADI_EAM_TECHNICAL_OBJECT in PM workbook rows 3/8/13); zero hits in help.sap.com search and in the What's New 2020 / 2022 SPS03 / 2025 FPS01 PDFs. `data/exits.ts#ITOB0001` (eccS4 'העדף BAdI BADI_EAM_TOB'), `data/domain-detail.ts` lines 33/47 and `data/solutions.ts` line 90 present the name without the inferred marker. Officially documented technical-object BAdIs: BADI_EAM_ITOB_BAPI_CUST_FIELDS, EAM_TECHNOBJECT_FIELD_CONTROL, BADI_ASM_MD_FUNCLOC (2025 FPS01).
- `enh:badi:WORKORDER_CONFIRM` — no official S/4HANA record names the classic BAdI; only the R/3 4.70 release notes do (kept at legacy_context_only). The 2023 What's New sources name a different BAdI, BD_WORKORDER_CONFIRM (relationship unstated; not a dataset id), so those two items were downgraded to verification_required. Repo methods 'BEFORE/AFTER confirmation', interface IF_EX_WORKORDER_CONFIRM and PM confirmation scope (IW41/IW42) remain unverified.

## open verification (live system)

- All ten legacy customer exits (IWO10009, IWO10012, IWO10018, QQMA0001, QQMA0014, CONFPM01, IPRM0001, ITOB0001, IEQM0001, IMRC0001): SMOD/CMOD components (EXIT_ function modules, subscreens, CI_ includes) and existence in the target S/4HANA system. The sc4sap MCP was unavailable in every session.
- BAdIs: SE18 check of the WORKORDER_UPDATE method list (IN_UPDATE), the NOTIF_EVENT_SAVE interface and methods, existence of BADI_EAM_TOB / BADI_EAM_TECHNICAL_OBJECT, and WORKORDER_CONFIRM methods plus PM applicability.
- Writer deviations recorded for the batch: `reviewer` dropped from all 14 records (house style; several values were pre-audit workflow states); the German 4.6C quotes in IWO10012 and QQMA0014 were moved to their own DE-URL evidence entries (page re-read by the writer), matching the IWO10009 auditor's traceability fix; one writer-instruction sentence about graduating the test guard was removed from the IEQM0001 and QQMA0014 notes once the guard was graduated.

---

# Batch 2 · written 2026-09-15 (access date stamped 2026-09-14)

15 drafts audited: **9 written** (all from their auditor's `fixedRecord`, downgrades already
applied), **6 refuted and queued below**. Written ids: `enh:exit:PPCO0001`, `enh:exit:PPCO0007`,
`enh:exit:CONFPP05`, `enh:exit:M61X0001`, `enh:exit:SAPLV01Z`, `enh:exit:MBCF0002`,
`enh:badi:MB_MIGO_BADI`, `enh:badi:WORKORDER_GOODSMVT`, `enh:technique:key-user-extensibility`.
The catalog was already graduated out of the repository-only foundation guard in
`test/evidence-schema.test.ts` (2026-09-02), so no guard change was needed in this batch.

## refuted

- `enh:exit:PPCO0021` — **rendered copy with no source.** `status.recommendedAction` asserts that
  What's New 2023 documents a new method `COMP_RQMT_DATE_TIME_SET` on "BAdI: Order Change" and that
  "the technical name of that BAdI does not appear in the snippet and needs verification", while no
  evidence entry cites any What's New page — a method name would reach the UI uncited. The assertion
  is also wrong: the auditor re-ran the lookup and two official records DO name the BAdI —
  "BAdI for Further Processing Changes to Orders", What's New in SAP S/4HANA 2022 SPS03,
  versionId 2022.003, loio 86956eb2f92146db85b12838f4affeb8 ("The Business Add-In WORKORDER_UPDATE
  … has been enhanced with a new method COMP_RQMT_DATE_TIME_SET"), and the same title in What's New
  in SAP S/4HANA 2023, versionId 2023.000, loio e59b1d858a57444a8f928dead0f11263 (also naming
  `CO_SPLIT_COMPONENT_POST_GI`). The draft sends the reader to an "unnamed" BAdI that is both
  documented and already in the record's own xref list.
  Also: **overstated negative sweep** — `status.he` claims the name was absent from "the SAP 4.6C
  Shop Floor Control library and two official PDFs", but only ONE 4.6C topic was read
  ("Enhancement when Saving an Order (Header Fields)") and only ONE PDF carries a URL; the R/3
  Enterprise release-notes PDF appears in no evidence entry, so its negative result is
  unverifiable. **Internal inconsistency** — `status.he` says two PDFs, `notes` says a full-text
  scan of four PDFs plus two Simplification Lists; three of those four and both lists have no URL.
  **House style** — carries `reviewer: "… pending adversarial verdict"`, a working state that would
  ship to the UI through `resolve.ts`. **Never-guess breach** — `notes` and gaps[5] float an
  invented reading of the exit's short text ("it may concern release control for automatic batch
  determination on order components rather than general component checks"); flagged as unverified,
  but still a guess at an SAP object's short text.
  *Needs:* a cited What's New evidence entry for `COMP_RQMT_DATE_TIME_SET`, resolvable URLs for
  every PDF and Simplification List whose negative result is claimed, the sweep narrowed to the one
  4.6C page actually read, `reviewer` dropped, and the short-text hypothesis deleted. Side finding
  worth keeping: the sibling PPCO0007 page ("PPCO0007 Exit when saving production order",
  `EXIT_SAPLCOZV_001`) was cited only as a bare helpdata path — record the resolvable URL
  (now carried by the written `enh:exit:PPCO0007` record).

- `enh:exit:CONFPP01` — **unsupported negative claim, load-bearing.** `evidence[0].claim`,
  `conflictingEvidence[0].claim` and the summary all assert "according to SAP, CONFPP01 … is used to
  propose default values on a production order confirmation, not for input checks". The cited SAP
  Plant Connectivity guide never says that: it documents ONE sample scenario in which the exit fires
  on "Propose actual data"; it does not enumerate CONFPP01's function exits, state its scope, or
  exclude any other use — and the draft's own gaps admit the full function-exit list was not
  verified. This invented exclusivity is what drives the conflicting_sources verdict and the
  instruction to rewrite `data/exits.ts`, so it cannot ship.
  **Unflagged repository conflict the draft itself creates** — `evidence[1]` establishes from a
  2025.001 snippet that CONFPP05 / `EXIT_SAPLCORF_105` is the input-checks-when-saving exit, while
  `data/exits.ts#CONFPP05` calls CONFPP05 "goods movements on confirmation"; the draft leans on
  CONFPP05 as the settled alternative and xrefs it without recording that conflict. (It is now
  recorded under the written `enh:exit:CONFPP05` record.)
  *Verified and worth keeping on the re-draft:* the PCo PDF resolves (GET → 200, 1,146,306 bytes;
  HEAD alone returns 403) and all four quoted strings are verbatim on printed pages 19-20; both
  S/4HANA loios (`cc6cb6531de6b64ce10000000a174cb4` "Preparation and Customizing" | Workflow |
  2025.001, and `fe03b753128eb44ce10000000a174cb4` "Entering Confirmations" | Production Orders
  (PP-SFC) | 2025.001) re-confirmed; the negative gap holds (no S/4HANA On-Premise topic names
  CONFPP01 or `EXIT_SAPLCORF_101`); all 12 xrefs resolve and `validateRecords` returns [].
  *Minor fixes also owed:* say that pages 19-20 were read rather than the whole PDF; the
  "Confirmation Variances PP-SFC" scenario name comes from the sibling topic
  `ab6cb6531de6b64ce10000000a174cb4`, not the cited record; the release string should carry the
  month the PDF states (URL segment `/15.3.0/` vs "PCo 15.0, Version 1.0 (2014)"); align terminology
  to `פקודת ייצור` / `פקודת תהליך` as the rest of the overlay does.

- `enh:exit:PCSD0002` — **false negative claim.** `evidence[3].claim`, `notes` and conflicts[1] all
  assert that "the names BADI_BOM_CHANGES and BOM_UPDATE in the repository appear in no
  help.sap.com title or snippet". An official source contradicts half of it: "Workflow: Implement
  BOM Change" | Logistics — General (LO) | SAP S/4HANA 2025 FPS01 | versionId 2025.001 |
  loio 3a481ce17bac4ce6ab5d04c7fd1f73f7, snippet verbatim "You have created an implementation for
  the Business Add-In BOM_UPDATE (method CHANGE_ADD_SAVE) that creates the triggering event
  following a BOM change." `BOM_UPDATE` — the exact name PM migration workbook row 12 carries — is a
  documented 2025.001 BAdI. (`BADI_BOM_CHANGES` alone is genuinely absent.) The draft tells a
  migration reader the opposite three times and builds conflicts[1] and the recommendedAction on
  that false premise.
  **Uncited official document** — `status.recommendedAction` states loio `77bef09007f04eeab48726d55b210ae7`
  as fact with no evidence entry and no URL. The loio is real ("Custom Fields at BOM Item Level",
  What's New in SAP S/4HANA 2021, versionId 2021.000) but must sit on an evidence entry, and it is
  scoped wider than its source: the Application Component is PEO, not general BOM maintenance.
  **Argument from an unread body** — `status.he` states "the page does not mention any change,
  restriction or replacement of the enhancement in S/4HANA" while the record admits the 2025.001
  body was never read (JS shell). The IMRC0001 precedent keeps that bounded, in `notes`.
  **Provenance misdescribed** — `evidence[0].claim` says "two consecutive snippet windows of the
  same page"; measured, they are two different queries returning two different deliverable
  renderings of the same loio (PLM vs Bill of Material (LO-MD-BOM)). **repoRef too narrow** —
  `data/exits.ts#PCSD0002` does not cover the facts also drawn from `data/sapData.pm.ts` rows 11-12.
  *Verified and worth keeping:* all four URLs 200 and allowlisted; both deliverable paths
  reproducible; every quoted string from the BOM_BEFORE_SAVE page ("BAdI definition:BOM_BEFORE_SAVE",
  "This BAdI is created under Enhancement Spot ES_BOM_UPDATE", "uses the standard interface
  IF_BOM_BEFORE_SAVE", "HANDLE_BEFORE_SAVE") reproduced; the `saphelp_snc70` static page fetched and
  parsed in full, confirming PCSD0001–PCSD0013 with their FMs; all 16 xrefs resolve and
  `validateRecords` returns []; `data/fiori/apps.ts` genuinely contains no BOM apps.

- `enh:badi:MD_PLDORD_POST` — **refuted with an empty `problems` array.** The verdict supplies no
  problem text and no `fixedRecord`, so there is nothing to re-derive the draft from and no stated
  ground to fix. Queued rather than guessed. *Needs:* a fresh adversarial pass that states its
  grounds, or the original draft plus a verdict that lists them.

- `enh:badi:MD_ADD_ELEMENTS` — **blocking: `status.he` asserts a falsehood its own primary source
  contradicts.** It says "no official source marks MD_ADD_ELEMENTS for removal or names a
  successor", while the cited Simplification List 2023 FPS3 (`SIMPL_OP2023.pdf`, item 30.2, p. 737)
  carries the table row "User-defined MRP elements in MRP | MD_ADD_ELEMENTS | PPH_MRP_RUN_BADI =>
  MDPS_ADJUST", under the lead-in "BAdI implementations of the classic MRP should be translated into
  AMDP BAdI implementations if still required. This affects the following BAdIs:". An AMDP
  counterpart IS named for MD_ADD_ELEMENTS itself (auditor read it in the local PDF text, lines
  37889-37960).
  **Blocking: material omission** — `evidence[0].claim` describes that same table but reports ONLY
  the "Reading material receipts and requirements" row, then concludes "the document does not define
  MD_ADD_ELEMENTS itself as an item for removal", silently dropping the one row where
  MD_ADD_ELEMENTS is the classic BAdI with an AMDP successor. That omission is what produces the
  false `status.he` sentence.
  **Two documents under one URL** — `evidence[3]`'s claim quotes "Prerequisite: Clean Up Total
  Requirements" (loio `8f1be5514ec5c90ae10000000a44176d`, SAP ERP 6.18.latest) while the entry's url
  points at the S/4HANA 2025.001 "MRP Live: Incompatible Changes" page; the quoted sentence is real
  but cited from a source the record gives no URL for.
  *Minor:* SAP Note 2268085 is described as being "in the item's title" — the title is
  "S4TWL - MRP in HANA"; the note sits in the Related Notes table (correctly not recorded as a
  `sapNote` field). Release provenance gap: the status is stamped 2023 FPS03 but the MD04/MD07/MD01/
  MD02/"Plan in Classic MRP" scoping sentence comes only from the S/4HANA 1709 Operations Guide and
  the SAP ERP 6.0 EHP8 page, and that is not flagged in gaps. `evidence[2]` frames "Software
  Component SAP_APPL 616" as a component the BAdI lives in; the snippet actually reads "You have
  installed the following components as of the version mentioned: … Software Component SAP_APPL 616"
  — a prerequisite line. On-disk draft carries `status.secondary: []`; `secondary` is mapper-set and
  house style populates it only when non-empty.
  *Note for the re-draft:* the written `enh:exit:M61X0001` record now xrefs `enh:badi:MD_ADD_ELEMENTS`
  as context only, and its notes state explicitly that the Simplification List presents
  MD_ADD_ELEMENTS as the ABAP alternative for HANA-optimised data reading in classic MRP, **not** as
  a successor to M61X0001.

- `enh:technique:enhancement-spot` — **must fix: the parenthetical that carries the whole verdict is
  unsupported.** `status.he` asserts "ABAP Platform 2025 FPS01 (the basis of SAP S/4HANA 2025
  On-Premise)" and no cited evidence says it; that bridge is the only thing connecting a set of
  ABAP-platform pages to a status whose edition is S/4HANA on-premise. It is not a fabrication — the
  auditor located the official source (loio `48ba073157b85295e10000000a42189b`, "ABAP Platform" |
  ABAP Platform | versionId 202510.001, snippet "ABAP platform is the basis of the SAP S/4HANA
  product line …" and "ABAP platform Basis of SAP S/4HANA Release 2025 FPS01", URL 200) — but it
  must be cited, not assumed.
  **Must fix: false edition token** — `evidence[1].edition` is `ecc`, which `EDITION_HE` renders as
  "SAP ERP (ECC)", attributing an SAP NetWeaver 7.5 AS ABAP platform page to SAP ERP; the record's
  own (body-verified) claim says that page names neither ECC nor S/4HANA, and the same loio is
  published under ABAP Platform 2025 FPS01. The existing `ecc` uses in this file are genuine SAP
  Library 4.6C ERP pages, which this is not.
  **Must fix: release contract** — `MANIFEST.md` requires the versionId stored verbatim as the
  claim's release; the draft invents `"2025 FPS01 (202510.001)"` and
  `"2025 FPS01 (ABAP Platform 202510.001)"`, neither of which is a versionId, and the second pins an
  S/4HANA on-premise verdict to an ABAP Platform release number.
  *Should fix:* `evidence[2].claim` presents as one verbatim sentence a string that arrives in that
  record's snippet as two fragments split by the service's ellipsis (the continuous sentence exists
  only in the What's New 2023 record, which is quoted with a loio but no URL of its own); gaps[1]
  overstates the WORKORDER_UPDATE gap — the sibling `enh:badi:WORKORDER_UPDATE` already carries the
  official descriptive name "PM/PP/PS/PI Orders Operation: UPDATE" at sap_official_verified, so what
  is actually missing is narrower (no official page names a PM- or PP-PI-specific enhancement spot);
  `reviewer` must be dropped and the batch needs its own dated constant; `evidence[1].sourceTitle`
  appends "(SAP Library - Enhancement Framework, SAP NetWeaver 7.5)" to a page whose real title is
  " Enhancement Concept".
  *Verified and worth keeping:* all three URLs 200; loio `91f1e540f8648431e10000000a1550b0`
  (" Enhancement Spots" | Enhancement Framework | ABAP platform | versionId 202510.001) reproduced
  with all three English quotes verbatim, and the same loio confirmed under NetWeaver 7.52.latest
  and 7.5.29; the NetWeaver 7.5 static render read in full (1,607 chars) with every quote verbatim
  including "there is no standalone BAdI. Each BAdI is part of an enhancement spot and it is the
  spot that functions as a transport object"; `evidence[3]`'s WORKORDER_UPDATE spot text confirmed
  under a targeted query on loio `8200b753128eb44ce10000000a174cb4`; every loio and negative finding
  in `notes` checks out (`42d356ad`, `bd523842`, `56ee9441`, `8ff2e540`, `099bf240`, `3b0a3942`,
  `2101737d`; ES_BOM_AUTH + CS_MBOM_AUTH_MAINTAIN in PEO 2025.001; ES_LASP_SEQUENCE_PLANNING +
  SP_PLDORD_SORTING in PP-REM 2025.001; `BADI_EAM_TOB` returns no naming record); the repository
  evidence matches `data/enhancements.ts:73-78` word for word and the derived status really is
  `changed`; all 12 xrefs resolve and `validateRecords` returns [].

## conflicts

- `enh:exit:PPCO0001` — `data/exits.ts#PPCO0001` gives the function module as `EXIT_SAPLCOZF_001`;
  three official Workflow pages (loio `c66cb…`, `a86cb…`, `c36cb…`, all 2025.001) bind
  `EXIT_SAPLCOBT_001` to PPCO0001, and a search on `EXIT_SAPLCOZF_001` returns no page naming it.
  Recorded as an **open** conflict, not a refutation: no official page found enumerates which
  function modules the SMOD enhancement contains, and an SMOD enhancement can hold more than one.
  Verify in SMOD/SE37 before editing `data/exits.ts` (`object` and `debugging` fields). Two further
  repository claims are unsupported by the official snippets: the "validation/checks on save"
  framing (the official pages describe a point where order data is available to trigger follow-on
  Workflow processing) and the process-order scope (COR1/COR2).
- `enh:exit:PPCO0007` — `data/exits.ts#PPCO0007` ("order status change", release/TECO, MES message
  example, no function-exit name) contradicts the official 4.6C page: "PPCO0007 Exit when saving
  production order", `EXIT_SAPLCOZV_001` "Check or change header fields", production orders only.
  Repeated in `data/domain-detail.ts:369` ("PPCO0007 (סטטוס)"), `data/centers/debugging.ts` and the
  COR2 xrefs in `data/verification/transactions.ts`. No S/4HANA On-Premise, SAP ERP 6.0 EHP8 or
  S/4HANA Cloud Public Edition search record names PPCO0007 at all, so the record carries no
  authored status and the app keeps deriving `changed` from the exits.ts block.
- `enh:exit:CONFPP05` — `data/exits.ts#CONFPP05` ("goods movements on confirmation", Backflush/GR,
  CO11N + COR6N, MATDOC note) contradicts three official 2025.001 Workflow pages, which document
  CONFPP05 / `EXIT_SAPLCORF_105` as the confirmation-variance exit that informs the MRP controller
  (include `CORUX105`, standard task TS20000563, PP-SFC only). The goods-movement framing is
  repeated in `data/domain-detail.ts:383` and `:397`, `data/process-guides.ts:86` and
  `data/troubleshooting-ext.ts#process-message-not-processed-co54`. COR6N was therefore left out of
  the xrefs; `WORKORDER_GOODSMVT` is offered as a direction to evaluate, not as a successor.
- `enh:exit:M61X0001` — `data/exits.ts#M61X0001` gives the purpose as "MRP planning logic (source
  selection, parameters)" with a source-of-supply example; officially the exit is "User Exit:
  Material Selection for the Total Planning Run", and source-of-supply selection is mapped in the
  Simplification List table to `MD_MODIFY_SOURCE` / `MD_MODIFY_PRODVERS` / `MD_EXT_SUP` and
  `PPH_MRP_SOURCING_BADI`. The repository successor "BAdI MD_*" is not a name; the item names
  `PPH_MRP_NETTING_BADI => AT_PLANNING_FILE_ENTRIES_READ`, which is not a dataset id, so no
  successor was written. The MD02 pairing in the repository is unsupported (the official page is
  about the total planning run). Open: the exit's function-module name appears in no official source.
- `enh:exit:SAPLV01Z` — the catalog key itself is the conflict: official pages name the enhancement
  `SAPLV1ZN` with customer exit `EXIT_SAPLV01Z_014`, and `SAPLV01Z` appears only as part of that
  function-module name (the repository's own `object` field calls it a function group). The catalog
  purpose ("automatic batch determination") is not attributed to it by any official page found,
  which documents batch-master field population and batch classification at goods receipt. The
  repository successor `VB_BD_*` is not a BAdI name; officially documented are `VB_BD_SELECTION`
  and `LOBM_BATCH_DET_QTY_PROPOSAL`, neither a dataset id. **The record id stays
  `enh:exit:SAPLV01Z`** with `SAPLV1ZN` as an alias, because `data/verification/cds.ts` (`cds:I_Batch`)
  references it; a catalog rename belongs to `data/exits.ts` in a separate change. Also:
  `VB_BD_BATCH_DETERMINATION`, used across troubleshooting, solutions, process-guides,
  centers/debugging and academy, appears in no SAP Help record.
- `enh:exit:MBCF0002` / `enh:badi:MB_MIGO_BADI` — neither name appears in any help.sap.com title or
  snippet, in any version. `data/exits.ts` presents `MB_MIGO_BADI` as the S/4HANA alternative to
  MBCF0002 and pairs both with the Fiori app "Post Goods Movement"; officially Post Goods Movement
  is the Web GUI app whose transaction code is MIGO, while F0843 is Post Goods Receipt for
  Purchasing Document (already resolved in `fiori:F0843`), and the Fiori goods-receipt apps carry
  their own BAdIs (`MMIM_GR4XY_CHECK_DATA`, `BADI_MMIM_CHECK_MATDOC_ITEM`). The SAPMM07M attribution
  is derived from the function-module name in the repository row, not from any official page. The
  `tx:MB31` / `MB01` / `MB11` / `MB1A` / `MB1C` xrefs are historical context: Simplification item
  27.6 (2023 FPS3) / 15.3.9 (2025 FPS1) lists all five among the MB transactions replaced by MIGO
  and `BAPI_GOODSMVT_CREATE`. `MB_CF001`, `MB_DOCUMENT_BADI` and `MATDOC` are not dataset ids
  (MATDOC is represented through `obj:material-document`).
- `enh:badi:WORKORDER_GOODSMVT` — the repository row is `inferred` and its change note is "movements
  to MATDOC", which concerns the material-document persistence layer, not the BAdI interface; no
  official source links the two, so the authored status is `unchanged` (2025.001) and deliberately
  differs from the derived `changed`. The interface name, method list, and the maintenance-order
  scope (IW42, IW3K, asserted by `data/tx-intel.ts` and `data/workbenches-ext.ts` "verify SE18")
  rest on the repository alone. `BD_WORKORDER_GOODSMOVT_BKF_GDR` (What's New 2022) is a separate
  documented BAdI, is not a dataset id, and no source presents it as a replacement.
- `enh:technique:key-user-extensibility` — the official records pair Manage Maintenance Orders with
  app id **F5241**, while `data/fiori/apps.ts` registers **F2731**; the xref therefore points at
  F2731 (the id that exists in the catalog) and the conflict stays open in `fiori:F2731`. The
  repository technique row's "Clean Core", "the recommended path", "Developer Extensibility = ABAP
  Cloud", Custom CDS Views and Custom Business Objects claims are not carried by any official
  snippet found and were kept out of the status. The "does not exist in ECC" half of the ECC-vs-S/4
  block is a repository assertion: the official pages simply do not discuss ECC.

## open verification (live system)

- SMOD/SE37 component lists (which `EXIT_` function modules each enhancement actually contains) for
  PPCO0001, PPCO0007, CONFPP05, M61X0001, SAPLV01Z/SAPLV1ZN and MBCF0002 — the single check that
  would close five of the eight conflicts above. The `sc4sap` MCP was unavailable in every session.
- SE18/SE19 for `MB_MIGO_BADI` (definition existence + method list + implementations carried over
  from ECC) and for `WORKORDER_GOODSMVT` (interface, methods, and whether it is reached from
  maintenance orders at all).
- Whether PPCO0001 and CONFPP05 fire for process orders (COR1/COR2/COR6N); every official snippet
  found is scoped to production orders (PP-SFC, object type BUS2005).
- Writer deviations recorded for this batch: `reviewer` dropped from the five `fixedRecord`s that
  still carried it (PPCO0001, CONFPP05, MBCF0002, MB_MIGO_BADI, key-user-extensibility) — no record
  in any `data/verification/*.ts` file carries that field, and `resolve.ts` would render it. A
  second date constant `DATE14 = "2026-09-14"` was added beside the file's `DATE = "2026-09-02"`
  rather than restamping the batch-1 records, as the PPCO0007 and SAPLV01Z auditors instructed.

# Batch 3 · written 2026-09-21 (access date stamped 2026-09-21)

The 8 extension-technique records that close the `enh:technique` family: `customer-exit`,
`classic-badi`, `new-badi`, `explicit-enhancement`, `implicit-enhancement`, `field-exit`, `bte`,
`user-exit`. All 8 were audited and none was refuted, so all 8 were written from their auditor's
`fixedRecord` with the listed downgrades applied.

## refuted

- None. Every audited draft in this batch survived its verdict (`refuted: false` on all eight), so
  nothing from batch 3 is queued as refuted.

## conflicts

- `enh:technique:explicit-enhancement` — the repository row `data/enhancements.ts#explicit-enhancement`
  states S/4HANA `"נתמך ומועדף על Implicit"`. The official page it contradicts is `Business Function`
  (S/4HANA On-Premise 2025 FPS01, loio `979bddd4cebe423f9eb5767a275b2d78`), which recommends *not*
  using the explicit enhancement options SAP defined with `ENHANCEMENT-POINT` / `ENHANCEMENT-SECTION`
  and offers "Business Add-Ins (BAdIs) or implicit enhancement options instead". The repository row
  is recorded as `conflicting_sources` in the record and was **not** edited; correcting it is a
  separate change to `data/enhancements.ts`.
- `enh:technique:implicit-enhancement` — three repository rows point the opposite way from the same
  official page and from each other: `data/enhancements.ts#implicit-enhancement` ("נתמך; להעדיף
  נקודות מפורשות/BAdI כשקיימות"), the `Implicit Enhancement` row in `data/exits.ts` ("שביר בשדרוג;
  תעד; העדף נקודות מפורשות/BAdI") and `data/enhancements.ts#explicit-enhancement`. Only the
  "prefer BAdI" half survives against the official source. Not edited here.
- `enh:technique:user-exit` — the same objects are classified two ways inside the repository: the PM
  workbook's Custom Code sheet types 27 rows as `User Exit`, and ten of those names
  (ITOB0001, IEQM0001, PCSD0002, IMRC0001, QQMA0001, QQMA0014, IWO10009, IWO10012, IWO10018,
  IPRM0001) are `Customer Exit` in `data/exits.ts`. The BC book separates the two mechanisms
  explicitly (`Application-Specific User Exits` = `Modification`; customer exits "do not affect
  software updates"). Recorded as `conflicting_sources`; the dataset itself was not changed.
  Side effect worth knowing: `data/exits.ts` holds **zero** rows of kind `User Exit`, so the
  technique page renders zero associated named enhancements even though `ExitKind` declares the value.
- `enh:technique:field-exit` — the repository row's `"הוחלף ע\"י screen logic/BAdI"` has no official
  support; nothing found names a sanctioned successor for a field exit, which is why the record
  carries no `successor` and an authored `verification_required` status.
- `enh:technique:customer-exit` — the derived status the app showed ("משתנה ב-S/4HANA") rests on the
  repository line `"נתמך; מועדף BAdI."`, for which no official page was found. The record replaces it
  with `verification_required` rather than inheriting an unsourced verdict.
- Id-syntax defect, still open from batch 2: the `Implicit Enhancement` row in `data/exits.ts` would
  canonicalise to `enh:badi:IMPLICIT ENHANCEMENT`, which cannot pass the id syntax rule because of the
  space. The technique record `enh:technique:implicit-enhancement` is the home of that evidence; the
  exits row has no overlay record.
- Universe gaps found while writing: `FIBF` and `SPAU_ENH` are both quoted verbatim from official
  pages but neither exists in `lib/route-manifest.generated.ts`, so neither could be added as an
  xref (`tx:FIBF` on `bte`, `tx:SPAU_ENH` on `implicit-enhancement` and `user-exit`). Both are named
  in prose in the relevant records instead.
- House-string inconsistency: this batch stores the ABAP platform evidence `product` verbatim as the
  search service returns it, `"ABAP platform"` (lowercase p). Two older rows in
  `data/verification/tables.ts` (lines 16358, 16489) write `"ABAP Platform"`. Not reconciled here;
  `tables.ts` is a closed catalog.

## open verification (live system)

- `CMOD` / `SMOD` component lists and `SPAU` / `SPAU_ENH` adjustment categories after a conversion —
  the one check that would settle whether existing customer exits, classic BAdI implementations and
  implicit enhancements survive in a concrete target system. The `sc4sap` MCP was unavailable.
- `RZ11` value of `abap/fieldexit` and an `SE38` run of `RSMODPRF` in a real S/4HANA system: the only
  way to decide `enh:technique:field-exit`, whose status is deliberately left `verification_required`.
- `SE18` for a kernel-based BAdI: no official record found names `SE19` in a kernel-BAdI context (in
  the retrieved snippets `SE19` appears with the *classic* BAdI), so the `tx:SE19` xrefs on
  `new-badi` and `explicit-enhancement` are catalog context, not a sourced association.
- The full `Exit Types` list (Function / Screen / Menu / Field / Documentation) lives only in the body
  of loio `c81975e643b111d1896f0000e8322d00`, which help.sap.com serves as a JavaScript shell.
- SAP S/4HANA Cloud Public Edition standing for every technique in this batch: the product-scoped
  queries returned nothing naming these techniques. That is a search-bounded finding, never recorded
  as unavailability.
- Simplification Item Catalog (`launchpad.support.sap.com/#/sic`) needs an S-user; the only
  simplification evidence in this batch is the public `SIMPL_OP2025.pdf`, read in full.

### Writer deviations, batch 3 (all measured against the official search service on 2026-09-21)

- `product` for the `ABAP_PLATFORM_NEW` evidence rows is written `"ABAP platform"` in all four
  records that carry them, matching the search record verbatim. The `classic-badi`, `new-badi` and
  `field-exit` `fixedRecord`s said `"ABAP Platform"`; the `explicit-enhancement` verdict required the
  verbatim form. Verbatim wins, and the batch is internally consistent.
- Three fragments the auditors marked truncated came back complete on a re-query and are quoted in
  full: the `LOG_EAM_CI_4` BAdI name (`"BAdI: Filling of Customer Fields for Measuring Points and …
  Documents"`, not `"Measuring Po"`) on `customer-exit`; `"Run transaction SE38, execute program
  RSMODPRF Enter the data element of the field to be enhanced"` on `field-exit`; and
  `"…or the user exit CNEX0027 to implement your own customer-specific logic"` on `user-exit`.
- `user-exit` evidence 3: the `fixedRecord` said two further pages "repeat the same pairing". Only
  loio `95139a0602af4c26a3e4a5a6a782356a` repeats `DI_WPS_PLANT_STORLOC`; loio
  `9da79ba177fa4a25beb8fbd30005bcd9` pairs `CNEX0027` with a *different* BAdI, `CHANGE_PLANT_STORLOC`.
  The claim now says so.
- `bte` evidence 6: the simplification-list negative is stated as a standalone-token count. The
  measured result over the full 1,514-page extraction is 0 occurrences of `Business Transaction
  Event`, 0 of `FIBF`, and 0 of `BTE` as a word — the three raw `BTE` substrings found are inside
  object names (`RSWUVWIZBTE`, `WBTE`, `get_stock_change_for_bte`), which the claim now names.
- `accessedAt` / `lastVerifiedAt` are written through a new file-level constant
  `DATE21 = "2026-09-21"`, beside `DATE` and `DATE14`, as the `classic-badi` auditor instructed.
- No record carries `reviewer`, per the `data/verification/**` convention.

### catalog-integrity finding (2026-09-21, measured during the batch-3 inventory)

Two rows in `data/exits.ts` carry names that cannot form a canonical id, so neither can
ever receive an overlay record:

| row | `kind` | id it would need | why it fails |
|---|---|---|---|
| `CMOD/SMOD` | `Customer Exit` | `enh:exit:CMOD/SMOD` | the id syntax rule in `lib/evidence/validate.ts` rejects `/` |
| `Implicit Enhancement` | `Enhancement Spot` | `enh:badi:IMPLICIT ENHANCEMENT` | the same rule rejects a space |

Neither row is an enhancement in the first place. `CMOD/SMOD` is the pair of maintenance
transactions that manage customer exits, and `Implicit Enhancement` is a technique. Both
are already covered properly: the transactions belong in the transaction catalog, and
the technique is covered by `enh:technique:implicit-enhancement`, written in this batch.

Consequence: the enhancements catalog total (42) counts two rows that can never be
verified, so the catalog can reach at most 40 records.

Same defect class as the five non-function keys recorded in
`research-queue-functions.md`. Not fixed inside an enrichment batch: removing or
re-homing rows in `data/exits.ts` changes what the enhancement pages render, so it needs
its own audited change with a before and after route check.

---

# Batch 4 · written 2026-09-21 (access date stamped 2026-09-21)

The 9 audited PP / PP-PI extension drafts of the closing batch: `enh:exit:CONFPP01`,
`enh:exit:PPCO0021`, `enh:exit:PCSD0002`, `enh:badi:MD_PLDORD_POST`, `enh:badi:MD_ADD_ELEMENTS`,
`enh:technique:substitution-validation`, `enh:technique:transaction-variant` (7 written) and
`enh:technique:enhancement-spot`, `enh:technique:vofm` (2 refuted at the gate, queued below).
Five of the seven were written from their auditor's `fixedRecord`; `MD_PLDORD_POST` was re-derived
from its verdict text with the six listed downgrades applied (no `fixedRecord` was supplied), and
`PCSD0002` is the submitted draft with exactly the two patched fields the verdict names.

## refuted

- `enh:technique:enhancement-spot` — **structural, blocking.** The draft put `recommendedAction` on
  the record as a sibling of `status`, not inside it. `S4StatusClaim.recommendedAction` is required
  (`lib/evidence/types.ts`) and `VerificationRecord` has no such property, so the record as drafted
  carries a missing required field plus an excess property and cannot compile under `tsc --strict`.
  Beyond the shape: (a) the draft invented a "4-evidence limit" and then used it as the stated
  reason for omitting exactly the evidence its status token needs. No such cap exists. The
  auditor's own counts for this point were themselves off; re-measured over the 38 records now in
  `data/verification/enhancements.ts`, the range is 4 to 7 evidence entries (18 records at 4, 13 at
  5, 6 at 6, and `enh:exit:IMRC0001` at 7; `new-badi` 6, `bte` 6, `user-exit` 5), which still
  refutes a four-item cap; (b) the token `unchanged` asserts no
  change between SAP ERP and S/4HANA while all four evidence items are current-release only (ABAP
  platform 202510.001 ×3, S/4HANA 2025.001 ×1) and not one cites the ECC side, unlike the file's
  own precedent `enh:technique:new-badi`, which anchors `unchanged` on the technique being
  documented on both sides (SAP ERP 6.0 EHP8 / `ES_EDOCUMENT`) — the auditor reproduced an ECC-side
  source, so this is an omission, not an evidence vacuum; (c) `notes` claimed loio
  `8200b753128eb44ce10000000a174cb4` is also served under the book `Controlling (CO)`, and three
  separate `scripts/sap-help-search.mjs` runs returned it only under `Production Orders (PP-SFC)`,
  deliverable `34de0103497c4b80a7c7fbf6952ff971`; the CO topic that actually covers order-split
  costing is a different loio (`Production Order Split (at Actual Costs)`, Controlling (CO),
  `d0aab26fdd044c82ae9bb2ef435fc631`, 2025.001); (d) the record leaned throughout on "all four URLs
  return HTTP 200 with a 1,160-byte JavaScript shell" as verification — the auditor ran a control
  with a deliberately fabricated loio on the same deliverable path and got the same 200 and the
  same shell, so the curl verifies nothing (the four URLs are genuine, but because the search
  service returned them); (e) `summary` claimed the record passed `validateRecords` over all eight
  overlay files and `tsc --strict` cleanly, which cannot be true: no such id exists in
  `data/verification/enhancements.ts`, so nothing in the repo was validated, and in the drafted
  shape `tsc --strict` cannot be clean. Minor: `status.he` calls the ABAP Platform bridge page
  "עמוד ABAP Platform של אותה גרסה" while `status.release` is 2025.001 and that evidence carries
  202510.001 — two different versionId spaces the record elsewhere keeps apart.
  **Still missing:** the record moved into the correct shape (`recommendedAction` inside `status`);
  an ECC-side official source for the `unchanged` token, or a downgrade of the token; the CO-book
  claim dropped or re-cited to `d0aab26fdd044c82ae9bb2ef435fc631`; the HTTP-200 language removed or
  restated as "the search service returned this record"; and an actual validation run instead of an
  asserted one.

- `enh:technique:vofm` — **unsupported claims about Oil & Gas, measured against the service.**
  `notes` asserted that S/4HANA On-Premise 2025 FPS01 names transaction VOFM "in at least four
  books (Sales, Service, Oil & Gas, China and Peru among the countries)". Oil & Gas does not name
  it: `node scripts/sap-help-search.mjs "VOFM transaction routine" --size 21` returns 21 S/4
  2025.001 records whose only Oil & Gas hit is `Routine Setups` (PRA, DN Automation), with no VOFM
  in the snippet, and a dedicated `"Oil Gas VOFM"` query returned 21 records with VOFM in zero
  snippets. The two Oil & Gas pages the draft cites (`f98dcf535b804808e10000000a174cb4`,
  `f08dcf535b804808e10000000a174cb4`) quote only the IMG path `Sales and Distribution System
  Modification Routines Define formulas for pricing`; the transaction code never appears. The
  record's own `evidence[2].claim` is scrupulous about this ("עמודי ה-System Adaptation ... אינם
  נוקבים ב-VOFM") and `notes` contradicts it, inflating the book count from three to four. Same
  root cause in `notes` ("בתיעוד 2025 FPS01 של Oil & Gas הן מכונות דווקא user exit") and `gaps[2]`:
  both treat the Oil & Gas formula routine as a VOFM routine, while the page names an IMG activity
  and never VOFM — and that inference is the sole basis for the record's Modification-vs-Exit
  classification discussion. Further: (a) `notes` states "SPAU מופיעה ארבע פעמים" in the extracted
  Custom Code Migration guide; re-measured on the same file (1,893,033 bytes, 82 pages;
  `pdftotext` → 118,659 bytes) `grep -o SPAU | wc -l` = 8, four of them inside `SPAU_ENH`, over 4
  lines — the figure four holds only under line counting, which the record does not state (the
  other two counts, `modification` 8 and `enhancement` 5, check out exactly, and the load-bearing
  negatives VOFM 0 / routine 0 hold); (b) `status.he` says the Sales book instructs creating a
  pricing routine in VOFM — China and Peru are verbatim, Sales is not: its three 2025.001 pages say
  "create a new VOFM copy routine", "(Transaction VOFM in menu point Formulas)" for free-goods
  quantity rules, and the credit No Check routine, and a follow-up query returned no Sales page
  instructing pricing-routine creation; none of the three is cited as evidence; (c) house-style
  deviation: `evidence[1]` and `evidence[2]` carry claims about pages they do not link
  (`8402608dfbe34b7abfede95d315a076e` under evidence[1]; three further loios under evidence[2]), so
  a reader following evidence[2]'s link sees one of the four sentences quoted — all four secondary
  loios do verify, so this is structural, not factual, and the stated reason ("כדי להחזיק את מספר
  הראיות בארבע") is not a rule in this repository; (d) `summary` says "לצד 30 הרשומות הקיימות
  בקובץ" while `ENH_VERIFICATION.length` was 31 (the two validation runs themselves reproduce clean
  with `lib/evidence/validate.ts`); (e) minor, `gaps[3]` presents "31, 108, 113, 311, 601" as
  S/4HANA findings — 108 is ECC only (`Merchandise Distribution: Customizing Settings`, SAP ERP
  6.18.latest, loio `eca3c7536e8e2a4be10000000a174cb4`).
  **Still missing:** the Oil & Gas claims dropped from `notes` and `gaps` or replaced with the IMG
  path the page actually carries; the Sales half of `status.he` either cited to one of the three
  real Sales pages or removed; the SPAU count restated as measured (8 occurrences / 4 lines); each
  `Evidence.claim` bounded by the page its own `url` points to, with the secondary loios promoted
  to their own evidence entries; and the record count corrected.

## conflicts

- `enh:exit:CONFPP01` — `data/exits.ts#CONFPP01` describes the exit as input validation that blocks
  posting ("ולידציה/לוגיקה באישור פעולת ייצור/תהליך", trigger "בעת אישור (CO11N/COR6N), לפני רישום"),
  scopes it to process orders and COR6N, and names `BAdI WORKORDER_CONFIRM` as the Clean Core
  target. The only official document that names CONFPP01 at all is the Plant Connectivity 15.0
  implementation guide (read in full, p. 19 of 34), which pairs it with `EXIT_SAPLCORF_101` and
  shows one example scenario — reading external machine data into the confirmation fields in CO11N
  on the *Propose actual data* pushbutton. It does not enumerate the enhancement's function-exit
  components, does not define its scope and does not rule the repository's uses out; and it names
  two different includes for the same implementation (`ZXCOFU06` on p. 19, `ZXCOFU11` in step 5 on
  p. 19 and in the sample-code header on p. 20), an inconsistency internal to the source that was
  not resolved. `WORKORDER_CONFIRM` appears on no official S/4HANA page (see
  `enh:badi:WORKORDER_CONFIRM`). Recorded as an authored `verification_required` status, not as a
  conflict record, because the gap is silence in the sources rather than a contradiction.
- `enh:exit:PPCO0021` — three repository layers describe the same exit three different ways:
  `data/exits.ts` "בדיקת רכיבי פקודה" (inferred), `data/workbenches-ext.ts` "Exit בעת יצירת רכיבי
  הזמנה / חישוב מחדש של RESB", `data/troubleshooting-ext2.ts` the scenario "פיצוץ BOM ללא רכיבים
  בפקודה"; `data/domain-detail.ts:369` shortens to "PPCO0021 (רכיבים)". The `object` field carries
  `Enhancement PPCO0021` with no function-exit name. No official source decides between them: the
  name PPCO0021 appears in zero titles and zero snippets across fourteen queries in three products,
  and zero times in the 2025 FPS01 simplification list (which does contain 23 `PP-SFC` hits). The
  `eccS4.changed` line "העדף BAdI WORKORDER_GOODSMVT" has no official support either. Left as
  repository-layer statements rather than a conflict against SAP, since there is no SAP statement
  to conflict with.
- `enh:exit:PCSD0002` — written as `conflicting_sources`. `data/exits.ts#PCSD0002` calls it
  "ולידציה/השלמה של פריטי עץ מוצר בשמירה" and the PM migration workbook row 11 calls it "ברירות
  מחדל לפריטי עץ מוצר"; the two contradict each other and both contradict the official 2025 FPS01
  table `Enhancements for Function Group XCSA`, where PCSD0002 is `Customer fields in item`,
  `Component check for material items` belongs to PCSD0005 and `Enhance maintenance of material
  BOMs` to PCSD0001. Separately, the `eccS4.changed` name `BADI_BOM_CHANGES` did not appear as a
  standalone token in any title or snippet across 105 returned records in five On-Premise queries
  or the two Public Cloud records; the documented modern BOM extension points are `BOM_BEFORE_SAVE`
  (spot `ES_BOM_UPDATE`, interface `IF_BOM_BEFORE_SAVE`, method `HANDLE_BEFORE_SAVE`) and
  `BOM_UPDATE` (method `CHANGE_ADD_SAVE`). Neither declares itself a successor, so no `successor`
  was written.
- `enh:badi:MD_PLDORD_POST` — `data/exits.ts` merges two different BAdIs and inverts the MRP Live
  direction. SAP's R/3 4.70 release note defines `MD_PLDORD_POST` as further processing of planned
  orders *already posted* ("You can, for example, log any changes made") and assigns pre-posting
  data changes to a separate BAdI, `MD_PLDORD_CHANGE`; the repository row describes intervention in
  creation and update. Its trigger is limited to posting by MRP, while the release note adds
  "posted during manual planned order processing". And `eccS4.changed` reads "תואם MRP Live (מועדף
  על M61X exits)", the opposite of what the simplification item states: `MD_PLDORD_POST` is listed
  among the classic BAdIs to be re-implemented as an AMDP BAdI, and classic implementations are not
  processed for a material planned in MRP Live.
- `enh:badi:MD_ADD_ELEMENTS` — `data/exits.ts` records "נתמך." with no MRP Live qualification, sets
  the trigger to "MD04/MD05", and presents the Fiori app *Monitor Material Coverage* as the BAdI's
  counterpart. Measured against the sources: no official page ties BAdI-added elements to any Fiori
  app; MD05 appears in no official source for this BAdI, while MD04, MD07, MD01 and MD02 do; and
  per the comparison pages already recorded under `tx:MD04`, `Monitor Material Coverage - Net
  Segments (F0247A)` maps to MD07 and `Manage Material Coverage (F0251)` to MD04. Also corrects a
  note inside this catalog: `enh:exit:M61X0001` states the 2025 FPS1 rotated BAdI table "cannot be
  extracted"; it can, with `pdftotext -raw` plus whitespace stripping, and the `Extension M61X0001`
  row sits on pp. 729 and 752 of that very file. That note should be updated in its own change.
- `enh:technique:substitution-validation` — `data/enhancements.ts#substitution-validation` states
  that "חלק מההחלפות מומרות ל-BAdI/BRF+"; no official source found supports it, and no page says
  BRF+ replaces the technique. Its two examples ("אימות ייחוס חשבונאי בהזמנת אחזקה", "החלפת מרכז
  רווח בעלות פק\"ע") are not connected to a maintenance order or a process order on any official
  page found, so they stayed at repository level. Transaction `OKC7` appears in exactly one support
  content page and in no product documentation. The code-to-action mapping `GGB0` = validation /
  `GGB1` = substitution is supported by three support-content pages but by no S/4HANA product
  documentation page.
- `enh:technique:transaction-variant` — `data/enhancements.ts#transaction-variant` states for
  S/4HANA "ב-Fiori התאמה דרך UI Adaptation". The 2025 FPS01 page `Adapt User Interfaces at Runtime`
  (loio `a80e623dc43a4fe5b1531695c2f7aeb5`) does define runtime UI adaptation for key users, but it
  never mentions transaction variants and never presents itself as their replacement, so no
  `successor` and no `fiori_alternative_available` flag were written. Source-side typo worth
  knowing: `Technical Information on Transaction Variants` (PP-REM, loio
  `be68b6531de6b64ce10000000a174cb4`) prints "(transaction SDH0)" in both the SAP ERP 6.18 and the
  S/4HANA 2025.001 servings. `SDH0` is SAP's own typo for `SHD0` and must not be recorded as a
  transaction.

## open verification (live system)

- `SMOD` / `CMOD` / `SE37` in the target system for `CONFPP01` (existence, the function-exit
  component list, the `EXIT_SAPLCORF_101` interface and which include actually carries the code,
  `ZXCOFU06` or `ZXCOFU11`) and for `PPCO0021` (existence, short text, components, calling point,
  and whether it is assigned to an active project after conversion).
- `SE18` / `SE19` for `MD_PLDORD_POST` and `MD_ADD_ELEMENTS`: enhancement-spot name, method
  signatures and parameters, filter/multiple-use flags, and the active implementations. No official
  S/4HANA page names either BAdI's interface.
- `SMOD` plus `SE18` for `PCSD0002`: whether `EXIT_SAPLCSDI_002` and `EXIT_SAPLCSDI_003` really
  belong to it (the pairing rests on snippet column order with an ellipsis between the enhancement
  name and the two modules, so it was not recorded as an alias), and whether any object named
  `BADI_BOM_CHANGES` exists at all.
- `GGB0` / `GGB1` / `OB28` / `OKC7` in the installed system for the substitution-validation
  technique: which codes exist, which action each performs, and the form-pool entries in `T80D`.
- `SHD0` in the installed system for transaction-variant: the variant names, screen numbers and
  assignments, which are release- and support-package-dependent.
- The `sc4sap` ABAP MCP was unavailable in every session of this batch (`Connection closed`), so no
  live SAP check was performed or claimed anywhere in these records.

## writer deviations, batch 4

- `enh:exit:PPCO0021`: the auditor's `fixedRecord` opened `notes` with an editorial instruction to
  the writer ("הערת עריכה לכותב: כל ערכי DATE21 לעיל הם הקבוע `DATE21` ..."). That sentence is
  instruction, not record content, and was dropped; the instruction itself was carried out (every
  `accessedAt` and `lastVerifiedAt` in the batch is the `DATE21` constant, never a literal).
- `enh:exit:PCSD0002`: the verdict's structured patch says `appendToClaim` on `evidence[3]` while
  its prose says "add at the end of the claim, before the final two sentences". The recommendation
  column belongs with the workbook rows it describes, so the sentence was placed immediately after
  the row enumeration and before the closing conflict statement. Text identical either way.
- `enh:badi:MD_PLDORD_POST` had no `fixedRecord`; it was re-derived from the draft with all six
  downgrades applied, including the optional strengthening (the `MD_MRP_FORCE_CLASSIC` sentence is
  now grounded in the simplification-list PDF that was read, not only in a snippet). SAP note
  3233524, which the verdict flagged as legitimate but off-topic, was deliberately not added.
- `enh:technique:transaction-variant` was taken from the auditor's fully patched record file rather
  than re-typed, as the verdict directed; all twelve downgrades were re-checked against it before
  writing (six evidence entries, no bridging inference in `evidence[0]`, the full SE93 sentence, the
  corrected twin attribution, the corrected SDH0 warning, zero em dashes).
- The two em dashes that remain in `enh:exit:PCSD0002` sit inside SAP's own deliverable title
  `Logistics — General (LO)`, returned verbatim by the search service, and were left as quoted.

### Resolved 2026-09-21 (design audit round 2 · audit/ux-2026-09/SAP-FIXES.md)
- catalog-integrity finding (`CMOD/SMOD`, `Implicit Enhancement` rows in `data/exits.ts`): applied. Both rows removed from the named-exit catalogue; every unique sentence moved into the `note` of `data/enhancements.ts#customer-exit` and `#implicit-enhancement`. Named exits 42 → 40, all id-bearing.

## decisions on the two refused ids (2026-09-22, design-audit continuation §11)

- `enh:exit:PPCO0021` — stays out of the overlay. The refused draft carried an uncited method name in `recommendedAction`; the auditor's re-run named two official records that DO document the BAdI ("BAdI for Further Processing Changes to Orders", What's New in SAP S/4HANA 2022 SPS03, loio 86956eb2f92146db85b12838f4affeb8, and its 2023 counterpart). Decision: re-research in the next enhancements batch with those two records as the starting evidence; until then the row keeps its derived status (no invented text restored).
- `enh:technique:enhancement-spot` — stays out of the overlay. The refused draft was structurally wrong (`recommendedAction` outside `status`, an invented "4-evidence limit"). Decision: re-draft in the next enhancements batch with the record shape of `lib/evidence/types.ts` and the evidence its status token needs; nothing from the invalid draft is restored.
- Both are queued for the enhancements pipeline after the functions priority list; neither is marked DONE.

---

# Batch 5 · written 2026-09-22 (access date stamped 2026-09-22, const DATE22)

2 drafts audited: **2 written**, **0 refuted**. Written ids: `enh:technique:enhancement-spot`,
`enh:technique:vofm`. Neither verdict carried a `fixedRecord`; both are the audited draft with the
listed downgrades applied. This closes the batch-4 decision above for `enhancement-spot`
(re-drafted with the `lib/evidence/types.ts` shape; nothing from the invalid draft restored).
The catalog was already graduated out of the repository-only foundation guard, so no test change.

## refuted

- (none in this batch.)

## conflicts

- Correction to the batch-4 refutation of `enh:technique:enhancement-spot`, point (c): loio
  `8200b753128eb44ce10000000a174cb4` is not served only under Production Orders (PP-SFC). Per the
  batch-5 auditor, the query 'WORKORDER_UPDATE CO_SPLIT_COMPONENT_POST_GI' returns the same loio
  under Controlling (CO), deliverable `5e23dc8fe9be4fd496f8ab556667ea05`, 2025.001. The written
  record cites only the PP-SFC serving, so nothing in the overlay depends on this.
- `enh:technique:enhancement-spot` vs `data/enhancements.ts#enhancement-spot`: 'זמין מ-NW7.0' and
  'Clean Core' are not supported by any official record found; 'SE20 ליצירת Spot' only partly
  (SE20 appears as the Enhancements screen, not as a create-spot instruction). Not a conflict
  marker in the overlay; the repository row is not cited as evidence.
- `enh:technique:vofm` vs `data/enhancements.ts#vofm`: the Access Key requirement, the s4 line
  'להעדיף BAdI/Extension כשאפשר' and the PP example are unsupported by any official source found;
  recorded as `verification_required` on the repository evidence entry, not as a refutation.

## writer deviations, batch 5

- `enh:technique:enhancement-spot`: optional downgrade 1 applied. The writer re-ran the query
  'Cost Distribution at Order Split enhancement spot WORKORDER_UPDATE' on 2026-09-22 and the
  PP-SFC 2025.001 record returned 'Order of Order Split) in the enhancement spot WORKORDER_UPDATE.';
  the sentence was added to `status.source.claim` and `evidence[3].claim`.
- `enh:technique:vofm`: the stitched-quote fix was also applied to `status.he`, which carried the
  same single reconstructed sentence (the verdict named only `evidence[0]` and `status.source`).
  The writer re-read the 2025.001 snippet: it ends '(Transaction VOFM in menu point', confirming
  the quote is fragmentary.
- `enh:technique:vofm` `evidence[5]`: besides the path and line-count fix, 'שחולץ במאגר' became
  'שחולץ בתיקיית העבודה', because the extracted text lives in the session scratchpad, not in the
  repository.
- `enh:technique:vofm` `notes`: the 2023 FPS03 sentence was rephrased, not removed. The writer
  re-ran the scan on 2026-09-22 against `scratchpad/SIMPL_OP2023.pdf.txt` (2,486,408 bytes): one
  VOFM occurrence, in the OGSD Classic Interfaces item. The notes state the drafted path did not
  exist and that the scan is not cited as evidence.
- No live SAP check was performed (sc4sap MCP: Connection closed).

# Batch 6 · written 2026-09-25 (access date stamped 2026-09-24, const DATE24)

5 drafts audited: **5 written**, **0 refuted**. Written ids: `enh:technique:user-exit`,
`enh:technique:customer-exit`, `enh:technique:explicit-enhancement`, `enh:technique:field-exit`,
`enh:exit:IWO10009`. All five deepen records that already existed; no new id. user-exit,
customer-exit and IWO10009 come from the auditor's `fixedRecord`; explicit-enhancement and
field-exit are the audited draft with the verdict downgrades applied. The catalog was already
graduated out of the repository-only foundation guard, so no test change.

## refuted

- (none in this batch.)

## conflicts

- `enh:technique:user-exit`: the batch-3 `conflicting_sources` repository row (PM workbook "User
  Exit" against `data/exits.ts` "Customer Exit" for the same ten names) is still open. The new
  Public Cloud row (Extensibility, loio `533228e1e854433ab16d013f161ca509`, 2608.500) does not
  settle it: the page text read names no User Exit, SMOD or CMOD, which is a bounded negative.
- `Handle Your Extensions` (loio `be44d6b8f0944c0c81107e34e7232fff`, 2608.500) is read two ways in
  this batch. The customer-exit auditor dropped it, because its "two extensibility options" line and
  the note "Side-by-Side Extensibility through SAP BTP is not supported" belong to a test data
  refresh app page. The explicit-enhancement auditor kept it as `evidence[5]` (the claim says it is
  that app's page), and the explicit-enhancement `recommendedAction` names Key User and Developer
  Extensibility as the two options that page lists. Both texts match the body read; the
  Extensibility page (loio `533228e1e854433ab16d013f161ca509`) lists three options. To settle it,
  a later pass can re-point the explicit-enhancement Public Cloud sentence to the Extensibility
  page. Not changed here, because the auditor approved the sentence as written.
- Verbatim repository quotes that break Hebrew house rule 7 remain in rows this batch did not
  touch: `enh:technique:user-exit` `evidence[4].claim` and `notes` quote the
  `data/enhancements.ts#user-exit` sentence 'נתמך אך לא מומלץ ... Clean Core מעדיף BAdI/Extension
  Point' with its em dash, and `enh:technique:explicit-enhancement` `evidence[4].claim` quotes
  'ENHANCEMENT-POINT בעיבוד הזמנת ...' with the word the house rules replace by "תחזוקה". The
  field-exit record shows the fix pattern (a colon in place of the em dash, disclosed as adjusted
  punctuation). The user-exit deepening allowed no other edit, so both stay for a follow-up.

## open verification

- The interactive diagram on the Extensibility page (loio `533228e1e854433ab16d013f161ca509`) is
  not returned by `scripts/sap-help-body.mjs`. Every absence statement about that page in
  user-exit and customer-exit is bounded to the text body.
- SAP S/4HANA Cloud Private Edition standing of user-exit, customer-exit, explicit-enhancement and
  field-exit: no Private Edition product id was found in the search service
  (`SAP_S4HANA_PRIVATE_CLOUD`, `SAP_S4HANA_CLOUD_PRIVATE`, `SAP_S4HANA_CLOUD_PRIVATE_EDITION`
  returned 0 records for 'field exit').
- Live system checks are still open: SMOD, CMOD and SPAU for the customer exits, `RZ11` for
  `abap/fieldexit` with an `RSMODPRF` run, and `EXIT_SAPLCOIH_009` for IWO10009.

## writer deviations, batch 6

- `enh:exit:IWO10009`: the `fixedRecord` field `reviewer: "researcher"` was not written. No record
  in `data/verification/**` carries `reviewer`, several records' notes state that convention, and
  the evidence block would render it as a reviewer label ("סוקר: researcher").
- `enh:technique:customer-exit`: the absence statements about the Extensibility page are bounded to
  the text body read in `status.he`, `recommendedAction`, `evidence[5].claim` and `notes`
  ("טקסט גוף העמוד שנקרא", "התרשים האינטראקטיבי שבעמוד לא נקרא"). Reason: the user-exit auditor
  re-fetched the same page (deliverable 41170545) and found an interactive diagram the script does
  not return. No new lookup was run for this.
- `enh:technique:explicit-enhancement`: the optional notes downgrade was applied ('כל אחת החזירה
  21 רשומות בעמוד התוצאות של הסקריפט').
- `enh:technique:user-exit`: the new row is the 6th evidence row, per the `fixedRecord` (the draft
  note said 5th; the record held 5 rows, the repository conflict row included).
- Unchanged rows were kept byte for byte from the file: customer-exit rows 1 to 5, user-exit rows 1
  to 5, explicit-enhancement rows 1 to 5 and `status.source` (all DATE21), IWO10009 rows 1, 2 and 6
  (DATE). Where a rewritten string kept an unchanged span, the file's U+200F marks in that span
  were carried over; the audited JSON had none.
- Coverage (`npm run report:coverage -- --catalog enhancements`), before and after: 40 records,
  L2 10, L3 12, L4 3, L5 15; 28 verified, 12 conflicting, 30 S/4-applicable. Edition-specific went
  from 1 to 4 (the three new Public Cloud rows). No record changed depth, level or status.
- No live SAP check was performed.

# Batch 7 · written 2026-09-25 (access date stamped 2026-09-24, const DATE24)

5 drafts audited: **4 written**, **1 refuted**. Written ids: `enh:exit:IWO10012`,
`enh:exit:IWO10018`, `enh:exit:QQMA0014`, `enh:exit:CONFPM01`. All four deepen records that already
existed; no new id. IWO10012, IWO10018 and QQMA0014 come from the auditor's `fixedRecord`; CONFPM01
had no `fixedRecord` and is the audited draft with the verdict downgrades applied. The catalog was
already graduated out of the repository-only foundation guard, so no test change.

## refuted

- `enh:exit:QQMA0001`: refuted at the second-round gate. The auditor confirmed all nine first-round
  problems fixed: row 5 is bounded to the Public Cloud body read (loio
  `211d0924bec64fdc89388d4aa82e66ca`, 2608.500), the Create Maintenance Request row is gone, the old
  notes are an exact prefix of the new notes, and the six search counts reproduce. The repair added
  a `reviewer` field holding a personal e-mail address. No record in `data/verification/**` has a
  reviewer field, the review it names did not happen, and `lib/evidence/resolve.ts` passes
  `reviewer` to the UI, so the address would ship in the static export. Not written; the live
  record (2026-09-02) stays. To unblock: resubmit the same draft without `reviewer`. No other change
  was asked for.

## conflicts

- `enh:exit:IWO10012`: both repository conflicts are unchanged (`data/exits.ts` 'ברירות מחדל לפעולת
  פקודה'; PM workbook customCode row 26 'בדיקת אישורי עבודה (Permits)'). The suggested catalog name
  now reads 'הזמנת תחזוקה: טיפול בעדיפות בכותרת המרכזית' (house rule 7); the batch-1 line above keeps
  the old wording as history.
- `enh:exit:IWO10018`: repository conflicts unchanged (workbook row 27, `data/workbenches-ext.ts`,
  `data/tx-intel.ts` IA01 to IA12). Search-count drift: 'IWO10018' on SAP_S4HANA_ON-PREMISE returned
  9 records for the researcher and 8 on the auditor's re-run of 2026-09-25 (index drift, stated in
  the notes).
- `enh:exit:QQMA0014`: repository conflicts unchanged (`data/exits.ts` name 'ברירות מחדל להודעה',
  `data/domain-detail.ts`; QQMA0025 still absent from `data/exits.ts`).
- `enh:exit:CONFPM01`: the `data/exits.ts` conflict (checks on confirmation against the official
  'Determine customer-specific default values') is still open. Cross-record fix: the draft said
  WORKORDER_CONFIRM was found on no official page checked, but `enh:badi:WORKORDER_CONFIRM` cites the
  R/3 Enterprise 4.70 PP release notes (help.sap.com PDF, `legacy_context_only`) that name it. The
  CONFPM01 negative is now bounded to S/4HANA pages and points at that record.

## open verification

- `enh:exit:IWO10009`: candidate evidence row. The QQMA0014 auditor re-read 'BAdI: Customer Check
  for Save Event' (EAM_ORDER_CHECK_SAVE_EVENT, loio `ff45fb54ff7e4cd581c415e61bc931af`, 2025.001,
  PM-WOC-MO) and confirmed it is a maintenance-order save BAdI. No file in `data/verification/**`
  records it yet; the QQMA0014 record mentions it only as a Save BAdI documented for maintenance
  orders, without the name. A later IWO10009 pass can add it as evidence, not as a successor.
- `enh:exit:CONFPM01`: the version-stamped Simplification List was not checked for CONFPM01
  (`scratchpad/official/`, `audit/master-completion/simpl-tcode-index.json`); no such item came up in
  the help.sap.com searches. Private Cloud: no dedicated source was checked.
- Live system checks are still open for all four: SMOD/CMOD components and EXIT_ function modules
  (IWO10012; IWO10018 with CI_AUFK in SE11; QQMA0014 with EXIT_SAPMIWO0_020; CONFPM01), and SE18 for
  WORKORDER_CONFIRM in maintenance-order confirmations.

## writer deviations, batch 7

- `enh:exit:IWO10012` `evidence[3].claim` and `notes`: 'גוף העמוד נקרא במלואו' became 'טקסט גוף
  העמוד נקרא ... (התרשים האינטראקטיבי שבעמוד לא נקרא)', and the absence statements are bounded to
  the text read. Same page (loio `533228e1e854433ab16d013f161ca509`) and same reason as the batch-6
  customer-exit deviation. No new lookup was run.
- `enh:exit:IWO10012` `notes`: 'אין מקור רשמי הממפה את IWO10012 אליו' became 'לא נמצא מקור רשמי
  ...' (house rule 3.2: a documented negative, not a non-existence claim).
- `enh:exit:IWO10018` `notes`: the `fixedRecord` says the 2026-09-02 finding stays detailed below,
  but it dropped parts of it. Restored from the live record (house rule 8): workbook row 27, the fix
  recommendations for the workbook and `data/tx-intel.ts`, the ERP 7.0 'Use of User Data' body
  reading (reworded without 'רק', as the auditor required for the same page's snippet), and the
  'Extensibility for Maintenance Order (Version 2) API' finding (loio
  `221fe759ed294021a2a249ff04ddde83`), which backs the 'API של ההזמנה' part of `recommendedAction`.
  The SAP PRESS sentence was not restored; evidence row 5 carries it. The pipeline tag 'חוקר
  enh:exit:IWO10018' was removed, as the IWO10012 auditor required for the same kind of text.
- `enh:exit:CONFPM01` `notes`: restored from the live record: the SMOD check line, the list of
  derived repository files, the recommendation to add CONFPM02, CONFPM04 and CONFPM05 to the
  catalog, and the PP (CO11N/COR6N) and SE18 point for WORKORDER_CONFIRM. The WORKORDER_CONFIRM
  negative is bounded to S/4HANA (see conflicts). 'היום' became '2026-09-24'; the pipeline tag
  'העמקה מרובד 3' was removed.
- Not applied: the CONFPM01 verdict's `gaps[4]` and `summary` downgrades target researcher output
  that the overlay does not store; the gap is carried under open verification above.
- Unchanged rows were kept byte for byte (deep comparison against the pre-write file): IWO10012
  rows 1, 2, 5, 6; IWO10018 rows 1, 5, 6; QQMA0014 rows 1 to 4 and 6 plus `status.source`; CONFPM01
  rows 1 to 3 and 5. The other 36 records are unchanged.
- Coverage (`npm run report:coverage -- --catalog enhancements`), before and after: 40 records,
  L2 10, L3 12, L4 3, L5 15; 28 verified, 12 conflicting, 30 S/4-applicable. Edition-specific went
  from 4 to 6 (the new Public Cloud rows on IWO10012 and CONFPM01). No record changed depth, level
  or status.
- No live SAP check was performed.
