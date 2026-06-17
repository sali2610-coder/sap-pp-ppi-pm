# -*- coding: utf-8 -*-
"""Narrative deck (product story) — near-black + Bit cyan, Spotify-level storytelling.
Spine: כסף רדום -> ריביט -> פלטפורמה פיננסית. Frameworks support the story.
Builds 11 new dark slides; Porter/OKR/Flywheel reuse the existing dark heroes.
Output -> visuals/story/*.svg"""
import pathlib, math
OUT=pathlib.Path(__file__).parent/"visuals"/"story"; OUT.mkdir(parents=True,exist_ok=True)

BG="#0C1622"; PANEL="#18242F"; PANEL2="#1C2836"; LINE="#2C3B48"
WT="#F4F8FC"; WMUT="#B8C7D4"; WFAINT="#8696A4"
CY="#2DD8EC"; CY2="#1CC3D8"; CYD="#1490B2"; CYDIM="#12455A"
RED="#FF8580"; GRN="#49E2AE"; AMB="#F6C45C"; VIO="#AB9DFF"
FACE="Arial, 'Arial Hebrew', 'Helvetica Neue', sans-serif"; BLACK="'Arial Black', Arial, sans-serif"

DEFS=f'''<defs>
 <radialGradient id="bg" cx="0.74" cy="0.18" r="1.05"><stop offset="0" stop-color="#173F5B"/><stop offset="0.55" stop-color="#111F2C"/><stop offset="1" stop-color="#0C1622"/></radialGradient>
 <linearGradient id="gcy" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#2CD8EC"/><stop offset="1" stop-color="#1490B2"/></linearGradient>
 <linearGradient id="gcyV" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2CD8EC"/><stop offset="1" stop-color="#1490B2"/></linearGradient>
 <linearGradient id="gnavy" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#1B4A6A"/><stop offset="1" stop-color="#142E41"/></linearGradient>
 <linearGradient id="gflow" x1="1" y1="0" x2="0" y2="0"><stop offset="0" stop-color="#E0413E"/><stop offset="0.5" stop-color="#142E41"/><stop offset="1" stop-color="#49E2AE"/></linearGradient>
 <filter id="glow" x="-70%" y="-70%" width="240%" height="240%"><feGaussianBlur stdDeviation="8" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
 <filter id="glowS" x="-70%" y="-70%" width="240%" height="240%"><feGaussianBlur stdDeviation="3.5" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
 <filter id="sh" x="-30%" y="-40%" width="160%" height="180%"><feDropShadow dx="0" dy="8" stdDeviation="16" flood-color="#02060A" flood-opacity="0.5"/></filter>
</defs>'''
def doc(body): return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1280 720" width="1280" height="720" '
    f'font-family="{FACE}" direction="rtl"><rect width="1280" height="720" fill="url(#bg)"/>{DEFS}{body}</svg>')
def TX(x,y,s,sz=16,c=WT,w="normal",a="start",ltr=False,ls=None,face=None,op=None):
    e=' direction="ltr" unicode-bidi="isolate"' if ltr else ''
    e+=f' letter-spacing="{ls}"' if ls is not None else ''
    e+=f' font-family="{face}"' if face else ''
    e+=f' opacity="{op}"' if op is not None else ''
    return f'<text x="{x}" y="{y}" font-size="{sz}" fill="{c}" font-weight="{w}" text-anchor="{a}"{e}>{s}</text>'
def BN(x,y,s,sz,c,a="start",glow=True):
    g=' filter="url(#glow)"' if glow else ''
    return f'<text x="{x}" y="{y}" font-size="{sz}" fill="{c}" font-weight="bold" text-anchor="{a}" direction="ltr" unicode-bidi="isolate" font-family={chr(34)}{BLACK}{chr(34)}{g}>{s}</text>'
def rect(x,y,w,h,f,rx=14,st="none",sw=1,sh=False,op=None):
    o=f' fill-opacity="{op}"' if op is not None else ''
    fl=' filter="url(#sh)"' if sh else ''
    return f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="{rx}" fill="{f}"{o} stroke="{st}" stroke-width="{sw}"{fl}/>'
def circ(cx,cy,r,f,st="none",sw=1,glow=False):
    g=' filter="url(#glowS)"' if glow else ''
    return f'<circle cx="{cx}" cy="{cy}" r="{r}" fill="{f}" stroke="{st}" stroke-width="{sw}"{g}/>'
IC={
 "coins":"M4 7c0-1.6 3.1-2.8 7-2.8S18 5.4 18 7s-3.1 2.8-7 2.8S4 8.6 4 7Z M4 7v5c0 1.6 3.1 2.8 7 2.8S18 13.6 18 12V7 M4 12v5c0 1.6 3.1 2.8 7 2.8S18 18.6 18 17v-5",
 "users":"M15 19v-1.2a3.6 3.6 0 0 0-3.6-3.6H6.6A3.6 3.6 0 0 0 3 17.8V19 M9 11.2A3.1 3.1 0 1 0 9 5a3.1 3.1 0 0 0 0 6.2 M21 19v-1.2a3.6 3.6 0 0 0-2.7-3.5 M16.5 5.2a3.1 3.1 0 0 1 0 5.9",
 "bolt":"M13 3 5.5 13H11l-1 8 8.5-10.5H13Z","trend":"M3 17l5.5-5.5 3.5 3.5L20 7 M15 7h5v5",
 "bank":"M3 9.5 12 4l9 5.5 M5 10v8 M9.7 10v8 M14.3 10v8 M19 10v8 M3.5 20.5h17",
 "wallet":"M3 8.5C3 7 4 6 5.5 6H17l1.5 0 M3 8.5V17a2 2 0 0 0 2 2h13a1.5 1.5 0 0 0 1.5-1.5V11A1.5 1.5 0 0 0 18 9.5H5.5A2.5 2.5 0 0 1 3 8.5Z M16.5 13.5h.01",
 "magnet":"M5 4h4v8a3 3 0 0 0 6 0V4h4v8a7 7 0 0 1-14 0Z M5 8.3h4 M15 8.3h4",
 "globe":"M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Z M3 12h18 M12 3c2.5 2.6 2.5 15.4 0 18 M12 3c-2.5 2.6-2.5 15.4 0 18",
 "zzz":"M6 8h5l-5 6.5h5 M14 4.5h4l-4 5h4","check":"M5 12.5l4.5 4.5L20 6.5",
 "layers":"M12 4 21 9l-9 5-9-5Z M3 14l9 5 9-5","shield":"M12 3l7.5 2.8v5.4c0 4.7-3.2 7.6-7.5 9.3-4.3-1.7-7.5-4.6-7.5-9.3V5.8Z M8.8 12l2.2 2.2L15.4 9.8",
 "target":"M12 4a8 8 0 1 0 0 16 8 8 0 0 0 0-16Z M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z M12 11.4a.6.6 0 1 0 0 1.2.6.6 0 0 0 0-1.2Z",
 "copy":"M9 9h11v11H9Z M5 15H4V4h11v1","spark":"M12 3l1.9 5.6L19.5 9l-4.4 3.2L16.6 18 12 14.7 7.4 18l1.5-5.8L4.5 9l5.6-.4Z",
 "anchor":"M12 6.5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z M12 6.5V20 M5 13a7 7 0 0 0 14 0 M5 13H7.5 M19 13h-2.5",
}
def icon(x,y,s,name,c=WT,sw=1.9,glow=False):
    g=' filter="url(#glowS)"' if glow else ''
    return (f'<g transform="translate({x},{y}) scale({s/24:.4f})" fill="none" stroke="{c}" '
            f'stroke-width="{sw}" stroke-linecap="round" stroke-linejoin="round"{g}><path d="{IC[name]}"/></g>')
def chip(cx,cy,r,name,bg,icol,isz=None,glow=False):
    isz=isz or r*1.1; return circ(cx,cy,r,bg,glow=glow)+icon(cx-isz/2,cy-isz/2,isz,name,icol)
def head(kicker,title,page,tag=None):
    s=TX(1240,58,kicker,13,CY,"bold","end",ltr=True,ls="2.6")
    s+=f'<rect x="1232" y="74" width="8" height="40" rx="3" fill="url(#gcyV)"/>'
    s+=TX(1216,107,title,33,WT,"bold","start")
    if tag: s+=rect(40,80,len(tag)*9+44,30,"#162835",15,CYD,1)+TX(62+ (len(tag)*9+44)-22,100,tag,13,CY,"bold","start")
    return s
def foot(page):
    return (TX(40,702,"ביט (bit) · ריביט — עבודת סיום",12,WFAINT,"normal","start")
            +TX(1240,702,f"{page} / 15",12,WFAINT,"normal","start",ltr=True))
def support(x,y,t):  # framework support tag (small, bottom)
    return rect(x,y,len(t)*8.0+30,26,"#162835",13,CYD,1)+icon(x+8,y+5,16,"layers",CY,1.6)+TX(x+len(t)*8.0+22,y+17,t,12,CY,"bold","start")
def W(n,svg):(OUT/f"{n}.svg").write_text(svg,encoding="utf-8");print("wrote",n)

# ---------- 1 COVER (keynote — dominant title, single ribit focal, thin footer) ----------
b=''
# logo
b+=BN(640,130,"bit",36,WT,"middle",glow=False)
b+=TX(640,160,"עבודת סיום · ניהול מוצר טכנולוגי 4060 · מרצה: יעל רובינשטיין זיו",11,WFAINT,"normal","middle",ls="0.3")
# DOMINANT TITLE (+40%, the thesis)
b+=TX(640,280,"מצינור תשלומים",78,WT,"bold","middle")
b+=f'<text x="640" y="366" font-size="78" font-weight="bold" text-anchor="middle" fill="url(#gcy)" filter="url(#glow)">לפלטפורמה פיננסית.</text>'
b+=rect(552,390,176,5,"url(#gcy)",3)
# single ribit focal
b+=f'<g opacity="0.10">{circ(640,480,86,CY,glow=True)}</g>'
b+=circ(640,480,48,"url(#gnavy)",CY,2.5,glow=True)+icon(623,463,34,"bolt",CY,2.2,glow=True)
b+=TX(640,550,"ריביט",18,CY,"bold","middle",ls="1")
# supporting message
b+=TX(640,594,"השקת ”ריביט” — פיקדון נושא ריבית, נובמבר 2025.",17,WMUT,"normal","middle")
# thin footer — names only
b+=rect(40,666,1200,40,PANEL,12,LINE,1)
b+=TX(640,691,"סאלי חליף · נתנאל יברקן · ליהי שניידר · נעה מונטל פברמן · יוני 2026",12,WMUT,"normal","middle")
W("s01_cover",doc(b))

# ---------- 2 PROBLEM ----------
b=head("THE PROBLEM","הכסף הגדול בישראל — לא עובד.",2,)
b+=BN(360,430,"0%",230,CY,"middle")
b+=TX(360,510,"תשואה על הכסף הרדום",20,WMUT,"normal","middle")
# right copy
b+=rect(740,200,470,150,PANEL,16,LINE,1)+rect(740,200,6,150,AMB,3)
b+=TX(1186,244,"מאות מיליארדי ₪",26,WT,"bold","start")
b+=TX(1186,284,"שוכבים בעו”ש ובארנקים דיגיטליים",16,WMUT,"normal","start")
b+=TX(1186,316,"ללא ריבית — בזמן שפיקדונות קצרים מניבים 3%–4%.",16,WMUT,"normal","start")
b+=rect(740,372,470,120,PANEL,16,LINE,1)+rect(740,372,6,120,CY,3)
b+=TX(1186,414,"הכסף כבר נמצא אצל המשתמשים.",18,WT,"bold","start")
b+=TX(1186,446,"מה שחסר: סיבה אחת להשאיר אותו —",15,WMUT,"normal","start")
b+=TX(1186,470,"ולתת לו לעבוד.",15,WMUT,"normal","start")
b+=support(740,540,"TAM / SAM / SOM")
b+=rect(120,592,1090,64,PANEL,12,CYD,1)+rect(120,592,6,64,CY,3)+icon(140,612,24,"layers",CY,1.9)
b+=TX(1190,620,"כך הגענו למסקנה",15,CY,"bold","start")
b+=TX(1190,644,"ניתוח מאקרו · Benchmark מול המתחרים · ניתוח התנהגות משתמשי ביט.",14,WMUT,"normal","start")
b+=foot(2)
W("s02_problem",doc(b))

# ---------- 3 THE SHIFT (cinematic transformation) ----------
b=head("THE MOVE","המהלך — במשפט אחד.",3)
ry=372
b+=f'<path d="M1042 {ry} L238 {ry}" stroke="{CY}" stroke-width="2.5" opacity="0.28"/>'
b+=f'<path d="M918 {ry} L772 {ry}" stroke="url(#gcy)" stroke-width="11" marker-end="url(#mv)" filter="url(#glowS)" stroke-linecap="round"/>'
b+=f'<path d="M508 {ry} L362 {ry}" stroke="url(#gcy)" stroke-width="11" marker-end="url(#mv)" filter="url(#glowS)" stroke-linecap="round"/>'
b+=f'<defs><marker id="mv" markerWidth="7" markerHeight="7" refX="4.5" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 Z" fill="{CY}"/></marker></defs>'
b+=TX(845,ry-92,"מוסיף שכבת חיסכון",13,CY,"normal","middle")+TX(435,ry-92,"נפתח לעולם פיננסי",13,CY,"normal","middle")
# right — payments
b+=circ(1000,ry,60,PANEL,"#3C4F5C",2)+icon(978,ry-22,44,"copy","#8C9BA8",1.8)
b+=TX(1000,ry+98,"תשלומים",30,WT,"bold","middle")+TX(1000,ry+128,"העברות בין אנשים",15,WFAINT,"normal","middle")
# center — ribit (hinge: glow, modestly larger)
b+=f'<g opacity="0.10">{circ(640,ry,108,CY,glow=True)}</g>'
b+=circ(640,ry,66,"url(#gnavy)",CY,3,glow=True)+icon(618,ry-22,44,"bolt",CY,2.2,glow=True)
b+=TX(640,ry+102,"ריביט",32,CY,"bold","middle")+TX(640,ry+132,"הפיצ’ר שמחבר",15,WMUT,"normal","middle")
# left — platform
b+=circ(280,ry,60,PANEL,WT,2)+icon(258,ry-22,44,"globe",WT,1.8)
b+=TX(280,ry+98,"פלטפורמה",30,WT,"bold","middle")+TX(280,ry+128,"חיסכון · תשואה · ערך",15,WFAINT,"normal","middle")
b+=TX(640,596,"ריביט הפך את ביט מאפליקציית תשלומים — לפלטפורמה שגם חוסכת.",20,WT,"normal","middle")
b+=support(70,624,"הכיוון החדש")
b+=foot(3)
W("s03_shift",doc(b))

# ---------- 4 MEET RIBIT (4% dominates) ----------
b=head("THE PRODUCT","הכירו את ריביט.",4)
b+=f'<g opacity="0.11">{circ(432,406,272,CY,glow=True)}</g>'
b+=BN(432,478,"4%",340,CY,"middle")
b+=TX(432,568,"ריבית שנתית על כסף שפשוט יושב בארנק",22,WMUT,"normal","middle")
b+=TX(1240,222,"פיקדון נושא ריבית — בתוך האפליקציה.",24,WT,"bold","start")
b+=rect(700,256,540,372,PANEL,18,LINE,1,sh=True)
rows=[("spark","נובמבר 2025","מועד ההשקה"),("bolt","4% · 3 חודשים","המסלול בהשקה"),("coins","10–20,000 ₪","סכום ההפקדה"),("wallet","נזיל או נעול","מסלולי משיכה")]
y=304
for ic,v,l in rows:
    b+=chip(1206,y+4,24,ic,"#173745",CY,22)
    b+=TX(1166,y,v,22,WT,"bold","start")+TX(1166,y+26,l,15,WMUT,"normal","start")
    if ic!="wallet": b+=f'<line x1="724" y1="{y+44}" x2="1216" y2="{y+44}" stroke="{LINE}" stroke-width="1"/>'
    y+=80
b+=TX(1240,664,"בלי חשבון בנק ובלי סניף — הכל בממשק הכיסים המוכר.",15,WMUT,"normal","start")
b+=foot(4)
W("s04_ribit",doc(b))

# ---------- 5 CAPTIVE BASE ----------
b=head("THE BASE","הפלטפורמה כבר בכיס.",5)
b+=BN(370,392,"3.5M",162,CY,"middle")
b+=TX(370,460,"משתמשי ביט פעילים — השוק הנגיש (SAM)",19,WMUT,"normal","middle")
b+=TX(370,500,"יעד שנה 1 (SOM): ~525K · כ-15% מהפעילים",15,CY,"normal","middle")
b+=rect(760,210,450,130,PANEL,16,LINE,1)+rect(760,210,6,130,CY,3)
b+=BN(786,290,"29.4B ₪",46,WT,"start")
b+=TX(1186,322,"עוברים דרך ביט בכל שנה",15,WMUT,"normal","start")
b+=rect(760,360,450,130,PANEL,16,LINE,1)+rect(760,360,6,130,GRN,3)
b+=TX(1186,402,"בלי לגייס אף אחד",22,GRN,"bold","start")
b+=TX(1186,436,"לא צריך להביא לקוח חדש —",15,WMUT,"normal","start")
b+=TX(1186,460,"הוא כבר כאן, רק צריך להציע לו.",15,WMUT,"normal","start")
b+=support(760,540,"שוק נגיש · SAM")
b+=foot(5)
W("s05_base",doc(b))

# ---------- 6 COMPETITORS ----------
b=head("THE MARKET GAP","התשואה הגבוהה — בתוך האפליקציה, בלי חיכוך.",6)
comp=[("ביט","4%","בתוך האפליקציה · 10–20K ₪",CY,True,0.66),("PayBox","2.5–6%","מותנה בשימוש בכרטיס",WMUT,False,1.0),("Max","~3%","יתרה נזילה עד ~500K ₪",WMUT,False,0.5)]
x0=70; cw=372; gap=18
for i,(nm,v,cond,col,hi,bar) in enumerate(comp):
    x=x0+i*(cw+gap)
    b+=rect(x,160,cw,360,("url(#gnavy)" if hi else PANEL),20,(CY if hi else LINE),(2 if hi else 1),sh=hi)
    if hi: b+=rect(x+cw-150,180,128,30,"url(#gcy)",15)+TX(x+cw-86,201,"המובילה",13,"#062430","bold","middle")
    b+=TX(x+cw-24,232,nm,24,(CY if hi else WT),"bold","start")
    b+=BN(x+cw-24,330,v,(64 if hi else 56),(CY if hi else WT),"end")
    b+=TX(x+cw-24,362,("עד 4% · לפי מסלול" if hi else "תשואה שנתית"),14,(CY if hi else WMUT),"normal","start")
    b+=rect(x+24,382,cw-48,12,"#16242F",6)+rect(x+24+(cw-48)*(1-bar),382,(cw-48)*bar,12,(CY if hi else "#3A4A57"),6)
    b+=TX(x+cw-24,452,"תנאי",13,(CY if hi else CYD),"bold","start")+TX(x+cw-24,478,cond,15,(WT if hi else WMUT),"normal","start")
b+=support(70,548,"ניתוח מתחרים")
b+=foot(6)
W("s06_compete",doc(b))

# ---------- 7 CHANGE TYPE ----------
b=head("STRATEGIC ANALYSIS","איזה סוג מהלך זה?",7)
# the verdict — one dominant answer
b+=chip(1180,208,34,"layers","#164255",CY,30,glow=True)
b+=TX(1136,200,"עיבוי יכולות",48,CY,"bold","start")
b+=TX(1136,240,"Product Intensification — עיבוי המוצר הקיים",17,WMUT,"normal","start")
b+=f'<line x1="70" y1="272" x2="1210" y2="272" stroke="{LINE}" stroke-width="1.5"/>'
# evidence (large, back-row readable)
y=332
for t in ["מוסיף שכבת חיסכון מעל אפליקציית התשלומים","ממנף 3.5M משתמשים ו-29.4B ₪ העברות בשנה","בלי לפנות לקהל יעד חדש או טריטוריה חדשה"]:
    b+=icon(1224,y-20,26,"check",CY,2.3)+TX(1204,y,t,21,WT,"normal","start")
    y+=62
# me-too — subdued footnote
b+=rect(70,536,1140,72,PANEL,16,LINE,1)+rect(70,536,6,72,WFAINT,3)
b+=chip(1180,572,22,"copy","#1B2733",WFAINT,20)
b+=TX(1140,566,"ובמקביל — מהלך Me-too",17,WMUT,"bold","start")
b+=TX(1140,592,"יישור קו עם פייבוקס, שהציעה ריבית על יתרה עוד לפני ביט.",15,WMUT,"normal","start")
b+=foot(7)
W("s07_change",doc(b))

# ---------- 8 VISION FIT (ribit executes the vision) ----------
b=head("VISION & MISSION","מהחזון של הבנק — אל הביצוע של ריביט.",8)
# LEFT — the vision
b+=rect(70,168,540,406,PANEL,20,LINE,1,sh=True)+rect(70,168,540,6,WFAINT,3)
b+=chip(120,216,24,"globe","#173745",WMUT,22)+TX(580,222,"החזון",15,WFAINT,"bold","start",ls="1")
b+=TX(580,288,"”מחויבים לצמיחה",30,WT,"normal","start")
b+=TX(580,326,"באמצעות בנקאות",30,WT,"normal","start")
b+=TX(580,364,"מתחדשת והוגנת",30,CY,"bold","start")
b+=TX(580,402,"ללקוחותינו.”",30,WT,"normal","start")
b+=TX(580,458,"בנק הפועלים · חזון הבנק",13,WFAINT,"normal","start")
# RIGHT — ribit executes (each point maps to a vision word)
b+=rect(680,168,530,406,"url(#gnavy)",20,CY,1.6,sh=True)+rect(680,168,530,6,CY,3)
b+=chip(720,216,24,"bolt","#164255",CY,22,glow=True)+TX(1190,222,"הביצוע — ריביט",16,CY,"bold","start")
for y,(h,t) in zip([290,388,486],[("בנקאות מתחדשת","חיסכון דיגיטלי בקליק, בלי פיקדון מסורתי"),("נגישות","בלי חשבון ובלי סניף — באפליקציה המוכרת"),("הוגנת","תשואה מעל הממוצע, שקופה, עם גב בנקאי")]):
    b+=icon(1196,y-16,22,"check",CY,2.2)+TX(1176,y,h,18,CY,"bold","start")+TX(1176,y+26,t,14.5,WT,"normal","start")
# BRIDGE
b+=f'<path d="M676 371 L616 371" stroke="url(#gcy)" stroke-width="8" marker-end="url(#vb)" filter="url(#glowS)"/>'
b+=f'<defs><marker id="vb" markerWidth="9" markerHeight="9" refX="6" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 Z" fill="{CY}"/></marker></defs>'
b+=circ(645,371,27,"url(#bg)",CY,2)+TX(645,377,"מבצע",13,CY,"bold","middle")
b+=TX(640,612,"ריביט מתרגם עיקרון מהחזון — לשירות פיננסי יומיומי בכיס.",17,WMUT,"normal","middle")
b+=foot(8)
W("s08_vision",doc(b))

# ---------- 10 TROJAN ----------
b=head("THE STRATEGIC HOOK","הסוס הטרויאני.",10)
b+=BN(360,360,"⅔",170,CY,"middle") if False else BN(360,370,"2/3",150,CY,"middle")
b+=TX(360,440,"ממשתמשי ביט אינם לקוחות",18,WMUT,"normal","middle")
b+=TX(360,466,"של בנק הפועלים",18,WMUT,"normal","middle")
# flow rivals->bit->hapoalim
b+=rect(720,180,490,120,PANEL,16,LINE,1)+rect(720,180,6,120,RED,3)
b+=TX(1186,220,"כסף נכנס לריביט",18,RED,"bold","start")
b+=TX(1186,252,"יתרות זורמות מהבנק המתחרה",15,WMUT,"normal","start")
b+=TX(1186,276,"אל תוך ביט.",15,WMUT,"normal","start")
b+=rect(720,316,490,120,PANEL,16,LINE,1)+rect(720,316,6,120,CY,3)
b+=TX(1186,356,"ביט לוכדת נזילות ומידע",18,CY,"bold","start")
b+=TX(1186,388,"קשר פיננסי ישיר עם אנשים",15,WMUT,"normal","start")
b+=TX(1186,412,"שאינם לקוחות של הבנק.",15,WMUT,"normal","start")
b+=rect(720,452,490,90,"url(#gnavy)",16,CY,1.2)+rect(720,452,6,90,GRN,3)
b+=TX(1186,488,"ממוצר הפסדי → משפך גיוס",18,GRN,"bold","start")
b+=TX(1186,518,"ביט הופכת לראש גשר ”עוקף-בנק” עבור בנק הפועלים.",14,WMUT,"normal","start")
b+=rect(120,502,490,66,PANEL,12,CY,1.2)+rect(120,502,6,66,CY,3)
b+=TX(584,528,"המשמעות",13,CY,"bold","start")
b+=TX(584,552,"יותר נזילות · יותר דאטה · Cross-Sell עתידי",14,WT,"normal","start")
b+=foot(10)
W("s10_trojan",doc(b))

# ---------- 11 VPC ----------
b=head("CUSTOMER VALUE","הערך ללקוח — תשואה בקליק.",11)
b+=rect(70,180,540,340,PANEL,20,LINE,1,sh=True)+rect(70,180,540,56,"#2C2022",20)+rect(70,224,540,12,"#2C2022",0)
b+=chip(590,208,22,"zzz","#362022",RED,20)+TX(550,214,"הכאב (Pains)",19,RED,"bold","start")
pains=["כסף בעו”ש/ביט כמעט ללא ריבית","מתחרים מפרסמים 2.5%–6% — ”פספוס תשואה”","פיקדון בנקאי = חיכוך, סניף, בירוקרטיה"]
for i,t in enumerate(pains): b+=icon(556,266+i*52,20,"zzz",RED,1.7)+TX(566,280+i*52,t,15.5,WT,"normal","start")
b+=rect(670,180,540,340,"url(#gnavy)",20,CY,1.4,sh=True)+rect(670,180,540,56,"#164255",20)+rect(670,224,540,12,"#164255",0)
b+=chip(1190,208,22,"check","#164255",CY,20)+TX(1150,214,"הרווח (Gains)",19,CY,"bold","start")
gains=["תשואה אוטומטית — בלחיצה אחת","שקיפות מלאה + גב בנקאי אמין","חוויית כיסי-יעד יומיומית בתוך האפליקציה"]
for i,t in enumerate(gains): b+=icon(1176,266+i*52,20,"check",CY,1.7)+TX(1186,280+i*52,t,15.5,WT,"normal","start")
b+=rect(70,544,1140,46,"#162835",12,CYD,1)+icon(90,556,22,"target",CY)+TX(1190,572,"Fit:",14,CY,"bold","start")+TX(1150,572,"ריביט ממנף משתמשים מזוהים (KYC) ומסיר חיכוך — יתרון על הבנקים, לא רק התשואה.",14,WMUT,"normal","start")
b+=support(70,612,"ערך ללקוח · Value Proposition Canvas") if False else ""
b+=TX(1240,636,"ערך ללקוח · Value Proposition Canvas",12,CY,"bold","start")
b+=foot(11)
W("s11_vpc",doc(b))

# ---------- 14 AI CRITIQUE (what AI got right / missed) ----------
b=head("AI · CRITICAL REVIEW","מה למדנו מהבינה המלאכותית.",14)
b+=TX(1240,168,"שילבנו ChatGPT · Gemini · Perplexity — והצלבנו כל טענה מול הנתונים.",17,WMUT,"normal","start")
b+=rect(70,214,1140,82,PANEL,16,LINE,1,sh=True)+rect(70,214,6,82,GRN,3)
b+=circ(1180,255,26,"#16352A")+icon(1167,242,26,"check",GRN,2.4)
b+=TX(1138,263,"זיהתה נכון את מגמת הריבית והלחץ התחרותי",21,WT,"normal","start")
b+=rect(70,310,1140,82,PANEL,16,LINE,1,sh=True)+rect(70,310,6,82,GRN,3)
b+=circ(1180,351,26,"#16352A")+icon(1167,338,26,"check",GRN,2.4)
b+=TX(1138,359,"סייעה בכימות ההזדמנות ובניתוח השוק",21,WT,"normal","start")
b+=rect(70,406,1140,118,"url(#gnavy)",16,AMB,1.6,sh=True)+rect(70,406,6,118,AMB,3)
b+=circ(1180,452,26,"#3A2E14")+'<g transform="translate(1168,440)" fill="none" stroke="'+AMB+'" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 4 L21 19 H3 Z M12 10 v4.5 M12 17 h.01"/></g>'
b+=TX(1138,446,"פספסה את המנוע האסטרטגי המרכזי",21,AMB,"bold","start")
b+=TX(1138,486,"נזילות · שימור לקוחות · מודל ”הסוס הטרויאני”",18,WT,"normal","start")
b+=TX(640,580,"מסקנה: ה-AI מצוין למחקר ראשוני — אך ה”למה” העסקי דורש שיקול דעת אנושי.",16,WMUT,"normal","middle")
b+=foot(14)
W("s14_ai",doc(b))

# ---------- 15 CLOSING (punchline finale) ----------
b=''
b+=TX(1240,58,"THE TAKEAWAY",13,CY,"bold","end",ltr=True,ls="2.6")
b+=f'<rect x="1232" y="74" width="8" height="40" rx="3" fill="url(#gcyV)"/>'
b+=TX(1216,107,"שורה תחתונה.",33,WT,"bold","start")
b+=f'<g opacity="0.06">{circ(640,410,128,CY,glow=True)}</g>'
b+=TX(640,332,"הכסף הרדום",58,WMUT,"bold","middle")
b+=f'<text x="640" y="432" font-size="94" font-weight="bold" text-anchor="middle" fill="url(#gcy)" filter="url(#glow)">התחיל לעבוד.</text>'
b+=rect(556,456,168,5,"url(#gcy)",3)
b+=TX(640,506,"ריביט הפך את ביט מאפליקציית תשלומים — לפלטפורמה פיננסית.",22,WT,"normal","middle")
b+=TX(640,546,"כסף רדום   →   ריביט   →   פלטפורמה",16,CY,"normal","middle")
b+=TX(640,652,"מקורות: בנק הפועלים (3.11.2025) · גיקטיים · כלכליסט (×2) · אייס · חזון הבנק · צילום אפליקציית ביט (2026).",11.5,WFAINT,"normal","middle")
b+=foot(15)
W("s14_closing",doc(b))
print("DONE story deck — 11 new dark slides")
