# SAP by Sali — Motion System

**סוג:** תיעוד בלבד. מתעד את התנועה **הקיימת** (`lib/motion.ts` + `app/globals.css`) ומגדיר סטנדרט לעתיד. **לא ממציא אנימציות.**

**פילוסופיה (מקודדת בקוד):** transform+opacity בלבד (60fps) · תנועה משרתת הבנה, לא קישוט · ברירת מחדל = פחות · `prefers-reduced-motion` מכבה הכל.

---

## 1. Motion Tokens (מקור אמת יחיד)

### Durations — `lib/motion.ts:9` (framer, שניות) + `globals.css:791-795` (CSS, ms)
| טוקן | ערך | שימוש |
|------|------|--------|
| fast | 0.12s / 120ms | micro (tap, chevron, hover tint) |
| base | 0.24s / 240ms | ברירת מחדל (כרטיס, disclosure) |
| page | 0.32s / 320ms | מעבר דף, כניסת reader |
| slow | 0.50s / 500ms | hero, path header |

### Easing — `lib/motion.ts:12-16` + `globals.css:796-798`
| טוקן | cubic-bezier | תפקיד |
|------|--------------|--------|
| `EASE.out` / `--ease-out` | `0.2, 0, 0, 1` | **חתימה** — הופעה/התיישבות |
| `EASE.emphasized` / `--ease-emphasized` | `0.05, 0.7, 0.1, 1` | כניסת תוכן/hero |
| `EASE.accelerate` / `--ease-accel` | `0.3, 0, 0.8, 0.15` | יציאות |
| `--ease-out-expo` | `0.16, 1, 0.3, 1` | lift של surface/card |
| `--ease-premium` | `0.32, 0.72, 0, 1` | card-premium |
| `--ease-soft` | `0.22, 1, 0.36, 1` | rise/fade helpers |
| `--ease-spring` | `0.34, 1.56, 0.64, 1` | overshoot עדין |

### The one spring — `lib/motion.ts:19`
`SPRING_MORPH = { type:"spring", stiffness:260, damping:30 }` — **שמור בלעדית** למורף shared-element של figure (inline→fullscreen). framer springs אחרים בשימוש נקודתי: cards `stiffness:320, damping:30`, hero stats `320/20`, book hover `300/26`.

### Helpers — `lib/motion.ts:22-28`
`t(d,e)` → transition object · `enter(reduce)` → variant fade+rise (reduce = fade בלבד 0.12s).

---

## 2. המילון הקיים — כל אנימציה בשמות

### כניסות (entry)
| שם | ערך | קובץ |
|----|------|------|
| `float-in` | opacity+translateY 8px, 0.4s (0.22,1,0.36,1) | globals.css:410-414 |
| `fadeUpSoft` / `rise` | translateY 16px, 0.6s ease-soft, stagger `--i*60ms` | globals.css:560-564 |
| `fadeUp` / `fadeIn` / `drawerIn` | y14 / opacity / x28 | globals.css:565-567 |
| `row-in` | translateY 8px 0.4s ease-out (רשימות/טבלאות) | globals.css:597-599 |
| `reader-enter` | fadeUpSoft page ease-emphasized | globals.css:819 |
| block enter (framer) | initial{opacity:0,y:14}→animate, delay `Math.min(i*0.03,0.3)` | lesson-view.tsx:102 |

### Disclosure / accordion
`accordion-down/up` 0.22s cubic-bezier(0.4,0,0.2,1) (Radix, `globals.css:94-105`) · body height/opacity 0.25-0.28s (facet/block).

### Hover / press
`lift` translateY(-2/-4px) + elev-3, 0.35-0.4s ease-premium · `tap` scale(0.97) 0.12s · `card-interactive` shadow+border 0.18s · touch active scale(0.98) (`globals.css:299-526`).

### Feedback / delight
- **deep-link flash:** `flashRow`/`neoFlash`/`find-flash` — פעימת צהוב SAP חד-פעמית, fade-out (לא strobe). globals.css:590-613,802-806.
- **skeleton shimmer:** `shimmer` translateX 1.4-1.5s. globals.css:570,616-629.
- **spotlight:** cursor-follow radial brand 13% על hover. globals.css:632-642.
- **confetti:** `confettiFall` (completion celebration בלבד). globals.css:568.

### Studio (living graph)
`studio-flow` (dashed march 1.05s, edges חמים) · `studio-halo` (pulse 2.4s, node נבחר) · `studio-breathe` (backdrop 6s). globals.css:151-165.

### Reader
`reader-enter` על mount · figure shared-element morph (SPRING_MORPH, layoutId) · page-turn sweep + paper sound.

### Signature (brand)
`credit-glow` (20s, glow אחד) · `credit-red-glow` (3s, מונוגרם אדום). globals.css:167-181.

---

## 3. חוקי תנועה (מחייבים לעתיד)

1. **טוקנים בלבד.** משך/easing רק מ-`lib/motion.ts` או `--dur-*`/`--ease-*`. אין ערך חופשי — design-lint יאכוף (D2).
2. **transform+opacity בלבד.** אסור להנפיש width/height/top/left/margin (CLS + jank). lift = translateY, לא margin.
3. **reduced-motion חובה.** כל keyframe/transition מחדש `@media (prefers-reduced-motion: reduce)` — נאכף גלובלית (`globals.css:429-436`) + `useReducedMotion()` gate ב-72 קומפוננטות. spring/morph נהפכים ל-fade פשוט.
4. **כניסה מתוזמרת פעם אחת.** stagger `Math.min(index * 0.03–0.06, 0.24–0.3)` — מנוע אחד לדף, לא אפקטים מפוזרים.
5. **exit קצר מ-enter.** יציאות = `EASE.accelerate`, כניסות = `EASE.out/emphasized`.
6. **spring יחיד שמור.** `SPRING_MORPH` רק ל-figure morph. spring חדש = החלטת ממשל.
7. **תנועה = משמעות.** כניסת Drawer, פתיחת Disclosure, הדגשת Node, flash-on-arrival — כולם מסמנים סיבה-תוצאה. אין תנועה דקורטיבית.
8. **אין CLS.** `image-dimension`/aspect-ratio + skeleton שומר מקום; overflow-anchor ב-reader.
9. **60fps + will-change בזהירות.** `will-change: transform` רק על surfaces שמתרוממות; לא גלובלי.
10. **interruptible.** אנימציה לא חוסמת input; tap/gesture מבטלים מיד.

---

## 4. Enforcement (עתידי)

- **design-lint (D2):** לחסום duration/easing קשיחים ב-TSX/CSS; לוודא reduced-motion לכל keyframe; לחסום אנימציית layout (width/height/top/left).
- **Design Judge (D3):** "Animation Quality" — תנועה משרתת, מתוזמנת, לא מיותרת; עם צילומי before/after.
- **motion.json (עתידי):** ייצוא הטוקנים למסמך מכונה (ראו `design-tokens-plan.md`).

**מוקפא:** ערכי `lib/motion.ts` (DUR/EASE/SPRING_MORPH) + סגנון התנועה של Reader/Academy/Studio. שינוי = animation audit מלא + אישור Sali.
