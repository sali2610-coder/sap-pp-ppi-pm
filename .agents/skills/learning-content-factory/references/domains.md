# Domain Packs

The source's domain changes what a "concept" is, which tokens must be preserved verbatim, and what a
runbook/exercise looks like. Read the one that matches.

## SAP books (ECC / S/4HANA, functional or technical)
- **Preserve verbatim:** transaction codes (VA01, ME21N, COR1), tables (VBAK, EKKO, AUFK), field names,
  IMG/SPRO paths, BAPIs/FMs/IDoc types (ORDERS05), OSS Note numbers, program/report names.
- **Concept ledger** should capture: business object → tcode(s) → key table(s) → typical process step.
- **Runbooks** = click-paths: `SPRO → … → activity`, or a process chain `VA01 → VL01N → VF01`, each step
  naming the screen and the table/document it writes. Include auth/role prerequisites.
- **Exercises** = "create X in the sandbox" with the exact tcode and a checkable result (doc number,
  table entry). Beginner explanations frame the *business* meaning; expert ones add config + tables.
- Hebrew notes: see [hebrew.md](hebrew.md) — codes stay Latin.

## University courses (lecture notes, slide decks, textbooks)
- **Align to learning objectives / syllabus** if present; if the source lists "by the end you will…",
  map every output to those objectives.
- **Concept ledger** captures: term → definition → which lecture/chapter → exam-relevance.
- **Knowledge tests** mirror the course's assessment style (essay prompts vs MCQ); tag Bloom levels so
  the set spans recall→apply. Cite the reading/lecture for each item.
- **Exercises** = problem sets with worked solutions. **Presentation** = revision deck per topic.
- Summaries are per lecture/chapter; glossary is the course's key terms.

## Technical manuals (software, hardware, APIs, SOPs)
- **Preserve verbatim:** commands, flags, config keys, file paths, environment variables, error codes,
  version strings, API endpoints. A mistyped flag makes a runbook dangerous.
- **Runbooks** = copy-paste-safe procedures: prerequisites → numbered commands (with expected output) →
  verify step → rollback. Mark destructive steps. Never paraphrase a command — quote it.
- **Exercises** = "do this on a test box" tasks with an expected observable result.
- Beginner vs expert: beginner explains *what/why* and the happy path; expert covers flags, failure
  modes, performance, and edge cases.

## When the source mixes domains
Pick the dominant one for structure, but apply the **preserve-verbatim** rule from every domain that
appears — any literal token (code, command, path) is kept exactly, regardless of domain.
