# Memory Playbook — where to look + how (orchestration detail)

## Knowledge stores (existing) and how to read them

| Store | How |
|---|---|
| Session memory | Read `SAP-HQ/knowledge/MEMORY.md` (index) then linked `memory/*.md`. The sap project memory is at `SAP-HQ/knowledge/` (project-local; global machine memory is not in the repo) (11 notes: project-neo-cockpit, sap-incident-commander, sap-skills-marketplace, etc.) |
| Project docs | `Glob`/`Grep` under `~/Desktop/My-Projects/*/docs/` (e.g. sap `docs/audits/`, blueprints) |
| Downloads / repos | `Grep`/`Glob` under `~/Downloads`, cloned repos, `/tmp/skill-review/*` |
| Saved PDFs / Word / Excel | Skills `pdf`, `docx`, `xlsx` |
| SAP documents | Skill `sap-document-intelligence` |
| Israel/CBC SAP context | Skill `sap-israel-knowledge` |
| Screenshots / images | `Read` |
| Git history of a project | `Bash` git log/grep (read-only) |

## Match dimensions (rank candidates by these)

- same **message ID / dump / status** (e.g. RU-505, IDoc 51, SYSFAIL)
- same **module** (PP/PP-PI/PM/MM/…) and **tcode/table/FM**
- same **interface/component** (IDoc type, RFC dest, CPI iflow)
- same **project/customer** context
- same **root-cause pattern** even if surface differs

## Search order (cheap → deep)

1. `Grep` the memory `*.md` for the key token (message id, tcode, object).
2. `Grep`/`Glob` project `docs/` and Downloads for the same token.
3. If a hit references a PDF/Word/Excel, open it with the matching skill.
4. Summarize matches; only then read full files for the top candidates.

## Capture (only on approval)

New lesson worth keeping → Skill `reflexion:memorize`, or append to the project `memory/MEMORY.md` index. Never write
without explicit user OK. Keep entries short and link-style, matching the existing MEMORY.md format.

## Hand-offs

- No local match + needs external facts → **Oracle**.
- Live system reproducing the fault now → **Sherlock** (which will call Memory first anyway).
