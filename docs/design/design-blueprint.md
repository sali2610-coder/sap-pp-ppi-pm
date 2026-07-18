# SAP by Sali — Design Blueprint (master)

**סוג:** תיעוד בלבד. אפס שינוי קוד/CSS/route. זהו הבלופרינט הוויזואלי + UX שמנחה כל מימוש עתידי.
**מטרה:** כל דף, פיצ'ר ומודול עתידי מרגיש כאילו עוצב ע"י אותו צוות באותו יום.
**נגזר מ:** הקוד בפועל (`app/globals.css`, `lib/motion.ts`, `components/**`) — לא מומצא. כל טענה עם file:line.

## מפת המסמכים
| מסמך | תוכן |
|------|------|
| **design-blueprint.md** (זה) | אינדקס + Academy Blueprint + Library Blueprint + Knowledge Pages + Search Experience + Future Modules + Freeze |
| `design-principles.md` | שפת העיצוב הגלובלית: עקרונות, צבע, טיפוגרפיה, spacing, elevation, cards, grids, responsive, RTL |
| `component-catalog.md` | הגרסה הקנונית של כל קומפוננטה חוזרת |
| `motion-system.md` | כל עקרונות התנועה (מהקיים) + סטנדרט עתידי |
| `design-tokens-plan.md` | מבנה `tokens.json` העתידי (docs-only, נגזר 1:1 מהקיים) |

**עיקרון-על:** כל פיצ'ר עומד בשני סטנדרטים שווי-מעמד: **סטנדרט התוכן** + **סטנדרט העיצוב**. אף פיצ'ר לא פטור מ-Design Review.

---

## 1. Global Design Language → `design-principles.md`

5 עקרונות ליבה: Neutral-first (אדום מבטא בלבד) · One card system · Elevation over borders · Restraint + craft · Offline/RTL/Presentation-ready. פירוט מלא (צבע/טיפוגרפיה/spacing/elevation/grids/responsive/RTL) במסמך העקרונות.

## 2. Component Library → `component-catalog.md`

3 שכבות: Primitives (Button/Card/Badge/EmptyState/Skeleton) · Patterns (Chip/DataTable/Timeline/Overlay/Filters/Callouts) · Domain (Learning/Reference/Search/Nav/Studio). כל קומפוננטה עם anatomy/variants/interaction/animation/a11y/reuse.

---

## 3. Academy Blueprint (חוויית הלמידה הקנונית)

הבסיס: מנוע בלוקים data-driven (`lib/academy/lesson-types.ts`) — שיעור = רשימת בלוקים מסודרת. תוכן חדש = data file בלבד, אפס שינוי קומפוננטה.

### 3.1 Academy Home (`academy-home.tsx`)
אזורים בסדר: Hero("ברוך שובך" + streak) → gamification ring → roadmap chapter carousel(lock states) → tracks grid(PM/PP-PI/QM, progress rings) → badges(5) → recently-viewed → updated + popular. motion: `heroAnim` + `rise` (in-view once). accent PM `#f97316`.

### 3.2 Learning Path (`learning-path.tsx`)
- **מבנה:** `LearningPath{module,title,chapters[],currentChapter}`. PM=7 פרקים(pilot בפרק 3), PP-PI=6, QM=5.
- **PathChapter card:** timeline gutter + circle badge(number/lock/complete, current=path.color + ring) + card(h3 + lesson-count + "אתה כאן") + nested lessons(unlocked link / upcoming opacity-55 + "בקרוב").
- **state machine:** available(done) / cur(current, shadow) / upcoming(locked). progress `pctTrack = (currentChapter+pilotPct)/chapters`.

### 3.3 Lesson (`lesson-view.tsx` + `lesson-types.ts`)
- **23 BlockKinds ב-BLOCK_ORDER קבוע.** core spine חובה (6): objective · why · business-value · where-used · key-concepts · summary. שאר הבלוקים render רק אם יש תוכן.
- **Block:** motion.section rounded-2xl border-hairline + accent tone-bar(per-kind color) + collapsible header(emoji-well + heading + SourceChip trust + chevron) + AnimatePresence body.
- **BlockBody per kind:** objective/summary(surface-2 box) · key-concepts(brand-dot bullets) · mistakes(warning box) · tips/best-practices(teal box) · flow(step chips, active brand) · diagram(dashed placeholder) · tables(code|he, copy) · tcodes/fiori/objects(CodeChip + copy) · quiz(reveal-on-pick).
- **Header:** breadcrumb Academy›module›course›lesson · prev/next chaining · mobile sticky progress rail.

### 3.4 Progress · Quiz · Review · Completion
- **progress (`lesson-progress.ts`):** `neo:academy:progress` = Record<slug, kinds[]>; completion **אוטומטי on scroll-into-view** (IntersectionObserver 30%), לא פעולה מפורשת. pct = doneSet/visibleKinds.
- **gamification (`gamification.ts`):** `neo:academy:activity`; streak(yesterday grace + longest) · weekly target 3 · 5 badges(first/blocks10/streak3/streak7/lesson). completion celebration = confetti (reduced-motion safe).
- **quiz:** multi-choice, reveal correct + explain on pick.
- **recent (`recent.ts`):** `neo:academy:recent`, max 8, dedup.

### 3.5 Cross-links · Related Objects · Reading
- **CodeChip:** ref{code,label?,href?} → SmartLink אם route קיים ב-manifest, אחרת span (אין לינק מת) + CopyBtn תמיד.
- **related block:** cross-links דו-כיווניים לאובייקטי SAP + שיעורים אחרים.
- **trust:** SourceChip color-coded(verified-docs teal / verified-system emerald / curated / needs-review amber) + source + lastReviewed.

### 3.6 חוק Academy למודול חדש
מודול חדש = data file חדש (`{module}-generated.ts`) + entry ב-`PATHS`/`ALL_LESSONS`. concept-per-lesson (אין collapse). core spine 6 בלוקים חובה. coverage 100% מול source. **אפס שינוי במנוע או בחוויה** — היא מוקפאת.

---

## 4. Library Blueprint (מתעד למה זה עובד — FROZEN)

> **אין לעצב מחדש את ה-Reader.** התיעוד מסביר למה כל בחירה עובדת ומה מימוש עתידי חייב לכבד.

### 4.1 Bookshelf (`app/library/page.tsx`)
adaptive hero: ביקור ראשון = cinematic(grid bg + brand glow + counters), חוזר = compact editorial(שומר גובה למדף) — flag `neo:lib:visited`. ResumeStrip(continuity) · search/filter(module chips) · BookGrid(2→lg:4→xl:5) + Shelf spine rail. BookPeek modal(Esc-close only, לא backdrop). **למה:** hero adaptive מכבד ביקור-חוזר; Esc-only מונע חיכוך בגלישה רצופה.

### 4.2 Book Covers (`book-cover.tsx`) — 100% pure-CSS
MODULE_COLORS + `cloth()` radial(מרקם בד) + binding spine(RTL right) + fore-edge + head sheen + foil glint(hover) + watermark glyph + title(line-clamp per size), aspect 3:4. Spine width = `max(38,min(64,34+pages/26))`. **למה:** דטרמיניסטי ממטא-דאטה בלבד → offline, first-paint מהיר, אפס CDN. spine-width scaling מונע "גדר עמודים". **מימוש עתידי חייב:** לשמור pure-CSS + width function.

### 4.3 Reader (`book-reader.tsx`)
view: hebrew(single-col) / bilingual(EN‖HE) — `resolveReaderView()` device+choice. mode: scroll / page. theme: original/sepia/night(מגדיר מחדש טוקנים ל-pane בלבד, `globals.css:687-701`). size: sm/md/lg/xl. measure: narrow/normal/wide(58/74/96rem). settings = bottom-sheet(mobile)/side-panel(desktop), scoped ל-pane. **למה:** themes scoped ל-`.neo-reader` בלבד — לא נוגעים ב-app chrome.

### 4.4 Chapter Reader + Figures (`chapter-reader.tsx` + `section-spread.tsx`)
lazy-mount(IntersectionObserver 1400px margin) + reserved-height placeholder(אנטי-CLS). `placeFigures()` = proportional page-band bucketing. InlineFigure: max-width min(42rem,fig.w), neo-skel skeleton, layoutId morph. SectionSpread: hebrew(single 64ch + English `<details>`) / bilingual(grid EN|spine|HE). **למה:** lazy-mount → ספר 500-סקציות נפתח <1s. figure bucketing = המיפוי הכי בטוח offline (אין page-number metadata). **מימוש עתידי חייב:** לשמור lazy-mount + reserved-height.

### 4.5 Figure Viewer (`figure-viewer.tsx`)
pinch/wheel zoom 1-4× · drag pan · dbl-click 1↔2× · keyboard(Esc/←→ RTL/±/0) · focus-trap · shared-element morph(SPRING_MORPH, layoutId). zoom על wrapper חיצוני, לא על content. **למה:** wrapper-zoom מונע jank/pointer-capture. morph = גשר מרחבי (figure "מתקרב במקום").

### 4.6 Page-turn (`page-view.tsx`)
measured-block pagination(Option B): מדידת leaf blocks, breaks שלא חוצים בלוק, page = חלון בגובה קבוע. CSS multicol **ננטש** (blank pages). **מימוש עתידי חייב:** לא לחזור ל-multicol; לא לשנות BLOCKS selector בלי בדיקה.

### 4.7 Deep Links · Anchors · Progressive Disclosure
`neo:continuity:v1`(pointer יחיד bookId+href+chapter+scrollRatio) · anchors `#ch-N`/`#sec-*`/`#fig-*` + scroll-mt-24(אנטי scroll-under) · `neo:reader:goto` event · progressive disclosure(`<details>` — תוכן תמיד ב-DOM, search-safe). **מימוש עתידי חייב:** לשמור מפתחות localStorage + anchors (שינוי = migration + אישור).

---

## 5. Knowledge Pages (התבניות הקנוניות)

תבנית סגורה לכל סוג. אזורים קבועים: **Breadcrumb → Header(eyebrow/title/metrics/actions) → [Filters] → Content → Related/Cross-links → Continue/Footer.**

### 5.1 Module Portal (`module-portal.tsx` + `lib/module-portal.ts`)
Breadcrumb → doc-header(eyebrow-2 + H1 + module badge + metrics row[טבלאות·שדות·נושאים·T-Codes·BAPIs·CDS·Fiori] + actions[Studio/מרכז-ידע]) → business-process glance(flow bar) → **section directory(grid-adaptive, 14 NAV_SECTIONS)**: overview·business-process·master-data·transactions·tables·relationships·configuration·integration·bapis·cds·fiori·enhancements·troubleshooting·related·best-practices·ecc-s4. ModuleCard כל אחד.

### 5.2 Module Section (`module-section.tsx`)
Breadcrumb → header(icon-well `{accent}1f` + eyebrow-2 + H1 + desc) → learn-bar(זמן·פריטים·רמה·חלק X/N) → **SectionBody(switch 16-way)** → continue(next section card + prev/all). כל סקציה מרנדרת קומפוננטה ייעודית:
- master-data → MasterDataFacets / chip grid · tables → scrollspy + grid-adaptive-sm · transactions → CodeChips · bapis → hub link · configuration → ConfigTree(PP-PI)/table · business-process → ProcessFlow timeline · integration → IDocs+BAPIs · troubleshooting → incident cards.

### 5.3 Master Data (`master-data-facets.tsx`)
FacetCard(accordion): accent bar + header(icon-well + eyebrow en + h3 he + whatIs + read-min + chevron) + body(whatIs · businessValue box · owner/whenCreated/deps/CBC panels · tables/tcodes/links chips). SectionScrollSpy(desktop). data shape: `MasterDataFacet{code,he,en,whatIs,businessValue,owner,tables,tcodes,...}`.

### 5.4 Transactions (`transaction-workspace.tsx` — ONE center)
metrics(4-up) → view toggles(all/popular/fav/recent) → smart search(+ "מתועד"/"Fiori" toggles) → filter rows(module/topic/object) → TransactionCard grid(sm:2/xl:3, star, מתועד/מאומת/Fiori/flame/פתח). כל T-Code → `/tcode/[code]`.

### 5.5 Tables / FieldsTable (`fields-table.tsx`)
desktop `<table>` sticky-header + key badges(PK brand/FK in-conversion); mobile card-transform + sticky key column. `.neo-table` responsive.

### 5.6 Reference / Object page (`object-workspace.tsx` + `object-expert.tsx`)
Breadcrumb → header(eyebrow-2 + mono H1 + Table/module badges + FavStar + actions) → **sticky tab bar(10 tabs: wiki/overview/consultant/intel/relations/flow/technical/learning/trouble/notes)** → tab content(motion). ObjectExpert = **8 סקציות יועץ**(usage/behavior/lifecycle/deps/assets/examples/trouble/qa) + sticky "בעמוד" nav + trust indicator.

### 5.7 BAPI page (`bapi-object-page.tsx` — full-page hub)
Breadcrumb → hero(inset top-bar brand/ink-1 + icon-well + mono title + badge row + pill row[verification/difficulty/stability/COMMIT/BOR] + actions) → sections A-J(ECC↔S/4 · what/why/when · input/output params · related · failures · verification · flows).

### 5.8 Explorers (CDS/IDoc/Exits/Enhancements/Fiori/Function) — pattern משותף
stats grid(4) → intro(optional flow) → controls(search + module filter buttons) → count → content grid(ChainCard/StatusCard/etc, lg:2) → EmptyState. **CenterHeader** קנוני: eyebrow + title + subtitle + accent-color prop.

### 5.9 Architecture / Studio (`architecture-studio.tsx` — FROZEN frame)
module selector + mode toolbar(9 modes) + filter panel + presentation toggle + demo controls + zoom controls + SVG hetero canvas. full-bleed(חריג ל-container).

### 5.10 Troubleshooting / Incidents (`incident-explorer.tsx`)
search+filter(module chips ALL/PM/PP/PP-PI/Cross) → count → IncidentCard grid(sm:2): icon(ShieldAlert) + module badge + h3 + symptom(clamp-2) + error badge.

### 5.11 Business Processes (`process-flow.tsx`)
PhaseSection(icon-well + eyebrow-2 + h3 + count) + `<ol>` gradient gutter + StepCard(numbered accent circle + obj link + tcode chip + table chips + output box + expandable mistakes). Timeline קנוני.

---

## 6. Search Experience

### 6.1 Command Palette ⌘K (`command-palette.tsx`)
Dialog + search input(+ close hint) + sections: **Recent**(chips) · **Suggestions**(empty state, curated) · **Results**(grouped by kind: pages/tables/tcodes/bapi/fm/idoc/cds/domain/process/field/fiori/library). result row = icon + Highlight(match) label + sub(module/desc) + module tag + verification badge. keyboard: ↑↓ cycle · Enter open · Esc close.

### 6.2 Omni-search (`omni-search.tsx`)
spotlight button + Search icon + placeholder + kbd hint(⌘K/Ctrl K), hover:border-brand/40. click → `dispatchEvent("neo:open-palette")`.

### 6.3 Object Preview / Peek (`object-peek.tsx`)
bottom sheet(slide-up, rounded-3xl top, focus-trap/Esc/scroll-lock) + header(kind icon + mono name + kind badge + close + star) + module badge + desc + meta(counts/verification) + quick actions(chips) + **related strip(tap→re-peek in-place)**.

### 6.4 Filters · Keyboard · Related · Breadcrumbs
filters = module/topic/object button rows(inactive surface-2 / active module-color). keyboard-first(⌘K מכל דף, full keyboard nav). related-objects strip בכל דף אובייקט. breadcrumbs(ArrowLeft RTL, hover:text-brand) + GlobalBack(history-or-parent).

### 6.5 חוקי חיפוש
דירוג: קוד-מדויק > כותרת > מושג > גוף. synonyms HE/EN(`neo:...`). offline static index. פיצ'ר בלי רישום בחיפוש = לא עובר Gate. חוויית ⌘K זהה מכל דף.

---

## 7. Motion System → `motion-system.md`

DUR(fast .12/base .24/page .32/slow .5) · EASE.out חתימה · SPRING_MORPH יחיד(260/30) · transform+opacity בלבד · reduced-motion חובה · אין CLS. פירוט מלא + מילון כל האנימציות במסמך התנועה.

## 8. Design Tokens → `design-tokens-plan.md`

מבנה `tokens.json` עתידי(color/type/spacing/radius/shadow/transition/z/icon/breakpoint), נגזר 1:1 מ-`globals.css`. שלוש שכבות(primitive→semantic→component). docs-only היום.

---

## 9. Freeze Rules (ויזואלי — אסור בלי אישור Sali)

מפה מלאה: `docs/architecture/v4-freeze-protection-map.md`. מוקפאים ויזואלית: **Reader** (כל מצבי קריאה/page-turn/figure-viewer/themes) · **Bookshelf + Book Covers** · **Academy identity**(Block/tone-bars/timeline/ring/celebration) · **Motion style**(`lib/motion.ts`) · **Navigation behavior**(sidebar/tab-bar/⌘K/breadcrumbs) · **Design tokens v2**(95 vars). שינוי גלובלי = Design Review מלא + רגרסיה ויזואלית.

---

## 10. Future Modules (MM · SD · FI · CO · QM · WM · EWM · BTP)

**חוק:** מודול חדש **יורש** את שפת העיצוב — לא ממציא. Playbook:
1. **בוחר accent אחד** ממשפחת module-colors (MM `#d97706`, WM `#7c3aed`, וכו') — לא צבע חדש.
2. **Portal** = ModulePortal template + 14 NAV_SECTIONS (זהה ל-PM/PP-PI).
3. **Learning** = Academy blueprint(§3): `{module}-generated.ts` + PATH, concept-per-lesson, core spine 6, coverage 100%.
4. **Reference** = Object/Explorer templates(§5.6-5.8) + CenterHeader.
5. **Search/Cross-links/Nav** = נגזרים אוטומטית מ-Feature Contract + Registry.
6. **כל קומפוננטה מהקטלוג בלבד** (`component-catalog.md`); כל טוקן מ-`tokens.json`; כל תנועה מ-`motion-system.md`.

**מבחן הקבלה:** "האם דף המודול החדש היה יכול להיבנות ע"י מי שבנה את שאר האתר?" — Design Judge(D3) שואל את זה עם צילומי Mobile+Desktop+RTL. **אין שלב "עיצוב חדש".** מודול נראה native כי אין לו דרך אחרת להיבנות.

**BTP** (application/tools) = Explorer/Dashboard templates + Application Feature contract; אותו Design System, אותם gates.

---

## 11. שער האיכות (איך הבלופרינט נאכף — עתידי, docs-only היום)
`design-lint`(G2 דטרמיניסטי: tokens-only/component-allowlist/template/focus/contrast/touch/reduced-motion/CLS) + `Design Judge`(G3 שיפוטי, צילומי Mobile+Desktop+RTL) + reviewer skills קיימים(`neo-sap-visual-designer`, `enterprise-adaptive-ui-reviewer`, `neo-accessibility-reviewer`) → שער `neo-enterprise-ux-auditor`. **היום הכל תיעוד — אין קוד, אין אכיפה אוטומטית עדיין.**
