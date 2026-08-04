# SAP-HQ — runtime workspace (project-local)

This folder is HQ's **Operational Intelligence** workspace. It is portable: the engine
(`.claude/skills/hq/scripts/hq-ops.sh`) resolves this folder from the repo root, so it works after a clean clone
on any machine, cloud, or phone.

## Structure
```
SAP-HQ/
├── playbooks/         reusable playbooks (fault pattern → ask-for → root cause → fix → prevention)  [committed]
├── runbooks/          published runbooks per resolved incident                                       [committed]
├── knowledge/         curated SAP knowledge notes used by Memory/Oracle                              [committed]
├── lessons-learned/   accumulated lessons                                                            [committed]
├── templates/         templates for runbooks/playbooks                                               [committed]
├── incidents/         per-incident workspaces (INC-NNNNNN)   ← runtime, git-ignored
├── archive/           incident index                          ← runtime, git-ignored
└── knowledge-graph/   node/edge links                         ← runtime, git-ignored
```
`incidents/`, `archive/`, `knowledge-graph/` are runtime state (may contain pasted evidence) and are **git-ignored**.
Only the curated, safe folders are committed.

## Engine (portable, read-only-safe)
`bash .claude/skills/hq/scripts/hq-ops.sh <cmd>` — `init | new | event | graph | status | search | list | show`.
Writes only under this `SAP-HQ/` folder. Uses `$CLAUDE_PROJECT_DIR` when set, else derives the repo root from the
script location. No home paths, no secrets.

## Entry point
Everything starts at **`/hq`** (see `.claude/commands/hq.md`). Do not call the sub-skills directly for normal use.
