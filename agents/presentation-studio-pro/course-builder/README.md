# course-builder-pro

One source (PDF · book · PowerPoint · Markdown) → a full course package (7 outputs).

## Run
```bash
python3 course_builder.py <source> <out_dir> --title "..."
```

## 7 outputs (linked by index.md)
Course · Presentation outline · Quiz (md+GIFT) · Flashcards (Anki TSV+md) · Exercises · Study Guide ·
Knowledge Base (catalog · search · glossary · cross-ref · graph · modules).

## Composes (reuses validated engines)
- ingest / flashcards / quiz → learning-content-factory scripts
- knowledge base → knowledge-library-builder `build_library.py`
- presentation → hand outline to presentation-studio-pro

## Validated on SAP book content
4-chapter SAP O2C book → 4 modules · 8-question quiz (keys correct) · Anki flashcards (VA01→VBAK) ·
16-term knowledge-base glossary · working offline search. 7/7 outputs, source-faithful.
