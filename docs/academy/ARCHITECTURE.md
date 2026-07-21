# SAP Academy — Architecture Report (post-migration)

State after PR-1→PR-10. One learning engine, one progress store, eight modules
(PM · PP-PI · QM · PM-User · MM · WM · PP/DS · S&OP), zero parallel readers.

## 1 · Current architecture (layers)

```
data/academy/lessons/**            ← lesson CONTENT (blocks)
  pm-maintenance-order.ts            pilot (hand-authored)
  {pm,pp,qm}-generated.ts            pipeline-authored lessons
  {pmu,mm,wm,ppds,sop}-generated.ts  migrated from *-textbook (PR-8/9)
  index.ts  → ALL_LESSONS            single lesson registry (spread of all sets)

lib/academy/paths.ts               ← PATH order for PM/PP/QM (pure data)
data/academy/lessons/*-generated   ← PATH order for migrated modules (PMU/MM/WM/PPDS/SOP)

lib/academy/model.ts               ← CANONICAL derived model (pure, React-free)
  PATHS = [PM,PP,QM,PMU,MM,WM,PPDS,SOP]
  ACADEMY, getModule, getLesson, prevOf/nextOf, prereqOf,
  firstIncomplete, lockReason, moduleIdOf

lib/academy/store.ts               ← single reactive progress store
  KEY "neo:academy:v2" (+ v1 migration), useSyncExternalStore

lib/academy/theme.ts               ← per-module accent map

components/academy/lesson-view.tsx ← the ONE reader (renders ordered blocks)
components/academy/learning-path.tsx ← path/chapter view + locking + reset
components/academy/legacy-redirect.tsx ← decommission stub for old routes
components/academy-home.tsx · academy-dashboard.tsx ← entry surfaces
```

Rule: every surface derives from `model.ts` + `store.ts`. Stable IDs = lesson
`slug`. Nothing reads array index / route / hardcoded numbers.

## 2 · Reader flow

```
/academy/lesson/[slug]  (app/academy/lesson/[slug]/page.tsx, dynamicParams=false)
  generateStaticParams  → allLessonSlugs() from ALL_LESSONS
  lessonBySlug(slug)    → Lesson { module, chapter, blocks[], prev, next, ... }
  <LessonView lesson>
     getLesson(slug)          → canonical AcademyLesson (posInChapter, globalIndex…)
     dispNum = posInChapter   → breadcrumb "שיעור N" (fixes 3→13)
     orderedBlocks(blocks)    → CORE spine order; renders only present kinds
     prevOf/nextOf(slug)      → canonical footer nav
     setLastLesson(moduleId, slug) on mount  → drives Continue
     IntersectionObserver     → marks a block done when scrolled into view
```

## 3 · Store flow

```
neo:academy:v2 = {
  version: 2,
  lessons:  { [slug]: doneBlockKinds[] },   // per-lesson done blocks
  activity: [ISO dates],                    // streak/gamification
  lastLesson: { [moduleId]: slug },         // last opened per module
  lastOpened?: slug                         // global last opened
}
migrate(): reads v1 (neo:academy:progress / :activity) without deleting.
Access: useLessonProgress · useModuleProgress · useContinueTarget · useIsDone ·
        useLessonPct · useGamification (all useSyncExternalStore, SSR-safe).
Mutators: recordActivity · setLastLesson · resetLesson/Chapter/Path/All.
```

## 4 · Progress flow

```
block scrolled → markBlockDone(slug, kind) → store.lessons[slug] += kind
lesson %  = doneBlocks / visibleBlocks          (useLessonPct)
lesson done = doneBlocks ≥ requiredBlocks        (isLessonDone)
module %  = completedLessons / totalLessons      (useModuleProgress)
lock: lockReason(slug) = prior chapter incomplete → locked + Hebrew reason
Continue: lastOpened-incomplete → first-incomplete-in-module → default PM first
```

## 5 · Routing flow

```
/academy                      → AcademyHome (Continue card = useContinueTarget)
/academy/dashboard            → AcademyDashboard (book cards → ACADEMY_PATH)
/academy/path/[module]        → LearningPathView   dynamicParams=false
    keys: pm · pp-pi · qm · pm-user · mm · wm · pp-ds · sop
/academy/lesson/[slug]        → LessonView         dynamicParams=false
    slugs: pm-* pp-* qm-* pmu-* mm-* wm-* ppds-* sop-* (399 pages)
de-split map ACADEMY_PATH (home + dashboard): book id → /academy/path/*
```

## 6 · Redirect flow (decommission of legacy accordions)

```
/library/{pm,qm,mm,wm,ppds,sop,pmu}-academy/         → LegacyRedirect
/library/{…}-academy/[slug]  (chapter-NN, params kept)→ LegacyRedirect
/library/pp/  ·  /library/pp/[slug]                   → LegacyRedirect
    <LegacyRedirect to="/academy/path/<module>/">
      useEffect → router.replace(to)     (client)
      visible manual link                (no-JS fallback)
generateStaticParams retained on [slug] → old deep links resolve (200 → redirect),
never 404. /library/ landing and /library/pp/object/[code] untouched.
```

## Guarantees
- One reader, one store, stable slug IDs, canonical prev/next, real-completion locking.
- 100% content preserved in migration (gen words ≥ source; every T-Code/table/Fiori).
- Library bookshelf FROZEN — byte-identical across every PR.
