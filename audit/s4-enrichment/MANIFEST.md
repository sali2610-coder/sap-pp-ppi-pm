# S/4HANA knowledge deepening · execution manifest

Branch: `design/neo-correction-pass` (preview only). Started 2026-09-01.

## Installed capabilities selected
| Capability | Exact name | Role |
|---|---|---|
| Skill | `neo-sap-content-quality-reviewer` (project-local) | fabrication gate, ECC-vs-S/4 labelling, terminology, "בקרוב / לא קיים תיעוד מאומת" honesty rule on every enriched record |
| Workflow orchestration | `Workflow` tool (ultracode) | deterministic fan-out per catalog family: inventory → research queue → source lookup → enrichment → adversarial verification → schema tests |
| Agents | `general-purpose` (research/enrichment/QA writers), `Explore` (repository discovery), `Plan` (schema design) | per-family work; every factual record passes an independent refuter before it is written |
| Web research | `WebSearch` (domain-restricted to help.sap.com, api.sap.com, fioriappslibrary.hana.ondemand.com, fal.cloud.sap, me.sap.com, support.sap.com) | official URL discovery; titles/snippets of official pages |
| Web research | `WebFetch` on `https://help.sap.com/http.svc/elasticsearch?...&format=json` | Tier-1 citation channel: returns title, official URL, `deliverableTitle`, `product`, `version` (e.g. "2025 FPS01 (Feb 2026)"), `versionId`, `loio`, `snippet`, date — stored verbatim on every `sap_official_verified` claim |
| Web research | `WebFetch` on `https://api.sap.com/odata/1.0/catalog.svc/Files('…')/$value` + `Read` (PDF) | Business Accelerator Hub setup / configuration guides (PDF) readable page-by-page |
| Repository tooling | tsc, eslint, `node --test`, `next build` ×2, check:routes, crawl:deadlinks, check:sitemap, gen:tx-index, gen:routes, playwright-core + system Chrome sweep | gates per family; new schema/duplicate/dangling-link/source-URL tests added under `test/` |
| Licensed Tier-2 corpus | `data/books/**` (11 SAP PRESS titles already in the repo: PM configuration, PM business user guide, Production Planning, PP/DS, QM, EWM, Sourcing, Fiori apps quick reference, S&OP/IBP, S/4 prerequisites) | process/purpose/role context, Fiori app descriptions; never the sole evidence for status, deprecation, replacement or release claims |
| Validated Tier-2 data | `data/sapData.*` (generated from the two migration workbooks), `data/tx-intel.ts`, `data/*-enrichment.*`, audit evidence under `audit/**` | `repository_verified` baseline; never relabelled as official |

## Unavailable relevant tools and fallbacks
| Tool | Status | Fallback |
|---|---|---|
| `sc4sap` SAP MCP (live ABAP system: GetTable / GetFunctionModule / GetWhereUsed …) | failed to connect at session start (`MCP error -32000: Connection closed`) — not used, not claimed | official SAP Help search JSON + Business Accelerator Hub documents + licensed books; interface parameters that only a live system or the Hub SPA could confirm stay `verification_required` |
| SAP Help Portal topic pages (`/docs/...html`) | JavaScript app shell; body text not retrievable by `WebFetch` | the Help search service returns the topic's title, deliverable, product, release and snippet — a claim is cited to that record; body-level detail is paraphrased only when the snippet or a Tier-2 source states it |
| SAP Fiori Apps Reference Library (new: `fal.cloud.sap`; classic `fioriappslibrary.hana.ondemand.com` incl. its xsodata services) | app shells / HTTP 400–404 for unauthenticated fetches | domain-restricted `WebSearch` returns the official library URL with the app ID and app name in the title (e.g. F5241 Manage Maintenance Orders, F2175 Find Maintenance Order, F4604, F5325, W0017, W0033); app ID + name + URL are citable; role/catalog/OData details come from the Fiori quick-reference book (Tier 2) or stay `verification_required` |
| SAP Business Accelerator Hub API pages (`api.sap.com/api/...`) and its `catalog.svc/APIContent` OData | app shell / empty without an API key | domain-restricted `WebSearch` returns the official API URL and title (`API_MAINTENANCEORDER`, `OP_API_MAINTENANCEORDER_0001`, `OP_API_MAINTORDERCONFIRMATION_0001`) — name, protocol family and existence are citable; entity/parameter lists stay `verification_required` unless a downloadable Hub document states them |
| SAP Signavio Process Navigator (`me.sap.com/processnavigator`) | requires S-user login | scope-item IDs and process names are taken only when they appear in an official public page (SAP Help "SAP Best Practices" content, Hub documents); otherwise the process record carries `scopeItem: null` + `verification_required` |
| SAP Notes / KBAs (`me.sap.com/notes`) | requires S-user login | note numbers are recorded only when they already exist in validated repository data or appear verbatim in an official public page; never typed from memory |
| Simplification Item Catalog (`launchpad.support.sap.com/#/sic`) | requires S-user login | items are cited by NAME when an official public Help page names them; otherwise `verification_required` |

## Target product and edition
No explicit target release is configured in the repository (books reference S/4HANA 2020–2023). This phase uses **SAP S/4HANA On-Premise / Private Edition** as the primary enterprise context; the release recorded on each claim is the one returned by the SAP Help search record (`versionId`, currently 2025.001 for most Maintenance Management / Production topics), or the release the Tier-2 source names. Public Cloud content, when captured, is labelled `edition: public-cloud` separately.

## Source hierarchy applied
Tier 1: help.sap.com (search JSON + official URLs), api.sap.com (URLs + downloadable documents), fioriappslibrary/fal (URLs), SAP Best Practices content on help.sap.com.
Tier 2: validated repository data; licensed SAP PRESS books in the repo.
Tier 3: identified SAP Community experts — discovery only; never sole evidence for status/replacement/release/API-release claims.
