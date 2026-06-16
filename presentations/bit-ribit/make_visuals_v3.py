# -*- coding: utf-8 -*-
"""V3 — premium executive infographics for the Bit-Ribit academic deck.
Same content + frameworks as V2; redesigned visual layer only.
Design language: editorial masthead, big display numbers, custom stroke icons,
gradients, soft shadows, data-first dashboards. No SmartArt, no generic circles+lines.
Output SVG -> visuals/ (same 8 names so generate.js picks them up)."""
import pathlib, math
OUT = pathlib.Path(__file__).parent / "visuals"; OUT.mkdir(exist_ok=True)
W_, H_ = 1280, 720

# ---- palette ----
BG="#FFFFFF"; PAPER="#F5F8FB"; LINE="#E4EAF0"
NAVY="#0A2540"; NAVY900="#07203A"
INK="#22303C"; MUT="#7C8895"; FAINT="#AEB8C2"
CY="#16B6CE"; CYD="#0E7C9B"; CYL="#E7F8FB"
RED="#E0413E"; REDL="#FCEDED"; GRN="#1E9E6A"; GRNL="#E7F7F0"; AMB="#D98A1F"; AMBL="#FBF1E2"
FACE="Arial, 'Arial Hebrew', 'Helvetica Neue', sans-serif"
BLACK="'Arial Black', Arial, sans-serif"

DEFS = f'''<defs>
 <linearGradient id="gNavy" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#10395F"/><stop offset="1" stop-color="#081F36"/></linearGradient>
 <linearGradient id="gCyan" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#22CCE0"/><stop offset="1" stop-color="#0E7C9B"/></linearGradient>
 <linearGradient id="gGreen" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#27B97E"/><stop offset="1" stop-color="#13885A"/></linearGradient>
 <linearGradient id="gRed" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#EC5754"/><stop offset="1" stop-color="#C7322F"/></linearGradient>
 <linearGradient id="gFlow" x1="1" y1="0" x2="0" y2="0"><stop offset="0" stop-color="#E0413E"/><stop offset="0.46" stop-color="#0A2540"/><stop offset="0.54" stop-color="#0A2540"/><stop offset="1" stop-color="#1E9E6A"/></linearGradient>
 <linearGradient id="gBand" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#0E3358"/><stop offset="1" stop-color="#0A2540"/></linearGradient>
 <filter id="sh" x="-20%" y="-30%" width="140%" height="160%"><feDropShadow dx="0" dy="6" stdDeviation="13" flood-color="#0A2540" flood-opacity="0.13"/></filter>
 <filter id="shS" x="-20%" y="-30%" width="140%" height="160%"><feDropShadow dx="0" dy="3" stdDeviation="7" flood-color="#0A2540" flood-opacity="0.10"/></filter>
</defs>'''

def doc(body, bg=BG):
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W_} {H_}" width="{W_}" height="{H_}" '
            f'font-family="{FACE}" direction="rtl"><rect width="{W_}" height="{H_}" fill="{bg}"/>{DEFS}{body}</svg>')

def TX(x,y,s,size=18,color=INK,w="normal",anchor="start",ltr=False,ls=None,face=None,op=None):
    a=f' direction="ltr" unicode-bidi="isolate"' if ltr else ''
    a+=f' letter-spacing="{ls}"' if ls is not None else ''
    a+=f' font-family="{face}"' if face else ''
    a+=f' opacity="{op}"' if op is not None else ''
    return f'<text x="{x}" y="{y}" font-size="{size}" fill="{color}" font-weight="{w}" text-anchor="{anchor}"{a}>{s}</text>'

def big(x,y,s,size,color,anchor="middle"):
    return TX(x,y,s,size,color,"bold",anchor,ltr=True,face=BLACK)

def rect(x,y,w,h,fill,rx=14,stroke="none",sw=1,sh=False,op=None):
    f=f' filter="url(#sh)"' if sh=="L" else (f' filter="url(#shS)"' if sh else '')
    o=f' fill-opacity="{op}"' if op is not None else ''
    return f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="{rx}" fill="{fill}"{o} stroke="{stroke}" stroke-width="{sw}"{f}/>'

def circ(cx,cy,r,fill,stroke="none",sw=1):
    return f'<circle cx="{cx}" cy="{cy}" r="{r}" fill="{fill}" stroke="{stroke}" stroke-width="{sw}"/>'

# ---- icon library (24x24 stroke) ----
IC = {
 "wallet":"M3 8.5C3 7 4 6 5.5 6H17l1.5 0 M3 8.5V17a2 2 0 0 0 2 2h13a1.5 1.5 0 0 0 1.5-1.5V11A1.5 1.5 0 0 0 18 9.5H5.5A2.5 2.5 0 0 1 3 8.5Z M16.5 13.5h.01",
 "coins":"M4 7c0-1.6 3.1-2.8 7-2.8S18 5.4 18 7s-3.1 2.8-7 2.8S4 8.6 4 7Z M4 7v5c0 1.6 3.1 2.8 7 2.8S18 13.6 18 12V7 M4 12v5c0 1.6 3.1 2.8 7 2.8S18 18.6 18 17v-5",
 "bank":"M3 9.5 12 4l9 5.5 M5 10v8 M9.7 10v8 M14.3 10v8 M19 10v8 M3.5 20.5h17",
 "users":"M15 19v-1.2a3.6 3.6 0 0 0-3.6-3.6H6.6A3.6 3.6 0 0 0 3 17.8V19 M9 11.2A3.1 3.1 0 1 0 9 5a3.1 3.1 0 0 0 0 6.2 M21 19v-1.2a3.6 3.6 0 0 0-2.7-3.5 M16.5 5.2a3.1 3.1 0 0 1 0 5.9",
 "trend":"M3 17l5.5-5.5 3.5 3.5L20 7 M15 7h5v5",
 "lock":"M6 11h12v8.5H6Z M8.5 11V8a3.5 3.5 0 0 1 7 0v3",
 "shield":"M12 3l7.5 2.8v5.4c0 4.7-3.2 7.6-7.5 9.3-4.3-1.7-7.5-4.6-7.5-9.3V5.8Z M8.8 12l2.2 2.2L15.4 9.8",
 "target":"M12 4a8 8 0 1 0 0 16 8 8 0 0 0 0-16Z M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z M12 11.4a.6.6 0 1 0 0 1.2.6.6 0 0 0 0-1.2Z",
 "flag":"M6 21V4 M6 4.5h11l-2.2 3.7L17 12H6",
 "alert":"M12 4.2 21 19.5H3Z M12 10v4.2 M12 16.8h.01",
 "trophy":"M8 4.5h8v3.5a4 4 0 0 1-8 0Z M8 6.2H5.2v.9a3 3 0 0 0 3 3 M16 6.2h2.8v.9a3 3 0 0 1-3 3 M10 13.8h4 M9 19.5h6 M12 13.8v3.4",
 "bolt":"M13 3 5.5 13H11l-1 8 8.5-10.5H13Z",
 "vault":"M4 5h16v14H4Z M12 8.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Z M12 12h.01 M8 19v1.6 M16 19v1.6",
 "magnet":"M5 4h4v8a3 3 0 0 0 6 0V4h4v8a7 7 0 0 1-14 0Z M5 8.3h4 M15 8.3h4",
 "gear":"M12 9.2a2.8 2.8 0 1 0 0 5.6 2.8 2.8 0 0 0 0-5.6Z M12 3.5v2.2 M12 18.3v2.2 M20.5 12h-2.2 M5.7 12H3.5 M18 6l-1.6 1.6 M7.6 16.4 6 18 M18 18l-1.6-1.6 M7.6 7.6 6 6",
 "clock":"M12 4.5a7.5 7.5 0 1 0 0 15 7.5 7.5 0 0 0 0-15Z M12 8v4.3l2.8 1.8",
 "funnel":"M3.5 4.5h17l-6.5 7.6v6l-4 2.2v-8.2Z",
 "check":"M5 12.5l4.5 4.5L20 6.5",
 "spark":"M12 3l1.9 5.6L19.5 9l-4.4 3.2L16.6 18 12 14.7 7.4 18l1.5-5.8L4.5 9l5.6-.4Z",
 "zzz":"M6 8h5l-5 6.5h5 M14 4.5h4l-4 5h4",
 "pulse":"M3 12h3.5l2-5 3 10 2.2-5H21",
 "anchor":"M12 6.5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z M12 6.5V20 M5 13a7 7 0 0 0 14 0 M5 13H7.5 M19 13h-2.5",
 "arrowL":"M14 6l-6 6 6 6",
 "info":"M12 4.5a7.5 7.5 0 1 0 0 15 7.5 7.5 0 0 0 0-15Z M12 11v5 M12 7.8h.01",
}
def icon(x,y,s,name,color=INK,sw=1.9):
    p=IC[name]; k=s/24
    return (f'<g transform="translate({x},{y}) scale({k:.4f})" fill="none" stroke="{color}" '
            f'stroke-width="{sw}" stroke-linecap="round" stroke-linejoin="round">'
            f'<path d="{p}"/></g>')
def iconchip(cx,cy,r,name,bg,icol,isz=None):
    isz=isz or r*1.15
    return circ(cx,cy,r,bg)+icon(cx-isz/2,cy-isz/2,isz,name,icol)

# ---- masthead ----
def head(eyebrow_en, title_he, badge_he):
    s = rect(40,38,118,34,BG,9,CY,1.5)+TX(99,60,badge_he,15,CYD,"bold","middle")
    s += TX(1240,52,eyebrow_en,13.5,CYD,"bold","end",ltr=True,ls="2.5")
    s += TX(1240,93,title_he,33,NAVY900,"bold","start")
    s += f'<line x1="40" y1="112" x2="1240" y2="112" stroke="{LINE}" stroke-width="1.5"/>'
    s += rect(1070,109,170,4,"url(#gCyan)",2)
    return s
def src(t):
    return TX(1240,702,t,12.5,FAINT,"normal","start")
def W(name, svg): (OUT/f"{name}.svg").write_text(svg, encoding="utf-8"); print("wrote", name)

# ===================================================================
# 1. TAM / SAM / SOM  — descending funnel + metric cards
# ===================================================================
b = head("MARKET SIZING 01","פוטנציאל השוק — TAM / SAM / SOM","מסגרת 1")
def trap(cx,y,tw,bw,h,fill,rx=10):
    return (f'<path d="M{cx-tw/2},{y} L{cx+tw/2},{y} L{cx+bw/2},{y+h} L{cx-bw/2},{y+h} Z" '
            f'fill="{fill}" filter="url(#shS)"/>')
fx=355
segs=[("TAM",520,360,150,"url(#gNavy)","#FFFFFF","מאות מיליארדי ₪","יתרות נזילות"),
      ("SAM",360,210,150,"url(#gCyan)","#06303F","~3.5M","משתמשים פעילים"),
      ("SOM",210,120,150,"#0E7C9B","#FFFFFF","≈525K","יעד שנה 1")]
y=158
for nm,tw,bw,h,fill,tc,m1,m2 in segs:
    b+=trap(fx,y,tw,bw,h,fill)
    b+=TX(fx,y+h/2-6,nm,21,tc,"bold","middle",ltr=True,ls="1")
    b+=TX(fx,y+h/2+18,m1,15,tc,"normal","middle")
    y+=h+6
b+=TX(fx,y+22,"שלושה צירי שוק — מהרחב לבר-מימוש",13.5,MUT,"normal","middle")
# right metric cards
def mcard(y,ic,head_,v,sub,col,accent):
    s=rect(690,y,540,108,BG,16,LINE,1.2,sh=True)
    s+=rect(690,y,7,108,accent,4)
    s+=iconchip(1175,y+54,30,ic,col,"#FFFFFF" if accent in(NAVY,CYD,GRN,RED) else NAVY,26)
    s+=TX(1130,y+40,head_,18,NAVY,"bold","start")
    s+=TX(1130,y+70,sub,14.5,MUT,"normal","start")
    s+=big(770,y+72,v,34,accent,"start")
    return s
b+=mcard(152,"coins","TAM — השוק הכולל","∞","מאות מיליארדי ₪ יתרות נזילות שאינן מניבות ריבית",NAVY,NAVY)
b+=mcard(272,"users","SAM — השוק הנגיש","3.5M","משתמשי ביט פעילים · עלות גיוס אפסית (Upsell)",CYD,CYD)
b+=mcard(392,"target","SOM — היעד הריאלי","525K","~15% מהפעילים · עוגן ביעדי OKR",GRN,GRN)
b+=rect(690,516,540,76,AMBL,14,AMB,1)+icon(708,536,24,"info",AMB)+TX(1208,544,"הערה מתודולוגית",14.5,AMB,"bold","start")
b+=TX(1208,570,"נתוני TAM אינם מתפרסמים רשמית — אומדנים מנומקים מנתוני ביט ויעדי OKR.",13,INK,"normal","start")
b+=src("מקור: נתוני ביט; כלכליסט 2025 · עיבוד המגישים")
W("fw1_tam_sam_som", doc(b))

# ===================================================================
# 2. Competitors — premium comparison, winner highlighted
# ===================================================================
b = head("COMPETITIVE BENCHMARK 02","ניתוח מתחרים — תשואה מול תנאים","מסגרת 2")
cards=[("ביט — ריביט","4%","עד","ללא תנאים · בתוך האפליקציה","נעול / יומי נזיל",0.66,True,"spark"),
       ("PayBox","2.5–6%","","מותנה בשימוש בכרטיס אשראי","נזיל",1.0,False,"wallet"),
       ("Max","3%","~","יתרה נזילה בחשבון","נזיל",0.5,False,"bank")]
x0=70; cw=362; gap=18
for i,(nm,v,pre,cond,liq,bar,hi,ic) in enumerate(cards):
    x=x0+i*(cw+gap)
    fill="url(#gNavy)" if hi else BG
    b+=rect(x,150,cw,432,fill,18,(CY if hi else LINE),(2 if hi else 1.2),sh=("L" if hi else True))
    tc="#FFFFFF" if hi else NAVY
    sub="#BFD3E0" if hi else MUT
    if hi: b+=rect(x+cw-150,168,128,30,"url(#gCyan)",15)+TX(x+cw-86,189,"התשואה המובילה",13,NAVY900,"bold","middle")
    b+=iconchip(x+44,184,26,ic,(CYL if not hi else "#13344F"),(CYD if not hi else CY),24)
    b+=TX(x+cw-24,228,nm,22,tc,"bold","start")
    if pre: b+=TX(x+cw-24,288,pre,18,(CY if hi else MUT),"normal","start")
    b+=big(x+cw-24,332,v,52,(CY if hi else NAVY),"end")
    b+=TX(x+cw-24,358,"תשואה שנתית",14,sub,"normal","start")
    # yield bar
    b+=rect(x+24,372,cw-48,12,(("#16344E") if hi else PAPER),6)
    b+=rect(x+24+(cw-48)*(1-bar),372,(cw-48)*bar,12,(CY if hi else CYD),6)
    b+=f'<line x1="{x+24}" y1="406" x2="{x+cw-24}" y2="406" stroke="{(("#1B3F5C") if hi else LINE)}" stroke-width="1"/>'
    b+=TX(x+cw-24,440,"תנאי",14,(CY if hi else CYD),"bold","start")+TX(x+cw-24,464,cond,14.5,tc,"normal","start")
    b+=TX(x+cw-24,512,"נזילות",14,(CY if hi else CYD),"bold","start")+TX(x+cw-24,536,liq,14.5,tc,"normal","start")
b+=rect(70,602,1160,64,CYL,14,CY,1)+icon(90,620,26,"spark",CYD)+TX(1208,628,"תובנה אסטרטגית",14.5,CYD,"bold","start")
b+=TX(1208,652,"ריביט = התשואה הגבוהה ביותר ללא תנאי כרטיס — כניסה הגנתית (מניעת זליגה) והתקפית (מיצוב חיסכון).",13.5,INK,"normal","start")
b+=src("מקורות: PayBox, Max, בנק הפועלים 2025 · עיבוד המגישים")
W("fw2_competitors", doc(b))

# ===================================================================
# 3. PORTER — Force Intensity Dashboard  (replaces center-circle+lines)
# ===================================================================
b = head("INDUSTRY STRUCTURE 03","חמשת הכוחות של פורטר — מפת עוצמה","מסגרת 3")
forces=[("כוח הלקוחות","עלות מעבר אפסית — מעבר לפייבוקס בלחיצה","users",5,RED,"גבוה"),
        ("איום התחליפים","פיקדון בנקאי · קרן כספית · עו\"ש","shield",5,RED,"גבוה"),
        ("תחרותיות בענף","PayBox · Max · בנקים דיגיטליים","trend",3,AMB,"בינוני"),
        ("מתחרים חדשים","ארנקים ובנקים דיגיטליים נכנסים","flag",3,AMB,"בינוני"),
        ("כוח הספקים","תשתית סליקה ובנקאות","bank",2,GRN,"נמוך")]
y=146; rh=78; gap=10
for i,(nm,txt,ic,lvl,col,tag) in enumerate(forces):
    strong=lvl>=5
    b+=rect(70,y,1160,rh,(REDL if strong else BG),16,(col if strong else LINE),(1.8 if strong else 1.2),sh=True)
    b+=rect(70,y,7,rh,col,4)
    b+=iconchip(1180,y+rh/2,27,ic,(col if strong else PAPER),("#FFFFFF" if strong else col),24)
    b+=TX(1130,y+33,nm,19,NAVY,"bold","start")
    b+=TX(1130,y+59,txt,14,MUT,"normal","start")
    # intensity meter (5 cells) center
    mx=470
    for c in range(5):
        on=c<lvl
        b+=rect(mx+c*30,y+rh/2-9,24,18,(col if on else PAPER),4,(("none") if on else LINE),1)
    b+=TX(mx+158,y+rh/2-14,"עוצמה",11.5,FAINT,"normal","start")
    # level chip
    b+=rect(120,y+rh/2-15,92,30,(col if strong else BG),15,col,1.4)
    b+=TX(166,y+rh/2+5,tag,14,("#FFFFFF" if strong else col),"bold","middle")
    y+=rh+gap
b+=rect(70,y,1160,66,"url(#gBand)",14)+icon(92,y+20,26,"spark",CY)
b+=TX(1208,y+30,"התובנה",15,CY,"bold","start")
b+=TX(1208,y+54,"שני הכוחות החזקים — לקוחות + תחליפים. ריביט יוצר חסם נטישה: ביט הופכת מהמאוים לתחליף עצמו.",14.5,"#FFFFFF","normal","start")
b+=src("עיבוד המגישים לפי Porter (1979)")
W("fw3_porter", doc(b))

# ===================================================================
# 4. VPC — Fit ledgers + interlock badge
# ===================================================================
b = head("VALUE PROPOSITION 04","קנבס הצעת הערך — Product–Market Fit","מסגרת 4")
def panel(x,title_,col,rows,gradHead):
    s=rect(x,148,512,452,BG,18,LINE,1.2,sh=True)
    s+=rect(x,148,512,56,gradHead,18)+rect(x,186,512,18,gradHead if gradHead.startswith("url") else gradHead,0)
    s+=TX(x+512-26,184,title_,19,"#FFFFFF","bold","start")
    yy=240
    for ic,h,t in rows:
        s+=iconchip(x+512-44,yy+10,24,ic,CYL,CYD,22)
        s+=TX(x+512-84,yy,h,16.5,NAVY,"bold","start")
        for j,tl in enumerate(t):
            s+=TX(x+512-84,yy+26+j*21,tl,13.5,INK,"normal","start")
        yy+=118
    return s
# customer profile (right)
prof=[("target","משימות (Jobs)",["לשים בצד סכום ולהרגיש שהכסף עובד —","בלי להתעסק בפיקדונות בנקאיים"]),
      ("alert","כאבים (Pains)",["כסף בעו\"ש/ביט כמעט ללא ריבית בזמן","שמתחרים מפרסמים 2.5%–6% — \"פספוס תשואה\""]),
      ("trophy","רווחים רצויים (Gains)",["תשואה פשוטה בקליק · שקיפות · גב בנקאי אמין"])]
vmap=[("wallet","מוצרים",["כיס חיסכון נושא ריבית · טעינה מכרטיס אשראי"]),
      ("shield","משככי כאבים",["ביטול חיכוך מול הבנק — אין חשבון, אין סניף,","הכל בממשק הכיסים המוכר"]),
      ("trend","מייצרי רווחים",["ריבית מעל הממוצע · החזרת קרן+ריבית","חוויית כיסי-יעד יומיומית"])]
b+=panel(698,"פרופיל הלקוח","url(#gCyan)",prof,"url(#gCyan)")
b+=panel(70,"מפת הערך (Bit / ריביט)","url(#gNavy)",vmap,"url(#gNavy)")
# interlock fit seal center (diamond, not a circle)
cxf=626; cyf=300
b+=f'<rect x="{cxf-42}" y="{cyf-42}" width="84" height="84" rx="22" fill="url(#gCyan)" transform="rotate(45 {cxf} {cyf})" filter="url(#shS)"/>'
b+=f'<rect x="{cxf-42}" y="{cyf-42}" width="84" height="84" rx="22" fill="none" stroke="{BG}" stroke-width="3" transform="rotate(45 {cxf} {cyf})"/>'
b+=icon(cxf-21,cyf-21,42,"check","#FFFFFF",2.6)
b+=f'<path d="M698 300 L644 300" stroke="{CYD}" stroke-width="7" marker-end="url(#fa)"/>'
b+=f'<path d="M582 300 L528 300" stroke="{CYD}" stroke-width="7" marker-end="url(#fa)"/>'
b+=f'<defs><marker id="fa" markerWidth="9" markerHeight="9" refX="6" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 Z" fill="{CYD}"/></marker></defs>'
b+=TX(cxf,cyf+78,"FIT",14,CYD,"bold","middle",ltr=True,ls="3")
b+=rect(70,620,1140,56,CYL,14,CY,1)+icon(90,636,24,"check",CYD)+TX(1188,648,"Fit:",14.5,CYD,"bold","start")
b+=TX(1148,648,"ריביט ממנף משתמשים מזוהים (KYC) ומסיר חיכוך — יתרון תחרותי מובהק על הבנקים, לא רק התשואה.",13.5,INK,"normal","start")
b+=src("עיבוד המגישים לפי Osterwalder VPC")
W("fw4_vpc", doc(b))

# ===================================================================
# 5. OKR — Executive KPI dashboard with arc gauges
# ===================================================================
b = head("OBJECTIVES & KEY RESULTS 05","מדידת הצלחה — OKR / SMART","מסגרת 5")
# objective banner
b+=rect(70,146,1160,84,"url(#gBand)",16,sh="L")
b+=rect(70,146,7,84,CY,4)
b+=iconchip(1185,188,28,"target","#12344F",CY,26)
b+=TX(1140,180,"Objective 2 — ביסוס ביט כארנק דיגיטלי לחיסכון יומיומי",20,"#FFFFFF","bold","start")
b+=TX(1140,210,"Objective 1: מוניטיזציה ורווחיות הארנק",14,"#9FC3D6","normal","start")
def arc(cx,cy,r,frac,col,wdt=14):
    s_=-90; e_=-90+360*frac
    a0=math.radians(s_); a1=math.radians(e_); lg=1 if (e_-s_)>180 else 0
    x0=cx+r*math.cos(a0); y0=cy+r*math.sin(a0); x1=cx+r*math.cos(a1); y1=cy+r*math.sin(a1)
    return (circ(cx,cy,r,"none",PAPER,wdt)+
            f'<path d="M{x0:.1f} {y0:.1f} A{r} {r} 0 {lg} 1 {x1:.1f} {y1:.1f}" fill="none" '
            f'stroke="{col}" stroke-width="{wdt}" stroke-linecap="round"/>')
krs=[("KR1","אימוץ","מעל 15% ממשתמשי ה-MAU","יפתחו כיס ריבית","12 חודשים",15,0.60,CY),
     ("KR2","עומק","מעל 10% מהיתרה הממוצעת","תוחזק בכיסי ריבית","12 חודשים",10,0.40,CYD),
     ("KR3","שימור","עלייה של 20% בתדירות","הכניסות בקרב משתמשי ריביט","9 חודשים",20,0.80,NAVY)]
x0=70; cw=374; gap=19; cardY=252
for i,(k,nm,t1,t2,tf,val,frac,col) in enumerate(krs):
    x=x0+i*(cw+gap)
    b+=rect(x,cardY,cw,316,BG,18,LINE,1.2,sh=True)
    b+=rect(x,cardY,cw,8,col,8)
    cx=x+cw/2
    b+=arc(cx,cardY+118,66,frac,col)
    b+=big(cx,cardY+128,f"{val}%",40,NAVY,"middle")
    b+=TX(cx,cardY+152,"יעד",13,MUT,"normal","middle")
    b+=TX(x+cw-24,cardY+218,f"{k} · {nm}",19,col,"bold","start")
    b+=TX(x+cw-24,cardY+246,t1,14.5,INK,"normal","start")
    b+=TX(x+cw-24,cardY+268,t2,14.5,INK,"normal","start")
    b+=rect(x+24,cardY+286,108,26,PAPER,13)+icon(x+30,cardY+290,18,"clock",MUT,1.7)+TX(x+122,cardY+304,tf,12.5,MUT,"normal","start")
    # SMART chip
    b+=rect(x+cw-92,cardY+286,68,26,CYL,13)+TX(x+cw-58,cardY+304,"SMART",12,CYD,"bold","middle")
b+=rect(70,592,1160,54,AMBL,14,AMB,1)+icon(90,605,24,"info",AMB)+TX(1208,614,"הערה",14,AMB,"bold","start")
b+=TX(1208,636,"המוצר הושק נובמבר 2025 — מוקדם למדוד עמידה מלאה; היעדים מנוסחים לפי S·M·A·R·T.",13.5,INK,"normal","start")
b+=src("עיבוד המגישים · יעדים שהוגדרו עם ההשקה")
W("fw5_smart_okr", doc(b))

# ===================================================================
# A. Dormant Money -> Ribit -> Yield  — value pipeline (flow ribbon)
# ===================================================================
b = head("VALUE PIPELINE","כסף רדום ← ריביט ← תשואה","ויזואל 1")
# big delta headline
b+=big(1030,250,"0%",96,RED,"middle")+TX(1030,290,"כסף רדום",17,MUT,"normal","middle")
b+=big(250,250,"4%",96,GRN,"middle")+TX(250,290,"כסף חוסך",17,MUT,"normal","middle")
# pipe ribbon
py=360; ph=92
b+=f'<rect x="150" y="{py-ph/2}" width="980" height="{ph}" rx="46" fill="url(#gFlow)" filter="url(#sh)"/>'
# direction chevrons inside (RTL flow right->left)
for cxh in range(900,260,-90):
    b+=f'<path d="M{cxh},{py-16} L{cxh-18},{py} L{cxh},{py+16}" fill="none" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" opacity="0.55"/>'
# stage tiles ON pipe
def tile(cx,ic,lab,col,icol):
    s=rect(cx-52,py-52,104,104,"#FFFFFF",22,sh="L")
    s+=iconchip(cx,py,34,ic,col,icol,30)
    s+=TX(cx,py+78,lab,15,NAVY,"bold","middle")
    return s
b+=tile(1010,"zzz","יתרות שוכבות",REDL,RED)
b+=rect(640-58,py-58,116,116,"url(#gNavy)",26,sh="L")+icon(640-22,py-22,44,"bolt",CY,2.3)
b+=TX(640,py+6,"ריביט",20,"#FFFFFF","bold","middle")
b+=TX(640,py+82,"כיס נושא ריבית",15,NAVY,"bold","middle")
b+=tile(270,"trend","תשואה בקליק",GRNL,GRN)
# mechanism band
b+=rect(150,498,980,128,PAPER,16,LINE,1)
b+=icon(170,516,26,"gear",CYD)+TX(1110,530,"המנגנון",15,CYD,"bold","start")
b+=TX(1110,562,"ביטול ההעברה האוטומטית השאיר יתרות רדומות; ריביט ממיר אותן לכסף חוסך.",14.5,INK,"normal","start")
# 3 mini stats
stats=[("3.5M","משתמשים פעילים"),("29.4B₪","העברות בשנה"),("4%","ריבית שנתית")]
for i,(v,l) in enumerate(stats):
    sx=320+i*270
    b+=f'<line x1="{sx+120}" y1="588" x2="{sx+120}" y2="616" stroke="{LINE}" stroke-width="1"/>' if i<3 else ""
    b+=big(sx,602,v,26,NAVY,"middle")+TX(sx,622,l,13,MUT,"normal","middle")
b+=src("עיבוד המגישים · נתוני ביט 2025")
W("new1_dormant_yield", doc(b))

# ===================================================================
# B. Trojan Horse — liquidity capture (rivals -> Bit gateway -> vault)
# ===================================================================
b = head("LIQUIDITY CAPTURE","מודל הסוס הטרויאני","ויזואל 2")
ry=300
# capture ribbon behind
b+=f'<path d="M1110,{ry} C900,{ry} 800,{ry} 700,{ry}" stroke="url(#gRed)" stroke-width="46" fill="none" stroke-linecap="round" opacity="0.16"/>'
b+=f'<path d="M580,{ry} C420,{ry} 320,{ry} 180,{ry}" stroke="url(#gGreen)" stroke-width="46" fill="none" stroke-linecap="round" opacity="0.16"/>'
# rival banks (right) — stacked icon chips
b+=rect(980,200,250,200,BG,18,LINE,1.2,sh=True)
b+=TX(1206,238,"בנקים מתחרים",17,NAVY,"bold","start")
for i in range(3):
    bx=1206-i*70
    b+=iconchip(bx-24,288,24,"bank",PAPER,CYD,22)
b+=TX(1206,346,"~2/3 ממשתמשי ביט",14,INK,"normal","start")
b+=TX(1206,368,"מנהלים חשבון בבנק מתחרה",14,INK,"normal","start")
# Bit gateway (center module)
b+=rect(582,196,116,208,"url(#gNavy)",22,sh="L")
b+=icon(610,228,60,"magnet",CY,2.3)
b+=TX(640,322,"ביט",22,"#FFFFFF","bold","middle")
b+=TX(640,350,"ריביט",15,CY,"bold","middle")
# vault (left)
b+=rect(70,200,250,200,"url(#gNavy)",18,sh="L")
b+=iconchip(120,244,24,"vault",CY,NAVY,24)
b+=TX(296,238,"בנק הפועלים",17,"#FFFFFF","bold","start")
b+=TX(296,300,"נזילות זולה ויציבה",14,"#9FC3D6","normal","start")
b+=TX(296,324,"ראש גשר ל-cross-sell",14,"#9FC3D6","normal","start")
# flow arrows + labels
b+=f'<path d="M972,{ry} L712,{ry}" stroke="{RED}" stroke-width="5" marker-end="url(#ta)" opacity="0.9"/>'
b+=TX(842,ry-18,"כסף נכנס לריביט",13.5,RED,"bold","middle")
b+=f'<path d="M568,{ry} L334,{ry}" stroke="{GRN}" stroke-width="5" marker-end="url(#ta2)" opacity="0.9"/>'
b+=TX(450,ry-18,"נזילות + דאטה",13.5,GRN,"bold","middle")
b+=(f'<defs><marker id="ta" markerWidth="9" markerHeight="9" refX="6" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 Z" fill="{RED}"/></marker>'
    f'<marker id="ta2" markerWidth="9" markerHeight="9" refX="6" refY="3" orient="auto"><path d="M0,0 L7,3 L0,6 Z" fill="{GRN}"/></marker></defs>')
# three value rows
rows=[("anchor","כליאת נזילות","הכסף נשאר בביט במקום לזרום לבנק המתחרה — מימון זול לבנק הפועלים.",CY),
      ("users","גישה ללקוחות המתחרים","קשר פיננסי ישיר עם מי שאינם לקוחות הבנק — ראש גשר לאשראי וחיסכון.",CYD),
      ("trend","ממוצר הפסדי למשפך גיוס","ביט עוברת מ-Loss Leader למשפך גיוס פיננסי \"עוקף-בנק\".",GRN)]
y=438
for ic,h,t,col in rows:
    b+=rect(70,y,1160,58,BG,12,LINE,1,sh=True)+rect(70,y,7,58,col,4)
    b+=iconchip(1192,y+29,21,ic,PAPER,col,20)
    b+=TX(1150,y+25,h,15.5,NAVY,"bold","start")
    b+=TX(1150,y+47,t,13.5,MUT,"normal","start")
    y+=70
b+=src("עיבוד המגישים · בנק הפועלים, הודעה לעיתונות 3.11.2025")
W("new2_trojan_horse", doc(b))

# ===================================================================
# C. Ribit Value Engine — triple-win (hex core + 3 value blades/cards)
# ===================================================================
b = head("TRIPLE-WIN ENGINE","מנוע הערך של ריביט","ויזואל 3")
cx,cy=640,330
# hexagon core
def hexp(cx,cy,r):
    pts=[]
    for a in range(6):
        ang=math.radians(60*a-90)
        pts.append(f"{cx+r*math.cos(ang):.1f},{cy+r*math.sin(ang):.1f}")
    return " ".join(pts)
# blades (thick tapered wedges from core to 3 directions)
blades=[(cx,cy-150,NAVY),( cx-150,cy+95,CYD),(cx+150,cy+95,GRN)]
for (bx,by,col) in blades:
    b+=f'<path d="M{cx},{cy} L{bx},{by}" stroke="{col}" stroke-width="16" stroke-linecap="round" opacity="0.22"/>'
b+=f'<polygon points="{hexp(cx,cy,72)}" fill="url(#gNavy)" filter="url(#sh)"/>'
b+=f'<polygon points="{hexp(cx,cy,72)}" fill="none" stroke="{CY}" stroke-width="2.5"/>'
b+=icon(cx-20,cy-30,40,"gear",CY,2)+TX(cx,cy+24,"ריביט",17,"#FFFFFF","bold","middle")
b+=TX(cx,cy+150,"חיתוך = ערך משולש בו-זמני",14,MUT,"normal","middle")
# three value cards
def vcard(x,y,ic,title_,lines,col):
    s=rect(x,y,360,118,BG,16,LINE,1.2,sh=True)+rect(x,y,360,7,col,7)
    s+=iconchip(x+42,y+44,24,ic,col,"#FFFFFF",22)
    s+=TX(x+360-24,y+44,title_,18,NAVY,"bold","start")
    for j,l in enumerate(lines):
        s+=TX(x+360-24,y+74+j*22,l,13.5,INK,"normal","start")
    return s
b+=vcard(460,150,"bolt","המוצר (ביט)",["חסם נטישה · הופך","מצינור לפלטפורמה"],NAVY)
b+=vcard(70,500,"wallet","הלקוח",["תגמול על כסף רדום","אפס מאמץ · גב בנקאי"],CYD)
b+=vcard(850,500,"bank","הבנק (הפועלים)",["נזילות זולה · דאטה","cross-sell עתידי"],GRN)
# connectors card->core (short thick chevrons)
b+=f'<path d="M640,268 L640,232" stroke="{NAVY}" stroke-width="5" marker-end="url(#va)"/>'
b+=f'<path d="M520,430 L430,500" stroke="{CYD}" stroke-width="5" marker-end="url(#va)"/>'
b+=f'<path d="M760,430 L850,500" stroke="{GRN}" stroke-width="5" marker-end="url(#va)"/>'
b+=f'<defs><marker id="va" markerWidth="8" markerHeight="8" refX="5" refY="3" orient="auto"><path d="M6,0 L0,3 L6,6 Z" fill="{MUT}"/></marker></defs>'
b+=src("עיבוד המגישים · סיכום הניתוח")
W("new3_value_engine", doc(b))

print("DONE V3 — 8 premium visuals")
