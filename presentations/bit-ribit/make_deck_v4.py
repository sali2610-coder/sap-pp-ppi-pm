# -*- coding: utf-8 -*-
"""V4 — premium consulting redesign of the deck's connective slides (SVG-first, 4K-ready).
Cover · Intro/Methodology · Framework Scorecard (matrix) · Sources.
Content identical to prior versions; visual communication layer only.
Output -> visuals/*.svg  (cover, intro, matrix, sources)."""
import pathlib
OUT = pathlib.Path(__file__).parent / "visuals"; OUT.mkdir(exist_ok=True)

BG="#FFFFFF"; PAPER="#F5F8FB"; LINE="#E4EAF0"
NAVY="#0A2540"; NAVY900="#07203A"; INK="#22303C"; MUT="#7C8895"; FAINT="#AEB8C2"
CY="#16B6CE"; CYD="#0E7C9B"; CYL="#E7F8FB"
RED="#E0413E"; GRN="#1E9E6A"; AMB="#D98A1F"
DK1="#06182B"; WT="#EAF2F8"; WMUT="#8FA6B8"; WFAINT="#5E768A"; CYG="#2BD4E6"; GRNG="#34D9A0"
FACE="Arial, 'Arial Hebrew', 'Helvetica Neue', sans-serif"; BLACK="'Arial Black', Arial, sans-serif"

DEFS=f'''<defs>
 <linearGradient id="gNavy" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#10395F"/><stop offset="1" stop-color="#081F36"/></linearGradient>
 <linearGradient id="gCyan" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#22CCE0"/><stop offset="1" stop-color="#0E7C9B"/></linearGradient>
 <linearGradient id="gGreen" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#34D9A0"/><stop offset="1" stop-color="#13885A"/></linearGradient>
 <radialGradient id="bgDark" cx="0.72" cy="0.28" r="1.0"><stop offset="0" stop-color="#103a5e"/><stop offset="1" stop-color="#04101e"/></radialGradient>
 <filter id="sh" x="-20%" y="-30%" width="140%" height="160%"><feDropShadow dx="0" dy="6" stdDeviation="13" flood-color="#0A2540" flood-opacity="0.13"/></filter>
 <filter id="shS" x="-20%" y="-30%" width="140%" height="160%"><feDropShadow dx="0" dy="3" stdDeviation="7" flood-color="#0A2540" flood-opacity="0.10"/></filter>
 <filter id="glowS" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="3.5" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
</defs>'''
def doc(body,dark=False):
    bg='<rect width="1280" height="720" fill="url(#bgDark)"/>' if dark else '<rect width="1280" height="720" fill="#FFFFFF"/>'
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1280 720" width="1280" height="720" '
            f'font-family="{FACE}" direction="rtl">{bg}{DEFS}{body}</svg>')
def TX(x,y,s,size=18,color=INK,w="normal",anchor="start",ltr=False,ls=None,face=None,op=None):
    a=' direction="ltr" unicode-bidi="isolate"' if ltr else ''
    a+=f' letter-spacing="{ls}"' if ls is not None else ''
    a+=f' font-family="{face}"' if face else ''
    a+=f' opacity="{op}"' if op is not None else ''
    return f'<text x="{x}" y="{y}" font-size="{size}" fill="{color}" font-weight="{w}" text-anchor="{anchor}"{a}>{s}</text>'
def big(x,y,s,size,color,anchor="middle",glow=False):
    g=' filter="url(#glowS)"' if glow else ''
    return f'<text x="{x}" y="{y}" font-size="{size}" fill="{color}" font-weight="bold" text-anchor="{anchor}" direction="ltr" unicode-bidi="isolate" font-family={chr(34)}{BLACK}{chr(34)}{g}>{s}</text>'
def rect(x,y,w,h,fill,rx=14,stroke="none",sw=1,sh=False,op=None):
    f=' filter="url(#sh)"' if sh=="L" else (' filter="url(#shS)"' if sh else '')
    o=f' fill-opacity="{op}"' if op is not None else ''
    return f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="{rx}" fill="{fill}"{o} stroke="{stroke}" stroke-width="{sw}"{f}/>'
def circ(cx,cy,r,fill,stroke="none",sw=1,glow=False):
    g=' filter="url(#glowS)"' if glow else ''
    return f'<circle cx="{cx}" cy="{cy}" r="{r}" fill="{fill}" stroke="{stroke}" stroke-width="{sw}"{g}/>'
IC={
 "coins":"M4 7c0-1.6 3.1-2.8 7-2.8S18 5.4 18 7s-3.1 2.8-7 2.8S4 8.6 4 7Z M4 7v5c0 1.6 3.1 2.8 7 2.8S18 13.6 18 12V7 M4 12v5c0 1.6 3.1 2.8 7 2.8S18 18.6 18 17v-5",
 "users":"M15 19v-1.2a3.6 3.6 0 0 0-3.6-3.6H6.6A3.6 3.6 0 0 0 3 17.8V19 M9 11.2A3.1 3.1 0 1 0 9 5a3.1 3.1 0 0 0 0 6.2 M21 19v-1.2a3.6 3.6 0 0 0-2.7-3.5 M16.5 5.2a3.1 3.1 0 0 1 0 5.9",
 "shield":"M12 3l7.5 2.8v5.4c0 4.7-3.2 7.6-7.5 9.3-4.3-1.7-7.5-4.6-7.5-9.3V5.8Z M8.8 12l2.2 2.2L15.4 9.8",
 "trend":"M3 17l5.5-5.5 3.5 3.5L20 7 M15 7h5v5",
 "target":"M12 4a8 8 0 1 0 0 16 8 8 0 0 0 0-16Z M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z M12 11.4a.6.6 0 1 0 0 1.2.6.6 0 0 0 0-1.2Z",
 "wallet":"M3 8.5C3 7 4 6 5.5 6H17l1.5 0 M3 8.5V17a2 2 0 0 0 2 2h13a1.5 1.5 0 0 0 1.5-1.5V11A1.5 1.5 0 0 0 18 9.5H5.5A2.5 2.5 0 0 1 3 8.5Z M16.5 13.5h.01",
 "scale":"M12 4v16 M6 8h12 M6 8l-3 6a3 3 0 0 0 6 0Z M18 8l-3 6a3 3 0 0 0 6 0Z M8 20h8",
 "layers":"M12 4 21 9l-9 5-9-5Z M3 14l9 5 9-5",
 "bolt":"M13 3 5.5 13H11l-1 8 8.5-10.5H13Z",
 "check":"M5 12.5l4.5 4.5L20 6.5",
 "rocket":"M12 3c3 1 5 4 5 8l-2 3H9l-2-3c0-4 2-7 5-8Z M12 9.5a1.6 1.6 0 1 0 0-3.2 1.6 1.6 0 0 0 0 3.2 M9 16l-2 4 3-1 M15 16l2 4-3-1",
 "doc":"M7 3h7l4 4v14H7Z M14 3v4h4 M9.5 12h5 M9.5 15h5",
 "news":"M4 5h13v14H5a1 1 0 0 1-1-1Z M17 8h3v9a2 2 0 0 1-2 2 M7 8h7 M7 11h7 M7 14h4",
 "camera":"M4 8h3l1.5-2h7L17 8h3v11H4Z M12 16.5a3.2 3.2 0 1 0 0-6.4 3.2 3.2 0 0 0 0 6.4Z",
 "calendar":"M5 6h14v14H5Z M5 10h14 M8 4v3 M16 4v3",
 "flag":"M6 21V4 M6 4.5h11l-2.2 3.7L17 12H6",
 "book":"M5 4h11a2 2 0 0 1 2 2v14H7a2 2 0 0 0-2 2Z M18 6H8",
}
def icon(x,y,s,name,color=INK,sw=1.9,glow=False):
    g=' filter="url(#glowS)"' if glow else ''
    return (f'<g transform="translate({x},{y}) scale({s/24:.4f})" fill="none" stroke="{color}" '
            f'stroke-width="{sw}" stroke-linecap="round" stroke-linejoin="round"{g}><path d="{IC[name]}"/></g>')
def chip(cx,cy,r,name,bg,icol,isz=None,glow=False):
    isz=isz or r*1.1
    return circ(cx,cy,r,bg,glow=glow)+icon(cx-isz/2,cy-isz/2,isz,name,icol)
def head(eyebrow,title,badge,dark=False):
    tc=WT if dark else NAVY900; ec=CYG if dark else CYD
    s=rect(40,38,168,34,("#0E2F4E" if dark else BG),9,(CYG if dark else CY),1.4)+TX(124,60,badge,14,(CYG if dark else CYD),"bold","middle")
    s+=TX(1240,52,eyebrow,13,ec,"bold","end",ltr=True,ls="2.6")
    s+=TX(1240,93,title,32,tc,"bold","start")
    s+=f'<line x1="40" y1="112" x2="1240" y2="112" stroke="{"#163A57" if dark else LINE}" stroke-width="1.5"/>'
    s+=rect(1070,109,170,4,"url(#gCyan)",2)
    return s
def W(n,svg):(OUT/f"{n}.svg").write_text(svg,encoding="utf-8");print("wrote",n)

# ===================== COVER =====================
b=''
# accent + faint motif
b+=rect(1252,0,28,720,"url(#gCyan)",0)
b+=circ(1080,150,260,"none","#143a5c",1,glow=False)
b+=f'<g opacity="0.10">{chip(1080,150,150,"coins","#0E2F4E",CYG,210)}</g>'
b+=TX(1224,120,"עבודת סיום · ניתוח אסטרטגי",15,CYG,"bold","end",ltr=False,ls="1")
b+=big(1224,196,"bit",58,WT,"end")
b+=TX(1224,232,"ריביט",20,CYG,"bold","end")
# title (2 lines), big
b+=TX(1224,330,"אפליקציית ביט (bit):",46,WT,"bold","start")
b+=TX(1224,388,"מ”צינור תשלומים” לפלטפורמה פיננסית",40,WT,"bold","start")
b+=rect(1100,418,124,5,"url(#gCyan)",2)
b+=TX(1224,470,"ניתוח אסטרטגי של השקת פיצ’ר ”ריביט”",20,"#Bcd"[0:0] or "#AEC6D8","normal","start")
# KPI strip
kpis=[("3.5M","משתמשי ביט פעילים","users"),("29.4B ₪","העברות בשנה","trend"),("עד 4%","ריבית שנתית · ריביט","coins")]
for i,(v,l,ic) in enumerate(kpis):
    x=120+i*340
    b+=rect(x,540,300,96,"#0C2A45",16,"#163A57",1)+rect(x,540,6,96,CYG,3)
    b+=chip(x+258,588,26,ic,"#0E3550",CYG,24)
    b+=big(x+30,596,v,30,WT,"start")
    b+=TX(x+30,620,l,13,WMUT,"normal","start")
# meta footer
b+=TX(1224,676,"קורס: מבוא לאפיון וניהול מוצר טכנולוגי   |   מרצה: יעל רובינשטיין זיו",14,WMUT,"normal","start")
b+=TX(1224,698,"מגישים: נתנאל יברקן (305335861) · סאלי חליף (040535908)   |   יוני 2026",14,WMUT,"normal","start")
W("cover",doc(b,dark=True))

# ===================== INTRO / METHODOLOGY =====================
b=head("APPROACH · METHODOLOGY","מבוא ומתודולוגיה","מבוא")
fr=[("layers","כיוון הצמיחה","מעבר מאפליקציית העברות (P2P) לפלטפורמה פיננסית — דרך ”ריביט”, פיקדון נושא ריבית (נובמבר 2025): 4% שנתי, 10–20,000 ₪, מסלול נזיל/נעול."),
    ("trend","סוג השינוי","עיבוי יכולות (Product Intensification) ואסטרטגיית me-too — מינוף 3.5 מיליון משתמשים ו~29.4 מיליארד ₪ העברות בשנה."),
    ("target","המתודולוגיה","חמש מסגרות ניתוח שנלמדו בקורס, המכסות שלושה צירים: שוק · תחרות · לקוח (ומדידה).")]
y=146
for ic,h,t in fr:
    b+=rect(70,y,1140,92,BG,16,LINE,1.2,sh=True)+rect(70,y,7,92,CY,4)
    b+=chip(1180,y+46,28,ic,CYL,CYD,26)
    b+=TX(1130,y+38,h,19,NAVY,"bold","start")
    b+=TX(1130,y+68,t,15,INK,"normal","start")
    y+=104
# framework tiles row
b+=TX(1210,484,"חמש המסגרות — לפי ציר",15,MUT,"bold","start")
tiles=[("1","TAM/SAM/SOM","שוק","layers",NAVY),("2","ניתוח מתחרים","תחרות","scale",CYD),
       ("3","חמשת הכוחות","תחרות","shield",CYD),("4","קנבס הערך (VPC)","לקוח","wallet",GRN),
       ("5","OKR / SMART","מדידה","target",NAVY)]
tw=212; gap=20; x0=70
for i,(num,nm,ax,ic,col) in enumerate(tiles):
    x=x0+i*(tw+gap)
    b+=rect(x,502,tw,140,BG,16,LINE,1.2,sh=True)+rect(x,502,tw,6,col,6)
    b+=big(x+tw-22,556,num,30,col,"start")
    b+=chip(x+34,540,22,ic,CYL,CYD,20)
    b+=TX(x+tw-22,592,nm,16,NAVY,"bold","start")
    b+=rect(x+tw-92,608,70,24,PAPER,12)+TX(x+tw-57,624,ax,12.5,MUT,"normal","middle")
b+=TX(1210,672,"כל חמש המסגרות מהמטלה נשמרות במלואן ומשודרגות בשקפים הבאים.",14,MUT,"normal","start",op=1)
W("intro",doc(b))

# ===================== MATRIX — framework scorecard =====================
b=head("FRAMEWORK SCORECARD","מפת המסגרות — נשמרו ושודרגו","סיכום")
rows=[("TAM / SAM / SOM","שוק","3","layers","משפך שוק יורד + כרטיסי מדד + הערה מתודולוגית"),
      ("ניתוח מתחרים","תחרות","4","scale","כרטיסי benchmark — ביט מודגש (4% ללא תנאי)"),
      ("חמשת הכוחות — Porter","תחרות","5","shield","מאזן עוצמה — שני כוחות חזקים + חסם נטישה"),
      ("קנבס הערך — VPC","לקוח","6","wallet","שתי לדרים פרופיל↔ערך + חותם Fit"),
      ("OKR / SMART","מדידה","7","target","טבעות תוצאה (KR1–3) + יעדים גדולים")]
y=144; rh=82; gap=8
for nm,ax,sl,ic,up in rows:
    b+=rect(70,y,1140,rh,BG,16,LINE,1.2,sh=True)+rect(70,y,7,rh,GRN,4)
    # status
    b+=rect(92,y+rh/2-16,96,32,"#E7F7F0",16)+icon(104,y+rh/2-10,20,"check",GRN,2.2)+TX(178,y+rh/2+5,"נשמר",13.5,GRN,"bold","end")
    # slide badge
    b+=circ(250,y+rh/2,22,NAVY)+TX(250,y+rh/2+6,sl,18,"#FFFFFF","bold","middle",ltr=True)
    # framework
    b+=chip(1178,y+rh/2,26,ic,CYL,CYD,24)
    b+=TX(1138,y+rh/2-6,nm,18,NAVY,"bold","start")
    b+=rect(1010,y+rh/2+6,118,24,PAPER,12)+TX(1069,y+rh/2+22,ax,12.5,MUT,"normal","middle")
    # upgrade
    b+=TX(980,y+rh/2+5,up,14.5,INK,"normal","start")
    y+=rh+gap
b+=rect(70,y,1140,52,CYL,14,CY,1)+icon(90,y+15,24,"rocket",CYD)
b+=TX(1180,y+24,"שלושה ויזואלים אסטרטגיים חדשים (שקפים 8–10) מחזקים את ה”למה” — מבלי להחליף מסגרת קיימת.",14,INK,"normal","start")
b+=TX(1180,y+44,"",1,INK,"normal","start")
W("matrix",doc(b))

# ===================== SOURCES =====================
b=head("REFERENCES","מקורות","ביבליוגרפיה")
refs=[("news","בנק הפועלים (2025). הודעה לעיתונות: ”חדש בביט: ריביט”, 3.11.2025."),
      ("news","גיקטיים (2025). ”ביט מציעה לכם עכשיו פיקדון”, 3.11.2025."),
      ("news","כלכליסט (2025). ”ביט נכנסת לעולם הפיקדונות: ריבית 4%”."),
      ("news","כלכליסט (2025). ”מ-2025: ביט ופייבוקס יורשו לגבות עמלה על העברת כספים”."),
      ("doc","אייס (2025). ”ביט של בנק הפועלים: 29.4 מיליארד ₪ העברות בשנה”."),
      ("book","בנק הפועלים. ”חזון הבנק”, bankhapoalim.co.il/he/about/bank-vision."),
      ("camera","צילום מסך מאפליקציית ביט — מסלולי כיסי החיסכון, יוני 2026.")]
col_x=[(660,1210),(70,620)]  # (left-edge, right-text-anchor) two columns
positions=[(0,0),(0,1),(0,2),(0,3),(1,0),(1,1),(1,2)]
for i,(ic,txt) in enumerate(refs):
    colidx = 0 if i<4 else 1
    rowi = i if i<4 else i-4
    xL,xR = col_x[colidx]
    yy=150+rowi*118
    b+=rect(xL,yy,540,98,BG,16,LINE,1.2,sh=True)+rect(xL,yy,7,98,CY,4)
    b+=circ(xR-30,yy+34,20,NAVY)+TX(xR-30,yy+40,str(i+1),16,"#FFFFFF","bold","middle",ltr=True)
    b+=chip(xL+38,yy+49,22,ic,CYL,CYD,20)
    # wrap text into up to 3 lines (~46 chars)
    words=txt.split(" "); lines=[]; cur=""
    for w_ in words:
        if len(cur)+len(w_)+1>46: lines.append(cur); cur=w_
        else: cur=(cur+" "+w_).strip()
    if cur: lines.append(cur)
    for j,ln in enumerate(lines[:3]):
        b+=TX(xR-66,yy+34+j*24,ln,14,INK,"normal","start")
b+=TX(1210,690,"כל המקורות נגישים לציבור · נבדקו ליוני 2026",13,MUT,"normal","start")
W("sources",doc(b))
print("DONE V4 — cover, intro, matrix, sources")
