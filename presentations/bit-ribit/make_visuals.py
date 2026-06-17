# -*- coding: utf-8 -*-
"""Build 8 upgraded Hebrew/RTL strategic visuals for the Bit-Ribit academic deck.
5 preserved frameworks (upgraded) + 3 new strategic visuals. Output SVG -> visuals/."""
import pathlib
OUT = pathlib.Path(__file__).parent / "visuals"; OUT.mkdir(exist_ok=True)

# brand
NAVY="#0A2540"; CYAN="#19C3D6"; CY2="#0E7C9B"; INK="#1F2937"; MUT="#6B7280"
BG="#FFFFFF"; SOFT="#F1F5F9"; RED="#DC2626"; GREEN="#15803D"; AMBER="#B45309"
FACE="Arial, 'Helvetica Neue', sans-serif"

def doc(w,h,body,bg=BG):
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" width="{w}" height="{h}" '
            f'font-family="{FACE}" direction="rtl"><rect width="{w}" height="{h}" fill="{bg}"/>{body}</svg>')
def T(x,y,s,size=20,color=INK,w="normal",anchor="start",ltr=False):
    d='' if not ltr else ' direction="ltr"'
    return f'<text x="{x}" y="{y}" font-size="{size}" fill="{color}" font-weight="{w}" text-anchor="{anchor}"{d}>{s}</text>'
def rect(x,y,w,h,fill,rx=10,stroke="none",sw=1):
    return f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="{rx}" fill="{fill}" stroke="{stroke}" stroke-width="{sw}"/>'
def line(x1,y1,x2,y2,color=MUT,w=2,dash=""):
    da=f' stroke-dasharray="{dash}"' if dash else ""
    return f'<line x1="{x1}" y1="{y1}" x2="{x2}" y2="{y2}" stroke="{color}" stroke-width="{w}"{da}/>'
def title(t, badge):
    return (rect(40,28,1200,72,NAVY,12)+
            T(1210,76,t,30,"#FFFFFF","bold")+
            rect(60,46,150,36,CYAN,8)+T(135,71,badge,15,NAVY,"bold","middle"))
def src(t):
    return T(1240,700,t,13,MUT,"normal")

def W(name, svg): (OUT/f"{name}.svg").write_text(svg, encoding="utf-8"); print("wrote", name)

# ---------------- 1. TAM / SAM / SOM (preserved, upgraded nested) ----------------
b = title("פוטנציאל השוק — TAM / SAM / SOM", "מסגרת 1")
# nested circles (left)
cx,cy=360,400
b += f'<circle cx="{cx}" cy="{cy}" r="240" fill="#E8F6FA" stroke="{CY2}" stroke-width="2"/>'
b += f'<circle cx="{cx}" cy="{cy+60}" r="150" fill="#BDE8F2" stroke="{CY2}" stroke-width="2"/>'
b += f'<circle cx="{cx}" cy="{cy+120}" r="72" fill="{NAVY}"/>'
b += T(cx,cy-180,"TAM",22,CY2,"bold","middle",True)+T(cx,cy+30,"SAM",20,CY2,"bold","middle",True)
b += T(cx,cy+115,"SOM",18,"#FFFFFF","bold","middle",True)+T(cx,cy+140,"≈525K",15,CYAN,"bold","middle",True)
# right explanatory cards
def card(y,tag,head,txt,col):
    s=rect(700,y,520,120,SOFT,10,col,2)
    s+=rect(700,y,8,120,col,0)
    s+=T(1200,y+34,head,19,NAVY,"bold")
    s+=T(1200,y+66,txt[0],15,INK)
    if len(txt)>1: s+=T(1200,y+92,txt[1],15,INK)
    return s
b += card(150,"TAM","TAM — השוק הכולל",["מאות מיליארדי ₪ יתרות נזילות בישראל","שאינן מניבות ריבית (עו\"ש + ארנקים)"],NAVY)
b += card(290,"SAM","SAM — השוק הנגיש",["~3.5 מיליון משתמשי ביט פעילים","עלות גיוס אפסית (Upsell פנימי)"],CY2)
b += card(430,"SOM","SOM — היעד הריאלי (שנה 1)",["~15% מהפעילים ≈ 525 אלף משתמשים","עוגן ביעדי OKR"],GREEN)
b += rect(700,560,520,70,"#FFF7ED",8,AMBER,1)+T(1200,588,"הערה מתודולוגית:",14,AMBER,"bold")+T(1200,612,"נתוני TAM אינם מתפרסמים רשמית — אומדנים מנומקים מנתוני ביט ויעדי OKR.",13,INK)
b += src("מקור: נתוני ביט; כלכליסט 2025 · עיבוד המגישים")
W("fw1_tam_sam_som", doc(1280,720,b))

# ---------------- 2. Competitor positioning (preserved, upgraded) ----------------
b = title("ניתוח מתחרים — מיצוב: תשואה מול תנאים", "מסגרת 2")
# comparison table 3 cols
cols=[("ביט — ריביט","עד 4%","ללא תנאים · בתוך האפליקציה","נעול/יומי נזיל",NAVY,True),
      ("PayBox","2.5%–6%","מותנה בשימוש בכרטיס אשראי","נזיל",MUT,False),
      ("Max","~3%","יתרה נזילה בחשבון","נזיל",MUT,False)]
x0=120; cw=350; gap=20
for i,(nm,yld,cond,liq,col,hi) in enumerate(cols):
    x=x0+i*(cw+gap)
    b+=rect(x,150,cw,420,(NAVY if hi else SOFT),14,(CYAN if hi else "#E2E8F0"),(3 if hi else 1))
    tc="#FFFFFF" if hi else INK
    b+=T(x+cw-24,200,nm,24,(CYAN if hi else NAVY),"bold")
    b+=T(x+cw-24,300,yld,52,(CYAN if hi else col),"bold","end",True)
    b+=T(x+cw-24,330,"תשואה",16,(("#CBD5E1") if hi else MUT))
    b+=line(x+20,360,x+cw-20,360,("#1E3A5F" if hi else "#E2E8F0"),1)
    b+=T(x+cw-24,400,"תנאי:",15,(CYAN if hi else CY2),"bold")+T(x+cw-24,430,cond,15,tc)
    b+=T(x+cw-24,490,"נזילות:",15,(CYAN if hi else CY2),"bold")+T(x+cw-24,520,liq,15,tc)
b += rect(120,590,1090,70,"#ECFEFF",8,CY2,1)+T(1190,618,"תובנה אסטרטגית:",15,CY2,"bold")+T(1190,644,"ריביט = התשואה הגבוהה ביותר ללא תנאי כרטיס — כניסה הגנתית (מניעת זליגה) והתקפית (מיצוב חיסכון).",14,INK)
b += src("מקורות: PayBox, Max, בנק הפועלים 2025 · עיבוד המגישים")
W("fw2_competitors", doc(1280,720,b))

# ---------------- 3. Porter Five Forces (preserved, upgraded) ----------------
b = title("חמשת הכוחות של פורטר — הלחץ המבני", "מסגרת 3")
cx,cy=640,400
b += f'<circle cx="{cx}" cy="{cy}" r="92" fill="{NAVY}" stroke="{CYAN}" stroke-width="4"/>'+T(cx,cy+8,"ביט",26,"#FFFFFF","bold","middle")
def force(x,y,head,txt,strong):
    col=RED if strong else "#94A3B8"
    s=rect(x,y,300,108,("#FEF2F2" if strong else SOFT),12,col,(2 if strong else 1))
    s+=T(x+280,y+32,head,18,(RED if strong else NAVY),"bold")
    s+=T(x+280,y+60,txt[0],14,INK)
    if len(txt)>1: s+=T(x+280,y+84,txt[1],14,INK)
    if strong: s+=T(x+24,y+32,"⬤ חזק",13,RED,"bold","start")
    return s
b += force(60,150,"כוח הלקוחות",["עלות מעבר אפסית —","פייבוקס בלחיצה"],True)
b += force(920,150,"מתחרים חדשים",["ארנקים ובנקים","דיגיטליים"],False)
b += force(60,560,"כוח הספקים",["תשתית סליקה","ובנקאות"],False)
b += force(920,560,"תחרותיות בענף",["PayBox · Max ·","בנקים"],False)
b += force(490,600,"איום התחליפים",["פיקדון בנקאי / קרן","כספית / עו\"ש"],True)
# connectors
for (x,y) in [(360,258),(1070,258),(360,560),(1070,560),(640,600)]:
    b += line(cx,cy,x,y,"#CBD5E1",2,"5 5")
b += rect(60,470,1160,60,"#FEF2F2",8,RED,1)+T(1200,508,"התובנה: שני הכוחות החזקים — כוח הלקוחות ואיום התחליפים. ריביט יוצר חסם נטישה: ביט הופכת מהמאוים — לתחליף עצמו.",15,INK,"bold")
b += src("עיבוד המגישים לפי Porter (1979)")
W("fw3_porter", doc(1280,720,b))

# ---------------- 4. VPC (preserved, upgraded two-panel) ----------------
b = title("קנבס הצעת הערך (VPC) — Product–Market Fit", "מסגרת 4")
# value map (square, right) + customer profile (circle, left)
b += rect(70,150,540,470,SOFT,16,NAVY,2)+T(575,190,"מפת הערך (Bit / ריביט)",20,NAVY,"bold")
def li(x,y,w,head,txt):
    s=T(x,y,head,16,CY2,"bold")
    for i,t in enumerate(txt): s+=T(x,y+26+i*22,t,14,INK)
    return s
b += li(575,235,0,"מוצרים",["כיס חיסכון נושא ריבית · טעינה מכרטיס אשראי"])
b += li(575,315,0,"משככי כאבים",["ביטול חיכוך מול הבנק — אין חשבון, אין סניף,","הכל בממשק הכיסים המוכר"])
b += li(575,420,0,"מייצרי רווחים",["ריבית מעל הממוצע · החזרה אוטומטית של","קרן+ריבית · חוויית כיסי-יעד יומיומית"])
b += rect(680,150,540,470,BG,16,CY2,2)+T(1200,190,"פרופיל הלקוח",20,NAVY,"bold")
b += li(1200,235,0,"משימות (Jobs)",["לשים בצד סכום ולהרגיש שהכסף עובד —","בלי להתעסק בפיקדונות בנקאיים"])
b += li(1200,330,0,"כאבים (Pains)",["כסף בעו\"ש/ביט כמעט ללא ריבית בזמן","שמתחרים מפרסמים 2.5%–6% — \"פספוס תשואה\""])
b += li(1200,440,0,"רווחים רצויים (Gains)",["תשואה פשוטה בקליק · שקיפות · גב בנקאי אמין"])
# fit arrow
b += f'<path d="M680 385 L610 385" stroke="{CYAN}" stroke-width="6" marker-end="url(#a)"/>'
b += f'<defs><marker id="a" markerWidth="10" markerHeight="10" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="{CYAN}"/></marker></defs>'
b += rect(70,635,1150,55,"#ECFEFF",8,CY2,1)+T(1200,668,"Fit: ריביט ממנף משתמשים מזוהים (KYC) ומסיר חיכוך — יתרון תחרותי מובהק על הבנקים, לא רק התשואה.",15,INK,"bold")
b += src("עיבוד המגישים לפי Osterwalder VPC")
W("fw4_vpc", doc(1280,720,b))

# ---------------- 5. SMART / OKR (preserved, upgraded) ----------------
b = title("מדידת הצלחה — OKR / SMART", "מסגרת 5")
b += rect(70,150,1140,90,NAVY,12)+T(1180,190,"Objective 2 — ביסוס ביט כארנק דיגיטלי לחיסכון יומיומי",20,"#FFFFFF","bold")+T(1180,222,"(Objective 1: מוניטיזציה ורווחיות הארנק)",15,CYAN)
krs=[("KR1 · אימוץ (Adoption)","מעל 15% ממשתמשי ה-MAU יפתחו כיס ריבית","תוך 12 חודשים",0.45),
     ("KR2 · עומק (Volume)","מעל 10% מהיתרה הממוצעת תוחזק בכיסי ריבית","תוך 12 חודשים",0.35),
     ("KR3 · שימור (Engagement)","עלייה של 20% בתדירות הכניסות בקרב משתמשי ריביט","תוך 9 חודשים",0.30)]
y=270
for head,txt,tf,prog in krs:
    b+=rect(70,y,1140,110,SOFT,12,"#E2E8F0",1)+rect(70,y,8,110,CYAN,0)
    b+=T(1180,y+38,head,19,NAVY,"bold")+T(1180,y+68,txt,15,INK)+T(1180,y+94,tf,13,MUT)
    # SMART progress bar (left)
    bx,bw=110,360
    b+=rect(bx,y+44,bw,18,"#E2E8F0",9)+rect(bx,y+44,int(bw*prog),18,CY2,9)
    b+=T(bx+bw,y+34,"בביצוע",13,MUT,"normal","end")
    y+=128
b += rect(70,654,1140,44,"#FFF7ED",8,AMBER,1)+T(1180,682,"הערה: המוצר הושק נובמבר 2025 — מוקדם למדוד עמידה מלאה; היעדים מנוסחים לפי SMART (S·M·A·R·T).",14,INK)
b += src("עיבוד המגישים · יעדים שהוגדרו עם ההשקה")
W("fw5_smart_okr", doc(1280,720,b))

# ================= NEW STRATEGIC VISUALS =================
# ---------------- A. Dormant Money -> Ribit -> Yield ----------------
b = title("מנוע 1 — כסף רדום ← ריביט ← תשואה", "ויזואל חדש")
# three stages left->right (RTL: right=start)
def stage(cx,cy,r,fill,stroke,big,sub,note,nc):
    s=f'<circle cx="{cx}" cy="{cy}" r="{r}" fill="{fill}" stroke="{stroke}" stroke-width="4"/>'
    s+=T(cx,cy-6,big,30,nc,"bold","middle",True)
    s+=T(cx,cy+28,sub,17,nc,"normal","middle")
    s+=T(cx,cy+r+34,note,15,INK,"bold","middle")
    return s
b += stage(1010,360,120,"#F3F4F6",RED,"0%","כסף רדום","יתרות שוכבות בעו\"ש/ביט",RED)
b += stage(640,360,120,NAVY,CYAN,"ריביט","","כיס פיקדון נושא ריבית","#FFFFFF")
b += T(640,360, "ריביט", 34, "#FFFFFF","bold","middle")
b += stage(270,360,120,"#ECFDF5",GREEN,"4%","כסף חוסך","תשואה בקליק, ללא חיכוך",GREEN)
# arrows RTL
b += f'<path d="M885 360 L765 360" stroke="{CYAN}" stroke-width="8" marker-end="url(#m)"/>'
b += f'<path d="M515 360 L395 360" stroke="{GREEN}" stroke-width="8" marker-end="url(#m)"/>'
b += f'<defs><marker id="m" markerWidth="9" markerHeight="9" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="{CYAN}"/></marker></defs>'
b += rect(120,560,1040,90,SOFT,10,CY2,1)
b += T(1140,592,"המנגנון:",16,CY2,"bold")+T(1140,620,"ביטול ההעברה האוטומטית השאיר יתרות רדומות; ריביט ממיר אותן לכסף חוסך —",14,INK)
b += T(1140,644,"3.5 מיליון משתמשים · ~29.4 מיליארד ₪ העברות בשנה · ריבית עד 4%.",14,INK)
b += src("עיבוד המגישים · נתוני ביט 2025")
W("new1_dormant_yield", doc(1280,720,b))

# ---------------- B. Trojan Horse Model ----------------
b = title("מנוע 2 — מודל הסוס הטרויאני", "ויזואל חדש")
# rival banks (right) -> bit (center) -> Bank Hapoalim (left)
b += rect(980,200,220,150,SOFT,12,"#E2E8F0",1)+T(1190,236,"בנקים מתחרים",17,NAVY,"bold")+T(1190,300,"~2/3 ממשתמשי",14,INK)+T(1190,322,"ביט מנהלים בהם חשבון",14,INK)
b += f'<circle cx="640" cy="360" r="105" fill="{NAVY}" stroke="{CYAN}" stroke-width="4"/>'+T(640,352,"ביט",26,"#FFFFFF","bold","middle")+T(640,384,"ריביט",18,CYAN,"bold","middle")
b += rect(80,200,220,150,NAVY,12)+T(290,236,"בנק הפועלים",17,"#FFFFFF","bold")+T(290,296,"נזילות זולה ויציבה",14,CYAN)+T(290,320,"+ ראש גשר ל-cross-sell",14,CYAN)
b += f'<path d="M975 290 Q800 300 745 340" stroke="{RED}" stroke-width="6" fill="none" marker-end="url(#t)"/>'
b += T(860,250,"כסף נכנס לריביט",14,RED,"bold","middle")
b += f'<path d="M535 360 Q400 320 305 300" stroke="{GREEN}" stroke-width="6" fill="none" marker-end="url(#t)"/>'
b += T(430,300,"נזילות + דאטה",14,GREEN,"bold","middle")
b += f'<defs><marker id="t" markerWidth="9" markerHeight="9" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="{RED}"/></marker></defs>'
# three value rows
rows=[("כליאת נזילות","הכסף נשאר בביט במקום לזרום לבנק המתחרה — מימון זול לבנק הפועלים."),
      ("גישה ללקוחות המתחרים","קשר פיננסי ישיר עם מי שאינם לקוחות הבנק — ראש גשר לאשראי וחיסכון."),
      ("ממוצר הפסדי למשפך גיוס","ביט עוברת מ-Loss Leader למשפך גיוס פיננסי \"עוקף-בנק\".")]
y=470
for h,t in rows:
    b+=rect(80,y,1120,56,SOFT,8,CY2,1)+T(1188,y+24,h+":",15,CY2,"bold")+T(1188,y+46,t,14,INK)
    y+=66
b += src("עיבוד המגישים · בנק הפועלים, הודעה לעיתונות 3.11.2025")
W("new2_trojan_horse", doc(1280,720,b))

# ---------------- C. Ribit Value Engine (triple win) ----------------
b = title("מנוע 3 — מנוע הערך של ריביט (הניצחון המשולש)", "ויזואל חדש")
cx,cy=640,360; r=150
import math
pts=[(cx, cy-90),(cx-130, cy+70),(cx+130, cy+70)]
labels=[("המוצר (ביט)","חסם נטישה · הופך מצינור לפלטפורמה",NAVY),
        ("הלקוח","תגמול על כסף רדום · אפס מאמץ · גב בנקאי",CY2),
        ("הבנק (הפועלים)","נזילות זולה · דאטה · cross-sell עתידי",GREEN)]
for (px,py),(h,t,col) in zip(pts,labels):
    b+=f'<circle cx="{px}" cy="{py}" r="110" fill="{col}" fill-opacity="0.14" stroke="{col}" stroke-width="3"/>'
b += f'<circle cx="{cx}" cy="{cy}" r="30" fill="{CYAN}"/>'+T(cx,cy+6,"ריביט",15,NAVY,"bold","middle")
# label cards
b += rect(440,40,400,70,SOFT,10,NAVY,1)+T(820,68,labels[0][0],17,NAVY,"bold")+T(820,94,labels[0][1],13,INK)
b += rect(40,560,520,110,SOFT,10,CY2,1)+T(540,592,labels[1][0],17,CY2,"bold")+T(540,618,labels[1][1],13,INK)
b += rect(720,560,520,110,SOFT,10,GREEN,1)+T(1220,592,labels[2][0],17,GREEN,"bold")+T(1220,618,labels[2][1],13,INK)
b += T(640,150,"חיתוך = ערך משולש בו-זמני",16,MUT,"normal","middle")
b += src("עיבוד המגישים · סיכום הניתוח")
W("new3_value_engine", doc(1280,720,b))
print("DONE 8 visuals")
