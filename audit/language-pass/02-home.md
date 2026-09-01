# Language pass · 02 Home (`/neo/`)

Files: `app/neo/page.tsx`, `components/neo-shell/home/home-data.ts`, `components/neo-shell/home/home-zones.tsx`.
Baseline: the Home content pass (`c3ea4a44`) already rewrote every visible string; this pass aligns it with the glossary.

| route/surface | file:line | current text | issue category | final text | evidence | action | risk |
|---|---|---|---|---|---|---|---|
| Home · work-path cards share line | page.tsx:73 | מתוך 105 הטבלאות במילון | inconsistent naming ("מילון") | מתוך 105 טבלאות SAP מתועדות | GLOSSARY §B | rewrite | low |
| Home · H1 line 2 | page.tsx:149 | ל־SAP S/4HANA (maqaf) | inconsistent Hebrew (prefix form) | ל-SAP S/4HANA | GLOSSARY §C | rewrite | low |
| Home · hero lede | page.tsx:152-154 | ו־PP-PI … מ־ECC ל־S/4HANA | inconsistent Hebrew (prefix form) | ו-PP-PI … מ-ECC ל-S/4HANA | GLOSSARY §C | rewrite | low |
| Home · S/4 section H2 | page.tsx:252 | 105 טבלאות במילון, | inconsistent naming ("מילון") | 105 טבלאות SAP מתועדות, | GLOSSARY §B | rewrite | low |
| Home · S/4 lede | page.tsx:256 | הערת ה־S/4HANA | prefix form | הערת ה-S/4HANA | GLOSSARY §C | rewrite | low |
| Home · S/4 out-text + CTA | page.tsx:282, 287 | קוקפיט המיגרציה | inconsistent naming | קוקפיט המעבר | GLOSSARY §A (Migration Cockpit) | rewrite | low |
| Home · module cards / chains | home-data.ts:277, 340 | אחזקת מפעל / ייצור תהליכי | inaccurate SAP terminology | תחזוקת מפעל / תעשיות תהליכיות | GLOSSARY §A (PM, PP-PI) | rewrite | low |
| Home · zone band labels (component kept for reuse) | home-zones.tsx:35-37 | אחזקת מפעל / ייצור תהליכי | inaccurate SAP terminology | תחזוקת מפעל / תעשיות תהליכיות | GLOSSARY §A | rewrite | low |
| Everything else on Home (eyebrow, stats labels, path titles, S/4 verdict labels, close section, credit) | page.tsx | — | — | kept as written in the content pass | reviewed against glossary | keep | — |

Totals: reviewed 41 · kept 31 · rewritten 10 · removed 0 · consolidated 0.
"מילון" replacements: 2 (both → "טבלאות SAP מתועדות": the surface is the merged table catalog).
AI signals removed: 0 (none remained after the content pass).
Unresolved: none.
