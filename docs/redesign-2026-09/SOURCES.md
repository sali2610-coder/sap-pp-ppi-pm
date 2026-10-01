# נספח מקורות · כל מקור שהבריף מזכיר (סבב 3, 1 באוקטובר 2026)

כלל: מקור מסומן CONSULTED רק אם נפתח או הופעל בפועל, ויש לכך ראיה (דוח, קובץ, קריאת כלי). מקור שרק הופיע בבריף לא נספר.
יומני המחקר המלאים (מחוץ ל־git): `neo-redesign-evidence/r3/research/research-log.md`, ‏`research-log-2.md` ו־`skills-inventory.md`, ושאר הראיות ב־`neo-redesign-evidence/r3/`.

## 1. אתרי השראה (בריף §17)

| מקור | מצב | מה נפתח | מה נלמד | איפה הוחל |
|---|---|---|---|---|
| ui.shadcn.com | CONSULTED | docs/theming | זוג רקע ודיו לכל תפקיד, ב־OKLCH, וטוקן אחד לכל תפקיד שמקבל ערך ליום וערך ללילה | טבלת התפקידים של שלוש הצעות הצבע: לכל משטח דיו משלו (`ART-DIRECTION.md`) |
| headlessui.com | CONSULTED | react/combobox | מצב מעבר כתכונות data, מודל מקלדת: חצים, Enter, Escape מחזיר, Home/End | מודל המקלדת של לוח הפקודות כבר תואם; פתיחה וסגירה לפי מצב |
| heroui.com | CONSULTED | 9 עמודים תחת /docs/react/ (שתי כתובות www החזירו 404) | יציאה קצרה פי 2 עד 2.5 מכניסה; Toast של 4000ms שעוצר בריחוף, בפוקוס ובלשונית ברקע; מצבים נגזרים ב־color-mix (90/10, ‏15%, ‏20%); לילה בגוון (Ocean, ‏oklch(0.140 0.020 230)) | הלילה בגוון עמוק בהצעות; מצבי hover נגזרים; תזמון הלוח (סעיף 3 ב־`ART-DIRECTION.md`) |
| magicui.design | CONSULTED | docs/components | קו מצויר בין צמתים שימושי; ניצוצות, מטאורים וקונפטי דקורטיביים | רק הרעיון של קשר מצויר ב־CSS/SVG, שכבר קיים ב־ERD ובמפת התהליך. לא הותקן דבר |
| www.eldoraui.site | NOT NEEDED | דף הבית, /components, /docs, שני רכיבים ומקור הרכיב | הדוגמה היחידה לכרטיס עם שכבה היא היפוך של 700ms שמגיב לריחוף בלבד | נדחה: בלי מקלדת ומגע, מסתיר את הפנים במקום להוסיף שכבה |
| floatui.com | NOT NEEDED | דף הבית, /components, modals, alerts | בלוקים סטטיים על אותו בסיס Radix ו־Tailwind שכבר קיים | נדחה: אין דפוס שלא מכוסה טוב יותר בהתנהגות המתועדת של HeroUI |
| shaders.com | NOT NEEDED | דף הבית, docs, performance, license | WebGPU; Fallback הוא קנבס ריק; שימוש בכלי פנימי דורש רישיון Core או Pro בתשלום | נדחה: רישיון בתשלום, אין Fallback, ובעיית הצבע היא בעיית טוקנים |
| ui.aceternity.com | CONSULTED | /components ושישה רכיבים, כולל קובצי המקור | חלקים בעלי שם משותף למעבר רשימה לרשומה; השהיית יציאה של 0.2s נגד הבהוב; פס התקדמות דקורטיבי מסומן aria-hidden; אישור על הכפתור שנלחץ כ־2 שניות | רעיונות בלבד. הקוד נדחה: בלי מקלדת, בלי reduced-motion, תלות נוספת |
| www.vengenceui.com | CONSULTED | דף הבית, /components, search-modal, מקור שני רכיבים | לוח חיפוש מדויק: 200ms, תזוזה של 8px, קנה מידה 0.98 | מידת התנועה של לוח הפקודות. הקוד נדחה (בלי listbox, בלי החזרת פוקוס) |
| uiverse.io | UNAVAILABLE | / ו־/cards | HTTP 403 Forbidden בשני הניסיונות | לא נלקח ממנו דבר |
| animejs.com | CONSULTED | documentation | timelines, stagger, springs, SVG drawable | לא נוסף: CSS, ‏WAAPI ו־ViewTransition מכסים את הרגעים (לפי הבריף) |
| animmasterlib.dev | NOT NEEDED | דף הבית, /pagetr.html | קוד נעול מאחורי רכישה | נדחה: בתשלום וסגור, והבריף אוסר שימוש בלי רישיון |
| jitter.video | NOT NEEDED | דף הבית | כלי לנכסי Motion ווידאו, לא רכיב Runtime | נדחה לכל הרגעים בממשק; מתאים רק לנכס נפרד |
| daisyui.com | CONSULTED | docs/colors | primary/secondary/accent/neutral, שלוש דרגות משטח, info/success/warning/error, כל אחד עם זוג ‎-content | שלוש דרגות משטח לכל ערכת צבע, ולכל סטטוס דיו משלו |
| erikdayan.com/guides/guide-47 | CONSULTED | המדריך | מחקר, תכנון, עבודה עם אימות בכל צעד, פישוט, ביקורת, תיעוד הלקח | סדר הסבב: מדידה, החלטה, יישום, אימות, תיעוד |

## 2. סקילים, סוכנים וכלים (בריף §7)

| שם | מצב | ראיה | השפעה או סיבה |
|---|---|---|---|
| impeccable | CONSULTED | `reviews/gate-10-impeccable.md`; ‏`BAKEOFF.md` | סמכות חזותית ראשית: שער 10 NEEDS-WORK ‏76/100, תיקונים ב־a6a56f22 |
| ui-ux-pro-max, high-end-visual-design, design-taste-frontend, redesign-existing-projects | NOT NEEDED | מותקנים, לא הופעלו | עדשות אופציונליות; הבריף קובע סמכות אחת לתחום, והיא Impeccable יחד עם neo-sap-visual-designer |
| document-skills:frontend-design | UNAVAILABLE | השם לא קיים; אותו סקיל רשום כ־example-skills:frontend-design | השם בבריף לא נפתר; עדשה אופציונלית |
| sap-writer | NOT NEEDED | קיים רק כסוכן sc4sap:sap-writer, שתלוי ב־MCP של SAP שאינו מחובר | הטקסטים היו מיקרו־קופי, ונבדקו ב־neo-sap-content-quality-reviewer |
| neo-sap-content-quality-reviewer | CONSULTED | `reviews/content-review-copy-sap.md`; ‏`gate-01`; ‏`sap-correctness.md` | הוביל את תיקוני גזירת סטטוס S/4 |
| sap-knowledge-architect | CONSULTED | `reviews/gate-02-knowledge-architecture.md` | שער 2 |
| neo-documentation-guardian | UNAVAILABLE בסבב 3: לא הורץ, כי מגבלת השימוש של החשבון עצרה את הסוכנים לפני סוף הסבב | | נשאר הפער היחיד מהסבבים הקודמים |
| sap-ai-consultant | NOT NEEDED | לא הופעל | הבריף: רק לשאלת SAP אמיתית. שאלות הנכונות נסגרו בבודק התוכן |
| enterprise-ux-reviewer | CONSULTED | `reviews/gate-05-enterprise-ux.md`; שופט UX ב־Bakeoff | שער 5 |
| neo-sap-visual-designer | CONSULTED | `reviews/gate-03-visual-design.md`; שופט חזותי ב־Bakeoff | שער 3 |
| enterprise-adaptive-ui-reviewer | CONSULTED | `reviews/gate-04-adaptive-ui.md` | שער 4 |
| neo-search-experience-reviewer | CONSULTED | `reviews/gate-06-search.md` | שער 6 |
| neo-architecture-studio-reviewer | CONSULTED | `reviews/gate-07-erd-studio.md` | שער 7 |
| neo-accessibility-reviewer | CONSULTED | `reviews/gate-08-accessibility.md` | שער 8 |
| enterprise-performance-reviewer | CONSULTED | `reviews/gate-09-performance.md` | שער 9 |
| neo-enterprise-ux-auditor | CONSULTED | `reviews/gate-11-final-ux.md`, ‏`-r2.md` | השער הסופי |
| agent-skills:frontend-ui-engineering | NOT NEEDED | מותקן, לא הופעל | הבריף: כלי יישום לא מחליפים את מערכת העיצוב; העבודה נעשתה לפי DESIGN-SPEC, ‏TOKENS, ‏COMPONENTS ו־MOTION |
| vercel:nextjs | NOT NEEDED | התיעוד המחייב לפי AGENTS.md נקרא במקום: `node_modules/next/dist/docs` | Next 16 עם שינויים שוברים; התיעוד של הגרסה עדיף על הנחיה כללית |
| vercel:react-best-practices | NOT NEEDED | לא הופעל | ביצועי React נבדקו בשער 9 |
| vercel:shadcn | NOT NEEDED | אין בפרויקט CLI של shadcn; תיעוד ה־theming נקרא ישירות | נדרש רק רעיון תפקידי הטוקנים |
| Mobbin MCP | CONSULTED | שלוש קריאות `search_screens` (הראשונה פגה) | אריחי צבע למשפחות, משטחים צבועים לפי תפקיד, פאנל מוקד אחד למסך, לילה בגוון עמוק |
| 21st.dev Magic MCP | UNAVAILABLE | שגיאת חיבור: "Not authenticated - your API key is missing or was reset" | לא נלקח ממנו דבר |
| Playwright | CONSULTED | playwright-core 1.62.1 | הדפדפן מאחורי כל מדידה וצילום |
| Figma | UNAVAILABLE | דורש OAuth, והסשן לא אינטראקטיבי | הבריף: חוסר אימות ל־Figma לא חוסם עיצוב בקוד |
