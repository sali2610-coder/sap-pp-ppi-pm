# -*- coding: utf-8 -*-
"""Showcase concepts (3 slides x 3 concepts) for the Bit-Ribit deck.
Porter / OKR / Value-Engine — memorable, dramatic, academic. Content unchanged.
Output -> visuals/showcase/*.svg  (rendered to png separately)."""
import pathlib, math
OUT = pathlib.Path(__file__).parent / "visuals" / "showcase"; OUT.mkdir(parents=True, exist_ok=True)
W_,H_=1280,720

# palette
BG="#FFFFFF"; PAPER="#F5F8FB"; LINE="#E4EAF0"
NAVY="#0A2540"; NAVY900="#07203A"; INK="#22303C"; MUT="#7C8895"; FAINT="#AEB8C2"
CY="#16B6CE"; CYD="#0E7C9B"; CYL="#E7F8FB"
RED="#E0413E"; GRN="#1E9E6A"; AMB="#D98A1F"
# dark theme
DK1="#06182B"; DK2="#0C2C49"; WT="#F4F8FC"; WMUT="#B0C4D4"; WFAINT="#5C7governed"
WFAINT="#8096A8"; CYG="#2BD4E6"; REDG="#FF5C58"; GRNG="#34D9A0"; AMBG="#F2B441"
FACE="Arial, 'Arial Hebrew', 'Helvetica Neue', sans-serif"
BLACK="'Arial Black', Arial, sans-serif"

DEFS=f'''<defs>
 <linearGradient id="gNavy" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#10395F"/><stop offset="1" stop-color="#081F36"/></linearGradient>
 <linearGradient id="gCyan" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#22CCE0"/><stop offset="1" stop-color="#0E7C9B"/></linearGradient>
 <linearGradient id="gGreen" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#34D9A0"/><stop offset="1" stop-color="#13885A"/></linearGradient>
 <linearGradient id="gRed" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#FF6B68"/><stop offset="1" stop-color="#C7322F"/></linearGradient>
 <linearGradient id="gAmber" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#F2B441"/><stop offset="1" stop-color="#C77F12"/></linearGradient>
 <radialGradient id="bgDark" cx="0.5" cy="0.32" r="0.9"><stop offset="0" stop-color="#173F5B"/><stop offset="1" stop-color="#0B2030"/></radialGradient>
 <linearGradient id="gGauge" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#1E9E6A"/><stop offset="0.55" stop-color="#F2B441"/><stop offset="1" stop-color="#FF5C58"/></linearGradient>
 <filter id="glow" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="7" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
 <filter id="glowS" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="3.5" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
 <filter id="sh" x="-20%" y="-30%" width="140%" height="160%"><feDropShadow dx="0" dy="6" stdDeviation="13" flood-color="#04101D" flood-opacity="0.28"/></filter>
 <filter id="shL" x="-30%" y="-40%" width="160%" height="180%"><feDropShadow dx="0" dy="10" stdDeviation="22" flood-color="#04101D" flood-opacity="0.40"/></filter>
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
    g=' filter="url(#glow)"' if glow else ''
    return f'<text x="{x}" y="{y}" font-size="{size}" fill="{color}" font-weight="bold" text-anchor="{anchor}" direction="ltr" unicode-bidi="isolate" font-family={chr(34)}{BLACK}{chr(34)}{g}>{s}</text>'
def rect(x,y,w,h,fill,rx=14,stroke="none",sw=1,sh=False,op=None):
    f=' filter="url(#sh)"' if sh=="L" else (' filter="url(#shL)"' if sh=="XL" else '')
    o=f' fill-opacity="{op}"' if op is not None else ''
    return f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="{rx}" fill="{fill}"{o} stroke="{stroke}" stroke-width="{sw}"{f}/>'
def circ(cx,cy,r,fill,stroke="none",sw=1,glow=False):
    g=' filter="url(#glow)"' if glow else ''
    return f'<circle cx="{cx}" cy="{cy}" r="{r}" fill="{fill}" stroke="{stroke}" stroke-width="{sw}"{g}/>'

IC={
 "users":"M15 19v-1.2a3.6 3.6 0 0 0-3.6-3.6H6.6A3.6 3.6 0 0 0 3 17.8V19 M9 11.2A3.1 3.1 0 1 0 9 5a3.1 3.1 0 0 0 0 6.2 M21 19v-1.2a3.6 3.6 0 0 0-2.7-3.5 M16.5 5.2a3.1 3.1 0 0 1 0 5.9",
 "shield":"M12 3l7.5 2.8v5.4c0 4.7-3.2 7.6-7.5 9.3-4.3-1.7-7.5-4.6-7.5-9.3V5.8Z M8.8 12l2.2 2.2L15.4 9.8",
 "trend":"M3 17l5.5-5.5 3.5 3.5L20 7 M15 7h5v5",
 "bank":"M3 9.5 12 4l9 5.5 M5 10v8 M9.7 10v8 M14.3 10v8 M19 10v8 M3.5 20.5h17",
 "flag":"M6 21V4 M6 4.5h11l-2.2 3.7L17 12H6",
 "bolt":"M13 3 5.5 13H11l-1 8 8.5-10.5H13Z",
 "target":"M12 4a8 8 0 1 0 0 16 8 8 0 0 0 0-16Z M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z M12 11.4a.6.6 0 1 0 0 1.2.6.6 0 0 0 0-1.2Z",
 "wallet":"M3 8.5C3 7 4 6 5.5 6H17l1.5 0 M3 8.5V17a2 2 0 0 0 2 2h13a1.5 1.5 0 0 0 1.5-1.5V11A1.5 1.5 0 0 0 18 9.5H5.5A2.5 2.5 0 0 1 3 8.5Z M16.5 13.5h.01",
 "lock":"M6 11h12v8.5H6Z M8.5 11V8a3.5 3.5 0 0 1 7 0v3",
 "magnet":"M5 4h4v8a3 3 0 0 0 6 0V4h4v8a7 7 0 0 1-14 0Z M5 8.3h4 M15 8.3h4",
 "anchor":"M12 6.5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z M12 6.5V20 M5 13a7 7 0 0 0 14 0 M5 13H7.5 M19 13h-2.5",
 "check":"M5 12.5l4.5 4.5L20 6.5",
 "clock":"M12 4.5a7.5 7.5 0 1 0 0 15 7.5 7.5 0 0 0 0-15Z M12 8v4.3l2.8 1.8",
 "flame":"M13 3c.8 3-2.2 4.2-2.2 7.2A3.2 3.2 0 0 0 15 12c.4 1 .2 2-.4 2.8a5.5 5.5 0 1 1-8.3-6.2C7.5 11 9 11.5 9 13c1.2-1.8.4-4.2 1-6 .4 1.4 2 2 3 4",
 "mountain":"M3 19h18L14 7l-3.2 5.2L8.5 9Z M13 10.5l1-1.6",
 "rocket":"M12 3c3 1 5 4 5 8l-2 3H9l-2-3c0-4 2-7 5-8Z M12 9.5a1.6 1.6 0 1 0 0-3.2 1.6 1.6 0 0 0 0 3.2 M9 16l-2 4 3-1 M15 16l2 4-3-1",
 "gear":"M12 9.2a2.8 2.8 0 1 0 0 5.6 2.8 2.8 0 0 0 0-5.6Z M12 3.5v2.2 M12 18.3v2.2 M20.5 12h-2.2 M5.7 12H3.5 M18 6l-1.6 1.6 M7.6 16.4 6 18 M18 18l-1.6-1.6 M7.6 7.6 6 6",
}
def icon(x,y,s,name,color=INK,sw=1.9,glow=False):
    g=' filter="url(#glowS)"' if glow else ''
    return (f'<g transform="translate({x},{y}) scale({s/24:.4f})" fill="none" stroke="{color}" '
            f'stroke-width="{sw}" stroke-linecap="round" stroke-linejoin="round"{g}><path d="{IC[name]}"/></g>')
def iconchip(cx,cy,r,name,bg,icol,isz=None,glow=False):
    isz=isz or r*1.1
    return circ(cx,cy,r,bg,glow=glow)+icon(cx-isz/2,cy-isz/2,isz,name,icol)

def head(eyebrow,title,badge="",dark=False):
    tc=WT if dark else NAVY900; ec=CYG if dark else CYD
    s=""
    if badge: s+=rect(40,38,150,34,("#173F5B" if dark else BG),9,(CYG if dark else CY),1.4)+TX(115,60,badge,14,(CYG if dark else CYD),"bold","middle")
    s+=TX(1240,52,eyebrow,13,ec,"bold","end",ltr=True,ls="2.6")
    s+=TX(1240,93,title,32,tc,"bold","start")
    s+=f'<line x1="40" y1="112" x2="1240" y2="112" stroke="{"#163A57" if dark else LINE}" stroke-width="1.5"/>'
    s+=rect(1070,109,170,4,"url(#gCyan)",2)
    return s
def src(t,dark=False):
    return TX(1240,702,t,12,(WFAINT if dark else FAINT),"normal","start")
def arcpath(cx,cy,r,a0,a1):
    a0r=math.radians(a0); a1r=math.radians(a1); lg=1 if abs(a1-a0)>180 else 0
    sw=1 if a1>a0 else 0
    x0=cx+r*math.cos(a0r); y0=cy+r*math.sin(a0r); x1=cx+r*math.cos(a1r); y1=cy+r*math.sin(a1r)
    return f'M{x0:.2f} {y0:.2f} A{r} {r} 0 {lg} {sw} {x1:.2f} {y1:.2f}'
def gearpath(cx,cy,r,teeth):
    n=teeth*2; pts=[]
    for i in range(n):
        ang=2*math.pi*i/n - math.pi/2
        rr=r if i%2==0 else r*0.80
        pts.append(f'{cx+rr*math.cos(ang):.1f},{cy+rr*math.sin(ang):.1f}')
    return "M"+" L".join(pts)+" Z"
def W(n,svg):(OUT/f"{n}.svg").write_text(svg,encoding="utf-8");print("wrote",n)

# =========================================================
# PORTER — concept A: Pressure Dial (light, hero gauge)
# =========================================================
b=head("PORTER · FIVE FORCES","חמשת הכוחות — הלחץ התחרותי","")
cx,cy=640,500; r=250
b+=f'<path d="{arcpath(cx,cy,r,180,360)}" fill="none" stroke="{PAPER}" stroke-width="40"/>'
b+=f'<path d="{arcpath(cx,cy,r,180,360)}" fill="none" stroke="url(#gGauge)" stroke-width="22" stroke-linecap="round"/>'
# ticks
for a in (180,225,270,315,360):
    xr=cx+(r+24)*math.cos(math.radians(a)); yr=cy+(r+24)*math.sin(math.radians(a))
    b+=f'<line x1="{cx+(r-22)*math.cos(math.radians(a)):.1f}" y1="{cy+(r-22)*math.sin(math.radians(a)):.1f}" x2="{cx+(r+2)*math.cos(math.radians(a)):.1f}" y2="{cy+(r+2)*math.sin(math.radians(a)):.1f}" stroke="#FFFFFF" stroke-width="3"/>'
# needle to red zone (~333deg)
na=math.radians(335)
b+=f'<line x1="{cx}" y1="{cy}" x2="{cx+(r-30)*math.cos(na):.1f}" y2="{cy+(r-30)*math.sin(na):.1f}" stroke="{NAVY}" stroke-width="8" stroke-linecap="round"/>'
b+=circ(cx,cy,18,NAVY)+circ(cx,cy,7,"#FFFFFF")
b+=big(cx,cy-70,"גבוה",54,RED,"middle")
b+=TX(cx,cy-34,"לחץ מבני",18,MUT,"normal","middle")
# zone labels
b+=TX(cx-r-6,cy+8,"נמוך",14,GRN,"bold","middle")+TX(cx+r+6,cy+8,"גבוה",14,RED,"bold","middle")
# two dominant forces flanking
b+=rect(70,470,300,150,BG,16,RED,2,sh="L")+iconchip(316,512,26,"users","#FCEDED",RED,24)
b+=TX(330,560,"כוח הלקוחות",18,NAVY,"bold","start")+TX(330,588,"עלות מעבר אפסית",13.5,MUT,"normal","start")+TX(330,500,"חזק",13,RED,"bold","start")
b+=rect(910,470,300,150,BG,16,RED,2,sh="L")+iconchip(1156,512,26,"shield","#FCEDED",RED,24)
b+=TX(1186,560,"איום התחליפים",18,NAVY,"bold","start")+TX(1186,588,"פיקדון · קרן · עו\"ש",13.5,MUT,"normal","start")+TX(1186,500,"חזק",13,RED,"bold","start")
# flip caption
b+=rect(420,150,440,70,"url(#gNavy)",14)+TX(840,180,"ריביט הופך את האיום לחסם נטישה",16.5,"#FFFFFF","bold","start")+TX(840,204,"מהמאוים — לתחליף עצמו",13.5,CYG,"normal","start")
b+=src("עיבוד המגישים לפי Porter (1979)")
W("porter_a",doc(b))

# =========================================================
# PORTER — concept B: Dark Equalizer (the "2" headline)
# =========================================================
b=head("PORTER · FIVE FORCES","חמשת הכוחות — מאזן העוצמה","",dark=True)
forces=[("כוח הלקוחות","users",5,REDG,True),("איום התחליפים","shield",5,REDG,True),
        ("תחרותיות בענף","trend",3,AMBG,False),("מתחרים חדשים","flag",3,AMBG,False),
        ("כוח הספקים","bank",2,"#4C6C84",False)]
base=600; bw=92; gap=34; total=len(forces)*bw+(len(forces)-1)*gap; x0=640-total/2
for i,(nm,ic,lv,col,strong) in enumerate(forces):
    x=x0+i*(bw+gap); h=lv*78+24; y=base-h
    gf=' filter="url(#glowS)"' if strong else ''
    b+=f'<rect x="{x}" y="{y}" width="{bw}" height="{h}" rx="12" fill="{col}"{gf}/>'
    b+=iconchip(x+bw/2,base+34,22,ic,("#1C4161"),(col if strong else WMUT),20)
    b+=TX(x+bw/2,base+78,nm,12.5,(WT if strong else WMUT),("bold" if strong else "normal"),"middle")
    if strong: b+=TX(x+bw/2,y-12,"חזק",12,REDG,"bold","middle")
# big headline
b+=big(250,300,"2",150,CYG,"middle",glow=True)
b+=TX(250,360,"כוחות מכריעים",19,WT,"bold","middle")
b+=TX(250,388,"מתוך חמישה",14,WMUT,"normal","middle")
b+=rect(120,418,260,52,"#153B57",12,"#234B6C",1)+TX(354,442,"ריביט → חסם נטישה",14,CYG,"bold","start")+TX(354,462,"מהמאוים לתחליף עצמו",12,WMUT,"normal","start")
b+=src("עיבוד המגישים לפי Porter (1979)",dark=True)
W("porter_b",doc(b,dark=True))

# =========================================================
# PORTER — concept C: Threat -> Moat flip (split drama)
# =========================================================
b=head("PORTER · FIVE FORCES","חמשת הכוחות — מאיום לחסם","",dark=True)
# right zone = threat
b+=f'<path d="M1240 130 L1240 660 L560 660 L660 130 Z" fill="#3A1414" opacity="0.55"/>'
b+=TX(1210,180,"האיום",16,REDG,"bold","start",ls="1")
b+=rect(905,230,300,120,"#2A1414",14,REDG,1.4)+iconchip(1175,272,24,"users","#3A1A1A",REDG,22)+TX(1145,266,"כוח הלקוחות",16,WT,"bold","start")+TX(1145,292,"מעבר בלחיצה",13,WMUT,"normal","start")
b+=rect(905,380,300,120,"#2A1414",14,REDG,1.4)+iconchip(1175,422,24,"shield","#3A1A1A",REDG,22)+TX(1145,416,"איום התחליפים",16,WT,"bold","start")+TX(1145,442,"פיקדון · קרן · עו\"ש",13,WMUT,"normal","start")
# left zone = moat
b+=f'<path d="M40 130 L640 130 L560 660 L40 660 Z" fill="#0A2E2A" opacity="0.55"/>'
b+=TX(70,180,"החסם",16,GRNG,"bold","start",ls="1")
b+=iconchip(220,360,80,"lock","#0E3A33",GRNG,70,glow=True)
b+=TX(220,470,"חסם נטישה",20,WT,"bold","middle")+TX(220,498,"ריביט נועל נזילות",14,WMUT,"normal","middle")
# transformation arrow across
b+=f'<path d="M880 405 C720 405 600 405 430 405" stroke="url(#gCyan)" stroke-width="9" fill="none" marker-end="url(#fl)" filter="url(#glowS)"/>'
b+=f'<defs><marker id="fl" markerWidth="11" markerHeight="11" refX="6" refY="3.2" orient="auto"><path d="M0,0 L8,3.2 L0,6.4 Z" fill="{CYG}"/></marker></defs>'
b+=big(640,250,"ריביט",40,CYG,"middle",glow=True)
b+=TX(640,300,"מהמאוים — לתחליף עצמו",16,WT,"bold","middle")
b+=src("עיבוד המגישים לפי Porter (1979)",dark=True)
W("porter_c",doc(b,dark=True))

# =========================================================
# OKR — concept A: Mission Control (dark, 3 glowing gauges)
# =========================================================
def gauge(cx,cy,r,frac,col,num,lab,tf):
    s=circ(cx,cy,r,"none","#1A415E",16)
    s+=f'<path d="{arcpath(cx,cy,r,-90,-90+360*frac)}" fill="none" stroke="{col}" stroke-width="16" stroke-linecap="round" filter="url(#glowS)"/>'
    s+=big(cx,cy+14,num,46,WT,"middle")
    s+=TX(cx,cy+44,"יעד",13,WMUT,"normal","middle")
    s+=TX(cx,cy+r+44,lab,18,WT,"bold","middle")
    s+=rect(cx-58,cy+r+58,116,28,"#184056",14)+icon(cx-50,cy+r+62,18,"clock",WMUT,1.7)+TX(cx+46,cy+r+80,tf,12.5,WMUT,"normal","start")
    return s
b=head("OBJECTIVES & KEY RESULTS","מדידת הצלחה — OKR / SMART","",dark=True)
b+=rect(70,140,1140,72,"#153B57",16,"#234B6C",1)+rect(70,140,7,72,CYG,4)
b+=iconchip(1185,176,26,"target","#174764",CYG,24,glow=True)
b+=TX(1140,170,"Objective 2 — ביסוס ביט כארנק דיגיטלי לחיסכון יומיומי",19,WT,"bold","start")
b+=TX(1140,198,"Objective 1: מוניטיזציה ורווחיות הארנק",13.5,WMUT,"normal","start")
b+=gauge(320,400,96,0.60,CYG,"15%","KR1 · אימוץ","12 חודשים")
b+=gauge(640,400,96,0.40,"#2FB6D6","10%","KR2 · עומק","12 חודשים")
b+=gauge(960,400,96,0.80,GRNG,"20%","KR3 · שימור","9 חודשים")
b+=TX(1210,620,"SMART · S·M·A·R·T",12.5,WMUT,"normal","start",ltr=False)
b+=src("עיבוד המגישים · יעדים שהוגדרו עם ההשקה",dark=True)
W("okr_a",doc(b,dark=True))

# =========================================================
# OKR — concept B: Ascent trajectory (climb to the objective)
# =========================================================
b=head("OBJECTIVES & KEY RESULTS","מדידת הצלחה — מסלול העלייה ליעד","",dark=True)
# rising path right(launch)->left(objective)
pts=[(1120,560),(820,470),(560,360),(300,230)]
path="M"+" L".join(f"{x},{y}" for x,y in pts)
b+=f'<path d="{path}" fill="none" stroke="url(#gCyan)" stroke-width="6" stroke-linecap="round" filter="url(#glowS)"/>'
b+=f'<path d="{path} L1120,600 L300,600 Z" fill="url(#gCyan)" opacity="0.08"/>'
# launch marker
b+=circ(1120,560,9,CYG)+TX(1120,598,"השקה · נוב' 2025",12.5,WMUT,"normal","middle")
mil=[((820,470),"KR1 · אימוץ","15%","12 חודשים",CYG),((560,360),"KR2 · עומק","10%","12 חודשים","#2FB6D6"),((300,230),"KR3 · שימור","20%","9 חודשים",GRNG)]
for (x,y),lab,num,tf,col in mil:
    b+=circ(x,y,13,col,glow=True)+circ(x,y,5,DK1)
    b+=big(x,y-58,num,40,WT,"middle")
    b+=TX(x,y-26,lab,15,col,"bold","middle")
    b+=TX(x,y+34,tf,12,WMUT,"normal","middle")
# summit objective
b+=iconchip(220,150,30,"flag","#174764",CYG,26,glow=True)
b+=TX(186,150,"היעד",16,WT,"bold","end")
b+=rect(70,628,1140,52,"#153B57",12,"#234B6C",1)+TX(1196,660,"Objective 2:",13.5,CYG,"bold","start")+TX(1120,660,"ביסוס ביט כארנק דיגיטלי לחיסכון יומיומי · יעדים לפי SMART",13.5,WT,"normal","start")
b+=src("עיבוד המגישים · יעדים שהוגדרו עם ההשקה",dark=True)
W("okr_b",doc(b,dark=True))

# =========================================================
# OKR — concept C: Concentric KR rings (one emblem)
# =========================================================
b=head("OBJECTIVES & KEY RESULTS","מדידת הצלחה — שלוש תוצאות מפתח","",dark=True)
cx,cy=470,400
rings=[(205,0.80,GRNG,"KR3 · שימור","20%"),(155,0.40,"#2FB6D6","KR2 · עומק","10%"),(105,0.60,CYG,"KR1 · אימוץ","15%")]
for r,frac,col,lab,num in rings:
    b+=circ(cx,cy,r,"none","#1A415E",18)
    b+=f'<path d="{arcpath(cx,cy,r,-90,-90+360*frac)}" fill="none" stroke="{col}" stroke-width="18" stroke-linecap="round" filter="url(#glowS)"/>'
b+=iconchip(cx,cy,52,"target","#174764",CYG,46,glow=True)
# legend right
lx=820; ly=250
for r,frac,col,lab,num in rings:
    b+=circ(lx+18,ly-8,9,col)+TX(lx+44,ly,lab,18,WT,"bold","start") if False else ""
    b+=rect(760,ly-34,430,90,"#153B57",14,"#234B6C",1)+rect(760,ly-34,7,90,col,4)
    b+=big(820,ly+22,num,42,col,"start")
    b+=TX(1166,ly-2,lab,18,WT,"bold","start")
    b+=TX(1166,ly+26,("יפתחו כיס ריבית" if "אימוץ" in lab else ("יוחזק בכיסי ריבית" if "עומק" in lab else "בתדירות הכניסות")),13.5,WMUT,"normal","start")
    ly+=120
b+=TX(cx,cy+250,"מטרה 2 · ארנק חיסכון יומיומי",14,WMUT,"normal","middle")
b+=src("עיבוד המגישים · יעדים שהוגדרו עם ההשקה",dark=True)
W("okr_c",doc(b,dark=True))

# =========================================================
# VALUE ENGINE — concept A: Flywheel (momentum loop)
# =========================================================
b=head("TRIPLE-WIN ENGINE","מנוע הערך — גלגל התנופה","",dark=True)
cx,cy=470,380; R=180
segs=[(-80,40,CYG,"המוצר","bolt"),(40,160,GRNG,"הבנק","bank"),(160,280,"#2FB6D6","הלקוח","wallet")]
for a0,a1,col,lab,ic in segs:
    b+=f'<path d="{arcpath(cx,cy,R,a0+6,a1-6)}" fill="none" stroke="{col}" stroke-width="30" stroke-linecap="round" filter="url(#glowS)"/>'
    am=math.radians((a0+a1)/2); lr=R+54
    lx=cx+lr*math.cos(am); ly=cy+lr*math.sin(am)
    b+=iconchip(cx+R*math.cos(am),cy+R*math.sin(am),21,ic,DK1,col,19)
    b+=TX(lx,ly+5,lab,17,WT,"bold","middle")
# rotation arrowheads
for a0,a1,col,lab,ic in segs:
    ae=math.radians(a1-8); tx=cx+R*math.cos(ae); ty=cy+R*math.sin(ae)
    b+=f'<circle cx="{tx:.1f}" cy="{ty:.1f}" r="5" fill="{col}"/>'
b+=iconchip(cx,cy,62,"gear","#174764",CYG,52,glow=True)
b+=TX(cx,cy+96,"ריביט",18,WT,"bold","middle")
# caption
b+=rect(770,300,420,160,"#153B57",16,"#234B6C",1)
b+=TX(1166,344,"כל סיבוב מזין את הבא",18,WT,"bold","start")
b+=TX(1166,378,"ביט נועלת נזילות · הבנק מממן זול",13.5,WMUT,"normal","start")
b+=TX(1166,402,"הלקוח מתוגמל · המנוע מתעצם",13.5,WMUT,"normal","start")
b+=TX(1166,440,"ערך מצטבר — לא חד-פעמי",14,CYG,"bold","start")
b+=src("עיבוד המגישים · סיכום הניתוח",dark=True)
W("ve_a",doc(b,dark=True))

# =========================================================
# VALUE ENGINE — concept B: Meshing gears (mechanical triple-win)
# =========================================================
b=head("TRIPLE-WIN ENGINE","מנוע הערך — שלושה גלגלים","")
gears=[(440,330,118,18,"url(#gNavy)",NAVY,"המוצר (ביט)","bolt","חסם נטישה"),
       (700,300,104,16,"url(#gCyan)",CYD,"הלקוח","wallet","תגמול על כסף רדום"),
       (600,520,112,17,"url(#gGreen)",GRN,"הבנק","bank","נזילות זולה · דאטה")]
for cx,cy,r,t,fill,col,lab,ic,sub in gears:
    b+=f'<path d="{gearpath(cx,cy,r,t)}" fill="{fill}" filter="url(#sh)"/>'
    b+=circ(cx,cy,r*0.46,"#FFFFFF")
    b+=icon(cx-17,cy-17,34,ic,col,2)
for cx,cy,r,t,fill,col,lab,ic,sub in gears:
    pass
b+=TX(440,200,"המוצר (ביט)",16,NAVY,"bold","middle")+TX(440,222,"חסם נטישה",12.5,MUT,"normal","middle")
b+=TX(872,300,"הלקוח",16,CYD,"bold","start")+TX(872,322,"תגמול על כסף רדום",12.5,MUT,"normal","start")
b+=TX(600,668,"הבנק (הפועלים)",16,GRN,"bold","middle")+TX(600,690,"נזילות זולה · דאטה · cross-sell",12.5,MUT,"normal","middle")
b+=rect(930,150,300,150,PAPER,16,LINE,1)+TX(1206,188,"כשהמנוע מסתובב",16,NAVY,"bold","start")+TX(1206,218,"שלושת הצדדים",13.5,INK,"normal","start")+TX(1206,242,"מרוויחים בו-זמנית",13.5,INK,"normal","start")+TX(1206,276,"ניצחון משולש",15,CYD,"bold","start")
b+=src("עיבוד המגישים · סיכום הניתוח")
W("ve_b",doc(b))

# =========================================================
# VALUE ENGINE — concept C: Convergence -> emergent value (dark)
# =========================================================
b=head("TRIPLE-WIN ENGINE","מנוע הערך — התכנסות לערך","",dark=True)
streams=[(330,"המוצר","bolt",CYG),(640,"הלקוח","wallet","#2FB6D6"),(950,"הבנק","bank",GRNG)]
for x,lab,ic,col in streams:
    b+=iconchip(x,210,34,ic,"#174764",col,30,glow=True)
    b+=TX(x,272,lab,17,WT,"bold","middle")
    b+=f'<path d="M{x} 296 C{x} 360 640 380 640 440" stroke="{col}" stroke-width="7" fill="none" opacity="0.8" filter="url(#glowS)"/>'
b+=rect(360,440,560,96,"url(#gCyan)",20,sh="XL")
b+=icon(396,464,48,"rocket","#06303F",2.2)
b+=TX(880,486,"ניצחון משולש",24,"#06303F","bold","start")
b+=TX(880,516,"ערך שנוצר רק כששלושתם מנצחים יחד",13.5,"#0A3A4A","normal","start")
b+=big(640,632,"1+1+1",44,WT,"middle",glow=True)+TX(760,632,"›",36,WMUT,"middle")
b+=TX(640,672,"ערך מצטבר, לא סכום פשוט",14,WMUT,"normal","middle")
b+=src("עיבוד המגישים · סיכום הניתוח",dark=True)
W("ve_c",doc(b,dark=True))

print("DONE showcase — 9 concepts")
