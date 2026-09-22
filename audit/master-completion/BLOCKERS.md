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
| Vercel Preview | URL answers 200 and redirects to `vercel.com/login` | SSO | sign in, then run the visual matrix on the real deployment |
| AI live quality (S7-AI-6) | 27 controlled states pass | no endpoint key in this environment, and live calls may cost | provide a key and approve the spend, then run `audit/ux-2026-09/AI-LIVE-TEST.md` |
| Physical device / Safari | all phone runs use Chrome with an iPhone user agent | no device | one pass on a real iPhone |
| ACC-6 | `/neo/*` and `/library/**` use two shells | `/library/**` is a frozen surface in CLAUDE.md | a product decision on retiring the legacy shell |
