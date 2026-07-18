# SAP by Sali — Component Catalog (Canonical)

**סוג:** תיעוד בלבד. מגדיר את הגרסה הקנונית של כל קומפוננטה חוזרת. כל anatomy נגזר מהקוד בפועל (file:line). מקור העיצוב: `design-principles.md` + `app/globals.css`.

**חוק ממשל:** קומפוננטה חדשה נכנסת לקטלוג רק אם (א) אין קיימת שמתאימה, (ב) ≥2 שימושים צפויים, (ג) עברה Design Review. אחרת — **וריאנט של קיימת**.

לכל קומפוננטה: **מטרה · anatomy · וריאנטים · אינטראקציה · אנימציה · a11y · חוק שימוש חוזר**.

---

## שכבה 0 — Primitives (`components/ui/*`)

### Button (`ui/button.tsx`)
- **מטרה:** פעולה. **anatomy:** inline-flex items-center gap-2 rounded-xl text-sm font-medium, transition-all 150ms, focus-visible ring-2 ring-brand.
- **וריאנטים (cva):** `default` (bg-brand shadow-brand/25), `outline` (border-border bg-card hover:bg-muted), `ghost` (hover:bg-muted), `secondary` (bg-muted). **גדלים:** default h-9 px-4 · sm h-8 px-3 text-xs · lg h-11 px-6 · icon h-9 w-9.
- **אינטראקציה:** active:scale-[0.97] · hover:bg-brand-dark. **a11y:** disabled:opacity-50 pointer-events-none, focus-visible ring תמיד.
- **חוק:** כפתור ראשי אחד למסך; משני = outline/ghost/secondary.

### Card (`ui/card.tsx`)
- **מטרה:** מיכל. **anatomy:** rounded-2xl border-border bg-card shadow-sm + CardHeader(p-5 gap-1) / CardTitle(h3 font-semibold) / CardDescription(text-sm text-muted-foreground) / CardContent(p-5 pt-0) / CardFooter. **a11y:** semantic h3 בכותרת.

### Badge (`ui/badge.tsx`)
- **anatomy:** inline-flex rounded-full border px-2.5 py-0.5 text-xs font-medium. מעוצב דרך className.

### EmptyState (`ui/empty-state.tsx`)
- **מטרה:** מצב ריק פרימיום. **anatomy:** flex-col items-center rounded-2xl border-dashed border-hairline gradient bg px-6 py-14 text-center + icon-well עם halo(brand/10 blur) + title + hint + suggestion chips.
- **אינטראקציה:** suggestion onClick, hover:border-brand/40 hover:text-brand. **חוק:** רשימה/חיפוש/פילטר ריקים → תמיד EmptyState עם הסבר + פעולה מוצעת. מסך ריק בלי הכוונה = כשל.

### Skeleton (`ui/skeleton.tsx`)
- **anatomy:** animate-pulse rounded-md bg-hairline/70. `SkeletonRows` = grid card בתבנית התוכן האמיתי (icon + 2 שורות + badge). **חוק:** טעינה >300ms → skeleton בתבנית התוכן, לא ספינר. `aria-busy` על ההורה. (`globals.css:615-629` shimmer)

---

## שכבה 1 — Cards (משפחת הכרטיסים)

בסיס: `card` / `card-interactive` / `surface` / `card-premium` (ראו `design-principles.md §4`). כל הכרטיסים למטה הם **וריאנטים** של אלה.

### ModuleCard (`module-portal.tsx:72-89`)
- **anatomy:** `card-interactive` flex-col gap-2.5 p-5 + icon-well(size-10 rounded-xl bg-surface-2, group-hover:bg-brand/10 text-brand) + title(text-[14.5px] font-extrabold) + en-eyebrow + count badge + desc(text-[12.5px] leading-relaxed ink-2). **חוק:** כרטיס ניווט-סקציה בכל פורטל.

### StatCard (`home-hero.tsx:24-38` · explorer stat band `cds-explorer.tsx:42-50`)
- **anatomy:** card flex items-center gap-3 rounded-2xl p-4 + icon-well(size-10 text-white dynamic color) + metric(`font-mono text-2xl/3xl font-extrabold tabular-nums`) + label(text-[10-11px] uppercase ink-3). variant hero: glass on brand hero, `whileHover{y:-3}`.
- **חוק:** מספרים תמיד tabular-nums + font-mono. 4-up grid (`grid-cols-2 sm:grid-cols-4`).

### LinkCard / SearchHero (`home-portal.tsx:22-77`)
- **anatomy:** button rounded-2xl border-hairline bg-surface px-4 py-4 shadow-sm + search icon well + chip row(mono codes). פותח ⌘K ב-`dispatchEvent("neo:open-palette")`. hover:border-brand/40 + lift.

### SAP Object / Reference cards
- **BAPI hero (`bapi-object-page.tsx:88-122`):** inset top-bar (brand=BAPI / ink-1=FM) + icon-well size-11 + `font-mono text-[19-22px] font-black break-all` title + badge row(type/RFC/module/category/op) + pill row(verification/difficulty/stability/COMMIT/BOR) + action buttons(fav/copy/peek/ask-AI).
- **ChainCard (`cds-explorer.tsx:90-123`):** rounded-2xl bg-surface p-4 + icon-well + mono name + tables list + border-t consumption→fiori chain (arrow). hover:-translate-y-0.5 hover:border-brand/30.
- **StatusCard (`idoc-explorer.tsx:92-110`):** code badge(dir-colored: in=green#16a34a/out=blue#2563eb) + status name + cause(AlertTriangle) + fix(Wrench + tcode chips).
- **TransactionCard (`transaction-workspace.tsx:132-153`):** rounded-2xl p-3.5 + absolute star + icon+code+module badge+he-name + meta("מתועד לעומק"/"מאומת"/Fiori/flame/"פתח").

### FacetCard / MasterDataFacet (`master-data-facets.tsx:52-88`)
- **anatomy:** `card-premium` relative overflow-hidden + accent bar(top h-1) + button header(icon-well size-11 `{accent}1f`, eyebrow en, h3 he, 1-line whatIs, read-min badge, chevron) + AnimatePresence body(border-t space-y-5 p-5: whatIs · businessValue box · owner/deps/CBC panels · tables/tcodes/links chips).
- **אנימציה:** initial{opacity:0,y:8} · stagger `Math.min(index*0.04,0.24)` · body height/opacity 0.25s. **a11y:** aria-labelledby, role heading.

### IncidentCard (`incident-explorer.tsx:32-44`)
- **anatomy:** `lift` rounded-2xl bg-surface p-4 + icon badge(ShieldAlert red-50) + module badge(colored) + ArrowLeft(hover-shift) + h3 he + line-clamp-2 symptom + error badge.

---

## שכבה 2 — Patterns

### Chip / CodeChip (`object-expert.tsx:57-62` · `lesson-view.tsx:44-47`)
- **anatomy:** `tech inline-flex rounded-lg border-hairline px-2 py-1 font-mono text-[11.5px] font-bold`. link → `SmartLink` (text-ink-1 hover:border-brand/40), dead → plain span (bg-surface-2 text-ink-3). תמיד CopyBtn.
- **חוק קריטי:** קוד SAP רק דרך SmartLink — אם אין route, מציג span, **לא לינק מת**. LTR mono תמיד.

### DataTable (`fields-table.tsx:23-90` + `.neo-table` `globals.css:890-899`)
- **anatomy דסקטופ:** `<table>` semantic, sticky header, key badge(PK=bg-brand/15, FK=in-conversion/15), rows hover:bg-brand/[0.04]. **מובייל (md:hidden):** card-transform — כל שורה = כרטיס, עמודת-מפתח דביקה (`inset-inline-start:0`).
- **חוק:** טבלה אחת לכל האתר. מספרים LTR בתוך RTL. טבלה רחבה = overflow-x פנימי, לא גלילת דף.

### Timeline / ProcessFlow (`process-flow.tsx:23-89`)
- **anatomy:** PhaseSection(icon-well + eyebrow-2 + h3 + count) + `<ol>` עם gradient gutter(accent→22%) + StepCard(numbered circle accent, last=emerald) שמכיל obj link + tcode chip + table chips + output box(bg-surface-2/50 + arrow) + expandable mistakes. **חוק:** קומפוננטת ציר-זמן אחת לתהליכים/סיורים/היסטוריית ECC→S/4.

### Progress / Ring / Bar
- **Ring (`academy-home.tsx`):** SVG circular progress, accent per module. **Track bar (`learning-path.tsx:76`):** h-2 white bg width `${pct}%`. **Lesson block bar:** per-block completion.

### Overlay: BottomSheet / ObjectPeek (`object-peek.tsx:32-180`)
- **anatomy:** AnimatePresence slide-up, rounded-3xl top, border-top only, p-4 sm:p-6 + header(kind icon + mono name + kind badge + close X + star) + module badge + desc + meta(counts/verification) + quick actions(chips) + related strip(tap→re-peek). **a11y:** focus-trap, Esc, scroll-lock, safe-area.

### Filters (explorers + `command-palette`)
- **Search bar:** flex-1 rounded-2xl border-hairline bg-surface px-4 py-2.5 + Search icon(accent) + input placeholder ink-3.
- **Filter buttons:** rounded-xl px-3 py-2 text-xs font-bold — inactive(bg-surface-2 text-ink-3 hover:bg-hairline), active(text-white bg-{module color}). rows: module / topic / object.
- **Result count:** text-xs font-bold ink-3 "{n} תוצאות".

### Callout boxes (semantic)
- **warning/mistakes:** border-s-4 border-s-[#f59e0b] bg-[#fff8ec] text-[#92400e] + ⚠️.
- **best-practices/tips:** border-[#cfe6e2] bg-[#f0f6f5] text-[#0f5e57].
- **business-value:** border-s-4 border-s-indigo-400 bg-indigo-50/40 text-indigo-700 + TrendingUp.
- **reader callout:** blockquote border-inline-start 3px brand + bg-brand-soft (`globals.css:768`).

---

## שכבה 3 — Domain Components

### Learning (Academy)
- **Block (`lesson-view.tsx:102-134`):** motion.section rounded-2xl border-hairline bg-surface + accent tone-bar(start w-1, per-kind color) + button header(chevron, emoji-well size-9, heading, SourceChip, toggle) + AnimatePresence body. **tone map:** objective #0b0c0e · why #334155 · diagram #1d4ed8 · tables #475569 · mistakes #b45309 · best-practices #0f766e · quiz #6d28d9 · summary #d62027. accent bg = `{tone}14`.
- **SourceChip (trust):** inline-flex rounded-full border px-2 py-0.5 text-[9.5px] font-bold + ShieldCheck. colors: verified-docs(teal) · verified-system(emerald) · curated(surface-2) · needs-review(amber).
- **PathChapter (`learning-path.tsx:84-101`):** timeline gutter(w-[3px]) + number/lock circle(size-11 border-[3px], current=path.color + ring `0 0 0 5px {color}1a`) + card(h3 + lesson-count badge + "אתה כאן") + nested lesson rows(unlocked link / upcoming opacity-55 + "בקרוב").
- **FacetCard, QuizCard, ConceptBlock, ProgressRing** — ראו lesson-view.

### Reference / Object
- **ObjectHeader:** eyebrow-2 + mono H1 + type/module badges + FavStar (`object-workspace.tsx:243-265`).
- **Section (`object-expert.tsx:23-32`):** rounded-2xl border-hairline bg-surface p-5 sm:p-6 scroll-mt-28 + icon-well + h2 + en-eyebrow.
- **WhereUsed / RelatedObjects:** chip groups.

### Search
- **CommandPalette (`command-palette.tsx`):** Dialog + search input + sections(Recent / Suggestions / Results grouped by kind: pages/tables/tcodes/bapi/idoc/cds/domain/process/field/fiori) + result row(icon + Highlight label + sub + module tag + verification badge) + keyboard(↑↓ cycle, Enter open, Esc close).
- **OmniSearch (`omni-search.tsx`):** spotlight button + kbd hint ⌘K → dispatches `neo:open-palette`.

### Navigation
- **KnowledgeSidebar (`knowledge-sidebar.tsx:59-102`):** 2-tier tree(4 groups × 18 items), active = bg-brand/8 text-brand + span indicator(inset-y-1 start-0 w-[3px] rounded bg-brand), collapse per group(localStorage `neo:nav:open`), mobile drawer. **a11y:** aria-current, aria-expanded.
- **Breadcrumb (`module-portal.tsx:25` · `object-expert.tsx:79`):** nav aria-label + flex gap-1.5 text-xs ink-3 + ArrowLeft(size-3, RTL). hover:text-brand.
- **GlobalBack (`global-back.tsx:28-66`):** sticky below header z-30, history-or-parent fallback map.
- **MobileTabBar:** 5 tabs(Home/Modules/Library/Search/More), safe-area, haptic, "More"→CentersSheet.

### Studio
- **GraphCanvas / NodeCard / EdgeLegend / PresentationControls (`architecture-studio.tsx`)** — FROZEN. mode toolbar + filter panel + zoom controls + SVG hetero canvas.

---

## חוקי שימוש חוזר (גלובלי)

1. כל כרטיס ייחוס = `card-interactive`/`card-premium`. וריאנט, לא מאפס.
2. כפתורי-פעולה = `.tap` (scale על active) + border-hairline + hover:border-brand/40 + hover:text-brand.
3. קוד SAP = SmartLink + mono + LTR isolation; אין לינק מת.
4. Section = rounded-2xl border-hairline bg-surface p-5 sm:p-6 + eyebrow-2 + heading + scroll-mt.
5. Grid = `grid-adaptive` / `grid-adaptive-sm` בלבד.
6. Icon-well = grid size-{8-11} place-items-center rounded-{lg,xl} + `{accent}1f` bg + accent text.
7. Metric = font-mono tabular-nums.
8. Trust/verification = pill rounded-full color-coded (emerald/amber/slate/brand-soft).
9. Empty/Loading/Callout = הקומפוננטות הקנוניות בלבד.
10. כל אלמנט אינטראקטיבי = focus-visible ring + ≥44px touch + hover+active states.
