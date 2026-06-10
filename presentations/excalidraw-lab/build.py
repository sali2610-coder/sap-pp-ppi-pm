"""Build 5 SAP .excalidraw diagrams. Valid Excalidraw v2 JSON.
Colors from excalidraw-diagram/references/color-palette.md (semantic tiers).
"""
import json, pathlib

OUT = pathlib.Path(__file__).parent / "out"
OUT.mkdir(parents=True, exist_ok=True)

# semantic tiers (fill, stroke, text-on-fill)
T = {
    "input":  ("#fed7aa", "#c2410c", "#374151"),   # start/trigger
    "core":   ("#3b82f6", "#1e3a5f", "#ffffff"),   # primary process (ECC)
    "plan":   ("#93c5fd", "#1e3a5f", "#374151"),   # secondary
    "mw":     ("#ddd6fe", "#6d28d9", "#374151"),   # middleware/AI tier
    "qm":     ("#a7f3d0", "#047857", "#374151"),   # success/quality
    "fin":    ("#fecaca", "#b91c1c", "#374151"),   # finance/emphasis
    "amber":  ("#fef3c7", "#b45309", "#374151"),   # decision
}
TITLE = "#1e40af"; SUB = "#3b82f6"; BODY = "#64748b"

def _base(i, seed):
    return {"fillStyle":"solid","strokeWidth":2,"strokeStyle":"solid","roughness":0,
            "opacity":100,"angle":0,"seed":seed,"version":1,"versionNonce":seed+1,
            "isDeleted":False,"groupIds":[],"frameId":None,"link":None,"locked":False}

class Builder:
    def __init__(self): self.els=[]; self.n=0
    def _id(self,p): self.n+=1; return f"{p}{self.n}"
    def box(self, x,y,w,h,text,tier,fs=15):
        f,s,tc = T[tier]; rid=self._id("r"); tid=self._id("t"); seed=10000+self.n*7
        r=_base(self.n,seed); r.update({"type":"rectangle","id":rid,"x":x,"y":y,"width":w,"height":h,
            "strokeColor":s,"backgroundColor":f,"roundness":{"type":3},
            "boundElements":[{"id":tid,"type":"text"}]})
        self.els.append(r)
        t=_base(self.n,seed+3); t.update({"type":"text","id":tid,"x":x+6,"y":y+h/2-12,
            "width":w-12,"height":24,"text":text,"originalText":text,"fontSize":fs,"fontFamily":3,
            "textAlign":"center","verticalAlign":"middle","strokeColor":tc,
            "backgroundColor":"transparent","containerId":rid,"lineHeight":1.25,"boundElements":None})
        self.els.append(t)
        return rid
    def label(self,x,y,text,size=18,color=TITLE,align="left",w=None):
        tid=self._id("l"); seed=20000+self.n*7
        t=_base(self.n,seed); t.update({"type":"text","id":tid,"x":x,"y":y,
            "width":w or max(80,len(text)*size*0.6),"height":size+6,"text":text,"originalText":text,
            "fontSize":size,"fontFamily":3,"textAlign":align,"verticalAlign":"top","strokeColor":color,
            "backgroundColor":"transparent","containerId":None,"lineHeight":1.25,"boundElements":None})
        self.els.append(t); return tid
    def arrow(self, a, b, pts, color="#1e3a5f", dashed=False):
        aid=self._id("a"); seed=30000+self.n*7
        x0,y0=pts[0]; rel=[[px-x0,py-y0] for px,py in pts]
        el=_base(self.n,seed); el.update({"type":"arrow","id":aid,"x":x0,"y":y0,
            "width":abs(pts[-1][0]-x0),"height":abs(pts[-1][1]-y0),
            "strokeColor":color,"backgroundColor":"transparent","points":rel,
            "strokeStyle":"dashed" if dashed else "solid",
            "startBinding":{"elementId":a,"focus":0,"gap":4} if a else None,
            "endBinding":{"elementId":b,"focus":0,"gap":4} if b else None,
            "startArrowhead":None,"endArrowhead":"arrow","boundElements":None})
        self.els.append(el)
        for eid in (a,b):
            if not eid: continue
            for e in self.els:
                if e["id"]==eid:
                    e.setdefault("boundElements",[]) or e.__setitem__("boundElements", e.get("boundElements") or [])
                    e["boundElements"].append({"id":aid,"type":"arrow"})
    def dump(self,path):
        doc={"type":"excalidraw","version":2,"source":"https://excalidraw.com",
             "elements":self.els,"appState":{"viewBackgroundColor":"#ffffff","gridSize":20},"files":{}}
        path.write_text(json.dumps(doc,indent=2),encoding="utf-8")

def flow_row(b, items, y, w=190, h=78, gap=58, x0=60):
    ids=[]; x=x0
    for text,tier in items:
        ids.append((b.box(x,y,w,h,text,tier), x, w)); x+=w+gap
    for i in range(len(ids)-1):
        rid,rx,rw=ids[i]; nid,nx,_=ids[i+1]
        b.arrow(rid,nid,[(rx+rw,y+h/2),(nx,y+h/2)])
    return ids

# 1) SAP PP architecture (layered)
b=Builder()
b.label(60,24,"SAP PP — Production Planning Architecture",26,TITLE)
b.label(60,60,"Master data feeds planning → orders → execution → costing",14,BODY)
md=flow_row(b,[("Material Master\nMM03 · MARC",-1 and "plan"),("BOM\nCS03 · STKO/STPO","plan"),
   ("Routing\nCA03 · PLKO/PLPO","plan"),("Work Center\nCR03 · CRHD","plan")],y=110)
fl=flow_row(b,[("Demand\nPIR · SOP","input"),("MRP Run\nMD01 · planned ord","core"),
   ("Prod Order\nCO01 · AUFK/AFKO","core"),("Confirmation\nCO11N · AFRU","core"),
   ("Goods Receipt\nMIGO · 101","qm"),("Settlement\nKO88 · CO","fin")],y=260,w=185,gap=40)
# master-data → MRP coupling
for rid,rx,rw in md:
    b.arrow(rid,fl[1][0],[(rx+rw/2,188),(fl[1][1]+fl[1][2]/2,260)],color="#6d28d9",dashed=True)
b.dump(OUT/"01_sap_pp_architecture.excalidraw")

# 2) SAP PP-PI production process
b=Builder()
b.label(60,24,"SAP PP-PI — Process Order Lifecycle",26,TITLE)
b.label(60,60,"Recipe-based process manufacturing with control recipe / PI sheet",14,BODY)
flow_row(b,[("Process Order\nCOR1 · AFKO","input"),("Release\nCOR2 · status REL","core"),
   ("Control Recipe\nCO53 · PI sheet","mw"),("Confirmation\nCOR6N · AFRU","core"),
   ("In-Process QM\nQA32 · QALS","qm"),("Goods Receipt\nMIGO · 101","qm"),
   ("Settlement\nKO88 · CO","fin")],y=150,w=178,gap=34)
b.label(60,250,"Batch determination + characteristic results captured on the PI sheet (CO60).",13,BODY,w=900)
b.dump(OUT/"02_sap_pppi_process.excalidraw")

# 3) SAP PM maintenance lifecycle (cycle)
b=Builder()
b.label(60,24,"SAP PM — Maintenance Order Lifecycle",26,TITLE)
b.label(60,60,"Notification → order → execution → technical & business completion",14,BODY)
top=flow_row(b,[("Notification\nIW21 · QMEL","input"),("Order\nIW31 · AUFK/AFIH","core"),
   ("Planning\nIW32 · ops/comp","plan"),("Release\nIW32 · REL","core")],y=130,w=185,gap=44)
bot=flow_row(b,[("Execution\nIW41 · confirm","core"),("Tech Complete\nIW32 · TECO","qm"),
   ("Settlement\nKO88 · CO","fin"),("History\nIW47/IH08","plan")],y=300,w=185,gap=44)
# link top-right down to bottom-left (serpentine)
tr=top[-1]; bl=bot[0]
b.arrow(tr[0],bl[0],[(tr[1]+tr[2]/2,208),(tr[1]+tr[2]/2,254),(bl[1]+bl[2]/2,254),(bl[1]+bl[2]/2,300)])
# cycle back history -> notification
br=bot[-1]; tl=top[0]
b.arrow(br[0],tl[0],[(br[1]+br[2],339),(br[1]+br[2]+30,339),(br[1]+br[2]+30,90),(tl[1]+tl[2]/2,90),(tl[1]+tl[2]/2,130)],color="#047857",dashed=True)
b.dump(OUT/"03_sap_pm_lifecycle.excalidraw")

# 4) SAP IDOC integration landscape (tiers)
b=Builder()
b.label(60,24,"SAP IDoc Integration Landscape",26,TITLE)
b.label(60,60,"External partners ↔ middleware ↔ ALE/IDoc ↔ application documents",14,BODY)
ext=[("Zetes / Daymax\nMES · WMS","input"),("EDI Partner\nEDIFACT","input")]
e1=b.box(60,130,200,70,ext[0][0],ext[0][1]); e2=b.box(60,230,200,70,ext[1][0],ext[1][1])
mw=b.box(330,180,190,80,"SAP PI/PO\niFlow · mapping","mw")
port=b.box(580,180,180,80,"Port / RFC\nWE21 · SM59","mw")
ale=b.box(820,120,200,75,"ALE Config\nWE20 · BD64","plan")
idoc=b.box(820,235,200,75,"IDoc Proc\nWE19 · WE02","core")
app=b.box(1090,180,200,80,"App Doc\nVBAK · EKKO","fin")
b.arrow(e1,mw,[(260,165),(330,210)],color="#c2410c")
b.arrow(e2,mw,[(260,265),(330,230)],color="#c2410c")
b.arrow(mw,port,[(520,220),(580,220)],color="#6d28d9")
b.arrow(port,ale,[(760,205),(820,157)])
b.arrow(port,idoc,[(760,235),(820,272)])
b.arrow(ale,idoc,[(920,195),(920,235)],color="#1e3a5f",dashed=True)
b.arrow(idoc,app,[(1020,272),(1090,230)],color="#1e3a5f")
b.arrow(app,port,[(1190,260),(1190,340),(670,340),(670,260)],color="#b91c1c",dashed=True)
b.label(700,348,"status 03 / 16 acknowledgements",12,BODY,w=400)
b.dump(OUT/"04_sap_idoc_landscape.excalidraw")

# 5) CBC production plant process map
b=Builder()
b.label(60,24,"CBC Production Plant — Process Map",26,TITLE)
b.label(60,60,"Goods flow on the shop floor, ECC PM + PP-PI integrated",14,BODY)
top=flow_row(b,[("Raw Receipt\nMIGO · 101","input"),("QC Incoming\nQA32 · QALS","qm"),
   ("Warehouse\nLT01 · bins","plan"),("Staging\nto line","plan")],y=130,w=185,gap=44)
bot=flow_row(b,[("Production\nCOR6N · PP-PI","core"),("Packing\nHU mgmt","plan"),
   ("Finished Goods\nMIGO · 101","qm"),("Dispatch\nVL01N · delivery","fin")],y=300,w=185,gap=44)
tr=top[-1]; bl=bot[0]
b.arrow(tr[0],bl[0],[(tr[1]+tr[2]/2,208),(tr[1]+tr[2]/2,254),(bl[1]+bl[2]/2,254),(bl[1]+bl[2]/2,300)])
# maintenance support lane
mw=b.box(820,300,185,78,"Plant Maint.\nIW31 · breakdown","fin")
b.arrow(mw,bot[0][0],[(820,339),(bot[0][1]+bot[0][2],339)],color="#b91c1c",dashed=True)
b.dump(OUT/"05_cbc_plant_process_map.excalidraw")

print("built 5 files in", OUT)
