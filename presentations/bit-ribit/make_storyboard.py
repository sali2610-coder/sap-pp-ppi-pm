# -*- coding: utf-8 -*-
"""Storyboard for the NEW narrative deck (product story, Spotify-style dark).
Spine: כסף רדום -> ריביט -> פלטפורמה פיננסית. Frameworks support the story, not center it.
Output -> visuals/storyboard.svg (preview only; not a deck asset)."""
import pathlib
OUT=pathlib.Path(__file__).parent/"visuals"; OUT.mkdir(exist_ok=True)
BG="#06080B"; PANEL="#0E141C"; LINE="#1C2730"; WT="#EAF2F8"; WMUT="#8B9AA8"; WFAINT="#5C6B79"
CY="#2BD4E6"; CYD="#0E7C9B"; NAVY="#7FA8C9"; GRN="#34D9A0"; AMB="#F2B441"; VIO="#9D8CFF"; RED="#FF6B66"
FACE="Arial, 'Arial Hebrew', 'Helvetica Neue', sans-serif"; BLACK="'Arial Black', Arial, sans-serif"
def TX(x,y,s,sz=15,c=WT,w="normal",a="start",ltr=False,ls=None,face=None):
    e=' direction="ltr" unicode-bidi="isolate"' if ltr else ''
    e+=f' letter-spacing="{ls}"' if ls is not None else ''
    e+=f' font-family="{face}"' if face else ''
    return f'<text x="{x}" y="{y}" font-size="{sz}" fill="{c}" font-weight="{w}" text-anchor="{a}"{e}>{s}</text>'
def rect(x,y,w,h,f,rx=12,st="none",sw=1):
    return f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="{rx}" fill="{f}" stroke="{st}" stroke-width="{sw}"/>'
def circ(cx,cy,r,f,st="none",sw=1): return f'<circle cx="{cx}" cy="{cy}" r="{r}" fill="{f}" stroke="{st}" stroke-width="{sw}"/>'

ACTS=[("1 · הבעיה",AMB),("2 · ריביט",CY),("3 · האסטרטגיה",NAVY),("4 · ערך ומדידה",GRN),("5 · התמורה",VIO)]
# beat: (num, headline lines, support-tag, memorable-image, act-index)
BEATS=[
 ("1",["ביט מעירה","כסף רדום"],"שער",["כותרת-על · דרמה"],0),
 ("2",["מיליארדים","שוכבים ב-0%"],"TAM/SAM/SOM",["מספר ענק: 0%"],0),
 ("3",["מצינור תשלומים","→ פלטפורמה"],"הכיוון החדש",["לפני ← אחרי"],0),
 ("4",["הכירו את","ריביט · 4%"],"המוצר",["טלפון + 4%"],1),
 ("5",["3.5M כבר","בכיס שלנו"],"SAM",["מספר ענק: 3.5M"],1),
 ("6",["4% — ללא","שום תנאי"],"ניתוח מתחרים",["בר מול PayBox/Max"],1),
 ("7",["עיבוי יכולות","+ me-too"],"סוג השינוי",["דיאגרמת מהלך"],2),
 ("8",["פלטפורמה =","חזון הבנק"],"חזון/משימה",["חיבור לחזון"],2),
 ("9",["2 כוחות →","חסם נטישה"],"Porter",["אקולייזר · 2"],2),
 ("10",["⅔ בבנק זר","→ ביט לוכדת"],"סוס טרויאני",["לכידת נזילות"],2),
 ("11",["תשואה בקליק","בלי חיכוך"],"VPC",["כאב ← רווח"],3),
 ("12",["1 מטרה ·","3 KR"],"OKR",["טבעות 15/10/20%"],3),
 ("13",["רדום → ריביט","→ פלטפורמה"],"מנוע הערך",["גלגל תנופה"],4),
 ("14",["עכשיו ברור","למה ריביט"],"מסר סיום",["שורה אחת + מקורות"],4),
]
b=rect(0,0,1280,720,BG,0)
# header
b+=TX(1240,46,"STORYBOARD · NEW NARRATIVE",13,CY,"bold","end",ltr=True,ls="2.6")
b+=TX(1240,84,"זרימת הסיפור החדשה — סיפור מוצר, לא דו\"ח ייעוץ",27,WT,"bold","start")
b+=rect(40,98,1200,1.5,LINE,0)
# spine
b+=rect(40,116,1200,52,PANEL,12,LINE,1)
sp=[("כסף רדום",AMB),("ריביט",CY),("פלטפורמה פיננסית",VIO)]
xs=[1080,640,300]
for i,((t,c),x) in enumerate(zip(sp,xs)):
    b+=circ(x,142,7,c); b+=TX(x,134-2,t,17,WT,"bold","middle")
b+=TX(1080,160,"",1)  # noop
# arrows on spine
b+=f'<path d="M1010 142 L720 142" stroke="{CY}" stroke-width="2.5" marker-end="url(#a)"/>'
b+=f'<path d="M560 142 L375 142" stroke="{VIO}" stroke-width="2.5" marker-end="url(#a)"/>'
b+=f'<defs><marker id="a" markerWidth="9" markerHeight="9" refX="6" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 Z" fill="{CY}"/></marker></defs>'
b+=TX(1240,150,"הספינה של הסיפור",12,WFAINT,"normal","start")
# act legend
lx=40
for t,c in ACTS:
    w=190
    b+=circ(lx+12,196,6,c)+TX(lx+170,201,t,13,WMUT,"normal","start")
    lx+=238
# beat cards 2 rows x 7
cw=158; gap=14; x0=40; rowy=[236,478]; cardh=212
for i,(num,hl,tag,img,ai) in enumerate(BEATS):
    col=i%7; row=i//7
    x=x0+col*(cw+gap); y=rowy[row]
    c=ACTS[ai][1]
    b+=rect(x,y,cw,cardh,PANEL,12,LINE,1)+rect(x,y,cw,5,c,5)
    b+=circ(x+cw-26,y+30,15,c)+TX(x+cw-26,y+35,num,14,BG,"bold","middle",ltr=True)
    # headline
    for j,ln in enumerate(hl):
        b+=TX(x+cw-16,y+62+j*22,ln,15,WT,"bold","start")
    b+=rect(x+14,y+118,cw-28,1,LINE,0)
    # support tag
    b+=rect(x+cw-16-2,y+0,1,1,PANEL,0)  # noop spacing
    b+=rect(x+14,y+128,cw-28,26,"#0B1118",13,c,1)+TX(x+cw-22,y+145,tag,12,c,"bold","start")
    # memorable image
    b+=TX(x+cw-16,y+178,"התמונה שנזכרת:",10.5,WFAINT,"bold","start")
    for j,ln in enumerate(img):
        b+=TX(x+cw-16,y+196+j*15,ln,11,WMUT,"normal","start")
# footer
b+=rect(40,702,1200,1,LINE,0)
b+=TX(1240,716,"כל מסגרת תומכת בביט אחד בסיפור — לא במרכזו · תוכן אקדמי נשמר (TAM/SAM/SOM · מתחרים · Porter · VPC · OKR)",12,WFAINT,"normal","start")
svg=(f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1280 720" width="1280" height="720" '
     f'font-family="{FACE}" direction="rtl">{b}</svg>')
(OUT/"storyboard.svg").write_text(svg,encoding="utf-8"); print("wrote storyboard.svg")
