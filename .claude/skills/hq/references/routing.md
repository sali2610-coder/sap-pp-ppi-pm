# HQ Routing — classification → manager(s)

## Classification matrix

| Request signal | Category | Primary manager | Cross-calls (auto) |
|---|---|---|---|
| ST22 / SM21 / SM37 / short dump | Incident / Debug | **Sherlock** | Memory (seen before?), Oracle (Note?) |
| IDOC 51/64, WE02/WE05/WE09, SMQ1/SMQ2, SM58 | Interface / IDOC | **Sherlock** | Oracle, Memory |
| PI / PO / CPI / Gateway / RFC / SOAP / REST / Proxy | Interface | **Sherlock** | Oracle |
| SU53 / missing authorization | Authorization | **Sherlock** | Oracle |
| slow / ST05 / SAT / performance | Performance | **Sherlock** | Memory |
| "can't do MIRO / MIGO / VA01 …" (functional block) | Incident | **Sherlock** | Memory, Oracle |
| "תחקור" / "מה קרה" / "רק להבין מה קרה" | Incident | **Sherlock** | Memory, Oracle |
| SAP Note / KBA / "מה אומר Note X" | Question / Note | **Oracle** | Memory (saved?) |
| "how to configure …" | Configuration | **Oracle** | — |
| "how to design / architect …" (CDS/RAP/agent) | Design | **Oracle** (→ sap-abap-ecc-s4-expert) | — |
| "how to write / which ABAP …" | ABAP (build) | **Oracle** | — |
| "explain concept / learn …" | Learning | **Oracle** | — |
| "did we solve this before / last time" | History | **Memory** | Oracle (new), Sherlock (fresh) |
| analyze MY saved doc (PDF/Word/Excel/screenshot of past) | Document Analysis | **Memory** | — |
| a NEW incident artifact (screenshot/PDF/dump handed in) | Incident intake | **Sherlock** | Memory, Oracle |

## Combination flows

- **Single manager (most cases):** HQ launches the primary manager; that manager cross-calls the others internally.
  HQ does not duplicate the cross-call — it just launches the entry manager and aggregates the summary.
- **Explicit two-manager parallel:** when the request is genuinely dual (e.g. "is there a Note AND did we hit this
  before"), HQ runs `oracle` + `memory` in parallel and merges.
- **Ambiguous:** default to **Sherlock** for anything incident-shaped; ask one short clarifying question only if the
  category is truly unclear.

## Confidence rubric (for HQ Summary)

- 90-100%: root cause tied to concrete evidence (dump/trace/IDoc status) + confirming Note or past match.
- 70-89%: strong single hypothesis, partial evidence.
- 50-69%: plausible, needs one more artifact (name it).
- <50%: insufficient evidence — HQ requests the specific missing input.

## Summary discipline

Default output = concise core result + the HQ Summary block. Keep the managers' full reports available on request.
Only tick a worker/evidence line if it actually ran/was used.
