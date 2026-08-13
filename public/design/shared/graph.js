// GENERATED. Process flow links are REAL joins from the dictionary — direct or via a
// named real intermediate table. `real:false` means the link is NOT modelled; render it
// as a gap, never as a solid connector. Taxonomy classes group real tables only.
export const GRAPH = {
 "flow": [
  {
   "from": "MARA",
   "to": "MAST",
   "labelFrom": "חומר",
   "labelTo": "שיוך BOM",
   "hops": 1,
   "via": null,
   "joins": [
    "FROM MAST JOIN MARA ON MAST.MATNR = MARA.MATNR"
   ],
   "real": true
  },
  {
   "from": "MAST",
   "to": "STKO",
   "labelFrom": "שיוך BOM",
   "labelTo": "עץ מוצר",
   "hops": 1,
   "via": null,
   "joins": [
    "FROM STKO JOIN MAST ON STKO.STLNR = MAST.STLNR"
   ],
   "real": true
  },
  {
   "from": "STKO",
   "to": "STPO",
   "labelFrom": "עץ מוצר",
   "labelTo": "פריטי BOM",
   "hops": 1,
   "via": null,
   "joins": [
    "STPO.STLNR = STKO.STLNR"
   ],
   "real": true
  },
  {
   "from": "STPO",
   "to": "MAPL",
   "labelFrom": "פריטי BOM",
   "labelTo": "שיוך רשימת פעולות",
   "hops": 0,
   "via": null,
   "joins": [],
   "real": false
  },
  {
   "from": "MAPL",
   "to": "PLKO",
   "labelFrom": "שיוך רשימת פעולות",
   "labelTo": "רשימת פעולות",
   "hops": 1,
   "via": null,
   "joins": [
    "FROM PLKO JOIN MAPL ON PLKO.PLNTY = MAPL.PLNTY AND PLKO.PLNNR = MAPL.PLNNR"
   ],
   "real": true
  },
  {
   "from": "PLKO",
   "to": "PLPO",
   "labelFrom": "רשימת פעולות",
   "labelTo": "פעולות",
   "hops": 2,
   "via": "PLAS",
   "joins": [
    "FROM PLAS JOIN PLKO ON PLAS.PLNTY = PLKO.PLNTY AND PLAS.PLNNR = PLKO.PLNNR",
    "FROM PLPO JOIN PLAS ON PLPO.PLNTY = PLAS.PLNTY AND PLPO.PLNNR = PLAS.PLNNR AND PLPO.PLNKN = PLAS.PLNKN"
   ],
   "real": true
  },
  {
   "from": "PLPO",
   "to": "AUFK",
   "labelFrom": "פעולות",
   "labelTo": "כותרת פק\"ע",
   "hops": 0,
   "via": null,
   "joins": [],
   "real": false
  },
  {
   "from": "AUFK",
   "to": "AFKO",
   "labelFrom": "כותרת פק\"ע",
   "labelTo": "נתוני פק\"ע",
   "hops": 1,
   "via": null,
   "joins": [
    "AFKO.AUFNR = AUFK.AUFNR"
   ],
   "real": true
  },
  {
   "from": "AFKO",
   "to": "AFPO",
   "labelFrom": "נתוני פק\"ע",
   "labelTo": "פריטי פק\"ע",
   "hops": 1,
   "via": null,
   "joins": [
    "FROM AFPO JOIN AFKO ON AFPO.AUFNR = AFKO.AUFNR"
   ],
   "real": true
  },
  {
   "from": "AFPO",
   "to": "RESB",
   "labelFrom": "פריטי פק\"ע",
   "labelTo": "הזמנות רכיבים",
   "hops": 2,
   "via": "AUFK",
   "joins": [
    "AFPO.AUFNR = AUFK.AUFNR",
    "RESB.AUFNR = AUFK.AUFNR"
   ],
   "real": true
  },
  {
   "from": "RESB",
   "to": "AFRU",
   "labelFrom": "הזמנות רכיבים",
   "labelTo": "דיווח ביצוע",
   "hops": 2,
   "via": "AFKO",
   "joins": [
    "FROM RESB JOIN AFKO ON RESB.AUFNR = AFKO.AUFNR",
    "FROM AFRU JOIN AFKO ON AFRU.AUFNR = AFKO.AUFNR"
   ],
   "real": true
  }
 ],
 "taxonomy": {
  "master": {
   "he": "נתוני אב",
   "tables": [
    "MARA",
    "MARC",
    "EQUI",
    "IFLOT",
    "CRHD",
    "MKAL",
    "MCH1",
    "MBEW"
   ]
  },
  "structure": {
   "he": "מבנה · BOM ורשימות",
   "tables": [
    "STKO",
    "STPO",
    "MAST",
    "PLKO",
    "PLPO",
    "MAPL",
    "PLAS",
    "PLFL"
   ]
  },
  "transaction": {
   "he": "מסמך תנועה",
   "tables": [
    "AUFK",
    "AFKO",
    "AFPO",
    "AFVC",
    "QMEL",
    "AFIH",
    "MPOS"
   ]
  },
  "movement": {
   "he": "תנועה וצריכה",
   "tables": [
    "AFRU",
    "RESB",
    "MSEG",
    "MHIS"
   ]
  },
  "status": {
   "he": "סטטוס",
   "tables": [
    "JEST",
    "JSTO",
    "TJ02T",
    "TJ30",
    "TJ30T"
   ]
  },
  "text": {
   "he": "טקסטים",
   "tables": [
    "EQKT",
    "MAKT",
    "CRTX"
   ]
  },
  "config": {
   "he": "קונפיגורציה",
   "tables": [
    "T003O",
    "TQ80",
    "T350"
   ]
  }
 }
};
export default GRAPH;
