# Oracle Playbook — sources + routing (orchestration detail)

## Source → how to reach it (existing capabilities only)

| Source | Route |
|---|---|
| SAP Notes / OSS | `WebSearch` (site launchpad.support.sap.com / me.sap.com) + `WebFetch`; deep dives via `deep-research` |
| KBAs | `WebSearch` "SAP KBA <symptom>" + `WebFetch` |
| SAP Help Portal | `WebFetch` help.sap.com pages |
| SAP Community / blogs | `WebSearch` site:community.sap.com + `WebFetch` |
| Release Notes / What's New | `WebSearch` + `WebFetch`; S/4 impact → Skill `sap-forecaster` |
| Simplification Items / Compatibility Matrix | Skill `sap-forecaster` + `WebFetch` |
| Migration Guides | Skill `sap-forecaster` + `sap-abap-ecc-s4-expert` |
| Clean Core / ABAP Cloud docs | Skill `sap-abap-ecc-s4-expert` + `WebFetch` |
| SAP Learning content | `WebSearch` + `WebFetch` |
| Object → where documented | Skill `sap-function-finder` |
| API/interface allowed? | Skill `sap-api-policy` |

## When to use deep-research vs plain WebSearch

- **deep-research** (Skill): question spans multiple Notes/sources, needs cross-verification, or feeds a decision
  with risk. It fans out, fetches, adversarially verifies, and returns a cited report. Pass a sharp question.
- **WebSearch + WebFetch** (built-in): a single known lookup (one Note number, one Help page, one blog).

## Applicability checklist (fill for every answer)

- ECC 6 (which NW release)? · S/4HANA On-Prem (which release, e.g. 2023=7.58)? · ABAP Cloud?
- Kernel patch required? · Support Package required? · Upgrade required?
- Prerequisite / superseded Notes? · Manual pre/post steps?

## Hand-offs

- Live system shows the symptom now → **Sherlock**.
- "Have we solved this before / do we have this Note saved?" → **Memory** first, then Oracle for anything new.
