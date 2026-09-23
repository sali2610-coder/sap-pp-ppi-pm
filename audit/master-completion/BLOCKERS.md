# External blockers

Only items that cannot be closed from this machine and public official sources. Each names
what was already checked and the single action that closes it.

| id | what was checked | why it cannot close here | the one action that closes it |
|---|---|---|---|
| `PPCC1` | SAP Help search 2026-09-21 (only `/SAPAPO/PPC1` and `PPC*`); blueprint and function catalogue read | needs a live system | SE93 and SE37 in the target system |
| `BAPI_ALM_NOTIF_TASK_ADD` | Help, ERP and On-Premise scopes; OData API_MAINTNOTIFICATION | name in no official record | SE37 / BAPI Explorer / SWO1 |
| `BAPI_ALM_NOTIF_LIST_FILTER` | Help, ERP and On-Premise; domain-limited web search | name in no official record | SE37 / BAPI Explorer |
| `BAPI_CENTRAL_CHARACT_CREATE` | Help (On-Premise, ERP, Cloud); full scan of SIMPL_OP2025 | name in no official record; documented channels are BAPI_CHARACT_CREATE and API_CLFN_CHARACTERISTIC | SE37 |
| `BAPI_EQMT_INSTALL` | 21 Help queries; ECC 6.0 EHP3 and EHP5 release notes | name in no official record | SE37 |
| `API_PRODUCTION_ORDER_2` | WebFetch of the API Hub overview and resource pages | the Hub answers with a JavaScript shell | open the Hub page in an interactive browser session |
| `sc4sap` MCP | attempted every session | `MCP error -32000: Connection closed` | fix the MCP connection; nothing here claims a live check |
| Vercel Preview (SSO_BLOCKED) | re-checked 2026-09-23: GitHub reports Preview deployments for every pushed commit, Vercel status success; the latest, `https://sap-pp-ppi-ilh2xeivy-sali2610-coders-projects.vercel.app` (b43899c3), answers `302 -> vercel.com/sso-api`. The connected Vercel MCP token sees only the project `cbc-interactive-case-study`, not `sap-pp-ppi-pm`. Minting a bypass link (`get_access_to_vercel_url`) would create a credential, which the mandate forbids | SSO | sign in (or grant the MCP token this project), then run the visual matrix on the real deployment; until then only the local export, byte-identical in build input, is verified |
| AI live quality (S7-AI-6) | 27 controlled states pass | no endpoint key in this environment, and live calls may cost | provide a key and approve the spend, then run `audit/ux-2026-09/AI-LIVE-TEST.md` |
| Physical device / Safari | all phone runs use Chrome with an iPhone user agent | no device | one pass on a real iPhone |
| ACC-6 | `/neo/*` and `/library/**` use two shells | `/library/**` is a frozen surface in CLAUDE.md | a product decision on retiring the legacy shell |
| Usage limit (PLATFORM INTERRUPTION) | 2026-09-23: the research pipeline stopped with "You've hit your weekly limit · resets Sep 28 at 12pm (Asia/Jerusalem)"; chain `wf_f565a3e6-6c1` wrote 7 of 11 batches (42 records) and lost 4; the 22 lost ids were then written in the main session (`6eb18a64`) with saved raw search results and mechanical quote checks, but without the pipeline's adversarial auditor; the transactions chain (`tx-chain-args.json`, 84 core codes, then 280 others in `tx-queue.json`) has not started | weekly usage limit | after the reset (2026-09-28 12:00 Asia/Jerusalem): run an auditor pass over the 22 (ids in `chain-args.remaining.json`), then the transactions chain, as PROGRESS.md describes |
