# Research queue · tables catalog (S/4HANA enrichment)

Kept by the single writer for `data/verification/tables.ts`. One line per id that was
refuted or deferred at the adversarial-verification gate, with the evidence still missing.
Written 2026-09-02 during the tables data commit (13 drafts audited: 12 written + the
upgraded `table:MSEG` worked example; 1 refuted). Updated 2026-09-07 for batch 2 (16 audited:
15 written incl. the `table:MARA` rewrite; 1 refuted, `table:AFVC`). Updated 2026-09-15 for batch 3
(15 audited, 15 written, 0 refuted; `table:AFVC` resolved), and again 2026-09-15 for batch 4
(15 audited, 15 written, 0 refuted; one correction queued for `tx:IP30` in the transactions catalog).

## refuted / needs new evidence

- `table:MARA` — RESOLVED 2026-09-07 (batch 2): rewritten from the search index (four 2025.001 loios: 8aecfa1e, 977cbd53, 1bc030a8, e10c7322; no composite URL), audited and written as `changed` with `status.source`. Open point kept in the record's notes: the official snippet ties the 40-character number to MATNR_EXTERNAL and calls MATNR the short version; the MATNR CHAR 18 -> CHAR 40 statement is repository-only (`data/s4-impact.ts#MARA`) and needs SE11 or the Simplification Item text. Original refusal kept below for the trail.
  - (2026-09-01 refusal) refuted at audit (2026-09-01), not written. Missing evidence before a rewrite: (1) a correctly-indexed official URL for the extensibility topic — loio `dacf081f31af4c93ab97da957c71feee` is indexed only under deliverable `8308e6d301d54584a33cd04a9861bc52` ("SAP S/4HANA and SAP S/4HANA Cloud Private Edition" key-user extensibility guide), while the draft cited a fabricated composite under the MDG deliverable `6d52de87aa0d4fb6a90924720a5b0549`; re-fetch via `scripts/sap-help-search.mjs` and cite only what the search index returns. (2) Snippet-bounded claims: drop the glosses "is an active table in SAP S/4HANA 2025 FPS01" (duplicate-check page only lists configurable matching fields) and "so MARA remains the source of material master distribution" (MATMAS05 snippet says only "transfer material master general data from MARA tables"). (3) Correct repoRef: the MARA block is `data/table-enrichment.ts` lines 116–128 (129 opens MARC) — use the `#MARA` anchor form. (4) Hebrew claims and notes per `lib/evidence/types.ts`. (5) Honest status token: `changed` (MATNR CHAR 18→40; MARA is deliberately absent from `S4_STABLE` in `data/s4-impact.ts`), with `status.source` attached — not "available".

- `table:AFVC` — RESOLVED 2026-09-15 (batch 3): rewritten and written as `unchanged` / 2025.001 with `status.source` = the JVA extract-structure page. Every batch-2 problem was fixed: the two blueprints are now two separate repository evidence entries with their own repoRefs (`data/sapData.pm.ts#AFVC`, `data/sapData.pppi.ts#AFVC`), the JVA claim is bounded to 'Fields of Origin for the Extract Structure' and no longer presented as the table key, the CDS claim names the page's own technical name `I_ProductionOrderOperation_2` while the xref stays `cds:I_ProductionOrderOperation` (the only id in the universe), and the process-order use is marked repository-only. Original refusal kept below for the trail.
  - (2026-09-07 refusal) refuted at the batch-2 audit, not written. Problems to fix before a rewrite: (1) evidence[6] (blueprint) claims BOTH workbooks carry alt table 'AFVC (זהה)' and the SUM note 'אין המרת טבלה הרסנית'; verified in `data/sapData.pppi.ts` (PP-PI:AFVC, lines ~4786-4879) the record carries only s4Note 'מותאם (תואם).' + migrationStatus, no s4AltTable and no sumNote; only `data/sapData.pm.ts` (~line 2820) has 'AFVC (זהה)' + the SUM note; the same overstatement is repeated in notes, summary and conflicts. (2) evidence[6].repoRef `data/sapData.pm.ts#PM:AFVC` is not house style (`data/sapData.pm.ts#AFVC`, cf. `data/verification/functions.ts:597`) and the claim also leans on `data/sapData.pppi.ts`, which the repoRef does not name. (3) evidence[0] (JVA, loio d6328a53, 2025.001) overreaches the snippet: the snippet lists AFVC_MANDT / AUFPL 'Routing number of operations in the order' / APLZL 'General counter for order' as 'Fields of Origin' of an extract structure, never as the table's KEY fields; the key comes from `data/table-enrichment.ts#AFVC` (repository tier); the same text is duplicated in status.source.claim. (4) evidence[2] (I_ManufacturingOrderOperation, loio afa5a1dc, 2023.latest) adds 'הזמנות ייצור ותהליך' while the snippet says only 'manufacturing order operation data (tables AFVC, AFVV, AFVU)'; the draft's own notes concede process orders are named in no snippet. (5) status.he states the shared use for 'הזמנות ... ותהליך' at official level without marking the process-order part as repository-only (official snippets support maintenance orders via EAMS_AFVC, PS networks via JVA/PS archiving, manufacturing/production orders via the VDM pages). (6) Hebrew grammar: 'שני חוברות' must be 'שתי חוברות'. (7) notes present 'כתובותיהן הוחזרו חי ב-HTTP 200' as proof; a bogus loio on the same deliverable also returns HTTP/2 200, so the search-record re-run (which passed for all four loios) is the actual proof and should be what the notes cite.

## conflicts

- `table:MARC` — internal repository tension: `data/s4-impact.ts` lists MARC in `S4_STABLE` (explicitly stable) while its own MATDOC entry states aggregate stock values are no longer held in MARC/MARD. The official 2025.001 lifecycle page (CDS proxy views assigned to MARC/MARCH/MARD/MARDH) supports the written verdict `changed` (table retained, stock-access mechanism changed) rather than `unchanged`.
- `table:MBEW` — blueprint s4Note (`data/sapData.pppi.ts`, PP-PI:MBEW): 'Material Ledger חובה ב-S/4HANA; הערכה ב-ACDOCA/ACDOCC.' has no verdict token, while official 2025.001 pages show MBEW still read and written (migration source, CDS view source, conditional split-valuation writes). Resolution written: aggregate posting values live in ACDOCA; MBEW stays the valuation master record → `changed`.
- `table:MLGT` — blueprint `descriptionEn` reads "Material number" (`data/sapData.pppi.ts`), contradicting the official SAP Help name "Material Data for Each Storage Type"; blueprint s4Note 'EWM אסטרטגי.' left the verdict undecided. Resolved `unchanged` at table level; warehouse-solution decision (Stock Room Management vs EWM) is solution-level context.
- `table:MDMA` — three items: (1) blueprint `descriptionEn` "Material number" (apparent copy artifact); (2) `data/table-enrichment.ts` maps BERID→T439D as the MRP-area definition while `data/mrp-center.ts` presents MDLV as the MRP-area table — internal repository inconsistency needing resolution; (3) "MRP areas active by default in MRP Live" exists only in repository data (sapData.pppi.ts, mrp-center.ts) — the closest official snippet phrases it as a prerequisite, so the mandatory/default claim stays verification_required.
- `table:T438M` — blueprint labels T438M "MRP type" (סוג MRP) and joins MARC.DISMM = T438M.DISMM; the official VDM page describes T438M as MRP-group-dependent control parameters, and project Tier-2 sources (object-intel, academy lessons) place the MRP type catalog on T438A. Key structure/field list deliberately un-enriched (never-guess note, `data/table-enrichment.ts:1114-1118`); needs a live SE11 check or an official spec. Status written as `verification_required`.
- `table:CSLA` — blueprint record's funcs/progs (BAPI_MATERIAL_SAVEDATA, BAPI_MATERIAL_GET_DETAIL, RMMG2000, MM60) are material-master objects — an apparent copy artifact in the source workbook unrelated to CSLA; do not surface them as CSLA interfaces.

### batch 2 (2026-09-07) open conflicts, recorded in the written records' notes
- `table:MARA` — official snippet (loio 8aecfa1e, 2025.001) names MATNR as the short version of the material-number field and MATNR_EXTERNAL as the extended number; the MATNR CHAR 18 -> CHAR 40 DDIC statement exists only in `data/s4-impact.ts#MARA`. Whether MATNR itself becomes CHAR 40 or only MATNR_EXTERNAL needs SE11 or the Simplification Item text. Blueprint descriptionEn 'Material number' (copy artifact) vs official 'General Material Data'.
- `table:MAST` — judgement call: kept `unchanged` (both blueprints class 0, S4_STABLE, extension optional per the official page) while sibling `table:MARA` is `changed` for the same MATNR extension. PM blueprint 'BOM usage (4=maintenance)' vs `data/table-enrichment.ts` '7=PM' (official Bill of Material Usage snippet names usages without codes). PP-PI:MAST marks STLNR FK-only and STLAL PK, PM:MAST marks STLNR PK/FK and STLAL no key; needs SE11. `data/cds-enrichment.ts` names I_BillOfMaterialItemAssgmt over MAST; no official VDM topic found.
- `table:AFKO`, `table:AFPO` — blueprints open with 'מותאם' (mapper reads `changed`) while S4_STABLE and s4-objects mark stability; written `unchanged` because no official record names a structural change. AFPO: PP-PI descriptionEn 'Order number' (copy artifact); PM blueprint Fiori 'Find Maintenance Order (F2393)' has no official record and no apps.ts entry; PSAMG meaning ('Order item quantity' in the blueprint vs 'Scrap quantity of item' in loio 10cec353) needs SE11.
- `table:STKO`, `table:STPO` — PP-PI descriptionEn 'BOM category' for both (copy artifact) vs 'BOM header' / 'BOM Item'; PM blueprint marks POSNR as key while table-enrichment (SE11) gives MANDT/STLTY/STLNR/STLKN; IDNRK 18->40 note is repository-only; official Fiori name 'Maintain Bill of Material (F1813)' vs repository label 'Manage Bills of Material' / F1814, neither id in `data/fiori/apps.ts`. Archiving snippet spells 'STOP BOM items'.
- `table:CRHD`, `table:CRTX` — PP-PI descriptionEn 'Object type (A=work center)' / 'Object type' (field name copied as table name); PM reads CR_WORKCENTER_READ, PP-PI reads CR_WORK_CENTER_READ (both exist in the dataset, neither live-checked); PM facet cites KBA 3030584 (S-user, unverified, not recorded); F6175 (Manage Work Centers) is named in an official snippet but absent from `data/fiori/apps.ts`; IR01/IR02/IR03 are named officially only in a Defense Forces & Public Security page, the PM attribution rests on the PM blueprint.
- `table:JEST`, `table:JSTO` — I_ObjectStatus exists only in `data/cds-map.ts` (no official VDM record); table-enrichment writes STSMA -> TJ20/TJ30 while the blueprint joins TJ30 only and TJ20 is not in the dataset; AUFK<->JSTO direction contested between the two blueprints (ERD marks it contested); PP-PI descriptionEn 'Object number' for both (copy artifact); field types come from the PP-PI blueprint only; JSTO stays depth L1 (4 documented fields vs threshold 5).
- `table:PLKO`, `table:PLPO` — PP-PI descriptionEn 'Task list type (2=recipe)' / 'Task list type' (field label copied); PM blueprint describes PLKO as 'כותרת רשימת פעולות (Routing)' although the PM reading is a maintenance task list; PLNTY values E/T are repository-only; I_RoutingOperation / I_Routing have no official help.sap.com record (repository mapping only); Archiving Routings snippet names PI_PLAN in the sentence before the table list while its definition names PP_PLAN; Fiori F2660/F2661/W0021 seen officially but absent from `data/fiori/apps.ts`.
- `table:BUT000` — blueprints open with 'הוחלף' (mapper derived `replaced` with no successor) while BUT000 is the target table of the Business Partner Approach; written `simplified`. PM s4AltTable 'LFA1 (View תאימות)' vs official CVI page and table-enrichment ('KNA1/LFA1 עדיין קיימות ומסונכרנות'): no official source describes KNA1/LFA1 as compatibility views. Repository claim that XD01/XK01 direct creation is blocked is unsupported by any snippet. SAP Note 2265093 body not read (S-user).
- `table:EQUI`, `table:IFLOT` — three-way Fiori id conflict for the technical-objects app: F2079 (blueprint), F2730A (`data/fiori/apps.ts`), F1827 (`data/tx-intel.ts` IE01); none found on the official domains; official snippets name Find Technical Object (F2072) and Display Technical Object (W0028). KBA 2878950 quoted verbatim from an official snippet, not recorded in the kba field (no me.sap.com url / repoRef). I_Equipment / I_FunctionalLocation / API_FUNCTIONALLOCATION are tied to the tables by repository mapping only.

### batch 3 (2026-09-15) open conflicts, recorded in the written records' notes
- `table:MCHA` — TWO repository defects to fix in the dataset, both contradicted by official 2025.001 pages.
  (a) Classification class type for a plant-level batch: `data/workbenches-ext.ts` (lines ~210, 214, 238) and
  `data/tx-intel.ts` (MSC1, MSC1N, MSC2N) attribute class type **023** to MCH1/MCHA batches, while
  'Batch Classification' (MM-IM, 2025.001, loio 7e40bd53e3acb64ce10000000a174cb4) states '022 for batches at plant
  level' vs '023 for batches at material level/client level', and 'Classifying an Item' (LO-MD-BOM, 2025.001, loio
  7806c453f57eb44ce10000000a174cb4) prints '022 - Batch with plant' vs '023 - Batch without plant'. MCHA is the
  plant-level table, so 022 is the correct value; the repository wording needs correcting.
  (b) `data/tx-intel.ts` marks MSC1, MSC2 and MSC3 as 'זמינה ב-S/4HANA', the direct opposite of simplification item
  5.1.8 (2025 FPS1, pp. 104-105) and item 3.3 (2023 FPS3, pp. 127-128), which state they are not available and name
  MSC1N-MSC4N as the successors. All three tx ids resolve in the universe, so three live catalog pages currently
  contradict `table:MCHA`'s recommendedAction.
- `table:MKPF` — the compatibility-view name `NSDM_V_MKPF` in `data/s4-impact.ts#MKPF` appears in no official text
  read: the simplification item names `NSDM_DDL_MKPF` (DDL source of the redirect view) and `NSDM_MIG_MKPF` (reads
  the table without redirection). Needs SE11 or an official page before the repository name is trusted. Successor
  written as `obj:material-document` because `table:MATDOC` is not an id in the universe. Caution kept in the
  record: the MM_MATBEL Technical Data page still carries ECC-era sample figures ('1000 MKPF records, 1700 MSEG
  records'), a documentation leftover, not evidence that the table still stores data.
- `table:COSP`, `table:COSS` — two official tensions, both quoted verbatim and left unreconciled. (1) 2025 Help
  pages (PS validation, Maintenance Management, CO archiving) still call COSP/COSS 'tables' and instruct reading
  from them, while the Simplification List defines them as compatibility views over the universal journal.
  (2) Where the residue lives: the Universal Journal FAQ says statistical postings and target data remain in COEP,
  COSS, COSP; item 6.5.1 says value types other than 04 and 11 are stored in COEP, COSP_BAK, COSS_BAK. COSP is
  written `replaced` with successor `table:ACDOCA`; COSS is written `changed` (the FAQ leaves data in it) and the
  repository claim that COSS itself became a compatibility view is still unverified (an official 'Table COEP' page
  exists, loio 0705d65223141842e10000000a44176d, but no COSS equivalent was found).
- `table:AFIH`, `table:AFFL` — the batch-2 `AFKO`/`AFPO` pattern repeats: the blueprint opens with 'מותאם' (mapper
  reads `changed`) while no official source names a structural change. Both written `unchanged` with the blueprint
  caveat carried into recommendedAction. AFFL adds two of its own: `data/table-enrichment.ts#AFFL` gives the key as
  MANDT/AUFPL/APLZL while `data/sapData.pppi.ts#AFFL` marks APLFL as key and never lists APLZL (needs SE11); and
  AFFL is absent from `S4_STABLE` although AFKO, AFPO, AFVC and AUFK are in it.
- `table:EBAN` — the blueprint's S/4 cell ('מותאם (Business Partner לספקים)') and its CVI SUM note are supported by
  no official page naming EBAN in a customer/vendor-integration context; that aspect stays repository-only. The
  blueprint's Fiori cell is 'Manage Purchase Requisitions (אמת ID)' with no id, and no purchase-requisition app
  exists in `data/fiori/apps.ts`, so no fiori xref was written.
- `table:EQUZ`, `table:ILOA`, `table:MPLA`, `table:MPOS` — the technical-objects Fiori id conflict recorded for
  EQUI/IFLOT persists (blueprint F2079 vs `data/fiori/apps.ts` F2730A). New this batch: official help.sap.com pages
  do name `F5325` ('App Extensibility: Manage Maintenance Plans App (Key User)', 2025.001, loio
  0082dd0f5dd64b8b90cfa87ce1fd3c52) and `F5356` ('Situation Templates in Maintenance Management', loio
  922cb176a6ee4de58f2bbba0db7f4ad2), but neither id exists in `data/fiori/apps.ts`, so neither could be an xref.
  `table:MPLA` also carries an unresolved repository contradiction: the blueprint lists
  BAPI_MAINTENANCEPLAN_CREATE while `data/bapi-enrichment.pm.ts` states that module does not exist and points to
  MPLAN_CREATE / MPLAN_CHANGE — not decided against any official source, so the FM was left out of the xrefs.
  `table:MPOS`: no official snippet says C_MaintenanceItemDEX succeeds the deprecated I_MaintenanceItemData.
- `table:MARM`, `table:MAKT` — the `descriptionEn` 'Material number' copy artifact seen on MLGT/MDMA/MARA repeats
  on both rows (official names: 'Units of Measure for Material', 'Material Descriptions'); the fix belongs to the
  source workbook and `scripts/extract-xlsx.mjs`, not to a hand edit. MARM: the project id
  `cds:I_ProductUnitOfMeasure` is singular while the official VDM topic is `I_ProductUnitsOfMeasure` (already
  adjudicated in `data/verification/cds.ts`); no official page ties that view to MARM, and EAN11 inside MARM is
  repository-only (SAP documents EANs under MEAN). MAKT: MAKTG exists only in the blueprint and the enrichment
  record, and the DDIC lengths of MATNR/MAKTX in MAKT were not verified.
- `table:AFRU` — the PM blueprint has no AFRU row at all (only AFWI and report RIAFRU00), so plant-maintenance
  coverage rests entirely on official documentation; the DDIC field list (LMNGA, XMNGA, ISMNW, STOKZ) stays
  repository-level. The 2025 simplification list could not be reached at the 2023 document's own URL pattern
  (HTTP 403), so the negative check for AFRU was run against the 2023 document only.
- Depth ceiling, measured 2026-09-15: 12 of the 15 new records stay at L1 because
  `components/neo-shell/data/tables-detail.ts` counts only fields carrying BOTH `dt` and `len`, and the workbook
  rows for MKPF, COSP, COSS, AFIH, EBAN, EQUZ, ILOA, MPLA, MPOS, MCHA, MAKT and AFFL leave those cells empty (MCHA,
  MAKT and AFFL are typed but carry only 4 fields, below the threshold of 5). Only AFVC, AFRU and MARM cleared the
  L2 structural gate and therefore reached L5. Raising the other twelve needs SE11 or an official field list, not
  more evidence.

## batch 4 (2026-09-15) — 15 audited, 15 written, 0 refuted

Records written: `table:IMRG`, `table:IMPTT`, `table:OBJK`, `table:MHIS`, `table:MHIO`, `table:IFLOS`,
`table:MCH1`, `table:MEAN`, `table:MVKE`, `table:MLAN`, `table:MAPL`, `table:PLAS`, `table:PLFL`,
`table:PLMZ`, `table:PLZU`. Fourteen carry the token `unchanged`; `table:PLZU` is the one honest
`verification_required` — no official source names that table at all.

### refuted / needs new evidence (batch 4)

- (none refuted this batch)
- **Queued correction, another catalog — `tx:IP30` in `data/verification/transactions.ts`.** The `table:IMRG`
  verdict refutes two statements in that existing record: "לא נמצאה רשומת Simplification Item הנוקבת ב-IP30" and
  "שם התוכנית RISTRA20 ... לא נמצא במקור רשמי". Both are contradicted by the official Simplification List for
  2025 FPS01 (SIMPL_OP2025.pdf, document version 1.36), item 4.1.2 "S4TWL - Scheduling of Maintenance Plan",
  p. 76, application component PM-PRM, Business Impact note 0002270078, which reads "Transaction IP30 is doing
  scheduling for Maintenance Plans. Within this scheduling outdated technology (Batch Input) is used" and
  "Review your background Jobs which you most probably have scheduled periodically for transaction IP30 (Reports
  RISTRA20) and create new background jobs for IP30H (Report RISTRA20H)". Not fixed here as a side effect of the
  tables batch; it needs its own audited rewrite of the transactions record. `IP30H` and `RISTRA20H` are not in
  the id universe.

### batch 4 (2026-09-15) open conflicts, recorded in the written records' notes

- `table:MHIO` vs `tx:IP10` — NOT a repository defect: two official 2025 FPS01 pages disagree on the MHIO time
  field. The PLM page (loio `f3eec353b677b44ce10000000a174cb4`) names ADDAT, ADTIME and GSTRP; the Maintenance
  Planning page (loio `f1a8ce5314894208e10000000a174cb4`) marks `ADDAT(MHIO), ADUHR(MHIO)`. The existing
  `tx:IP10` record quotes ADUHR faithfully from its own source and must **not** be edited on the strength of this
  record. ADTIME vs ADUHR needs SE11.
- `table:MHIS` vs `table:MPLA` — framing discrepancy inside the same archiving page (loio
  `96a0ce5314894208e10000000a174cb4`): the MPLA record treats MHIO + ONR00 as a separate block, this record folds
  them into the PM_MPLAN list. Both agree MHIS belongs to the maintenance-plan archiving. Three query shapes
  failed to return a single contiguous fragment tying the `PM_MPLAN` archiving-class sentence to the MPLA / MMPT /
  MHIS list, and `http.svc/pagecontent` returns HTTP 500, so the class assignment stays an inference.
- `table:MCH1` — Fiori id conflict carried forward: `data/fiori/apps.ts` records F1576 as "Manage Batches" with
  relatedTables MCH1/MCHA, while two official LO-BM 2025.001 pages (loio `34b021588aee0a02e10000000a44147b`,
  `006de05317e74e5399d82fb88f21810d`) and `data/library/book7-full.json` say **F2462**. F2462 is not in the id
  universe, so MCH1 writes no fiori xref; the conflict also touches the existing `fiori:F1576` xref on
  `table:MCHA`. Belongs to the Fiori research queue.
- `table:OBJK`, `table:IMPTT`, `table:IFLOS` — the technical-objects Fiori id conflict (blueprint F2079 vs
  `data/fiori/apps.ts` F2730A) persists. New official ids seen and **not** writable as xrefs because they are
  absent from `data/fiori/apps.ts`: **F7617** "Manage Material Serial Numbers" (loio
  `03afe500cc8e48ceaae016a216143e52`, cited as evidence on OBJK), **W0030** "Display Measuring Point" (named in
  the PM - Measuring point migration page) and **W0031** "Process Measuring Point" (Fiori Apps Library search
  title).
- `table:IMPTT` — the official PM/CS archiving overview (loio `a0cfba538c95b54ce10000000a174cb4`) lists PM_EQUI,
  PM_IFLOT, PM_OBJLIST, PM_IMRG and PM_QMEL but no archiving object naming IMPTT; archiving of measuring-point
  master records is therefore unverified. The migration page's snippet cites SAP Note 2917243 for measuring-point
  and measurement-document corrections; the note body needs an S-user and is recorded as a snippet quotation only.
- `table:IMRG` — positive negative check added: the official Simplification List for 2025 FPS01 was read as full
  text and contains **zero** occurrences of `IMRG` and `IMPTT`, while other table names extract normally (MKPF 45,
  EQUI 10). Field-level gap unchanged: only MDOCM (as the SE16N selection field, not as a key), RECDV and CNTRR
  are officially named; READG and CDIFF appear only via their indicators READGI / CDIFFI, and POINT only in the
  repository layer.
- `table:MEAN`, `table:MVKE`, `table:MLAN` — the `descriptionEn` 'Material number' copy artifact repeats on all
  three PP-PI rows (official names: 'International Article Numbers (EANs) for Material', 'Sales Data for
  Material', tax classification for MLAN); the fix belongs to the source workbook and `scripts/extract-xlsx.mjs`.
  MEAN: `data/table-enrichment.ts` keys MANDT+MATNR+MEINH+LFNUM (EAN11 outside the key) while the blueprint marks
  MATNR+MEINH+EAN11 as the key — no official source decides it; `data/knowledge/object-intel.ts` names
  MEAN_SINGLE_READ and EAN_GET_INTERNAL, neither in the id universe nor in any official record. MVKE: the
  blueprint s4Note suffix 'לקוחות דרך Business Partner' belongs to the CVI customer-master conversion, not to a
  table with no customer key, and the blueprint's VK11 (pricing condition records) is tied to MVKE by nothing
  official, so it is not an xref. MLAN: the enrichment key adds TATYP, the blueprint lists only MATNR+ALAND —
  undecided.
- `table:MLAN` — the pre-existing base-table contradiction stands: `data/cds-map.ts` maps I_ProductPlantIntlTrd to
  MLAN while `data/cds-enrichment.ts` places it over MARC (one of the two real conflicts flagged in
  `audit/s4-enrichment/baseline-inventories.json`). No official page ties MLAN to that view — nor to
  I_ProductSalesTax, whose VDM record names no base table and is cited for name + Released status only.
- `table:PLZU` — internal repository contradiction to decide: `data/table-titles.json` and
  `data/knowledge/pppi-objects-ext.ts` (line 38) describe PLZU as task-list change management (ECN), while
  `data/knowledge/object-intel.ts` (line 103) describes it as PRT-to-operation assignment. The official archiving
  pages attribute PRT assignment to **PLFH**, so the PRT chapter in object-intel is unsupported. The blueprint's
  C298 is officially 'Deletion of Task List without Archiving' (loio `586237731eda49d0b9d2d6940feac5a0`), not
  change management. PLZU itself is named by no help.sap.com topic in three product scopes; it needs SE11/ADT.
- `table:MAPL`, `table:PLAS`, `table:PLFL`, `table:PLMZ` — three shared workbook defects. (1) `descriptionEn` is
  'Task list type' (the PLNTY field label) on PLAS, PLFL, PLMZ and 'Material number' on MAPL. (2) The PP-PI topic-3
  rows default their funcs column to BAPI_PROCORD_CREATE / BAPI_PROCORD_GET_DETAIL in 8 of 11 rows — process-order
  interfaces, not task-list interfaces; PLAS therefore xrefs CP_DI_OPERATION_READ and BAPI_ROUTING_GETDETAIL
  instead. (3) The blueprint SQL joins PLKO on PLNNR (MAPL: PLNTY+PLNNR) while `data/table-enrichment.ts` joins on
  PLNTY+PLNNR+PLNAL; the written records adopt the full group key and say so. MAPL is absent from the PM blueprint
  although the official PM/CS task-list archiving page names it; PLAS and PLFL are likewise PP-PI-only and are not
  in `S4_STABLE`.
- `table:PLMZ`, `table:PLAS` — `cds:I_RoutingOperationComponent` is a repository-only mapping (`data/cds-map.ts`,
  over PLMZ + PLAS) with no official page under that name; it stays an xref for navigation while the sibling CDS
  record remains `verification_required`. The officially-named views over these tables
  (I_MfgBOOOpBOMItemChangeState, I_MfgBillOfOperationsOperation, I_MfgBillOfOperationsSequence,
  I_MfgBOOMaterialAssignment, I_MfgBOOSubOperationChgSt) are all absent from `lib/route-manifest.generated.ts`.
- `table:PLMZ` — two open caveats: the cited VDM page carries 'One or more elements of this CDS view were
  deprecated with SAP S/4HANA Cloud' (element scope not read), and API_PRODUCTION_ROUTING is marked Deprecated in
  the public-cloud scope (2608.500, What's New 2402.500) while the On-Premise 2025.001 page carries no such mark.
- `table:IFLOS` — the negative simplification finding was run on the 2023 FPS03 white paper only (IFLOS 0, IFLOT 0,
  'alternative label' 0, labeling/labelling 20 in four unrelated S4TWL contexts); the 2025 list was not scanned as
  a full document for this record. Key structure is contested three ways (blueprint TPLNR PK/FK + TPLKZ FK;
  `data/table-enrichment.ts` MANDT+TPLKZ+label; `exports/sap-table-inventory.json` empty pk). The operational
  activation path for alternative labeling (transaction, conversion report, Customizing switch) was not found in
  core documentation.
- Depth ceiling, measured 2026-09-15 after the merge: 10 of the 15 new records stay at **L1** because
  `components/neo-shell/data/tables-detail.ts` counts only fields carrying BOTH `dt` and `len`, and the threshold
  for tables is 5. Measured counts: IMRG 0, IMPTT 0, OBJK 0, MHIS 0, MHIO 0, IFLOS 0 (the PM workbook rows leave
  `dt`/`len` empty on all six), MLAN 3, PLZU 3, MVKE 4, PLFL 4. Only MCH1 (7), PLAS (6), MEAN (5), MAPL (5) and
  PLMZ (5) cleared the L2 structural gate and therefore reached L5. Raising the other ten needs SE11 or an
  official field list, not more evidence.
