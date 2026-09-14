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
