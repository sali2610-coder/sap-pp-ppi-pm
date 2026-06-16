# SAP Extraction Package (read-only) — for NEO enrichment/verification

Status: architecture only. No live connection. See `lib/import-engine.ts`.

## What to export (SE16N / RFC, read-only)
| Source | Tx | Selection | Fields | NEO target |
|---|---|---|---|---|
| TSTC | SE16N → TSTC | TCODE in scope (I%/MD%/CO%/MB%/QA%/SE%) | TCODE, PGMNA, DYPNO | tcode-directory (codes+program) |
| TSTCT | SE16N → TSTCT (SPRSL=E,L1) | extracted TCODEs | SPRSL, TCODE, TTEXT | T-Code titles |
| DD02L | SE16N → DD02L (TABCLASS=TRANSP, AS4LOCAL=A) | by package/module | TABNAME, TABCLASS | ALL_TABLES headers |
| DD03L | SE16N → DD03L | extracted tables | TABNAME, FIELDNAME, KEYFLAG, ROLLNAME, DATATYPE, LENG | SAPField[] |
| TADIR | SE16N → TADIR | DEVCLASS in PM/PP/QM | PGMID, OBJECT, OBJ_NAME, DEVCLASS | lineage + custom-code |
| SE93 | SE93 export / TSTCP | extracted TCODEs | TCODE, type, program, variant | lifecycle/lineage |
| DDLDEPENDENCY | SE16N | released I_*/C_* | DDLNAME, base tables | cds-map |
| AGR_1251 / USOBT_C | SUIM / SE16N | auth per tcode (SU24) | OBJECT, FIELD, defaults | authorization |

## Pipeline
1. Export → CSV/JSON. 2. `ImportParsers` normalize → NEO records. 3. Mapper merges into `data/*.ts`.
4. Validation cross-checks authored content → upgrades trust to Verified / flags mismatch.
5. `ImportReport`: matched / upgraded / mismatched / new objects.

## Activation
Set `ENABLED=true` in `lib/import-engine.ts` and inject an adapter (RFC, sc4sap MCP `GetTable`/`SearchObject`/`GetWhereUsed`, or file upload). Until then NEO stays 100% offline.
