# הרצה מקומית · הדרך הקנונית

תיקייה אחת, פקודה אחת לבנייה, פקודה אחת להגשה, פורט אחד: **4300**.

| | |
|---|---|
| תיקייה | `/Users/salihalif/Desktop/My-Projects/neo-redesign` (ענף `design/neo-experience-redesign`) |
| בנייה | `./node_modules/.bin/next build` |
| הגשה | `PORT=4300 python3 scripts/serve-out.py` |
| כתובת | `http://localhost:4300/neo/` |
| עצירה | Ctrl+C בחלון של ההגשה |

## למה כך

- האתר הוא ייצוא סטטי: `out/` הוא המוצר. `scripts/serve-out.py` מגיש אותו כמו המארח, כולל 465 ההפניות של `vercel.json`, דף 404 וכתובות עם `%2F`.
- `npm run build` מריץ קודם את `prebuild`, שכותב מחדש את `data/ai-tree/*.json` ואת מניפסטי הספרים. בתיקייה הזו בונים עם `./node_modules/.bin/next build` בלבד, כדי שהנתונים המוגנים לא ישתנו.
- לפני בנייה עוצרים את ההגשה: הבנייה מחליפה את `out/`.
- בנייה "קרה" (בלי מטמון Turbopack) לכל מדידה סופית: להזיז את `.next/cache/turbopack` הצידה (לא למחוק), ורק אז לבנות. מטמון חם הגיש פעם `globals.css` ישן.
- כדי למדוד כמו המארח, שדוחס כל דף: `COMPRESS=1 PORT=4300 python3 scripts/serve-out.py` (gzip; Vercel שולח brotli או gzip, כך שזה קירוב שמרני).
- `next dev` לא משמש לבדיקה: הוא לא מייצר את `out/`, לא מיישם את ההפניות ולא מתנהג כמו הייצוא.

## שרתים פתוחים

נבדק ב־1 באוקטובר 2026, 10:00: הפורט היחיד שמאזין הוא 4300, השרת של הסבב הזה (`scripts/serve-out.py` מהתיקייה הזו). לא נמצאו שרתי פיתוח ישנים של `sap-kb3` או של `neo-redesign`, ולכן לא נעצר שום תהליך.
לבדוק בעצמך: `lsof -nP -iTCP -sTCP:LISTEN | grep -E "node|Python"`. לעצור רק תהליך שהנתיב שלו בתוך `sap-kb3` או `neo-redesign`.
