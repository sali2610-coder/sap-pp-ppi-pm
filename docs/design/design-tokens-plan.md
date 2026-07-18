# SAP by Sali — Design Tokens Plan (future structure)

**סוג:** תיעוד/תכנון בלבד. **אפס שינוי CSS/קוד.** מגדיר את מבנה `design/tokens.json` העתידי, שייגזר **1:1** מ-`app/globals.css` הקיים (95 CSS vars). המטרה: להפוך את הטוקנים למקור-מכונה אכיף (design-lint, Figma, component-gen) בלי לשנות אף ערך פרודקשן.

**חוק:** `app/globals.css` נשאר מקור האמת בזמן ריצה. `tokens.json` = תצוגה נגזרת (auto-generated או synced). נעילת הערכים = נקודת אישור Sali (שלב D1).

---

## 1. מבנה שלוש שכבות (v4 §6 · design-system skill)

```
Primitive (ערך גולמי)  →  Semantic (כינוי-תפקיד)  →  Component (טוקן-קומפוננטה)
--red-600 #d62027       →  --brand                  →  --button-bg
```

`tokens.json` יחזיק את שלוש השכבות; קוד פיצ'ר מפנה **רק** ל-Semantic/Component, לעולם לא ל-Primitive.

---

## 2. סכימת `design/tokens.json` (הצעה — ערכים מהקוד הקיים)

```jsonc
{
  "$schema": "./tokens.schema.json",
  "version": "2.0.0",           // Design System v2 הקיים
  "source": "app/globals.css",  // מקור האמת
  "color": {
    "surface":   { "background":"#fcfcfd", "background-2":"#f4f5f7",
                   "surface":"#ffffff", "surface-2":"#f4f5f7", "hairline":"#eaecef" },
    "ink":       { "1":"#0b0c0e", "2":"#3a3f47", "3":"#6b727c",
                   "3-mobile":"#5b6570" },              // globals.css:868
    "brand":     { "base":"#d62027", "dark":"#a3171c",
                   "soft":"#fef2f2", "foreground":"#ffffff" },
    "module":    { "PM":"#f97316","PP-PI":"#6d28d9","QM":"#0891b2",
                   "MM":"#d97706","WM":"#7c3aed","IBP":"#0891b2",
                   "Fiori":"#db2777","Foundation":"#475569" }, // book-cover.tsx:11
    "status":    { "not-started":"#94a3b8","in-analysis":"#f59e0b",
                   "in-conversion":"#3b82f6","tested":"#8b5cf6","done":"#10b981" },
    "semantic":  { "warning":{"bg":"#fff8ec","edge":"#f59e0b","text":"#92400e"},
                   "success":{"bg":"#f0f6f5","edge":"#cfe6e2","text":"#0f5e57"},
                   "info":{"bg":"indigo-50/40","edge":"indigo-400","text":"indigo-700"} }
  },
  "typography": {
    "family": { "sans":"\"Segoe UI\", system-ui, -apple-system, …",
                "mono":"\"Cascadia Code\", \"JetBrains Mono\", \"Consolas\", …" },
    "scale":  { "2xs":".6875rem","xs":".75rem","sm":".875rem","base":"1rem",
                "lg":"1.125rem","xl":"1.375rem","2xl":"1.75rem",
                "3xl":"2.25rem","display":"3rem" },
    "tracking": { "tight":"-.02em","display":"-.03em","eyebrow":".18em" },
    "weight": { "regular":400,"medium":500,"semibold":600,"bold":700,
                "extrabold":800,"black":900 },
    "leading": { "tight":1.04,"heading":1.12,"body":1.6,"reader":1.85 }
  },
  "spacing": { "scale":[0,4,8,12,16,24,32,48,64],   // 4pt (Tailwind)
               "card-pad":"1.25rem","card-pad-lg":"1.5rem",
               "grid-gap":["0.625rem","0.75rem","1rem","1.25rem"] },
  "radius": { "sm":"calc(.75rem - 6px)","md":"calc(.75rem - 3px)",
              "lg":".75rem","xl":"calc(.75rem + 4px)","2xl":"calc(.75rem + 10px)",
              "card":"1rem","hero":"1.5rem","pill":"9999px" },
  "shadow": { "elev-1":"0 1px 2px -1px rgba(15,23,42,.08), 0 1px 1px rgba(15,23,42,.04)",
              "elev-2":"0 2px 4px -2px rgba(15,23,42,.10), 0 4px 12px -4px rgba(15,23,42,.06)",
              "elev-3":"0 6px 16px -6px rgba(15,23,42,.14), 0 12px 28px -10px rgba(15,23,42,.10)",
              "elev-4":"0 12px 32px -8px rgba(15,23,42,.18), 0 24px 56px -16px rgba(15,23,42,.14)",
              "card":"0 10px 30px -18px rgba(15,23,42,.4), 0 1px 2px rgba(15,23,42,.05)",
              "ring-soft":"0 0 0 4px color-mix(brand 14%)" },
  "transition": {   // ← מקור: lib/motion.ts (ראו motion-system.md)
    "duration": { "fast":"120ms","base":"240ms","page":"320ms","slow":"500ms" },
    "easing":   { "out":"cubic-bezier(0.2,0,0,1)",
                  "emphasized":"cubic-bezier(0.05,0.7,0.1,1)",
                  "accelerate":"cubic-bezier(0.3,0,0.8,0.15)",
                  "out-expo":"cubic-bezier(0.16,1,0.3,1)",
                  "premium":"cubic-bezier(0.32,0.72,0,1)",
                  "soft":"cubic-bezier(0.22,1,0.36,1)" },
    "spring-morph": { "type":"spring","stiffness":260,"damping":30 }
  },
  "z-index": { "base":0,"sticky":30,"nav":40,"overlay":50,
               "modal":50,"toast":60 },              // מ-app-shell + header z-50
  "icon-size": { "xs":16,"sm":20,"md":24 },          // Lucide, מהסולם
  "breakpoint": { "sm":640,"md":768,"lg":1024,"xl":1280,"2xl":1536,
                  "wide":1920,"xxl":2560,"3200":3200,"4k":3840 },  // container ramp
  "container": { "base":"1800px","xl":"1960px","xxl":"2320px",
                 "3200":"2760px","4k":"3280px" },     // globals.css:471-474
  "font-scale-ramp": { "2560":"17.5px","3200":"19.5px","3840":"21.5px" }
}
```

> הערה: ערכי `indigo-*` ו-`emerald/amber` הם כרגע Tailwind classes בקוד; בעת נעילת D1 יומרו ל-hex מפורש בטוקן semantic.

---

## 3. קבצים נלווים (עתידיים, docs/registry — לא קוד פרודקשן)

- **`design/tokens.schema.json`** — JSON-Schema שמאמת את `tokens.json` (טיפוסים, enums, required). מריץ ב-build (D2).
- **`design/components.json`** — קטלוג הקומפוננטות המאושרות (ראו `component-catalog.md`): `{ name, file, tokensUsed[], variants[], a11y, approvedAt, deprecations }`.
- **`design/page-templates.json`** — התבניות הסגורות (Portal/Learning/Reference/Explorer/Studio/KnowledgeCenter/SearchResults): `{ id, regions[], requiredComponents[], allowedTokens }`.
- **`design/motion.json`** — ייצוא הטוקנים מ-`lib/motion.ts` (כבר מובנה כ-TS; העתק JSON).
- **`design/themes/light.json`** (Theme ראשון) → **`dark.json`** עתידי (מיפוי שני, אפס שינוי קומפוננטה).

---

## 4. תוכנית הגזירה (D0→D1, docs-only)

1. **D0 (audit):** סקריפט קריאה-בלבד שקורא `app/globals.css` ומפיק `tokens.draft.json` — מיפוי דה-פקטו של כל 95 ה-vars. איתור ~25 ה-hex הקשיחים בקומפוננטות (`page-help.tsx:73`, `process-flow.tsx:89`, `object-expert.tsx:159`) שחורגים מהטוקנים.
2. **D1 (נעילה, אישור Sali):** אישור ה-`tokens.json` הסופי + `components.json` + `page-templates.json`. הערכים נגזרים 1:1; **אין שינוי ויזואלי.**
3. **D2 (אכיפה):** `design-lint` קורא את `tokens.json` וחוסם hex/px/duration קשיחים; ניקוי ה-25 hex לטוקנים semantic (מקור-הערך זז ל-token, הפיקסל על המסך זהה).

---

## 5. חוקי טוקנים (מחייבים לעתיד)

1. **מקור אמת יחיד.** צבע/גופן/מרווח/רדיוס/צל/תנועה/z/icon-size — רק מ-`tokens.json`. אין ערך קשיח בקוד פיצ'ר.
2. **שלוש שכבות.** פיצ'ר מפנה ל-Semantic/Component, לא Primitive.
3. **Theme = מיפוי.** צבעים סמנטיים בלבד → Dark מתווסף כמיפוי שני בלי לגעת בקומפוננטה. פיצ'ר שעוקף טוקן שובר את מנוע ה-Themes → נחסם ב-lint.
4. **שינוי טוקן = גלובלי.** Design Review מלא + רגרסיה ויזואלית על דף מייצג מכל תבנית. אישור Sali חובה.
5. **Derived, לא ידני.** `tokens.json` נבנה/מסונכרן מ-`globals.css`; לא נערך ידנית בנפרד (drift).

**היום:** אפס שינוי. זו סכימת-יעד בלבד — נועדה לאישור לפני שכותבים סקריפט כלשהו.
