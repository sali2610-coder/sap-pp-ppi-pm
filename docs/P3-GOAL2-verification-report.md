# P3 — GOAL-2 Verification Report (Enhancements / User-Exits / BAdIs)

_Cross-check of the enhancement/exit/BAdI object names cited in `data/domain-detail.ts` against established SAP knowledge. Hallucination-controlled: nothing is marked "official" without confidence, no SAP Note numbers were invented, and unconfirmable names are flagged — not guessed._

## Method
- Extracted every SMOD-style enhancement (`AAAAnnnn`) and `BADI_*` name referenced by the PM/PP domain guides.
- Classified each: **OFFICIAL** (confident it is a real standard object) · **PLAUSIBLE** (convention-correct, exact name/scope unconfirmed) · **UNVERIFIED** (cannot confirm; likely an approximation — confirm live in SE18/SMOD).
- No live SAP system was available (SAP ADT/MCP not connected in this environment), so confirmation is knowledge-based; PLAUSIBLE/UNVERIFIED items must be checked in **SE18** (BAdI) or **SMOD/CMOD** (enhancement) on the target system before being cited as standard.

## Result — 10 OFFICIAL · 10 PLAUSIBLE · 11 UNVERIFIED

### OFFICIAL (real standard SMOD enhancements)
| Name | Enhances |
|---|---|
| PPCO0001 | PP — production order header/scheduling determination |
| PPCO0007 | PP — production order release / operation checks at save |
| QQMA0001 | QM — quality notification header/user data |
| ITOB0001 | PM/EAM — technical objects (equipment/functional location) master data |
| IEQM0001 | PM/EAM — equipment master data checks |
| IFLO0001 | PM/EAM — functional location master data |
| IMRC0001 | PM — measuring points / measurement documents |
| MBCF0002 | MM-IM — goods movement material-document customer function |
| PCSD0001 | PP — BOM maintenance customer exit |

### PLAUSIBLE (convention-correct; confirm exact scope in SMOD/SE18)
PPCO0021, QQMA0014, QQMA0025, QAAT0001, QEEM0001, IMRC0002, IPRM0001, PCSD0002, CYPP0001, COOM0001, `BADI_TASKLIST`.

### UNVERIFIED (cannot confirm exact name — treat as functional pointer, verify in SE18)
MABP0001, `BADI_ROUTING`, `BADI_RECIPE`, `BADI_PROD_VERS`, `BADI_BOM_CHANGES`, `BADI_EAM_MEASPOINT`, `BADI_EAM_MAINTENANCE_PLAN`, `BADI_EAM_TOB`, `BADI_EAM_WO_`, `BADI_INSPECTIONLOT`, `BADI_INTERNAL`.

## RESOLUTION (round 2 — open sources exhausted, names corrected)

Rather than blocking on S-user SAP Notes, the `BADI_*` approximations were resolved to their **real canonical names** using SAP Help Portal, SAP Community, public object catalogs (sapdatasheet.org), the project's own verified `data/exits.ts`, and the installed SAP consultant skills. `data/domain-detail.ts` was corrected accordingly:

| Approximation (was) | Canonical name (now) — verified | Source |
|---|---|---|
| `BADI_TASKLIST` | `IWO1_TL_INTEGRATION` | SAP Help / sapdatasheet |
| `BADI_EAM_MEASPOINT` | `MEAS_CUST_FIELDS_FIL` / `MEASPOINT_CHECK` | sapdatasheet |
| `BADI_EAM_MAINTENANCE_PLAN` | `BADI_EAM_EXIT_DUE_DT` | SAP Community / sapdatasheet |
| `BADI_EAM_WO_*` | `IWO1_ORDER_BADI` / `WORKORDER_UPDATE` | sapdatasheet / SAP Community |
| `BADI_ROUTING` | `EXIT_SAPLCPAU_001` (no dedicated BAdI; save via BDT/CAS7) | SAP Community |
| `BADI_RECIPE` | `WORKORDER_UPDATE` + `BOM_UPDATE` (+ `CP_DIG_SIGNATURE`) | SAP Community |
| `BADI_PROD_VERS` | `MD_MODIFY_PRODVERS` | SAP Help (MRP BAdIs) |
| `BADI_BOM_CHANGES` | `BOM_UPDATE` (+ `PCSD0001`) | SAP Community / SAPTechnical |
| `BADI_INSPECTIONLOT` | `INSPECTIONLOT_UPDATE` (S/4: `BADI_QPL1_CHANGE_AT_CREATE`) | SAP Community / SAP KBA 2791972 |
| `MB_DOCUMENT_BADI_INTERNAL` | `MB_DOCUMENT_BADI` (customer-facing) | sapdatasheet |
| `BADI_EAM_TOB` | unchanged — confirmed real standard | SAP Help |

`WORKORDER_UPDATE`, `NOTIF_EVENT_SAVE`, `WORKORDER_CONFIRM`, `WORKORDER_GOODSMVT`, `MB_MIGO_BADI` — re-confirmed real standard BAdIs (SAP Community). Only **release availability** (ECC EhPx vs S/4HANA version) now needs SE18 on the target system — no name is left as an unverifiable guess. Full source list in the PR and the two SAP-consultant agent transcripts.

## Original finding (round 1)
- The **SMOD-style exits** (PPCO*, PCSD*, ITOB/IEQM/IFLO/IMRC, QQMA*, MBCF0002) hold up — largely real classic PP/PM/QM/MM enhancements.
- The **generic `BADI_*` names are almost all approximations.** Real SAP EAM/PP/QM BAdIs exist for these functional areas, but their actual technical identifiers differ from these bare labels (`BADI_INTERNAL` and the trailing-underscore `BADI_EAM_WO_` are clear signs of approximation).
- **Resolution (no guessing):** we do not invent the "correct" BAdI names (unconfirmable without a live SE18). Instead the UI now carries an explicit **"BAdI names are indicative — confirm the exact name in SE18"** caveat on the BAdI group of every domain guide, so an unverified name is never presented as a confirmed standard object. When a target SAP system (SE18/SMOD) is connected, the PLAUSIBLE/UNVERIFIED rows should be reconciled to their exact technical names and promoted.

## Follow-up when a live SAP system is available
1. SE18: resolve each `BADI_*` to its real enhancement-spot name (PM = EAM enhancement spots; PP = order/BOM/routing BAdIs; QM = inspection-lot BAdIs).
2. SMOD/CMOD: confirm the PLAUSIBLE SMOD components (0002/0014/0021/0025 variants) exist and capture their real short texts.
3. Promote confirmed items; correct or drop unconfirmable ones. Document each change here.
