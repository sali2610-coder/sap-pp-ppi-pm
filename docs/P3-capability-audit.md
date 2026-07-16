# P3 Capability Audit + Execution Plan (mandatory pre-implementation)

See conversation for the full rendered audit. Summary of decisions:

## Under-used, now-committed sources
- docs/*.pdf ×10 (Plant Maintenance Business User Guide, Configuring PM in S/4HANA, Production Planning, PP-DS, QM, WM, Sourcing, S&OP-IBP, Fiori Apps Quick Reference) — mine via sap-document-intelligence.
- knowledge/books/sap-pm (9 chapters + Hebrew) + knowledge/books/pp — verified narrative source.
- 11 NEO reviewer skills — MUST run on every visual/content PR (were not, on PRs #46-53).
- Figma MCP (mockups), Mobbin MCP (premium references), Context7 (framer/Next APIs).
- sc4sap SAP ADT MCP — NOT connected → only true "needs live system / S-user" gate.

## Execution roles
sap-pm-consultant (PM facts) · sap-pp-consultant (PP/PP-PI) · sap-function-finder (FM/BAPI/BAdI) ·
sap-architect/sap-abap-cds (CDS/arch, when ADT up) · ui-ux-pro-max + high-end-visual-design +
redesign-existing-projects + neo-sap-visual-designer (design) · Figma/Mobbin (references) ·
Context7 (motion APIs) · 11 NEO reviewer skills incl. neo-enterprise-ux-auditor (mandatory merge gate).

## Source order before "cannot verify"
SAP Help → Community → public docs (sapdatasheet) → 10 ingested PDFs → ingested books/glossaries →
xlsx blueprints → existing verified project data → sap skills/agents → only then "Requires S-user/SE18".
Never stop for missing SAP Notes.

## Verifiable now vs live-system-only
- Now: master-data owner/when/mistakes/CBC, config SPRO (Configuring PM PDF), Fiori (Fiori PDF), BAdI/FM names.
- Live SAP only: exact per-release BAdI availability; adding dataset table rows/field-types (build-constrained by generated xlsx).

## Library freeze
BookCover/BookPeek/reader/bookshelf/animations byte-for-byte untouched unless explicitly approved.
