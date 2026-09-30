# הקבצים ששונו · deliverable 19

כל קובץ שהענף `design/neo-experience-redesign` שינה מול נקודת הפתיחה `6ba22207` (הגרסה שבייצור), עד `25249774`. נוצר מ-git (`neo-redesign-evidence/tools/changed-files.py`), לא נכתב ביד.

סך הכול: 322 קבצים (132 נוספו, 190 שונו, 0 נמחקו).

קבצים מוגנים שלא שונו: `data/books/**`, ‏`data/library/**`, ‏`data/ai-tree/**`, ‏`data/verification/**`, ‏`components/book-reader.tsx`, ‏`components/chapter-reader.tsx`, ‏`components/library/**`, ‏`components/neo/**`, ‏`app/library/**` (בדיקה: `git diff --name-only 6ba22207..HEAD` על הנתיבים האלה ריקה; ראו QA-REPORT.md).

## NEO routes and style sheets (48)

| קובץ | מצב | +/- | commits |
|---|---|---|---|
| `app/neo/academy/page.tsx` | שונה | +1/-1 | b4f87193 |
| `app/neo/accessibility/page.tsx` | נוסף | +27/-0 | a6a56f22 7b8db044 beb3a89a |
| `app/neo/bapi/[name]/page.tsx` | שונה | +3/-3 | 1fe5a3a5 |
| `app/neo/bapi/page.tsx` | שונה | +1/-1 | 1fe5a3a5 |
| `app/neo/best-practices.css` | שונה | +34/-17 | 6167e61e 231328a2 04b6025d 42fa18ea |
| `app/neo/best-practices/[slug]/page.tsx` | שונה | +2/-1 | b4f87193 |
| `app/neo/books.css` | שונה | +81/-108 | d175dba7 a6a56f22 b83d8382 231328a2 beb3a89a 42fa18ea |
| `app/neo/books/page.tsx` | שונה | +6/-14 | b5b5b634 d7461ae1 beb3a89a b4f87193 |
| `app/neo/cds/page.tsx` | שונה | +1/-1 | b4f87193 |
| `app/neo/centers.css` | שונה | +37/-28 | b189c244 05919eee 231328a2 04b6025d beb3a89a 42fa18ea |
| `app/neo/centers/[family]/[slug]/page.tsx` | שונה | +1/-1 | b189c244 b4f87193 |
| `app/neo/centers/page.tsx` | שונה | +4/-2 | b189c244 05919eee b4f87193 |
| `app/neo/cert.css` | שונה | +48/-37 | a6a56f22 fab76fa6 7b8db044 231328a2 04b6025d 42fa18ea |
| `app/neo/chat.css` | שונה | +60/-44 | d175dba7 a6a56f22 fab76fa6 1c8d293b ffd0f265 231328a2 … |
| `app/neo/data.css` | שונה | +365/-111 | d175dba7 a6a56f22 fab76fa6 013f0329 05919eee 231328a2 … |
| `app/neo/dock.css` | שונה | +120/-163 | a6a56f22 202fdc23 beb3a89a 42fa18ea |
| `app/neo/domain.css` | שונה | +65/-53 | 9dc3f2be b189c244 231328a2 04b6025d 42fa18ea |
| `app/neo/erd.css` | שונה | +155/-144 | d175dba7 a6a56f22 fab76fa6 f555cfb3 a673f893 ffd0f265 … |
| `app/neo/erd/page.tsx` | שונה | +1/-1 | 1fe5a3a5 |
| `app/neo/evidence.css` | שונה | +33/-12 | 6167e61e 231328a2 04b6025d |
| `app/neo/fiori-apps/page.tsx` | שונה | +1/-1 | 1fe5a3a5 |
| `app/neo/ground.css` | שונה | +31/-13 | a6a56f22 7da3441e 7b8db044 beb3a89a 42fa18ea |
| `app/neo/home.css` | שונה | +288/-1761 | d175dba7 3989d65e a6a56f22 137a05e1 d7461ae1 8fdd65ca … |
| `app/neo/idoc/page.tsx` | שונה | +1/-1 | b4f87193 |
| `app/neo/incidents/[slug]/page.tsx` | שונה | +2/-1 | b4f87193 |
| `app/neo/knowledge/[slug]/page.tsx` | שונה | +2/-1 | b4f87193 |
| `app/neo/layout.tsx` | שונה | +3/-0 | 42fa18ea |
| `app/neo/learn.css` | שונה | +155/-114 | 3989d65e a6a56f22 fab76fa6 6167e61e 05919eee 231328a2 … |
| `app/neo/legal.css` | נוסף | +96/-0 | 7b8db044 beb3a89a |
| `app/neo/motion.css` | שונה | +40/-1 | 31d39b4d 231328a2 04b6025d 42fa18ea |
| `app/neo/object.css` | שונה | +153/-114 | d175dba7 fab76fa6 6167e61e 05919eee 231328a2 04b6025d … |
| `app/neo/offline/page.tsx` | נוסף | +36/-0 | a6a56f22 b6fc3176 b5b5b634 |
| `app/neo/page.tsx` | שונה | +197/-289 | a6a56f22 137a05e1 d7461ae1 8fdd65ca beb3a89a 3b9e5583 … |
| `app/neo/privacy/page.tsx` | נוסף | +27/-0 | a6a56f22 7b8db044 beb3a89a |
| `app/neo/rail.css` | שונה | +351/-588 | b68cc5ff 86a00f73 f41dfc2a 40035346 beb3a89a 42fa18ea |
| `app/neo/reader.css` | שונה | +172/-109 | 6ab0084c 3989d65e a6a56f22 fab76fa6 baa819ef b83d8382 … |
| `app/neo/reference.css` | שונה | +18/-25 | 86a00f73 013f0329 231328a2 04b6025d 42fa18ea |
| `app/neo/s4-readiness/page.tsx` | שונה | +1/-1 | 1fe5a3a5 |
| `app/neo/s4.css` | שונה | +117/-87 | a6a56f22 b189c244 231328a2 04b6025d 42fa18ea |
| `app/neo/search-tx.json/route.ts` | נוסף | +11/-0 | 6b8584c0 |
| `app/neo/search.css` | שונה | +124/-140 | d175dba7 a6a56f22 40035346 231328a2 04b6025d 42fa18ea |
| `app/neo/studio.css` | שונה | +87/-26 | d175dba7 a6a56f22 f03d9756 f555cfb3 a673f893 231328a2 … |
| `app/neo/studio/page.tsx` | שונה | +1/-1 | b4f87193 |
| `app/neo/system.css` | נוסף | +437/-0 | 31d39b4d 41ff9b15 beb3a89a 42fa18ea |
| `app/neo/terms/page.tsx` | נוסף | +27/-0 | a6a56f22 7b8db044 beb3a89a |
| `app/neo/transactions/page.tsx` | שונה | +2/-2 | 013f0329 3b9e5583 |
| `app/neo/ui.css` | שונה | +120/-159 | 92a6af75 a6a56f22 fab76fa6 ccfeeae4 41ff9b15 beb3a89a … |
| `app/neo/workspace.css` | שונה | +127/-110 | 6167e61e 231328a2 04b6025d beb3a89a 42fa18ea |

## NEO components (128)

| קובץ | מצב | +/- | commits |
|---|---|---|---|
| `components/neo-shell/best-practices/bp-data.ts` | שונה | +2/-2 | 1fe5a3a5 b4f87193 |
| `components/neo-shell/best-practices/bp-list.tsx` | נוסף | +118/-0 | fab76fa6 05919eee |
| `components/neo-shell/best-practices/bp-view.tsx` | שונה | +36/-26 | db03d1d3 fab76fa6 6167e61e 05919eee b4f87193 |
| `components/neo-shell/books/book-hub.tsx` | שונה | +6/-20 | db03d1d3 fab76fa6 b5b5b634 b83d8382 beb3a89a b4f87193 |
| `components/neo-shell/books/book-shelf.tsx` | שונה | +4/-3 | db03d1d3 fab76fa6 b83d8382 |
| `components/neo-shell/books/book-toc.tsx` | שונה | +7/-3 | fab76fa6 |
| `components/neo-shell/books/books-data.ts` | שונה | +12/-10 | b5b5b634 42fa18ea 1fe5a3a5 b4f87193 |
| `components/neo-shell/books/links.ts` | שונה | +1/-1 | b5b5b634 |
| `components/neo-shell/books/quick-view.tsx` | שונה | +2/-9 | b5b5b634 b4f87193 |
| `components/neo-shell/books/resume.ts` | שונה | +1/-1 | b4f87193 |
| `components/neo-shell/centers/center-topics.tsx` | נוסף | +103/-0 | fab76fa6 b189c244 05919eee |
| `components/neo-shell/centers/centers-data.ts` | שונה | +1/-1 | b4f87193 |
| `components/neo-shell/centers/centers-view.tsx` | שונה | +41/-20 | db03d1d3 fab76fa6 b189c244 05919eee beb3a89a b4f87193 |
| `components/neo-shell/chat/context-bar.tsx` | שונה | +3/-2 | a6a56f22 |
| `components/neo-shell/chat/general-chat.tsx` | שונה | +3/-3 | a6a56f22 b4f87193 |
| `components/neo-shell/chat/library-chat.tsx` | שונה | +8/-7 | a6a56f22 b4f87193 |
| `components/neo-shell/chat/message.tsx` | שונה | +2/-2 | a6a56f22 |
| `components/neo-shell/cmd-key.tsx` | נוסף | +19/-0 | b4f87193 |
| `components/neo-shell/copy-id.tsx` | שונה | +5/-0 | 2ab75f0e |
| `components/neo-shell/data/catalog-match.ts` | נוסף | +124/-0 | b68cc5ff 013f0329 |
| `components/neo-shell/data/facet-sheet.tsx` | נוסף | +121/-0 | 013f0329 |
| `components/neo-shell/data/field-id.ts` | נוסף | +5/-0 | 6167e61e |
| `components/neo-shell/data/record-visit.tsx` | נוסף | +14/-0 | 6167e61e |
| `components/neo-shell/data/table-caps.ts` | נוסף | +29/-0 | 3b9e5583 |
| `components/neo-shell/data/tables-data.ts` | שונה | +2/-1 | 3b9e5583 |
| `components/neo-shell/data/tables-detail-view.tsx` | שונה | +87/-68 | d175dba7 3989d65e fab76fa6 6167e61e 05919eee d7461ae1 … |
| `components/neo-shell/data/tables-surface.tsx` | שונה | +63/-32 | b68cc5ff d175dba7 3989d65e fab76fa6 013f0329 d7461ae1 … |
| `components/neo-shell/data/transactions-surface.tsx` | שונה | +65/-48 | b68cc5ff fab76fa6 013f0329 05919eee 231328a2 3b9e5583 … |
| `components/neo-shell/data/tx-detail-view.tsx` | שונה | +63/-25 | d175dba7 db03d1d3 fab76fa6 6167e61e 05919eee 231328a2 … |
| `components/neo-shell/data/tx-detail.ts` | שונה | +59/-28 | 3b9e5583 1fe5a3a5 b4f87193 |
| `components/neo-shell/dock/dock-buttons.tsx` | נוסף | +56/-0 | 40035346 |
| `components/neo-shell/dock/dock-state.ts` | נוסף | +46/-0 | 40035346 |
| `components/neo-shell/dock/neo-dock.tsx` | שונה | +43/-73 | fab76fa6 40035346 beb3a89a b4f87193 |
| `components/neo-shell/dock/theme-switch.tsx` | שונה | +6/-2 | fab76fa6 202fdc23 |
| `components/neo-shell/dock/typography.ts` | שונה | +22/-15 | a6a56f22 beb3a89a |
| `components/neo-shell/domain/domain-data.ts` | שונה | +12/-8 | 3b9e5583 1fe5a3a5 |
| `components/neo-shell/domain/domain-hub-list.tsx` | שונה | +11/-7 | fab76fa6 1fe5a3a5 b4f87193 |
| `components/neo-shell/domain/domain-view.tsx` | שונה | +31/-24 | fab76fa6 b189c244 d7461ae1 beb3a89a 1fe5a3a5 b4f87193 |
| `components/neo-shell/erd/erd-catalog.ts` | שונה | +9/-4 | d175dba7 a673f893 |
| `components/neo-shell/erd/erd-inspector.tsx` | שונה | +6/-10 | f555cfb3 1fe5a3a5 b4f87193 |
| `components/neo-shell/erd/erd-sheet.tsx` | שונה | +10/-12 | 1fe5a3a5 b4f87193 |
| `components/neo-shell/erd/erd-types.ts` | שונה | +22/-33 | 42fa18ea 1fe5a3a5 |
| `components/neo-shell/erd/erd-workspace.tsx` | שונה | +175/-74 | a6a56f22 fab76fa6 f555cfb3 a673f893 98bf289a 04b6025d … |
| `components/neo-shell/erd/model.ts` | שונה | +1/-1 | 1fe5a3a5 |
| `components/neo-shell/evidence/evidence-block.tsx` | שונה | +26/-10 | fab76fa6 6167e61e 1fe5a3a5 b4f87193 |
| `components/neo-shell/evidence/record-status.tsx` | נוסף | +21/-0 | 05919eee |
| `components/neo-shell/evidence/repo-text.ts` | נוסף | +67/-0 | 6167e61e |
| `components/neo-shell/evidence/status-pill.tsx` | שונה | +13/-19 | fab76fa6 3b9e5583 |
| `components/neo-shell/focus.ts` | שונה | +20/-0 | fab76fa6 |
| `components/neo-shell/home/home-continue.tsx` | נוסף | +65/-0 | 137a05e1 8fdd65ca |
| `components/neo-shell/home/home-data.ts` | שונה | +25/-11 | d7461ae1 3b9e5583 1fe5a3a5 |
| `components/neo-shell/home/home-search.tsx` | נוסף | +27/-0 | 137a05e1 8fdd65ca |
| `components/neo-shell/home/home-zones.tsx` | שונה | +1/-1 | 1fe5a3a5 |
| `components/neo-shell/home/process-map.tsx` | נוסף | +104/-0 | 137a05e1 d7461ae1 8fdd65ca |
| `components/neo-shell/icon.tsx` | שונה | +6/-6 | 8de03566 |
| `components/neo-shell/lang.ts` | נוסף | +11/-0 | 3989d65e fab76fa6 |
| `components/neo-shell/learn/academy-surface.tsx` | שונה | +15/-11 | fab76fa6 6167e61e b4f87193 |
| `components/neo-shell/learn/cert-data.ts` | שונה | +1/-1 | 1fe5a3a5 |
| `components/neo-shell/learn/cert-exam.tsx` | שונה | +8/-4 | db03d1d3 fab76fa6 |
| `components/neo-shell/learn/cert-pick.tsx` | שונה | +1/-1 | 1fe5a3a5 |
| `components/neo-shell/learn/cert-surface.tsx` | שונה | +3/-4 | b4f87193 |
| `components/neo-shell/learn/concept-view.tsx` | שונה | +7/-10 | db03d1d3 fab76fa6 6167e61e b4f87193 |
| `components/neo-shell/learn/course-view.tsx` | שונה | +6/-13 | db03d1d3 fab76fa6 b5b5b634 6167e61e b4f87193 |
| `components/neo-shell/learn/incident-view.tsx` | שונה | +6/-5 | db03d1d3 6167e61e b4f87193 |
| `components/neo-shell/learn/incidents-data.ts` | שונה | +2/-2 | 1fe5a3a5 |
| `components/neo-shell/learn/incidents-surface.tsx` | שונה | +46/-32 | fab76fa6 6167e61e 05919eee b4f87193 |
| `components/neo-shell/learn/knowledge-surface.tsx` | שונה | +91/-72 | fab76fa6 6167e61e 05919eee b4f87193 |
| `components/neo-shell/learn/lesson-links.ts` | שונה | +15/-6 | b5b5b634 |
| `components/neo-shell/learn/lesson-neo-links.ts` | שונה | +39/-8 | b5b5b634 |
| `components/neo-shell/learn/lesson-view.tsx` | שונה | +6/-15 | db03d1d3 fab76fa6 b5b5b634 6167e61e b4f87193 |
| `components/neo-shell/learn/mod.ts` | שונה | +4/-4 | 1fe5a3a5 |
| `components/neo-shell/legal/legal-content.ts` | נוסף | +229/-0 | 22186616 d7461ae1 e5963a1b |
| `components/neo-shell/legal/legal-view.tsx` | נוסף | +61/-0 | beb3a89a |
| `components/neo-shell/mobile-nav.tsx` | שונה | +20/-4 | 2610ef1a fab76fa6 40035346 beb3a89a |
| `components/neo-shell/mod-var.ts` | שונה | +1/-1 | 1fe5a3a5 |
| `components/neo-shell/nav-context/fallbacks.ts` | שונה | +5/-5 | d7461ae1 1fe5a3a5 |
| `components/neo-shell/nav-context/smart-return.tsx` | שונה | +5/-3 | 04b6025d |
| `components/neo-shell/nav-data.ts` | שונה | +42/-53 | 8de03566 40035346 d7461ae1 8fdd65ca 1fe5a3a5 b4f87193 |
| `components/neo-shell/neo-shell.tsx` | שונה | +7/-1 | 42fa18ea |
| `components/neo-shell/object/object-aux-view.tsx` | שונה | +17/-12 | fab76fa6 05919eee beb3a89a 1fe5a3a5 b4f87193 |
| `components/neo-shell/object/object-aux.ts` | שונה | +4/-2 | d7461ae1 |
| `components/neo-shell/object/object-depth.tsx` | שונה | +3/-2 | db03d1d3 |
| `components/neo-shell/object/object-fields.tsx` | שונה | +13/-9 | db03d1d3 fab76fa6 6167e61e b4f87193 |
| `components/neo-shell/object/object-lanes.tsx` | שונה | +6/-9 | 6167e61e b4f87193 |
| `components/neo-shell/object/object-names.ts` | שונה | +14/-3 | d7461ae1 |
| `components/neo-shell/object/object-orbit.tsx` | שונה | +2/-2 | 1fe5a3a5 |
| `components/neo-shell/object/object-return.tsx` | שונה | +1/-1 | b4f87193 |
| `components/neo-shell/object/object-view.tsx` | שונה | +41/-26 | db03d1d3 fab76fa6 05919eee d7461ae1 beb3a89a 1fe5a3a5 … |
| `components/neo-shell/offline-retry.tsx` | נוסף | +27/-0 | b6fc3176 |
| `components/neo-shell/preview.tsx` | שונה | +1/-1 | b4f87193 |
| `components/neo-shell/reader/cited.ts` | נוסף | +69/-0 | 2610ef1a 6ab0084c |
| `components/neo-shell/reader/env.ts` | שונה | +18/-0 | b83d8382 |
| `components/neo-shell/reader/neo-reader.tsx` | שונה | +107/-36 | 2610ef1a dfcafdb6 6ab0084c 3989d65e fab76fa6 b5b5b634 … |
| `components/neo-shell/reader/progress-rail.tsx` | שונה | +14/-12 | 3989d65e fab76fa6 04b6025d |
| `components/neo-shell/reader/reader-panel.tsx` | שונה | +25/-6 | db03d1d3 fab76fa6 |
| `components/neo-shell/reader/section-body.tsx` | שונה | +3/-2 | fab76fa6 |
| `components/neo-shell/reference/bapi-data.ts` | שונה | +34/-15 | 05919eee 1fe5a3a5 b4f87193 |
| `components/neo-shell/reference/cds-data.ts` | שונה | +6/-7 | b4f87193 |
| `components/neo-shell/reference/enh-data.ts` | שונה | +5/-5 | 1fe5a3a5 b4f87193 |
| `components/neo-shell/reference/fiori-data.ts` | שונה | +6/-8 | 3b9e5583 1fe5a3a5 b4f87193 |
| `components/neo-shell/reference/idoc-data.ts` | שונה | +9/-9 | d7461ae1 b4f87193 |
| `components/neo-shell/reference/ref-detail-view.tsx` | שונה | +16/-8 | db03d1d3 fab76fa6 05919eee b4f87193 |
| `components/neo-shell/reference/ref-surface.tsx` | שונה | +23/-36 | b68cc5ff fab76fa6 013f0329 d7461ae1 b4f87193 |
| `components/neo-shell/s4/s4-catalog.tsx` | שונה | +24/-16 | fab76fa6 b189c244 3b9e5583 1fe5a3a5 b4f87193 |
| `components/neo-shell/s4/s4-data.ts` | שונה | +38/-12 | b189c244 3b9e5583 |
| `components/neo-shell/s4/s4-view.tsx` | שונה | +94/-52 | d175dba7 db03d1d3 fab76fa6 b189c244 d7461ae1 beb3a89a … |
| `components/neo-shell/search/build.ts` | שונה | +177/-97 | d175dba7 6b8584c0 40035346 |
| `components/neo-shell/search/command-index.ts` | שונה | +241/-101 | 6b8584c0 40035346 1fe5a3a5 b4f87193 |
| `components/neo-shell/search/command-surface.tsx` | שונה | +216/-165 | d175dba7 fab76fa6 6b8584c0 40035346 b4f87193 |
| `components/neo-shell/search/hebrew.ts` | נוסף | +59/-0 | 40035346 |
| `components/neo-shell/search/shell-client.tsx` | שונה | +507/-220 | 2610ef1a dfcafdb6 9dc3f2be db03d1d3 fab76fa6 6b8584c0 … |
| `components/neo-shell/search/types.ts` | שונה | +58/-13 | 6b8584c0 40035346 |
| `components/neo-shell/shelf.tsx` | שונה | +10/-5 | fab76fa6 f3534d0b b4f87193 |
| `components/neo-shell/site-footer.tsx` | נוסף | +20/-0 | beb3a89a |
| `components/neo-shell/studio/studio-view.tsx` | שונה | +67/-23 | fab76fa6 f555cfb3 a673f893 d7461ae1 3b9e5583 |
| `components/neo-shell/workspace/module-workspace.tsx` | שונה | +7/-8 | beb3a89a b4f87193 |
| `components/neo-shell/workspace/section-nav.css` | שונה | +33/-21 | fab76fa6 6167e61e |
| `components/neo-shell/workspace/section-nav.tsx` | שונה | +25/-1 | 3989d65e db03d1d3 6167e61e |
| `components/neo-shell/workspace/workspace-build.tsx` | שונה | +4/-4 | 1fe5a3a5 |
| `components/neo-shell/workspace/workspace-context.tsx` | שונה | +3/-4 | b4f87193 |
| `components/neo-shell/workspace/workspace-data.ts` | שונה | +6/-5 | b5b5b634 1fe5a3a5 |
| `components/neo-shell/workspace/workspace-header.tsx` | שונה | +4/-6 | 6167e61e b4f87193 |
| `components/neo-shell/workspace/workspace-iface.tsx` | שונה | +5/-5 | b4f87193 |
| `components/neo-shell/workspace/workspace-map.tsx` | שונה | +4/-4 | b4f87193 |
| `components/neo-shell/workspace/workspace-ops.tsx` | שונה | +2/-2 | 3b9e5583 b4f87193 |
| `components/neo-shell/workspace/workspace-s4.tsx` | שונה | +13/-14 | 3b9e5583 1fe5a3a5 b4f87193 |
| `components/neo-shell/workspace/workspace-sheet.tsx` | שונה | +4/-3 | fab76fa6 |
| `components/neo-shell/workspace/workspace-table.tsx` | שונה | +4/-4 | d175dba7 b4f87193 |

## Direction boards (Phase 3) (24)

| קובץ | מצב | +/- | commits |
|---|---|---|---|
| `app/design/redesign-2026/atlas/README.md` | נוסף | +58/-0 | 255dfec5 |
| `app/design/redesign-2026/atlas/atlas-data.ts` | נוסף | +494/-0 | 255dfec5 |
| `app/design/redesign-2026/atlas/atlas-map.tsx` | נוסף | +289/-0 | 255dfec5 |
| `app/design/redesign-2026/atlas/board.css` | נוסף | +1020/-0 | 255dfec5 |
| `app/design/redesign-2026/atlas/copy-code.tsx` | נוסף | +31/-0 | 255dfec5 |
| `app/design/redesign-2026/atlas/mode.tsx` | נוסף | +53/-0 | 255dfec5 |
| `app/design/redesign-2026/atlas/page.tsx` | נוסף | +1144/-0 | 42fa18ea 255dfec5 |
| `app/design/redesign-2026/editorial/README.md` | נוסף | +87/-0 | 255dfec5 |
| `app/design/redesign-2026/editorial/board.css` | נוסף | +1315/-0 | 255dfec5 |
| `app/design/redesign-2026/editorial/client.tsx` | נוסף | +418/-0 | 255dfec5 |
| `app/design/redesign-2026/editorial/lib.ts` | נוסף | +158/-0 | 255dfec5 |
| `app/design/redesign-2026/editorial/page.tsx` | נוסף | +1854/-0 | 42fa18ea 255dfec5 |
| `app/design/redesign-2026/motion/codes.ts` | נוסף | +3/-0 | 255dfec5 |
| `app/design/redesign-2026/motion/flow-map.tsx` | נוסף | +68/-0 | 255dfec5 |
| `app/design/redesign-2026/motion/mode-toggle.tsx` | נוסף | +28/-0 | 255dfec5 |
| `app/design/redesign-2026/motion/motion.css` | נוסף | +120/-0 | 255dfec5 |
| `app/design/redesign-2026/motion/page.tsx` | נוסף | +63/-0 | 42fa18ea 255dfec5 |
| `app/design/redesign-2026/motion/tx/[code]/page.tsx` | נוסף | +57/-0 | 42fa18ea 255dfec5 |
| `app/design/redesign-2026/workbench/README.md` | נוסף | +109/-0 | 255dfec5 |
| `app/design/redesign-2026/workbench/board.css` | נוסף | +3470/-0 | 255dfec5 |
| `app/design/redesign-2026/workbench/client.tsx` | נוסף | +475/-0 | 255dfec5 |
| `app/design/redesign-2026/workbench/data.ts` | נוסף | +570/-0 | 255dfec5 |
| `app/design/redesign-2026/workbench/marks.tsx` | נוסף | +139/-0 | 255dfec5 |
| `app/design/redesign-2026/workbench/page.tsx` | נוסף | +1196/-0 | 42fa18ea 255dfec5 |

## Self-hosted fonts (OFL) (25)

| קובץ | מצב | +/- | commits |
|---|---|---|---|
| `app/fonts/assistant.ts` | נוסף | +25/-0 | 42fa18ea |
| `app/fonts/assistant/OFL.txt` | נוסף | +93/-0 | 243e2349 |
| `app/fonts/assistant/assistant-hebrew-wght-normal.woff2` | נוסף | +-/-- | 243e2349 |
| `app/fonts/assistant/assistant-latin-wght-normal.woff2` | נוסף | +-/-- | 243e2349 |
| `app/fonts/frank-ruhl-libre/OFL.txt` | נוסף | +93/-0 | 243e2349 |
| `app/fonts/frank-ruhl-libre/frank-ruhl-libre-hebrew-wght-normal.woff2` | נוסף | +-/-- | 243e2349 |
| `app/fonts/frank-ruhl-libre/frank-ruhl-libre-latin-wght-normal.woff2` | נוסף | +-/-- | 243e2349 |
| `app/fonts/frank.ts` | נוסף | +36/-0 | 31d39b4d 1c8d293b 41ff9b15 42fa18ea |
| `app/fonts/jetbrains-mono/OFL.txt` | נוסף | +93/-0 | 243e2349 |
| `app/fonts/jetbrains-mono/jetbrains-mono-latin-wght-normal.woff2` | נוסף | +-/-- | 243e2349 |
| `app/fonts/jetbrains.ts` | נוסף | +16/-0 | 42fa18ea |
| `app/fonts/plex-mono/OFL.txt` | נוסף | +93/-0 | 243e2349 |
| `app/fonts/plex-mono/ibm-plex-mono-latin-400-normal.woff2` | נוסף | +-/-- | 243e2349 |
| `app/fonts/plex-mono/ibm-plex-mono-latin-500-normal.woff2` | נוסף | +-/-- | 243e2349 |
| `app/fonts/plex-mono/ibm-plex-mono-latin-600-normal.woff2` | נוסף | +-/-- | 243e2349 |
| `app/fonts/plex-sans-hebrew/OFL.txt` | נוסף | +93/-0 | 243e2349 |
| `app/fonts/plex-sans-hebrew/ibm-plex-sans-hebrew-hebrew-400-normal.woff2` | נוסף | +-/-- | 243e2349 |
| `app/fonts/plex-sans-hebrew/ibm-plex-sans-hebrew-hebrew-500-normal.woff2` | נוסף | +-/-- | 243e2349 |
| `app/fonts/plex-sans-hebrew/ibm-plex-sans-hebrew-hebrew-600-normal.woff2` | נוסף | +-/-- | 243e2349 |
| `app/fonts/plex-sans-hebrew/ibm-plex-sans-hebrew-hebrew-700-normal.woff2` | נוסף | +-/-- | 243e2349 |
| `app/fonts/plex-sans-hebrew/ibm-plex-sans-hebrew-latin-400-normal.woff2` | נוסף | +-/-- | 243e2349 |
| `app/fonts/plex-sans-hebrew/ibm-plex-sans-hebrew-latin-500-normal.woff2` | נוסף | +-/-- | 243e2349 |
| `app/fonts/plex-sans-hebrew/ibm-plex-sans-hebrew-latin-600-normal.woff2` | נוסף | +-/-- | 243e2349 |
| `app/fonts/plex-sans-hebrew/ibm-plex-sans-hebrew-latin-700-normal.woff2` | נוסף | +-/-- | 243e2349 |
| `app/fonts/plex.ts` | נוסף | +53/-0 | dfcafdb6 41ff9b15 42fa18ea 3b9e5583 |

## Other app files (8)

| קובץ | מצב | +/- | commits |
|---|---|---|---|
| `app/error.tsx` | שונה | +3/-3 | b4f87193 |
| `app/global-error.tsx` | שונה | +2/-2 | b4f87193 |
| `app/globals.css` | שונה | +119/-60 | d175dba7 a6a56f22 db03d1d3 fab76fa6 1c8d293b f41dfc2a … |
| `app/layout.tsx` | שונה | +4/-4 | b4f87193 |
| `app/loading.tsx` | שונה | +1/-1 | b4f87193 |
| `app/manifest.ts` | שונה | +4/-4 | b4f87193 |
| `app/not-found.tsx` | שונה | +41/-30 | d175dba7 fab76fa6 7b8db044 04b6025d b4f87193 |
| `app/privacy/page.tsx` | שונה | +13/-75 | beb3a89a |

## Shared libraries (11)

| קובץ | מצב | +/- | commits |
|---|---|---|---|
| `lib/ai/links.ts` | שונה | +4/-1 | b5b5b634 |
| `lib/device.ts` | שונה | +7/-0 | 202fdc23 |
| `lib/evidence/s4-status.ts` | שונה | +13/-4 | 3b9e5583 |
| `lib/evidence/types.ts` | שונה | +75/-26 | 04b6025d 3b9e5583 |
| `lib/i18n.tsx` | שונה | +3/-1 | beb3a89a |
| `lib/primary-module.ts` | שונה | +1/-1 | d7461ae1 |
| `lib/s4-readiness.ts` | שונה | +18/-13 | 3b9e5583 1fe5a3a5 |
| `lib/seo.ts` | שונה | +6/-1 | b4f87193 |
| `lib/studio-graph.ts` | שונה | +41/-25 | d175dba7 a673f893 d7461ae1 beb3a89a 3b9e5583 |
| `lib/theme-boot.ts` | שונה | +17/-1 | a6a56f22 |
| `lib/use-dialog.ts` | שונה | +12/-4 | fab76fa6 |

## Tools and checks (16)

| קובץ | מצב | +/- | commits |
|---|---|---|---|
| `scripts/check-prod.mjs` | שונה | +14/-3 | 7a640cff |
| `scripts/gen-legacy-redirects.mjs` | נוסף | +240/-0 | b6fc3176 b5b5b634 |
| `scripts/qa/a11y-sample.mjs` | שונה | +3/-0 | 92a6af75 |
| `scripts/qa/astra-extra-check.mjs` | שונה | +25/-19 | 1e3a62f7 |
| `scripts/qa/astra-reverify.mjs` | שונה | +13/-9 | b72d53bf |
| `scripts/qa/dock-check.mjs` | שונה | +12/-3 | 1e3a62f7 |
| `scripts/qa/keyboard-check.mjs` | שונה | +18/-2 | 86a00f73 1c8d293b |
| `scripts/qa/module-colour-check.mjs` | שונה | +11/-5 | 7a640cff |
| `scripts/qa/present-check.mjs` | שונה | +7/-4 | b72d53bf |
| `scripts/qa/r3-check.mjs` | שונה | +3/-1 | b72d53bf |
| `scripts/qa/r3b-check.mjs` | שונה | +3/-1 | b72d53bf |
| `scripts/qa/r3d-check.mjs` | שונה | +6/-2 | b72d53bf |
| `scripts/qa/round6-misc-check.mjs` | שונה | +2/-1 | 1e3a62f7 |
| `scripts/qa/status-consistency.mjs` | שונה | +4/-1 | 9dc3f2be |
| `scripts/serve-out.py` | שונה | +92/-3 | 9dc3f2be b5b5b634 7da3441e b529a60e 68a9157a |
| `scripts/verify-reader.mjs` | שונה | +42/-23 | 2610ef1a 6ab0084c |

## Unit tests (14)

| קובץ | מצב | +/- | commits |
|---|---|---|---|
| `test/academy-course-links.test.ts` | נוסף | +45/-0 | b5b5b634 |
| `test/app-modules.mjs` | נוסף | +14/-0 | 3b9e5583 |
| `test/citation-href.test.ts` | שונה | +4/-2 | b5b5b634 |
| `test/content-catalog-match.test.ts` | נוסף | +74/-0 | b68cc5ff 013f0329 |
| `test/content-repo-text.test.ts` | נוסף | +40/-0 | 6167e61e |
| `test/home-flows.test.ts` | נוסף | +77/-0 | d7461ae1 |
| `test/object-names.test.ts` | נוסף | +24/-0 | d7461ae1 |
| `test/pages-reader-sticky.test.ts` | נוסף | +36/-0 | b83d8382 |
| `test/pages-s4-status.test.ts` | נוסף | +35/-0 | b189c244 |
| `test/s4-status.test.ts` | שונה | +7/-6 | 04b6025d 3b9e5583 |
| `test/sap-correctness.test.ts` | נוסף | +157/-0 | 3b9e5583 |
| `test/search-index-routes.test.ts` | נוסף | +159/-0 | 6b8584c0 40035346 |
| `test/search-query.test.ts` | נוסף | +81/-0 | 6b8584c0 40035346 |
| `test/status-group.test.ts` | שונה | +66/-17 | 3b9e5583 |

## Documents (41)

| קובץ | מצב | +/- | commits |
|---|---|---|---|
| `docs/redesign-2026-09/ASTRA-CRITERIA.md` | נוסף | +59/-0 | b72d53bf |
| `docs/redesign-2026-09/BAKEOFF.md` | נוסף | +83/-0 | 255dfec5 |
| `docs/redesign-2026-09/BASELINE.md` | נוסף | +93/-0 | 243e2349 |
| `docs/redesign-2026-09/BLOCKERS.md` | נוסף | +69/-0 | 25249774 32089ffb d175dba7 3989d65e 109975d2 |
| `docs/redesign-2026-09/BOARD-SPEC.md` | נוסף | +51/-0 | 98bf289a 243e2349 |
| `docs/redesign-2026-09/COMPONENTS.md` | נוסף | +101/-0 | 32089ffb 3989d65e 2ab75f0e |
| `docs/redesign-2026-09/COPY-AUDIT.md` | נוסף | +445/-0 | 1fe5a3a5 b4f87193 |
| `docs/redesign-2026-09/DELIVERY.md` | נוסף | +47/-0 | 25249774 d175dba7 |
| `docs/redesign-2026-09/DEPENDENCIES.md` | נוסף | +27/-0 | 32089ffb 12930a2b |
| `docs/redesign-2026-09/DESIGN-BRIEF.md` | נוסף | +67/-0 | 243e2349 |
| `docs/redesign-2026-09/DESIGN-SPEC.md` | נוסף | +83/-0 | d7461ae1 243e2349 |
| `docs/redesign-2026-09/LEGAL-READINESS.md` | נוסף | +375/-0 | cd95f6c7 |
| `docs/redesign-2026-09/MATRIX.md` | נוסף | +90/-0 | 25249774 |
| `docs/redesign-2026-09/MERGE-PLAN.md` | נוסף | +49/-0 | 25249774 32089ffb 12930a2b |
| `docs/redesign-2026-09/MOTION.md` | נוסף | +78/-0 | 3989d65e 109975d2 ffd0f265 |
| `docs/redesign-2026-09/NAV-LEGACY.md` | נוסף | +134/-0 | d175dba7 8c9eb5eb |
| `docs/redesign-2026-09/PLAN.md` | נוסף | +35/-0 | 243e2349 |
| `docs/redesign-2026-09/PROGRESS.md` | נוסף | +62/-0 | 25249774 32089ffb 63eb7549 3989d65e 188761a5 e5963a1b … |
| `docs/redesign-2026-09/REVIEW-GUIDE.md` | נוסף | +66/-0 | 32089ffb 3989d65e 109975d2 |
| `docs/redesign-2026-09/SIDE-TABS.md` | נוסף | +121/-0 | a6a56f22 109975d2 04b6025d |
| `docs/redesign-2026-09/SYSTEM-MAP.md` | נוסף | +58/-0 | 243e2349 |
| `docs/redesign-2026-09/TOKENS.md` | נוסף | +128/-0 | 32089ffb d175dba7 3989d65e 109975d2 98bf289a 42fa18ea |
| `docs/redesign-2026-09/TRACEABILITY.md` | נוסף | +171/-0 | 66c85fd9 |
| `docs/redesign-2026-09/copy-audit-candidates.md` | נוסף | +397/-0 | cd95f6c7 |
| `docs/redesign-2026-09/reviews/CLOSURE.md` | נוסף | +235/-0 | 25249774 37a7b3a2 |
| `docs/redesign-2026-09/reviews/bakeoff-judge-eng.md` | נוסף | +139/-0 | 255dfec5 |
| `docs/redesign-2026-09/reviews/bakeoff-judge-ux.md` | נוסף | +119/-0 | 255dfec5 |
| `docs/redesign-2026-09/reviews/bakeoff-judge-visual.md` | נוסף | +105/-0 | 255dfec5 |
| `docs/redesign-2026-09/reviews/content-review-copy-sap.md` | נוסף | +280/-0 | 255dfec5 |
| `docs/redesign-2026-09/reviews/gate-01-content-quality.md` | נוסף | +86/-0 | d7461ae1 |
| `docs/redesign-2026-09/reviews/gate-02-knowledge-architecture.md` | נוסף | +157/-0 | d7461ae1 |
| `docs/redesign-2026-09/reviews/gate-03-visual-design.md` | נוסף | +110/-0 | a673f893 |
| `docs/redesign-2026-09/reviews/gate-04-adaptive-ui.md` | נוסף | +95/-0 | a673f893 |
| `docs/redesign-2026-09/reviews/gate-05-enterprise-ux.md` | נוסף | +118/-0 | f555cfb3 |
| `docs/redesign-2026-09/reviews/gate-06-search.md` | נוסף | +108/-0 | a673f893 |
| `docs/redesign-2026-09/reviews/gate-07-erd-studio.md` | נוסף | +108/-0 | a673f893 |
| `docs/redesign-2026-09/reviews/gate-08-accessibility.md` | נוסף | +153/-0 | 31ae7164 |
| `docs/redesign-2026-09/reviews/gate-09-performance.md` | נוסף | +254/-0 | 31ae7164 |
| `docs/redesign-2026-09/reviews/gate-10-impeccable.md` | נוסף | +98/-0 | a6a56f22 |
| `docs/redesign-2026-09/reviews/gate-11-final-ux.md` | נוסף | +346/-0 | 37a7b3a2 |
| `docs/redesign-2026-09/reviews/sap-correctness.md` | נוסף | +181/-0 | 3b9e5583 |

## Static files (2)

| קובץ | מצב | +/- | commits |
|---|---|---|---|
| `public/sap-infrastructure/dataset.json` | שונה | +1/-1 | 1fe5a3a5 |
| `public/sw.js` | שונה | +37/-9 | d175dba7 b6fc3176 b5b5b634 |

## Configuration and other (5)

| קובץ | מצב | +/- | commits |
|---|---|---|---|
| `components/Footer.tsx` | שונה | +12/-3 | 7b8db044 beb3a89a b4f87193 |
| `components/app-shell.tsx` | שונה | +19/-6 | 7da3441e e5963a1b b4f87193 |
| `components/architecture-studio.tsx` | שונה | +8/-6 | 3b9e5583 |
| `types/react-canary.d.ts` | נוסף | +3/-0 | e5963a1b |
| `vercel.json` | שונה | +2650/-19 | b6fc3176 b5b5b634 |

