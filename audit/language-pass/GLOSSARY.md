# Project NEO · Language Pass · Glossary and Editing Rules

Status: authoritative for the full-site copy pass on branch `design/neo-correction-pass`.
Scope: visible user-facing copy only. Never SAP data, identifiers, logic, layout.

## A. Terminology (approved forms)

| Concept | Hebrew (approved) | English / SAP form | Avoid | Notes |
|---|---|---|---|---|
| SAP S/4HANA | SAP S/4HANA · S/4HANA | SAP S/4HANA | S4, S/4 HANA, S4HANA, סאפ | Identifier. Never translated. Primary context of the platform. |
| ECC | SAP ECC · ECC | SAP ECC 6.0 | "המערכת הישנה", "העולם הישן" | Legacy / source-system / comparison context only. |
| Plant Maintenance | תחזוקת מפעל (PM) | PM · Plant Maintenance | אחזקה, אחזקת מפעל | Rail label: `PM · תחזוקת מפעל`. |
| Production Planning | תכנון ייצור (PP) | PP · Production Planning | ייצור (alone, for PP) | |
| PP-PI | תעשיות תהליכיות (PP-PI) | PP-PI · Production Planning for Process Industries | ייצור תהליכי, PPPI, PP PI | Rail label: `PP-PI · תעשיות תהליכיות`. Always hyphenated. |
| Business Object | אובייקט עסקי | Business Object | ישות, אובייקט (alone when ambiguous) | |
| Technical Object | אובייקט טכני | Technical Object | | PM: equipment + functional locations. |
| Equipment | ציוד | Equipment (EQUI) | מכשיר, ציודים | |
| Functional Location | מיקום פונקציונלי | Functional Location (IFLOT) | אתר, מיקום | |
| Maintenance Notification | הודעת תחזוקה | Maintenance Notification (QMEL) | התראה, הודעת אחזקה | |
| Maintenance Order | הזמנת תחזוקה | Maintenance Order (AUFK/AFIH) | פקודת עבודה, הזמנת אחזקה | |
| Production Order | הזמנת ייצור | Production Order | פקודת ייצור | PP. Never conflate with Process Order. |
| Process Order | הזמנת תהליך | Process Order | הזמנת ייצור (for PP-PI) | PP-PI. |
| Master Recipe | מתכון אב | Master Recipe (PLKO, recipe) | מתכון, ניתוב (for PP-PI) | PP-PI. Never "Routing". |
| Routing | ניתוב | Routing | מתכון | PP. |
| Resource | משאב | Resource (PP-PI) | מרכז עבודה (for PP-PI) | PP-PI counterpart of Work Center. |
| Work Center | מרכז עבודה | Work Center (CRHD) | משאב (for PM/PP) | |
| Material | חומר | Material (MARA) | פריט | |
| Batch | אצווה | Batch (MCHA/MCH1) | מנה, באטץ׳ | |
| Operation | פעולה | Operation | שלב (for PP/PM) | PP/PM routing step. |
| Phase | שלב | Phase | פעולה (for PP-PI) | PP-PI recipe step. |
| Transaction | טרנזקציה | Transaction | פעולה, עסקה | |
| Transaction Code | קוד טרנזקציה · T-Code | T-Code | tcode, Tcode, T-code | Identifier stays uppercase: IW31. |
| SAP Table | טבלת SAP · טבלאות SAP | SAP Table | טבלה (alone in headings) | Identifier uppercase: AUFK. |
| Field | שדה | Field | עמודה | Technical name uppercase: AUFNR. |
| Primary Key | מפתח ראשי (PK) | Primary Key · PK | | |
| Foreign Key | מפתח זר (FK) | Foreign Key · FK | | |
| Relationship | קשר · קשרי נתונים | Relationship | יחס (except for cardinality) | |
| Cardinality | קרדינליות · יחס | Cardinality (1:N, N:1, 1:1) | | Notation untouched. |
| Data Model | מודל הנתונים | Data Model | מודל, מפת נתונים | |
| ERD | ERD · תרשים ERD | ERD | תרשים ישויות | |
| BAPI | BAPI | BAPI | באפי | Plural: BAPIs. |
| Function Module | מודול פונקציה (FM) | Function Module · FM | פונקציה (alone) | Pair: `BAPI ו-FM`. |
| IDoc | IDoc | IDoc | IDOC, iDoc | Plural: IDocs. |
| CDS View | CDS View · תצוגת CDS | CDS View · CDS Views | תצוגה (alone) | Headings: `CDS Views`. In sentences: `תצוגת CDS`. |
| Fiori Application | יישום Fiori · יישומי SAP Fiori | Fiori app | אפליקציית Fiori, אפליקציות | |
| Enhancement | הרחבה | Enhancement | תוסף | |
| BAdI | BAdI | BAdI | BADI, Badi | |
| User Exit | User Exit | User Exit | יציאת משתמש | |
| S/4HANA transition | המעבר ל-S/4HANA | S/4HANA transition / conversion | הגירה, מסע | |
| Simplification | פישוט · Simplification Item | Simplification Item | | Cite catalog item by name, never bare id. |
| Compatibility | תאימות | Compatibility | | |
| Replacement | החלפה · הוחלף | Replaced | | Verdict labels stay the blueprint's: ללא שינוי / מותאם / הוחלף / הוסר. |
| Successor application | יישום עוקב | Successor app | | Only when validated. |
| Migration impact | השפעת המעבר | Migration impact | | |
| Technical documentation | תיעוד טכני | Technical documentation | מילון | |
| Functional documentation | תיעוד פונקציונלי | Functional documentation | | |
| Incident | תקלה | Incident | בעיה, אירוע | |
| Troubleshooting | פתרון בעיות | Troubleshooting | | |
| Learning path | מסלול למידה | Learning path | מסע | |
| Course / Chapter / Lesson | קורס / פרק / שיעור | Course / Chapter / Lesson | | |
| SAP Books | ספריית SAP · ספרי SAP | SAP Books | | |
| Ask the Library | שאל את הספרייה | Ask the Library | | Product name. Keep. |
| NEO AI | NEO AI | NEO AI | | Product name. Keep. |
| Knowledge Center | מרכז הידע | Knowledge Center | | |
| Migration Cockpit | קוקפיט המעבר | Migration Cockpit | קוקפיט המיגרציה | |
| S/4HANA readiness | מוכנות ל-S/4HANA | S/4HANA readiness | | |

## B. "מילון" — replace by what the surface holds

| Surface content | Use |
|---|---|
| SAP tables (list/catalog) | טבלאות SAP · קטלוג טבלאות SAP |
| Fields and technical definitions | תיעוד טכני · הגדרות שדות · מבנה הטבלה |
| Transactions | קטלוג טרנזקציות · טרנזקציות SAP |
| Connected knowledge | מרכז הידע · פלטפורמת הידע · מפת הידע |
| Data model | מודל הנתונים · ERD |
| The blueprint source itself (the two migration workbooks) | התיעוד · תיעוד הפרויקט · תיעוד המקור |

"מרשם" → קטלוג (קטלוג הטרנזקציות, קטלוג BAPI ו-FM, קטלוג IDoc).

## C. Hebrew style

- Action labels: verbal-noun form — הצגת, פתיחת, מעבר ל, חזרה ל, איתור, בחירת, שליחת, איפוס. Not imperative plural (בואו, גלו, לחצו) and not second-person masculine singular.
- Prefix before a Latin term: ASCII hyphen, no space: `ל-S/4HANA`, `מ-ECC`, `ב-SAP`. Not maqaf (־), not space.
- No em dash (—) and no en dash (–) in visible copy. Use `:` , `,` , `·` or a new sentence. Ranges keep a hyphen (1-5).
- No `...` or `…` in visible copy except a genuine loading state ("טוען…" is allowed as-is).
- No decorative arrows inside headings. Arrows are allowed only as navigation affordances inside buttons/links (`←`, `→` already used by the button kit) and in SAP flow notation (`ECC → S/4HANA`, `A → B` relation paths).
- No superlatives or hype: קסם, מהפכני, מטורף, מגניב, עשיר, חכם, מושלם, מסע, עולם, אמת, חי (as in "חי בשני עולמות").
- No design narration, implementation notes, defensive explanations, or "not X but Y" contrasts in visible copy. Code comments are NOT in scope and stay untouched.
- Empty / no-data wording: `לא קיים תיעוד מאומת במאגר` (data absent), `לא נמצאו תוצאות התואמות לסינון שנבחר` (filter empty), `נדרש אימות נוסף` (uncertain). Never fill a gap with a plausible fact.
- Errors: what happened, whether data was affected, what to do next. No stack traces or implementation errors as copy.
- ECC vs S/4HANA: S/4HANA is the present context; ECC is legacy/source/comparison. Never upgrade an uncertain status into a definite one.
- Identifiers (tables, fields, T-Codes, BAPIs, IDocs, CDS, Fiori IDs, PK/FK, 1:N) are copied verbatim, Latin, uppercase as in source, wrapped in the existing `nx-sap`/`nh-sap` spans. Never translated, never re-cased.

## D. Hard limits for editors

- Edit only string literals / JSX text / aria-* / title= / placeholder= / metadata title+description.
- Do not touch: class names, JSX structure, props, imports, logic, data files (`data/**`, `lib/**` except pure label constants explicitly assigned), route files' params, tests.
- Frozen (never edit): `components/book-reader.tsx`, `components/chapter-reader.tsx`, `components/library/**`, `components/neo/**`, `app/library/**`, `data/books/**`, `data/ai-tree/**`.
- Do not change any number, count, verdict, cardinality, or SAP name in copy. If copy contradicts data, keep the data and note the conflict in the audit.
- Do not remove or rename the footer credit `Project NEO · CBC Israel · פותח על ידי סאלי חליף · Web Coding`.
- Keep `⌘K` / `Ctrl+K` and `<kbd>` hints as they are.
- Keep product names: Project NEO, NEO AI, שאל את הספרייה, SAP Academy, Architecture Studio.
