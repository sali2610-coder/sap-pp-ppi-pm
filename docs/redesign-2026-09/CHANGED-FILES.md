# הקבצים ששונו · deliverable 19

כל קובץ שהענף `design/neo-experience-redesign` שינה מול נקודת הפתיחה `6ba22207` (הגרסה שבייצור), עד `d5be8c161`. נוצר מ-git (`neo-redesign-evidence/tools/changed-files.py`), לא נכתב ביד.

סך הכול: 358 קבצים (165 נוספו, 193 שונו, 0 נמחקו).

קבצים מוגנים שלא שונו: `data/books/**`, ‏`data/library/**`, ‏`data/ai-tree/**`, ‏`data/verification/**`, ‏`components/book-reader.tsx`, ‏`components/chapter-reader.tsx`, ‏`components/library/**`, ‏`components/neo/**`, ‏`app/library/**` (בדיקה: `git diff --name-only 6ba22207..HEAD` על הנתיבים האלה ריקה; ראו QA-REPORT.md).

## NEO routes and style sheets (48)

| קובץ | מצב | +/- | commits |
|---|---|---|---|
| `app/neo/academy/page.tsx` | שונה | +1/-1 | b4f871936 |
| `app/neo/accessibility/page.tsx` | נוסף | +27/-0 | a6a56f22f 7b8db0445 beb3a89a8 |
| `app/neo/bapi/[name]/page.tsx` | שונה | +3/-3 | 1fe5a3a56 |
| `app/neo/bapi/page.tsx` | שונה | +1/-1 | 1fe5a3a56 |
| `app/neo/best-practices.css` | שונה | +35/-18 | ea5cfb9fe 6167e61e6 231328a23 04b6025da 42fa18ea1 |
| `app/neo/best-practices/[slug]/page.tsx` | שונה | +2/-1 | b4f871936 |
| `app/neo/books.css` | שונה | +86/-110 | 7795e53b6 d175dba70 a6a56f22f b83d8382e 231328a23 beb3a89a8 … |
| `app/neo/books/page.tsx` | שונה | +6/-14 | b5b5b6346 d7461ae1a beb3a89a8 b4f871936 |
| `app/neo/cds/page.tsx` | שונה | +1/-1 | b4f871936 |
| `app/neo/centers.css` | שונה | +37/-28 | b189c244d 05919eee7 231328a23 04b6025da beb3a89a8 42fa18ea1 |
| `app/neo/centers/[family]/[slug]/page.tsx` | שונה | +1/-1 | b189c244d b4f871936 |
| `app/neo/centers/page.tsx` | שונה | +4/-2 | b189c244d 05919eee7 b4f871936 |
| `app/neo/cert.css` | שונה | +48/-37 | a6a56f22f fab76fa6d 7b8db0445 231328a23 04b6025da 42fa18ea1 |
| `app/neo/chat.css` | שונה | +60/-44 | d175dba70 a6a56f22f fab76fa6d 1c8d293b3 ffd0f2654 231328a23 … |
| `app/neo/data.css` | שונה | +470/-113 | 281101de0 244bceced a12d30eb3 ea5cfb9fe 82ee47391 d175dba70 … |
| `app/neo/dock.css` | שונה | +120/-163 | a6a56f22f 202fdc23b beb3a89a8 42fa18ea1 |
| `app/neo/domain.css` | שונה | +65/-53 | 9dc3f2bec b189c244d 231328a23 04b6025da 42fa18ea1 |
| `app/neo/erd.css` | שונה | +222/-177 | 5b0006b9c 7a290be77 e8ff2148a b0914b8e5 78b24c59f 2f30b7dfb … |
| `app/neo/erd/page.tsx` | שונה | +1/-1 | 1fe5a3a56 |
| `app/neo/evidence.css` | שונה | +33/-12 | 6167e61e6 231328a23 04b6025da |
| `app/neo/fiori-apps/page.tsx` | שונה | +1/-1 | 1fe5a3a56 |
| `app/neo/ground.css` | שונה | +63/-41 | 78b24c59f a6a56f22f 7da3441e6 7b8db0445 beb3a89a8 42fa18ea1 |
| `app/neo/home.css` | שונה | +316/-1761 | a9ab94a27 a95a069aa f24b8080a 7795e53b6 d175dba70 3989d65e1 … |
| `app/neo/idoc/page.tsx` | שונה | +1/-1 | b4f871936 |
| `app/neo/incidents/[slug]/page.tsx` | שונה | +2/-1 | b4f871936 |
| `app/neo/knowledge/[slug]/page.tsx` | שונה | +2/-1 | b4f871936 |
| `app/neo/layout.tsx` | שונה | +3/-0 | 42fa18ea1 |
| `app/neo/learn.css` | שונה | +161/-115 | cf0191d89 ea5cfb9fe 3989d65e1 a6a56f22f fab76fa6d 6167e61e6 … |
| `app/neo/legal.css` | נוסף | +96/-0 | 7b8db0445 beb3a89a8 |
| `app/neo/motion.css` | שונה | +40/-1 | 31d39b4d3 231328a23 04b6025da 42fa18ea1 |
| `app/neo/object.css` | שונה | +172/-121 | dfa053bd0 cf0191d89 ea5cfb9fe bb8a72045 d175dba70 fab76fa6d … |
| `app/neo/offline/page.tsx` | נוסף | +36/-0 | a6a56f22f b6fc3176b b5b5b6346 |
| `app/neo/page.tsx` | שונה | +197/-289 | a6a56f22f 137a05e13 d7461ae1a 8fdd65cab beb3a89a8 3b9e55835 … |
| `app/neo/privacy/page.tsx` | נוסף | +27/-0 | a6a56f22f 7b8db0445 beb3a89a8 |
| `app/neo/rail.css` | שונה | +375/-588 | 1ca788bf0 a15fe2f28 b68cc5ffb 86a00f731 f41dfc2a5 40035346b … |
| `app/neo/reader.css` | שונה | +200/-113 | e28f6ff6e 6ab0084c4 3989d65e1 a6a56f22f fab76fa6d baa819efc … |
| `app/neo/reference.css` | שונה | +82/-29 | 38154fef2 cf0191d89 ea5cfb9fe ec4c324c1 61daa5d2a 86a00f731 … |
| `app/neo/s4-readiness/page.tsx` | שונה | +1/-1 | 1fe5a3a56 |
| `app/neo/s4.css` | שונה | +142/-89 | ea5cfb9fe a6a56f22f b189c244d 231328a23 04b6025da 42fa18ea1 |
| `app/neo/search-tx.json/route.ts` | נוסף | +11/-0 | 6b8584c0d |
| `app/neo/search.css` | שונה | +124/-140 | d175dba70 a6a56f22f 40035346b 231328a23 04b6025da 42fa18ea1 |
| `app/neo/studio.css` | שונה | +96/-26 | 2f30b7dfb d175dba70 a6a56f22f f03d97561 f555cfb39 a673f893e … |
| `app/neo/studio/page.tsx` | שונה | +1/-1 | b4f871936 |
| `app/neo/system.css` | נוסף | +466/-0 | 244bceced ff580f6c7 78b24c59f 61daa5d2a 9c1dfcee9 31d39b4d3 … |
| `app/neo/terms/page.tsx` | נוסף | +27/-0 | a6a56f22f 7b8db0445 beb3a89a8 |
| `app/neo/transactions/page.tsx` | שונה | +2/-2 | 013f03292 3b9e55835 |
| `app/neo/ui.css` | שונה | +120/-159 | 92a6af751 a6a56f22f fab76fa6d ccfeeae4d 41ff9b157 beb3a89a8 … |
| `app/neo/workspace.css` | שונה | +208/-133 | 281101de0 2676f9111 d478ce221 9c1dfcee9 6167e61e6 231328a23 … |

## NEO components (130)

| קובץ | מצב | +/- | commits |
|---|---|---|---|
| `components/neo-shell/best-practices/bp-data.ts` | שונה | +2/-2 | 1fe5a3a56 b4f871936 |
| `components/neo-shell/best-practices/bp-list.tsx` | נוסף | +118/-0 | fab76fa6d 05919eee7 |
| `components/neo-shell/best-practices/bp-view.tsx` | שונה | +38/-28 | ea5cfb9fe db03d1d36 fab76fa6d 6167e61e6 05919eee7 b4f871936 |
| `components/neo-shell/books/book-hub.tsx` | שונה | +6/-20 | db03d1d36 fab76fa6d b5b5b6346 b83d8382e beb3a89a8 b4f871936 |
| `components/neo-shell/books/book-shelf.tsx` | שונה | +4/-3 | db03d1d36 fab76fa6d b83d8382e |
| `components/neo-shell/books/book-toc.tsx` | שונה | +7/-3 | fab76fa6d |
| `components/neo-shell/books/books-data.ts` | שונה | +12/-10 | b5b5b6346 42fa18ea1 1fe5a3a56 b4f871936 |
| `components/neo-shell/books/links.ts` | שונה | +1/-1 | b5b5b6346 |
| `components/neo-shell/books/quick-view.tsx` | שונה | +2/-9 | b5b5b6346 b4f871936 |
| `components/neo-shell/books/resume.ts` | שונה | +1/-1 | b4f871936 |
| `components/neo-shell/centers/center-topics.tsx` | נוסף | +103/-0 | fab76fa6d b189c244d 05919eee7 |
| `components/neo-shell/centers/centers-data.ts` | שונה | +1/-1 | b4f871936 |
| `components/neo-shell/centers/centers-view.tsx` | שונה | +41/-20 | db03d1d36 fab76fa6d b189c244d 05919eee7 beb3a89a8 b4f871936 |
| `components/neo-shell/chat/context-bar.tsx` | שונה | +3/-2 | a6a56f22f |
| `components/neo-shell/chat/general-chat.tsx` | שונה | +3/-3 | a6a56f22f b4f871936 |
| `components/neo-shell/chat/library-chat.tsx` | שונה | +8/-7 | a6a56f22f b4f871936 |
| `components/neo-shell/chat/message.tsx` | שונה | +2/-2 | a6a56f22f |
| `components/neo-shell/cmd-key.tsx` | נוסף | +19/-0 | b4f871936 |
| `components/neo-shell/copy-id.tsx` | שונה | +5/-0 | 2ab75f0e6 |
| `components/neo-shell/data/catalog-match.ts` | נוסף | +124/-0 | b68cc5ffb 013f03292 |
| `components/neo-shell/data/facet-sheet.tsx` | נוסף | +121/-0 | 013f03292 |
| `components/neo-shell/data/field-id.ts` | נוסף | +5/-0 | 6167e61e6 |
| `components/neo-shell/data/record-visit.tsx` | נוסף | +14/-0 | 6167e61e6 |
| `components/neo-shell/data/table-caps.ts` | נוסף | +29/-0 | 3b9e55835 |
| `components/neo-shell/data/tables-data.ts` | שונה | +2/-1 | 3b9e55835 |
| `components/neo-shell/data/tables-detail-view.tsx` | שונה | +87/-68 | d175dba70 3989d65e1 fab76fa6d 6167e61e6 05919eee7 d7461ae1a … |
| `components/neo-shell/data/tables-surface.tsx` | שונה | +80/-38 | 244bceced 82ee47391 b68cc5ffb d175dba70 3989d65e1 fab76fa6d … |
| `components/neo-shell/data/transactions-surface.tsx` | שונה | +66/-49 | 82ee47391 b68cc5ffb fab76fa6d 013f03292 05919eee7 231328a23 … |
| `components/neo-shell/data/tx-detail-view.tsx` | שונה | +63/-25 | d175dba70 db03d1d36 fab76fa6d 6167e61e6 05919eee7 231328a23 … |
| `components/neo-shell/data/tx-detail.ts` | שונה | +59/-28 | 3b9e55835 1fe5a3a56 b4f871936 |
| `components/neo-shell/dock/dock-buttons.tsx` | נוסף | +56/-0 | 40035346b |
| `components/neo-shell/dock/dock-state.ts` | נוסף | +46/-0 | 40035346b |
| `components/neo-shell/dock/neo-dock.tsx` | שונה | +43/-73 | fab76fa6d 40035346b beb3a89a8 b4f871936 |
| `components/neo-shell/dock/theme-switch.tsx` | שונה | +6/-2 | fab76fa6d 202fdc23b |
| `components/neo-shell/dock/typography.ts` | שונה | +22/-15 | a6a56f22f beb3a89a8 |
| `components/neo-shell/domain/domain-data.ts` | שונה | +12/-8 | 3b9e55835 1fe5a3a56 |
| `components/neo-shell/domain/domain-hub-list.tsx` | שונה | +11/-7 | fab76fa6d 1fe5a3a56 b4f871936 |
| `components/neo-shell/domain/domain-view.tsx` | שונה | +31/-24 | fab76fa6d b189c244d d7461ae1a beb3a89a8 1fe5a3a56 b4f871936 |
| `components/neo-shell/erd/erd-catalog.ts` | שונה | +9/-4 | d175dba70 a673f893e |
| `components/neo-shell/erd/erd-inspector.tsx` | שונה | +8/-13 | e8ff2148a b0914b8e5 f555cfb39 1fe5a3a56 b4f871936 |
| `components/neo-shell/erd/erd-sheet.tsx` | שונה | +10/-12 | 1fe5a3a56 b4f871936 |
| `components/neo-shell/erd/erd-types.ts` | שונה | +22/-33 | 42fa18ea1 1fe5a3a56 |
| `components/neo-shell/erd/erd-workspace.tsx` | שונה | +267/-92 | a93a1b831 cd3163d82 e8ff2148a 8fe968744 b0914b8e5 2f30b7dfb … |
| `components/neo-shell/erd/graph.ts` | שונה | +7/-0 | 2f30b7dfb |
| `components/neo-shell/erd/model.ts` | שונה | +1/-1 | 1fe5a3a56 |
| `components/neo-shell/evidence/evidence-block.tsx` | שונה | +26/-10 | fab76fa6d 6167e61e6 1fe5a3a56 b4f871936 |
| `components/neo-shell/evidence/record-status.tsx` | נוסף | +21/-0 | 05919eee7 |
| `components/neo-shell/evidence/repo-text.ts` | נוסף | +67/-0 | 6167e61e6 |
| `components/neo-shell/evidence/status-pill.tsx` | שונה | +13/-19 | fab76fa6d 3b9e55835 |
| `components/neo-shell/focus.ts` | שונה | +20/-0 | fab76fa6d |
| `components/neo-shell/home/home-continue.tsx` | נוסף | +65/-0 | 137a05e13 8fdd65cab |
| `components/neo-shell/home/home-data.ts` | שונה | +25/-11 | d7461ae1a 3b9e55835 1fe5a3a56 |
| `components/neo-shell/home/home-search.tsx` | נוסף | +27/-0 | 137a05e13 8fdd65cab |
| `components/neo-shell/home/home-zones.tsx` | שונה | +1/-1 | 1fe5a3a56 |
| `components/neo-shell/home/process-map.tsx` | נוסף | +104/-0 | 137a05e13 d7461ae1a 8fdd65cab |
| `components/neo-shell/icon.tsx` | שונה | +6/-6 | 8de035662 |
| `components/neo-shell/lang.ts` | נוסף | +24/-0 | 82ee47391 3989d65e1 fab76fa6d |
| `components/neo-shell/learn/academy-surface.tsx` | שונה | +15/-11 | fab76fa6d 6167e61e6 b4f871936 |
| `components/neo-shell/learn/cert-data.ts` | שונה | +1/-1 | 1fe5a3a56 |
| `components/neo-shell/learn/cert-exam.tsx` | שונה | +8/-4 | db03d1d36 fab76fa6d |
| `components/neo-shell/learn/cert-pick.tsx` | שונה | +1/-1 | 1fe5a3a56 |
| `components/neo-shell/learn/cert-surface.tsx` | שונה | +3/-4 | b4f871936 |
| `components/neo-shell/learn/concept-view.tsx` | שונה | +7/-10 | db03d1d36 fab76fa6d 6167e61e6 b4f871936 |
| `components/neo-shell/learn/course-view.tsx` | שונה | +6/-13 | db03d1d36 fab76fa6d b5b5b6346 6167e61e6 b4f871936 |
| `components/neo-shell/learn/incident-view.tsx` | שונה | +6/-5 | db03d1d36 6167e61e6 b4f871936 |
| `components/neo-shell/learn/incidents-data.ts` | שונה | +2/-2 | 1fe5a3a56 |
| `components/neo-shell/learn/incidents-surface.tsx` | שונה | +46/-32 | fab76fa6d 6167e61e6 05919eee7 b4f871936 |
| `components/neo-shell/learn/knowledge-surface.tsx` | שונה | +91/-72 | fab76fa6d 6167e61e6 05919eee7 b4f871936 |
| `components/neo-shell/learn/lesson-links.ts` | שונה | +15/-6 | b5b5b6346 |
| `components/neo-shell/learn/lesson-neo-links.ts` | שונה | +39/-8 | b5b5b6346 |
| `components/neo-shell/learn/lesson-view.tsx` | שונה | +6/-15 | db03d1d36 fab76fa6d b5b5b6346 6167e61e6 b4f871936 |
| `components/neo-shell/learn/mod.ts` | שונה | +4/-4 | 1fe5a3a56 |
| `components/neo-shell/legal/legal-content.ts` | נוסף | +233/-0 | 19e1a4f97 7795e53b6 221866168 d7461ae1a e5963a1b9 |
| `components/neo-shell/legal/legal-view.tsx` | נוסף | +61/-0 | beb3a89a8 |
| `components/neo-shell/mobile-nav.tsx` | שונה | +20/-4 | 2610ef1a8 fab76fa6d 40035346b beb3a89a8 |
| `components/neo-shell/mod-var.ts` | שונה | +1/-1 | 1fe5a3a56 |
| `components/neo-shell/nav-context/fallbacks.ts` | שונה | +5/-5 | d7461ae1a 1fe5a3a56 |
| `components/neo-shell/nav-context/smart-return.tsx` | שונה | +5/-3 | 04b6025da |
| `components/neo-shell/nav-data.ts` | שונה | +42/-53 | 8de035662 40035346b d7461ae1a 8fdd65cab 1fe5a3a56 b4f871936 |
| `components/neo-shell/neo-shell.tsx` | שונה | +7/-1 | 42fa18ea1 |
| `components/neo-shell/object/object-aux-view.tsx` | שונה | +41/-27 | 7795e53b6 fab76fa6d 05919eee7 beb3a89a8 1fe5a3a56 b4f871936 |
| `components/neo-shell/object/object-aux.ts` | שונה | +4/-2 | d7461ae1a |
| `components/neo-shell/object/object-depth.tsx` | שונה | +3/-2 | db03d1d36 |
| `components/neo-shell/object/object-fields.tsx` | שונה | +13/-9 | db03d1d36 fab76fa6d 6167e61e6 b4f871936 |
| `components/neo-shell/object/object-lanes.tsx` | שונה | +43/-15 | a9ab94a27 2f30b7dfb 6167e61e6 b4f871936 |
| `components/neo-shell/object/object-names.ts` | שונה | +14/-3 | d7461ae1a |
| `components/neo-shell/object/object-orbit.tsx` | שונה | +2/-2 | 1fe5a3a56 |
| `components/neo-shell/object/object-return.tsx` | שונה | +1/-1 | b4f871936 |
| `components/neo-shell/object/object-view.tsx` | שונה | +64/-38 | 7795e53b6 db03d1d36 fab76fa6d 05919eee7 d7461ae1a beb3a89a8 … |
| `components/neo-shell/offline-retry.tsx` | נוסף | +27/-0 | b6fc3176b |
| `components/neo-shell/preview.tsx` | שונה | +1/-1 | b4f871936 |
| `components/neo-shell/reader/cited.ts` | נוסף | +69/-0 | 2610ef1a8 6ab0084c4 |
| `components/neo-shell/reader/env.ts` | שונה | +18/-0 | b83d8382e |
| `components/neo-shell/reader/neo-reader.tsx` | שונה | +107/-36 | 2610ef1a8 dfcafdb6e 6ab0084c4 3989d65e1 fab76fa6d b5b5b6346 … |
| `components/neo-shell/reader/progress-rail.tsx` | שונה | +14/-12 | 3989d65e1 fab76fa6d 04b6025da |
| `components/neo-shell/reader/reader-panel.tsx` | שונה | +25/-6 | db03d1d36 fab76fa6d |
| `components/neo-shell/reader/section-body.tsx` | שונה | +3/-2 | fab76fa6d |
| `components/neo-shell/reference/bapi-data.ts` | שונה | +34/-15 | 05919eee7 1fe5a3a56 b4f871936 |
| `components/neo-shell/reference/cds-data.ts` | שונה | +6/-7 | b4f871936 |
| `components/neo-shell/reference/enh-data.ts` | שונה | +5/-5 | 1fe5a3a56 b4f871936 |
| `components/neo-shell/reference/fiori-data.ts` | שונה | +6/-8 | 3b9e55835 1fe5a3a56 b4f871936 |
| `components/neo-shell/reference/idoc-data.ts` | שונה | +9/-9 | d7461ae1a b4f871936 |
| `components/neo-shell/reference/ref-detail-view.tsx` | שונה | +17/-9 | ea5cfb9fe db03d1d36 fab76fa6d 05919eee7 b4f871936 |
| `components/neo-shell/reference/ref-surface.tsx` | שונה | +80/-54 | 38154fef2 ec4c324c1 82ee47391 b68cc5ffb fab76fa6d 013f03292 … |
| `components/neo-shell/s4/s4-catalog.tsx` | שונה | +24/-16 | fab76fa6d b189c244d 3b9e55835 1fe5a3a56 b4f871936 |
| `components/neo-shell/s4/s4-data.ts` | שונה | +38/-12 | b189c244d 3b9e55835 |
| `components/neo-shell/s4/s4-view.tsx` | שונה | +111/-67 | 7795e53b6 d175dba70 db03d1d36 fab76fa6d b189c244d d7461ae1a … |
| `components/neo-shell/search/build.ts` | שונה | +177/-97 | d175dba70 6b8584c0d 40035346b |
| `components/neo-shell/search/command-index.ts` | שונה | +241/-101 | 6b8584c0d 40035346b 1fe5a3a56 b4f871936 |
| `components/neo-shell/search/command-surface.tsx` | שונה | +216/-165 | d175dba70 fab76fa6d 6b8584c0d 40035346b b4f871936 |
| `components/neo-shell/search/hebrew.ts` | נוסף | +59/-0 | 40035346b |
| `components/neo-shell/search/shell-client.tsx` | שונה | +507/-220 | 2610ef1a8 dfcafdb6e 9dc3f2bec db03d1d36 fab76fa6d 6b8584c0d … |
| `components/neo-shell/search/types.ts` | שונה | +58/-13 | 6b8584c0d 40035346b |
| `components/neo-shell/shelf.tsx` | שונה | +10/-5 | fab76fa6d f3534d0b3 b4f871936 |
| `components/neo-shell/site-footer.tsx` | נוסף | +20/-0 | beb3a89a8 |
| `components/neo-shell/studio/studio-view.tsx` | שונה | +96/-32 | a93a1b831 cd3163d82 2f30b7dfb fab76fa6d f555cfb39 a673f893e … |
| `components/neo-shell/workspace/module-workspace.tsx` | שונה | +7/-8 | beb3a89a8 b4f871936 |
| `components/neo-shell/workspace/section-nav.css` | שונה | +38/-37 | ae9826d16 fab76fa6d 6167e61e6 |
| `components/neo-shell/workspace/section-nav.tsx` | שונה | +25/-1 | 3989d65e1 db03d1d36 6167e61e6 |
| `components/neo-shell/workspace/workspace-build.tsx` | שונה | +4/-4 | 1fe5a3a56 |
| `components/neo-shell/workspace/workspace-chapter.tsx` | שונה | +23/-9 | 9c1dfcee9 |
| `components/neo-shell/workspace/workspace-context.tsx` | שונה | +3/-4 | b4f871936 |
| `components/neo-shell/workspace/workspace-data.ts` | שונה | +6/-5 | b5b5b6346 1fe5a3a56 |
| `components/neo-shell/workspace/workspace-header.tsx` | שונה | +45/-33 | 1658c7087 2676f9111 6167e61e6 b4f871936 |
| `components/neo-shell/workspace/workspace-iface.tsx` | שונה | +5/-5 | b4f871936 |
| `components/neo-shell/workspace/workspace-map.tsx` | שונה | +4/-4 | b4f871936 |
| `components/neo-shell/workspace/workspace-ops.tsx` | שונה | +2/-2 | 3b9e55835 b4f871936 |
| `components/neo-shell/workspace/workspace-s4.tsx` | שונה | +13/-14 | 3b9e55835 1fe5a3a56 b4f871936 |
| `components/neo-shell/workspace/workspace-sheet.tsx` | שונה | +4/-3 | fab76fa6d |
| `components/neo-shell/workspace/workspace-table.tsx` | שונה | +9/-4 | d478ce221 d175dba70 b4f871936 |

## Direction boards (Phase 3) (24)

| קובץ | מצב | +/- | commits |
|---|---|---|---|
| `app/design/redesign-2026/atlas/README.md` | נוסף | +58/-0 | 255dfec51 |
| `app/design/redesign-2026/atlas/atlas-data.ts` | נוסף | +494/-0 | 255dfec51 |
| `app/design/redesign-2026/atlas/atlas-map.tsx` | נוסף | +289/-0 | 255dfec51 |
| `app/design/redesign-2026/atlas/board.css` | נוסף | +1020/-0 | 255dfec51 |
| `app/design/redesign-2026/atlas/copy-code.tsx` | נוסף | +31/-0 | 255dfec51 |
| `app/design/redesign-2026/atlas/mode.tsx` | נוסף | +53/-0 | 255dfec51 |
| `app/design/redesign-2026/atlas/page.tsx` | נוסף | +1144/-0 | 42fa18ea1 255dfec51 |
| `app/design/redesign-2026/editorial/README.md` | נוסף | +87/-0 | 255dfec51 |
| `app/design/redesign-2026/editorial/board.css` | נוסף | +1315/-0 | 255dfec51 |
| `app/design/redesign-2026/editorial/client.tsx` | נוסף | +418/-0 | 255dfec51 |
| `app/design/redesign-2026/editorial/lib.ts` | נוסף | +158/-0 | 255dfec51 |
| `app/design/redesign-2026/editorial/page.tsx` | נוסף | +1854/-0 | 42fa18ea1 255dfec51 |
| `app/design/redesign-2026/motion/codes.ts` | נוסף | +3/-0 | 255dfec51 |
| `app/design/redesign-2026/motion/flow-map.tsx` | נוסף | +68/-0 | 255dfec51 |
| `app/design/redesign-2026/motion/mode-toggle.tsx` | נוסף | +28/-0 | 255dfec51 |
| `app/design/redesign-2026/motion/motion.css` | נוסף | +120/-0 | 255dfec51 |
| `app/design/redesign-2026/motion/page.tsx` | נוסף | +63/-0 | 42fa18ea1 255dfec51 |
| `app/design/redesign-2026/motion/tx/[code]/page.tsx` | נוסף | +57/-0 | 42fa18ea1 255dfec51 |
| `app/design/redesign-2026/workbench/README.md` | נוסף | +109/-0 | 255dfec51 |
| `app/design/redesign-2026/workbench/board.css` | נוסף | +3470/-0 | 255dfec51 |
| `app/design/redesign-2026/workbench/client.tsx` | נוסף | +475/-0 | 255dfec51 |
| `app/design/redesign-2026/workbench/data.ts` | נוסף | +570/-0 | 255dfec51 |
| `app/design/redesign-2026/workbench/marks.tsx` | נוסף | +139/-0 | 255dfec51 |
| `app/design/redesign-2026/workbench/page.tsx` | נוסף | +1196/-0 | 42fa18ea1 255dfec51 |

## Self-hosted fonts (OFL) (25)

| קובץ | מצב | +/- | commits |
|---|---|---|---|
| `app/fonts/assistant.ts` | נוסף | +25/-0 | 42fa18ea1 |
| `app/fonts/assistant/OFL.txt` | נוסף | +93/-0 | 243e23491 |
| `app/fonts/assistant/assistant-hebrew-wght-normal.woff2` | נוסף | +-/-- | 243e23491 |
| `app/fonts/assistant/assistant-latin-wght-normal.woff2` | נוסף | +-/-- | 243e23491 |
| `app/fonts/frank-ruhl-libre/OFL.txt` | נוסף | +93/-0 | 243e23491 |
| `app/fonts/frank-ruhl-libre/frank-ruhl-libre-hebrew-wght-normal.woff2` | נוסף | +-/-- | 243e23491 |
| `app/fonts/frank-ruhl-libre/frank-ruhl-libre-latin-wght-normal.woff2` | נוסף | +-/-- | 243e23491 |
| `app/fonts/frank.ts` | נוסף | +36/-0 | 31d39b4d3 1c8d293b3 41ff9b157 42fa18ea1 |
| `app/fonts/jetbrains-mono/OFL.txt` | נוסף | +93/-0 | 243e23491 |
| `app/fonts/jetbrains-mono/jetbrains-mono-latin-wght-normal.woff2` | נוסף | +-/-- | 243e23491 |
| `app/fonts/jetbrains.ts` | נוסף | +16/-0 | 42fa18ea1 |
| `app/fonts/plex-mono/OFL.txt` | נוסף | +93/-0 | 243e23491 |
| `app/fonts/plex-mono/ibm-plex-mono-latin-400-normal.woff2` | נוסף | +-/-- | 243e23491 |
| `app/fonts/plex-mono/ibm-plex-mono-latin-500-normal.woff2` | נוסף | +-/-- | 243e23491 |
| `app/fonts/plex-mono/ibm-plex-mono-latin-600-normal.woff2` | נוסף | +-/-- | 243e23491 |
| `app/fonts/plex-sans-hebrew/OFL.txt` | נוסף | +93/-0 | 243e23491 |
| `app/fonts/plex-sans-hebrew/ibm-plex-sans-hebrew-hebrew-400-normal.woff2` | נוסף | +-/-- | 243e23491 |
| `app/fonts/plex-sans-hebrew/ibm-plex-sans-hebrew-hebrew-500-normal.woff2` | נוסף | +-/-- | 243e23491 |
| `app/fonts/plex-sans-hebrew/ibm-plex-sans-hebrew-hebrew-600-normal.woff2` | נוסף | +-/-- | 243e23491 |
| `app/fonts/plex-sans-hebrew/ibm-plex-sans-hebrew-hebrew-700-normal.woff2` | נוסף | +-/-- | 243e23491 |
| `app/fonts/plex-sans-hebrew/ibm-plex-sans-hebrew-latin-400-normal.woff2` | נוסף | +-/-- | 243e23491 |
| `app/fonts/plex-sans-hebrew/ibm-plex-sans-hebrew-latin-500-normal.woff2` | נוסף | +-/-- | 243e23491 |
| `app/fonts/plex-sans-hebrew/ibm-plex-sans-hebrew-latin-600-normal.woff2` | נוסף | +-/-- | 243e23491 |
| `app/fonts/plex-sans-hebrew/ibm-plex-sans-hebrew-latin-700-normal.woff2` | נוסף | +-/-- | 243e23491 |
| `app/fonts/plex.ts` | נוסף | +53/-0 | dfcafdb6e 41ff9b157 42fa18ea1 3b9e55835 |

## Other app files (8)

| קובץ | מצב | +/- | commits |
|---|---|---|---|
| `app/error.tsx` | שונה | +3/-3 | b4f871936 |
| `app/global-error.tsx` | שונה | +2/-2 | b4f871936 |
| `app/globals.css` | שונה | +127/-61 | 64d36a53b 7795e53b6 d175dba70 a6a56f22f db03d1d36 fab76fa6d … |
| `app/layout.tsx` | שונה | +4/-4 | b4f871936 |
| `app/loading.tsx` | שונה | +1/-1 | b4f871936 |
| `app/manifest.ts` | שונה | +17/-12 | 41677306e 24a0495eb b4f871936 |
| `app/not-found.tsx` | שונה | +41/-30 | d175dba70 fab76fa6d 7b8db0445 04b6025da b4f871936 |
| `app/privacy/page.tsx` | שונה | +13/-75 | beb3a89a8 |

## Shared libraries (11)

| קובץ | מצב | +/- | commits |
|---|---|---|---|
| `lib/ai/links.ts` | שונה | +4/-1 | b5b5b6346 |
| `lib/device.ts` | שונה | +7/-0 | 202fdc23b |
| `lib/evidence/s4-status.ts` | שונה | +13/-4 | 3b9e55835 |
| `lib/evidence/types.ts` | שונה | +75/-26 | 04b6025da 3b9e55835 |
| `lib/i18n.tsx` | שונה | +3/-1 | beb3a89a8 |
| `lib/primary-module.ts` | שונה | +1/-1 | d7461ae1a |
| `lib/s4-readiness.ts` | שונה | +18/-13 | 3b9e55835 1fe5a3a56 |
| `lib/seo.ts` | שונה | +6/-1 | b4f871936 |
| `lib/studio-graph.ts` | שונה | +41/-25 | d175dba70 a673f893e d7461ae1a beb3a89a8 3b9e55835 |
| `lib/theme-boot.ts` | שונה | +17/-1 | a6a56f22f |
| `lib/use-dialog.ts` | שונה | +12/-4 | fab76fa6d |

## Tools and checks (21)

| קובץ | מצב | +/- | commits |
|---|---|---|---|
| `scripts/check-prod.mjs` | שונה | +14/-3 | 7a640cfff |
| `scripts/check-sitemap.mjs` | שונה | +10/-0 | 60d51801a |
| `scripts/gen-legacy-redirects.mjs` | נוסף | +261/-0 | fb590bf06 db031179e b6fc3176b b5b5b6346 |
| `scripts/qa/a11y-sample.mjs` | שונה | +30/-7 | 5ccbf9d8f 389863af3 92a6af751 |
| `scripts/qa/astra-extra-check.mjs` | שונה | +25/-19 | 1e3a62f73 |
| `scripts/qa/astra-reverify.mjs` | שונה | +13/-9 | b72d53bf7 |
| `scripts/qa/clip-reach.mjs` | נוסף | +237/-0 | 11d3633c5 c44a9a253 b950e7336 3dfc449e1 |
| `scripts/qa/dock-check.mjs` | שונה | +12/-3 | 1e3a62f73 |
| `scripts/qa/erd-label-floor.mjs` | נוסף | +152/-0 | cd3163d82 2f30b7dfb |
| `scripts/qa/keyboard-check.mjs` | שונה | +18/-2 | 86a00f731 1c8d293b3 |
| `scripts/qa/module-colour-check.mjs` | שונה | +11/-5 | 7a640cfff |
| `scripts/qa/motion-rest-check.mjs` | נוסף | +96/-0 | 6fcfd640f e1e7cf54c c44a9a253 a15fe2f28 |
| `scripts/qa/present-check.mjs` | שונה | +7/-4 | b72d53bf7 |
| `scripts/qa/r3-check.mjs` | שונה | +3/-1 | b72d53bf7 |
| `scripts/qa/r3b-check.mjs` | שונה | +3/-1 | b72d53bf7 |
| `scripts/qa/r3d-check.mjs` | שונה | +6/-2 | b72d53bf7 |
| `scripts/qa/round6-misc-check.mjs` | שונה | +2/-1 | 1e3a62f73 |
| `scripts/qa/status-consistency.mjs` | שונה | +4/-1 | 9dc3f2bec |
| `scripts/qa/text-layout-check.mjs` | נוסף | +191/-0 | 3dfc449e1 |
| `scripts/serve-out.py` | שונה | +125/-3 | 3dfc449e1 9dc3f2bec b5b5b6346 7da3441e6 b529a60eb 68a9157ad |
| `scripts/verify-reader.mjs` | שונה | +42/-23 | 2610ef1a8 6ab0084c4 |

## Unit tests (16)

| קובץ | מצב | +/- | commits |
|---|---|---|---|
| `test/academy-course-links.test.ts` | נוסף | +45/-0 | b5b5b6346 |
| `test/app-modules.mjs` | נוסף | +14/-0 | 3b9e55835 |
| `test/canvas-lod.test.ts` | נוסף | +36/-0 | 2f30b7dfb |
| `test/citation-href.test.ts` | שונה | +4/-2 | b5b5b6346 |
| `test/content-catalog-match.test.ts` | נוסף | +74/-0 | b68cc5ffb 013f03292 |
| `test/content-repo-text.test.ts` | נוסף | +40/-0 | 6167e61e6 |
| `test/home-flows.test.ts` | נוסף | +77/-0 | d7461ae1a |
| `test/object-names.test.ts` | נוסף | +24/-0 | d7461ae1a |
| `test/pages-reader-sticky.test.ts` | נוסף | +36/-0 | b83d8382e |
| `test/pages-s4-status.test.ts` | נוסף | +35/-0 | b189c244d |
| `test/s4-status.test.ts` | שונה | +7/-6 | 04b6025da 3b9e55835 |
| `test/sap-correctness.test.ts` | נוסף | +157/-0 | 3b9e55835 |
| `test/search-index-routes.test.ts` | נוסף | +159/-0 | 6b8584c0d 40035346b |
| `test/search-query.test.ts` | נוסף | +81/-0 | 6b8584c0d 40035346b |
| `test/status-group.test.ts` | שונה | +66/-17 | 3b9e55835 |
| `test/vercel-config.test.ts` | נוסף | +28/-0 | db031179e |

## Documents (60)

| קובץ | מצב | +/- | commits |
|---|---|---|---|
| `docs/redesign-2026-09/ART-DIRECTION.md` | נוסף | +94/-0 | 78b24c59f |
| `docs/redesign-2026-09/ASTRA-CRITERIA.md` | נוסף | +95/-0 | 3a1dba05f a50116a38 632fa37e8 b72d53bf7 |
| `docs/redesign-2026-09/BAKEOFF.md` | נוסף | +83/-0 | 255dfec51 |
| `docs/redesign-2026-09/BASELINE.md` | נוסף | +93/-0 | 243e23491 |
| `docs/redesign-2026-09/BLOCKERS.md` | נוסף | +145/-0 | fd1c23eff b7d63d42a a50116a38 25249774e 32089ffb4 d175dba70 … |
| `docs/redesign-2026-09/BOARD-SPEC.md` | נוסף | +51/-0 | 98bf289a5 243e23491 |
| `docs/redesign-2026-09/CHANGED-FILES.md` | נוסף | +388/-0 | 2031581e0 366d8b0f9 632fa37e8 |
| `docs/redesign-2026-09/COMPONENTS.md` | נוסף | +101/-0 | 32089ffb4 3989d65e1 2ab75f0e6 |
| `docs/redesign-2026-09/COPY-AUDIT.md` | נוסף | +445/-0 | 1fe5a3a56 b4f871936 |
| `docs/redesign-2026-09/DELIVERY.md` | נוסף | +60/-0 | fd1c23eff b7d63d42a 25249774e d175dba70 |
| `docs/redesign-2026-09/DEPENDENCIES.md` | נוסף | +27/-0 | 32089ffb4 12930a2b5 |
| `docs/redesign-2026-09/DESIGN-BRIEF.md` | נוסף | +67/-0 | 243e23491 |
| `docs/redesign-2026-09/DESIGN-SPEC.md` | נוסף | +83/-0 | d7461ae1a 243e23491 |
| `docs/redesign-2026-09/LEGACY-REGISTER.md` | נוסף | +533/-0 | fd1c23eff fb590bf06 c24b16e61 |
| `docs/redesign-2026-09/LEGAL-READINESS.md` | נוסף | +375/-0 | cd95f6c7c |
| `docs/redesign-2026-09/MATRIX.md` | נוסף | +90/-0 | 3a1dba05f 25249774e |
| `docs/redesign-2026-09/MERGE-PLAN.md` | נוסף | +49/-0 | 3a1dba05f a50116a38 25249774e 32089ffb4 12930a2b5 |
| `docs/redesign-2026-09/MOTION.md` | נוסף | +95/-0 | fd1c23eff 7795e53b6 3989d65e1 109975d2c ffd0f2654 |
| `docs/redesign-2026-09/NAV-LEGACY.md` | נוסף | +134/-0 | fd1c23eff fb590bf06 d175dba70 8c9eb5eb0 |
| `docs/redesign-2026-09/OWNER-QUESTIONS.md` | נוסף | +76/-0 | fd1c23eff c24b16e61 |
| `docs/redesign-2026-09/PLAN.md` | נוסף | +35/-0 | 243e23491 |
| `docs/redesign-2026-09/PROGRESS.md` | נוסף | +87/-0 | fd1c23eff 3a1dba05f b7d63d42a 25249774e 32089ffb4 63eb75496 … |
| `docs/redesign-2026-09/QA-R3.md` | נוסף | +139/-0 | fd1c23eff |
| `docs/redesign-2026-09/QA-REPORT.md` | נוסף | +197/-0 | 3a1dba05f 632fa37e8 |
| `docs/redesign-2026-09/REVIEW-GUIDE.md` | נוסף | +66/-0 | 3a1dba05f a50116a38 32089ffb4 3989d65e1 109975d2c |
| `docs/redesign-2026-09/RUN-LOCAL.md` | נוסף | +25/-0 | fd1c23eff c24b16e61 |
| `docs/redesign-2026-09/SIDE-TABS.md` | נוסף | +121/-0 | a6a56f22f 109975d2c 04b6025da |
| `docs/redesign-2026-09/SOURCES.md` | נוסף | +53/-0 | fd1c23eff |
| `docs/redesign-2026-09/SYSTEM-MAP.md` | נוסף | +58/-0 | 243e23491 |
| `docs/redesign-2026-09/TOKENS.md` | נוסף | +128/-0 | b7d63d42a 32089ffb4 d175dba70 3989d65e1 109975d2c 98bf289a5 … |
| `docs/redesign-2026-09/TRACEABILITY.md` | נוסף | +171/-0 | 66c85fd99 |
| `docs/redesign-2026-09/copy-audit-candidates.md` | נוסף | +397/-0 | cd95f6c7c |
| `docs/redesign-2026-09/legacy-register.csv` | נוסף | +466/-0 | fb590bf06 c24b16e61 |
| `docs/redesign-2026-09/reviews/CLOSURE.md` | נוסף | +273/-0 | fd1c23eff b7d63d42a 25249774e 37a7b3a2d |
| `docs/redesign-2026-09/reviews/bakeoff-judge-eng.md` | נוסף | +139/-0 | 255dfec51 |
| `docs/redesign-2026-09/reviews/bakeoff-judge-ux.md` | נוסף | +119/-0 | 255dfec51 |
| `docs/redesign-2026-09/reviews/bakeoff-judge-visual.md` | נוסף | +105/-0 | 255dfec51 |
| `docs/redesign-2026-09/reviews/content-review-copy-sap.md` | נוסף | +280/-0 | 255dfec51 |
| `docs/redesign-2026-09/reviews/gate-01-content-quality-r3.md` | נוסף | +57/-0 | fd1c23eff |
| `docs/redesign-2026-09/reviews/gate-01-content-quality.md` | נוסף | +86/-0 | d7461ae1a |
| `docs/redesign-2026-09/reviews/gate-02-knowledge-architecture-r3.md` | נוסף | +117/-0 | fd1c23eff |
| `docs/redesign-2026-09/reviews/gate-02-knowledge-architecture.md` | נוסף | +157/-0 | d7461ae1a |
| `docs/redesign-2026-09/reviews/gate-03-visual-design-r3.md` | נוסף | +52/-0 | fd1c23eff |
| `docs/redesign-2026-09/reviews/gate-03-visual-design.md` | נוסף | +110/-0 | a673f893e |
| `docs/redesign-2026-09/reviews/gate-04-adaptive-ui.md` | נוסף | +95/-0 | a673f893e |
| `docs/redesign-2026-09/reviews/gate-05-enterprise-ux.md` | נוסף | +118/-0 | f555cfb39 |
| `docs/redesign-2026-09/reviews/gate-06-search-r3.md` | נוסף | +146/-0 | fd1c23eff |
| `docs/redesign-2026-09/reviews/gate-06-search.md` | נוסף | +108/-0 | a673f893e |
| `docs/redesign-2026-09/reviews/gate-07-erd-studio-r3.md` | נוסף | +51/-0 | fd1c23eff |
| `docs/redesign-2026-09/reviews/gate-07-erd-studio.md` | נוסף | +108/-0 | a673f893e |
| `docs/redesign-2026-09/reviews/gate-08-accessibility-r3.md` | נוסף | +76/-0 | fd1c23eff |
| `docs/redesign-2026-09/reviews/gate-08-accessibility.md` | נוסף | +153/-0 | 31ae71643 |
| `docs/redesign-2026-09/reviews/gate-09-performance-r3.md` | נוסף | +159/-0 | fd1c23eff |
| `docs/redesign-2026-09/reviews/gate-09-performance.md` | נוסף | +254/-0 | 31ae71643 |
| `docs/redesign-2026-09/reviews/gate-10-impeccable-r3-pass1.md` | נוסף | +63/-0 | fd1c23eff |
| `docs/redesign-2026-09/reviews/gate-10-impeccable-r3.md` | נוסף | +44/-0 | fd1c23eff |
| `docs/redesign-2026-09/reviews/gate-10-impeccable.md` | נוסף | +98/-0 | a6a56f22f |
| `docs/redesign-2026-09/reviews/gate-11-final-ux-r2.md` | נוסף | +191/-0 | 2ef6a7305 |
| `docs/redesign-2026-09/reviews/gate-11-final-ux.md` | נוסף | +346/-0 | 37a7b3a2d |
| `docs/redesign-2026-09/reviews/sap-correctness.md` | נוסף | +181/-0 | 3b9e55835 |

## Static files (8)

| קובץ | מצב | +/- | commits |
|---|---|---|---|
| `public/sap-infrastructure/dataset.json` | שונה | +1/-1 | 1fe5a3a56 |
| `public/screenshots/neo-phone-academy-day.png` | נוסף | +-/-- | 41677306e |
| `public/screenshots/neo-phone-home-day.png` | נוסף | +-/-- | d5be8c161 41677306e |
| `public/screenshots/neo-phone-tables-night.png` | נוסף | +-/-- | 41677306e |
| `public/screenshots/neo-wide-erd-night.png` | נוסף | +-/-- | d5be8c161 41677306e |
| `public/screenshots/neo-wide-home-day.png` | נוסף | +-/-- | d5be8c161 41677306e |
| `public/screenshots/neo-wide-reader-day.png` | נוסף | +-/-- | d5be8c161 41677306e |
| `public/sw.js` | שונה | +37/-9 | d175dba70 b6fc3176b b5b5b6346 |

## Configuration and other (7)

| קובץ | מצב | +/- | commits |
|---|---|---|---|
| `DESIGN.md` | נוסף | +12/-0 | e226fb17e |
| `PRODUCT.md` | נוסף | +12/-0 | e226fb17e |
| `components/Footer.tsx` | שונה | +12/-3 | 7b8db0445 beb3a89a8 b4f871936 |
| `components/app-shell.tsx` | שונה | +19/-6 | 7da3441e6 e5963a1b9 b4f871936 |
| `components/architecture-studio.tsx` | שונה | +8/-6 | 3b9e55835 |
| `types/react-canary.d.ts` | נוסף | +3/-0 | e5963a1b9 |
| `vercel.json` | שונה | +2390/-19 | fb590bf06 db031179e b6fc3176b b5b5b6346 |

